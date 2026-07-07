/**
 * Regenerates phantom-lightning.webp from the original humanoid silhouette.
 * Lightning veins are melted into soft blue ethereal glow — shape stays readable.
 */
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT = join(ROOT, "public/phantom/phantom-lightning.webp");
const REF_COMMIT = "69d581c:public/phantom/phantom-lightning.webp";

async function main() {
  const refBuffer = execSync(`git show ${REF_COMMIT}`, { cwd: ROOT });

  const softened = await sharp(refBuffer)
    .ensureAlpha()
    .blur(5)
    .modulate({ brightness: 0.78, saturation: 1.12 })
    .png()
    .toBuffer();

  const { data, info } = await sharp(softened)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
  const lum = (r * 0.22 + g * 0.62 + b * 0.18) / 255;
    pixels[i] = Math.min(255, 40 + lum * 90);
    pixels[i + 1] = Math.min(255, 120 + lum * 110);
    pixels[i + 2] = Math.min(255, 210 + lum * 45);
    pixels[i + 3] = a;
  }

  const composed = await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toBuffer();

  writeFileSync(OUTPUT, composed);
  console.log(`Wrote phantom to ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
