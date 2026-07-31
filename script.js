const $ = (id) => document.getElementById(id);

const NSM_QUOTES = [
  { en: "Glow is built, not bought.", ku: "درەوشانەوە دروست دەکرێت، ناکڕدرێت." },
  { en: "Soft care creates strong confidence.", ku: "چاودێری نەرم متمانەی بەهێز دروست دەکات." },
  { en: "Consistency is the real beauty secret.", ku: "بەردەوامی نهێنی ڕاستەقینەی جوانییە." },
  { en: "Healthy skin is quiet discipline.", ku: "پێستی تەندروست دیسیپلینی ئارامە." },
  { en: "Your routine is a love letter to yourself.", ku: "روتینەکەت نامەیەکی خۆشەویستییە بۆ خۆت." },
  { en: "Hydration is the first layer of glow.", ku: "ئاو یەکەم لایەنی درەوشانەوەیە." },
  { en: "Barrier first. Everything else can wait.", ku: "سەرەتا باریێر. هەموو شتێکی تر دەتوانێت چاوەڕوان بێت." },
  { en: "Less noise, more ritual.", ku: "کەمتر دەنگ، زیاتر ڕێوڕەسم." },
  { en: "Beauty is calm attention, not panic.", ku: "جوانی سەرنجی ئارامە، نە ئاڵۆزی." },
  { en: "SPF today is wisdom tomorrow.", ku: "SPF ـی ئەمڕۆ دانایەتی سبەیە." },
  { en: "Sleep is the cheapest luxury for skin.", ku: "خەو ئەرزانترین لوکسە بۆ پێست." },
  { en: "Gentle beats harsh, every time.", ku: "نەرم هەمیشە لە توند سەرکەوتووترە." },
  { en: "Your mirror rewards habits, not hurry.", ku: "ئاوێنە نەریتەکانت پاداشت دەکات، نە پەلەپەل." },
  { en: "Patch test once, glow safer forever.", ku: "جارێک تاقی بکەرەوە، درەوشانەوە ئاسوتر." },
  { en: "Scalp care is hair care.", ku: "چاودێری سەرپێست واتای چاودێری قژە." },
  { en: "Cream blush forgives; harsh scrubs rarely do.", ku: "بلشی کریم لێبوردەیە؛ scrub ـی توند زۆرجار نا." },
  { en: "Progress beats perfection.", ku: "پێشکەوتن لە تەواوبوون گرنگترە." },
  { en: "You are allowed to start small.", ku: "دەتوانیت بە بچووکی دەست پێ بکەیت." },
  { en: "Evening repair is morning glow.", ku: "چاککردنەوەی ئێوارە بەیانی درەوشانەوەیە." },
  { en: "Ingredients matter. So does patience.", ku: "پێکهاتەکان گرنگن. ئارامیش هەمان قەدەر." },
  { en: "Makeup looks best on cared-for skin.", ku: "میکاپ لەسەر پێستی چاودێری کراو جوانتر دەردەکەوێت." },
  { en: "Stress shows on skin—pause on purpose.", ku: "ستریس لە پێست دەردەکەوێت—بە مەبەست وەستە." },
  { en: "Water is not hype; it is baseline.", ku: "ئاو هایپ نییە؛ بنەمایە." },
  { en: "Luxury is knowing what your skin needs.", ku: "لوکس ئەوەیە بزانیت پێستت چی پێویستی هەیە." },
  { en: "Soft light, soft habits, lasting glow.", ku: "ڕووناکی نەرم، نەریتی نەرم، درەوشانەوەی مایەپەست." },
  { en: "Noor shines through consistency.", ku: "نوور لە بەردەوامی دەردەکەوێت." },
  { en: "Care is the quiet kind of strength.", ku: "چاودێری جۆرێکە لە هێزی ئارام." },
  { en: "Tomorrow’s glow starts tonight.", ku: "درەوشانەوەی سبەینێ لە ئەمشەو دەست پێ دەکات." }
];

