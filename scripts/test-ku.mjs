import { readFileSync } from "fs";
import { URGENT_DISCLAIMER } from "../src/features/first-time-mothers/data/urgentSigns.js";

function kuFrom(text) {
  return [...text.matchAll(/bi\(\s*"[^"]*"\s*,\s*"([^"]*)"\s*\)/g)].map((m) => m[1]);
}

const babyPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/babyCare.js";
const baby = readFileSync(babyPath, "utf8");

// Extract clean ku fragments from babyCare (lines without Latin)
const fragments = kuFrom(baby).filter((s) => !/[a-zA-Z]/.test(s));

// Build seekHelp body 3 from clean parts
const seekB3 =
  "ژمارەی فوری پاشەکەوت بکە و نزیکترین نەخۆشxane بناسە. بۆ نیگەرانی nafuri، پەیwەndiیەکی تەلەfۆn لەگەڵ mamani، سەrdankeri tendrosty، yan hêlli mndalal detwane dlxat bkat. " +
  URGENT_DISCLAIMER.ku.substring(URGENT_DISCLAIMER.ku.indexOf("ئەگەر"));

// Build prefix from journeyStages line - read file
const journey = readFileSync(
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/journeyStages.js",
  "utf8"
);
const jKu = kuFrom(journey).filter((s) => !/[a-zA-Z]/.test(s));
const socialLine = jKu.find((s) => s.includes("تۆڕی پشتگیری"));
const packLine = jKu.find((s) => s.includes("جانتا نەخۆشخانە"));

const seekB3v2 =
  (packLine ? packLine.split("—")[0].trim() + ". " : "") +
  URGENT_DISCLAIMER.ku;

console.log("seekB3v2 latin?", /[a-zA-Z]/.test(seekB3v2));
console.log(seekB3v2);

// Better body3:
const seekB3final =
  "ژمارەی فوری پاشەکەوت بکە و نزیکترین نەخۆشxane بناسە. " +
  URGENT_DISCLAIMER.ku.split("。").join("").split(". ").slice(1).join(". ") ||
  URGENT_DISCLAIMER.ku;

// Simplest clean body 3:
const body3 =
  "جانتا نەخۆشخانە ئامادە بکە و ڕێگاکەت بزانە. " +
  URGENT_DISCLAIMER.ku.replace(/^[^\u0600-\u06FF]+/, "").trim();

// Actually use packLine + disclaimer
const body3clean = packLine + " " + URGENT_DISCLAIMER.ku;
console.log("body3clean latin?", /[a-zA-Z]/.test(body3clean));
console.log(body3clean);
