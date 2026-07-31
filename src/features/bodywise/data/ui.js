/** UI chrome strings — English + Central Kurdish (Sorani). */

export const UI = {
  brand: { en: "BodyWise", ku: "بۆدی‌وایز" },
  tagline: {
    en: "Explore your body. One wonder at a time.",
    ku: "جەستەت بگەڕێ. هەر جارێک یەک سەرسوڕهێنەر.",
  },
  enter: { en: "Start exploring", ku: "دەست بە گەڕان بکە" },
  welcome: {
    en: "A beautiful way to understand the body you live in.",
    ku: "ڕێگەیەکی جوان بۆ تێگەیشتن لەو جەستەیەی تێیدا دەژیت.",
  },
  search: { en: "Search organs…", ku: "گەڕان بۆ ئەندام…" },
  noResults: { en: "No matches", ku: "هیچ ئەنجامێک نییە" },
  organs: { en: "Organs", ku: "ئەندامەکان" },
  games: { en: "Games", ku: "یارییەکان" },
  timelines: { en: "Journeys", ku: "گەشتەکان" },
  achievements: { en: "Badges", ku: "نیشانەکان" },
  home: { en: "Home", ku: "سەرەتا" },
  back: { en: "Back", ku: "گەڕانەوە" },
  factOfDay: { en: "Today's Fact", ku: "ڕاستی ئەمڕۆ" },
  surprise: { en: "Surprise Me", ku: "سەرسوڕم بکە" },
  whatIs: { en: "What is it?", ku: "چیە؟" },
  whatDoes: { en: "What does it do?", ku: "چی دەکات؟" },
  amazing: { en: "Amazing Facts", ku: "ڕاستی سەرسوڕهێنەر" },
  mythVsFact: { en: "Myth vs Fact", ku: "ئەفسانە بەرامبەر ڕاستی" },
  myth: { en: "Myth", ku: "ئەفسانە" },
  fact: { en: "Fact", ku: "ڕاستی" },
  didYouKnow: { en: "Did you know?", ku: "دەتزانی؟" },
  habits: { en: "Healthy Habits", ku: "خووی تەندروست" },
  quiz: { en: "Mini Quiz", ku: "پرسیاری کورت" },
  next: { en: "Next", ku: "دواتر" },
  prev: { en: "Previous", ku: "پێشوو" },
  finish: { en: "Finish", ku: "کۆتایی" },
  correct: { en: "Correct!", ku: "ڕاستە!" },
  wrong: { en: "Not quite", ku: "نەخێر، نزیک بوویت" },
  xpGain: { en: "+{n} XP", ku: "+{n} خاڵ" },
  xpLabel: { en: "{n} XP", ku: "{n} خاڵ" },
  alreadyDone: { en: "Already completed", ku: "پێشتر تەواوت کردبوو" },
  completed: { en: "Completed", ku: "تەواو بوو" },
  progress: { en: "Progress", ku: "پێشکەوتن" },
  level: { en: "Level {n}", ku: "ئاستی {n}" },
  streak: { en: "{n} day streak", ku: "زنجیرەی {n} ڕۆژ" },
  play: { en: "Play", ku: "یاری بکە" },
  score: { en: "Score", ku: "ئەنجام" },
  tryAgain: { en: "Try again", ku: "دووبارە هەوڵ بدە" },
  greatJob: { en: "Great job!", ku: "زۆر باش!" },
  continue: { en: "Continue", ku: "بەردەوام بە" },
  markDone: { en: "Got it", ku: "تێگەیشتم" },
  sectionLearn: { en: "Learn", ku: "فێربە" },
  sectionMyth: { en: "Myth", ku: "ئەفسانە" },
  sectionFacts: { en: "Facts", ku: "ڕاستییەکان" },
  sectionHabits: { en: "Habits", ku: "خووەکان" },
  sectionQuiz: { en: "Quiz", ku: "پرسیار" },
  lockedTip: { en: "Explore to unlock", ku: "بگەڕێ بۆ کردنەوە" },
  allBadges: { en: "Your badges", ku: "نیشانەکانت" },
  emptyBadges: { en: "Finish lessons and games to earn badges.", ku: "وانە و یاری تەواو بکە بۆ بەدەستهێنانی نیشانە." },
  stepOf: { en: "Step {n} of {t}", ku: "هەنگاوی {n} لە {t}" },
  tapNext: { en: "Tap to continue", ku: "دەست لێدە بۆ بەردەوامبوون" },
  close: { en: "Close", ku: "داخستن" },
  dashboard: { en: "Dashboard", ku: "داشبۆرد" },
  pickAnswer: { en: "Pick an answer", ku: "وەڵامێک هەڵبژێرە" },
  shuffleFacts: { en: "Shuffle", ku: "تێکەڵ بکە" },
  journeyPlay: { en: "Watch the journey", ku: "سەیری گەشتەکە بکە" },
  putInOrder: { en: "Tap in the correct order", ku: "بە ڕیزی دروست دەست لێدە" },
  matchPairs: { en: "Match the pairs", ku: "جووتەکان ببەستەوە" },
  mythBtn: { en: "Myth", ku: "ئەفسانە" },
  factBtn: { en: "Fact", ku: "ڕاستی" },
  moves: { en: "Moves", ku: "جووڵە" },
  youEarned: { en: "You earned", ku: "بەدەستت هێنا" },
};

export function s(lang, key, vars = {}) {
  const row = UI[key];
  if (!row) return key;
  let text = row[lang] || row.en || key;
  Object.entries(vars).forEach(([k, v]) => {
    text = text.replace(`{${k}}`, String(v));
  });
  return text;
}
