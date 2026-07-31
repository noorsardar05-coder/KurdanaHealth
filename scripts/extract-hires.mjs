import fs from "node:fs";
import path from "node:path";

const dir = "C:/Users/pc/.cursor/projects/c-Users-pc-Desktop-kurdanahealthh/agent-tools";
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".txt")) continue;
  const t = fs.readFileSync(path.join(dir, f), "utf8");
  const m = t.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
  if (m) console.log(f.replace(".txt", ""), m[1]);
}
