/**
 * Lightweight educational games — no 3D, instant load.
 */
import { ORGANS } from "./organs.js";
import { BODY_FACTS } from "./facts.js";

export const GAMES = [
  {
    id: "guess-organ",
    icon: "🎯",
    color: "#7ec8e3",
    title: { en: "Guess the Organ", ku: "ئەندامەکە بزانە" },
    blurb: { en: "Read the clue. Pick the organ.", ku: "نیشانەکە بخوێنەوە. ئەندامەکە هەڵبژێرە." },
    xp: 25,
  },
  {
    id: "fact-or-myth",
    icon: "⚖️",
    color: "#c084fc",
    title: { en: "Fact or Myth", ku: "ڕاستی یان ئەفسانە" },
    blurb: { en: "Can you spot the myth?", ku: "دەتوانیت ئەفسانەکە بدۆزیتەوە؟" },
    xp: 25,
  },
  {
    id: "match-function",
    icon: "🔗",
    color: "#5eead4",
    title: { en: "Match Organ to Function", ku: "ئەندام بە کارەکەی ببەستەوە" },
    blurb: { en: "Pair each organ with what it does.", ku: "هەر ئەندامێک لەگەڵ کارەکەی ببەستەوە." },
    xp: 30,
  },
  {
    id: "digestive-journey",
    icon: "🍽",
    color: "#fb923c",
    title: { en: "Build the Digestive Journey", ku: "گەشتی هەرس دروست بکە" },
    blurb: { en: "Put the food path in the right order.", ku: "ڕێڕەوی خۆراک بە ڕیزی دروست دابنێ." },
    xp: 30,
  },
  {
    id: "memory",
    icon: "🃏",
    color: "#fcd34d",
    title: { en: "Memory Cards", ku: "کارتی بیرەوەری" },
    blurb: { en: "Match organ icons with their names.", ku: "ئایکۆنی ئەندام لەگەڵ ناوەکەی ببەستەوە." },
    xp: 30,
  },
  {
    id: "body-puzzle",
    icon: "🧩",
    color: "#fb7185",
    title: { en: "Body Puzzle", ku: "مەتەڵی جەستە" },
    blurb: { en: "Which organ belongs where?", ku: "کام ئەندام هی کوێیە؟" },
    xp: 25,
  },
  {
    id: "organ-quiz",
    icon: "📝",
    color: "#4ade80",
    title: { en: "Organ Quiz Rush", ku: "پرسیاری خێرای ئەندام" },
    blurb: { en: "Quick-fire questions from every organ.", ku: "پرسیاری خێرا لە هەموو ئەندامەکان." },
    xp: 35,
  },
];

const GUESS_CLUES = ORGANS.map((o) => ({
  organId: o.id,
  clue: {
    en: o.whatDoes.en.split(".")[0] + ".",
    ku: o.whatDoes.ku.split(".")[0] + ".",
  },
}));

export function buildGuessRounds(count = 5) {
  const pool = [...GUESS_CLUES].sort(() => Math.random() - 0.5).slice(0, count);
  return pool.map((item) => {
    const wrong = ORGANS.filter((o) => o.id !== item.organId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const correct = ORGANS.find((o) => o.id === item.organId);
    const options = [correct, ...wrong].sort(() => Math.random() - 0.5);
    return { ...item, options };
  });
}

export function buildMythRounds(count = 5) {
  const myths = ORGANS.map((o) => ({
    organId: o.id,
    statement: o.myth.myth,
    isMyth: true,
    reveal: o.myth.fact,
  }));
  const facts = ORGANS.map((o) => ({
    organId: o.id,
    statement: o.amazingFacts[0],
    isMyth: false,
    reveal: { en: "That one is true!", ku: "ئەمە ڕاستە!" },
  }));
  return [...myths, ...facts].sort(() => Math.random() - 0.5).slice(0, count);
}

export function buildMatchPairs(count = 4) {
  return ORGANS.sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((o) => ({
      id: o.id,
      name: o.name,
      icon: o.icon,
      function: {
        en: o.whatDoes.en.split(".")[0] + ".",
        ku: o.whatDoes.ku.split(".")[0] + ".",
      },
    }));
}

export const DIGESTIVE_ORDER = [
  { id: "mouth", icon: "👄", title: { en: "Mouth", ku: "دەم" } },
  { id: "esophagus", icon: "↓", title: { en: "Esophagus", ku: "سرنج" } },
  { id: "stomach", icon: "🫙", title: { en: "Stomach", ku: "سک" } },
  { id: "small", icon: "🧵", title: { en: "Small intestine", ku: "ڕیخۆڵەی باریک" } },
  { id: "large", icon: "📦", title: { en: "Large intestine", ku: "ڕیخۆڵەی قەڵەو" } },
  { id: "exit", icon: "🚪", title: { en: "Exit", ku: "دەرچوون" } },
];

export function buildMemoryCards() {
  const pick = ORGANS.sort(() => Math.random() - 0.5).slice(0, 6);
  const cards = [];
  pick.forEach((o) => {
    cards.push({ key: `${o.id}-icon`, pairId: o.id, face: o.icon, kind: "icon" });
    cards.push({ key: `${o.id}-name`, pairId: o.id, face: o.name, kind: "name" });
  });
  return cards.sort(() => Math.random() - 0.5);
}

export const PUZZLE_ITEMS = [
  {
    organId: "heart",
    where: { en: "Center of the chest (tilts left)", ku: "ناوەڕاستی سنگ (بە لای چەپ دەخەمڵێت)" },
  },
  {
    organId: "brain",
    where: { en: "Inside the skull", ku: "ناو کەللەسەر" },
  },
  {
    organId: "lungs",
    where: { en: "Inside the chest, either side of the heart", ku: "ناو سنگ، هەردوو لای دڵ" },
  },
  {
    organId: "liver",
    where: { en: "Upper right abdomen under the ribs", ku: "سەرەوەی ڕاستی سک لە ژێر پەراسوو" },
  },
  {
    organId: "kidneys",
    where: { en: "Mid-back, either side of the spine", ku: "ناوەڕاستی پشت، هەردوو لای بڕبڕە" },
  },
  {
    organId: "eyes",
    where: { en: "Front of the face, in the eye sockets", ku: "پێشەوەی دەموچاو، لە کونەکانی چاو" },
  },
];

export function buildOrganQuiz(count = 6) {
  const all = [];
  ORGANS.forEach((o) => {
    o.quiz.forEach((q) => all.push({ ...q, organId: o.id, organIcon: o.icon }));
  });
  return all.sort(() => Math.random() - 0.5).slice(0, count);
}

export { BODY_FACTS };
