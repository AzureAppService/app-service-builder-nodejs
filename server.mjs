import { createServer } from 'node:http';
import { renderDemo } from './demo.mjs';

createServer((request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname;
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  if (path === '/health') {
    response.writeHead(200).end('OK\n');
  } else if (path === '/') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.writeHead(200).end(renderDemo(process.env.SAMPLE_GREETING || 'Hello'));
  } else {
    response.writeHead(404).end('Not found\n');
  }
}).listen(8080, '0.0.0.0');
