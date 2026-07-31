/** First-time mothers only — newborn through first year. No toddler/teen content. */

export const QUIZ = [
  {
    id: "stage",
    en: "Where are you right now?",
    ku: "ئێستا لە کوێی ئەم قۆناغەدایت؟",
    options: [
      { id: "pregnant", en: "Pregnant — first baby", ku: "دووگیانم — یەکەم کۆرپەلەم" },
      { id: "0-2w", en: "Newborn · 0–2 weeks", ku: "تازەلەدایکبوو · ٠–٢ هەفتە" },
      { id: "2-8w", en: "2–8 weeks", ku: "٢–٨ هەفتە" },
      { id: "2-6m", en: "2–6 months", ku: "٢–٦ مانگ" },
      { id: "6-12m", en: "6–12 months", ku: "٦–١٢ مانگ" },
    ],
  },
  {
    id: "birth",
    en: "How did birth go for you?",
    ku: "لەدایکبوون چۆن بوو بۆت؟",
    options: [
      { id: "vaginal", en: "Vaginal birth", ku: "لەدایکبوونی ئاسایی" },
      { id: "csection", en: "C-section", ku: "ئەمەلی سزاری" },
      { id: "waiting", en: "Still waiting", ku: "هێشتا چاوەڕێم" },
      { id: "prefer", en: "Prefer not to say", ku: "حەز ناکەم بڵێم" },
    ],
  },
  {
    id: "feeding",
    en: "How do you plan to feed?",
    ku: "چۆن بیر لە شیرپێدان دەکەیتەوە؟",
    options: [
      { id: "breast", en: "Breastfeeding", ku: "شیرپێدانی سروشتی" },
      { id: "combo", en: "Combo", ku: "هەردووک پێکەوە" },
      { id: "formula", en: "Formula", ku: "شیرخۆراکی دەستکرد" },
      { id: "figuring", en: "Still figuring it out", ku: "هێشتا فێری دەبم" },
    ],
  },
  {
    id: "support",
    en: "Who is close by to help?",
    ku: "کێ لە نزیکەوە یارمەتیت دەدات؟",
    options: [
      { id: "partner", en: "Partner", ku: "هاوسەر / هاوڕێ" },
      { id: "family", en: "Family nearby", ku: "خێزان لە نزیک" },
      { id: "alone", en: "Mostly on my own", ku: "زۆربەی کات بە تەنها" },
      { id: "mixed", en: "A mix", ku: "تێکەڵ" },
    ],
  },
  {
    id: "worry",
    en: "What weighs on you most?",
    ku: "چی زیاتر سەرت دەشێوێنێت؟",
    options: [
      { id: "feeding", en: "Feeding", ku: "شیرپێدان" },
      { id: "sleep", en: "Sleep", ku: "خەو" },
      { id: "recovery", en: "My recovery", ku: "چاکبوونەوەی خۆم" },
      { id: "normal", en: "Is this normal?", ku: "ئایا ئەمە ئاساییە؟" },
      { id: "gear", en: "What gear to learn about", ku: "چی فێر بم دەربارەی پێداویستی" },
    ],
  },
];

export const AGE_FROM_STAGE = {
  pregnant: "pregnant",
  "0-2w": "0-2w",
  "2-8w": "2-8w",
  "2-6m": "2-6m",
  "6-12m": "6-12m",
};

export function ageLabel(age, lang) {
  const map = {
    pregnant: { en: "Expecting your first", ku: "چاوەڕێی یەکەم کۆرپەلەت" },
    "0-2w": { en: "Newborn days", ku: "ڕۆژەکانی تازەلەدایکبوون" },
    "2-8w": { en: "Early weeks", ku: "هەفتە سەرەتاییەکان" },
    "2-6m": { en: "Settling in", ku: "خۆڕاهێنان" },
    "6-12m": { en: "First-year stretch", ku: "قۆناغی ساڵی یەکەم" },
  };
  const row = map[age] || map["0-2w"];
  return lang === "ku" ? row.ku : row.en;
}

export const MOODS = [
  { id: "calm", emoji: "😌", en: "Calm", ku: "ئارام" },
  { id: "okay", emoji: "🙂", en: "Okay", ku: "باش" },
  { id: "tired", emoji: "😴", en: "Tired", ku: "ماندوو" },
  { id: "heavy", emoji: "🥺", en: "Heavy", ku: "قورس" },
  { id: "help", emoji: "🆘", en: "Need help", ku: "پێویستم بە یارمەتییە" },
];