const TXT = {
  en: {
    brandTag: "Beauty Department",
    heroTitle: "Beauty & Self-Care",
    heroSubtitle: "Calm structure, intelligent care, and a premium routine—without the noise.",
    quoteHint: "Tap for another NSM thought",
    goQuiz: "Start beauty quiz",
    goLearn: "Open ingredient library",
    tabExplore: "Explore",
    tabLearn: "Learn",
    tabPlay: "Play",
    tabTrack: "Track",
    tabDiscover: "Discover",
    exploreTitle: "Explore",
    exploreSub: "Your personalized beauty quiz lives here—one clear step at a time.",
    quizCardLabel: "Beauty analyzer",
    resultTitle: "Your tailored plan",
    learnTitle: "Learn",
    learnSub: "Search 200+ ingredients. Open a card for clear, structured facts.",
    beautyGuides: "Quick guides",
    playTitle: "Play",
    playSub: "Three focused games—scores, feedback, and restart on every one.",
    skinGameTitle: "Skin type guess",
    matchGameTitle: "Ingredient match",
    routineGameTitle: "Routine builder",
    routineGameSub: "Tap steps in the correct order (cleanser → serum → moisturizer → SPF).",
    trackTitle: "Daily habits",
    trackSub: "Skincare check-in, water, sleep, and self-care—saved on this device.",
    saveDay: "Log today",
    resetDay: "Reset all",
    discoverTitle: "Discover",
    discoverSub: "Curated trends, one daily tip, and simple routine ideas.",
    trendsLabel: "Trends to watch",
    dailyTipsTitle: "Daily tip",
    nextTip: "Next tip",
    routineIdeasTitle: "Routine ideas",
    quizHint: "Select an answer, then continue.",
    next: "Next",
    back: "Back",
    startOver: "Take quiz again",
    ingredientSearch: "Search ingredients…",
    countLabel: "matches",
    sections: ["What it is", "What it does", "How it works", "Best for", "Benefits", "When to avoid", "How to use", "Myth vs fact", "Natural sources", "Key takeaway"],
    didYouKnow: "Did you know?",
    skincare: "Skincare basics",
    haircare: "Hair care",
    makeup: "Makeup",
    nailcare: "Nail care",
    natural: "Natural beauty",
    filterAll: "All",
    playRestart: "Restart game",
    score: "Score",
    round: "Round",
    correct: "Correct.",
    wrong: "Not quite—try again.",
    skinPrompt: "Which skin type fits this symptom best?",
    matchPrompt: "Which benefit is this ingredient best known for?",
    routineWin: "Perfect order. Routine locked in.",
    routineReset: "Wrong step—sequence cleared. Try again.",
    routineShuffle: "Steps appear shuffled. Tap in the right order.",
    trackWater: "Water (glasses)",
    trackSleep: "Sleep (hours)",
    trackSkincare: "Did your skincare routine",
    trackSelf: "Self-care moment",
    streak: "Day streak",
    progressLabel: "Today’s completion"
  },
  ku: {
    brandTag: "بەشی جوانکاری",
    heroTitle: "جوانکاری و چاودێری خۆ",
    heroSubtitle: "ڕێکخستنی ئارام، چاودێری زیرەک، و روتینێکی جوان—بەبێ دەنگی زیادە.",
    quoteHint: "بدە بۆ وتەی دیکە لە NSM",
    goQuiz: "دەستپێکردنی تاقیکردنەوە",
    goLearn: "کردنەوەی کتێبخانەی پێکهاتەکان",
    tabExplore: "گەڕان",
    tabLearn: "فێربوون",
    tabPlay: "یاری",
    tabTrack: "شوێنکەوتن",
    tabDiscover: "دۆزینەوە",
    exploreTitle: "گەڕان",
    exploreSub: "تاقیکردنەوەی تایبەت لێرەیە—هەر جارێک یەک هەنگاو.",
    quizCardLabel: "شیکاری جوانکاری",
    resultTitle: "پلانی تایبەت بە تۆ",
    learnTitle: "فێربوون",
    learnSub: "بەدوای ٢٠٠+ پێکهاتە بگەڕێ. کارتی بکەرەوە بۆ زانیاری ڕوون.",
    beautyGuides: "ڕێنمایی خێرا",
    playTitle: "یاری",
    playSub: "سێ یاری تایبەت—نمرە، ڕەخنەی ڕاست، و دەستپێکردنەوە.",
    skinGameTitle: "ناسینی جۆری پێست",
    matchGameTitle: "هاوتاکردنی پێکهاتە",
    routineGameTitle: "ڕیزکردنی روتین",
    routineGameSub: "هەنگاوەکان بە ڕیزێکی دروست دابگرە (پاککەرەوە → سیرۆم → نەمکەرەوە → SPF).",
    trackTitle: "نەریتی ڕۆژانە",
    trackSub: "سکینکێر، ئاو، خەو، و خۆچاودێری—پاشەکەوت لەسەر ئەم ئامێرە.",
    discoverTitle: "دۆزینەوە",
    discoverSub: "ترێندە هەڵبژێردراوەکان، یەک ئامۆژگاری ڕۆژانە، و بیرۆکەی روتین.",
    trendsLabel: "ترێندەکان",
    dailyTipsTitle: "ئامۆژگاری ڕۆژانە",
    nextTip: "ئامۆژگاری داهاتوو",
    routineIdeasTitle: "بیرۆکەی روتین",
    quizHint: "وەڵام هەڵبژێرە، پاشان بەردەوام بە.",
    next: "دواتر",
    back: "گەڕانەوە",
    startOver: "دووبارەکردنەوەی تاقیکردنەوە",
    ingredientSearch: "گەڕان بە پێکهاتەکان…",
    countLabel: "ئەنجام",
    sections: ["چییە", "کاری چییە", "چۆن کاردەکات", "باشترین بۆ", "سوودەکان", "کەی دووربکەویتەوە", "چۆنیەتی بەکارهێنان", "میت و ڕاستی", "سەرچاوەی سروشتی", "کورتە"],
    didYouKnow: "ئایا دەزانیت",
    skincare: "بنەمای سکینکێر",
    haircare: "چاودێری قژ",
    makeup: "میکاپ",
    nailcare: "نینۆک",
    natural: "جوانکاری سروشتی",
    filterAll: "هەموو",
    playRestart: "دووبارەکردنەوەی یاری",
    score: "نمرە",
    round: "خول",
    correct: "دروستە.",
    wrong: "هێشتا نا—دووبارە هەوڵ بدەرەوە.",
    skinPrompt: "کام جۆری پێست لەگەڵ ئەم نیشانانەدا دەگونجێت؟",
    matchPrompt: "کام سوود ئەم پێکهاتەیە بە شێوەیەکی زۆرتر ناسراوە؟",
    routineWin: "ڕیزبەندی تەواو دروستە.",
    routineReset: "هەنگاو هەڵە بوو—ڕیزەکە پاککرایەوە. دووبارە هەوڵ بدە.",
    routineShuffle: "هەنگاوەکان بە تەرتیبی جیاواز نیشان دراون. بە ڕیزێکی دروست دایگرە.",
    trackWater: "ئاو (پەرداخ)",
    trackSleep: "خەو (کاتژمێر)",
    trackSkincare: "روتینی سکینکێرم کرد",
    trackSelf: "کاتێکی خۆچاودێری",
    streak: "زنجیرەی ڕۆژەکان",
    progressLabel: "تەواوبوونی ئەمڕۆ"
  }
};

const QUIZ = {
  en: [
    ["Skin type", ["Oily", "Dry", "Combination", "Sensitive"]],
    ["Hair type", ["Straight", "Wavy", "Curly", "Coily"]],
    ["Main concern", ["Acne / congestion", "Dullness / uneven tone", "Dryness / dehydration", "Hair shedding / breakage"]],
    ["Routine level", ["Simple (3 steps)", "Balanced (4–5 steps)", "Advanced (layered actives)"]],
    ["Lifestyle", ["I sleep well", "I need more water", "High stress lately", "Fairly balanced"]],
    ["Makeup style", ["Natural / skin-first", "Soft glam", "Full glam", "Minimal / no makeup most days"]]
  ],
  ku: [
    ["جۆری پێست", ["چەور", "وشک", "تێکەڵ", "هەستیار"]],
    ["جۆری قژ", ["ڕاست", "شەپۆڵاو", "کەلکەلە", "زۆر کەلکەلە"]],
    ["کێشەی سەرەکی", ["ئاکنە / داخراو", "بێ درەوشانەوە / ڕەنگ ناهاوسەنگ", "وشکی / کەمی ئاو", "ڕژانی قژ / شکانی"]],
    ["ئاستی روتین", ["سادە (٣ هەنگاو)", "هاوسەنگ (٤–٥ هەنگاو)", "پێشکەوتوو (چەند ئاکتیڤ)"]],
    ["ژیان / تەندروستی", ["خەوم باشە", "پێویستم بە ئاوە زیاترە", "مەترسیدارە لە سترێس", "هاوسەنگم"]],
    ["شێوازی میکاپ", ["سروشتی / پێست سەرەکی", "سافت گلام", "گلامی تەواو", "مینیمال / زۆرجار بێ میکاپ"]]
  ]
};

const SKIN_ROUNDS = [
  { en: "By noon the forehead and nose look shiny, cheeks feel more normal.", ku: "تا نیوەڕۆ ناوچەی T دەبێتە چەور، ڕەنگە ڕوومەتەکە ئاساییتر بێت.", a: "oily" },
  { en: "After cleansing, skin feels tight and may flake.", ku: "دوای پاککردنەوە پێست وشک دەردەکەوێت و لەوانەیە قشر بێت.", a: "dry" },
  { en: "Oily T-zone but drier cheeks—two textures at once.", ku: "ناوچەی T چەورە، بەڵام ڕوومەت وشکترە—دوو جۆر هەست لە یەک کاتدا.", a: "combo" },
  { en: "New products often sting, flush, or itch quickly.", ku: "بەرهەمی نوێ زۆرجار دەتووشێنێت، سوور دەکاتەوە، یان دەخنکێنێت.", a: "sensitive" },
  { en: "Pores look more visible mainly on the nose and inner cheeks.", ku: "کونەکان لەسەر لووت و ناو ڕوومەت دیارترن.", a: "oily" }
];

