import { generateBolt } from "./lightning.js";
import {
  BULB_STRIKE_X,
  BULB_STRIKE_Y,
  BULB_VIEW_HEIGHT,
  BULB_VIEW_WIDTH,
} from "./bulb-geometry.js";

const BOLT_WIDTH = BULB_VIEW_WIDTH * 2.5;
const BOLT_HEIGHT = BULB_VIEW_HEIGHT * 3.55;
const STRIKE_X = (BULB_STRIKE_X / BULB_VIEW_WIDTH) * BOLT_WIDTH;
const STRIKE_Y = (BULB_STRIKE_Y / BULB_VIEW_HEIGHT) * BOLT_HEIGHT;
const VIEW_BOTTOM = STRIKE_Y + 6;

function layerClass(layer, path, isMain) {
  const base = `bulb-strike__${layer}`;
  if (isMain) return `${base} ${base}--main`;
  return `${base} ${base}--fork ${base}--${path.kind}`;
}

function renderPaths(paths, layer, isMain) {
  return paths
    .map(
      (path) =>
        `<path d="${path.d}" class="${layerClass(layer, path, isMain)}" pathLength="100" style="--fork-intensity:${path.intensity};--fork-delay:${path.delay}"/>`,
    )
    .join("");
}

export function createStrikeElement(strikeKey) {
  const bolt = generateBolt(BOLT_WIDTH, BOLT_HEIGHT, 1337 + strikeKey * 7919, {
    endX: STRIKE_X,
    endY: STRIKE_Y,
    branchMaxY: BOLT_HEIGHT * 0.58,
    roughness: BOLT_WIDTH * 0.36,
  });

  const main = [bolt.main];
  const forks = bolt.forks;

  const root = document.createElement("div");
  root.className = "bulb-strike";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <svg class="bulb-strike__svg" viewBox="0 0 ${BOLT_WIDTH} ${VIEW_BOTTOM}" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="bolt-core-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c8d8f0" stop-opacity="0.7"/>
          <stop offset="30%" stop-color="#eef4ff"/>
          <stop offset="65%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </linearGradient>
        <linearGradient id="bolt-blue-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(80, 140, 255, 0.5)"/>
          <stop offset="50%" stop-color="rgba(120, 180, 255, 0.85)"/>
          <stop offset="100%" stop-color="rgba(160, 210, 255, 0.7)"/>
        </linearGradient>
        <linearGradient id="bolt-violet-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(90, 60, 180, 0.35)"/>
          <stop offset="45%" stop-color="rgba(120, 90, 220, 0.55)"/>
          <stop offset="100%" stop-color="rgba(140, 110, 230, 0.3)"/>
        </linearGradient>
        <filter id="bolt-violet-filter" x="-120%" y="-5%" width="340%" height="110%">
          <feGaussianBlur stdDeviation="7"/>
        </filter>
        <filter id="bolt-blue-filter" x="-80%" y="-4%" width="260%" height="108%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>
        <filter id="bolt-core-filter" x="-50%" y="-3%" width="200%" height="106%">
          <feGaussianBlur stdDeviation="0.6" result="b"/>
          <feMerge>
            <feMergeNode in="b"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="bolt-fork-filter" x="-40%" y="-4%" width="180%" height="108%">
          <feGaussianBlur stdDeviation="1.2"/>
        </filter>
      </defs>
      ${renderPaths(forks, "violet", false)}
      ${renderPaths(main, "violet", true)}
      ${renderPaths(forks, "blue", false)}
      ${renderPaths(main, "blue", true)}
      ${renderPaths(main, "core", true)}
      <circle class="bulb-strike__terminus" cx="${STRIKE_X}" cy="${STRIKE_Y}" r="2.2"/>
      <circle class="bulb-strike__terminus-burst" cx="${STRIKE_X}" cy="${STRIKE_Y}" r="7"/>
    </svg>`;

  return root;
}