export const SLEEP_OPTS = [
  { id: "good", emoji: "😴", en: "Decent stretches", ku: "ماوەی باشی خەو" },
  { id: "mixed", emoji: "🌓", en: "Mixed night", ku: "شەوێکی تێکەڵ" },
  { id: "rough", emoji: "😮‍💨", en: "Rough night", ku: "شەوێکی سەخت" },
];

export const PAIN_LEVELS = [
  { id: 0, en: "None", ku: "هیچ" },
  { id: 1, en: "Mild", ku: "سووک" },
  { id: 2, en: "Medium", ku: "مامناوەند" },
  { id: 3, en: "Strong", ku: "بەهێز" },
  { id: 4, en: "Urgent care", ku: "پێویستی بە چاودێری خێرا" },
];

export const RECOVERY_GOALS = [
  {
    id: "rest",
    en: "Rest when baby rests",
    ku: "کاتێک کۆرپەلە دەنوێت تۆش پشوو بدە",
  },
  {
    id: "water",
    en: "Drink a full glass of water",
    ku: "گڵاسێکی تەواوی ئاو بخۆرەوە",
  },
  {
    id: "walk",
    en: "Gentle indoor walk (if cleared)",
    ku: "ڕۆیشتنی نەرمی ناو ماڵ (ئەگەر پزیشک ڕێگەی دا)",
  },
  {
    id: "breath",
    en: "Three slow breaths",
    ku: "سێ هەناسەی هێواش",
  },
];

export const RECOVERY_WEEKS = [
  {
    w: 1,
    en: "Surreal & raw",
    ku: "سەرسوڕهێنەر و هەستیار",
    tip: {
      en: "Bleeding, swelling, and tears are common. Rest is medicine.",
      ku: "خوێنڕێژی، ئاوسان و فرمێسک ئاساییە. پشوو دەرمانە.",
    },
  },
  {
    w: 2,
    en: "Still finding rhythm",
    ku: "هێشتا ڕیتم دەدۆزیتەوە",
    tip: {
      en: "Cluster feeds and night wakings can peak. You’re not failing.",
      ku: "شیرپێدانی چڕ و بەخەبەرهاتنی شەو زۆر دەبن. تۆ شکستت نەهێناوە.",
    },
  },
  {
    w: 3,
    en: "Body still soft",
    ku: "جەستە هێشتا نەرمە",
    tip: {
      en: "Scar tenderness or afterpains may linger. Soft movement only.",
      ku: "ئازاری شوێنی برین یان گرژبوونی دوای لەدایکبوون دەمێنێتەوە. تەنها جوڵەی نەرم.",
    },
  },
  {
    w: 4,
    en: "Small windows open",
    ku: "پەنجەرەی بچووک دەکرێتەوە",
    tip: {
      en: "Energy may flicker. Protect sleep like gold.",
      ku: "وزە دەگەڕێتەوە و دەڕوات. خەو وەک زێڕ بپارێزە.",
    },
  },
  {
    w: 6,
    en: "Check-in season",
    ku: "کاتی پشکنین",
    tip: {
      en: "Many first visits happen now. Bring your real questions.",
      ku: "زۆر سەردانی یەکەم ئێستا دەبێت. پرسیارە ڕاستەقینەکانت بهێنە.",
    },
  },
  {
    w: 8,
    en: "Slow rebuild",
    ku: "دووبارە دروستبوونەوەی هێواش",
    tip: {
      en: "Core and pelvic floor need patience — not punishment.",
      ku: "ماسکەکانی ناوەڕاست و قاعیدەی حەوز پێویستیان بە ئارامی هەیە — نەک سزا.",
    },
  },
];

