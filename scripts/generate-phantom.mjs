/**
 * Restores the original humanoid phantom asset (clear silhouette + veins).
 */
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = join(ROOT, "public/phantom/phantom-lightning.webp");
const REF_COMMIT = "69d581c:public/phantom/phantom-lightning.webp";

writeFileSync(
  OUTPUT,
  execSync(`git show ${REF_COMMIT}`, { cwd: ROOT }),
);
console.log(`Restored phantom from ${REF_COMMIT}`);
