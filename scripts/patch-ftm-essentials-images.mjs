/**
 * Point every Essentials product.image at its unique local real pack shot.
 * Run after images exist in public/ftm-essentials/
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const imgDir = path.join(root, "public", "ftm-essentials");
const essentialsPath = path.join(root, "src", "features", "first-time-mothers", "data", "essentials.js");

const IDS = [
  "nanit-pro",
  "owlet-dream-sock",
  "eufy-spaceview-pro",
  "cubo-ai-plus",
  "ergobaby-omni-breeze",
  "babybjorn-mini",
  "babybjorn-harmony",
  "ergobaby-embrace",
  "stokke-limas",
  "uppababy-vista-v2",
  "bugaboo-butterfly",
  "doona-plus",
  "uppababy-minu-v2",
  "bugaboo-fox-5",
  "medela-freestyle-flex",
  "spectra-s1-plus",
  "elvie-pump",
  "momcozy-s12-pro",
  "philips-avent-double",
  "philips-avent-natural",
  "comotomo-natural-feel",
  "dr-browns-options-plus",
  "tommee-tippee-closer",
  "philips-avent-anti-colic",
  "bibs-colour",
  "philips-soothie",
  "fridababy-nosefrida",
  "hatch-rest-plus",
  "fridababy-humidifier",
  "halo-sleepsack-swaddle",
  "love-to-dream-swaddle-up",
  "halo-bassinest",
  "skip-hop-moonlight",
  "stokke-sleepi-mini",
  "braun-thermoscan-7",
  "fridababy-3in1-ear",
  "skip-hop-moby-bath",
  "stokke-flexi-bath",
  "fridababy-nailfrida",
  "baby-brezza-formula-pro",
  "baby-brezza-sterilizer",
  "philips-avent-warmer",
  "medela-storage-bags",
  "momcozy-nursing-pillow",
];

function findFile(id) {
  const files = fs.readdirSync(imgDir).filter((f) => f.startsWith(id + ".") && !f.endsWith(".json"));
  // Prefer larger files (real photos over tiny placeholders)
  files.sort((a, b) => fs.statSync(path.join(imgDir, b)).size - fs.statSync(path.join(imgDir, a)).size);
  return files[0] || null;
}

// Prefer nanit backup if it's larger
const nanitBackup = path.join(imgDir, "_nanit-backup.webp");
const nanitJpg = path.join(imgDir, "nanit-pro.jpg");
if (fs.existsSync(nanitBackup)) {
  const backupSize = fs.statSync(nanitBackup).size;
  const jpgSize = fs.existsSync(nanitJpg) ? fs.statSync(nanitJpg).size : 0;
  if (backupSize > jpgSize) {
    fs.copyFileSync(nanitBackup, path.join(imgDir, "nanit-pro.webp"));
    if (fs.existsSync(nanitJpg) && jpgSize < 40000) fs.unlinkSync(nanitJpg);
  }
}

const mapping = {};
const missing = [];
for (const id of IDS) {
  const file = findFile(id);
  if (!file) {
    missing.push(id);
    continue;
  }
  mapping[id] = `/ftm-essentials/${file}`;
}

let src = fs.readFileSync(essentialsPath, "utf8");

for (const [id, local] of Object.entries(mapping)) {
  // Match product object starting at id, replace first "image" field in that block
  const re = new RegExp(`("id"\\s*:\\s*"${id}"[\\s\\S]*?"image"\\s*:\\s*")[^"]*(")`);
  if (!re.test(src)) {
    console.warn("NO MATCH", id);
    continue;
  }
  src = src.replace(re, `$1${local}$2`);
}

fs.writeFileSync(essentialsPath, src);
fs.writeFileSync(path.join(imgDir, "local-map.json"), JSON.stringify(mapping, null, 2));

console.log(`Mapped ${Object.keys(mapping).length}/44`);
if (missing.length) console.log("MISSING FILES:", missing.join(", "));

// verify uniqueness
const vals = Object.values(mapping);
console.log("unique paths", new Set(vals).size);
