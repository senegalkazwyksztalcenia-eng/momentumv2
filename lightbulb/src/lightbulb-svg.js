const GLASS_PATH =
  "M60 6.5 C41 6.5 26.5 25 24.5 47.5 C22.5 66 26.5 82.5 33.5 94.5 C35.5 98.5 37.5 102.5 38.5 106.5 L38.5 110.5 C38.5 112.8 40.5 114.5 43.5 114.5 L76.5 114.5 C79.5 114.5 81.5 112.8 81.5 110.5 L81.5 106.5 C82.5 102.5 84.5 98.5 86.5 94.5 C93.5 82.5 97.5 66 95.5 47.5 C93.5 25 79 6.5 60 6.5 Z";

const THREADS = [0, 1, 2, 3, 4, 5, 6, 7]
  .map((i) => {
    const y = 128.5 + i * 3.85;
    return `<path class="lightbulb__thread" d="M40.5 ${y} Q60 ${y + 0.35} 79.5 ${y}" stroke="rgba(28,30,34,0.55)" stroke-width="0.9" fill="none"/>`;
  })
  .join("");

function uid() {
  return `b${Math.random().toString(36).slice(2, 9)}`;
}

export function createLightbulbElement() {
  const id = uid();
  const root = document.createElement("div");
  root.className = "lightbulb lightbulb--off";
  root.dataset.bulbId = id;
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <span class="lightbulb__bloom"></span>
    <span class="lightbulb__bloom lightbulb__bloom--tight"></span>
    <span class="lightbulb__ground"></span>
    <svg class="lightbulb__svg" viewBox="0 0 120 176" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="${id}-inner-glow" cx="48%" cy="44%" r="52%">
          <stop offset="0%" stop-color="#fffef5" stop-opacity="1"/>
          <stop offset="8%" stop-color="#fff6d8" stop-opacity="0.96"/>
          <stop offset="22%" stop-color="#ffe9a8" stop-opacity="0.82"/>
          <stop offset="42%" stop-color="#ffc85a" stop-opacity="0.52"/>
          <stop offset="62%" stop-color="#ff9e28" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="#ff7800" stop-opacity="0"/>
        </radialGradient>

        <radialGradient id="${id}-cavity" cx="50%" cy="42%" r="48%">
          <stop offset="0%" stop-color="rgba(8,10,16,0.15)"/>
          <stop offset="55%" stop-color="rgba(4,6,12,0.42)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.62)"/>
        </radialGradient>

        <linearGradient id="${id}-glass-body" x1="18%" y1="6%" x2="82%" y2="94%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.14)"/>
          <stop offset="18%" stop-color="rgba(230,238,248,0.06)"/>
          <stop offset="48%" stop-color="rgba(180,195,210,0.03)"/>
          <stop offset="72%" stop-color="rgba(140,155,170,0.05)"/>
          <stop offset="100%" stop-color="rgba(200,210,220,0.08)"/>
        </linearGradient>

        <linearGradient id="${id}-glass-lit" x1="30%" y1="4%" x2="70%" y2="96%">
          <stop offset="0%" stop-color="rgba(255,248,230,0.22)"/>
          <stop offset="45%" stop-color="rgba(255,215,130,0.14)"/>
          <stop offset="100%" stop-color="rgba(255,170,70,0.05)"/>
        </linearGradient>

        <linearGradient id="${id}-rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.62)"/>
          <stop offset="12%" stop-color="rgba(255,255,255,0.12)"/>
          <stop offset="50%" stop-color="rgba(200,210,225,0.08)"/>
          <stop offset="88%" stop-color="rgba(255,255,255,0.1)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.48)"/>
        </linearGradient>

        <linearGradient id="${id}-spec-streak" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.92)"/>
          <stop offset="55%" stop-color="rgba(255,255,255,0.35)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>

        <linearGradient id="${id}-brass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f0f2f5"/>
          <stop offset="6%" stop-color="#d8dde4"/>
          <stop offset="22%" stop-color="#a8b0ba"/>
          <stop offset="42%" stop-color="#8e969f"/>
          <stop offset="58%" stop-color="#b4bcc6"/>
          <stop offset="78%" stop-color="#7a828c"/>
          <stop offset="100%" stop-color="#5c636c"/>
        </linearGradient>

        <linearGradient id="${id}-brass-lit" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f8ecd0"/>
          <stop offset="35%" stop-color="#d4b070"/>
          <stop offset="70%" stop-color="#a07840"/>
          <stop offset="100%" stop-color="#6a5228"/>
        </linearGradient>

        <linearGradient id="${id}-brass-side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.22)"/>
          <stop offset="18%" stop-color="rgba(255,255,255,0.18)"/>
          <stop offset="50%" stop-color="rgba(255,255,255,0.05)"/>
          <stop offset="82%" stop-color="rgba(0,0,0,0.12)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.28)"/>
        </linearGradient>

        <linearGradient id="${id}-neck-glass" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stop-color="rgba(220,228,238,0.28)"/>
          <stop offset="100%" stop-color="rgba(160,170,185,0.12)"/>
        </linearGradient>

        <clipPath id="${id}-glass-clip">
          <path d="${GLASS_PATH}"/>
        </clipPath>

        <filter id="${id}-inner-scatter" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="blur"/>
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.7 0" result="soft"/>
          <feMerge>
            <feMergeNode in="soft"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="${id}-fil-glow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="1.4" result="b"/>
          <feMerge>
            <feMergeNode in="b"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="${id}-glass-shadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.8" flood-color="#000" flood-opacity="0.45"/>
        </filter>
      </defs>

      <!-- Glass envelope -->
      <g filter="url(#${id}-glass-shadow)">
        <path class="lightbulb__glass" d="${GLASS_PATH}" fill="url(#${id}-glass-body)"/>
        <path class="lightbulb__cavity" d="${GLASS_PATH}" fill="url(#${id}-cavity)" clip-path="url(#${id}-glass-clip)"/>
        <path class="lightbulb__inner" d="${GLASS_PATH}" fill="url(#${id}-inner-glow)" clip-path="url(#${id}-glass-clip)"/>
        <path class="lightbulb__glass-tint" d="${GLASS_PATH}" fill="url(#${id}-glass-lit)"/>
        <path class="lightbulb__rim" d="${GLASS_PATH}" fill="none" stroke="url(#${id}-rim)" stroke-width="0.85"/>
      </g>

      <!-- Exhaust tip -->
      <ellipse class="lightbulb__tip" cx="60" cy="8.5" rx="2.2" ry="1.1" fill="rgba(200,208,218,0.35)"/>

      <!-- Specular highlights -->
      <path class="lightbulb__specular" d="M36 24 C34.5 38 33.5 54 36 70 C37 78 38 86 39 92" stroke="url(#${id}-spec-streak)" stroke-width="3.2" stroke-linecap="round"/>
      <path class="lightbulb__specular-soft" d="M37 30 C35.5 44 35 58 37 72" stroke="rgba(255,255,255,0.22)" stroke-width="5" stroke-linecap="round"/>
      <ellipse class="lightbulb__specular-dot" cx="78" cy="50" rx="4" ry="9" fill="rgba(255,255,255,0.16)" transform="rotate(12 78 50)"/>
      <path class="lightbulb__specular-arc" d="M82 68 C84 58 83 48 80 40" stroke="rgba(255,255,255,0.08)" stroke-width="2" stroke-linecap="round"/>

      <!-- Internal assembly -->
      <g class="lightbulb__internals" clip-path="url(#${id}-glass-clip)">
        <path class="lightbulb__stem" d="M60 114 L60 96" stroke="rgba(170,178,190,0.55)" stroke-width="2.2" stroke-linecap="round"/>
        <path class="lightbulb__stem-glass" d="M57 114 L57 100 C57 98 58.5 96.5 60 96.5 C61.5 96.5 63 98 63 100 L63 114" stroke="rgba(200,210,222,0.2)" stroke-width="0.8" fill="none"/>

        <path class="lightbulb__wire" d="M60 96 L44.5 73.5" stroke="rgba(95,92,86,0.82)" stroke-width="0.75" stroke-linecap="round"/>
        <path class="lightbulb__wire" d="M60 96 L75.5 73.5" stroke="rgba(95,92,86,0.82)" stroke-width="0.75" stroke-linecap="round"/>
        <path class="lightbulb__wire-shadow" d="M60 96 L44.5 73.5" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" stroke-linecap="round"/>

        <!-- Coiled-coil filament -->
        <path class="lightbulb__filament"
          d="M44.5 73.5
             C46 69.5 48 73.5 49.5 69.5 C51 73.5 52.5 69.5 54 73.5 C55.5 69.5 57 73.5 58.5 69.5
             C60 73.5 61.5 69.5 63 73.5 C64.5 69.5 66 73.5 67.5 69.5 C69 73.5 70.5 69.5 72 73.5 C73.5 69.5 75 73.5 75.5 73.5"
          stroke-width="0.95" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="lightbulb__filament-back"
          d="M45 74.2 C46.5 70.8 48.2 74.2 49.8 70.8 C51.4 74.2 53 70.8 54.6 74.2 C56.2 70.8 57.8 74.2 59.4 70.8
             C61 74.2 62.6 70.8 64.2 74.2 C65.8 70.8 67.4 74.2 69 70.8 C70.6 74.2 72.2 70.8 74 74.2"
          stroke-width="0.55" stroke-linecap="round" opacity="0.45"/>
        <path class="lightbulb__filament-core"
          d="M46.5 73.5 C48 71.5 50 71.5 51.5 73.5 C53 75.5 55 75.5 56.5 73.5 C58 71.5 60 71.5 61.5 73.5
             C63 75.5 65 75.5 66.5 73.5 C68 71.5 70 71.5 71.5 73.5"
          stroke-width="0.45" stroke-linecap="round"/>
      </g>

      <!-- Lens flare when lit -->
      <g class="lightbulb__flare" clip-path="url(#${id}-glass-clip)">
        <line x1="60" y1="62" x2="60" y2="46" stroke="rgba(255,252,245,0.35)" stroke-width="0.5"/>
        <line x1="60" y1="62" x2="50" y2="54" stroke="rgba(255,248,235,0.2)" stroke-width="0.35"/>
        <line x1="60" y1="62" x2="70" y2="54" stroke="rgba(255,248,235,0.2)" stroke-width="0.35"/>
      </g>

      <!-- Fused glass neck -->
      <path class="lightbulb__neck" d="M43.5 114.5 L43.5 119.5 C43.5 121.8 45.2 123.5 47.5 123.5 L72.5 123.5 C74.8 123.5 76.5 121.8 76.5 119.5 L76.5 114.5"
        fill="url(#${id}-neck-glass)" stroke="rgba(255,255,255,0.12)" stroke-width="0.5"/>

      <!-- Insulator ring -->
      <rect class="lightbulb__insulator" x="40" y="122" width="40" height="3.5" rx="0.5" fill="#1a1c20"/>

      <!-- E27 brass base -->
      <g class="lightbulb__base">
        <path class="lightbulb__base-body" d="M39.5 125.5 L39.5 158.5 C39.5 160.2 41 161.5 43 161.5 L77 161.5 C79 161.5 80.5 160.2 80.5 158.5 L80.5 125.5 Z" fill="url(#${id}-brass)"/>
        <path class="lightbulb__base-glow" d="M39.5 125.5 L39.5 158.5 C39.5 160.2 41 161.5 43 161.5 L77 161.5 C79 161.5 80.5 160.2 80.5 158.5 L80.5 125.5 Z" fill="url(#${id}-brass-lit)" opacity="0"/>
        <path class="lightbulb__base-shine" d="M39.5 125.5 L39.5 158.5 C39.5 160.2 41 161.5 43 161.5 L77 161.5 C79 161.5 80.5 160.2 80.5 158.5 L80.5 125.5 Z" fill="url(#${id}-brass-side)"/>
        ${THREADS}
        <rect class="lightbulb__contact" x="46" y="159" width="28" height="4.5" rx="1.2" fill="#0e0f12"/>
        <ellipse class="lightbulb__contact-dot" cx="60" cy="161.2" rx="4" ry="1.2" fill="#2a2c32"/>
      </g>
    </svg>`;

  root.style.setProperty("--bulb-filter-glow", `url(#${id}-fil-glow)`);
  root.style.setProperty("--bulb-filter-scatter", `url(#${id}-inner-scatter)`);

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
