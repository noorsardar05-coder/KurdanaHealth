import fs from "node:fs";
const file = process.argv[2];
const t = fs.readFileSync(file, "utf8");
const m = t.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
console.log(m ? m[1] : "none");
