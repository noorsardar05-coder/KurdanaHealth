import { readFileSync, writeFileSync } from "fs";
import { URGENT_DISCLAIMER } from "../src/features/first-time-mothers/data/urgentSigns.js";

const fixPath = "c:/Users/pc/Desktop/kurdanahealthh/scripts/fix-final.mjs";
let src = readFileSync(fixPath, "utf8");

const journey = readFileSync(
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/journeyStages.js",
  "utf8"
);
function kuFrom(text) {
  return [...text.matchAll(/bi\(\s*"[^"]*"\s*,\s*"([^"]*)"\s*\)/g)].map((m) => m[1]);
}
const jKu = kuFrom(journey).filter((s) => !/[a-zA-Z]/.test(s));
const packLine = jKu.find((s) => s.includes("جانتا نەخۆشخانە"));
const supportLine = jKu.find((s) => s.includes("تۆڕی پشتگیری"));
const harmLine = jKu.find((s) => s.includes("بیرکردنەوەی زیانگەیاندن"));
const questionLine = jKu.find((s) => s.includes("پرسیارەکانت"));
const doubtLine = URGENT_DISCLAIMER.ku.slice(URGENT_DISCLAIMER.ku.indexOf("کاتێک گومانت"));
const seekBody3Ku = packLine.split("—")[0].trim() + ". " + URGENT_DISCLAIMER.ku;

for (const s of [seekBody3Ku, supportLine, questionLine, doubtLine, packLine, harmLine]) {
  if (/[a-zA-Z]/.test(s)) throw new Error("Latin in: " + s);
}

const newSeekTail = `    [
      "Keep emergency numbers saved and know your nearest hospital. For non-urgent worries, a phone call to your midwife, health visitor, or pediatric line can ease anxiety. You are never bothering anyone by asking — that is what they are there for.",
      q(${JSON.stringify(seekBody3Ku)}),
    ],
  ],
  tips: [
    ["Save clinic, midwife, and emergency numbers on your phone", q(${JSON.stringify(supportLine)})],
    ["Write symptoms and timing before calling — clarity helps", q(${JSON.stringify(questionLine)})],
    ["If unsure, call — 'better safe' is valid for new parents", q(${JSON.stringify(doubtLine.endsWith(".") ? doubtLine : doubtLine + ".")})],
    ["Know where to go at night and on weekends", q(${JSON.stringify(packLine)})],
  ],
  whenToAsk: [
    ["Any urgent sign from this guide or your clinician's list", q("هەر نیشانەی فوری — پzishk بپرسە")],
    ["Baby under three months with any fever — always call same day", q("گەرمیی ٣٨ پلە یان زیاتر لە منداڵی خوار سێ مانگ")],
    ["You feel unable to keep yourself or baby safe — call immediately", q(${JSON.stringify(harmLine)})],
  ],
};`;

const start = src.indexOf('      "Keep emergency numbers saved');
const end = src.indexOf("function renderTopic", start);
if (start === -1 || end === -1) throw new Error("markers not found");
src = src.slice(0, start) + newSeekTail + "\n\n" + src.slice(end);
writeFileSync(fixPath, src);
console.log("seekHelp patched in fix-final.mjs");