const MATCH_ROUNDS = [
  { ing: "Niacinamide", key: "calm" },
  { ing: "Hyaluronic acid", key: "hydrate" },
  { ing: "Salicylic acid", key: "pores" },
  { ing: "Ceramides", key: "barrier" },
  { ing: "Retinol", key: "renew" }
];

const BENEFIT_OPTS = {
  en: { calm: "Calm redness & oil balance", hydrate: "Draw in hydration", pores: "Unclog & clarify pores", barrier: "Support skin barrier", renew: "Speed up skin renewal" },
  ku: { calm: "ئارامکردنەوەی سووربوون و هاوسەنگی چەوری", hydrate: "ڕاکێشانی ئاو بۆ پێست", pores: "پاککردنەوەی کونەکان", barrier: "پشتیوانی باریێر", renew: "نوێکردنەوەی خێراتری پێست" }
};

const MATCH_ANSWER = {
  Niacinamide: "calm",
  "Hyaluronic acid": "hydrate",
  "Salicylic acid": "pores",
  Ceramides: "barrier",
  Retinol: "renew"
};

const ROUTINE_ORDER = ["cleanse", "serum", "moist", "spf"];
const ROUTINE_LABEL = {
  en: { cleanse: "Cleanser", serum: "Serum", moist: "Moisturizer", spf: "SPF" },
  ku: { cleanse: "پاککەرەوە", serum: "سیرۆم", moist: "نەمکەرەوە", spf: "SPF" }
};

const coreIngredients = [
  ["Hyaluronic Acid", ["hydration", "skin"]],
  ["Niacinamide", ["acne", "skin"]],
  ["Retinol", ["anti-aging", "skin"]],
  ["Vitamin C", ["glow", "skin"]],
  ["Salicylic Acid", ["acne", "skin"]],
  ["Glycolic Acid", ["exfoliation", "skin"]],
  ["Ceramides", ["barrier", "skin"]],
  ["Peptides", ["anti-aging", "skin"]],
  ["Collagen", ["firmness", "skin"]],
  ["Aloe Vera", ["calming", "skin"]],
  ["Tea Tree", ["acne", "skin"]],
  ["Argan Oil", ["hair", "hydration"]],
  ["Shea Butter", ["hydration", "skin"]],
  ["Rose Water", ["calming", "skin"]],
  ["Biotin", ["hair", "nails"]],
  ["Caffeine", ["puffiness", "skin"]],
  ["Zinc PCA", ["acne", "skin"]],
  ["Kaolin Clay", ["oily", "skin"]],
  ["Charcoal", ["oily", "skin"]],
  ["Panthenol", ["barrier", "hair"]],
  ["Squalane", ["hydration", "skin"]],
  ["Centella Asiatica", ["calming", "skin"]],
  ["Azelaic Acid", ["acne", "tone"]],
  ["Lactic Acid", ["exfoliation", "skin"]],
  ["Mandelic Acid", ["sensitive", "skin"]],
  ["Urea", ["hydration", "skin"]],
  ["Tranexamic Acid", ["tone", "skin"]],
  ["Copper Peptides", ["anti-aging", "skin"]],
  ["Bakuchiol", ["anti-aging", "sensitive"]],
  ["Rice Water", ["hair", "glow"]]
];

const guideData = {
  en: {
    skincare: ["AM: cleanse → antioxidant → moisturizer → SPF.", "PM: cleanse → treatment → cream.", "Layer thinnest to thickest.", "Introduce one new active at a time."],
    haircare: ["Match products to curl pattern.", "Clarify scalp weekly if oily.", "Reduce heat; use heat protectant.", "Seal ends with oil or cream."],
    makeup: ["Prep skin before color.", "Cream textures for soft glam.", "Blend in thin layers.", "Set only where you need longevity."],
    nailcare: ["Oil cuticles nightly.", "File in one direction.", "Use a strengthening base.", "Breathing days between gel sets."],
    natural: ["Patch-test DIY masks.", "Honey + yogurt as occasional mask.", "Green tea as antioxidant support in care.", "Sleep and water first—then products."]
  },
  ku: {
    skincare: ["بەیانی: پاککەرەوە → دژە ئۆکسیدان → نەمکەرەوە → SPF.", "شەو: پاککەرەوە → چارەسەر → کریم.", "لە ناسکەوە بۆ قەڵەو لایەربەند بکە.", "تەنها یەک ئاکتیڤی نوێ لە هەر کاتدا زیاد بکە."],
    haircare: ["بەرهەمەکان بگونجێنە لەگەڵ شێوازی قژ.", "هەفتانە سەرپێست پاک بکەرەوە ئەگەر چەورە.", "گەرمی کەم بکەرەوە؛ پارێزەر بەکاربهێنە.", "کۆتایی قژ بە ڕۆن یان کریم بەستەوە."],
    makeup: ["پێست ئامادە بکە پێش ڕەنگ.", "بۆ نەرمی کریم بەکاربهێنە.", "لە لایەری ناسکدا blend بکە.", "تەنها لە شوێنی پێویست set بکە."],
    nailcare: ["هەر شەو نینۆک و cuticle ڕۆن بکە.", "بە یەک ئاراستە بڕدەرەوە.", "بنچینەی بەهێزکەر بەکاربهێنە.", "نێوان جێل ڕۆژی پشوو بدە بە نینۆک."],
    natural: ["ماسکی ماڵەوە پێشتر تاقی بکەرەوە.", "هەنگوین + ماست هەندێک جار وەک ماسک.", "چای سەوز وەک پشتیوان لە چاودێری.", "سەرەتا خەو و ئاو—دواتر بەرهەم."]
  }
};

const trends = {
  en: ["Barrier-first routines (fewer, smarter steps)", "Scalp serums & gentle exfoliation", "Skin tints + cream blush for soft dimension", "Lip oils and balmy textures", "Overnight masks with ceramides"],
  ku: ["روتینی سەرەتا باریێر (کەمتر، زیرەکتر)", "سیرۆمی سەرپێست و لابردنی نەرمی پێستی سەر", "سکین تینت + بلشی کریم بۆ قەبارەی نەرم", "ڕۆنی لێو و تێکستی بام", "ماسکی شەوانە لەگەڵ سەرامید"]
};

