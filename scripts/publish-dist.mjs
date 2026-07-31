/**
 * Copies Vite build output into dist/ without wiping legacy workout-media.
 * Prefers unlocked temp outDirs (.vite-fresh) because Live Server locks dist/.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dest = path.join(root, "dist");
const destAssets = path.join(dest, "assets");

const force = process.env.PUBLISH_FORCE;
const sourceCandidates = [
  force,
  // Prefer the outDir from `npm run build` (vite --outDir kh-build-now).
  "kh-build-now",
  ".vite-fresh",
  ".kh-build-out",
  // Legacy / experimental build folders (fallback only).
  "kh-bw-atlas",
  "kh-mh-api",
  "kh-mh-live",
  "kh-mh-v1",
  "kh-mom-v7",
  "kh-mom-v6",
  "kh-mom-v5",
  "kh-mom-v4",
  "kh-mom-v3",
  "build-mothers-tmp",
  "kh-cam-build",
]
  .filter(Boolean)
  .map((name) => path.join(root, name));
const source = sourceCandidates.find((dir) => {
  if (!fs.existsSync(path.join(dir, "index.html")) || !fs.existsSync(path.join(dir, "assets"))) {
    return false;
  }
  // Require a real Vite app bundle — skip folders that only have public/ copies.
  try {
    return fs.readdirSync(path.join(dir, "assets")).some((n) => /^index-[A-Za-z0-9_-]+\.js$/.test(n));
  } catch {
    return false;
  }
});

if (!source) {
  console.error("[publish-dist] No build folder with index.html + assets. Run vite build first.");
  process.exit(1);
}

const sourceAssets = path.join(source, "assets");

function copyFileSafe(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  try {
    fs.copyFileSync(from, to);
    return true;
  } catch (err) {
    // Live Server may lock old hashed files — new hashes usually still copy.
    console.warn(`[publish-dist] skip ${path.basename(to)}: ${err.code || err.message}`);
    return false;
  }
}

fs.mkdirSync(destAssets, { recursive: true });

// Copy only app bundles (not entire public tree / workout-media).
let copied = 0;
for (const name of fs.readdirSync(sourceAssets)) {
  if (!/\.(js|css|map|woff2?|png|jpg|svg|webp)$/i.test(name)) continue;
  if (copyFileSafe(path.join(sourceAssets, name), path.join(destAssets, name))) copied += 1;
}

const indexOk = copyFileSafe(path.join(source, "index.html"), path.join(dest, "index.html"));
if (!indexOk) {
  console.error("[publish-dist] Could not update dist/index.html — stop Go Live and retry.");
  process.exit(1);
}

const viteSvg = path.join(source, "vite.svg");
if (fs.existsSync(viteSvg)) copyFileSafe(viteSvg, path.join(dest, "vite.svg"));

// Product pack shots for First-Time Mothers Essentials (from public/ via Vite outDir)
const essentialsSrc = path.join(source, "ftm-essentials");
const essentialsDest = path.join(dest, "ftm-essentials");
if (fs.existsSync(essentialsSrc)) {
  fs.mkdirSync(essentialsDest, { recursive: true });
  let n = 0;
  for (const name of fs.readdirSync(essentialsSrc)) {
    if (!/\.(png|jpe?g|webp|gif|svg)$/i.test(name)) continue;
    if (copyFileSafe(path.join(essentialsSrc, name), path.join(essentialsDest, name))) n += 1;
  }
  console.log(`[publish-dist] ftm-essentials → dist/ (${n} product images)`);
}

const mediapipeSrc = path.join(root, "public", "mediapipe");
const mediapipeDest = path.join(dest, "mediapipe");
if (fs.existsSync(mediapipeSrc) && !fs.existsSync(mediapipeDest)) {
  fs.cpSync(mediapipeSrc, mediapipeDest, { recursive: true });
}

// BodyWise anatomical 3D model (Z-Anatomy GLB + attribution)
const bodywiseSrc = path.join(source, "bodywise");
const bodywiseDest = path.join(dest, "bodywise");
if (fs.existsSync(bodywiseSrc)) {
  fs.cpSync(bodywiseSrc, bodywiseDest, { recursive: true });
  console.log("[publish-dist] bodywise models → dist/");
} else {
  const publicBody = path.join(root, "public", "bodywise");
  if (fs.existsSync(publicBody)) {
    fs.cpSync(publicBody, bodywiseDest, { recursive: true });
    console.log("[publish-dist] bodywise models → dist/ (from public/)");
  }
}

const html = fs.readFileSync(path.join(dest, "index.html"), "utf8");
const jsMatch = html.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/);
const cssMatch = html.match(/assets\/(index-[A-Za-z0-9_-]+\.css)/);
if (!jsMatch || !fs.existsSync(path.join(destAssets, jsMatch[1]))) {
  console.error("[publish-dist] index.html references missing JS bundle:", jsMatch?.[1]);
  process.exit(1);
}
if (cssMatch && !fs.existsSync(path.join(destAssets, cssMatch[1]))) {
  console.error("[publish-dist] index.html references missing CSS bundle:", cssMatch[1]);
  process.exit(1);
}

console.log(
  `[publish-dist] ${path.basename(source)} → dist/ (${jsMatch[1]}, ${copied} asset files). Stop Go Live → Go Live → Ctrl+Shift+R.`,
);
