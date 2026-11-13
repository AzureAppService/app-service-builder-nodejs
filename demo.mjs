function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

export function renderDemo(greeting) {
  const text = escapeHtml(greeting);
  return `<!doctype html>
<!--
THESIS: The smallest Node.js server, made visible. No invented dashboard.
OWN-WORLD: Ink, lime and cool paper; large plainspoken type and precise code.
STORY: Read the public greeting, inspect the real response, open the health route.
FIRST VIEWPORT: A lime greeting field beside an ink HTTP specimen; runtime strip below.
FORM: Brief-pinned ink-and-lime showcase, with a responsive split composition.
-->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <link rel="icon" href="data:,">
  <title>Node.js sample | App Service Builder</title>
  <style>
    :root { --ink: #18271e; --muted: #4a5b4f; --paper: #f3f5ef; --lime: #d3f786; --line: #c9d1c5; --mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--paper); color: var(--ink); font-family: Arial, Helvetica, sans-serif; }
    a { color: inherit; text-underline-offset: 4px; }
    a:focus-visible, button:focus-visible, summary:focus-visible { outline: 3px solid #477412; outline-offset: 5px; }
    button.button { border: 0; font-family: inherit; cursor: pointer; }
    button:disabled { opacity: .7; cursor: wait; }
    #health-status { font-size: 13px; line-height: 1.6; max-width: 55ch; }
    .skip { position: absolute; top: -80px; left: 20px; padding: 12px; background: var(--paper); z-index: 2; }
    .skip:focus { top: 12px; }
    .frame { max-width: 1440px; margin: auto; padding: 0 56px; }
    header { min-height: 104px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-bottom: 1px solid var(--line); }
    .brand { display: flex; align-items: center; gap: 12px; font-size: 17px; font-weight: 700; }
    .brand-logo { width: 32px; height: 32px; flex-shrink: 0; }
    nav { display: flex; align-items: center; gap: 28px; font-size: 13px; }
    nav a { padding: 12px 0; }
    main { padding: 38px 0 12px; }
    .title-row { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin-bottom: 24px; }
    h1 { margin: 0; font-size: 30px; letter-spacing: -.035em; }
    .sample-name { color: var(--muted); font: 12px var(--mono); }
    .showcase { display: grid; grid-template-columns: 1.15fr 1fr; min-height: 432px; }
    .greeting { background: var(--lime); padding: 40px; display: flex; flex-direction: column; align-items: flex-start; }
    .hello { font-size: clamp(52px,7vw,96px); line-height: 1.05; letter-spacing: -.04em; font-weight: 700; margin: 8px 0 24px; overflow-wrap: anywhere; max-width: 100%; }
    .intro { font-size: 21px; line-height: 1.5; margin: 0 0 30px; }
    .button { display: inline-flex; align-items: center; justify-content: space-between; gap: 32px; min-height: 48px; padding: 15px 20px; text-decoration: none; background: var(--ink); color: var(--paper); font-size: 14px; margin-top: auto; transition: background .15s ease-out; }
    .button:hover { background: #354d3c; }
    .terminal { background: var(--ink); color: var(--paper); padding: 32px; display: flex; flex-direction: column; min-width: 0; }
    .terminal-heading { display: flex; justify-content: space-between; align-items: center; gap: 16px; color: #c1d0c4; font: 12px var(--mono); border-bottom: 1px solid #4d6152; padding-bottom: 22px; }
    .terminal-icon { color: var(--lime); font-size: 18px; margin-right: 10px; }
    .request { margin-top: 32px; font: 14px/1.8 var(--mono); overflow-wrap: anywhere; }
    .prompt { color: var(--lime); }
    .response-label { color: #c1d0c4; margin: 28px 0 12px; font-size: 12px; }
    .response { margin: 0; font: 17px/1.7 var(--mono); overflow-wrap: anywhere; }
    .terminal-note { margin: auto 0 0; padding-top: 30px; color: #c1d0c4; font: 12px/1.8 var(--mono); }
    .facts { display: grid; grid-template-columns: repeat(3,1fr); margin: 0; border-bottom: 1px solid var(--line); }
    .fact { padding: 26px 0; }
    .fact + .fact { border-left: 1px solid var(--line); padding-left: 32px; }
    dt { color: var(--muted); font-size: 12px; margin-bottom: 9px; }
    dd { margin: 0; font-size: 21px; }
    .guide { display: grid; grid-template-columns: .8fr 1fr; gap: 64px; padding: 34px 0; }
    h2 { font-size: 25px; letter-spacing: -.035em; margin: 0 0 10px; }
    .guide p { color: var(--muted); font-size: 14px; line-height: 1.7; margin: 0; max-width: 65ch; }
    details { border-top: 1px solid var(--line); }
    details:last-child { border-bottom: 1px solid var(--line); }
    summary { cursor: pointer; padding: 16px 0; font-size: 14px; }
    details p { padding-bottom: 16px; }
    code { font-family: var(--mono); font-size: .92em; overflow-wrap: anywhere; }
    footer { border-top: 1px solid var(--line); padding: 20px 0 26px; display: flex; justify-content: space-between; gap: 20px; color: var(--muted); font-size: 11px; line-height: 1.7; }
    footer p { margin: 0; }
    @media (max-width: 900px) { .frame { padding: 0 28px; } .greeting,.terminal { padding: 28px; } .guide { gap: 32px; } nav { gap: 18px; } }
    @media (max-width: 640px) {
      .frame { padding: 0 20px; }
      header { padding: 20px 0; min-height: auto; flex-wrap: wrap; gap: 14px; }
      .brand { font-size: 16px; }
      nav { width: 100%; justify-content: space-between; }
      main { padding-top: 28px; }
      h1 { font-size: 25px; }
      .title-row { gap: 12px; }
      .sample-name { font-size: 10px; }
      .showcase { grid-template-columns: 1fr; }
      .greeting { min-height: 350px; }
      .hello { font-size: 72px; }
      .intro { font-size: 19px; }
      .terminal { min-height: 310px; padding: 26px; }
      .facts { grid-template-columns: 1fr; }
      .fact,.fact + .fact { padding: 18px 0; border-left: 0; }
      .fact + .fact { border-top: 1px solid var(--line); }
      .fact { display: flex; justify-content: space-between; gap: 16px; align-items: baseline; }
      dt { margin: 0; } dd { font-size: 18px; }
      .guide { grid-template-columns: 1fr; gap: 22px; padding: 28px 0; }
      footer { flex-direction: column; gap: 8px; }
    }
    @media (prefers-reduced-motion: reduce) { .button { transition: none; } }
  </style>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <div class="frame">
    <header>
      <div class="brand"><svg class="brand-logo" aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4575_347)">
<path d="M17.62 8.22L7.62 0.22C7.45 0.08 7.24 0 7 0C6.45 0 6 0.45 6 1C6 1.19 6.05 1.36 6.14 1.51L10.58 9L6.14 16.49C6.05 16.64 6 16.81 6 17C6 17.55 6.45 18 7 18C7.24 18 7.45 17.92 7.62 17.78L12.14 14.17L13.16 13.35L17.62 9.78C17.85 9.6 18 9.32 18 9C18 8.68 17.85 8.4 17.62 8.22Z" fill="url(#paint0_linear_4575_347)"/>
<path d="M17.62 8.22L7.62 0.22C7.45 0.08 7.24 0 7 0C6.45 0 6 0.45 6 1C6 1.19 6.05 1.36 6.14 1.51L10.58 9L6.14 16.49C6.05 16.64 6 16.81 6 17C6 17.55 6.45 18 7 18C7.24 18 7.45 17.92 7.62 17.78L12.14 14.17L13.16 13.35L17.62 9.78C17.85 9.6 18 9.32 18 9C18 8.68 17.85 8.4 17.62 8.22Z" fill="url(#paint1_radial_4575_347)" fill-opacity="0.5"/>
<path d="M18 9C18 9.32 17.85 9.6 17.62 9.78L13.16 13.35L12.14 14.17C12.73 13.7 12.88 12.87 12.5 12.23L10.58 9L6.14 1.51C6.05 1.36 6 1.19 6 1C6 0.45 6.45 0 7 0C7.24 0 7.45 0.08 7.62 0.22L17.62 8.22C17.85 8.4 18 8.68 18 9Z" fill="url(#paint2_linear_4575_347)"/>
<path d="M3.625 16C3.98496 16 4.30512 16.19 4.48511 16.49C4.72506 16.88 4.66492 17.38 4.34497 17.7C4.145 17.8999 3.89495 18 3.625 18H1.00002C0.830074 18 0.659995 17.9601 0.510033 17.8701C0.110033 17.6401 -0.0799476 17.18 0.0300524 16.74C0.150055 16.31 0.550058 16 1.00002 16H3.625Z" fill="url(#paint3_linear_4575_347)"/>
<path d="M5.25 12C5.58997 12 5.92012 12.18 6.11011 12.49C6.29007 12.8 6.29007 13.2 6.11011 13.51C5.92012 13.82 5.58997 14 5.25 14H1.00002C0.910076 14 0.819973 13.9899 0.740013 13.96C0.300059 13.8499 2.31351e-05 13.45 2.31351e-05 13C2.31351e-05 12.55 0.300059 12.1501 0.740013 12.04C0.819973 12.0101 0.910076 12 1.00002 12H5.25Z" fill="url(#paint4_linear_4575_347)"/>
<path d="M2.01003 8C2.34998 8.00003 2.67991 8.18005 2.8699 8.48999C3.0499 8.79999 3.0499 9.20001 2.8699 9.51001C2.67991 9.81995 2.34998 9.99997 2.01003 10H1.00002C0.910061 10 0.819984 9.98994 0.740013 9.95996C0.300043 9.84994 2.31351e-05 9.44998 2.31351e-05 9C2.31351e-05 8.55002 0.300043 8.15006 0.740013 8.04004C0.819984 8.01006 0.910061 8 1.00002 8H2.01003Z" fill="url(#paint5_linear_4575_347)"/>
<path d="M7.63992 8C7.97991 8 8.31002 8.18001 8.50002 8.48999C8.68 8.79998 8.68 9.20002 8.50002 9.51001C8.31002 9.81999 7.97991 10 7.63992 10H5.00002C4.91006 10 4.81998 9.98994 4.74001 9.95996C4.30004 9.84994 4.00002 9.44998 4.00002 9C4.00002 8.55002 4.30004 8.15006 4.74001 8.04004C4.81998 8.01006 4.91006 8 5.00002 8H7.63992Z" fill="url(#paint6_linear_4575_347)"/>
</g>
<defs>
<linearGradient id="paint0_linear_4575_347" x1="11.5687" y1="5.79567" x2="4.90825" y2="18.8817" gradientUnits="userSpaceOnUse">
<stop stop-color="#8B52F4"/>
<stop offset="0.52" stop-color="#7A41DC"/>
<stop offset="0.97" stop-color="#9529C1"/>
</linearGradient>
<radialGradient id="paint1_radial_4575_347" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8 14.25) rotate(-18.1381) scale(7.6291 11.4609)">
<stop offset="0.307474" stop-color="#7D45E2" stop-opacity="0"/>
<stop offset="0.574002" stop-color="#3B148A"/>
</radialGradient>
<linearGradient id="paint2_linear_4575_347" x1="6.25" y1="-1.25" x2="17.5" y2="12.25" gradientUnits="userSpaceOnUse">
<stop stop-color="#3BD5FF"/>
<stop offset="0.502883" stop-color="#367AF2"/>
<stop offset="0.949445" stop-color="#9C6CFE"/>
</linearGradient>
<linearGradient id="paint3_linear_4575_347" x1="7.49994" y1="8.875" x2="-4.37506" y2="18" gradientUnits="userSpaceOnUse">
<stop offset="0.0244608" stop-color="#367AF2"/>
<stop offset="0.472842" stop-color="#7A41DC"/>
<stop offset="0.804936" stop-color="#9529C1"/>
</linearGradient>
<linearGradient id="paint4_linear_4575_347" x1="7.49994" y1="8.875" x2="-4.37506" y2="18" gradientUnits="userSpaceOnUse">
<stop offset="0.0244608" stop-color="#367AF2"/>
<stop offset="0.472842" stop-color="#7A41DC"/>
<stop offset="0.804936" stop-color="#9529C1"/>
</linearGradient>
<linearGradient id="paint5_linear_4575_347" x1="7.49994" y1="8.875" x2="-4.37506" y2="18" gradientUnits="userSpaceOnUse">
<stop offset="0.0244608" stop-color="#367AF2"/>
<stop offset="0.472842" stop-color="#7A41DC"/>
<stop offset="0.804936" stop-color="#9529C1"/>
</linearGradient>
<linearGradient id="paint6_linear_4575_347" x1="7.49994" y1="8.875" x2="-4.37506" y2="18" gradientUnits="userSpaceOnUse">
<stop offset="0.0244608" stop-color="#367AF2"/>
<stop offset="0.472842" stop-color="#7A41DC"/>
<stop offset="0.804936" stop-color="#9529C1"/>
</linearGradient>
<clipPath id="clip0_4575_347">
<rect width="18" height="18" fill="white"/>
</clipPath>
</defs>
</svg> App Service Builder</div>
      <nav aria-label="Main navigation">
        <a href="https://builder.appservice.azure.com/docs/">Builder documentation <span aria-hidden="true">&nearr;</span></a>
      </nav>
    </header>
    <main id="main">
      <div class="title-row"><h1>Node.js, down to basics.</h1><span class="sample-name">nodejs-web</span></div>
      <section class="showcase" aria-label="Public greeting and HTTP response">
        <div class="greeting">
          <p class="hello">${text}<span aria-hidden="true">.</span></p>
          <p class="intro">A small server.<br>A place to start.<br>Node.js. Nothing extra.</p>
          <button class="button" type="button" data-health-check data-health-path="/health">Check app health</button>
          <p id="health-status" role="status" aria-live="polite">Checks this server's liveness, not Azure services.</p>
        </div>
        <div class="terminal">
          <div class="terminal-heading"><span><span class="terminal-icon" aria-hidden="true">&gt;_</span>HTTP response</span><span>GET /</span></div>
          <div class="request"><span class="prompt" aria-hidden="true">$ </span><code>curl -i http://localhost:8080/</code></div>
          <p class="response-label">Public greeting in this HTML response</p>
          <p class="response">App Service Builder / nodejs-web: ${text}</p>
          <p class="terminal-note">One public setting: SAMPLE_GREETING.<br>No dependencies. No external services.</p>
        </div>
      </section>
      <dl class="facts" aria-label="Runtime configuration">
        <div class="fact"><dt>Runtime</dt><dd>Node.js 24</dd></div>
        <div class="fact"><dt>Listening on</dt><dd><code>0.0.0.0:8080</code></dd></div>
        <div class="fact"><dt>Health endpoint</dt><dd><a href="/health"><code>/health</code> <span aria-hidden="true">&nearr;</span></a></dd></div>
      </dl>
      <section class="guide" aria-labelledby="guide-title">
        <div><h2 id="guide-title">Small by design.</h2><p>A dependency-free sample for learning the App Service Builder GitHub-source workflow.</p></div>
        <div>
          <details><summary>Make the greeting yours</summary><p>Set <code>SAMPLE_GREETING</code> to your own public text. An unset or empty value uses <code>Hello</code>. In Portal, save and deploy a new version to apply it. Never use a secret as your greeting.</p></details>
          <details><summary>Explore the HTTP routes</summary><p><a href="/">/</a> returns this HTML showcase with your public greeting. <a href="/health">/health</a> returns <code>OK</code>; unknown paths return <code>Not found</code> with status 404.</p></details>
        </div>
      </section>
    </main>
    <footer><p>Development &amp; testing only. Not for production.</p><p>Local checks do not qualify a cloud deployment.</p></footer>
  </div>
  <script>
    const button = document.querySelector('[data-health-check]');
    const status = document.querySelector('#health-status');
    button.addEventListener('click', async () => {
      button.disabled = true;
      status.textContent = 'Checking this app...';
      try {
        const response = await fetch('/health', { cache: 'no-store', signal: AbortSignal.timeout(5000) });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        if ((await response.text()).trim() !== 'OK') throw new Error('Unexpected health response');
        status.textContent = 'Healthy: /health returned HTTP 200 and OK. Server liveness only.';
      } catch (error) {
        status.textContent = 'Health check failed: ' + error.message + '. Retry the check.';
      } finally {
        button.disabled = false;
      }
    });
  </script>
</body>
</html>
`;
}
