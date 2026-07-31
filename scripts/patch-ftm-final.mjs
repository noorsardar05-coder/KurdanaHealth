import { readFileSync, writeFileSync } from "fs";
import { URGENT_DISCLAIMER } from "../src/features/first-time-mothers/data/urgentSigns.js";

const babyPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/babyCare.js";
const learnPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/learnArticles.js";

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
  if (/[a-zA-Z]/.test(ku)) throw new Error("Latin: " + ku);
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

// seekHelp body 3 built from URGENT_DISCLAIMER.ku (validated source)
const disclaimer = URGENT_DISCLAIMER.ku;
const seekBody3 =
  "ژمارەی فوری پاشەکەوت بکە و نزیکترین نەخۆشxane بناسە. بۆ نیگەرانی nafuri، پەیwەندییەکی تەلەfۆn لەگەڵ mamani، سەrdankeri tendrosty، yan hêlli mndalal detwane dlxat bkat. " +
  disclaimer.split("۔").pop().trim();

// Fix seekBody3 - build manually from disclaimer parts only
const seekBody3Clean =
  "ژمارەی فوری پاشەکەوت بکە و نزیکترین نەخۆشxane بناسە. بۆ نیگەرانی nafuri، پەیwەندییەکی تەلەfۆn لەگەڵ mamani، سەrdankeri tendrosty، yan hêlli mndalal detwane dlxat bkat. hergiz kes naxapinit bə prsiar — bo eme hén.";

// Use only strings verified below
const KU = {
  seekB1:
    "زانینی کەی پەیوەندی بکە شارەزاییەکە — و پێویست نییە خۆت هیچ شتێک دەستنیشان بکەیت. متمانە بە هەستی بەردەوام. ئەگەر شتێک هەڵە دەردەکەوێت، تەنها بەبێ نیشانەی ڕوون، تیمە چاودێریەکەت پێشتر لە دواکەوتن حەز دەکات بیستێت.",
  seekB2:
    "بە خێرایی پەیوەندی بکە بۆ گەرمی لە منداڵی بچووک، کێشەی هەناسە، پێستی شین یان ڕەنگی خۆڵ، کەمبوونی پامپەری تەڕ، ڕشانەوەی بەهێز، یان لاوازی بێ وەڵام. بۆ خۆت دوای لەدایکبوون — خونباری قورس، ئازاری سینە، سەرئێشەی توند، یان بیرکردنەوەی زیانگەیاندن بە خۆت — هەموویان پێویستی بە سەرنجی فوری هەیە.",
  seekB3:
    "ژمارەی فوری پاشەکەوت بکە و نزیکترین نەخۆشxane بناسە. بۆ نیگەرانی nafuri، پەیwەndiیەکی تەلەfۆn لەگەڵ mamani، سەrdankeri tendrosty، yan hêlli mndalal detwane dlxat bkat. hergiz kes naxapinit bə prsiar — bo eme hén.",
};

// Validate KU object
for (const [k, v] of Object.entries(KU)) {
  if (/[a-zA-Z]/.test(v)) throw new Error(`Bad ${k}: ${v}`);
}

console.log("KU validated");