const tips = {
  en: [
    "If you add retinol, use SPF every morning—non-negotiable.",
    "Wait 1–2 minutes between watery layers and creams for even absorption.",
    "For oily skin, gel moisturizer often feels better than heavy creams in humid weather.",
    "Curly hair: ‘squish to condish’ helps define without harsh friction.",
    "Diluted tea tree on spots only—not across the whole face daily."
  ],
  ku: [
    "ئەگەر ریتینۆڵ زیاد دەکەیت، هەر بەیانی SPF ـی جێگیر بەکاربهێنە.",
    "نێوان لایەری ئاو و کریم ١–٢ خولەک چاوەڕوان بە بۆ هەڵگرتنی باشتر.",
    "بۆ پێستی چەور، نەمکەری جل زۆرجار لە هەوای نەم لە کریمی قەڵەو ئاسوترە.",
    "بۆ قژی کەلکەلە، مەینەت بە کۆندیشنەر یارمەتی دەدات بەبێ ههێزکردنی زۆر.",
    "چای ڕووەک تەنها لەسەر خاڵەکان—نە هەموو ڕوومەت لە هەر ڕۆژێکدا."
  ]
};

const routines = {
  en: [
    { t: "Morning glow", b: "Splash → vitamin C serum → gel cream → SPF 30+." },
    { t: "Night repair", b: "Double cleanse → retinol or acid (not both) → barrier cream." },
    { t: "Wash day hair", b: "Scalp cleanse → conditioner mid-lengths → leave-in → air dry or diffuse low." }
  ],
  ku: [
    { t: "درەوشانەوەی بەیانی", b: "شلەپشکین → سیرۆمی C → کریمی جل → SPF ٣٠+." },
    { t: "چاککردنەوەی شەو", b: "پاککردنەوەی دووجار → ریتینۆڵ یان ئەسید (نەک هەردووکیان) → کریمی باریێر." },
    { t: "ڕۆژی شۆری قژ", b: "پاککردنەوەی سەرپێست → کۆندیشنەر بۆ ناوەند → leave-in → وشککردنەوەی نەرم." }
  ]
};

const filters = ["all", "skin", "hair", "acne", "hydration", "glow", "anti-aging", "barrier", "nails"];

const state = {
  lang: localStorage.getItem("beauty_lang") || "en",
  tab: "explore",
  quoteI: 0,
  quizStep: 0,
  quizAnswers: {},
  ingredientSearch: "",
  ingredientFilter: "all",
  ingredients: [],
  tipIndex: 0,
  skin: { round: 0, score: 0, done: false },
  match: { round: 0, score: 0, done: false },
  routine: { order: [], expected: 0, score: 0, shuffled: [], done: false },
  tracker: JSON.parse(localStorage.getItem("beauty_tracker_v3") || '{"water":0,"sleep":7,"skincare":false,"selfcare":false,"streak":0,"last":""}')
};

function tr(k) {
  return TXT[state.lang][k] || k;
}

function tQuiz() {
  return QUIZ[state.lang];
}

function createIngredient(name, tags) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const kuName = name;
  return {
    id: slug,
    name: { en: name, ku: kuName },
    tags,
    what: {
      en: `${name} is a lab-tested cosmetic ingredient used in serums, creams, and treatments.`,
      ku: `${kuName} پێکهاتەیەکی تایبەت بە بەرهەمی جوانکارییە کە لە تاقیگە و بەرهەمە ڕاستەقینەکاندا بەکاردێت.`
    },
    does: {
      en: `It targets goals linked to: ${tags.join(", ")}.`,
      ku: `ئامانجەکانی ${tags.join("، ")} دەگرێتەوە و کاریگەری دیاریکراو دەدات.`
    },
    works: {
      en: "It works on the surface or upper layers of skin/hair, depending on formula and concentration.",
      ku: "لەسەر ڕووی پێست یان قژ کاردەکات، بە پێی فورموڵ و ڕێژە."
    },
    best: {
      en: `Especially helpful when your focus is ${tags[0]} care.`,
      ku: `کاتێک سەرنجت لەسەر ${tags[0]} ـە، سوودبەخشتر دەردەکەوێت.`
    },
    benefits: {
      en: "Can improve look and feel over weeks of consistent use—not overnight.",
      ku: "لە ماوەی چەند هەفتەی بەردەوامدا دەتوانێت جوانکاری و هەست باشتر بکات—نەک لە یەک شەو."
    },
    avoid: {
      en: "Avoid stacking with many strong actives at once; patch test new products.",
      ku: "لە یەک کاتدا چەند ئاکتیڤی توند مەبە؛ بەرهەمی نوێ پێشتر تاقی بکەرەوە."
    },
    use: {
      en: "Follow label timing (AM/PM), start low frequency, then build tolerance.",
      ku: "کاتی بەکارهێنان لەسەر لیبڵ بپارێزە؛ بە کەم دەست پێ بکە و هەنگاو بە هەنگاو زیاد بکە."
    },
    myth: {
      en: `Myth: "${name} fixes everything alone." Fact: it shines inside a full routine.`,
      ku: `میت: «${kuName} هەموو شت چاک دەکات». ڕاستی: لە ناو روتینێکی تەواودا باشتر کاردەکات.`
    },
    sources: {
      en: "Plant extracts, lab synthesis, or fermentation—depends on the product.",
      ku: "دەکرێت لە ڕووەک، دەرهێنانی تاقیگە، یان فەرمێنت بێت—بە پێی بەرهەم."
    },
    takeaway: {
      en: `Use ${name} with intention, patience, and SPF when needed.`,
      ku: `${kuName} بە مەبەست و ئارامی بەکاربهێنە؛ کاتێک پێویستە SPF ـیش لەگەڵدا.`
    },
    did: {
      en: "Pairing with a simple moisturizer often improves tolerance.",
      ku: "لەگەڵ نەمکەرەوەیەکی سادە زۆرجار ئاسانتر قبوڵ دەکرێت."
    }
  };
}

function buildIngredientLibrary() {
  const list = coreIngredients.map(([name, tags]) => createIngredient(name, tags));
  const carriers = ["Extract", "Complex", "Blend", "Oil", "Peptide", "Bioactive"];
  const bases = ["Rose", "Chamomile", "Licorice", "Green Tea", "Oat", "Rice", "Berry", "Lavender", "Calendula", "Honey", "Jojoba", "Coconut", "Almond", "Peony", "Mint", "Cucumber"];
  let n = 0;
  while (list.length < 220) {
    const name = `${bases[n % bases.length]} ${carriers[Math.floor(n / bases.length) % carriers.length]} ${n}`;
    list.push(createIngredient(name, ["skin", "glow"]));
    n += 1;
  }
  state.ingredients = list;
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("beauty_lang", lang);
  document.documentElement.lang = lang === "ku" ? "ckb" : "en";
  document.documentElement.dir = lang === "ku" ? "rtl" : "ltr";
  document.querySelectorAll("[data-t]").forEach((el) => {
    el.textContent = tr(el.dataset.t);
  });
  $("langToggle").textContent = lang === "en" ? "کوردی" : "English";
  $("ingredientSearch").placeholder = tr("ingredientSearch");
  renderQuote();
  renderQuiz();
  renderLearn();
  renderPlay();
  renderTrack();
  renderDiscover();
}

