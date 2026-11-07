# App Service Builder: Node.js HTTP sample

A dependency-free Node.js 24 web app for learning the App Service Builder
GitHub-source workflow. This repository contains one independently usable
sample: the app and `builder.yaml` are at the repository root. No other sample
repository, archive, npm CLI package, or external service is required.

**App Service Builder is in Private Preview. Use this sample for development
and testing, not production.** Live qualification of this sample is pending:
local checks do not establish successful cloud builds, runtime startup, source
authorization, or preview availability. Use a subscription and location enabled
for your preview access; this sample does not promise availability in any region.

## Preview

The screenshot shows the visual showcase served directly at `/`.

![Node.js demo with a lime greeting panel beside a dark HTTP response panel and runtime details](https://github.com/user-attachments/assets/0cdd1a8d-c906-4130-97e9-055b9ced4eb0)

## Prerequisites

- Node.js **24.x** and its bundled npm, Git, and curl for the local commands.
- For deployment, Azure preview access, an authorized subscription and resource
  group, and a GitHub account that can create a fork and authorize it as a source.
- Port **8080** must be available locally. The server binds `0.0.0.0:8080`;
  do not expose the development server on an untrusted network.

## Run locally

Fork [AzureAppService/app-service-builder-nodejs](https://github.com/AzureAppService/app-service-builder-nodejs/fork)
into your GitHub account, then replace `<your-github-account>`:

```sh
git clone https://github.com/<your-github-account>/app-service-builder-nodejs.git
cd app-service-builder-nodejs
npm ci --registry=https://registry.npmjs.org --ignore-scripts
node --check server.mjs
npm test
node server.mjs
```

The lockfile records an empty dependency graph; `npm ci` installs no third-party
packages. The checks use Node's built-in test runner and start and stop their own
server on OS-assigned ports, without using port 8080. They cover actual root HTML,
escaped and empty greetings, query strings, health, unknown routes, and the removed
showcase route returning 404. They preserve the simple server's existing method
behavior: POST uses the same path handler, and HEAD returns the same headers without
a body. There is no separate build or lint command; `node --check server.mjs` and
`node --check demo.mjs` check syntax. Leave the final command
running and use a second terminal:

```sh
curl -i http://localhost:8080/
curl -i http://localhost:8080/health
curl -i http://localhost:8080/not-found
```

Open `http://localhost:8080/` in a browser for the visual Node.js showcase.
It displays the same public greeting with a responsive ink-and-lime layout,
runtime details, real endpoint links, and keyboard-accessible expandable
instructions. It uses inline CSS, system fonts, and no JavaScript or external
assets. The root serves HTML directly, without a redirect or content negotiation.

| Path | Status | Response body |
| --- | --- | --- |
| `/` | 200 | HTML showcase displaying the public greeting `Hello` |
| `/health` | 200 | `OK` |
| Any unknown path | 404 | `Not found` |

`/` returns HTTP **200** with `text/html; charset=utf-8`.
Use `/` for template thumbnails and `/health` for health checks.

Health and not-found text responses end with a newline. Stop the server with
**Ctrl+C** before running tests again or starting another instance.

## Deploy your fork with Portal

See the [App Service Builder documentation](https://builderapps.azure.com/docs/)
and [Portal quickstart](https://builderapps.azure.com/docs/quickstarts/portal/)
for the current preview onboarding and deployment steps. This README describes
the source configuration, not a live-verified cloud deployment.

1. Open [App Service Builder Portal](https://builderapps.azure.com/) and sign in
   with the account enabled for your Private Preview. Create an app in your
   authorized subscription, resource group, and preview-enabled location.
2. Authorize GitHub source access to **your fork**, including access for the
   GitHub organization if applicable. Follow the source authorization flow in
   Portal; do not paste tokens or credentials into source files.
3. Select `<your-github-account>/app-service-builder-nodejs`, branch **`main`**,
   and the **repository root** as the app source. `builder.yaml`, `package.json`,
   `package-lock.json`, `server.mjs`, and `demo.mjs` must all be at that root; do not select
   `samples/nodejs-web` or another subdirectory.
4. Start deployment and wait until Portal reports successful completion. A saved
   source connection alone does not establish that the app is running.
5. Copy the runtime URL shown for the app. Replace `<app-runtime-url>` below with
   that URL (without a trailing slash), then check the greeting and health:

```sh
curl -i "<app-runtime-url>/"
curl -i "<app-runtime-url>/health"
```

Both should return HTTP **200**, with the same bodies as the local default
responses. If deployment fails, use Portal's deployment status and logs before
trying again; a local pass does not qualify the cloud runtime.

### Build and startup contract

`builder.yaml` declares one web component using platform `nodejs`, version
`"24"`, startup command `node server.mjs`, and health check path `/health`.
It omits the single-component defaults: root mount `/`, port `8080`, and
exact health status `200`. There is no custom build or `output` field. Keep
the package and lockfile together, and retain the Node.js 24 engine requirement.

The platform's compute build prepares the runnable app; the startup command is
relative to the selected app root. See
[runtime requirements](https://builderapps.azure.com/docs/reference/runtimes/)
for the preview contract. The GitHub Actions workflow only validates the sample;
it does **not** deploy to Azure.

## Change the public greeting

`SAMPLE_GREETING` is deliberately **public text**, not a secret. The app reflects
only this setting, not the rest of the environment. An unset or empty value uses
`Hello`. With no other instance running:

```sh
SAMPLE_GREETING="Welcome" node server.mjs
```

In a second terminal, `curl -i http://localhost:8080/` should return HTML displaying
the greeting `Welcome`. `/health` remains `OK`. Stop the
server with **Ctrl+C**.

The `/` page displays that greeting, HTML-escaped as text. It never
reflects any other environment variables.

For a deployed app, add `SAMPLE_GREETING` in Portal **Variables**.
**Save only** persists desired values without changing the running version;
**Save and deploy** captures them in a new version. If you chose Save only,
explicitly deploy a new version before verifying the greeting. Activating a
retained version uses its historical values. Do not override reserved `PORT`.
See the [variables guide](https://builderapps.azure.com/docs/guides/variables/).

## Push an update and explicitly redeploy

Make changes in your fork and get them onto the configured `main` branch, for
example by merging your own pull request. For a direct update to your fork's
`main`, run from this repository with the local server stopped:

```sh
git switch main
npm ci --registry=https://registry.npmjs.org --ignore-scripts
node --check server.mjs
npm test
git add server.mjs
git commit -m "Update sample greeting"
git push origin main
```

The example stages a change to `server.mjs`; stage other intended app files if
you changed them. Pushing source does not by itself confirm a deployment. In
Portal, explicitly deploy from the configured fork and `main` branch, wait for
successful completion, then check `/` and `/health` on the runtime URL again.
Uncommitted or unpushed local changes are not uploaded.

## Cleanup

Stop any local server with **Ctrl+C**. In Portal, delete **only the sample app**
and confirm the app deletion; wait for completion. Do not delete a shared
resource group, subscription, fork, or unrelated resources. App deletion does
not remove your GitHub repository or separately created resources.

## Contributing, security, and license

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution and CLA guidance, and the
[Microsoft Open Source Code of Conduct](.github/CODE_OF_CONDUCT.md).
Report security concerns through
[Microsoft's security reporting guidance](https://www.microsoft.com/msrc) rather
than a public issue. This sample is licensed under [MIT](LICENSE.md).

## Resources

- [App Service Builder documentation](https://builderapps.azure.com/docs/)
- [Portal quickstart](https://builderapps.azure.com/docs/quickstarts/portal/)
- [Samples catalog](https://builderapps.azure.com/docs/samples/)
- [Runtime requirements](https://builderapps.azure.com/docs/reference/runtimes/)
