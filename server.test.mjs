import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import { request as httpRequest } from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';
import { test } from 'node:test';
import { renderDemo } from './demo.mjs';

const root = new URL('./', import.meta.url);
test('README documentation links use the canonical docs host', async () => {
  const readme = await readFile(new URL('README.md', root), 'utf8');
  assert.match(readme, /https:\/\/builder\.appservice\.azure\.com\/docs\//);
  assert.doesNotMatch(readme, /https:\/\/builderapps\.azure\.com\/docs(?:\/|\b)/);
});
const expectedBuilder = `components:
  - name: web
    role: web
    platform: nodejs
    platformVersion: "24"
    run:
      start: node server.mjs
      healthCheckPath: /health
`;

test('root manifests preserve the Node.js 24 startup contract with single-component defaults', async () => {
  const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));
  const lock = JSON.parse(await readFile(new URL('package-lock.json', root), 'utf8'));
  assert.equal(packageJson.private, true);
  assert.equal(packageJson.type, 'module');
  assert.deepEqual(packageJson.engines, { node: '24.x' });
  assert.equal(packageJson.scripts.start, 'node server.mjs');
  for (const key of ['dependencies', 'devDependencies', 'optionalDependencies']) {
    assert.deepEqual(packageJson[key] ?? {}, {});
  }
  assert.equal(lock.lockfileVersion, 3);
  assert.equal(lock.name, packageJson.name);
  assert.equal(lock.version, packageJson.version);
  assert.deepEqual(lock.packages, {
    '': {
      name: packageJson.name,
      version: packageJson.version,
      engines: packageJson.engines,
    },
  });
  assert.equal(await readFile(new URL('builder.yaml', root), 'utf8'), expectedBuilder);
});

// Assert the app's default binding, but use an OS-assigned port only in tests.
const testStartup = `
import assert from 'node:assert/strict';
import { Server } from 'node:http';
const listen = Server.prototype.listen;
Server.prototype.listen = function (port, host) {
  assert.equal(port, 8080);
  assert.equal(host, '0.0.0.0');
  this.once('listening', () => process.send(this.address().port));
  return listen.call(this, 0, host);
};
await import('./server.mjs');
`;

function request(port, path, headers = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = httpRequest(`http://127.0.0.1:${port}${path}`, { headers, method }, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { body += chunk; });
      response.on('error', reject);
      response.on('end', () => resolve({
        status: response.statusCode,
        type: response.headers['content-type'],
        body,
      }));
    });
    req.on('error', reject);
    req.setTimeout(1000, () => req.destroy(new Error(`Timed out requesting ${path}`)));
    req.end();
  });
}

async function waitForServer(child, port, getStderr) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    assert.equal(child.exitCode, null, `Server exited: ${getStderr()}`);
    try {
      await request(port, '/health');
      return;
    } catch (error) {
      if (error.code !== 'ECONNREFUSED') throw error;
      await delay(100);
    }
  }
  throw new Error(`Server did not become ready: ${getStderr()}`);
}

test('HTTP routes and public greeting work with no external services', { timeout: 30000 }, async (t) => {
  for (const greeting of [undefined, 'Welcome', '', '<script>alert("x")</script> & \'hello\'', 'A'.repeat(500)]) {
    await t.test(`SAMPLE_GREETING=${greeting === undefined ? '(unset)' : JSON.stringify(greeting)}`, async () => {
      const env = { ...process.env };
      env.PRIVATE_TEST_VALUE = 'must-not-appear-in-demo';
      delete env.SAMPLE_GREETING;
      if (greeting !== undefined) env.SAMPLE_GREETING = greeting;
      const child = spawn(process.execPath, ['--input-type=module', '--eval', testStartup], {
        cwd: root,
        env,
        stdio: ['ignore', 'ignore', 'pipe', 'ipc'],
      });
      let stderr = '';
      child.stderr.setEncoding('utf8');
      child.stderr.on('data', (chunk) => { stderr += chunk; });
      const exited = once(child, 'exit');
      try {
        const port = await Promise.race([
          once(child, 'message').then(([port]) => port),
          exited.then(([code, signal]) => {
            throw new Error(`Server exited before listening (${code ?? signal}): ${stderr}`);
          }),
          delay(5000, undefined, { ref: false }).then(() => {
            throw new Error(`Server did not start listening: ${stderr}`);
          }),
        ]);
        assert.equal(Number.isInteger(port) && port > 0 && port <= 65535, true);
        await waitForServer(child, port, () => stderr);
        const rootResponse = {
          status: 200,
          type: 'text/html; charset=utf-8',
          body: renderDemo(greeting || 'Hello'),
        };
        const home = await request(port, '/');
        assert.deepEqual(home, rootResponse);
        assert.deepEqual(await request(port, '/', { Accept: 'text/plain' }), rootResponse);
        assert.deepEqual(await request(port, '/?preview=1'), rootResponse);
        assert.deepEqual(await request(port, '/', {}, 'POST'), rootResponse);
        assert.deepEqual(await request(port, '/', {}, 'HEAD'), { ...rootResponse, body: '' });
        assert.ok(!home.body.includes(env.PRIVATE_TEST_VALUE));
        assert.match(home.body, /^<!doctype html>/);
        assert.match(home.body, /<html lang="en">/);
        assert.match(home.body, /name="viewport"/);
        assert.match(home.body, /href="\/health"/);
        assert.match(home.body, /href="https:\/\/builder\.appservice\.azure\.com\/docs\/"/);
        assert.doesNotMatch(home.body, /https:\/\/builderapps\.azure\.com\/docs/);
        assert.ok(!home.body.includes('/demo'));
        if (greeting?.startsWith('<script>')) {
          assert.ok(home.body.includes('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;hello&#39;'));
          assert.ok(!home.body.includes('<script>'));
        }
        assert.deepEqual(await request(port, '/health'), {
          status: 200,
          type: 'text/plain; charset=utf-8',
          body: 'OK\n',
        });
        assert.deepEqual(await request(port, '/health?check=1'), await request(port, '/health'));
        assert.deepEqual(await request(port, '/health', {}, 'POST'), await request(port, '/health'));
        assert.deepEqual(await request(port, '/health', {}, 'HEAD'), {
          status: 200, type: 'text/plain; charset=utf-8', body: '',
        });

        assert.deepEqual(await request(port, '/not-found'), {
          status: 404,
          type: 'text/plain; charset=utf-8',
          body: 'Not found\n',
        });
        for (const path of ['/demo', '/demo?preview=1']) {
          assert.deepEqual(await request(port, path), {
            status: 404, type: 'text/plain; charset=utf-8', body: 'Not found\n',
          });
        }
      } finally {
        if (child.exitCode === null) child.kill('SIGTERM');
        await exited;
      }
    });
  }
});

test('demo renders public greeting only as escaped text', () => {
  const html = renderDemo('<script>alert("x")</script> & \'hello\'');
  assert.ok(html.includes('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;hello&#39;'));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('<script src='));
});
