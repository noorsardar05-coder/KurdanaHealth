import fs from "node:fs";
import path from "node:path";

const dist = path.join("dist", "index.html");
const stamp = Date.now();
let html = fs.readFileSync(dist, "utf8");
html = html.replace(
  /href="\.\/assets\/index\.css[^"]*"/,
  `href="./assets/index.css?v=${stamp}"`
);
html = html.replace(
  /src="\.\/assets\/app\.js[^"]*"/,
  `src="./assets/app.js?v=${stamp}"`
);
fs.writeFileSync(dist, html);
console.log("cache bust applied", stamp);
console.log(html.match(/assets\/(?:index\.css|app\.js)[^"]+/g));
