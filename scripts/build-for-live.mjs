/**
 * Builds static files into /dist for VS Code Live Server (Go Live).
 * Run: npm run live:build  (or npm run live:watch while developing)
 */
import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const assetsDir = path.join(dist, "assets");
const statusFile = path.join(root, "build-live-status.txt");

const watch = process.argv.includes("--watch");

function log(step) {
  const line = `[${new Date().toISOString()}] ${step}\n`;
  fs.appendFileSync(statusFile, line);
  console.log(step);
}

function wipeDist() {
  const legacyMedia = path.join(dist, "workout-media");
  if (fs.existsSync(legacyMedia)) {
    // Do not block the build if Go Live has files open.
    const result = spawnSync("cmd", ["/c", "rmdir", "/s", "/q", legacyMedia], {
      cwd: root,
      timeout: 3000,
    });
    if (result.status === 0) log("[live] removed legacy workout-media");
    else log("[live] warning: could not remove workout-media (close Go Live and delete dist/workout-media manually)");
  }
  fs.mkdirSync(assetsDir, { recursive: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function run(cmd, args, label) {
  log(`[live] ${label}…`);
  const result = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: true });
  if (result.status !== 0) {
    throw new Error(`${label} failed (exit ${result.status ?? "unknown"})`);
  }
}

async function buildTailwind() {
  fs.mkdirSync(assetsDir, { recursive: true });
  run("npx", ["tailwindcss", "-i", "src/index.css", "-o", path.join(assetsDir, "index.css"), "--minify"], "tailwind");
}

async function appendFeatureCss() {
  const tmp = path.join(assetsDir, "features.bundle.css");
  await esbuild.build({
    entryPoints: [path.join(root, "scripts/feature-styles.css")],
    bundle: true,
    outfile: tmp,
    loader: { ".css": "css" },
    logLevel: "silent",
  });
  const combined =
    fs.readFileSync(path.join(assetsDir, "index.css"), "utf8") +
    "\n" +
    fs.readFileSync(tmp, "utf8");
  fs.writeFileSync(path.join(assetsDir, "index.css"), combined, "utf8");
  fs.unlinkSync(tmp);
}

async function buildJs() {
  log("[live] bundling app.js…");
  await esbuild.build({
    entryPoints: [path.join(root, "src/main.jsx")],
    bundle: true,
    outfile: path.join(assetsDir, "app.js"),
    format: "esm",
    platform: "browser",
    target: ["es2020"],
    jsx: "automatic",
    jsxImportSource: "react",
    minify: !watch,
    sourcemap: watch,
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
    logLevel: "info",
  });
}

function writeIndexHtml() {
  const stamp = Date.now();
  const template = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const html = template.replace(
    '<script type="module" src="/src/main.jsx"></script>',
    `<link rel="stylesheet" href="./assets/index.css?v=${stamp}" />\n    <script type="module" src="./assets/app.js?v=${stamp}"></script>`
  );
  fs.writeFileSync(path.join(dist, "index.html"), html, "utf8");
}

function verifyOutput() {
  const required = [
    path.join(dist, "index.html"),
    path.join(assetsDir, "app.js"),
    path.join(assetsDir, "index.css"),
  ];
  for (const file of required) {
    if (!fs.existsSync(file)) {
      throw new Error(`Build incomplete — missing ${path.relative(root, file)}`);
    }
  }
}

async function syncPublic() {
  copyDir(path.join(root, "public"), dist);
  copyDir(path.join(root, "public/antibiotics-flu"), path.join(root, "antibiotics-flu"));
  copyDir(path.join(root, "public/shared"), path.join(root, "shared"));
}

async function buildAll() {
  log("[live] building dist for Go Live…");
  fs.mkdirSync(assetsDir, { recursive: true });
  await buildTailwind();
  log("[live] tailwind done");
  await appendFeatureCss();
  log("[live] feature css done");
  await buildJs();
  log("[live] js done");
  writeIndexHtml();
  log("[live] index.html written");
  try {
    await syncPublic();
    log("[live] public synced");
  } catch (err) {
    log(`[live] warning: public sync skipped (${err?.message || err})`);
  }
  verifyOutput();
  log("[live] ready → open dist with Go Live on http://127.0.0.1:5500/#/category/fitness");
}

async function main() {
  fs.writeFileSync(statusFile, "");
  log("[live] start");
  wipeDist();
  await buildAll();

  if (!watch) return;

  const ctx = await esbuild.context({
    entryPoints: [path.join(root, "src/main.jsx")],
    bundle: true,
    outfile: path.join(assetsDir, "app.js"),
    format: "esm",
    platform: "browser",
    target: ["es2020"],
    jsx: "automatic",
    jsxImportSource: "react",
    loader: {
      ".js": "jsx",
      ".jsx": "jsx",
      ".css": "empty",
      ".json": "json",
    },
    define: {
      "import.meta.env.BASE_URL": '""',
      "import.meta.env.MODE": '"production"',
      "import.meta.env.DEV": "false",
      "import.meta.env.PROD": "true",
    },
  });

  await ctx.watch();
  log("[live:watch] watching src — rebuild with Ctrl+C to stop");
}

try {
  await main();
} catch (err) {
  log(`[live] build failed: ${err?.message || err}`);
  console.error("[live] build failed:", err);
  process.exit(1);
}
