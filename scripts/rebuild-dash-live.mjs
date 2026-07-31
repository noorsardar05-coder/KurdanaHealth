import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = path.join(root, "dist", "assets");
fs.mkdirSync(assets, { recursive: true });

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: true });
  if (r.status !== 0) throw new Error(`${cmd} failed: ${r.status}`);
}

run("npx", ["tailwindcss", "-i", "src/index.css", "-o", path.join(assets, "index.css"), "--minify"]);

const featTmp = path.join(assets, "features.bundle.css");
await esbuild.build({
  entryPoints: [path.join(root, "scripts/feature-styles.css")],
  bundle: true,
  outfile: featTmp,
  loader: { ".css": "css" },
  logLevel: "silent",
});
fs.writeFileSync(
  path.join(assets, "index.css"),
  fs.readFileSync(path.join(assets, "index.css"), "utf8") + "\n" + fs.readFileSync(featTmp, "utf8")
);
fs.unlinkSync(featTmp);

await esbuild.build({
  entryPoints: [path.join(root, "src/main.jsx")],
  bundle: true,
  outfile: path.join(assets, "app.js"),
  format: "esm",
  platform: "browser",
  target: ["es2020"],
  jsx: "automatic",
  minify: true,
  loader: {
    ".js": "jsx",
    ".jsx": "jsx",
    ".css": "empty",
    ".json": "json",
    ".png": "file",
    ".jpg": "file",
    ".svg": "file",
    ".webp": "file",
  },
  define: {
    "import.meta.env.BASE_URL": '""',
    "import.meta.env.MODE": '"production"',
    "import.meta.env.DEV": "false",
    "import.meta.env.PROD": "true",
  },
});

const stamp = Date.now();
const html = fs
  .readFileSync(path.join(root, "index.html"), "utf8")
  .replace(
    '<script type="module" src="/src/main.jsx"></script>',
    `<link rel="stylesheet" href="./assets/index.css?v=${stamp}" />\n    <script type="module" src="./assets/app.js?v=${stamp}"></script>`
  );
fs.writeFileSync(path.join(root, "dist", "index.html"), html);

const j = fs.readFileSync(path.join(assets, "app.js"), "utf8");
const c = fs.readFileSync(path.join(assets, "index.css"), "utf8");
console.log("OK streak", j.includes("بەردەوامی لە تەندروستی کوردانە"));
console.log("OK quote", j.includes("تەندروستی لە فێربوونەوە دەست پێدەکات"));
console.log("OK spaces", j.includes("بەشەکانی تەندروستی"));
console.log("OK module css", c.includes(".kh-space__link"));
console.log("READY → open dist with Go Live");
