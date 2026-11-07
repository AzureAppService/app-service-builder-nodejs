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
    a:focus-visible, summary:focus-visible { outline: 3px solid #477412; outline-offset: 5px; }
    .skip { position: absolute; top: -80px; left: 20px; padding: 12px; background: var(--paper); z-index: 2; }
    .skip:focus { top: 12px; }
    .frame { max-width: 1440px; margin: auto; padding: 0 56px; }
    header { min-height: 104px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-bottom: 1px solid var(--line); }
    .brand { display: flex; align-items: center; gap: 12px; font-size: 17px; font-weight: 700; }
    .mark { display: grid; place-items: center; width: 42px; height: 46px; background: var(--ink); color: var(--lime); clip-path: polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%); font-size: 18px; }
    nav { display: flex; align-items: center; gap: 28px; font-size: 13px; }
    nav a { padding: 12px 0; }
    .preview { font-size: 11px; border: 1px solid var(--line); padding: 8px 10px; }
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
      <div class="brand"><span class="mark" aria-hidden="true">js</span> App Service Builder</div>
      <nav aria-label="Main navigation">
        <span class="preview">Private preview</span>
        <a href="https://builderapps.azure.com/docs/">Documentation <span aria-hidden="true">&nearr;</span></a>
      </nav>
    </header>
    <main id="main">
      <div class="title-row"><h1>Node.js, down to basics.</h1><span class="sample-name">nodejs-web</span></div>
      <section class="showcase" aria-label="Public greeting and HTTP response">
        <div class="greeting">
          <p class="hello">${text}<span aria-hidden="true">.</span></p>
          <p class="intro">A small server.<br>A place to start.<br>Node.js. Nothing extra.</p>
          <a class="button" href="/health">Open health endpoint <span aria-hidden="true">&rarr;</span></a>
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
</body>
</html>
`;
}
