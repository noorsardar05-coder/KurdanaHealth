/** Daily home reflection questions — bilingual, calm, non-clinical. */
export const REFLECTION_QUESTIONS = [
  { en: "What made you smile today?", ku: "ئەمڕۆ چی پێکەنینت؟" },
  { en: "What challenged you today?", ku: "ئەمڕۆ چی سەخت بوو بۆت؟" },
  { en: "What are you grateful for today?", ku: "ئەمڕۆ بۆ چی سوپاسگوزاریت؟" },
  { en: "What felt soft or kind today?", ku: "ئەمڕۆ چی نەرم یان میهرەبان هەستت پێکرد؟" },
  { en: "What do you want to forgive yourself for?", ku: "دەتەوێت لەبەر چی لە خۆت خۆش بیت؟" },
  { en: "What is one thing your body needs right now?", ku: "ئێستا جەستەت پێویستی بە چی هەیە؟" },
  { en: "Who made you feel a little safer today?", ku: "ئەمڕۆ کێ کەمێک ئارامتری کردیت؟" },
  { en: "What can wait until tomorrow?", ku: "چی دەتوانێت بۆ سبەینێ بمێنێتەوە؟" },
  { en: "What strength did you use today, even quietly?", ku: "ئەمڕۆ کام هێزت بەکارهێنا، تەنانەت بە بێدەنگی؟" },
  { en: "What would you tell a friend who felt like you?", ku: "چی بە هاوڕێیەک دەڵێیت کە وەک تۆ هەست بکات؟" },
  { en: "What small win can you name from today?", ku: "ئەمڕۆ کام سەرکەوتنی بچووکت دەتوانیت ناوببەیت؟" },
  { en: "Where did you feel most at peace today?", ku: "ئەمڕۆ لە کوێ زیاتر ئارام بوویت؟" },
];

export const CALMING_LINES = [
  { en: "Take one small step today.", ku: "ئەمڕۆ یەک هەنگاوی بچووک بنێ." },
  { en: "Healing is not a race.", ku: "چاکبوونەوە پێشبڕکێ نییە." },
  { en: "Today is another chance to care for yourself.", ku: "ئەمڕۆ دەرفەتێکی تازەیە بۆ گرنگیدان بە تەندروستیت." },
  { en: "You do not have to do everything at once.", ku: "پێویست ناکات هەموو شتێک لە یەک کاتدا بکەیت." },
  { en: "Softness is a kind of strength.", ku: "نەرمی جۆرێکە لە هێز." },
  { en: "Your pace is allowed to be gentle.", ku: "مافت هەیە بە هێواشی بڕۆیت." },
  { en: "Breath by breath, you are here.", ku: "هەناسە بە هەناسە، تۆ لێرەیت." },
  { en: "Nothing about you needs to be rushed.", ku: "هیچ شتێک لەسەر تۆ پێویست ناکات پەلە بکرێت." },
];

export function dailyPick(list, salt = 0) {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate() + salt;
  return list[Math.abs(seed) % list.length];
}

export function pickCalmingLine() {
  return dailyPick(CALMING_LINES, 7);
}

export function pickReflection() {
  return dailyPick(REFLECTION_QUESTIONS, 13);
}