function switchTab(tab) {
  state.tab = tab;
  document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === tab));
  if (tab === "play") {
    resetPlayGames(false);
    renderSkinGame();
    renderMatchGame();
    renderRoutineGame();
  }
}

function renderQuote() {
  const q = NSM_QUOTES[state.quoteI % NSM_QUOTES.length];
  const line = state.lang === "en" ? q.en : q.ku;
  const el = $("quoteText");
  const btn = $("heroQuote");
  btn.classList.add("quote-fade");
  setTimeout(() => {
    el.textContent = `“${line}”`;
    btn.classList.remove("quote-fade");
  }, 160);
}

function confetti() {
  const c = $("confettiCanvas");
  const ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;
  const parts = Array.from({ length: 100 }, () => ({
    x: Math.random() * c.width,
    y: -20 - Math.random() * 100,
    vx: -2 + Math.random() * 4,
    vy: 2 + Math.random() * 4,
    s: 4 + Math.random() * 7
  }));
  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    parts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      ctx.fillStyle = ["#f5d0d8", "#ffd9c9", "#e4dcff", "#d4b5a0", "#fff5f2"][t % 5];
      ctx.fillRect(p.x, p.y, p.s, p.s);
    });
    t += 1;
    if (t < 85) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, c.width, c.height);
  }
  draw();
}

function buildAdvice(a) {
  const L = state.lang;
  const skin = a[0] ?? 0;
  const hair = a[1] ?? 0;
  const concern = a[2] ?? 0;
  const level = a[3] ?? 0;
  const life = a[4] ?? 0;
  const makeup = a[5] ?? 0;
  const Q = tQuiz();

  if (L === "en") {
    const routine =
      level === 0
        ? "AM: gentle cleanser → moisturizer → SPF 30+. PM: cleanse → one treatment (vitamin C OR acid, not both at first) → cream."
        : level === 1
          ? "AM: cleanse → antioxidant serum → moisturizer → SPF. PM: double cleanse → treatment serum → barrier cream."
          : "AM: cleanse → vitamin C → targeted serum (as tolerated) → moisturizer → SPF. PM: cleanse → retinol OR acid nights (alternate) → rich repair.";

    const skinLine =
      skin === 0
        ? "Oily skin: lightweight gel moisturizer, niacinamide or salicylic in PM, avoid heavy occlusives on the full face."
        : skin === 1
          ? "Dry skin: cream cleanser option, hyaluronic + ceramides, skip foaming cleansers that squeak."
          : skin === 2
            ? "Combination: zone your routine—lighter gel on T-zone, richer cream on cheeks if needed."
            : "Sensitive: fragrance-free, fewer actives, patch test 48h, introduce one change at a time.";

    const hairLine =
      hair === 0
        ? "Straight hair: avoid heavy silicones at the root; focus conditioner mid-lengths to ends."
        : hair === 1
          ? "Wavy hair: leave-in conditioner + scrunch; microfiber towel reduces frizz."
          : hair === 2
            ? "Curly hair: ‘squish to condish’, wide-tooth comb wet only, deep condition weekly."
            : "Coily hair: rich creams, protective styles when needed, regular scalp care.";

    const concernLine =
      concern === 0
        ? "Congestion: salicylic 2–3×/week, non-comedogenic moisturizer, avoid thick oils on breakout zones."
        : concern === 1
          ? "Dullness: vitamin C AM, gentle exfoliation 1–2×/week, SPF daily to prevent pigmentation darkening."
          : concern === 2
            ? "Dehydration: hyaluronic on damp skin, then cream; humidify air if needed."
            : "Hair breakage: protein-moisture balance, less heat, silk pillowcase, trim split ends.";

    const makeupLine =
      makeup === 0
        ? "Makeup: skin tint, cream blush, brow gel—keep texture cohesive and skin-visible."
        : makeup === 1
          ? "Soft glam: satin skin, defined lashes, blurred lip—one feature emphasized."
          : makeup === 2
            ? "Full glam: build in thin layers; set T-zone; strong eye OR lip, not both fighting."
            : "Minimal days: tinted SPF + concealer only where needed.";

    const natural =
      life === 2
        ? "Stress care: 5-minute wind-down, screen down 60 min before bed, caffeine cut after 2pm if sleep suffers."
        : life === 1
          ? "Hydration: front-load water before noon; keep a bottle visible at your desk."
          : life === 0
            ? "Sleep: aim for a stable sleep window; skin repair peaks during deep sleep."
            : "Keep this balance: one new habit per month so routines stick.";

    return { routine, blocks: [skinLine, hairLine, concernLine, makeupLine, natural], quote: NSM_QUOTES[(state.quoteI + 3) % NSM_QUOTES.length].en };
  }

  const routine =
    level === 0
      ? "بەیانی: پاککەرەوەی نەرم → نەمکەرەوە → SPF ٣٠+. شەو: پاککردنەوە → یەک چارەسەر (C یان ئەسید، نەک هەردووکیان لە سەرەتادا) → کریم."
      : level === 1
        ? "بەیانی: پاککردنەوە → سیرۆمی دژە ئۆکسیدان → نەمکەرەوە → SPF. شەو: پاککردنەوەی دووجار → سیرۆمی چارەسەر → کریمی باریێر."
        : "بەیانی: پاککردنەوە → ڤیتامینی C → سیرۆمی تایبەت (ئەوەی قبوڵ دەکەیت) → نەمکەرەوە → SPF. شەو: پاککردنەوە → ریتینۆڵ یان ئەسید (دووبارە نەکەیتەوە لە هەمان شەو) → چاککردنەوەی قەڵەو.";

  const skinLine =
    skin === 0
      ? "پێستی چەور: نەمکەری سووک، نایەسیناماید یان سالیسیلیک بۆ شەو، لە ڕوومەتدا ڕۆنی قەڵەو مەبە."
      : skin === 1
        ? "پێستی وشک: پاککەرەوەی کریمی هەڵبژێرە، هایالۆڕۆنیک + سەرامید، پاککەرەوەی زۆر بەهێز کە دەتووشێنێت دووربکەوە."
        : skin === 2
          ? "تێکەڵ: ڕەنگە لەسەر T سووکتر و لەسەر ڕوومەت کریمی زیاتر پێویست بێت."
          : "هەستیار: بێ بۆن، کەمتر ئاکتیڤ، تاقیکردنەوەی ٤٨ کاتژمێر، هەر گۆڕانکارییەک بە جیا.";

  const hairLine =
    hair === 0
      ? "قژی ڕاست: سیلیکۆنی قەڵەو لە سەرپێست دووربکەوە؛ کۆندیشنەر لە ناوەوە بۆ کۆتایی."
      : hair === 1
        ? "قژی شەپۆڵاو: leave-in + سکوێنچ؛ لەگەڵ مایکرۆفایبەر وشک بکەرەوە بۆ کەمکردنەوەی frizz."
        : hair === 2
          ? "قژی کەلکەلە: تەنها کاتێک ێشتیت دەمێنێتەوە، کۆندیشنەری قووڵ هەفتانە."
          : "قژی زۆر کەلکەلە: کریمی تەواو، چاودێری سەرپێست، جۆری پاراستن کاتێک پێویستە.";

  const concernLine =
    concern === 0
      ? "داخراو: سالیسیلیک ٢–٣ جار/هەفتە، نەمکەرەوەی non-comedogenic، ڕۆنی قەڵەو لەسەر شوێنی ئاکنە مەبە."
      : concern === 1
        ? "بێ درەوشانەوە: ڤیتامینی C بەیانی، لابردنی نەرم ١–٢ جار/هەفتە، SPF هەموو ڕۆژێک."
        : concern === 2
          ? "وشکی: هایالۆڕۆنیک لەسەر پێستی نەم، پاشان کریم؛ ئەگەر پێویستە هەوای نەم بکە."
          : "شکانی قژ: هاوسەنگی پرۆتین و ئاو، کەمتر گەرمی، بالیسی سێلک، کورتکردنەوەی کۆتایی داخراو.";

  const makeupLine =
    makeup === 0
      ? "میکاپ: سکین تینت، بلشی کریم، بڕۆو—تێکستەکان بگونجێنە و پێست دەربکەوێت."
      : makeup === 1
        ? "سافت گلام: پێستی ساتن، بڵندکردنەوەی مژ، لێوی نەرم—یەک بەشی ڕوومەت توندتر."
        : makeup === 2
          ? "گلامی تەواو: لە لایەری ناسکدا دروست بکە؛ T-zone set بکە؛ چاو یان لێو—نەک هەردووکیان لە توندی یەکسان."
          : "ڕۆژی کەم: تەنها tinted SPF + داژمەری پێویست.";

  const natural =
    life === 2
      ? "سترێس: ٥ خولەک بێ مۆبایل پێش خەو، کەمکردنەوەی ئیکرانی پێش خەو، کەمکردنەوەی قەهوە دوای نیوەڕۆ ئەگەر خەوت خراپە."
      : life === 1
        ? "ئاو: زیاتر لە نیوەڕۆ پێشتر بخۆەرەوە؛ بوتڵ لەسەر مێز ڕوون بکەرەوە."
        : life === 0
          ? "خەو: کاتژمێری جێگیر بۆ خەو؛ چاککردنەوەی پێست لە خەوی قووڵدا بەهێزترە."
          : "ئەم هاوسەنگییە بپارێزە؛ هەر مانگێک یەک نەریتی نوێ تەنها.";

  return { routine, blocks: [skinLine, hairLine, concernLine, makeupLine, natural], quote: NSM_QUOTES[(state.quoteI + 3) % NSM_QUOTES.length].ku };
}