export const BABY_WEEKS = {
  pregnant: {
    title: { en: "Preparing to meet them", ku: "ئامادەکاری بۆ بینینیان" },
    notice: [
      { en: "Nesting urges", ku: "هەستی ئامادەکردنی شوێن" },
      { en: "Sleep changes", ku: "گۆڕان لە خەودا" },
      { en: "Big feelings", ku: "هەستی گەورە" },
    ],
    expected: [
      { en: "Practice skin-to-skin plans", ku: "پلانی پێست-بۆ-پێست ڕاهێنان بکە" },
      { en: "Pack soft, button-front clothes", ku: "جلێکی نەرمی دوگمەدار ئامادە بکە" },
    ],
  },
  "0-2w": {
    title: { en: "Brand-new world", ku: "جیهانێکی تازە" },
    notice: [
      { en: "Tiny wakeful windows", ku: "کاتی بەئاگابوونی کورت" },
      { en: "Lots of feeding", ku: "شیرپێدانی زۆر" },
      { en: "Day/night confusion", ku: "تێکچوونی ڕۆژ و شەو" },
    ],
    expected: [
      { en: "Weight dip then regain", ku: "کەمبوونەوەی کێش پاشان گەڕانەوە" },
      { en: "Umbilical stump drying", ku: "وشکبوونەوەی شوێنی ناووک" },
    ],
  },
  "2-8w": {
    title: { en: "Learning each other", ku: "یەکتر فێردەبن" },
    notice: [
      { en: "Longer stares", ku: "سەیرکردنی درێژتر" },
      { en: "Growth spurts", ku: "قۆناغی گەشەی خێرا" },
      { en: "First social smiles coming", ku: "یەکەم پێکەنینە کۆمەڵایەتیەکان نزیکن" },
    ],
    expected: [
      { en: "Slightly longer wake times", ku: "کاتی بەئاگابوونی کەمێک درێژتر" },
      { en: "Stronger latch practice", ku: "ڕاهێنانی گرتنی باشتری مەمک" },
    ],
  },
  "2-6m": {
    title: { en: "Personality peeks out", ku: "کەسایەتی دەردەکەوێت" },
    notice: [
      { en: "Rolling attempts", ku: "هەوڵی هەڵگەڕان" },
      { en: "Hands to mouth", ku: "دەست بۆ دەم" },
      { en: "Giggles & coos", ku: "پێکەنین و دەنگی نەرم" },
    ],
    expected: [
      { en: "More predictable feeds for some", ku: "بۆ هەندێک شیرپێدان ڕێکخراوتر دەبێت" },
      { en: "Sleep still uneven — normal", ku: "خەو هێشتا ناڕێکە — ئاساییە" },
    ],
  },
  "6-12m": {
    title: { en: "Curious explorer", ku: "گەڕۆکێکی سەرسام" },
    notice: [
      { en: "Sitting & reaching", ku: "دانیشتن و دەستدرێژکردن" },
      { en: "Solids curiosity", ku: "سەرسامبوون بە خۆراکی ڕەق" },
      { en: "Separation feelings", ku: "هەستی جیاکردنەوە" },
    ],
    expected: [
      { en: "More movement — watch floors", ku: "جوڵەی زیاتر — چاودێری زەوی بکە" },
      { en: "Sleep regressions can appear", ku: "گەڕانەوەی خەو دەردەکەوێت" },
    ],
  },
};

export const BABY_MILESTONES = [
  { id: "eye", from: ["0-2w", "2-8w", "2-6m", "6-12m"], en: "Locks eyes with you", ku: "چاو لەگەڵ تۆ دەبەستێت" },
  { id: "smile", from: ["2-8w", "2-6m", "6-12m"], en: "Social smile", ku: "پێکەنینی کۆمەڵایەتی" },
  { id: "head", from: ["2-8w", "2-6m", "6-12m"], en: "Holds head briefly", ku: "سەر بۆ ماوەیەکی کورت هەڵدەگرێت" },
  { id: "roll", from: ["2-6m", "6-12m"], en: "Rolls", ku: "هەڵدەگەڕێت" },
  { id: "sit", from: ["6-12m"], en: "Sits with support", ku: "بە پشتگیری دادەنیشێت" },
];

