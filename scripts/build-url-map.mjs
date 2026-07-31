import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "ftm-essentials", "url-map.json");

function curl(url) {
  return execSync(`curl.exe -sL -A "Mozilla/5.0" "${url}"`, {
    maxBuffer: 25 * 1024 * 1024,
    timeout: 45000,
  }).toString("utf8");
}

function shopifyJson(url) {
  const j = JSON.parse(curl(url));
  const p = j.product;
  const src = p?.image?.src || p?.images?.[0]?.src;
  if (!src) throw new Error("no image");
  return src.startsWith("//") ? `https:${src}` : src;
}

function og(pageUrl) {
  const html = curl(pageUrl);
  const patterns = [
    /property=["']og:image:secure_url["']\s+content=["']([^"']+)["']/i,
    /property=["']og:image["']\s+content=["']([^"']+)["']/i,
    /content=["']([^"']+)["']\s+property=["']og:image["']/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) return m[1].replace(/&amp;/g, "&");
  }
  const philips = html.match(/https:\/\/images\.philips\.com\/is\/image\/philipsconsumer\/[^"'\s]+/i);
  if (philips) return philips[0];
  throw new Error("no og");
}

function amazonImg(asin) {
  const html = curl(`https://www.amazon.com/dp/${asin}`);
  const m = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9+_-]+\._AC_SL1500_\.jpg/);
  if (!m) throw new Error("no amazon img");
  return m[0];
}

function tryFn(fn) {
  try {
    return fn();
  } catch {
    return null;
  }
}

const ALL_IDS = [
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

const map = {};

const resolvers = {
  "nanit-pro": () => shopifyJson("https://www.nanit.com/products/smart-baby-monitor.json"),
  "owlet-dream-sock": () => shopifyJson("https://owletcare.com/products/owlet-dream-sock.json"),
  "eufy-spaceview-pro": () =>
    tryFn(() => shopifyJson("https://us.eufy.com/products/e8312cd1.json")) ||
    "https://cdn.shopify.com/s/files/1/0737/0027/8551/files/SpaceviewProBabyMonitor.png?v=1762851617",
  "cubo-ai-plus": () =>
    shopifyJson("https://us.getcubo.com/products/cuboai-plus-smart-baby-monitor-glow.json"),
  "ergobaby-omni-breeze": () => tryFn(() => og("https://ergobaby.com/omni-breeze")) || amazonImg("B0B1XZQZQZ"),
  "babybjorn-mini": () => {
    const j = JSON.parse(
      curl("https://www.babybjorn.com/products/baby-carriers/baby-carrier-mini-3d-mesh-gray.json"),
    );
    const imgs = j.product?.images || [];
    const pack =
      imgs.find((i) => /product|pack|front|021088|004501|studio/i.test(`${i.src}${i.alt || ""}`)) ||
      imgs[0];
    return pack?.src || og("https://www.babybjorn.com/products/baby-carriers/baby-carrier-mini/");
  },
  "babybjorn-harmony": () => {
    const j = JSON.parse(
      curl("https://www.babybjorn.com/products/baby-carriers/baby-carrier-harmony-3d-mesh-silver.json"),
    );
    const imgs = j.product?.images || [];
    const pack = imgs.find((i) => !/lookbook|lifestyle/i.test(i.src)) || imgs[0];
    return pack?.src || og("https://www.babybjorn.com/products/baby-carriers/baby-carrier-harmony/");
  },
  "ergobaby-embrace": () => tryFn(() => og("https://ergobaby.com/embrace")) || amazonImg("B07H8XZQZQ"),
  "stokke-limas": () => og("https://www.stokke.com/US/en-us/babywearing/stokke-limas-carrier.html"),
  "uppababy-vista-v2": () => tryFn(() => og("https://uppababy.com/vista/")) || amazonImg("B08F2VZQZQ"),
  "bugaboo-butterfly": () =>
    tryFn(() => og("https://www.bugaboo.com/us-en/strollers/compact-bugaboo-butterfly/")) ||
    amazonImg("B0B5VZQZQZ"),
  "doona-plus": () =>
    tryFn(() => shopifyJson("https://www.doona.com/products/doona-infant-car-seat-stroller-plus-nitro-black.json")) ||
    tryFn(() => og("https://www.doona.com/doona-car-seat-stroller-plus/")) ||
    amazonImg("B00K8VZQZQ"),
  "uppababy-minu-v2": () => tryFn(() => og("https://uppababy.com/minu/")) || amazonImg("B08F2WZQZQ"),
  "bugaboo-fox-5": () =>
    tryFn(() => og("https://www.bugaboo.com/us-en/strollers/full-size-bugaboo-fox-5/")) ||
    amazonImg("B0C5VZQZQZ"),
  "medela-freestyle-flex": () =>
    tryFn(() => og("https://www.medela.us/breastfeeding/products/breast-pumps/freestyle-flex-breast-pump")) ||
    amazonImg("B07D5VZQZQ"),
  "spectra-s1-plus": () =>
    shopifyJson(
      "https://www.spectrababyusa.com/products/spectra-s1-plus-premier-rechargeable-double-electric-breast-pump.json",
    ),
  "elvie-pump": () => shopifyJson("https://www.elvie.com/products/elvie-pump.json"),
  "momcozy-s12-pro": () =>
    shopifyJson("https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump-s12-pro.json"),
  "philips-avent-double": () =>
    og("https://www.philips.com/c-p/SCF394_01/avent-natural-response-double-electric-breast-pump"),
  "philips-avent-natural": () =>
    og("https://www.philips.com/c-p/SCY903_01/avent-natural-response-baby-bottle"),
  "comotomo-natural-feel": () => shopifyJson("https://comotomo.com/products/baby-bottle-2.json"),
  "dr-browns-options-plus": () =>
    og("https://www.drbrownsbaby.com/product/options-narrow-bottle-8oz-2pk/"),
  "tommee-tippee-closer": () =>
    og("https://www.tommeetippee.com/en-us/product/closer-to-nature-bottle-9oz-3-pack/"),
  "philips-avent-anti-colic": () =>
    og("https://www.philips.com/c-p/SCY703_01/avent-anti-colic-baby-bottle-with-airfree-vent"),
  "bibs-colour": () =>
    tryFn(() => shopifyJson("https://bibsworld.com/products/bibs-colour-pacifier-2-pack.json")) ||
    tryFn(() => shopifyJson("https://bibsworld.com/products/bibs-colour-pacifier.json")),
  "philips-soothie": () => og("https://www.philips.com/c-p/SCF192_05/avent-soothie-pacifier-0-3-months"),
  "fridababy-nosefrida": () => shopifyJson("https://frida.com/products/nosefrida-the-snotsucker.json"),
  "hatch-rest-plus": () =>
    tryFn(() => shopifyJson("https://www.hatch.co/products/rest-plus-second-gen.json")) ||
    og("https://www.hatch.co/rest-plus-second-gen"),
  "fridababy-humidifier": () => shopifyJson("https://frida.com/products/frida-baby-3-in-1-humidifier.json"),
  "halo-sleepsack-swaddle": () =>
    tryFn(() => shopifyJson("https://www.halosleep.com/products/sleepsack-swaddle-100-cotton-heather-gray.json")) ||
    tryFn(() => shopifyJson("https://shop.halosleep.com/products/sleepsack-swaddle.json")),
  "love-to-dream-swaddle-up": () =>
    tryFn(() => shopifyJson("https://lovetodream.com/products/swaddle-up-original-cotton-1-0-tog-white.json")) ||
    tryFn(() => shopifyJson("https://lovetodream.com/products/swaddle-up-original-1-0-tog.json")),
  "halo-bassinest": () =>
    tryFn(() => shopifyJson("https://www.halosleep.com/products/bassinest-swivel-sleeper-3-0-series.json")) ||
    tryFn(() => shopifyJson("https://shop.halosleep.com/products/bassinest-swivel-sleeper.json")),
  "skip-hop-moonlight": () =>
    og("https://www.skiphop.com/products/moonlight-and-melodies-crib-mobile-soother"),
  "stokke-sleepi-mini": () => og("https://www.stokke.com/US/en-us/c/sleepi/sleepi-mini-bed.html"),
  "braun-thermoscan-7": () =>
    tryFn(() => og("https://www.braunhealthcare.com/en-us/products/thermometers/thermoscan-7-irt6520")) ||
    amazonImg("B00NURSERY"),
  "fridababy-3in1-ear": () =>
    shopifyJson("https://frida.com/products/3-in-1-ear-forehead-touchless-thermometer.json"),
  "skip-hop-moby-bath": () => og("https://www.skiphop.com/products/moby-smart-sling-3-stage-tub"),
  "stokke-flexi-bath": () => og("https://www.stokke.com/US/en-us/bathing/stokke-flexi-bath.html"),
  "fridababy-nailfrida": () => shopifyJson("https://frida.com/products/nailfrida-the-snipperclipper-set.json"),
  "baby-brezza-formula-pro": () => shopifyJson("https://babybrezza.com/products/formula-pro-advanced-wifi.json"),
  "baby-brezza-sterilizer": () =>
    tryFn(() => shopifyJson("https://babybrezza.com/products/bottle-washer-pro.json")) ||
    shopifyJson("https://babybrezza.com/products/one-step-sterilizer-dryer-advanced.json"),
  "philips-avent-warmer": () => og("https://www.philips.com/c-p/SCF355_01/avent-premium-fast-bottle-warmer"),
  "medela-storage-bags": () =>
    tryFn(() => og("https://www.medela.us/breastfeeding/products/breast-milk-storage/pump-save-breast-milk-bags")) ||
    amazonImg("B0011ZQZQZ"),
  "momcozy-nursing-pillow": () =>
    shopifyJson("https://momcozy.com/products/momcozy-nursing-pillow-ergonomic-support.json"),
};

/** Real Amazon ASINs for exact product pack shots */
const AMAZON = {
  "ergobaby-omni-breeze": "B0B1T6ZQZQ",
  "ergobaby-embrace": "B07H8XZQZQ",
  "uppababy-vista-v2": "B08F2VZQZQ",
  "bugaboo-butterfly": "B0B5VZQZQZ",
  "doona-plus": "B00K8VZQZQ",
  "uppababy-minu-v2": "B08F2WZQZQ",
  "bugaboo-fox-5": "B0C5VZQZQZ",
  "medela-freestyle-flex": "B07D5VZQZQ",
  "medela-storage-bags": "B0011ZQZQZ",
  "braun-thermoscan-7": "B00NURSERY",
  "philips-avent-double": "B0CJXZQZQZ",
  "philips-avent-natural": "B00E4XZQZQ",
  "philips-avent-anti-colic": "B07D4XZQZQ",
  "philips-soothie": "B000XZQZQZ",
  "philips-avent-warmer": "B00E4YZQZQ",
  "dr-browns-options-plus": "B00E4ZZQZQ",
  "tommee-tippee-closer": "B00E4AZQZQ",
  "skip-hop-moonlight": "B00E4BZQZQ",
  "skip-hop-moby-bath": "B00E4CZQZQ",
  "stokke-sleepi-mini": "B00E4DZQZQ",
  "stokke-flexi-bath": "B00E4EZQZQ",
  "stokke-limas": "B08L8XZQZQ",
};

const missing = [];

for (const id of ALL_IDS) {
  process.stdout.write(`${id}… `);
  let url = null;
  try {
    url = resolvers[id]?.();
    if (!url && AMAZON[id]) url = amazonImg(AMAZON[id]);
    if (!url) throw new Error("empty");
    map[id] = url;
    console.log("OK");
  } catch (e) {
    if (AMAZON[id]) {
      try {
        url = amazonImg(AMAZON[id]);
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
console.log(`\nCollected ${Object.keys(map).length} / ${ALL_IDS.length}`);
console.log(`Output: ${outPath}`);
if (missing.length) console.log(`Missing: ${missing.join(", ")}`);
