/** Calm Sounds + Comfort Corner content — bilingual, premium calm. */

export const SOUNDSCAPES = [
  {
    id: "rain",
    durationSec: 0,
    labelKey: "rain",
    hue: ["#5b82a8", "#c9dae8"],
    quote: {
      en: "Let the rain hold what you don’t need to carry.",
      ku: "با باران ئەوە بگرێت کە پێویست ناکات هەڵی بگریت.",
    },
  },
  {
    id: "forest",
    durationSec: 0,
    labelKey: "forest",
    hue: ["#4a7d5c", "#c5dbc8"],
    quote: {
      en: "Among the trees, your mind can walk slowly.",
      ku: "لە نێو دارەکاندا، مێشکت دەتوانێت بە هێواشی بڕوات.",
    },
  },
  {
    id: "ocean",
    durationSec: 0,
    labelKey: "ocean",
    hue: ["#2f6f8f", "#a8d0e4"],
    quote: {
      en: "Waves come and go. You can too.",
      ku: "شەپۆل دێت و دەڕوات. تۆش دەتوانیت.",
    },
  },
  {
    id: "whiteNoise",
    durationSec: 0,
    labelKey: "whiteNoise",
    hue: ["#8a9199", "#e4e7eb"],
    quote: {
      en: "A soft blanket for a busy mind.",
      ku: "پەڕۆیەکی نەرم بۆ مێشکێکی سەرقاڵ.",
    },
  },
  {
    id: "lofi",
    durationSec: 0,
    labelKey: "lofi",
    hue: ["#7a6498", "#d9cce8"],
    quote: {
      en: "Nothing to finish. Just stay here a while.",
      ku: "هیچ شتێک بۆ تەواوکردن نییە. تەنها کەمێک لێرە بمێنەرەوە.",
    },
  },
  {
    id: "nature",
    durationSec: 0,
    labelKey: "nature",
    hue: ["#6a8f4e", "#d2e4c0"],
    quote: {
      en: "The outdoors lives quietly inside this sound.",
      ku: "دەرەوە بە بێدەنگی لەم دەنگەدا دەژی.",
    },
  },
  {
    id: "meditation",
    durationSec: 0,
    labelKey: "meditation",
    hue: ["#5f6fa8", "#cfd5ec"],
    quote: {
      en: "Breathe. The next moment can be softer.",
      ku: "هەناسە بدە. ساتی داهاتوو دەتوانێت نەرمتر بێت.",
    },
  },
];

export const COMFORT_SCENES = [
  {
    id: "rain",
    labelKey: "rain",
    soundId: "rain",
    quotes: [
      { en: "You are sheltered here.", ku: "لێرە پارێزراویت." },
      { en: "The rain is doing the talking for a while.", ku: "بۆ ماوەیەک باران قسە دەکات." },
      { en: "Soft weather for a soft heart.", ku: "کەشێکی نەرم بۆ دڵێکی نەرم." },
    ],
  },
  {
    id: "clouds",
    labelKey: "clouds",
    soundId: "clouds",
    quotes: [
      { en: "Watch the sky drift. You can drift too.", ku: "سەیری خلیسکانی ئاسمان بکە. تۆش دەتوانیت خلیسکی." },
      { en: "Nothing urgent lives in the clouds.", ku: "هیچ شتێکی پەلە لە هەورەکاندا ناژی." },
      { en: "Light and soft is enough.", ku: "سووک و نەرم بەسە." },
    ],
  },
  {
    id: "fireplace",
    labelKey: "fireplace",
    soundId: "fireplace",
    quotes: [
      { en: "Warmth without needing to earn it.", ku: "گەرمی، بێ ئەوەی پێویست بکات شتێک بکەیت بۆی." },
      { en: "Stay by the glow as long as you like.", ku: "هێندەی دەتەوێت لە لای درەوشانەوەکە بمێنەرەوە." },
      { en: "Your body can unclench here.", ku: "جەستەت دەتوانێت لێرە خۆی ئازاد بکات." },
    ],
  },
  {
    id: "ocean",
    labelKey: "ocean",
    soundId: "ocean",
    quotes: [
      { en: "The tide will keep moving without you.", ku: "شەپۆل بەبێ تۆش بەردەوام دەبێت." },
      { en: "Wide water. Wide breath.", ku: "ئاوی فراوان. هەناسەی فراوان." },
      { en: "You belong to this quiet shore.", ku: "تۆ هی ئەم کەنارە بێدەنگەیت." },
    ],
  },
  {
    id: "cats",
    labelKey: "cats",
    soundId: "cats",
    quotes: [
      { en: "Soft paws, soft thoughts.", ku: "پەنجەی نەرم، بیری نەرم." },
      { en: "Curl up. The world can wait.", ku: "خۆت کۆبکەرەوە. جیهان دەتوانێت چاوەڕوان بێت." },
      { en: "Companion energy, no demands.", ku: "هاوڕێیەتی، بێ داواکاری." },
    ],
  },
  {
    id: "dogs",
    labelKey: "dogs",
    soundId: "dogs",
    quotes: [
      { en: "Loyal quiet. You’re not alone.", ku: "بێدەنگی دڵسۆز. تۆ تەنها نیت." },
      { en: "A steady presence beside you.", ku: "ئامادەییەکی جێگیر لە لات." },
      { en: "Rest. Someone’s keeping watch.", ku: "پشوو بدە. کەسێک چاودێری دەکات." },
    ],
  },
  {
    id: "capybara",
    labelKey: "capybara",
    soundId: "capybara",
    quotes: [
      { en: "Unbothered. Unhurried. Like this.", ku: "بێ خەم. بێ پەلە. وەک ئەمە." },
      { en: "Peace is allowed to look this simple.", ku: "ئارامی مافی ئەوەی هەیە ئەمەندە سادە دیار بێت." },
      { en: "Float through the moment.", ku: "بەسەر ئەم ساتەدا خلیسکی." },
    ],
  },
];

export function formatDuration(sec) {
  if (!sec || sec <= 0) return "∞";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatElapsed(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