export const DISCOVER_CARDS = [
  {
    id: "d1",
    type: "myth",
    ages: ["0-2w", "2-8w", "2-6m", "6-12m", "pregnant"],
    moods: ["tired", "heavy", "help", "okay", "calm"],
    en: { title: "Myth vs Fact", myth: "If baby cries, you’re doing something wrong.", fact: "Crying is communication — hunger, gas, overstimulation, or need for closeness." },
    ku: { title: "ئەفسانە بەرامبەر ڕاستی", myth: "ئەگەر کۆرپەلە بگرێت، تۆ هەڵە دەکەیت.", fact: "گریان پەیوەندییە — برسێتی، گاز، زۆر هاندراوی، یان پێویستی بە نزیکبوونەوە." },
  },
  {
    id: "d2",
    type: "hack",
    ages: ["0-2w", "2-8w"],
    moods: ["tired", "okay", "calm"],
    en: { title: "Quick hack", body: "Dim lights at night feeds. Soft voice. Same side of the bed. Baby learns night ≠ party." },
    ku: { title: "فێڵی خێرا", body: "لە شیرپێدانی شەودا ڕووناکی کەم بکەرەوە. دەنگی نەرم. هەمان لای جێگاکە. کۆرپەلە فێر دەبێت شەو ≠ ئاهەنگ." },
  },
  {
    id: "d3",
    type: "doctor",
    ages: ["0-2w", "2-8w", "2-6m"],
    moods: ["heavy", "help", "tired"],
    en: { title: "Doctor in 30s", body: "Call urgently for: blue lips, floppy body, fever under 3 months, fewer than expected wet diapers, or your gut says something is wrong." },
    ku: { title: "پزیشک لە ٣٠ چرکەدا", body: "بە پەلە پەیوەندی بکە بۆ: لێوی شین، جەستەی شل، تا لە ژێر ٣ مانگدا، کەمبوونەوەی پاککەرەوەی تەڕ، یان هەستت دەڵێت شتێک هەڵەیە." },
  },
  {
    id: "d4",
    type: "story",
    ages: ["pregnant", "0-2w", "2-8w"],
    moods: ["heavy", "tired", "okay"],
    en: { title: "Real parent", body: "“I thought love would feel instant. Mine grew in tiny moments — a latch that clicked, a nap that held.”" },
    ku: { title: "دایکێکی ڕاستەقینە", body: "«وا بیرم دەکردەوە خۆشەویستی دەستبەجێ دێت. هی من لە ساتە بچووکەکاندا گەشەی کرد — گرتنێکی باش، نووستنێک کە درێژەی کێشا.»" },
  },
  {
    id: "d5",
    type: "video",
    ages: ["0-2w", "2-8w", "2-6m", "6-12m"],
    moods: ["calm", "okay", "tired"],
    en: { title: "20-second calm", body: "Inhale 4 · hold 2 · exhale 6. One round while baby feeds. That’s enough." },
    ku: { title: "ئارامی ٢٠ چرکەیی", body: "هەناسە ٤ · ڕاگرتن ٢ · دەرکردن ٦. یەک جار لە کاتی شیرپێدان. ئەوە بەسە." },
  },
  {
    id: "d6",
    type: "hack",
    ages: ["2-8w", "2-6m", "6-12m"],
    moods: ["tired", "heavy"],
    en: { title: "Quick hack", body: "Keep a ‘one-hand station’: water, snack, burp cloth, phone charger within reach of your nursing chair." },
    ku: { title: "فێڵی خێرا", body: "«وێستگەی یەک دەست» دروست بکە: ئاو، خواردنی سووک، دەستمال، شارژەری مۆبایل لەگەڵ کورسی شیرپێدان." },
  },
  {
    id: "d7",
    type: "myth",
    ages: ["pregnant", "0-2w", "2-8w"],
    moods: ["help", "heavy", "okay"],
    en: { title: "Myth vs Fact", myth: "Formula means you failed at breastfeeding.", fact: "Fed is loved. Many first-time mothers mix paths — and that can be wise care." },
    ku: { title: "ئەفسانە بەرامبەر ڕاستی", myth: "شیرخۆراکی دەستکرد واتە لە شیرپێدانی سروشتی شکستت هێنا.", fact: "تێرکردن خۆشەویستییە. زۆر دایکی یەکەمجار ڕێگای تێکەڵ هەڵدەبژێرن — و ئەوە دەتوانێت چاودێری زیرا بێت." },
  },
  {
    id: "d8",
    type: "doctor",
    ages: ["0-2w", "2-8w", "2-6m", "6-12m"],
    moods: ["calm", "okay", "tired"],
    en: { title: "Doctor in 30s", body: "Cluster feeding in the evening is common in early weeks. It doesn’t always mean low supply." },
    ku: { title: "پزیشک لە ٣٠ چرکەدا", body: "شیرپێدانی چڕی ئێواران لە هەفتە سەرەتاییەکاندا باوە. هەمیشە واتای کەمی شیر نییە." },
  },
];

