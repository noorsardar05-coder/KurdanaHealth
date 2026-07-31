/**
 * Browser-assisted collector instructions are in the agent;
 * this script downloads from a URL map and patches essentials.js
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import http from "node:http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "ftm-essentials");
const mapPath = path.join(outDir, "url-map.json");
fs.mkdirSync(outDir, { recursive: true });

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 10) return reject(new Error("redirects"));
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: { "User-Agent": UA, Accept: "image/*,*/*", Referer: "https://www.google.com/" },
        timeout: 45000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return resolve(fetchBuffer(new URL(res.headers.location, url).href, redirects + 1));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({ buffer: Buffer.concat(chunks), contentType: res.headers["content-type"] || "" }),
        );
      },
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("timeout"));
    });
  });
}

function extFrom(url, ct) {
  if (/png/i.test(ct) || /\.png(\?|$)/i.test(url)) return ".png";
  if (/webp/i.test(ct) || /\.webp(\?|$)/i.test(url)) return ".webp";
  return ".jpg";
}

const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));
const report = { ok: [], fail: [] };

for (const [id, url] of Object.entries(map)) {
  if (!url) {
    report.fail.push({ id, error: "empty url" });
    continue;
  }
  // Always refresh from map so every product gets the curated real pack shot
  for (const f of fs.readdirSync(outDir)) {
    if (f.startsWith(id + ".") && !f.endsWith(".json")) {
      try {
        fs.unlinkSync(path.join(outDir, f));
      } catch {}
    }
  }
  try {
    console.log(`↓ ${id}`);
    const { buffer, contentType } = await fetchBuffer(url);
    if (buffer.length < 4000) throw new Error(`too small ${buffer.length}`);
    const file = `${id}${extFrom(url, contentType)}`;
    fs.writeFileSync(path.join(outDir, file), buffer);
    console.log(`  ✓ ${file} (${buffer.length})`);
    report.ok.push({ id, file, bytes: buffer.length, url });
  } catch (e) {
    console.error(`  ✗ ${e.message}`);
    report.fail.push({ id, error: e.message, url });
  }
}

fs.writeFileSync(path.join(outDir, "download-report.json"), JSON.stringify(report, null, 2));
console.log(`OK ${report.ok.length} FAIL ${report.fail.length}`);

// Patch essentials.js image fields to local paths
const essentialsPath = path.join(root, "src", "features", "first-time-mothers", "data", "essentials.js");
let src = fs.readFileSync(essentialsPath, "utf8");

for (const row of report.ok) {
  const file = row.file;
  const local = `/ftm-essentials/${file}`;
  // Replace image URL inside each product block by id — careful regex
  const idRe = new RegExp(
    `("id"\\s*:\\s*"${row.id}"[\\s\\S]*?"image"\\s*:\\s*")[^"]+(")`,
    "m",
  );
  if (idRe.test(src)) {
    src = src.replace(idRe, `$1${local}$2`);
  } else {
    console.warn("no image field match for", row.id);
  }
}

fs.writeFileSync(essentialsPath, src);
console.log("Patched essentials.js");
