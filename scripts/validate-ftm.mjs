import { readFileSync } from "fs";
import { pathToFileURL } from "url";

const babyPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/babyCare.js";
const learnPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/learnArticles.js";

function kuStringsFromFile(path) {
  const text = readFileSync(path, "utf8");
  const matches = [...text.matchAll(/bi\(\s*"[^"]*"\s*,\s*"([^"]*)"\s*\)/g)];
  return matches.map((m) => m[1]);
}

function latinInKu(ku) {
  return /[a-zA-Z]/.test(ku);
}

for (const [label, path] of [
  ["babyCare", babyPath],
  ["learnArticles", learnPath],
]) {
  const ku = kuStringsFromFile(path);
  const bad = ku.filter(latinInKu);
  console.log(label, "ku strings:", ku.length, "with Latin:", bad.length);
  bad.slice(0, 8).forEach((s) => console.log(" ", s.slice(0, 90)));
}

const baby = await import(pathToFileURL(babyPath).href);
console.log("BABY_AGE_BANDS:", baby.BABY_AGE_BANDS.length);
console.log("BABY_TOPICS:", baby.BABY_TOPICS.length);
console.log(
  "topic ids:",
  baby.BABY_TOPICS.map((t) => t.id).join(", ")
);

const learn = await import(pathToFileURL(learnPath).href);
console.log("LEARN_ARTICLES:", learn.LEARN_ARTICLES.length);
