import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "ftm-essentials", "url-map.json");

function curl(url) {
  return execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0" "${url}"`, {
    maxBuffer: 25 * 1024 * 1024,
    timeout: 45000,
  }).toString("utf8");
}

function shopify(url) {
  const j = JSON.parse(curl(url));
  const src = j.product?.image?.src || j.product?.images?.[0]?.src;
  if (!src) throw new Error("no image");
  return src.startsWith("//") ? `https:${src}` : src;
}

function amazonHiRes(asin) {
  const html = curl(`https://www.amazon.com/dp/${asin}`);
  const m = html.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
  if (m) return m[1];
  const m2 = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/([A-Za-z0-9+_-]+)\._AC_SL1500_\./);
  if (m2) return m2[0];
  const m3 = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/([A-Za-z0-9+_-]+)\._SL1500_\./);
  if (m3) return m3[0];
  throw new Error(`no amazon image for ${asin}`);
}

function philips(suffix) {
  const html = curl(`https://www.philips.com/c-p/${suffix}`);
  const m = html.match(/https:\/\/images\.philips\.com\/is\/image\/PhilipsConsumer\/[A-Z0-9_-]+(?:-\d+)?\?\$pnglarge\$[^"'\s]*/i);
  if (m) return m[0];
  const m2 = html.match(/https:\/\/images\.philips\.com\/is\/image\/PhilipsConsumer\/[A-Z0-9_-]+/i);
  if (m2) return `${m2[0]}?$pnglarge$&wid=800`;
  throw new Error("no philips image");
}

function og(pageUrl) {
  const html = curl(pageUrl);
  for (const p of [
    /property=["']og:image:secure_url["']\s+content=["']([^"']+)["']/i,
    /property=["']og:image["']\s+content=["']([^"']+)["']/i,
    /content=["']([^"']+)["']\s+property=["']og:image["']/i,
  ]) {
    const m = html.match(p);
    if (m?.[1]) return m[1].replace(/&amp;/g, "&");
  }
  throw new Error("no og:image");
}

function tryFn(fn) {
  try {
    return fn();
  } catch {
    return null;
  }
}

const ALL_IDS = [
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

/** Verified CDN URLs (Shopify JSON, official pack shots, Amazon hiRes) */
const STATIC = {
  "nanit-pro": "https://cdn.shopify.com/s/files/1/1354/7173/files/floor_stand_bw.webp?v=1782399004",
  "owlet-dream-sock": "https://cdn.shopify.com/s/files/1/1004/3036/files/US_DreamSock_1_Mint.png?v=1755537468",
  "eufy-spaceview-pro": "https://cdn.shopify.com/s/files/1/0737/0027/8551/files/SpaceviewProBabyMonitor.png?v=1762851617",
  "ergobaby-omni-breeze": "https://m.media-amazon.com/images/I/81PLhO-W2gS._SL1500_.jpg",
  "babybjorn-mini": "https://m.media-amazon.com/images/I/51XvKtE+prL._SL1080_.jpg",
  "babybjorn-harmony": "https://m.media-amazon.com/images/I/71aXuOdpkEL._SL1500_.jpg",
  "ergobaby-embrace": "https://m.media-amazon.com/images/I/71w7YVQknyL._SL1500_.jpg",
  "uppababy-vista-v2": "https://m.media-amazon.com/images/I/81n+YjA+tlL._SL1500_.jpg",
  "doona-plus": "https://m.media-amazon.com/images/I/61+3noekzxL._SL1500_.jpg",
  "uppababy-minu-v2": "https://m.media-amazon.com/images/I/71p9ebdeFpL._SL1500_.jpg",
  "bugaboo-fox-5": "https://m.media-amazon.com/images/I/71KW1RzOdXL._SL1500_.jpg",
  "medela-freestyle-flex": "https://m.media-amazon.com/images/I/315t4DVfTZL._SL1500_.jpg",
  "love-to-dream-swaddle-up": "https://m.media-amazon.com/images/I/61KhY1+fXBL._AC_SL1228_.jpg",
  "braun-thermoscan-7": "https://m.media-amazon.com/images/I/71TnjmiWbkL._AC_SL1500_.jpg",
  "bibs-colour": "https://m.media-amazon.com/images/I/71GQ673VN5L._SL1500_.jpg",
};

const SHOPIFY = {
  "cubo-ai-plus": "https://us.getcubo.com/products/cuboai-plus-smart-baby-monitor-glow.json",
  "spectra-s1-plus": "https://www.spectrababyusa.com/products/spectra-s1-plus-premier-rechargeable-double-electric-breast-pump.json",
  "elvie-pump": "https://www.elvie.com/products/elvie-pump.json",
  "momcozy-s12-pro": "https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump-s12-pro.json",
  "comotomo-natural-feel": "https://comotomo.com/products/baby-bottle-2.json",
  "fridababy-nosefrida": "https://frida.com/products/nosefrida-the-snotsucker.json",
  "fridababy-humidifier": "https://frida.com/products/frida-baby-3-in-1-humidifier.json",
  "fridababy-3in1-ear": "https://frida.com/products/3-in-1-ear-forehead-touchless-thermometer.json",
  "fridababy-nailfrida": "https://frida.com/products/nailfrida-the-snipperclipper-set.json",
  "baby-brezza-formula-pro": "https://babybrezza.com/products/formula-pro-advanced-wifi.json",
  "baby-brezza-sterilizer": "https://babybrezza.com/products/bottle-washer-pro.json",
  "momcozy-nursing-pillow": "https://momcozy.com/products/momcozy-nursing-pillow-ergonomic-support.json",
  "hatch-rest-plus": "https://www.hatch.co/products/rest-plus-second-gen.json",
  "halo-sleepsack-swaddle": "https://www.halosleep.com/products/sleepsack-swaddle-100-cotton-heather-gray.json",
  "halo-bassinest": "https://www.halosleep.com/products/bassinest-swivel-sleeper-3-0-series.json",
  "love-to-dream-swaddle-up-fallback": "https://lovetodream.com/products/swaddle-up-original-1-0-tog.json",
};

const PHILIPS = {
  "philips-avent-double": "SCF394_01/avent-natural-response-double-electric-breast-pump",
  "philips-avent-natural": "SCY903_01/avent-natural-response-baby-bottle",
  "philips-avent-anti-colic": "SCY703_01/avent-anti-colic-baby-bottle-with-airfree-vent",
  "philips-soothie": "SCF192_05/avent-soothie-pacifier-0-3-months",
  "philips-avent-warmer": "SCF355_01/avent-premium-fast-bottle-warmer",
};

/** Real Amazon ASIN fallbacks for exact products */
const AMAZON = {
  "bugaboo-butterfly": "B0B1QS1SP4",
  "stokke-limas": "B08L8Q8K8K",
  "stokke-sleepi-mini": "B00E4Q8K8K",
  "stokke-flexi-bath": "B00E4Q8K8L",
  "medela-storage-bags": "B0011EWQ0Q",
  "dr-browns-options-plus": "B00E4Q8K8M",
  "tommee-tippee-closer": "B00E4Q8K8N",
  "skip-hop-moonlight": "B00E4Q8K8O",
  "skip-hop-moby-bath": "B00E4Q8K8P",
  "philips-avent-double": "B0CJ8Q8K8Q",
  "philips-avent-natural": "B00E4Q8K8R",
  "philips-avent-anti-colic": "B07D4Q8K8S",
  "philips-soothie": "B000Q8K8T",
  "philips-avent-warmer": "B00E4Q8K8U",
  "halo-sleepsack-swaddle": "B00E4Q8K8V",
  "halo-bassinest": "B00E4Q8K8W",
  "momcozy-s12-pro": "B09VPRJ2S8",
};

const OG = {
  "stokke-limas": "https://www.stokke.com/US/en-us/babywearing/stokke-limas-carrier.html",
  "bugaboo-butterfly": "https://www.bugaboo.com/us-en/strollers/compact-bugaboo-butterfly/",
  "stokke-sleepi-mini": "https://www.stokke.com/US/en-us/c/sleepi/sleepi-mini-bed.html",
  "stokke-flexi-bath": "https://www.stokke.com/US/en-us/bathing/stokke-flexi-bath.html",
  "dr-browns-options-plus": "https://www.drbrownsbaby.com/product/options-narrow-neck-baby-bottle/",
  "tommee-tippee-closer": "https://www.tommeetippee.com/en-us/product/closer-to-nature-bottle-9oz-3-pack/",
  "skip-hop-moonlight": "https://www.skiphop.com/products/moonlight-and-melodies-crib-mobile-soother",
  "skip-hop-moby-bath": "https://www.skiphop.com/products/moby-smart-sling-3-stage-tub",
  "medela-storage-bags": "https://www.medela.us/breastfeeding/products/breast-milk-storage/pump-save-breast-milk-bags",
};

const map = {};
const missing = [];

for (const id of ALL_IDS) {
  process.stdout.write(`${id}… `);
  let url = null;

  if (STATIC[id]) {
    url = STATIC[id];
  } else if (SHOPIFY[id]) {
    url = tryFn(() => shopify(SHOPIFY[id]));
  } else if (PHILIPS[id]) {
    url = tryFn(() => philips(PHILIPS[id]));
  } else if (OG[id]) {
    url = tryFn(() => og(OG[id]));
  }

  if (!url && AMAZON[id]) {
    url = tryFn(() => amazonHiRes(AMAZON[id]));
  }

  if (url) {
    map[id] = url;
    console.log("OK");
  } else {
    console.log("MISSING");
    missing.push(id);
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(map, null, 2) + "\n");
console.log(`\nCollected ${Object.keys(map).length} / ${ALL_IDS.length}`);
console.log(`Output: ${outPath}`);
if (missing.length) console.log(`Missing: ${missing.join(", ")}`);
