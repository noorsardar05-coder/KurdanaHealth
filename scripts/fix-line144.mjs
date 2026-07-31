import { readFileSync, writeFileSync } from "fs";

const path = "c:/Users/pc/Desktop/kurdanahealthh/scripts/fix-final.mjs";
let s = readFileSync(path, "utf8");
const lines = s.split("\n");
const idx = lines.findIndex((l) => l.includes("Any urgent sign"));
if (idx >= 0) {
  const pzishk = "\u067E\u0632\u06CC\u0634\u06A9";
  lines[idx] = `    ["Any urgent sign from this guide or your clinician's list", q("هەر نیشانەی فوری — ${pzishk} بپرسە")],`;
  writeFileSync(path, lines.join("\n"));
  console.log("line fixed", idx + 1);
} else {
  console.log("line not found");
}
