import { readFileSync, writeFileSync } from "fs";
import { URGENT_DISCLAIMER, URGENT_SIGNS } from "../src/features/first-time-mothers/data/urgentSigns.js";

const babyPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/babyCare.js";
const learnPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/learnArticles.js";
const journeyPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/journeyStages.js";

function kuFrom(text) {
  return [...text.matchAll(/bi\(\s*"[^"]*"\s*,\s*"([^"]*)"\s*\)/g)].map((m) => m[1]);
}

function check(label, text) {
  const bad = kuFrom(text).filter((s) => /[a-zA-Z]/.test(s));
  if (bad.length) {
    console.error(`${label}: ${bad.length} Latin violations`);
    bad.forEach((s) => console.error(JSON.stringify(s)));
    process.exit(1);
  }
  console.log(`${label}: ${kuFrom(text).length} ku OK`);
}

function bi(en, ku) {
  if (/[a-zA-Z]/.test(ku)) throw new Error("Latin: " + ku.slice(0, 120));
  return `bi(${JSON.stringify(en)}, ${JSON.stringify(ku)})`;
}

function topic(id, titleEn, titleKu, body, tips, whenToAsk) {
  return `  {
    id: "${id}",
    title: ${bi(titleEn, titleKu)},
    body: [
${body.map(([e, k]) => `      ${bi(e, k)},`).join("\n")}
    ],
    tips: [
${tips.map(([e, k]) => `      ${bi(e, k)},`).join("\n")}
    ],
    whenToAsk: [
${whenToAsk.map(([e, k]) => `      ${bi(e, k)},`).join("\n")}
    ],
  }`;
}

function article(id, slug, titleEn, titleKu, excerptEn, excerptKu, body, tags, minutes) {
  return `  {
    id: "${id}",
    slug: "${slug}",
    title: ${bi(titleEn, titleKu)},
    excerpt: ${bi(excerptEn, excerptKu)},
    body: [
${body.map(([e, k]) => `      ${bi(e, k)},`).join("\n")}
    ],
    tags: ${JSON.stringify(tags)},
    minutes: ${minutes},
  }`;
}

const journey = readFileSync(journeyPath, "utf8");
const jKu = kuFrom(journey).filter((s) => !/[a-zA-Z]/.test(s));
const packLine = jKu.find((s) => s.includes("جانتا نەخۆشخانە"));
const supportLine = jKu.find((s) => s.includes("تۆڕی پشتگیری"));
const harmLine = jKu.find((s) => s.includes("بیرکردنەوەی زیانگەیاندن"));
const questionLine = jKu.find((s) => s.includes("پرسیارەکانت بۆ پzishk"));
const doubtLine =
  URGENT_DISCLAIMER.ku.match(/کاتێک گومانت هەبوو[^"]*/)?.[0]?.replace(/\.$/, "") + "." ||
  "کاتێک گومانت هەبوو، هەمیشە ڕێگەپێدراوە داوای یارمەتی بکەیت.";

const seekBody3 = packLine.split("—")[0].trim() + ". " + URGENT_DISCLAIMER.ku;

const milestones = topic(
  "milestones",
  "Developmental Milestones",
  "هەنگاوەکانی گەشە",
  [
    [
      "Milestones are guides, not deadlines. Your baby will smile, lift their head, grasp your finger, and coo in their own time. Comparing to other babies or charts can steal joy — notice your child's unique pace instead.",
      "هەنگاوەکان ڕێنماییە، نەک کاتێکی کۆتایی. منداڵەکەت بە کاتێکی خۆی پێکەنی، سەر بەرز دەکاتەوە، پەنجەت دەگرێت، و دەنگی نەرم دەدات. بەراوردکردن لەگەڵ منداڵانی تر یان خشتەکان خۆشی دەدزرێنێت — لە جیاتی ئەوە خێرایی تایبەتی منداڵەکەت ببینە.",
    ],
    [
      "In the first months, social smiles, tracking faces with eyes, and stronger head control emerge. By four to six months, rolling and reaching appear. Sitting, babbling, and first teeth may follow between six and twelve months — wide ranges are normal.",
      "لە مانگە سەرەتاییەکاندا پێکەنی کۆmەڵayەتی، شوێnکەwtنی دەmoچaw بە çaw، و بەhêzتری سەر دەردەکewit. لە نێwan چwar ta şeş mangda گەڕan u درێژkirdnەوە dêt. daniştin، qsay mndalane، u yekem ddan ləwaneyə l nêwan şeş ta dwazde mangda bn — mewdayeki farawan asayiye.",
    ],