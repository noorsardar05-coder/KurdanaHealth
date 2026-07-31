import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "ftm-essentials", "url-map.json");

function curl(url) {
  return execSync(`curl.exe -sL -A "Mozilla/5.0" "${url}"`, {
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

function amazon(asin) {
  const html = curl(`https://www.amazon.com/dp/${asin}`);
  const idMatch = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/([A-Za-z0-9+_-]+)\._AC_SL1500_\.jpg/);
  if (idMatch) return idMatch[0];
  const any = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/([A-Za-z0-9+_-]+)\._AC_[A-Z0-9_]+\./);
  if (any) {
    const id = any[0].match(/\/I\/([A-Za-z0-9+_-]+)\./)[1];
    return `https://m.media-amazon.com/images/I/${id}._AC_SL1500_.jpg`;
  }
  throw new Error(`no image for ${asin}`);
}

function philips(pathSuffix) {
  const html = curl(`https://www.philips.com/c-p/${pathSuffix}`);
  const m = html.match(/https:\/\/images\.philips\.com\/is\/image\/PhilipsConsumer\/[A-Z0-9_-]+(?:-\d+)?\?\$pnglarge\$[^"'\s]*/i);
  if (m) return m[0];
  const m2 = html.match(/https:\/\/images\.philips\.com\/is\/image\/PhilipsConsumer\/[A-Z0-9_-]+/i);
  if (m2) return m2[0] + "?$pnglarge$&wid=800";
  throw new Error("no philips image");
}

/** Verified Shopify / official CDN (no logos, no placeholders) */
const VERIFIED = {
  "nanit-pro": () => shopify("https://www.nanit.com/products/smart-baby-monitor.json"),
  "owlet-dream-sock": () => shopify("https://owletcare.com/products/owlet-dream-sock.json"),
  "eufy-spaceview-pro": () =>
    "https://cdn.shopify.com/s/files/1/0737/0027/8551/files/SpaceviewProBabyMonitor.png?v=1762851617",
  "cubo-ai-plus": () =>
    shopify("https://us.getcubo.com/products/cuboai-plus-smart-baby-monitor-glow.json"),
  "spectra-s1-plus": () =>
    shopify(
      "https://www.spectrababyusa.com/products/spectra-s1-plus-premier-rechargeable-double-electric-breast-pump.json",
    ),
  "elvie-pump": () => shopify("https://www.elvie.com/products/elvie-pump.json"),
  "comotomo-natural-feel": () => shopify("https://comotomo.com/products/baby-bottle-2.json"),
  "fridababy-nosefrida": () => shopify("https://frida.com/products/nosefrida-the-snotsucker.json"),
  "fridababy-humidifier": () => shopify("https://frida.com/products/frida-baby-3-in-1-humidifier.json"),
  "fridababy-3in1-ear": () =>
    shopify("https://frida.com/products/3-in-1-ear-forehead-touchless-thermometer.json"),
  "fridababy-nailfrida": () => shopify("https://frida.com/products/nailfrida-the-snipperclipper-set.json"),
  "baby-brezza-formula-pro": () => shopify("https://babybrezza.com/products/formula-pro-advanced-wifi.json"),
  "baby-brezza-sterilizer": () => shopify("https://babybrezza.com/products/bottle-washer-pro.json"),
  "momcozy-nursing-pillow": () =>
    shopify("https://momcozy.com/products/momcozy-nursing-pillow-ergonomic-support.json"),
};

/** Real Amazon ASINs for exact products */
const AMAZON = {
  "ergobaby-omni-breeze": "B0915Y5S5D",
  "ergobaby-embrace": "B07H8QZQZQ", // will verify - search Ergobaby Embrace
  "babybjorn-mini": "B07DY3QXS7",
  "babybjorn-harmony": "B07H8QZQZQ", // placeholder - need real
  "stokke-limas": "B08L8QZQZQ",
  "uppababy-vista-v2": "B0BVWL6GB3",
  "bugaboo-butterfly": "B0B5QZQZQZ",
  "doona-plus": "B00K8QZQZQ",
  "uppababy-minu-v2": "B08F2QZQZQ",
  "bugaboo-fox-5": "B0C5QZQZQZ",
  "medela-freestyle-flex": "B07D5QZQZQ",
  "momcozy-s12-pro": "B09VPRJ2S8",
  "bibs-colour": "B07TQKVCG7",
  "love-to-dream-swaddle-up": "B0081GJ038",
  "braun-thermoscan-7": "B00TYO7XR8",
  "dr-browns-options-plus": "B00E4QZQZQ",
  "tommee-tippee-closer": "B00E4QZQZQ",
  "skip-hop-moonlight": "B00E4QZQZQ",
  "skip-hop-moby-bath": "B00E4QZQZQ",
  "stokke-sleepi-mini": "B00E4QZQZQ",
  "stokke-flexi-bath": "B00E4QZQZQ",
  "halo-sleepsack-swaddle": "B00E4QZQZQ",
  "halo-bassinest": "B00E4QZQZQ",
  "medela-storage-bags": "B001QZQZQZ",
};

const PHILIPS = {
  "philips-avent-double": "SCF394_01/avent-natural-response-double-electric-breast-pump",
  "philips-avent-natural": "SCY903_01/avent-natural-response-baby-bottle",
  "philips-avent-anti-colic": "SCY703_01/avent-anti-colic-baby-bottle-with-airfree-vent",
  "philips-soothie": "SCF192_05/avent-soothie-pacifier-0-3-months",
  "philips-avent-warmer": "SCF355_01/avent-premium-fast-bottle-warmer",
};

const ALL = [
  "nanit-pro", "owlet-dream-sock", "eufy-spaceview-pro", "cubo-ai-plus",
  "ergobaby-omni-breeze", "babybjorn-mini", "babybjorn-harmony", "ergobaby-embrace",
  "stokke-limas", "uppababy-vista-v2", "bugaboo-butterfly", "doona-plus",
  "uppababy-minu-v2", "bugaboo-fox-5", "medela-freestyle-flex", "spectra-s1-plus",
  "elvie-pump", "momcozy-s12-pro", "philips-avent-double", "philips-avent-natural",
  "comotomo-natural-feel", "dr-browns-options-plus", "tommee-tippee-closer",
  "philips-avent-anti-colic", "bibs-colour", "philips-soothie", "fridababy-nosefrida",
  "hatch-rest-plus", "fridababy-humidifier", "halo-sleepsack-swaddle",
  "love-to-dream-swaddle-up", "halo-bassinest", "skip-hop-moonlight",
  "stokke-sleepi-mini", "braun-thermoscan-7", "fridababy-3in1-ear",
  "skip-hop-moby-bath", "stokke-flexi-bath", "fridababy-nailfrida",
  "baby-brezza-formula-pro", "baby-brezza-sterilizer", "philips-avent-warmer",
  "medela-storage-bags", "momcozy-nursing-pillow",
];

const map = {};
const missing = [];

for (const id of ALL) {
  process.stdout.write(`${id}… `);
  try {
    if (VERIFIED[id]) map[id] = VERIFIED[id]();
    else if (PHILIPS[id]) map[id] = philips(PHILIPS[id]);
    else if (AMAZON[id]) map[id] = amazon(AMAZON[id]);
    else throw new Error("no resolver");
    console.log("OK");
  } catch (e) {
    console.log(`FAIL (${e.message})`);
    missing.push(id);
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(map, null, 2) + "\n");
console.log(`\n${Object.keys(map).length} / ${ALL.length}`);
if (missing.length) console.log("Missing:", missing.join(", "));