export const FEED_FAQS = [
  {
    id: "f1",
    q: { en: "How often do newborns feed?", ku: "تازەلەدایکبوو چەند جار شیر دەخوات؟" },
    a: { en: "Often 8–12 times in 24 hours. Watch cues more than the clock.", ku: "زۆرجار ٨–١٢ جار لە ٢٤ کاتژمێردا. زیاتر سەیری نیشانەکان بکە نەک تەنها کاتژمێر." },
  },
  {
    id: "f2",
    q: { en: "Is cluster feeding normal?", ku: "شیرپێدانی چڕ ئاساییە؟" },
    a: { en: "Yes in early weeks, especially evenings. Rest between; hydrate.", ku: "بەڵێ لە هەفتە سەرەتاییەکاندا، بەتایبەت ئێواران. لە نێواندا پشوو بدە؛ ئاو بخۆرەوە." },
  },
  {
    id: "f3",
    q: { en: "When to call about latch pain?", ku: "کەی پەیوەندی بکەم بۆ ئازاری گرتنی مەمک؟" },
    a: { en: "Sharp ongoing pain, cracked bleeding nipples, or fever — seek lactation/doctor help.", ku: "ئازاری توندی بەردەوام، درز و خوێن، یان تا — یارمەتی شیرپێدان / پزیشک بخوازە." },
  },
];

export function pickDiscover(age, mood) {
  const scored = DISCOVER_CARDS.map((c) => {
    let s = 0;
    if (c.ages.includes(age)) s += 2;
    if (mood && c.moods.includes(mood)) s += 2;
    return { c, s };
  });
  scored.sort((a, b) => b.s - a.s);
  return scored.map((x) => x.c);
}

export function moodReminder(mood, lang) {
  const map = {
    calm: {
      en: "Protect this calm — one quiet minute still counts.",
      ku: "ئەم ئارامییە بپارێزە — یەک خولەکی هێمنیش گرنگە.",
    },
    okay: {
      en: "You’re holding a lot. Soft structure helps more than perfection.",
      ku: "زۆر شت هەڵدەگریت. ڕێکخستنی نەرم زیاتر یارمەتی دەدات لە تەواوی.",
    },
    tired: {
      en: "Tired is not failure. Lower the bar. Water, rest, one feed at a time.",
      ku: "ماندوویی شکست نییە. چاوەڕوانی کەم بکەرەوە. ئاو، پشوو، یەک شیرپێدان لە دوای یەک.",
    },
    heavy: {
      en: "Heavy days deserve kindness. Tell someone you trust how you feel.",
      ku: "ڕۆژە قورسەکان شایەنی میهرەبانین. بە کەسێک کە متمانەت پێیەتی هەستت بڵێ.",
    },
    help: {
      en: "Needing help is wise. Reach a person, midwife, or doctor — Kurdana is beside you, not instead of them.",
      ku: "پێویستی بە یارمەتی زیراییە. پەیوەندی بە کەس، مامان، یان پزیشک بکە — کوردانا لەگەڵتە، نەک جێگەیان.",
    },
  };
  const row = map[mood] || map.okay;
  return lang === "ku" ? row.ku : row.en;
}

export function feedPatternHint(feeds, lang) {
  const today = feeds.filter((f) => {
    const d = new Date(f.at).toDateString();
    return d === new Date().toDateString();
  });
  if (today.length === 0) {
    return lang === "ku"
      ? "کاتێک تۆمار دەکەیت، شێوازەکان لێرە دەردەکەون."
      : "Log a few feeds — patterns will appear here.";
  }
  if (today.length >= 8) {
    return lang === "ku"
      ? "ئەمڕۆ زۆر شیرپێدانت تۆمار کردووە — لە هەفتە سەرەتاییەکاندا ئەمە باوە."
      : "Lots of feeds logged today — common in early weeks.";
  }
  const left = today.filter((f) => f.side === "L").length;
  const right = today.filter((f) => f.side === "R").length;
  if (left >= right + 3) {
    return lang === "ku"
      ? "زیاتر لای چەپت بەکارهێناوە — ئەگەر ئارەزووت هەیە، لای ڕاست تاقی بکەرەوە."
      : "More left-side logs — try offering right next if it feels right.";
  }
  if (right >= left + 3) {
    return lang === "ku"
      ? "زیاتر لای ڕاستت بەکارهێناوە — لای چەپیش جاروبار تاقی بکەرەوە."
      : "More right-side logs — offer left sometimes too.";
  }
  return lang === "ku"
    ? `${today.length} شیرپێدان ئەمڕۆ. بەردەوام بە — تۆ باش دەکەیت.`
    : `${today.length} feeds today. Keep going — you’re doing this.`;
}
