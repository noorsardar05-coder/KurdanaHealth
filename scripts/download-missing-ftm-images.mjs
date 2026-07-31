import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import http from "node:http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "ftm-essentials");
const map = JSON.parse(fs.readFileSync(path.join(outDir, "url-map.json"), "utf8"));

const missing = [
  "skip-hop-moby-bath",
  "stokke-flexi-bath",
  "fridababy-nailfrida",
  "baby-brezza-formula-pro",
  "baby-brezza-sterilizer",
  "medela-storage-bags", // refresh weak file
  "medela-freestyle-flex",
  "philips-avent-warmer",
];

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 10) return reject(new Error("redirects"));
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept: "image/*,*/*",
          Referer: "https://www.google.com/",
        },
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

for (const id of missing) {
  const url = map[id];
  if (!url) {
    console.error("no url", id);
    continue;
  }
  try {
    console.log("↓", id);
    const { buffer, contentType } = await fetchBuffer(url);
    if (buffer.length < 4000) throw new Error("too small " + buffer.length);
    for (const f of fs.readdirSync(outDir)) {
      if (f.startsWith(id + ".")) fs.unlinkSync(path.join(outDir, f));
    }
    const file = id + extFrom(url, contentType);
    fs.writeFileSync(path.join(outDir, file), buffer);
    console.log("  ✓", file, buffer.length);
  } catch (e) {
    console.error("  ✗", e.message);
  }
}
