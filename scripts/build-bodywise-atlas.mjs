import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const atlas = path.join(root, "public/bodywise/models/atlas");
const aside = path.join(root, "public/_atlas_aside_tmp/atlas");
const outDir = path.join(root, "kh-bw-atlas");
const dist = path.join(root, "dist");

function restoreAtlas() {
  if (fs.existsSync(aside)) {
    fs.mkdirSync(path.dirname(atlas), { recursive: true });
    if (fs.existsSync(atlas)) fs.rmSync(atlas, { recursive: true, force: true });
    fs.renameSync(aside, atlas);
    console.log("[build-bodywise] atlas restored");
  }
  const tmp = path.join(root, "public/_atlas_aside_tmp");
  if (fs.existsSync(tmp) && !fs.existsSync(aside)) {
    try {
      fs.rmSync(tmp, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
}

// Always restore first if a prior run left atlas aside
restoreAtlas();

try {
  const r = spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["vite", "build", "--config", "scripts/vite.bodywise.config.js"],
    { cwd: root, stdio: "inherit", shell: true }
  );
  if (r.status !== 0) throw new Error(`vite exit ${r.status}`);

  if (!fs.existsSync(path.join(outDir, "index.html"))) {
    throw new Error("missing kh-bw-atlas/index.html");
  }

  fs.mkdirSync(path.join(dist, "assets"), { recursive: true });
  fs.copyFileSync(path.join(outDir, "index.html"), path.join(dist, "index.html"));
  for (const f of fs.readdirSync(path.join(outDir, "assets"))) {
    fs.copyFileSync(path.join(outDir, "assets", f), path.join(dist, "assets", f));
  }

  if (!fs.existsSync(atlas)) {
    throw new Error("atlas missing in public — cannot publish models");
  }
  fs.mkdirSync(path.join(dist, "bodywise/models/atlas"), { recursive: true });
  fs.cpSync(atlas, path.join(dist, "bodywise/models/atlas"), { recursive: true });

  const html = fs.readFileSync(path.join(dist, "index.html"), "utf8");
  console.log("[build-bodywise]", html.match(/assets\/index-[^"']+/)?.[0]);
  console.log(
    "[build-bodywise] atlas ok",
    fs.existsSync(path.join(dist, "bodywise/models/atlas/visceral.fbx"))
  );
} catch (err) {
  restoreAtlas();
  console.error(err);
  process.exit(1);
}
