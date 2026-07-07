/**
 * Regenerates public/phantom/phantom-lightning.webp as a soft, natural
 * ethereal humanoid — no lightning veins.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT = join(ROOT, "public/phantom/phantom-lightning.webp");

const WIDTH = 595;
const HEIGHT = 1353;

function buildSilhouetteSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <path fill="white" d="
    M 297 54
    C 252 54 220 88 212 134
    C 204 176 214 210 202 242
    C 176 248 150 270 136 306
    C 122 346 130 386 118 424
    C 108 456 90 482 96 516
    C 102 548 122 566 134 598
    C 146 628 142 664 150 702
    C 158 742 170 784 176 826
    C 182 864 174 902 184 942
    C 192 978 214 1006 228 1048
    C 240 1084 236 1120 244 1158
    C 252 1194 268 1224 276 1260
    C 284 1294 290 1322 297 1336
    C 304 1322 310 1294 318 1260
    C 326 1224 342 1194 350 1158
    C 358 1120 354 1084 366 1048
    C 380 1006 402 978 410 942
    C 420 902 412 864 418 826
    C 424 784 436 742 444 702
    C 452 664 448 628 460 598
    C 472 566 492 548 498 516
    C 504 482 486 456 476 424
    C 464 386 472 346 458 306
    C 444 270 418 248 392 242
    C 380 210 390 176 382 134
    C 374 88 342 54 297 54
    Z"/>
</svg>`;
}

function buildNaturalBodySvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="12"/>
    </filter>
    <radialGradient id="torso" cx="50%" cy="32%" r="42%">
      <stop offset="0%" stop-color="rgba(245,252,255,0.72)"/>
      <stop offset="45%" stop-color="rgba(180,230,255,0.34)"/>
      <stop offset="100%" stop-color="rgba(60,150,255,0)"/>
    </radialGradient>
    <radialGradient id="limbs" cx="50%" cy="62%" r="48%">
      <stop offset="0%" stop-color="rgba(170,225,255,0.22)"/>
      <stop offset="70%" stop-color="rgba(90,180,255,0.1)"/>
      <stop offset="100%" stop-color="rgba(40,120,220,0)"/>
    </radialGradient>
    <radialGradient id="shell" cx="50%" cy="40%" r="54%">
      <stop offset="62%" stop-color="rgba(0,100,220,0)"/>
      <stop offset="86%" stop-color="rgba(120,210,255,0.16)"/>
      <stop offset="100%" stop-color="rgba(230,248,255,0.42)"/>
    </radialGradient>
  </defs>
  <g filter="url(#soft)">
    <ellipse cx="297" cy="470" rx="118" ry="310" fill="rgba(150,220,255,0.16)"/>
    <ellipse cx="297" cy="360" rx="88" ry="200" fill="url(#torso)"/>
    <ellipse cx="297" cy="760" rx="96" ry="280" fill="url(#limbs)"/>
    <ellipse cx="214" cy="430" rx="54" ry="170" fill="rgba(160,225,255,0.12)"/>
    <ellipse cx="380" cy="430" rx="54" ry="170" fill="rgba(160,225,255,0.12)"/>
  </g>
  <rect width="100%" height="100%" fill="url(#shell)" opacity="0.85"/>
</svg>`;
}

async function main() {
  const bodySvg = buildNaturalBodySvg();
  const silhouetteSvg = buildSilhouetteSvg();

  const silhouetteMask = await sharp(Buffer.from(silhouetteSvg))
    .resize(WIDTH, HEIGHT, { fit: "fill" })
    .ensureAlpha()
    .extractChannel("alpha")
    .blur(3)
    .png()
    .toBuffer();

  const bodyLayer = await sharp(Buffer.from(bodySvg))
    .resize(WIDTH, HEIGHT, { fit: "fill" })
    .ensureAlpha()
    .composite([{ input: silhouetteMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const edgeGlow = await sharp(silhouetteMask)
    .blur(10)
    .toColourspace("b-w")
    .joinChannel(silhouetteMask)
    .tint({ r: 140, g: 215, b: 255 })
    .png()
    .toBuffer();

  const composed = await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: edgeGlow, blend: "screen", opacity: 0.28 },
      { input: bodyLayer, blend: "over" },
    ])
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toBuffer();

  writeFileSync(OUTPUT, composed);
  console.log(`Wrote natural phantom to ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
