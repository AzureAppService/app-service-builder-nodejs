function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

export function renderDemo(greeting) {
  const text = escapeHtml(greeting);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Node.js sample | App Service Builder</title><style>
:root{font-family:"Segoe UI Variable","Segoe UI",Arial,sans-serif;color:#26374f;background:#eff3fc;--line:#e2e8f1;--muted:#586c85}
*{box-sizing:border-box}body{margin:0;min-height:100vh;background:radial-gradient(ellipse at 0 10%,#dceaff,transparent 60%),radial-gradient(ellipse at 100% 90%,#e8e0fa,transparent 60%),#eff3fc}
a{color:inherit;text-underline-offset:4px}button{font:inherit;cursor:pointer}a:focus-visible,button:focus-visible,summary:focus-visible{outline:3px solid #7563cb;outline-offset:5px}button:disabled{opacity:.6;cursor:wait}
.page{max-width:1150px;margin:auto;padding:36px 30px}.surface{background:#fff;border-radius:23px;border:1px solid #ffffffc9;overflow:hidden;box-shadow:0 22px 65px #3b487515}
header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:27px 35px;border-bottom:1px solid var(--line)}.brand{display:flex;align-items:center;gap:11px;font-size:17px;font-weight:650;letter-spacing:-.02em}.brand-logo{width:30px;height:30px;flex:none}.language-logo{height:auto;width:155px;display:block}
nav{display:flex;gap:24px;font-size:12px;color:#536582}nav a{text-decoration:none}nav a:hover{text-decoration:underline}
h1{font-size:84px;font-weight:650;line-height:1.04;letter-spacing:-.04em;overflow-wrap:anywhere;margin:0 0 20px;max-width:100%}h2{font-size:25px;line-height:1.5;letter-spacing:-.02em;font-weight:600;margin:0 0 15px}
.hero{padding:49px 35px 43px;background:radial-gradient(ellipse at 80% 15%,#edf6e9,transparent 70%),#fff;text-align:center}.hero .language-logo{width:134px;margin:0 auto 31px}.context{font-size:15px;color:#526d59;font-weight:600;margin:0 0 17px}.intro{font-size:16px;line-height:1.8;color:var(--muted);max-width:39ch;margin:0 auto 25px}
.primary{display:inline-block;border:0;border-radius:10px;background:#3f783e;color:#fff;padding:13px 22px;min-height:44px;font-size:13px;font-weight:600;box-shadow:0 5px 12px #47369c1a;text-decoration:none}.primary:hover{background:#315f30}
#health-status{font-size:11px;line-height:1.8;color:#586f5a;margin:14px 0 0;min-height:20px}
.bottom{display:flex;gap:25px;align-items:flex-start;justify-content:space-between;padding:25px 35px;border-top:1px solid var(--line)}.facts{display:flex;gap:25px;align-items:center;font-size:12px;color:var(--muted)}.facts strong{font-weight:600;color:#41526f}code{font:12px/1.8 Consolas,monospace;overflow-wrap:anywhere}
details{font-size:12px;line-height:1.8;color:var(--muted)}summary{cursor:pointer;font-weight:600;color:#435676}details p{max-width:66ch;margin:12px 0 0}.guide{margin:0 35px;padding:19px 0 25px;border-top:1px solid var(--line)}
footer{display:flex;justify-content:space-between;gap:22px;padding:19px 4px 0;font-size:11px;color:#61718b;line-height:1.8}footer p{margin:0}.notices{font-size:10px;margin-top:14px}.skip{position:absolute;top:-90px;left:20px;background:white;padding:12px;z-index:2}.skip:focus{top:10px}
.python .hero{text-align:left;display:grid;grid-template-columns:.8fr 1.2fr;padding:64px 67px 53px;gap:65px;background:radial-gradient(ellipse at 8% 50%,#e7f0fd,transparent 65%),radial-gradient(ellipse at 90% 90%,#fff7e0,transparent 65%),#fff}.python .identity{display:flex;flex-direction:column;align-items:flex-start;padding-top:8px}.python .hero .language-logo{width:217px;max-width:100%;margin:0 0 31px}.python .context{color:#526f92;font-size:16px;line-height:1.8}.version{font-size:12px;color:#617697;margin-top:auto}.python h1,.python h2{color:#304b73}.python .intro{font-size:14px;margin:0 0 24px}.python .primary{background:#366d9e}.python .primary:hover{background:#29547c}.python #health-status{color:#587293}.deployment{font-size:12px;color:#416b97}
@media(max-width:850px){header{flex-wrap:wrap;padding:24px}.bottom{flex-direction:column}.python .hero{padding:43px;gap:35px}.page{padding:24px}.guide{margin:0 24px}}
@media(max-width:600px){.page{padding:22px 15px}header{padding:23px 21px;gap:17px}.brand{font-size:16px}.brand-logo{width:28px;height:28px}nav{width:100%;justify-content:space-between;font-size:10px;gap:12px}.hero{padding:34px 22px 31px}h1{font-size:64px}.context{font-size:12px}.intro{font-size:14px}#health-status{font-size:10px}.bottom{padding:22px 21px}.facts{width:100%;justify-content:space-between;gap:10px;font-size:11px}.facts code{font-size:10px}.guide{margin:0 21px}.python .hero{padding:30px 23px 31px;grid-template-columns:1fr;gap:29px}.python .identity{padding:0;display:grid;grid-template-columns:1fr 1.3fr;gap:9px 18px;align-items:center}.python .hero .language-logo{width:137px;margin:0}.python .context{font-size:11px;margin:0}.version{grid-column:1/-1;font-size:10px;margin:3px 0 0}.python h2{font-size:21px}.python .intro{font-size:13px}footer{flex-direction:column;gap:6px;font-size:10px}}
</style></head><body><a class="skip" href="#main">Skip to content</a><div class="page nodejs"><div class="surface"><header><div class="brand"><svg class="brand-logo" aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
</svg>
App Service Builder</div><nav aria-label="Documentation"><a href="https://nodejs.org/docs/latest/api/">Node.js documentation ↗</a><a href="https://builder.appservice.azure.com/docs/">Builder documentation ↗</a></nav></header><main id="main"><section class="hero" aria-label="Public greeting"><div><svg class="language-logo" role="img" aria-label="Node.js" width="267" height="80" viewBox="0 0 267 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="nodejs-a" maskUnits="userSpaceOnUse" x="0" y="0" width="267" height="80" style="mask-type:luminance">
    <path d="M267 0H0v79.378h267z" fill="#fff"/>
  </mask>
  <g mask="url(#nodejs-a)">
    <path d="M234.983 78.755a4 4 0 0 1-1.933-.51l-6.121-3.658c-.921-.51-.46-.695-.184-.787 1.242-.417 1.472-.51 2.761-1.25.138-.093.322-.047.46.046l4.694 2.825c.184.092.414.092.552 0l18.363-10.698c.183-.092.277-.277.277-.509V42.867c0-.232-.094-.417-.277-.51l-18.363-10.65c-.184-.093-.414-.093-.552 0l-18.362 10.65c-.184.093-.276.324-.276.51v21.347c0 .186.092.417.276.51l5.016 2.917c2.715 1.39 4.418-.232 4.418-1.852v-21.07c0-.278.23-.556.553-.556h2.347c.276 0 .552.232.552.556v21.07c0 3.658-1.979 5.788-5.431 5.788-1.058 0-1.886 0-4.234-1.157l-4.832-2.779a3.91 3.91 0 0 1-1.933-3.38V42.912c0-1.39.737-2.686 1.933-3.38l18.363-10.697c1.15-.649 2.715-.649 3.865 0l18.363 10.696a3.91 3.91 0 0 1 1.932 3.381V64.26c0 1.39-.736 2.686-1.932 3.381l-18.363 10.697c-.552.232-1.242.417-1.932.417" fill="#5FA04E"/>
    <path d="M240.69 64.075c-8.055 0-9.712-3.705-9.712-6.854 0-.277.23-.555.552-.555h2.393c.277 0 .507.185.507.463.368 2.454 1.426 3.658 6.305 3.658 3.866 0 5.523-.88 5.523-2.963 0-1.204-.462-2.084-6.49-2.686-5.016-.51-8.146-1.621-8.146-5.65 0-3.75 3.13-5.974 8.376-5.974 5.892 0 8.791 2.038 9.159 6.484a.76.76 0 0 1-.137.416c-.094.093-.231.186-.371.186h-2.439a.54.54 0 0 1-.505-.417c-.553-2.547-1.98-3.38-5.753-3.38-4.234 0-4.74 1.481-4.74 2.593 0 1.342.598 1.76 6.305 2.5 5.66.741 8.33 1.806 8.33 5.788 0 4.076-3.36 6.391-9.157 6.391m26.51-22.413c0 1.945-1.612 3.566-3.546 3.566a3.556 3.556 0 0 1-3.543-3.566 3.556 3.556 0 0 1 3.543-3.565c1.888 0 3.546 1.574 3.546 3.565m-6.536 0c0 1.667 1.335 3.01 2.944 3.01 1.658 0 2.993-1.39 2.993-3.01 0-1.667-1.335-2.963-2.993-2.963a2.975 2.975 0 0 0-2.944 2.963m1.657-1.991h1.381c.46 0 1.381 0 1.381 1.065 0 .74-.462.88-.739.973.554.046.599.416.645.926.046.324.094.88.185 1.065h-.83c0-.186-.137-1.204-.137-1.25-.045-.232-.137-.325-.413-.325h-.691v1.62h-.782zm.736 1.76h.597c.508 0 .599-.37.599-.556 0-.556-.368-.556-.599-.556h-.642v1.112z" fill="#5FA04E"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M43.674 41.954c0-.834-.46-1.62-1.197-2.038L23.01 28.572c-.322-.185-.69-.278-1.058-.324h-.184c-.368 0-.736.139-1.059.324l-19.512 11.3A2.38 2.38 0 0 0 0 41.953l.046 30.378c0 .416.23.833.598 1.018.368.232.829.232 1.15 0l11.598-6.668a2.36 2.36 0 0 0 1.197-2.037V50.428c0-.833.46-1.62 1.196-2.037l4.924-2.871a2.2 2.2 0 0 1 1.197-.325c.414 0 .828.093 1.15.325l4.925 2.87a2.36 2.36 0 0 1 1.196 2.038v14.217c0 .833.46 1.62 1.197 2.037l11.505 6.668c.368.232.828.232 1.197 0 .368-.185.598-.602.598-1.018zM137.465.139c-.369-.185-.829-.185-1.151 0-.368.231-.598.602-.598 1.019v30.1a.89.89 0 0 1-.415.74.88.88 0 0 1-.828 0l-4.878-2.825a2.36 2.36 0 0 0-2.347 0L107.735 40.52a2.36 2.36 0 0 0-1.196 2.037V65.2c0 .834.46 1.621 1.196 2.038l19.513 11.345a2.36 2.36 0 0 0 2.347 0l19.513-11.345a2.36 2.36 0 0 0 1.196-2.038V8.752c0-.88-.46-1.667-1.196-2.084zm-1.795 57.606c0 .232-.092.417-.276.51l-6.674 3.89a.68.68 0 0 1-.598 0l-6.673-3.89c-.184-.093-.276-.325-.276-.51v-7.78c0-.231.092-.416.276-.509l6.673-3.89a.68.68 0 0 1 .598 0l6.674 3.89c.184.093.276.324.276.51zm66.728-7.965c.737-.417 1.151-1.204 1.151-2.038v-5.51c0-.834-.46-1.62-1.151-2.037l-19.375-11.3a2.36 2.36 0 0 0-2.347 0l-19.512 11.346a2.36 2.36 0 0 0-1.197 2.037v22.645c0 .833.46 1.62 1.197 2.037l19.374 11.114c.737.416 1.611.416 2.301 0l11.736-6.576c.368-.185.598-.602.598-1.019s-.23-.833-.598-1.018L174.97 58.115c-.368-.231-.598-.602-.598-1.018v-7.085c0-.417.23-.834.598-1.02l6.121-3.518a1.12 1.12 0 0 1 1.196 0l6.121 3.519c.368.231.598.602.598 1.019v5.557c0 .416.23.833.599 1.018.368.232.828.232 1.196 0z" fill="#333"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M181.551 48.716a.42.42 0 0 1 .461 0l3.727 2.176c.138.092.23.231.23.417v4.352a.49.49 0 0 1-.23.417l-3.727 2.177a.42.42 0 0 1-.461 0l-3.727-2.177a.49.49 0 0 1-.23-.417V51.31c0-.185.092-.325.23-.417z" fill="#5FA04E"/>
    <g transform="translate(53.428, 28.628)">
      <path fill="url(#nodejs-b)" d="M22.873.417a2.36 2.36 0 0 0-2.348 0L1.151 11.669C.414 12.086 0 12.873 0 13.707v22.551c0 .834.46 1.621 1.15 2.038l19.375 11.253a2.36 2.36 0 0 0 2.348 0l19.374-11.253c.737-.417 1.15-1.204 1.15-2.038V13.707c0-.834-.46-1.62-1.15-2.038z"/>
      <path fill="url(#nodejs-c)" clip-path="url(#nodejs-d)" d="m21.699-1.047 21.506 12.995L21.7 51.073.153 38.055z"/>
      <path fill="url(#nodejs-e)" clip-path="url(#nodejs-d)" d="M21.699-1.047.153 11.948l21.546 39.125 21.506-13.018z"/>
    </g>
  </g>
  <defs>
    <linearGradient id="nodejs-b" x1="30.33" y1="8.56" x2="14.9" y2="44.7" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3F8B3D"/>
      <stop offset=".64" stop-color="#3F873F"/>
      <stop offset=".93" stop-color="#3DA92E"/>
      <stop offset="1" stop-color="#3DAE2B"/>
    </linearGradient>
    <linearGradient id="nodejs-c" x1="18.8" y1="26.8" x2="68" y2=".4" gradientUnits="userSpaceOnUse">
      <stop offset=".14" stop-color="#3F873F"/>
      <stop offset=".4" stop-color="#52A044"/>
      <stop offset=".71" stop-color="#64B749"/>
      <stop offset=".91" stop-color="#6ABF4B"/>
    </linearGradient>
    <linearGradient id="nodejs-e" x1=".25" y1="24.5" x2="44" y2="24.5" gradientUnits="userSpaceOnUse">
      <stop offset=".09" stop-color="#6ABF4B"/>
      <stop offset=".29" stop-color="#64B749"/>
      <stop offset=".6" stop-color="#52A044"/>
      <stop offset=".86" stop-color="#3F873F"/>
    </linearGradient>
    <clipPath id="nodejs-d">
      <path d="M22.873.417a2.36 2.36 0 0 0-2.348 0L1.151 11.669C.414 12.086 0 12.873 0 13.707v22.551c0 .834.46 1.621 1.15 2.038l19.375 11.253a2.36 2.36 0 0 0 2.348 0l19.374-11.253c.737-.417 1.15-1.204 1.15-2.038V13.707c0-.834-.46-1.62-1.15-2.038z"/>
    </clipPath>
  </defs>
</svg>
<h1 id="greeting">${text}<span aria-hidden="true">.</span></h1><p class="context">Node.js sample for App Service Builder</p><p class="intro">A small server. A place to start.<br>Node.js. Nothing extra.</p><button class="primary" type="button" data-health-check data-health-path="/health">Check app health</button><p id="health-status" role="status" aria-live="polite">Checks this server’s liveness, not Azure services.</p></div></section><section class="bottom" aria-label="Runtime and customization"><div class="facts"><strong>Node.js 24</strong><code>0.0.0.0:8080</code><a href="/health"><code>/health</code></a></div><details><summary>Make this greeting yours</summary><p>Set the public <code>SAMPLE_GREETING</code> variable in your Builder App, then save and deploy a new version. An unset or empty value uses <code>Hello</code>. Never use a secret as your greeting. This page does not edit GitHub or your deployment.</p></details></section><details class="guide"><summary>Explore the HTTP routes</summary><p><a href="/">/</a> renders this HTML introduction with your public greeting. <a href="/health">/health</a> returns <code>OK</code>; unknown paths return <code>Not found</code> with status 404. A dependency-free Node.js HTTP server.</p></details></main></div><footer><p>Node.js sample / App Service Builder</p><p>Development &amp; testing only. Local checks do not qualify a cloud deployment.</p></footer><details class="notices"><summary>Language logo &amp; trademark notice</summary><p>Node.js and its logo are trademarks of the OpenJS Foundation. The official logo identifies this sample’s language; no endorsement is implied. <a href="https://nodejs.org/en/about/branding">Official logo source and usage guidance</a>.</p></details></div><script>
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
  </script></body></html>`;
}
