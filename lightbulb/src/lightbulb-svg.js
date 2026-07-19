const GLASS_PATH =
  "M60 9 C41 9 27 27 25 49 C23 67 27 83 33 95 C35 99 37 103 38 107 L38 111 C38 113 40 115 43 115 L77 115 C80 115 82 113 82 111 L82 107 C83 103 85 99 87 95 C93 83 97 67 95 49 C93 27 79 9 60 9 Z";

const THREADS = [0, 1, 2, 3, 4, 5, 6]
  .map(
    (i) =>
      `<line class="lightbulb__thread" x1="41" y1="${127 + i * 4.6}" x2="79" y2="${127 + i * 4.6}" stroke="rgba(50,55,62,0.4)" stroke-width="1"/>`,
  )
  .join("");

export function createLightbulbElement() {
  const root = document.createElement("div");
  root.className = "lightbulb lightbulb--off";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <span class="lightbulb__bloom"></span>
    <span class="lightbulb__bloom lightbulb__bloom--tight"></span>
    <span class="lightbulb__pool"></span>
    <svg class="lightbulb__svg" viewBox="0 0 120 176" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="bulb-inner-glow" cx="50%" cy="48%" r="50%">
          <stop offset="0%" stop-color="#fffef9" stop-opacity="0.98"/>
          <stop offset="14%" stop-color="#fff4dc" stop-opacity="0.94"/>
          <stop offset="32%" stop-color="#ffe6a8" stop-opacity="0.78"/>
          <stop offset="52%" stop-color="#ffc860" stop-opacity="0.48"/>
          <stop offset="72%" stop-color="#ff9e30" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#ff7800" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="bulb-thunder-glow" cx="50%" cy="48%" r="46%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
          <stop offset="22%" stop-color="#eef4fc" stop-opacity="0.78"/>
          <stop offset="48%" stop-color="#d8e6f8" stop-opacity="0.42"/>
          <stop offset="100%" stop-color="#c0d4f0" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="bulb-thunder-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
          <stop offset="38%" stop-color="#f4f8ff" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#dce8f8" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="bulb-glass-thunder" x1="28%" y1="2%" x2="72%" y2="98%">
          <stop offset="0%" stop-color="rgba(250, 253, 255, 0.42)"/>
          <stop offset="50%" stop-color="rgba(220, 235, 252, 0.22)"/>
          <stop offset="100%" stop-color="rgba(200, 220, 245, 0.08)"/>
        </linearGradient>
        <radialGradient id="bulb-filament-hot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="45%" stop-color="#ffe8b0"/>
          <stop offset="100%" stop-color="#ffaa44"/>
        </radialGradient>
        <linearGradient id="bulb-glass-off" x1="12%" y1="4%" x2="88%" y2="96%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.07)"/>
          <stop offset="45%" stop-color="rgba(255,255,255,0.02)"/>
          <stop offset="100%" stop-color="rgba(200,210,225,0.04)"/>
        </linearGradient>
        <linearGradient id="bulb-glass-lit" x1="32%" y1="2%" x2="68%" y2="98%">
          <stop offset="0%" stop-color="rgba(255, 250, 238, 0.32)"/>
          <stop offset="50%" stop-color="rgba(255, 218, 130, 0.18)"/>
          <stop offset="100%" stop-color="rgba(255, 175, 70, 0.06)"/>
        </linearGradient>
        <linearGradient id="bulb-rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.55)"/>
          <stop offset="18%" stop-color="rgba(255,255,255,0.08)"/>
          <stop offset="82%" stop-color="rgba(255,255,255,0.06)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.42)"/>
        </linearGradient>
        <linearGradient id="bulb-chrome" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#eceff2"/>
          <stop offset="14%" stop-color="#c8ced6"/>
          <stop offset="38%" stop-color="#9aa3ad"/>
          <stop offset="58%" stop-color="#b8bfc8"/>
          <stop offset="78%" stop-color="#8e969f"/>
          <stop offset="100%" stop-color="#6e757d"/>
        </linearGradient>
        <linearGradient id="bulb-chrome-lit" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f5e8c8"/>
          <stop offset="30%" stop-color="#d4b878"/>
          <stop offset="70%" stop-color="#a88848"/>
          <stop offset="100%" stop-color="#7a6538"/>
        </linearGradient>
        <linearGradient id="bulb-chrome-shine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
          <stop offset="40%" stop-color="rgba(255,255,255,0.55)"/>
          <stop offset="60%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
        <clipPath id="bulb-glass-clip">
          <path d="${GLASS_PATH}"/>
        </clipPath>
        <filter id="bulb-inner-scatter" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.65 0" result="soft"/>
          <feMerge>
            <feMergeNode in="soft"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="bulb-filament-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="bulb-flare" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.6"/>
        </filter>
      </defs>
      <path class="lightbulb__glass" d="${GLASS_PATH}" fill="url(#bulb-glass-off)"/>
      <path class="lightbulb__rim" d="${GLASS_PATH}" fill="none" stroke="url(#bulb-rim)" stroke-width="1.1"/>
      <path class="lightbulb__inner" d="${GLASS_PATH}" fill="url(#bulb-inner-glow)" clip-path="url(#bulb-glass-clip)"/>
      <path class="lightbulb__thunder-fill" d="${GLASS_PATH}" fill="url(#bulb-thunder-glow)" clip-path="url(#bulb-glass-clip)"/>
      <circle class="lightbulb__thunder-core" cx="60" cy="64" r="12" fill="url(#bulb-thunder-core)" clip-path="url(#bulb-glass-clip)"/>
      <path class="lightbulb__glass-tint" d="${GLASS_PATH}" fill="url(#bulb-glass-lit)"/>
      <path class="lightbulb__glass-thunder-tint" d="${GLASS_PATH}" fill="url(#bulb-glass-thunder)" clip-path="url(#bulb-glass-clip)"/>
      <path class="lightbulb__specular" d="M38 28 C36 42 35 58 38 72 C39 78 40 84 41 88" stroke="rgba(255,255,255,0.65)" stroke-width="2.8" stroke-linecap="round" opacity="0.7"/>
      <ellipse class="lightbulb__specular-dot" cx="76" cy="52" rx="3.5" ry="8" fill="rgba(255,255,255,0.18)" transform="rotate(14 76 52)"/>
      <g class="lightbulb__internals" clip-path="url(#bulb-glass-clip)">
        <path class="lightbulb__stem" d="M60 115 L60 94" stroke="rgba(180,188,200,0.5)" stroke-width="2.4" stroke-linecap="round"/>
        <path class="lightbulb__wire" d="M60 94 L43 72" stroke="rgba(110,108,102,0.75)" stroke-width="0.85" stroke-linecap="round"/>
        <path class="lightbulb__wire" d="M60 94 L77 72" stroke="rgba(110,108,102,0.75)" stroke-width="0.85" stroke-linecap="round"/>
        <path class="lightbulb__filament" d="M43 72 C45.5 68 47.5 72 50 72 C52.5 72 54.5 68 57 72 C59.5 76 61.5 72 64 72 C66.5 72 68.5 68 71 72 C73.5 72 75 70 77 72" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="lightbulb__filament-core" d="M46 72 C48 70 52 70 54 72 C56 74 58 72 60 72 C62 72 64 74 66 72 C68 70 72 70 74 72" stroke-width="0.55" stroke-linecap="round"/>
      </g>
      <g class="lightbulb__flare" filter="url(#bulb-flare)">
        <line x1="60" y1="64" x2="60" y2="50" stroke="rgba(248, 252, 255, 0.45)" stroke-width="0.6"/>
        <line x1="60" y1="64" x2="48" y2="56" stroke="rgba(240, 248, 255, 0.3)" stroke-width="0.45"/>
        <line x1="60" y1="64" x2="72" y2="56" stroke="rgba(240, 248, 255, 0.3)" stroke-width="0.45"/>
        <line x1="60" y1="64" x2="52" y2="70" stroke="rgba(235, 244, 252, 0.22)" stroke-width="0.4"/>
        <line x1="60" y1="64" x2="68" y2="70" stroke="rgba(235, 244, 252, 0.22)" stroke-width="0.4"/>
      </g>
      <path class="lightbulb__neck" d="M43 115 L43 119 C43 121 45 123 47 123 L73 123 C75 123 77 121 77 119 L77 115" fill="rgba(210,215,225,0.15)" stroke="rgba(255,255,255,0.14)" stroke-width="0.55"/>
      <g class="lightbulb__base">
        <rect class="lightbulb__base-body" x="39" y="123" width="42" height="36" rx="2" fill="url(#bulb-chrome)"/>
        <rect class="lightbulb__base-glow" x="39" y="123" width="42" height="36" rx="2" fill="url(#bulb-chrome-lit)" opacity="0"/>
        <rect x="39" y="123" width="42" height="36" rx="2" fill="url(#bulb-chrome-shine)"/>
        ${THREADS}
        <rect x="45" y="156" width="30" height="5" rx="1" class="lightbulb__contact"/>
      </g>
    </svg>`;
  return root;
}

export function setLightbulbPhase(element, phase, revealed = false) {
  element.className = [
    "lightbulb",
    `lightbulb--${phase}`,
    revealed ? "lightbulb--revealed" : "",
  ]
    .filter(Boolean)
    .join(" ");
}
