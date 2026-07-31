/**
 * Resolve real product hero images via Shopify product.json + known pages,
 * then download unique local files into public/ftm-essentials/
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import http from "node:http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "ftm-essentials");
fs.mkdirSync(outDir, { recursive: true });

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchRaw(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 10) return reject(new Error("redirects"));
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent": UA,
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.9",
        },
        timeout: 30000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const next = new URL(res.headers.location, url).href;
          res.resume();
          return resolve(fetchRaw(next, redirects + 1));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            buffer: Buffer.concat(chunks),
            contentType: res.headers["content-type"] || "",
            url,
          }),
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

async function fetchText(url) {
  const r = await fetchRaw(url);
  return { ...r, text: r.buffer.toString("utf8") };
}

function shopifyImage(productJson) {
  const p = productJson.product;
  if (!p) return null;
  // Prefer featured image, then first image — usually clean pack shot
  const img = p.image || p.images?.[0];
  if (!img?.src) return null;
  // Request large size
  return img.src.replace(/_(small|compact|medium|grande|1024x1024)/, "").replace(/(\.(jpg|png|webp))(\?|$)/i, "_1200x$1$3");
}

async function tryShopify(pageUrl) {
  const jsonUrl = pageUrl.replace(/\?.*$/, "") + ".json";
  const r = await fetchText(jsonUrl);
  if (r.status !== 200) throw new Error(`shopify ${r.status}`);
  const data = JSON.parse(r.text);
  const src = shopifyImage(data);
  if (!src) throw new Error("no shopify image");
  return src.startsWith("//") ? `https:${src}` : src;
}

function extractOg(html) {
  const patterns = [
    /property=["']og:image:secure_url["']\s+content=["']([^"']+)["']/i,
    /property=["']og:image["']\s+content=["']([^"']+)["']/i,
    /content=["']([^"']+)["']\s+property=["']og:image["']/i,
    /"image"\s*:\s*\[?\s*"(https?:[^"]+)"/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) return m[1].replace(/&amp;/g, "&");
  }
  return null;
}

async function tryOg(pageUrl) {
  const r = await fetchText(pageUrl);
  if (r.status !== 200) throw new Error(`og page ${r.status}`);
  const img = extractOg(r.text);
  if (!img) throw new Error("no og:image");
  return img.startsWith("//") ? `https:${img}` : img;
}

/** Shopify product pages (most baby brands) + HTML product pages */
const CATALOG = [
  { id: "nanit-pro", pages: ["https://www.nanit.com/products/smart-baby-monitor"], shopify: true },
  { id: "owlet-dream-sock", pages: ["https://owletcare.com/products/owlet-dream-sock"], shopify: true },
  { id: "eufy-spaceview-pro", pages: ["https://us.eufy.com/products/t8400121", "https://www.eufy.com/products/t8400"], shopify: true },
  { id: "cubo-ai-plus", pages: ["https://us.getcubo.com/products/cubo-ai-plus", "https://www.cuboai.com/products/cubo-ai-plus"], shopify: true },
  { id: "ergobaby-omni-breeze", pages: ["https://ergobaby.com/omni-breeze-baby-carrier.html", "https://www.ergobaby.eu/omni-breeze"], shopify: false },
  { id: "babybjorn-mini", pages: ["https://www.babybjorn.com/baby-carriers/baby-carrier-mini/"], shopify: false },
  { id: "babybjorn-harmony", pages: ["https://www.babybjorn.com/baby-carriers/baby-carrier-harmony/"], shopify: false },
  { id: "ergobaby-embrace", pages: ["https://ergobaby.com/embrace-baby-carrier.html"], shopify: false },
  { id: "stokke-limas", pages: ["https://www.stokke.com/usa/en-us/carriers/limas-carrier/"], shopify: false },
  { id: "uppababy-vista-v2", pages: ["https://uppababy.com/vista/", "https://uppababy.com/products/vista-v3"], shopify: false },
  { id: "bugaboo-butterfly", pages: ["https://www.bugaboo.com/us-en/strollers/compact-strollers/butterfly/"], shopify: false },
  { id: "doona-plus", pages: ["https://doona.com/products/doona-infant-car-seat-stroller", "https://simpleparenting.co/products/doona"], shopify: true },
  { id: "uppababy-minu-v2", pages: ["https://uppababy.com/minu/", "https://uppababy.com/products/minu-v3"], shopify: false },
  { id: "bugaboo-fox-5", pages: ["https://www.bugaboo.com/us-en/strollers/all-terrain-strollers/fox-5/"], shopify: false },
  { id: "medela-freestyle-flex", pages: ["https://www.medela.us/breastfeeding-pumping/products/pumps/freestyle-flex"], shopify: false },
  { id: "spectra-s1-plus", pages: ["https://spectra-babyusa.com/products/spectra-s1-plus-electric-breast-pump", "https://www.spectrababyusa.com/products/s1-plus"], shopify: true },
  { id: "elvie-pump", pages: ["https://www.elvie.com/en-us/shop/elvie-pump"], shopify: true },
  { id: "momcozy-s12-pro", pages: ["https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump-s12-pro"], shopify: true },
  { id: "philips-avent-double", pages: ["https://www.usa.philips.com/c-p/SCF397_11/avent-double-electric-breast-pump"], shopify: false },
  { id: "philips-avent-natural", pages: ["https://www.usa.philips.com/c-p/SCF030_17/natural-response-baby-bottle"], shopify: false },
  { id: "comotomo-natural-feel", pages: ["https://www.comotomo.com/products/baby-bottle-green-5oz-twin-pack", "https://comotomo.com/products/natural-feel-baby-bottle"], shopify: true },
  { id: "dr-browns-options-plus", pages: ["https://www.drbrownsbaby.com/product/options-narrow-neck-baby-bottle/"], shopify: false },
  { id: "tommee-tippee-closer", pages: ["https://www.tommeetippee.com/en-us/product/closer-to-nature-baby-bottle"], shopify: false },
  { id: "philips-avent-anti-colic", pages: ["https://www.usa.philips.com/c-p/SCF813_14/anti-colic-baby-bottle-with-airfree-vent"], shopify: false },
  { id: "bibs-colour", pages: ["https://bibsworld.com/products/bibs-colour", "https://us.bibs.com/products/colour-pacifier"], shopify: true },
  { id: "philips-soothie", pages: ["https://www.usa.philips.com/c-p/SCF190_01/soothie-pacifier"], shopify: false },
  { id: "fridababy-nosefrida", pages: ["https://frida.com/products/nosefrida", "https://frida.com/products/the-snotsucker-nosefrida"], shopify: true },
  { id: "hatch-rest-plus", pages: ["https://www.hatch.co/products/rest-plus", "https://www.hatch.co/rest-plus"], shopify: true },
  { id: "fridababy-humidifier", pages: ["https://frida.com/products/3-in-1-humidifier-diffuser-sound-machine"], shopify: true },
  { id: "halo-sleepsack-swaddle", pages: ["https://www.halosleep.com/products/sleepsack-swaddle-cotton"], shopify: true },
  { id: "love-to-dream-swaddle-up", pages: ["https://lovetodream.com/products/swaddle-up-original-1-0-tog"], shopify: true },
  { id: "halo-bassinest", pages: ["https://www.halosleep.com/products/bassinest-premiere-series"], shopify: true },
  { id: "skip-hop-moonlight", pages: ["https://www.skiphop.com/moonlight-and-melodies-nightlight-soother/307150.html"], shopify: false },
  { id: "stokke-sleepi-mini", pages: ["https://www.stokke.com/usa/en-us/beds/stokke-sleepi-mini-v3/"], shopify: false },
  { id: "braun-thermoscan-7", pages: ["https://www.braunhealthcare.com/us_en/thermometer/thermoscan-7-with-age-precision-irt6520"], shopify: false },
  { id: "fridababy-3in1-ear", pages: ["https://frida.com/products/3-in-1-ear-forehead-thermometer"], shopify: true },
  { id: "skip-hop-moby-bath", pages: ["https://www.skiphop.com/moby-smart-sling-3-stage-tub/235473.html"], shopify: false },
  { id: "stokke-flexi-bath", pages: ["https://www.stokke.com/usa/en-us/bath/stokke-flexi-bath/"], shopify: false },
  { id: "fridababy-nailfrida", pages: ["https://frida.com/products/snipperclipper"], shopify: true },
  { id: "baby-brezza-formula-pro", pages: ["https://babybrezza.com/products/formula-pro-advanced-wifi"], shopify: true },
  { id: "baby-brezza-sterilizer", pages: ["https://babybrezza.com/products/baby-bottle-sterilizer-dryer-advanced"], shopify: true },
  { id: "philips-avent-warmer", pages: ["https://www.usa.philips.com/c-p/SCF358_00/fast-bottle-warmer"], shopify: false },
  { id: "medela-storage-bags", pages: ["https://www.medela.us/breastfeeding-pumping/products/milk-storage/breast-milk-storage-bags"], shopify: false },
  { id: "momcozy-nursing-pillow", pages: ["https://momcozy.com/products/adjustable-nursing-pillow"], shopify: true },
];

