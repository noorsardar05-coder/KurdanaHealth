import { bi } from "../utils/locale.js";

function photo(id) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=80`;
}

const IMG = [
  photo("1490645930847-63deabe77c0d"),
  photo("1498830168855-a2e0d1f0b0a0"),
  photo("1512621776951-a57141f2eefd"),
  photo("1546069901-ba9599a7e63c"),
  photo("1490474418585-ba9bad8fd0ea"),
  photo("1536304993881-ff6e9eefa2a6"),
  photo("1504674900247-0877df9cc836"),
  photo("1547592166-23ac45744acd"),
];

// Fix potentially bad ID - use known good list only
const SAFE = [
  photo("1490645930847-63deabe77c0d"),
  photo("1512621776951-a57141f2eefd"),
  photo("1546069901-ba9599a7e63c"),
  photo("1490474418585-ba9bad8fd0ea"),
  photo("1536304993881-ff6e9eefa2a6"),
  photo("1504674900247-0877df9cc836"),
  photo("1547592166-23ac45744acd"),
  photo("1494859808449-a0c5ddad5f3d"),
  photo("1555939594-58d7cb561ad1"),
  photo("1540189549336-e6e99c3679fe"),
];

export const LEARN_CATEGORIES = [
  { id: "all", label: bi("All", "هەموو") },
  { id: "basics", label: bi("Basics", "بنەماکان") },
  { id: "habits", label: bi("Habits", "خوویەکان") },
  { id: "pantry", label: bi("Pantry", "مەتبەخ") },
  { id: "family", label: bi("Family", "خێزان") },
];

function article(a, i) {
  return {
    ...a,
    image: SAFE[i % SAFE.length],
    title: bi(a.titleEn, a.titleKu),
    excerpt: bi(a.excerptEn, a.excerptKu),
    body: { en: a.bodyEn, ku: a.bodyKu },
    takeaways: { en: a.takeawaysEn || [], ku: a.takeawaysKu || [] },
  };
}

const RAW = [
  {
    id: "balanced-plate",
    slug: "balanced-plate",
    category: "basics",
    titleEn: "What a balanced plate can look like",
    titleKu: "پلێتێکی هاوسەنگ چۆن دەردەکەوێت",
    excerptEn: "A simple visual guide to building meals without rigid rules.",
    excerptKu: "ڕێنماییەکی سادە بۆ دروستکردنی ژەم بەبێ یاسای توند.",
    bodyEn: [
      "A balanced plate is a flexible picture, not a test. Half colorful plants, a quarter satisfying protein, and a quarter nourishing carbs works for many people.",
      "Add a little fat for flavor and fullness — olive oil, tahini, nuts, or yogurt.",
      "Adjust portions to hunger, activity, and culture. Kurdish meals with rice, yogurt, and vegetables already hold this pattern.",
    ],
    bodyKu: [
      "پلێتی هاوسەنگ وێنەیەکی نەرمە، نەک تاقیکردنەوە. نیوە ڕووەک، چارەک پرۆتین، چارەک کاربۆهیدرات بۆ زۆر کەس گونجاوە.",
      "کەمێک چەوری زیاد بکە بۆ تام و تێری — ڕۆنی زەیتوون، تەحین، گوێز یان ماست.",
      "قەبارە بەپێی برسێتی و چالاکی بگۆڕە. ژەمی کوردی زۆرجار ئەم شێوازە لەخۆدەگرێت.",
    ],
    takeawaysEn: ["Visual balance beats perfection", "Include plants, protein, and carbs", "Honor your food culture"],
    takeawaysKu: ["هاوسەنگی بینراو باشترە لە تەواوبوون", "ڕووەک و پرۆتین و کاربۆهیدرات تێکەڵ بکە", "ڕێز لە کلتووری خۆراکت بگرە"],
    readingTime: 4,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "protein-basics",
    slug: "protein-basics",
    category: "basics",
    titleEn: "Protein basics for everyday meals",
    titleKu: "بنەماکانی پرۆتین بۆ ژەمی ڕۆژانە",
    excerptEn: "Eggs, legumes, yogurt, fish, and poultry — calm ways to add protein.",
    excerptKu: "هێلکە، پاقلەمەنی، ماست، ماسی و مریشک — ڕێگای ئارام بۆ زیادکردنی پرۆتین.",
    bodyEn: [
      "Protein helps meals feel satisfying. You do not need powders to start — kitchen foods work well.",
      "Spread protein across the day rather than only at dinner.",
      "If you eat plant-based, combine legumes, grains, nuts, and soy foods for variety.",
    ],
    bodyKu: [
      "پرۆتین یارمەتی تێری دەدات. پێویستت بە تۆز نییە — خۆراکی مەتبەخ بەسە.",
      "پرۆتین لە هەموو ڕۆژدا دابەش بکە نەک تەنها لە ئێوارەدا.",
      "ئەگەر ڕووەکی دەخۆیت، پاقلەمەنی و دانەوێڵە و گوێز تێکەڵ بکە.",
    ],
    takeawaysEn: ["Kitchen proteins count", "Spread intake through the day"],
    takeawaysKu: ["پرۆتینی مەتبەخ گرنگە", "لە درێژایی ڕۆژدا دابەشی بکە"],
    readingTime: 5,
    isFeatured: true,
  },
  {
    id: "fiber-friend",
    slug: "fiber-friend",
    category: "basics",
    titleEn: "Fiber: a gentle friend for fullness",
    titleKu: "فایبەر: هاوڕێیەکی نەرم بۆ تێری",
    excerptEn: "Vegetables, legumes, fruits, and whole grains support digestive comfort for many people.",
    excerptKu: "سەوزە، پاقلەمەنی، میوە و دانەوێڵەی تەواو پشتگیری هەرس دەکەن.",
    bodyEn: [
      "Increase fiber gradually and drink water alongside it.",
      "Bulgur, lentils, apples, and leafy greens are approachable starting points.",
    ],
    bodyKu: [
      "فایبەر بە هێواشی زیاد بکە و ئاو لەگەڵیدا بخۆرەوە.",
      "ساوار، نیسک، سێو و سەوزی گەڵا خاڵی دەستپێکی باشن.",
    ],
    takeawaysEn: ["Go gradual", "Pair fiber with fluids"],
    takeawaysKu: ["بە هێواشی", "فایبەر لەگەڵ شلی"],
    readingTime: 3,
    isTrending: true,
  },
  {
    id: "hydration-rhythm",
    slug: "hydration-rhythm",
    category: "habits",
    titleEn: "Building a hydration rhythm",
    titleKu: "دروستکردنی ڕیتمی ئاودان",
    excerptEn: "Small cues beat all-or-nothing water goals.",
    excerptKu: "نیشانەی بچووک باشترە لە ئامانجی توندی ئاو.",
    bodyEn: [
      "Keep a bottle nearby. Sip with meals. Notice thirst earlier in the day.",
      "Herbal tea and water-rich foods also contribute.",
    ],
    bodyKu: [
      "بوتڵێک لەلا بەجێبهێڵە. لەگەڵ ژەمەکاندا هەڵی بمژە.",
      "چا و خۆراکی پڕ لە ئاویش یارمەتی دەدەن.",
    ],
    takeawaysEn: ["Cues over perfection", "Meals are hydration moments"],
    takeawaysKu: ["نیشانە باشترە لە تەواوبوون", "ژەمەکان کاتی ئاوخواردنەوەشن"],
    readingTime: 3,
    isFeatured: true,
  },
  {
    id: "meal-timing",
    slug: "meal-timing",
    category: "habits",
    titleEn: "Meal timing without rigid rules",
    titleKu: "کاتی ژەم بەبێ یاسای توند",
    excerptEn: "Regular-ish meals often support energy better than long chaotic gaps.",
    excerptKu: "ژەمی نیمچە ڕێک زۆرجار وزە باشتر دەکات لە بۆشایی درێژ.",
    bodyEn: [
      "Choose a pattern you can keep: three meals, or meals plus snacks.",
      "Late-night eating is not morally wrong — notice how you feel and sleep.",
    ],
    bodyKu: [
      "شێوازێک هەڵبژێرە کە دەتوانیت بیپارێزیت.",
      "خواردنی درەنگ هەڵە نییە — سەیری هەست و خەوت بکە.",
    ],
    takeawaysEn: ["Consistency helps energy", "Listen to your body"],
    takeawaysKu: ["بەردەوامی یارمەتی وزە دەدات", "گوێ لە جەستەت بگرە"],
    readingTime: 4,
  },
  {
    id: "label-literacy",
    slug: "label-literacy",
    category: "basics",
    titleEn: "Reading food labels calmly",
    titleKu: "خوێندنەوەی ئارامی پێوەری خۆراک",
    excerptEn: "Serving size, ingredients list, and key nutrients — without panic.",
    excerptKu: "قەبارەی خزمەتگوزاری، پێکهاتەکان و خۆراکی سەرەکی — بەبێ ترس.",
    bodyEn: [
      "Start with the ingredients list: shorter is not always better, but clarity helps.",
      "Compare similar products using serving size, not front-of-pack marketing.",
    ],
    bodyKu: [
      "لە لیستی پێکهاتەکانەوە دەست پێبکە.",
      "بەرهەمی هاوشێوە بە قەبارەی خزمەتگوزاری بەراورد بکە.",
    ],
    takeawaysEn: ["Ingredients first", "Compare fairly"],
    takeawaysKu: ["سەرەتا پێکهاتەکان", "بەراوردی دادپەروەرانە"],
    readingTime: 5,
    isTrending: true,
  },
  {
    id: "kurdish-pantry",
    slug: "kurdish-pantry",
    category: "pantry",
    titleEn: "A nourishing Kurdish pantry",
    titleKu: "مەتبەخێکی دەوڵەمەندی کوردی",
    excerptEn: "Bulgur, legumes, yogurt, rice, herbs, and olive oil as everyday anchors.",
    excerptKu: "ساوار، پاقلەمەنی، ماست، برنج، گیا و ڕۆنی زەیتوون وەک بنەمای ڕۆژانە.",
    bodyEn: [
      "Traditional pantries already hold balanced building blocks.",
      "Keep staples ready so weeknight meals stay simple.",
    ],
    bodyKu: [
      "مەتبەخی نەریتی بنەمای هاوسەنگی تێدایە.",
      "کەلوپەلی سەرەکی ئامادە بهێڵەرەوە بۆ ژەمی خێرا.",
    ],
    takeawaysEn: ["Honor local staples", "Prep once, cook calmly"],
    takeawaysKu: ["ڕێز لە کەلوپەلی ناوخۆیی", "یەک جار ئامادە بکە"],
    readingTime: 4,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "mindful-bites",
    slug: "mindful-bites",
    category: "habits",
    titleEn: "Mindful eating in busy days",
    titleKu: "خواردنی وریا لە ڕۆژە سەرقاڵەکاندا",
    excerptEn: "Slow the first few bites. Put the phone down for one meal.",
    excerptKu: "یەکەم چەند پارچە هێواش بکە. بۆ یەک ژەم مۆبایل لاببە.",
    bodyEn: [
      "Mindful eating is attention, not restriction.",
      "Even two mindful minutes can change how full you feel.",
    ],
    bodyKu: [
      "خواردنی وریا سەرنجە، نەک سنووردانان.",
      "تەنها دوو خولەکی وریا دەتوانێت هەستی تێری بگۆڕێت.",
    ],
    takeawaysEn: ["Attention over restriction", "Start tiny"],
    takeawaysKu: ["سەرنج نەک سنوور", "بچووک دەست پێبکە"],
    readingTime: 3,
  },
  {
    id: "blood-sugar-awareness",
    slug: "blood-sugar-awareness",
    category: "basics",
    titleEn: "Blood sugar awareness (educational)",
    titleKu: "ئاگاداری شەکری خوێن (پەروەردەیی)",
    excerptEn: "Pairing carbs with protein, fiber, and fat may support steadier energy for some people.",
    excerptKu: "تێکەڵکردنی کاربۆهیدرات لەگەڵ پرۆتین و فایبەر لەوانەیە وزە جێگیرتر بکات.",
    bodyEn: [
      "This is general education, not diabetes treatment.",
      "Anyone with a medical condition should follow clinician guidance.",
    ],
    bodyKu: [
      "ئەمە پەروەردەی گشتییە، نەک چارەسەری نەخۆشی شەکرە.",
      "هەر کەسێک باری پزیشکی هەبێت دەبێت شوێن ڕێنمایی پزیشک بکەوێت.",
    ],
    takeawaysEn: ["Education only", "Seek clinical care when needed"],
    takeawaysKu: ["تەنها پەروەردەیی", "کاتێک پێویست بێت ڕاوێژی پزیشکی وەربگرە"],
    readingTime: 5,
  },
  {
    id: "family-table",
    slug: "family-table",
    category: "family",
    titleEn: "Family meals without pressure",
    titleKu: "ژەمی خێزانی بەبێ فشار",
    excerptEn: "Offer variety. Model calm eating. Avoid using food as reward or punishment.",
    excerptKu: "هەمەجۆری پێشکەش بکە. خواردنی ئارام نیشان بدە.",
    bodyEn: [
      "Shared meals build connection. Keep conversation light when you can.",
      "Children learn from what is available and how adults relate to food.",
    ],
    bodyKu: [
      "ژەمی هاوبەش پەیوەندی دروست دەکات.",
      "منداڵان لە خۆراک و هەڵسوکەوتی گەورەکان فێردەبن.",
    ],
    takeawaysEn: ["Connection over control", "Model calm"],
    takeawaysKu: ["پەیوەندی نەک کۆنترۆڵ", "ئارامی نیشان بدە"],
    readingTime: 4,
    isTrending: true,
  },
  {
    id: "quick-cook-skills",
    slug: "quick-cook-skills",
    category: "habits",
    titleEn: "Three cooking skills that save weeknights",
    titleKu: "سێ توانای چێشتلێنان کە شەوی هەفتە ڕزگار دەکەن",
    excerptEn: "Batch grains, chop vegetables once, and master one sauce.",
    excerptKu: "دانەوێڵە بە کۆمەڵ، سەوزە یەک جار ببڕە، یەک سۆس فێربە.",
    bodyEn: [
      "Prep reduces decision fatigue.",
      "A yogurt-herb sauce or lemon-tahini dressing lifts simple plates.",
    ],
    bodyKu: [
      "ئامادەکردن ماندوێتی بڕیار کەم دەکاتەوە.",
      "سۆسی ماست-گیا یان لیمۆ-تەحین پلێتی سادە بەرز دەکاتەوە.",
    ],
    takeawaysEn: ["Batch once", "One reliable sauce"],
    takeawaysKu: ["یەک جار کۆمەڵ بکە", "یەک سۆسی متمانەپێکراو"],
    readingTime: 4,
    isFeatured: true,
  },
  {
    id: "snack-smart",
    slug: "snack-smart",
    category: "habits",
    titleEn: "Satisfying snacks that travel well",
    titleKu: "خواردنی سووکی تێرکەر کە گەشتی باشە",
    excerptEn: "Pair something with protein or fat: fruit + nuts, yogurt + dates.",
    excerptKu: "لەگەڵ پرۆتین یان چەوری: میوە + گوێز، ماست + خورما.",
    bodyEn: ["Snacks are tools, not failures.", "Plan one go-to option for busy afternoons."],
    bodyKu: ["خواردنی سووک ئامرازە، نەک شکست.", "یەک بژاردەی ئامادە بۆ دوای نیوەڕۆ هەبێت."],
    takeawaysEn: ["Pair for staying power", "Plan one default"],
    takeawaysKu: ["بۆ مانەوە تێکەڵ بکە", "یەک بژاردەی بنەڕەتی"],
    readingTime: 3,
  },
];

// Add more short articles to reach ~24
const EXTRA = [
  ["oats-morning", "basics", "Oats and calm mornings", "جۆ و بەیانییە ئارامەکان", "A warm bowl can be fiber, comfort, and flexibility."],
  ["yogurt-culture", "pantry", "Yogurt beyond breakfast", "ماست لەدەرەوەی نانی بەیانی", "Use yogurt in sauces, marinades, and sides."],
  ["lentil-love", "pantry", "Lentils as weeknight heroes", "نیسک وەک قارەمانی شەوی هەفتە", "Affordable protein and fiber in one pot."],
  ["olive-oil-use", "pantry", "Cooking with olive oil", "چێشتلێنان بە ڕۆنی زەیتوون", "Flavor, satisfaction, and Mediterranean familiarity."],
  ["shop-list", "habits", "How to write a kinder grocery list", "چۆن لیستی کڕینی نەرم بنووسیت", "Plan around meals you will actually cook."],
  ["leftover-magic", "habits", "Leftovers as future meals", "ماوەی خواردن وەک ژەمی داهاتوو", "Cook once, remix twice."],
  ["seasonal-fruit", "basics", "Seasonal fruit without rules", "میوەی وەرزی بەبێ یاسا", "Enjoy what is ripe and available."],
  ["soup-season", "family", "Soup as shared comfort", "شۆربا وەک ئاسوودەیی هاوبەش", "One pot can feed many moods."],
  ["tea-pause", "habits", "A tea pause between meals", "وەستانی چا لەنێوان ژەمەکاندا", "Hydration and a moment to reset."],
  ["protein-plants", "basics", "Plant proteins in practice", "پرۆتینی ڕووەکی لە پڕاکتیکدا", "Chickpeas, beans, tofu, and nuts in rotation."],
  ["breakfast-ideas", "habits", "Breakfast when time is short", "نانی بەیانی کاتێک کات کەمە", "Eggs, yogurt bowls, or leftover grains."],
  ["dinner-reset", "family", "A gentle dinner reset", "ڕێکخستنەوەی نەرمی ئێوارە", "One vegetable, one protein, one carb."],
];

EXTRA.forEach((row, idx) => {
  const [id, category, titleEn, titleKu, excerptEn] = row;
  RAW.push({
    id,
    slug: id,
    category,
    titleEn,
    titleKu,
    excerptEn,
    excerptKu: excerptEn,
    bodyEn: [excerptEn, "Keep the tone practical and kind. Adjust to your kitchen and culture."],
    bodyKu: [excerptEn, "تۆنێکی کردەیی و میهرەبان بهێڵەرەوە. بەپێی مەتبەخ و کلتوورەکەت بگونجێنە."],
    takeawaysEn: ["Keep it practical", "Stay kind to yourself"],
    takeawaysKu: ["کردەیی بمێنەرەوە", "میهرەبان بە لەگەڵ خۆت"],
    readingTime: 3,
    isFeatured: idx < 2,
    isTrending: idx % 3 === 0,
  });
});

export const LEARN_ARTICLES = RAW.map((a, i) => article(a, i));

export function getLearnArticle(slug) {
  return LEARN_ARTICLES.find((a) => a.slug === slug || a.id === slug) || null;
}

export function getFeaturedLearn() {
  return LEARN_ARTICLES.filter((a) => a.isFeatured);
}

export function getTrendingLearn() {
  return LEARN_ARTICLES.filter((a) => a.isTrending);
}
