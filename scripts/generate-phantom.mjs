/**
 * Regenerates public/phantom/phantom-lightning.webp with more irregular
 * interior lightning veins while preserving the existing body silhouette.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const INPUT = join(ROOT, "public/phantom/phantom-lightning.webp");
const OUTPUT = INPUT;

const WIDTH = 595;
const HEIGHT = 1353;
const SEED = 0x7a4e21c9;

function makeRand(seed) {
  let state = seed >>> 0 || 1;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function displaceChannel(from, to, roughness, depth, rand) {
  if (depth === 0) return [from, to];
  const midX = (from.x + to.x) / 2 + (rand() * 2 - 1) * roughness;
  const midY = (from.y + to.y) / 2 + (rand() * 2 - 1) * roughness * 0.55;
  const mid = { x: midX, y: midY };
  const left = displaceChannel(from, mid, roughness / 1.75, depth - 1, rand);
  const right = displaceChannel(mid, to, roughness / 1.75, depth - 1, rand);
  return [...left.slice(0, -1), ...right];
}

function toPath(points) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

function clampPoint(p) {
  return {
    x: Math.max(18, Math.min(WIDTH - 18, p.x)),
    y: Math.max(40, Math.min(HEIGHT - 24, p.y)),
  };
}

function growVein(from, to, roughness, depth, rand) {
  return displaceChannel(from, to, roughness, depth, rand).map(clampPoint);
}

function branchFromTrunk(trunk, rand, roughness) {
  const idx = 2 + Math.floor(rand() * Math.max(1, trunk.length - 4));
  const origin = trunk[idx];
  const angle = rand() * Math.PI * 2;
  const len = 28 + rand() * 130;
  const end = clampPoint({
    x: origin.x + Math.cos(angle) * len * (0.55 + rand()),
    y: origin.y + Math.sin(angle) * len * (0.55 + rand()),
  });
  return growVein(origin, end, roughness * (0.45 + rand() * 0.55), 3 + Math.floor(rand() * 3), rand);
}

function generateVeins(rand) {
  const strokes = [];
  const chest = { x: WIDTH * 0.5, y: HEIGHT * 0.285 };

  const addStroke = (points, width, opacity, bright = false) => {
    strokes.push({
      d: toPath(points),
      width,
      opacity,
      bright,
    });
  };

  // Chaotic primary discharges from chest — random angles, not anatomical
  for (let i = 0; i < 22; i += 1) {
    const angle = rand() * Math.PI * 2;
    const len = 95 + rand() * 320;
    const end = clampPoint({
      x: chest.x + Math.cos(angle) * len * (0.35 + rand() * 0.95),
      y: chest.y + Math.sin(angle) * len * (0.45 + rand() * 1.05),
    });
    const trunk = growVein(chest, end, 38 + rand() * 52, 5 + Math.floor(rand() * 3), rand);
    addStroke(trunk, 1.4 + rand() * 2.4, 0.42 + rand() * 0.48, rand() > 0.72);

    const branchCount = 1 + Math.floor(rand() * 3);
    for (let b = 0; b < branchCount; b += 1) {
      const branch = branchFromTrunk(trunk, rand, 30 + rand() * 30);
      addStroke(branch, 0.7 + rand() * 1.6, 0.28 + rand() * 0.42);
    }
  }

  // Scattered secondary arcs across torso and limbs
  for (let i = 0; i < 34; i += 1) {
    const start = clampPoint({
      x: WIDTH * (0.18 + rand() * 0.64),
      y: HEIGHT * (0.16 + rand() * 0.68),
    });
    const angle = rand() * Math.PI * 2;
    const len = 45 + rand() * 185;
    const end = clampPoint({
      x: start.x + Math.cos(angle) * len,
      y: start.y + Math.sin(angle) * len,
    });
    const vein = growVein(start, end, 24 + rand() * 42, 4 + Math.floor(rand() * 2), rand);
    addStroke(vein, 0.8 + rand() * 1.9, 0.22 + rand() * 0.45);

    if (rand() > 0.55) {
      addStroke(branchFromTrunk(vein, rand, 20 + rand() * 22), 0.5 + rand() * 1.1, 0.18 + rand() * 0.32);
    }
  }

  // Erratic micro-scratches and forked ticks
  for (let i = 0; i < 48; i += 1) {
    const start = clampPoint({
      x: WIDTH * (0.2 + rand() * 0.6),
      y: HEIGHT * (0.14 + rand() * 0.72),
    });
    const angle = rand() * Math.PI * 2;
    const len = 12 + rand() * 68;
    const end = clampPoint({
      x: start.x + Math.cos(angle) * len,
      y: start.y + Math.sin(angle) * len,
    });
    const scratch = growVein(start, end, 10 + rand() * 22, 2 + Math.floor(rand() * 2), rand);
    addStroke(scratch, 0.35 + rand() * 0.9, 0.14 + rand() * 0.28);
  }

  // Jagged cross-links between random interior points
  for (let i = 0; i < 16; i += 1) {
    const a = clampPoint({
      x: WIDTH * (0.24 + rand() * 0.52),
      y: HEIGHT * (0.2 + rand() * 0.58),
    });
    const b = clampPoint({
      x: a.x + (rand() * 2 - 1) * (60 + rand() * 140),
      y: a.y + (rand() * 2 - 1) * (60 + rand() * 140),
    });
    const link = growVein(a, b, 16 + rand() * 28, 3, rand);
    addStroke(link, 0.45 + rand() * 0.85, 0.12 + rand() * 0.22);
  }

  return strokes;
}

function buildSvg(strokes) {
  const pathMarkup = strokes
    .map((s) => {
      const color = s.bright ? "rgba(232,251,255,0.95)" : "rgba(0,183,255,0.92)";
      return `<path d="${s.d}" fill="none" stroke="${color}" stroke-width="${s.width.toFixed(2)}" stroke-opacity="${s.opacity.toFixed(3)}" stroke-linecap="round" stroke-linejoin="round"/>`;
    })
    .join("\n    ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <filter id="vein-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.8" result="blur"/>
      <feColorMatrix in="blur" type="matrix"
        values="0 0 0 0 0
                0 0 0 0 0.72
                0 0 0 0 1
                0 0 0 0.85 0" result="glow"/>
      <feMerge>
        <feMergeNode in="glow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <radialGradient id="body-fill" cx="50%" cy="34%" r="68%">
      <stop offset="0%" stop-color="rgba(0,183,255,0.14)"/>
      <stop offset="55%" stop-color="rgba(0,120,255,0.08)"/>
      <stop offset="100%" stop-color="rgba(0,40,120,0)"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#body-fill)" opacity="0.35"/>
  <g filter="url(#vein-glow)">
    ${pathMarkup}
  </g>
</svg>`;
}

async function main() {
  const rand = makeRand(SEED);
  const strokes = generateVeins(rand);
  const svg = buildSvg(strokes);

  const meta = await sharp(INPUT).metadata();
  const w = meta.width ?? WIDTH;
  const h = meta.height ?? HEIGHT;

  const veinsLayer = await sharp(Buffer.from(svg))
    .resize(w, h, { fit: "fill" })
    .ensureAlpha()
    .png()
    .toBuffer();

  const interiorMask = await sharp(INPUT)
    .ensureAlpha()
    .extractChannel("alpha")
    .median(3)
    .blur(0.8)
    .linear(1.05, -18)
    .png()
    .toBuffer();

  const maskedVeins = await sharp(veinsLayer)
    .composite([{ input: interiorMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const composed = await sharp(INPUT)
    .ensureAlpha()
    .modulate({ brightness: 0.86, saturation: 0.8 })
    .composite([{ input: maskedVeins, blend: "screen", opacity: 0.96 }])
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toBuffer();

  writeFileSync(OUTPUT, composed);
  console.log(`Wrote ${OUTPUT} (${strokes.length} vein strokes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
