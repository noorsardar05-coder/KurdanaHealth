import { execSync } from "node:child_process";

function curl(url) {
  return execSync(`curl.exe -sL -A "Mozilla/5.0" "${url}"`, {
    maxBuffer: 10 * 1024 * 1024,
    timeout: 30000,
  }).toString();
}

const urls = [
  ["cubo-ai-plus", "https://us.getcubo.com/products/cuboai-plus-smart-baby-monitor-glow.json"],
  ["spectra-s1-plus", "https://www.spectrababyusa.com/products/spectra-s1-plus-premier-rechargeable-double-electric-breast-pump.json"],
  ["elvie-pump", "https://www.elvie.com/products/elvie-pump.json"],
  ["momcozy-s12-pro", "https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump-s12-pro.json"],
  ["comotomo-natural-feel", "https://comotomo.com/products/baby-bottle-2.json"],
  ["fridababy-nosefrida", "https://frida.com/products/nosefrida-the-snotsucker.json"],
  ["fridababy-humidifier", "https://frida.com/products/frida-baby-3-in-1-humidifier.json"],
  ["fridababy-3in1-ear", "https://frida.com/products/3-in-1-ear-forehead-touchless-thermometer.json"],
  ["fridababy-nailfrida", "https://frida.com/products/nailfrida-the-snipperclipper-set.json"],
  ["baby-brezza-formula-pro", "https://babybrezza.com/products/formula-pro-advanced-wifi.json"],
  ["baby-brezza-sterilizer", "https://babybrezza.com/products/bottle-washer-pro.json"],
  ["momcozy-nursing-pillow", "https://momcozy.com/products/momcozy-nursing-pillow-ergonomic-support.json"],
  ["hatch-rest-plus", "https://www.hatch.co/products/rest-plus-second-gen.json"],
  ["halo-sleepsack-swaddle", "https://www.halosleep.com/products/sleepsack-swaddle-100-cotton-heather-gray.json"],
  ["halo-bassinest", "https://www.halosleep.com/products/bassinest-swivel-sleeper-3-0-series.json"],
  ["love-to-dream-swaddle-up", "https://lovetodream.com/products/swaddle-up-original-1-0-tog.json"],
  ["bibs-colour", "https://bibsworld.com/products/bibs-colour-pacifier-2-pack.json"],
];

for (const [id, u] of urls) {
  try {
    const j = JSON.parse(curl(u));
    const src = j.product?.image?.src || j.product?.images?.[0]?.src;
    console.log(id, src || "NOIMG");
  } catch (e) {
    console.log(id, "ERR", e.message.slice(0, 80));
  }
}
