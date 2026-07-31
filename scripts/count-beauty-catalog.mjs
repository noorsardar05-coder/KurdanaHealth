import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("src/features/beauty/data/catalog");
for (const f of fs.readdirSync(dir)) {
  const t = fs.readFileSync(path.join(dir, f), "utf8");
  const n = (t.match(/id:\s*"/g) || []).length;
  console.log(`${f}\t${n}\t${Math.round(t.length / 1024)}KB`);
}
