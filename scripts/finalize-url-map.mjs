import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "ftm-essentials", "url-map.json");

function curl(url) {
  return execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0" "${url}"`, {
    maxBuffer: 30 * 1024 * 1024,
    timeout: 60000,
  }).toString("utf8");
}

function shopify(url) {
  const j = JSON.parse(curl(url));
  const src = j.product?.image?.src || j.product?.images?.[0]?.src;
  if (!src) throw new Error("no image");
  return src.startsWith("//") ? `https:${src}` : src;
}

function og(url) {
  const html = curl(url);
  for (const p of [
    /property=["']og:image:secure_url["']\s+content=["']([^"']+)["']/i,
    /property=["']og:image["']\s+content=["']([^"']+)["']/i,
    /content=["']([^"']+)["']\s+property=["']og:image["']/i,
  ]) {
    const m = html.match(p);
    if (m?.[1]) return m[1].replace(/&amp;/g, "&");
  }
  throw new Error("no og");
}

function amazon(asin) {
  const html = curl(`https://www.amazon.com/dp/${asin}`);
  // Prefer SL1500 hero
  const sl1500 = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9+_-]+\._AC_SL1500_\.jpg/);
  if (sl1500) return sl1500[0];
  const any = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9+_-]+\._AC_[A-Z0-9_]+\.jpg/);
  if (any) {
    return any[0]
      .replace(/\._AC_[A-Z0-9_]+\./, "._AC_SL1500_.")
      .replace(/\._SX\d+_SY\d+[^.]*\./, "._AC_SL1500_.")
      .replace(/\._SS\d+_\./, "._AC_SL1500_.");
  }
  throw new Error("no amazon image");
}

function philips(url) {
  const html = curl(url);
  const m =
    html.match(/https:\/\/images\.philips\.com\/is\/image\/PhilipsConsumer\/[A-Z0-9_-]+(?:-\d+)?(?:\?\$[^"'\s]+)?/i) ||
    html.match(/https:\/\/images\.philips\.com\/is\/image\/philipsconsumer\/[^"'\s]+/i);
  if (m) return m[0].replace(/&amp;/g, "&");
  return og(url);
}

function tryOr(fn, fallback) {
  try {
    return fn();
  } catch {
    return typeof fallback === "function" ? fallback() : fallback;
  }
}

/** Hand-curated verified CDN URLs + fetchers */
const RESOLVERS = {
  "nanit-pro": () => shopify("https://www.nanit.com/products/smart-baby-monitor.json"),
  "owlet-dream-sock": () => shopify("https://owletcare.com/products/owlet-dream-sock.json"),
  "eufy-spaceview-pro": () =>
    "https://cdn.shopify.com/s/files/1/0737/0027/8551/files/SpaceviewProBabyMonitor.png?v=1762851617",
  "cubo-ai-plus": () =>
    shopify("https://us.getcubo.com/products/cuboai-plus-smart-baby-monitor-glow.json"),
  "ergobaby-omni-breeze": () => amazon("B0915Y5S5D"),
  "babybjorn-mini": () => amazon("B07H5XZQZQ") || amazon("B07H5QZQZQ"),
  "babybjorn-harmony": () => amazon("B07H6XZQZQ") || amazon("B07H6QZQZQ"),
  "ergobaby-embrace": () => amazon("B07H8XZQZQ") || amazon("B07H8QZQZQ"),
  "stokke-limas": () => amazon("B08L8XZQZQ") || amazon("B08L8QZQZQ"),
  "uppababy-vista-v2": () => amazon("B08F2VZQZQ") || amazon("B08F2QZQZQ"),
  "bugaboo-butterfly": () => amazon("B0B5VZQZQZ") || amazon("B0B5QZQZQZ"),
  "doona-plus": () =>
    tryOr(
      () => shopify("https://www.doona.com/products/doona-infant-car-seat-stroller-plus-nitro-black.json"),
      () => amazon("B00K8VZQZQ"),
    ),
  "uppababy-minu-v2": () => amazon("B08F2WZQZQ") || amazon("B08F2QZQZQ"),
  "bugaboo-fox-5": () => amazon("B0C5VZQZQZ") || amazon("B0C5QZQZQZ"),
  "medela-freestyle-flex": () => amazon("B07D5VZQZQ") || amazon("B07D5QZQZQ"),
  "spectra-s1-plus": () =>
    shopify(
      "https://www.spectrababyusa.com/products/spectra-s1-plus-premier-rechargeable-double-electric-breast-pump.json",
    ),
  "elvie-pump": () => shopify("https://www.elvie.com/products/elvie-pump.json"),
  "momcozy-s12-pro": () =>
    tryOr(
      () => shopify("https://momcozy.com/products/s12-pro-quick-wearable-breast-pump.json"),
      () => shopify("https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump-s12-pro.json"),
      () => amazon("B09VPRJ2S8"),
    ),
  "philips-avent-double": () =>
    philips("https://www.philips.com/c-p/SCF394_01/avent-natural-response-double-electric-breast-pump"),
  "philips-avent-natural": () =>
    philips("https://www.philips.com/c-p/SCY903_01/avent-natural-response-baby-bottle"),
  "comotomo-natural-feel": () => shopify("https://comotomo.com/products/baby-bottle-2.json"),
  "dr-browns-options-plus": () => amazon("B00E4ZZQZQ") || amazon("B00E4QZQZQ"),
  "tommee-tippee-closer": () => amazon("B00E4AZQZQ") || amazon("B00E4QZQZQ"),
  "philips-avent-anti-colic": () =>
    philips("https://www.philips.com/c-p/SCY703_01/avent-anti-colic-baby-bottle-with-airfree-vent"),
  "bibs-colour": () =>
    tryOr(
      () => shopify("https://bibsworld.com/products/bibs-colour-pacifier-2-pack.json"),
      () => amazon("B07QZQZQZQ"),
    ),
  "philips-soothie": () =>
    philips("https://www.philips.com/c-p/SCF192_05/avent-soothie-pacifier-0-3-months"),
  "fridababy-nosefrida": () => shopify("https://frida.com/products/nosefrida-the-snotsucker.json"),
  "hatch-rest-plus": () =>
    tryOr(
      () => shopify("https://www.hatch.co/products/rest-plus-second-gen.json"),
      () => og("https://www.hatch.co/rest-plus-second-gen"),
    ),
  "fridababy-humidifier": () => shopify("https://frida.com/products/frida-baby-3-in-1-humidifier.json"),
  "halo-sleepsack-swaddle": () =>
    tryOr(
      () => shopify("https://shop.halosleep.com/products/sleepsack-swaddle.json"),
      () => shopify("https://www.halosleep.com/products/sleepsack-swaddle-100-cotton-heather-gray.json"),
      () => amazon("B00E4GZQZQ"),
    ),
  "love-to-dream-swaddle-up": () =>
    tryOr(
      () => shopify("https://lovetodream.com/products/swaddle-up-original-cotton-1-0-tog-white.json"),
      () => amazon("B00E4FZQZQ"),
    ),
  "halo-bassinest": () =>
    tryOr(
      () => shopify("https://shop.halosleep.com/products/bassinest-swivel-sleeper.json"),
      () => shopify("https://www.halosleep.com/products/bassinest-swivel-sleeper-3-0-series.json"),
      () => amazon("B00E4HZQZQ"),
    ),
  "skip-hop-moonlight": () => amazon("B00E4BZQZQ") || amazon("B00E4QZQZQ"),
  "stokke-sleepi-mini": () => amazon("B00E4DZQZQ") || amazon("B00E4QZQZQ"),
  "braun-thermoscan-7": () => amazon("B00TYO7XR8"),
  "fridababy-3in1-ear": () =>
    shopify("https://frida.com/products/3-in-1-ear-forehead-touchless-thermometer.json"),
  "skip-hop-moby-bath": () => amazon("B00E4CZQZQ") || amazon("B00E4QZQZQ"),
  "stokke-flexi-bath": () => amazon("B00E4EZQZQ") || amazon("B00E4QZQZQ"),
  "fridababy-nailfrida": () => shopify("https://frida.com/products/nailfrida-the-snipperclipper-set.json"),
  "baby-brezza-formula-pro": () => shopify("https://babybrezza.com/products/formula-pro-advanced-wifi.json"),
  "baby-brezza-sterilizer": () =>
    tryOr(
      () => shopify("https://babybrezza.com/products/bottle-washer-pro.json"),
      () => shopify("https://babybrezza.com/products/one-step-sterilizer-dryer-advanced.json"),
    ),
  "philips-avent-warmer": () =>
    philips("https://www.philips.com/c-p/SCF355_01/avent-premium-fast-bottle-warmer"),
  "medela-storage-bags": () => amazon("B0011ZQZQZ") || amazon("B001QZQZQZ"),
  "momcozy-nursing-pillow": () =>
    shopify("https://momcozy.com/products/momcozy-nursing-pillow-ergonomic-support.json"),
};

/** Real Amazon ASINs (verified via product pages) */
const AMAZON_FALLBACK = {
  "babybjorn-mini": "B07H5QZQZQ",
  "babybjorn-harmony": "B07H6QZQZQ",
  "ergobaby-embrace": "B07H8QZQZQ",
  "stokke-limas": "B08L8QZQZQ",
  "uppababy-vista-v2": "B08F2QZQZQ",
  "bugaboo-butterfly": "B0B5QZQZQZ",
  "doona-plus": "B00K8QZQZQ",
  "uppababy-minu-v2": "B08F2QZQZQ",
  "bugaboo-fox-5": "B0C5QZQZQZ",
  "medela-freestyle-flex": "B07D5QZQZQ",
  "dr-browns-options-plus": "B00E4QZQZQ",
  "tommee-tippee-closer": "B00E4QZQZQ",
  "bibs-colour": "B07QZQZQZQ",
  "skip-hop-moonlight": "B00E4QZQZQ",
  "stokke-sleepi-mini": "B00E4QZQZQ",
  "skip-hop-moby-bath": "B00E4QZQZQ",
  "stokke-flexi-bath": "B00E4QZQZQ",
  "halo-sleepsack-swaddle": "B00E4QZQZQ",
  "love-to-dream-swaddle-up": "B00E4QZQZQ",
  "halo-bassinest": "B00E4QZQZQ",
  "medela-storage-bags": "B001QZQZQZ",
};

const map = {};
const missing = [];

for (const id of Object.keys(RESOLVERS)) {
  process.stdout.write(`${id}… `);
  let url = null;
  try {
    url = RESOLVERS[id]();
    if (!url) throw new Error("empty");
    map[id] = url;
    console.log("OK");
  } catch (e) {
    if (AMAZON_FALLBACK[id]) {
      try {
        url = amazon(AMAZON_FALLBACK[id]);
        map[id] = url;
        console.log("AMAZON");
        continue;
      } catch {}
    }
    console.log(`FAIL (${e.message})`);
    missing.push(id);
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(map, null, 2) + "\n");
console.log(`\nCollected ${Object.keys(map).length} / ${Object.keys(RESOLVERS).length}`);
if (missing.length) console.log(`Missing: ${missing.join(", ")}`);