/** Direct CDN / press URLs verified or commonly used official pack shots */
const DIRECT = {
  "braun-thermoscan-7":
    "https://m.media-amazon.com/images/I/71QeZ2mT0nL._AC_SL1500_.jpg",
  "philips-avent-natural":
    "https://images.philips.com/is/image/philipsconsumer/ddf0f7f0a1c14f1a9c0e0e0e0e0e0e0e?$pnglarge$&wid=800",
};

function extFrom(url, contentType) {
  if (/png/i.test(contentType) || /\.png(\?|$)/i.test(url)) return ".png";
  if (/webp/i.test(contentType) || /\.webp(\?|$)/i.test(url)) return ".webp";
  return ".jpg";
}

async function resolveImage(entry) {
  if (DIRECT[entry.id]) {
    try {
      const r = await fetchRaw(DIRECT[entry.id]);
      if (r.status === 200 && r.buffer.length > 3000) return { url: DIRECT[entry.id], buffer: r.buffer, contentType: r.contentType };
    } catch {}
  }

  for (const page of entry.pages) {
    if (entry.shopify) {
      try {
        const src = await tryShopify(page);
        await sleep(400);
        const r = await fetchRaw(src);
        if (r.status === 200 && r.buffer.length > 3000) return { url: src, buffer: r.buffer, contentType: r.contentType };
      } catch (e) {
        // continue
      }
    }
    try {
      const src = await tryOg(page);
      await sleep(400);
      const r = await fetchRaw(src);
      if (r.status === 200 && r.buffer.length > 3000) return { url: src, buffer: r.buffer, contentType: r.contentType };
    } catch (e) {
      // continue
    }
    await sleep(500);
  }
  throw new Error("unresolved");
}

