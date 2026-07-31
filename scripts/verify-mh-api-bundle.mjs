import fs from "node:fs";
const h = fs.readFileSync("dist/index.html", "utf8");
const m = h.match(/assets\/(index-[^"']+\.js)/);
console.log("bundle", m?.[1]);
const j = fs.readFileSync("dist/assets/" + m[1], "utf8");
console.log({
  api: j.includes("mental-companion"),
  fallback: j.includes("unable to connect"),
  oldGlad: j.includes("glad you spoke"),
  debug: j.includes("[mh-ai]"),
});