function renderQuiz() {
  const Q = tQuiz();
  const n = Q.length;
  $("quizProgress").style.width = `${(state.quizStep / n) * 100}%`;

  if (state.quizStep >= n) {
    const adv = buildAdvice(state.quizAnswers);
    const labels = state.lang === "en" ? ["Skincare", "Hair", "Concern focus", "Makeup", "Lifestyle"] : ["سکینکێر", "قژ", "کێشە", "میکاپ", "ژیان"];
    const listItems = adv.blocks.map((b, i) => `<li><strong>${labels[i]}:</strong> ${b}</li>`).join("");
    $("quizBox").innerHTML = `<button type="button" class="btn" id="restartQuiz">${tr("startOver")}</button>`;
    $("quizResult").innerHTML = `
      <div class="keyline"><strong>${state.lang === "en" ? "Your routine blueprint" : "پلانی روتین"}</strong><p>${adv.routine}</p></div>
      <ul style="margin:12px 0 0;padding-inline-start:1.1rem;">${listItems}</ul>
      <p class="keyline" style="margin-top:14px"><em>“${adv.quote}” — NSM</em></p>
    `;
    $("restartQuiz").onclick = () => {
      state.quizStep = 0;
      state.quizAnswers = {};
      renderQuiz();
    };
    confetti();
    return;
  }

  const [title, opts] = Q[state.quizStep];
  const sel = state.quizAnswers[state.quizStep];
  $("quizResult").innerHTML = `<p class="muted">${tr("quizHint")}</p>`;
  $("quizBox").innerHTML = `
    <div class="quiz-step">
      <p class="step-label"><strong>${state.quizStep + 1} / ${n}</strong> — ${title}</p>
      <div class="chip-row">${opts.map((o, i) => `<button type="button" class="chip ${sel === i ? "active" : ""}" data-q="${i}">${o}</button>`).join("")}</div>
      <div class="row" style="margin-top:16px">
        <button type="button" id="quizBack" class="btn ghost">${tr("back")}</button>
        <button type="button" id="quizNext" class="btn">${tr("next")}</button>
      </div>
    </div>
  `;
  document.querySelectorAll("#quizBox [data-q]").forEach((b) => {
    b.onclick = () => {
      state.quizAnswers[state.quizStep] = Number(b.dataset.q);
      renderQuiz();
    };
  });
  $("quizBack").onclick = () => {
    state.quizStep = Math.max(0, state.quizStep - 1);
    renderQuiz();
  };
  $("quizNext").onclick = () => {
    if (state.quizAnswers[state.quizStep] === undefined) return;
    state.quizStep += 1;
    renderQuiz();
  };
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function renderLearn() {
  const filtered = state.ingredients.filter((i) => {
    const name = i.name.en.toLowerCase();
    const okS = name.includes(state.ingredientSearch.toLowerCase());
    const okF = state.ingredientFilter === "all" || i.tags.includes(state.ingredientFilter);
    return okS && okF;
  });
  $("ingredientCount").textContent = `${filtered.length} ${tr("countLabel")}`;
  $("ingredientFilters").innerHTML = filters
    .map((f) => {
      const lab = f === "all" ? tr("filterAll") : cap(f);
      return `<button type="button" class="chip ${state.ingredientFilter === f ? "active" : ""}" data-fil="${f}">${lab}</button>`;
    })
    .join("");
  document.querySelectorAll("[data-fil]").forEach((b) => {
    b.onclick = () => {
      state.ingredientFilter = b.dataset.fil;
      renderLearn();
    };
  });
  $("ingredientGrid").innerHTML = filtered
    .slice(0, 60)
    .map(
      (i) => `
    <article class="ingredient-card" data-ing="${i.id}">
      <h4>${i.name[state.lang]}</h4>
      <p class="mini">${i.what[state.lang]}</p>
      <span class="ingredient-tag">${i.tags[0]}</span>
    </article>`
    )
    .join("");
  document.querySelectorAll("[data-ing]").forEach((card) => {
    card.onclick = () => openIngredient(card.dataset.ing);
  });

  const keys = ["skincare", "haircare", "makeup", "nailcare", "natural"];
  $("learnGuides").innerHTML = keys
    .map(
      (k) => `
    <details>
      <summary>${tr(k)}</summary>
      <ul>${guideData[state.lang][k].map((x) => `<li>${x}</li>`).join("")}</ul>
    </details>`
    )
    .join("");
}

function openIngredient(id) {
  const ing = state.ingredients.find((x) => x.id === id);
  if (!ing) return;
  $("modalTitle").textContent = ing.name[state.lang];
  const S = tr("sections");
  const mythParts = String(ing.myth[state.lang]).split("Fact:");
  const mythText = mythParts[0].replace(/^Myth:\s*/i, "").trim();
  const factText = mythParts[1] ? mythParts[1].trim() : "";
  $("modalBody").innerHTML = `
    <section><h4>${S[0]}</h4><p>${ing.what[state.lang]}</p></section>
    <section><h4>${S[1]}</h4><p>${ing.does[state.lang]}</p></section>
    <section><h4>${S[2]}</h4><p>${ing.works[state.lang]}</p></section>
    <section><h4>${S[3]}</h4><p>${ing.best[state.lang]}</p></section>
    <section><h4>${S[4]}</h4><p>${ing.benefits[state.lang]}</p></section>
    <section><h4>${S[5]}</h4><p>${ing.avoid[state.lang]}</p></section>
    <section><h4>${S[6]}</h4><p>${ing.use[state.lang]}</p></section>
    <section><h4>${S[7]}</h4><p><strong>Myth:</strong> ${mythText}</p><p><strong>${state.lang === "en" ? "Fact" : "ڕاستی"}:</strong> ${factText || ing.myth[state.lang]}</p></section>
    <section><h4>${S[8]}</h4><p>${ing.sources[state.lang]}</p></section>
    <section><h4>${S[9]}</h4><p>${ing.takeaway[state.lang]}</p></section>
    <div class="highlight"><strong>${tr("didYouKnow")}</strong> — ${ing.did[state.lang]}</div>
  `;
  $("ingredientModal").classList.remove("hidden");
}

function resetPlayGames(full) {
  state.skin = { round: 0, score: 0, done: false };
  state.match = { round: 0, score: 0, done: false };
  state.routine = { order: [], expected: 0, score: 0, shuffled: [], done: false };
  if (full) {
    renderSkinGame();
    renderMatchGame();
    renderRoutineGame();
  }
}

function renderSkinGame() {
  const root = $("skinGameRoot");
  const lang = state.lang;
  if (state.skin.done) {
    root.innerHTML = `<p class="game-meta">${tr("score")}: ${state.skin.score} / ${SKIN_ROUNDS.length}</p><button type="button" class="btn soft" id="skinRestart">${tr("playRestart")}</button>`;
    $("skinRestart").onclick = () => {
      state.skin = { round: 0, score: 0, done: false };
      renderSkinGame();
    };
    return;
  }
  const r = SKIN_ROUNDS[state.skin.round];
  const text = lang === "en" ? r.en : r.ku;
  const types = ["oily", "dry", "combo", "sensitive"];
  const labels = lang === "en" ? { oily: "Oily", dry: "Dry", combo: "Combination", sensitive: "Sensitive" } : { oily: "چەور", dry: "وشک", combo: "تێکەڵ", sensitive: "هەستیار" };
  root.innerHTML = `
    <p class="muted small">${tr("skinPrompt")}</p>
    <p class="symptom">${text}</p>
    <div class="chip-row">${types.map((t) => `<button type="button" class="chip" data-skin="${t}">${labels[t]}</button>`).join("")}</div>
    <div id="skinFeedback"></div>
    <p class="game-meta">${tr("round")} ${state.skin.round + 1}/${SKIN_ROUNDS.length} · ${tr("score")}: ${state.skin.score}</p>
  `;
  root.querySelectorAll("[data-skin]").forEach((btn) => {
    btn.onclick = () => {
      const pick = btn.dataset.skin;
      const ok = pick === r.a;
      const fb = $("skinFeedback");
      fb.className = "feedback " + (ok ? "ok" : "bad");
      fb.textContent = ok ? tr("correct") : tr("wrong");
      if (ok) state.skin.score += 1;
      state.skin.round += 1;
      if (state.skin.round >= SKIN_ROUNDS.length) state.skin.done = true;
      setTimeout(() => renderSkinGame(), ok ? 450 : 650);
    };
  });
}

function renderMatchGame() {
  const root = $("matchGameRoot");
  const lang = state.lang;
  if (state.match.done) {
    root.innerHTML = `<p class="game-meta">${tr("score")}: ${state.match.score} / ${MATCH_ROUNDS.length}</p><button type="button" class="btn soft" id="matchRestart">${tr("playRestart")}</button>`;
    $("matchRestart").onclick = () => {
      state.match = { round: 0, score: 0, done: false };
      renderMatchGame();
    };
    return;
  }
  const r = MATCH_ROUNDS[state.match.round];
  const keys = Object.keys(BENEFIT_OPTS.en);
  root.innerHTML = `
    <p class="muted small">${tr("matchPrompt")}</p>
    <p class="symptom"><strong>${r.ing}</strong></p>
    <div class="chip-row">${keys.map((k) => `<button type="button" class="chip" data-ben="${k}">${BENEFIT_OPTS[lang][k]}</button>`).join("")}</div>
    <div id="matchFeedback"></div>
    <p class="game-meta">${tr("round")} ${state.match.round + 1}/${MATCH_ROUNDS.length} · ${tr("score")}: ${state.match.score}</p>
  `;
  root.querySelectorAll("[data-ben]").forEach((btn) => {
    btn.onclick = () => {
      const pick = btn.dataset.ben;
      const ok = pick === MATCH_ANSWER[r.ing];
      const fb = $("matchFeedback");
      fb.className = "feedback " + (ok ? "ok" : "bad");
      fb.textContent = ok ? tr("correct") : tr("wrong");
      if (ok) state.match.score += 1;
      state.match.round += 1;
      if (state.match.round >= MATCH_ROUNDS.length) state.match.done = true;
      setTimeout(() => renderMatchGame(), ok ? 450 : 650);
    };
  });
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderRoutineGame() {
  const root = $("routineGameRoot");
  const lang = state.lang;
  if (state.routine.done) {
    root.innerHTML = `<p class="game-meta">${tr("score")}: ${state.routine.score} ${state.lang === "en" ? "perfect rounds" : "خولی تەواو"}</p><button type="button" class="btn soft" id="routineRestart">${tr("playRestart")}</button>`;
    $("routineRestart").onclick = () => {
      state.routine = { order: [], expected: 0, score: 0, shuffled: [], done: false };
      renderRoutineGame();
    };
    return;
  }
  if (!state.routine.shuffled.length) {
    state.routine.shuffled = shuffle([...ROUTINE_ORDER]);
    state.routine.order = [];
    state.routine.expected = 0;
  }
  const L = ROUTINE_LABEL[lang];
  const slots = ROUTINE_ORDER.map((k, i) => {
    const filled = state.routine.order[i];
    return `<div class="routine-slot ${filled ? "filled" : ""}">${filled ? L[filled] : "—"}</div>`;
  }).join("");

  root.innerHTML = `
    <p class="muted small">${tr("routineShuffle")}</p>
    <div class="routine-steps">${slots}</div>
    <div class="chip-row">${state.routine.shuffled.map((k) => `<button type="button" class="chip" data-step="${k}">${L[k]}</button>`).join("")}</div>
    <div id="routineFeedback"></div>
    <p class="game-meta">${tr("score")}: ${state.routine.score}</p>
  `;
  root.querySelectorAll("[data-step]").forEach((btn) => {
    btn.onclick = () => {
      const step = btn.dataset.step;
      const want = ROUTINE_ORDER[state.routine.expected];
      const fb = $("routineFeedback");
      if (step !== want) {
        fb.className = "feedback bad";
        fb.textContent = tr("routineReset");
        state.routine.order = [];
        state.routine.expected = 0;
        renderRoutineGame();
        return;
      }
      state.routine.order.push(step);
      state.routine.expected += 1;
      if (state.routine.expected >= ROUTINE_ORDER.length) {
        fb.className = "feedback ok";
        fb.textContent = tr("routineWin");
        state.routine.score += 1;
        state.routine.shuffled = [];
        state.routine.order = [];
        state.routine.expected = 0;
        setTimeout(() => renderRoutineGame(), 700);
      } else {
        renderRoutineGame();
      }
    };
  });
}

function renderPlay() {
  if (state.tab !== "play") return;
  renderSkinGame();
  renderMatchGame();
  renderRoutineGame();
}

function saveTracker() {
  localStorage.setItem("beauty_tracker_v3", JSON.stringify(state.tracker));
}

function renderTrack() {
  const t = state.tracker;
  const L = state.lang === "en";
  $("habitList").innerHTML = `
    <div class="habit-row">
      <label><input type="checkbox" id="habitSkin" ${t.skincare ? "checked" : ""}/> ${tr("trackSkincare")}</label>
    </div>
    <div class="habit-row">
      <span>${tr("trackWater")}</span>
      <div class="water-controls">
        <button type="button" id="wMinus">−</button><span id="wVal">${t.water}</span><button type="button" id="wPlus">+</button>
      </div>
    </div>
    <div class="habit-row">
      <label for="sleepRange">${tr("trackSleep")}</label>
      <input type="range" id="sleepRange" min="0" max="12" step="0.5" value="${t.sleep}" />
      <span id="sleepVal">${t.sleep}h</span>
    </div>
    <div class="habit-row">
      <label><input type="checkbox" id="habitSelf" ${t.selfcare ? "checked" : ""}/> ${tr("trackSelf")}</label>
    </div>
  `;
  const waterPct = Math.min(100, (t.water / 8) * 100);
  const sleepPct = Math.min(100, (t.sleep / 8) * 100);
  const checkPct = (t.skincare ? 25 : 0) + (t.selfcare ? 25 : 0);
  const pct = Math.round((waterPct * 0.25 + sleepPct * 0.25 + checkPct * 0.5) / 1);
  $("habitProgress").style.width = `${pct}%`;
  $("trackMeta").textContent = L
    ? `${tr("progressLabel")}: ${pct}% · ${tr("streak")}: ${t.streak}`
    : `${tr("progressLabel")}: ${pct}% · ${tr("streak")}: ${t.streak}`;

  $("habitSkin").onchange = (e) => {
    t.skincare = e.target.checked;
    saveTracker();
    renderTrack();
  };
  $("habitSelf").onchange = (e) => {
    t.selfcare = e.target.checked;
    saveTracker();
    renderTrack();
  };
  $("wMinus").onclick = () => {
    t.water = Math.max(0, t.water - 1);
    saveTracker();
    renderTrack();
  };
  $("wPlus").onclick = () => {
    t.water = Math.min(16, t.water + 1);
    saveTracker();
    renderTrack();
  };
  $("sleepRange").oninput = (e) => {
    t.sleep = parseFloat(e.target.value);
    $("sleepVal").textContent = `${t.sleep}h`;
    saveTracker();
    $("habitProgress").style.width = `${pct}%`;
  };
}

function renderDiscover() {
  const T = trends[state.lang];
  $("trendCards").innerHTML = T.slice(0, 4).map((x) => `<div class="trend-card"><h4>${x}</h4></div>`).join("");
  $("dailyTip").textContent = tips[state.lang][state.tipIndex % tips[state.lang].length];
  const R = routines[state.lang];
  $("routineIdeas").innerHTML = R.map((r) => `<div class="routine-card"><h4>${r.t}</h4><p class="mini">${r.b}</p></div>`).join("");
}

window.addEventListener("DOMContentLoaded", () => {
  buildIngredientLibrary();

  document.querySelectorAll(".tab").forEach((b) => {
    b.onclick = () => switchTab(b.dataset.tab);
  });
  document.querySelectorAll("[data-jump]").forEach((b) => {
    b.onclick = () => switchTab(b.dataset.jump);
  });

  $("langToggle").onclick = () => setLanguage(state.lang === "en" ? "ku" : "en");
  $("heroQuote").onclick = () => {
    state.quoteI += 1;
    renderQuote();
  };
  $("ingredientSearch").oninput = (e) => {
    state.ingredientSearch = e.target.value;
    renderLearn();
  };
  $("closeModal").onclick = () => $("ingredientModal").classList.add("hidden");
  $("ingredientModal").onclick = (e) => {
    if (e.target.id === "ingredientModal") $("ingredientModal").classList.add("hidden");
  };
  $("nextTip").onclick = () => {
    state.tipIndex += 1;
    renderDiscover();
  };

  $("saveDay").onclick = () => {
    const today = new Date().toDateString();
    if (state.tracker.last !== today) {
      const y = new Date();
      const last = state.tracker.last ? new Date(state.tracker.last) : null;
      if (last) {
        const diff = (y - last) / 864e5;
        state.tracker.streak = diff >= 1 && diff < 2 ? state.tracker.streak + 1 : 1;
      } else {
        state.tracker.streak = 1;
      }
      state.tracker.last = today;
    }
    saveTracker();
    renderTrack();
  };
  $("resetTrack").onclick = () => {
    state.tracker = { water: 0, sleep: 7, skincare: false, selfcare: false, streak: 0, last: "" };
    saveTracker();
    renderTrack();
  };

  setLanguage(state.lang);
  $("quoteText").textContent = "";
  renderQuote();
  switchTab("explore");
});