const results = [];
const failures = [];

for (const entry of CATALOG) {
  // skip if already downloaded successfully (>20kb)
  const existing = fs.readdirSync(outDir).find((f) => f.startsWith(entry.id + "."));
  if (existing) {
    const sz = fs.statSync(path.join(outDir, existing)).size;
    if (sz > 15000) {
      console.log(`skip ${entry.id} (${existing}, ${sz})`);
      results.push({ id: entry.id, file: existing, bytes: sz, skipped: true });
      continue;
    }
  }

  process.stdout.write(`↓ ${entry.id}\n`);
  try {
    const { url, buffer, contentType } = await resolveImage(entry);
    const ext = extFrom(url, contentType);
    const file = `${entry.id}${ext}`;
    fs.writeFileSync(path.join(outDir, file), buffer);
    console.log(`  ✓ ${file} (${buffer.length}) from ${url.slice(0, 90)}`);
    results.push({ id: entry.id, file, bytes: buffer.length, url });
  } catch (e) {
    console.error(`  ✗ ${e.message}`);
    failures.push({ id: entry.id, error: e.message });
  }
  await sleep(700);
}

fs.writeFileSync(
  path.join(outDir, "manifest.json"),
  JSON.stringify({ at: new Date().toISOString(), results, failures }, null, 2),
);
console.log(`\nOK ${results.length} / FAIL ${failures.length}`);
if (failures.length) console.log(failures.map((f) => f.id).join(", "));
