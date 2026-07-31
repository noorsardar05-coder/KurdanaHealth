/* NSM Mental Health — bilingual, evidence-informed, non-diagnostic */

const $ = (id) => document.getElementById(id);

const NSM_QUOTES = [
  { en: "Healing is not always loud. Sometimes it looks like resting.", ku: "چاکبوون هەمیشە بەرز ناکرێتەوە. هەندێک جار وەک پشوو دەردەکەوێت." },
  { en: "Your mind deserves care, not punishment.", ku: "مێشکت شایانی چاودێرییە، نەک سزادان." },
  { en: "Progress can be quiet and still be real.", ku: "پێشکەوتن دەتوانێت بێدەنگ بێت و هەر هەبێت." },
  { en: "Not every hard day means you are going backwards.", ku: "هەموو ڕۆژێکی قورس واتا ناگەڕێیتەوە." },
  { en: "Rest is not failure. It is repair.", ku: "پشوو شکست نییە. چاککردنەوەیە." },
  { en: "Small steps still move you forward.", ku: "هەنگاوە بچووکەکان هێشتا پێش دەخەن." },
  { en: "You can feel heavy and still be growing.", ku: "دەتوانی قورس هەست بکەیت و هێشتا گەشە بکەیت." },
  { en: "Naming a feeling is already a kind of care.", ku: "ناونانی هەستێک خۆی جۆرێک لە چاودێرییە." },
  { en: "Boundaries protect the energy you need to heal.", ku: "سنوورەکان ئەو وزەیە دەپارێزن کە بۆ چاکبوون پێویستتە." },
  { en: "You do not have to earn rest by suffering first.", ku: "پێویست ناکات سەرەتا ئازار بکەیت بۆ ئەوەی پشوو بەدەست بهێنیت." },
  { en: "Clarity often comes after slowing down, not forcing.", ku: "زۆرجار ڕووناکی دوای هێوربوون دێت، نەک زۆر هەوڵدان." },
  { en: "Self-compassion is a skill—not a personality trait.", ku: "خۆشەفامێتی وەک توانایەکە، نەک تەنها تایبەتمەندییەک." },
  { en: "Overthinking is exhausting; gentleness is a valid response.", ku: "زۆر بیرکردنەوە مەترسیدارە؛ نەرمی وەڵامێکی دروستە." },
  { en: "Your nervous system is not against you—it is trying to protect you.", ku: "سیستەمی دەماغی تۆ دژی تۆ نییە—هەوڵ دەدات پارێزت بکات." },
  { en: "Connection does not require perfection—only honesty.", ku: "پەیوەندی پێویستی بە تەواو نییە—تەنها ڕاستگۆیی." },
  { en: "Grief has its own timeline; rushing it rarely helps.", ku: "غەم کاتێکی خۆی هەیە؛ خێراکردن زۆرجار یارمەتی نادات." },
  { en: "Stress is information, not a verdict on your worth.", ku: "سترێس زانیارییە، نەک حوکم لەسەر بەهای تۆ." },
  { en: "You are allowed to need support without explaining everything.", ku: "دەتوانی پشتیوانی بخوازیت بێ ئەوەی هەموو شت ڕوون بکەیتەوە." },
  { en: "Calm is not the absence of difficulty—it is a steadier response.", ku: "هێوربوون واتا نییە قورسی نییە—وەڵامێکی جێگیرترە." },
  { en: "Recovery includes days that do not look productive.", ku: "چاکبوون ڕۆژانی تێدایە کە وەک بەرهەمهێنان نادەن." },
  { en: "Listening to your body is part of emotional intelligence.", ku: "گوێگرتن لە جەستەت بەشێکە لە زیرەکی هەستیاری." },
  { en: "Hope can be quiet—it does not have to feel loud.", ku: "هیوا دەتوانێت بێدەنگ بێت—پێویست نییە بەرز بێت." },
  { en: "You deserve tools—not shame—for what you carry.", ku: "ئامراز شایانی تۆیە، نەک شەرم، بۆ ئەوەی هەڵدەگریت." },
  { en: "Safety first: you matter, and your pain matters too.", ku: "سەرەتا سەلامەتی: تۆ گرنگیت و ئازارەکەتش گرنگە." },
  { en: "Asking for help is a sign of wisdom, not weakness.", ku: "داوای یارمەتی زانایی دەردەخات، نەک لاوازی." },
  { en: "Evening you still deserves patience from morning you.", ku: "ئێواری تۆ هێشتا شایانی ئارامییە لە لایەن بەیانی تۆ." },
  { en: "Patterns can change when met with steady, gentle practice.", ku: "شێوازەکان دەتوانن بگۆڕدرێن کاتێک بە وردی و نەرمی ڕاهێنان دەکەیت." },
  { en: "Your worth is not measured by your hardest days.", ku: "بەهای تۆ بە قورسترین ڕۆژەکانت ناپێوردرێت." }
];

const TXT = {
  en: {
    backDashboard: "Back to dashboard",
    brandTag: "Mental wellness",
    heroTitle: "Mental Health",
    heroSubtitle: "A calm space for emotional wellbeing, inner balance, and gentle support—grounded in care, not judgment.",
    quoteHint: "Tap the quote for another thought from NSM.",
    heroDisclaimer: "This experience offers education and self-support tools. It is not therapy, diagnosis, or crisis care.",
    tabExplore: "Explore",
    tabLearn: "Learn",
    tabTools: "Tools",
    tabTrack: "Track",
    tabDiscover: "Discover",
    exploreTitle: "Explore",
    exploreSub: "Check in with yourself, take the reflection quiz, and see gentle next steps.",
    checkInTitle: "Emotional check-in",
    dashboardTitle: "Your support snapshot",
    quizTitle: "Mental wellness reflection",
    copingPathTitle: "Suggested coping path",
    learnTitle: "Learn",
    learnSub: "Short, structured psychoeducation—clear, warm, and easy to scan.",
    learnSearch: "Search topics…",
    learnOpen: "Open full module",
    toolsTitle: "Tools",
    toolsSub: "Practical exercises you can use today—breathing, grounding, reflection, and more.",
    breathTitle: "Breathing",
    groundTitle: "Grounding",
    reframeTitle: "Thought reframing",
    journalTitle: "Journaling prompts",
    pmrTitle: "Progressive muscle relaxation",
    needTitle: "What do I need right now?",
    sootheTitle: "Self-soothing checklist",
    firstAidTitle: "Emotional first aid",
    crisisTitle: "Crisis & safety notice",
    burnoutMiniTitle: "Burnout check-in",
    boundaryTitle: "Boundary helper",
    selfTalkTitle: "Self-talk reframer",
    nsResetTitle: "Nervous system reset",
    sleepGuideTitle: "Sleep recovery mini-guide",
    trackTitle: "Track",
    trackSub: "Notice patterns over time—insights are reflective, not diagnostic.",
    logTodayTitle: "Log today",
    saveLog: "Save today’s entry",
    insightsTitle: "Gentle insights",
    weeklyViewTitle: "This week",
    discoverTitle: "Discover",
    discoverSub: "Reflections, scripts, and ideas—curated and calm.",
    reflectionTitle: "Guided reflection",
    mythFactTitle: "Myth vs fact",
    compassionTitle: "Self-compassion",
    relationCheckTitle: "Relationship check-in",
    boundaryScriptsTitle: "Boundary scripts",
    calmRoutineTitle: "Calming routines",
    supportPathsTitle: "Support paths",
    mediaTitle: "Books & podcasts (general ideas)",
    resetIdeasTitle: "Emotional reset ideas",
    footerNote: "NSM Mental Wellness · For education and support. If you are in immediate danger, contact local emergency services.",
    checkNext: "Continue",
    checkBack: "Back",
    checkStart: "Begin",
    checkFinish: "See suggestions",
    quizNext: "Next",
    quizBack: "Back",
    quizSubmit: "See results",
    quizRetake: "Retake quiz",
    resultTitle: "Your reflection summary",
    patternsLabel: "Patterns that may fit right now",
    blockWhat: "What may be happening",
    blockFeel: "What it can feel like",
    blockNow: "What may help right now",
    blockWeek: "What may help this week",
    blockSeek: "When more support may help",
    notDiag: "This tool is for reflection and support, not diagnosis.",
    startBreath: "Start",
    stopBreath: "Stop",
    nextPrompt: "Next prompt",
    copyBoundary: "Copy script",
    crisisBody: "If you feel unsafe or might harm yourself or others, contact your local emergency number or crisis line immediately and reach out to someone you trust. This page cannot provide real-time crisis care.",
    smallWins: "Small wins",
    streakLabel: "Day streak",
    moodLabel: "Mood",
    stressLabel: "Stress",
    anxietyLabel: "Tension / worry",
    energyLabel: "Energy",
    sleepLabel: "Sleep quality",
    focusLabel: "Focus",
    socialLabel: "Connection",
    triggersLabel: "Notes (optional)",
    copingUsed: "Tools I used today",
    habitWater: "Hydration",
    habitMove: "Movement",
    habitRest: "Rest",
    habitJournal: "Journaling",
    secFeel: "What it can feel like",
    secWhy: "Why it may happen",
    secWorse: "What can make it worse",
    secHelp: "What may help",
    secIgnore: "What not to ignore",
    secTake: "Key takeaway",
    secMyth: "Myth vs fact",
    secPro: "When professional support may help"
  },
  ku: {
    backDashboard: "گەڕانەوە بۆ داشبۆرد",
    brandTag: "تەندروستی دەروونی",
    heroTitle: "تەندروستی دەروونی",
    heroSubtitle: "شوێنێکی هێور بۆ ئاسایشی هەستیاری، هاوسەنگی ناوەوە، و پشتیوانی نەرم—بە بنەمای چاودێری، نە حوکم.",
    quoteHint: "دەست لە دەقەکە بدە بۆ بیرۆکەیەکی تر لە NSM.",
    heroDisclaimer: "ئەم ئەزموونە پەروەردە و ئامرازی خۆپشتیوانییە. چارەسەر، دۆزینەوە، یان چاودێری قەیران نییە.",
    tabExplore: "دۆزینەوە",
    tabLearn: "فێربوون",
    tabTools: "ئامرازەکان",
    tabTrack: "تۆمار",
    tabDiscover: "نوێکردنەوە",
    exploreTitle: "دۆزینەوە",
    exploreSub: "خۆت بپشکنە، تاقیکردنەوە بکە، و هەنگاوە نەرمەکان ببینە.",
    checkInTitle: "چێک-ئینی هەستیاری",
    dashboardTitle: "وێنەی پشتیوانی تۆ",
    quizTitle: " بیرکردنەوەی تەندروستی دەروونی",
    copingPathTitle: "ڕێگای ڕووبەڕووبوونەوە",
    learnTitle: "فێربوون",
    learnSub: "پەروەردەی دەروونی کورت و ڕێکخراو—ڕوون، گەرم، ئاسان بۆ خوێندنەوە.",
    learnSearch: "گەڕان لە بابەتەکان…",
    learnOpen: "کردنەوەی تەواوی بابەت",
    toolsTitle: "ئامرازەکان",
    toolsSub: "ڕاهێنانە بەردەستەکان بۆ ئەمڕۆ—هەناسە، زەمینکردنەوە، بیرکردنەوە.",
    breathTitle: "هەناسە",
    groundTitle: "زەمینکردنەوە",
    reframeTitle: "دووبارە ڕێکخستنی بیر",
    journalTitle: "پرسیارەکانی ڕۆژنامە",
    pmrTitle: "شلکردنەوەی ماسولکە بە هەنگاو",
    needTitle: "ئێستا چیم پێویستە؟",
    sootheTitle: "لیستی خۆئارامکردنەوە",
    firstAidTitle: "یارمەتی یەکەمی هەستیاری",
    crisisTitle: "ئاگاداری قەیران و سەلامەتی",
    burnoutMiniTitle: "چێک-ئینی بەرنئاوت",
    boundaryTitle: "یارمەتیدەر بۆ سنوور",
    selfTalkTitle: "دووبارە ڕێکخستنی قسەی ناوخۆ",
    nsResetTitle: "ڕێکخستنەوەی سیستەمی دەماغی",
    sleepGuideTitle: "ڕێنمایی کورت بۆ خەو",
    trackTitle: "تۆمار",
    trackSub: "شێوازەکان لە کاتدا ببینە—تێڕوانین بیرکردنەوەیە، نەک دۆزینەوە.",
    logTodayTitle: "تۆماری ئەمڕۆ",
    saveLog: "پاشەکەوتکردنی ئەمڕۆ",
    insightsTitle: "تێڕوانینە نەرمەکان",
    weeklyViewTitle: "ئەم هەفتەیە",
    discoverTitle: "نوێکردنەوە",
    discoverSub: "بیرکردنەوە، دەق، بیرۆکە—هەڵبژاردە و هێور.",
    reflectionTitle: "بیرکردنەوەی ڕێنماییکراو",
    mythFactTitle: "میت و ڕاستی",
    compassionTitle: "خۆشەفامێتی",
    relationCheckTitle: "پشکنینی پەیوەندی",
    boundaryScriptsTitle: "دەقەکانی سنوور",
    calmRoutineTitle: "روتینە هێورەکان",
    supportPathsTitle: "ڕێگای پشتیوانی",
    mediaTitle: "کتێب و پۆدکاست (گشتی)",
    resetIdeasTitle: "بیرۆکەی ڕێکخستنەوەی هەست",
    footerNote: "NSM تەندروستی دەروونی · بۆ پەروەردە و پشتیوانی. ئەگەر لە مەترسیدا بیت، پەیوەندی بە فەرمانبەرانی فریاکەوتن بکە.",
    checkNext: "بەردەوام بە",
    checkBack: "گەڕانەوە",
    checkStart: "دەستپێکردن",
    checkFinish: "پێشنیارەکان ببینە",
    quizNext: "دواتر",
    quizBack: "گەڕانەوە",
    quizSubmit: "ئەنجامەکان",
    quizRetake: "دووبارە تاقی بکەرەوە",
    resultTitle: "کورتەی بیرکردنەوەکەت",
    patternsLabel: "شێوازەکان کە لەوانەیە ئێستا بگونجێن",
    blockWhat: "لەوانەیە چی ڕوودەدات",
    blockFeel: "چۆن دەردەکەوێت",
    blockNow: "لەوانەیە ئێستا چی یارمەتی بدات",
    blockWeek: "لەوانەیە ئەم هەفتەیە چی یارمەتی بدات",
    blockSeek: "کاتێک پشتیوانی زیاتر لەوانەیە یارمەتی بدات",
    notDiag: "ئەم ئامرازە بۆ بیرکردنەوە و پشتیوانییە، نەک دۆزینەوە.",
    startBreath: "دەستپێکردن",
    stopBreath: "وەستاندن",
    nextPrompt: "پرسیاری داهاتوو",
    copyBoundary: "لەبەرگرتنەوەی دەق",
    crisisBody: "ئەگەر هەست بە نائەمنی دەکەیت یان لەوانەیە زیان بە خۆت یان کەسانی تر بگەیەنیت، دەستبەجێ پەیوەندی بە ژمارەی فریاکەوتن و کەسێکی متمانەپێدراو بکە. ئەم پەڕەیە چاودێری ڕاستەوخۆی قەیران نییە.",
    smallWins: "بردەوازی بچووکەکان",
    streakLabel: "زنجیرەی ڕۆژەکان",
    moodLabel: "هەست",
    stressLabel: "سترێس",
    anxietyLabel: "کش و قاڵ / نیگەرانی",
    energyLabel: "وزە",
    sleepLabel: "جۆری خەو",
    focusLabel: "سەرنج",
    socialLabel: "پەیوەندی",
    triggersLabel: "تێبینی (ئارەزوومەندانە)",
    copingUsed: "ئامرازەکانی ئەمڕۆم",
    habitWater: "ئاو",
    habitMove: "جوڵە",
    habitRest: "پشوو",
    habitJournal: "ڕۆژنامە",
    secFeel: "چۆن دەردەکەوێت",
    secWhy: "بۆچی لەوانەیە ڕووبدات",
    secWorse: "چی خراپتر دەکات",
    secHelp: "چی لەوانەیە یارمەتی بدات",
    secIgnore: "چی فەرامۆش مەکە",
    secTake: "کورتە",
    secMyth: "میت و ڕاستی",
    secPro: "کاتێک پشتیوانی پیشەیی لەوانەیە یارمەتی بدات"
  }
};

function tr(k) {
  return TXT[state.lang][k] || k;
}

const state = {
  lang: localStorage.getItem("mh_lang") || "en",
  tab: "explore",
  quoteI: 0,
  checkStep: 0,
  checkData: {},
  quizStep: 0,
  quizAnswers: [],
  learnFilter: "",
  breathMode: "box",
  groundMode: "54321",
  breathRunning: false,
  breathTimer: null,
  journalCat: "anxiety",
  trackDraft: null,
  topicModalId: null
};

const COPING_OPTS = {
  en: {
    calm: { label: "Calm", tools: ["breath", "ground"], learn: "anxiety" },
    clarity: { label: "Clarity", tools: ["reframe", "journal"], learn: "overthinking" },
    comfort: { label: "Comfort", tools: ["soothe", "firstAid"], learn: "lowMood" },
    motivation: { label: "Motivation", tools: ["need", "nsReset"], learn: "burnout" },
    rest: { label: "Rest", tools: ["sleepGuide", "pmr"], learn: "sleep" },
    support: { label: "Support", tools: ["boundary", "discover"], learn: "boundaries" }
  },
  ku: {
    calm: { label: "ئارامی", tools: ["breath", "ground"], learn: "anxiety" },
    clarity: { label: "ڕووناکی", tools: ["reframe", "journal"], learn: "overthinking" },
    comfort: { label: "ئاسوودەیی", tools: ["soothe", "firstAid"], learn: "lowMood" },
    motivation: { label: "هاندەر", tools: ["need", "nsReset"], learn: "burnout" },
    rest: { label: "پشوو", tools: ["sleepGuide", "pmr"], learn: "sleep" },
    support: { label: "پشتیوانی", tools: ["boundary", "discover"], learn: "boundaries" }
  }
};

const QUIZ_Q = {
  en: [
    { t: "Overall stress lately feels…", o: ["Mostly manageable", "Often elevated", "Frequently high", "Overwhelming most days"] },
    { t: "Sleep has been…", o: ["Fairly restorative", "Uneven", "Short or fragmented", "Poor for a while"] },
    { t: "My mind races or loops more than I would like.", o: ["Rarely", "Sometimes", "Often", "Almost always"] },
    { t: "Physical tension or restlessness shows up…", o: ["Rarely", "Weekly", "Most days", "Nearly all the time"] },
    { t: "Energy for daily tasks feels…", o: ["Stable enough", "Lower than usual", "Drained often", "Very depleted"] },
    { t: "Motivation or interest in things I usually value…", o: ["Still there", "A bit reduced", "Noticeably lower", "Hard to access"] },
    { t: "Feeling disconnected or numb has been…", o: ["Uncommon", "Occasional", "Frequent", "A main theme"] },
    { t: "Self-criticism or harsh inner talk has been…", o: ["Mild", "Noticeable", "Strong", "Dominant"] },
    { t: "Social situations feel more draining than before.", o: ["Not really", "A little", "Often", "I avoid many"] },
    { t: "Focus or concentration compared to my usual baseline…", o: ["Similar", "Somewhat harder", "Often difficult", "Very scattered"] },
    { t: "I feel emotionally overloaded or on edge.", o: ["Rarely", "Sometimes", "Often", "Most of the time"] },
    { t: "Healthy coping (rest, movement, support) has been…", o: ["Accessible", "Inconsistent", "Hard to use", "Rare"] }
  ],
  ku: [
    { t: "سترێس لەم دواییانە بە گشتی…", o: ["زۆرجار بەڕێوەدەبرێت", "زۆرجار بەرزە", "زۆرجار زۆر بەرزە", "زۆربەی ڕۆژەکان زۆر بەرزە"] },
    { t: "خەو…", o: ["باشە", "ناهاوسەنگە", "کورت یان پارچەپارچەیە", "ماوەیەکە خراپە"] },
    { t: "مێشکم زیاتر لە ئارەزوو دەسوڕێتەوە.", o: ["زۆر کەم", "هەندێک جار", "زۆرجار", "تقریبەن هەمیشە"] },
    { t: "کش و قاڵ یان بێ ئارامی لە جەستە…", o: ["زۆر کەم", "هەفتانە", "زۆربەی ڕۆژەکان", "تقریبەن هەمیشە"] },
    { t: "وزە بۆ کارە ڕۆژانەکان…", o: ["جێگیرە", "کەمتر لە ئاسایی", "زۆرجار کەمە", "زۆر کەمە"] },
    { t: "هاندان یان بەرژەوەندی بۆ شتەکان…", o: ["هەیە", "کەمکراوەتەوە", "بەرچاوە کەمە", "زۆر قورسە"] },
    { t: "دورکەوتنەوە یان بێ هەستی…", o: ["کەمە", "هەندێک جار", "زۆرجار", "سەرەکییە"] },
    { t: "خۆتوندان یان قسەی توند لە ناوەوە…", o: ["سووک", "دیارە", "بەرزە", "سەرەکییە"] },
    { t: "کۆمەڵایەتی زیاتر مەترسیدار دەردەکەوێت.", o: ["نەخێر", "هەندێک", "زۆرجار", "زۆرجار دوور دەکەومەوە"] },
    { t: "سەرنج بەراورد بە ئاسایی…", o: ["وەک خۆی", "کەمێک قورستر", "زۆرجار قورسە", "زۆر پارچەپارچەیە"] },
    { t: "هەست دەکەم بارگاو یان لەسەر لێوە.", o: ["زۆر کەم", "هەندێک جار", "زۆرجار", "زۆربەی کات"] },
    { t: "ڕووبەڕووبوونەوەی تەندروست (پشوو، جوڵە، پشتیوانی)…", o: ["بەردەستە", "ناهاوسەنگە", "قورسە", "زۆر کەمە"] }
  ]
};

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("mh_lang", lang);
  document.documentElement.lang = lang === "ku" ? "ckb" : "en";
  document.documentElement.dir = lang === "ku" ? "rtl" : "ltr";
  document.querySelectorAll("[data-t]").forEach((el) => {
    el.textContent = tr(el.dataset.t);
  });
  $("langToggle").textContent = lang === "en" ? "کوردی" : "English";
  $("learnSearch").placeholder = tr("learnSearch");
  renderQuote();
  renderCheckIn();
  renderDashboard();
  renderCopingPath();
  renderExploreSupport();
  renderQuiz();
  renderLearn();
  renderTools();
  renderTrack();
  renderDiscover();
}

function switchTab(tab) {
  state.tab = tab;
  document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === tab));
  if (tab === "tools") renderTools();
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
  }, 140);
}

function quizScore() {
  return state.quizAnswers.reduce((a, i) => a + i, 0);
}

function buildQuizResult() {
  const L = state.lang === "en";
  const qa = (i) => state.quizAnswers[i] ?? 0;
  const s = quizScore();
  const max = QUIZ_Q.en.length * 3;
  const ratio = s / max;
  const patterns = [];
  if (ratio >= 0.62) patterns.push(L ? "elevated stress load" : "بارێکی بەرزی سترێس");
  if (qa(1) + qa(3) >= 4) patterns.push(L ? "tension affecting body and rest" : "کش و قاڵ و کاریگەری لەسەر خەو");
  if (qa(2) + qa(9) >= 4) patterns.push(L ? "overthinking / focus strain" : "زۆر بیرکردنەوە / سەرنج");
  if (qa(4) + qa(5) + qa(6) >= 6) patterns.push(L ? "low energy / burnout-like depletion" : "کەمبوونەوەی وزە / نزیک لە بەرنئاوت");
  if (qa(7) + qa(8) >= 4) patterns.push(L ? "social strain or harsh self-talk" : "سترێسی کۆمەڵایەتی یان قسەی توند");
  if (patterns.length === 0) patterns.push(L ? "mixed stress signals—worth gentle attention" : "نیشانەی تێکەڵی سترێس—شایانی چاودێری نەرمە");

  const what = L
    ? "You may be experiencing a pattern of stress and mental overload. This reflection does not diagnose anything—it helps you notice what might need care."
    : "لەوانەیە شێوازێکی سترێس و بارێکی زۆر لە مێشک هەست بکەیت. ئەمە دۆزینەوە نییە—تەنها یارمەتی تۆ دەکات بزانیت چی لەوانەیە پێویستی بە چاودێری بێت.";

  const feel = L
    ? "This can show up as tension, overthinking, poor sleep, irritability, feeling on edge, or emotional exhaustion."
    : "دەردەکەوێت وەک کش، زۆر بیرکردنەوە، خەو خراپ، تووڕەیی، لەسەر لێوە، یان مەترسیداری هەستیاری.";

  const now = L
    ? ["Reduce stimulation for 10–20 minutes", "Slow breathing or grounding", "Lower the pressure you place on yourself today", "Name one small kind action you can do next"]
    : ["کەمکردنەوەی زەنگ بۆ ١٠–٢٠ خولەک", "هەناسەی هێور یان زەمینکردنەوە", "کەمکردنەوەی فشار لەسەر خۆت ئەمڕۆ", "یەک کرداری بچووکی میهرەبانانە بنووسە"];

  const week = L
    ? ["Consistent sleep timing when possible", "Gentle movement most days", "Journal or talk to someone trusted", "Reduce avoidable stressors where realistic", "Notice patterns without judging yourself"]
    : ["کاتێکی خەو کاتێک دەتوانرێت", "جوڵەی نەرم زۆربەی ڕۆژەکان", "ڕۆژنامە یان قسەکردن لەگەڵ کەسێکی متمانەپێدراو", "کەمکردنەوەی سترێسی دوورخراوە", "تێبینی شێواز بەبێ حوکم"];

  const seek = L
    ? "If this pattern persists, worsens, or affects safety, daily functioning, or relationships in meaningful ways, it may help to speak with a licensed mental health professional."
    : "ئەگەر ئەم شێوازە بەردەوام بوو، خراپتر بوو، یان کاریگەری لەسەر سەلامەتی، ڕۆژانە، یان پەیوەندییەکان کرد، لەوانەیە قسەکردن لەگەڵ پسپۆڕێکی تەندروستی دەروونی یارمەتی بدات.";

  const quote = NSM_QUOTES[state.quoteI % NSM_QUOTES.length];
  return { patterns, what, feel, now, week, seek, quote: L ? quote.en : quote.ku };
}

function softConfetti() {
  const c = $("softConfetti");
  if (!c) return;
  const ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;
  const parts = Array.from({ length: 45 }, () => ({
    x: Math.random() * c.width,
    y: -10 - Math.random() * 80,
    vy: 0.8 + Math.random() * 1.2,
    s: 2 + Math.random() * 3,
    a: 0.15 + Math.random() * 0.25,
    hue: 140 + Math.random() * 80
  }));
  let f = 0;
  function tick() {
    f++;
    ctx.clearRect(0, 0, c.width, c.height);
    parts.forEach((p) => {
      p.y += p.vy;
      ctx.fillStyle = `hsla(${p.hue}, 35%, 75%, ${p.a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
      ctx.fill();
    });
    if (f < 120) requestAnimationFrame(tick);
  }
  tick();
}

const CHECK = {
  feelings: {
    en: ["Anxious", "Sad", "Numb", "Overwhelmed", "Angry", "Calm but tired", "Hopeful", "Uncertain"],
    ku: ["نیگەران", "غەمگین", "بێ هەست", "بارگاو", "تووڕە", "هێور بەڵام ماندوو", "هیوادار", "نادیار"]
  },
  body: {
    en: ["Chest", "Stomach", "Throat", "Head", "Jaw / shoulders", "Whole body", "Mind only"],
    ku: ["سینە", "سک", "گەروەن", "سەر", "چەگەڵ / شان", "هەموو جەستە", "تەنها مێشک"]
  },
  needs: ["calm", "clarity", "comfort", "motivation", "rest", "support"],
  depth: { en: ["Something quick (5 min)", "A bit deeper (15+ min)"], ku: ["خێرا (٥ خولەک)", "قووڵتر (١٥+ خولەک)"] }
};

function renderCheckIn() {
  const root = $("checkInRoot");
  const L = state.lang === "en";
  const D = state.checkData;
  const step = state.checkStep;
  if (step === 0) {
    root.innerHTML = `<p class="muted small">${L ? "A gentle check-in. Pause if you need to." : "پشکنینێکی نەرم. وەستە ئەگەر پێویستتە."}</p>
      <button type="button" class="btn primary" id="chkGo">${tr("checkStart")}</button>`;
    $("chkGo").onclick = () => { state.checkStep = 1; renderCheckIn(); renderDashboard(); renderCopingPath(); };
    return;
  }
  if (step === 1) {
    root.innerHTML = `<div class="check-step"><span class="field-label">${L ? "What feeling is strongest right now?" : "ئێستا کام هەست بەهێزترە؟"}</span>
      <div class="chip-row">${CHECK.feelings[state.lang].map((x, i) => `<button type="button" class="chip-sm" data-feel="${i}">${x}</button>`).join("")}</div></div>
      <div class="quiz-nav"><button type="button" class="btn ghost" id="chkB">${tr("checkBack")}</button></div>`;
    root.querySelectorAll("[data-feel]").forEach((b) => {
      b.onclick = () => {
        D.feel = CHECK.feelings.en[parseInt(b.dataset.feel, 10)];
        D.feelI = parseInt(b.dataset.feel, 10);
        state.checkStep = 2;
        renderCheckIn(); renderDashboard(); renderCopingPath();
      };
    });
    $("chkB").onclick = () => { state.checkStep = 0; renderCheckIn(); };
    return;
  }
  if (step === 2) {
    root.innerHTML = `<div class="check-step"><span class="field-label">${L ? "Where do you notice it most?" : "لەکوێ زیاتر هەستی پێدەکەیت؟"}</span>
      <div class="chip-row">${CHECK.body[state.lang].map((x, i) => `<button type="button" class="chip-sm" data-bod="${i}">${x}</button>`).join("")}</div></div>
      <div class="quiz-nav"><button type="button" class="btn ghost" id="chkB2">${tr("checkBack")}</button></div>`;
    root.querySelectorAll("[data-bod]").forEach((b) => {
      b.onclick = () => { D.body = CHECK.body.en[parseInt(b.dataset.bod, 10)]; state.checkStep = 3; renderCheckIn(); renderDashboard(); renderCopingPath(); };
    });
    $("chkB2").onclick = () => { state.checkStep = 1; renderCheckIn(); };
    return;
  }
  if (step === 3) {
    root.innerHTML = `<div class="check-step"><span class="field-label">${L ? "What feels hardest today? (optional)" : "ئەمڕۆ چی قورسترە؟ (ئارەزوومەندانە)"}</span>
      <textarea id="chkHard" rows="2" style="width:100%;padding:0.5rem;border-radius:8px;border:1px solid var(--line)">${D.hard || ""}</textarea></div>
      <div class="quiz-nav"><button type="button" class="btn ghost" id="chkB3">${tr("checkBack")}</button><button type="button" class="btn primary" id="chkN3">${tr("checkNext")}</button></div>`;
    $("chkB3").onclick = () => { state.checkStep = 2; renderCheckIn(); };
    $("chkN3").onclick = () => { D.hard = $("chkHard").value; state.checkStep = 4; renderCheckIn(); renderDashboard(); renderCopingPath(); };
    return;
  }
  if (step === 4) {
    const opts = COPING_OPTS[state.lang];
    root.innerHTML = `<div class="check-step"><span class="field-label">${L ? "What do you need most right now?" : "ئێستا زۆرتر چیت پێویستە؟"}</span>
      <div class="chip-row">${CHECK.needs.map((k) => `<button type="button" class="chip-sm" data-need="${k}">${opts[k].label}</button>`).join("")}</div></div>
      <div class="quiz-nav"><button type="button" class="btn ghost" id="chkB4">${tr("checkBack")}</button></div>`;
    root.querySelectorAll("[data-need]").forEach((b) => {
      b.onclick = () => { D.need = b.dataset.need; state.checkStep = 5; renderCheckIn(); renderDashboard(); renderCopingPath(); };
    });
    $("chkB4").onclick = () => { state.checkStep = 3; renderCheckIn(); };
    return;
  }
  if (step === 5) {
    root.innerHTML = `<div class="check-step"><span class="field-label">${L ? "Quick support or deeper exploration?" : "پشتیوانی خێرا یان دۆزینەوەی قووڵتر؟"}</span>
      <div class="chip-row">${CHECK.depth[state.lang].map((x, i) => `<button type="button" class="chip-sm${D.depth === i ? " active" : ""}" data-d="${i}">${x}</button>`).join("")}</div>
      <div class="quiz-nav"><button type="button" class="btn ghost" id="chkB5">${tr("checkBack")}</button><button type="button" class="btn primary" id="chkDone">${tr("checkFinish")}</button></div>`;
    root.querySelectorAll("[data-d]").forEach((b) => {
      b.onclick = () => {
        D.depth = parseInt(b.dataset.d, 10);
        root.querySelectorAll("[data-d]").forEach((x) => x.classList.toggle("active", x === b));
      };
    });
    $("chkB5").onclick = () => { state.checkStep = 4; renderCheckIn(); };
    $("chkDone").onclick = () => {
      if (D.depth === undefined) D.depth = 0;
      state.checkStep = 6;
      renderCheckIn(); renderDashboard(); renderCopingPath(); renderExploreSupport();
    };
    return;
  }
  root.innerHTML = `<div class="support-card"><p>${L ? "You’re oriented. Try a tool below, or open Learn for deeper reading. You can revisit anytime." : "ئێستا ڕێنمایی هەیە. ئامرازێک تاقی بکەرەوە یان فێربوون بکەرەوە. هەر کات دەتوانیت بگەڕێیتەوە."}</p>
    <div class="quiz-nav"><button type="button" class="btn soft" id="chkTools">${L ? "Open Tools" : "ئامرازەکان"}</button><button type="button" class="btn ghost" id="chkReset">${L ? "Start check-in again" : "دووبارەی چێک-ئین"}</button></div></div>`;
  $("chkTools").onclick = () => switchTab("tools");
  $("chkReset").onclick = () => { state.checkStep = 0; state.checkData = {}; renderCheckIn(); renderDashboard(); renderCopingPath(); renderExploreSupport(); };
}

function renderDashboard() {
  const el = $("supportDashboard");
  const L = state.lang === "en";
  const D = state.checkData;
  if (!D.feel) {
    el.innerHTML = `<p class="muted">${L ? "Complete the check-in to see a snapshot here." : "چێک-ئین تەواو بکە بۆ بینینی وێنە."}</p>`;
    return;
  }
  const quizNote = state.quizAnswers.length === QUIZ_Q.en.length
    ? (L ? `Reflection score band: ${quizScore()} / ${QUIZ_Q.en.length * 3} (informational only).` : `نمرەی بیرکردنەوە: ${quizScore()} / ${QUIZ_Q.en.length * 3} (تەنها زانیاری).`)
    : (L ? "Quiz not completed yet—optional." : "تاقیکردنەوە هێشتا تەواو نییە.");
  el.innerHTML = `<div class="support-dashboard">
    <p><strong>${L ? "Strongest feeling:" : "هەستی بەهێزتر:"}</strong> ${D.feel}</p>
    <p><strong>${L ? "Where noticed:" : "لەکوێ:"}</strong> ${D.body || "—"}</p>
    ${D.hard ? `<p><strong>${L ? "Hardest today:" : "قورستر ئەمڕۆ:"}</strong> ${D.hard}</p>` : ""}
    <p><strong>${L ? "Need:" : "پێویست:"}</strong> ${D.need ? COPING_OPTS[state.lang][D.need].label : "—"}</p>
    <p class="mini muted">${quizNote}</p>
  </div>`;
}

function renderCopingPath() {
  const el = $("copingPath");
  const L = state.lang === "en";
  const need = state.checkData.need;
  if (!need) {
    el.innerHTML = `<p class="muted small">${L ? "Finish the check-in for tailored suggestions." : "چێک-ئین تەواو بکە بۆ پێشنیار."}</p>`;
    return;
  }
  const o = COPING_OPTS[state.lang][need];
  el.innerHTML = `<p>${L ? "Based on your need for" : "بە پێی پێویستت بۆ"} <strong>${o.label}</strong>:</p>
    <ul class="mini" style="margin:0.5rem 0 0 1rem;">
      <li>${L ? "Try Tools →" : "ئامرازەکان →"} ${o.tools.map((t) => toolName(t)).join(", ")}</li>
      <li>${L ? "Learn → topic:" : "فێربوون →"} ${learnTitle(o.learn)}</li>
    </ul>
    <button type="button" class="btn soft mt" id="goTools">${L ? "Open Tools" : "کردنەوەی ئامرازەکان"}</button>`;
  $("goTools").onclick = () => switchTab("tools");
}

function renderExploreSupport() {
  const el = $("exploreSupportCard");
  if (!el) return;
  const L = state.lang === "en";
  const q = NSM_QUOTES[state.quoteI % NSM_QUOTES.length];
  el.innerHTML = `<p class="mini" style="margin:0 0 0.5rem;line-height:1.5">“${L ? q.en : q.ku}” <span class="quote-sig">— NSM</span></p>
    <p class="mini muted" style="margin:0">${L ? "Small steps count. This space is for support, not judgment." : "هەنگاوە بچووکەکان گرنگن. ئەم شوێنە بۆ پشتیوانییە، نە حوکم."}</p>`;
}

function toolName(id) {
  const m = { breath: "breathTitle", ground: "groundTitle", reframe: "reframeTitle", journal: "journalTitle", pmr: "pmrTitle", need: "needTitle", soothe: "sootheTitle", firstAid: "firstAidTitle", sleepGuide: "sleepGuideTitle", boundary: "boundaryTitle", discover: "tabDiscover", nsReset: "nsResetTitle" };
  return tr(m[id] || id);
}

function learnTitle(id) {
  const t = LEARN_IDS.find((x) => x.id === id);
  return t ? (state.lang === "en" ? t.en : t.ku) : id;
}

const LEARN_IDS = [
  { id: "anxiety", en: "Anxiety", ku: "نیگەرانی" },
  { id: "stress", en: "Stress", ku: "سترێس" },
  { id: "burnout", en: "Burnout", ku: "بەرنئاوت" },
  { id: "overthinking", en: "Overthinking", ku: "زۆر بیرکردنەوە" },
  { id: "panic", en: "Panic sensations", ku: "هەستی پانیک" },
  { id: "lowMood", en: "Low mood patterns", ku: "شێوازی کەمبوونەوەی هەست" },
  { id: "regulation", en: "Emotional regulation", ku: "ڕێکخستنەوەی هەست" },
  { id: "selfEsteem", en: "Self-esteem", ku: "خۆڕێزایی" },
  { id: "boundaries", en: "Boundaries", ku: "سنوورەکان" },
  { id: "peoplePleasing", en: "People pleasing", ku: "ڕازیبوون بە زۆر کەس" },
  { id: "grief", en: "Grief", ku: "غەم" },
  { id: "traumaInformed", en: "Trauma-informed basics", ku: "بنەمای زانیاری لە تروما" },
  { id: "sleep", en: "Sleep & mental health", ku: "خەو و دەروون" },
  { id: "socialOverwhelm", en: "Social overwhelm", ku: "بارگاوی کۆمەڵایەتی" },
  { id: "perfectionism", en: "Perfectionism", ku: "تەواوکاری" },
  { id: "nervousSystem", en: "Nervous system regulation", ku: "ڕێکخستنەوەی سیستەمی دەماغی" },
  { id: "loneliness", en: "Loneliness", ku: "تەنهایی" },
  { id: "caregiving", en: "Caregiving burnout", ku: "بەرنئاوتی چاودێری" },
  { id: "attachment", en: "Attachment patterns", ku: "شێوازەکانی پەیوەستبوون" }
];

function buildLearnData() {
  const line = (en, ku) => ({ en, ku });
  return {
    anxiety: {
      title: line("Anxiety", "نیگەرانی"),
      feel: line("Restlessness, racing thoughts, tight chest, trouble settling.", "بێ ئارامی، بیر خێرا، سینە توند، قورسی هێوربوونەوە."),
      why: line("Your nervous system may be on high alert—often shaped by stress, uncertainty, or past learning.", "سیستەمی دەماغی لەوانەیە لە ئاگاداری بەرز بێت—زۆرجار لە سترێس یان نادیاری."),
      worse: line("Caffeine overload, skipping meals, doom-scrolling, and pressuring yourself to “snap out of it.”", "قهوەی زۆر، نەخواردن، سکرۆڵی نەرەحەتکەر، فشار بۆ خۆت."),
      help: line("Slow breathing, grounding, reducing stimulation, predictable routines, gentle movement.", "هەناسەی هێور، زەمینکردنەوە، کەمکردنەوەی زەنگ، روتین، جوڵەی نەرم."),
      ignore: line("Panic that won’t ease, new physical symptoms, or fear you cannot manage—seek medical or crisis support if needed.", "ترس یان نیشانەی جەستەیی نوێ کە ناتوانیت بەڕێوەی ببەیت."),
      takeaway: line("Anxiety is a signal, not a verdict about who you are.", "نیگەرانی ئاگادارییە، نەک حوکم لەسەر تۆ."),
      myth: line("“Anxiety means you are weak.”", "«نیگەرانی واتا لاوازی»"),
      fact: line("Anxiety is a common human response; skill-building and support can change how you experience it.", "نیگەرانی وەڵامی مرۆڤانەیە؛ فێربوون و پشتیوانی دەتوانن ئەزموون بگۆڕن."),
      pro: line("If anxiety disrupts sleep, work, or relationships for weeks, a licensed professional can help you build a plan.", "ئەگەر هەفتەکان دەستێنێت لە خەو یان کار، پسپۆڕ یارمەتی پلان دەدات.")
    },
    stress: {
      title: line("Stress", "سترێس"),
      feel: line("Irritability, tension, fatigue, difficulty switching off.", "تووڕەیی، کش، ماندوویی، قورسی وەستاندنی مێشک."),
      why: line("Demands may exceed your current capacity—time, attention, or emotional load.", "داواکاری لەوانەیە لە توانای ئێستات تێپەڕێت."),
      worse: line("Poor sleep, no breaks, perfectionism, and avoiding support.", "خەو خراپ، بێ پشوو، تەواوکاری، دوورکەوتنەوە لە پشتیوانی."),
      help: line("Micro-breaks, boundary-setting, movement, and naming limits without shame.", "پشووی بچووک، سنوور، جوڵە، ناونانی سنوور بەبێ شەرم."),
      ignore: line("Chronic headaches, persistent dread, or using substances to cope—consider professional guidance.", "سەرئێشەی درێژ یان ترسی بەردەوام."),
      takeaway: line("Stress is information about load—not proof you are failing.", "سترێس زانیارییە لەسەر بار، نەک شکست."),
      myth: line("“Stress is just mindset.”", "«سترێس تەنها بیرە»"),
      fact: line("Mindset matters, but so do sleep, support, and real constraints.", "بیر و خەو و پشتیوانی و سنوورەکان هەموو گرنگن."),
      pro: line("If stress feels unrelenting or affects your health, reach out for support.", "ئەگەر بەردەوامە یان کاریگەری لەسەر تەندروستی کرد.")
    },
    burnout: {
      title: line("Burnout", "بەرنئاوت"),
      feel: line("Exhaustion, cynicism, feeling ineffective, emotional depletion.", "مەترسیداری، بێ هیوا، هەست بە کەم ئەنجام، کەمبوونەوەی هەست."),
      why: line("Prolonged high demand with insufficient recovery.", "داوای درێژ بە پشووی کەم."),
      worse: line("Pushing harder without rest, ignoring boundaries, self-blame.", "زۆر هەوڵ بەبێ پشوو، سنوور نەدان، خۆت تۆمەتبارکردن."),
      help: line("Recovery blocks, reducing load where possible, reconnecting to meaning in small ways.", "کاتی چاکبوونەوە، کەمکردنەوەی بار، پەیوەندی بچووک بە واتا."),
      ignore: line("Complete inability to function or feeling hopeless about work/life—seek professional help.", "نەتوانین یان بێ هیوایی تەواو."),
      takeaway: line("Burnout is often about conditions, not only personal grit.", "زۆرجار دەربارەی بارودۆخە، نەک تەنها توانای تایبەت."),
      myth: line("“Push through until it passes.”", "«بەردەوام بە تا تێپەڕێت»"),
      fact: line("Recovery usually requires real rest and systemic changes—not only willpower.", "چاکبوونەوە پشوو و گۆڕان دەوێت."),
      pro: line("A therapist can help you rebuild sustainable pacing.", "چارەسەرزان یارمەتی پێشێلکردنەوەی بەردەوام دەدات.")
    },
    overthinking: {
      title: line("Overthinking", "زۆر بیرکردنەوە"),
      feel: line("Mental loops, trouble deciding, replaying conversations, “what if” spirals.", "سوڕانەوەی بیر، قورسی بڕیار، دووبارەکردنەوەی قسەکان."),
      why: line("Your brain may be trying to feel safe by seeking certainty.", "مێشک هەوڵ دەدات بە دڵنیایی ئاسوودە بێت."),
      worse: line("Reassurance-seeking without limits, rumination at night, self-criticism for overthinking.", "پرسیاری بێ کۆتایی، بیرکردنەوەی شەو، خۆت تۆمەتبارکردن."),
      help: line("Time-box worries, grounding, behavioral experiments, compassionate self-talk.", "کاتی دیاریکراو بۆ نیگەران، زەمینکردنەوە، تاقیکردنەوە، قسەی میهرەبانانە."),
      ignore: line("If thoughts become frightening and hard to redirect, consider professional support.", "ئەگەر بیرەکان ترسناک بن و ناگۆڕدرێن."),
      takeaway: line("You can train attention gently—without forcing your mind to be “quiet.”", "سەرنج ڕاهێنان دەکرێت بە نەرمی."),
      myth: line("“Just stop thinking about it.”", "«تەنها وەستە لە بیرکردنەوە»"),
      fact: line("Brains learn through repetition; new habits replace old loops gradually.", "مێشک بە دووبارە فێر دەبێت."),
      pro: line("Therapy like CBT can offer structured skills for rumination.", "CBT دەتوانێت توانای ڕێکخراو بدات.")
    },
    panic: {
      title: line("Panic sensations", "هەستی پانیک"),
      feel: line("Sudden heart racing, dizziness, breathlessness, fear of losing control.", "خێرایی دڵ، سەرسوڕمان، هەناسە کورت، ترس لە کۆنترۆڵ."),
      why: line("A surge of sympathetic activation—often harmless but very uncomfortable.", "بەرزبوونەوەی چالاکی دەماغی—زۆرجار مەترسیدار نییە بەڵام ناڕاحەتە."),
      worse: line("Fighting the sensations, hyper-focusing on heart rate, avoiding all triggers.", "شەڕکردن لەگەڵ هەست، دوورکەوتنەوەی تەواو."),
      help: line("Label it (“my body is alarmed”), slow exhale, grounding, remind yourself it can pass.", "ناونان، هەناسەی درێژ، زەمینکردنەوە."),
      ignore: line("Chest pain or symptoms that feel new—get medically checked if unsure.", "ئەگەر سینە ئازار یان نیشانەی نوێیە پزیشک ببینە."),
      takeaway: line("Sensations can be intense without meaning you are in immediate danger.", "هەست بەهێز دەبێت بەبێ مەترسی سەرەڕاست."),
      myth: line("“Panic means you are losing your mind.”", "«پانیک واتا دەماغت دەچێت»"),
      fact: line("Panic episodes are common and treatable with skills and sometimes professional care.", "باوە و چارەسەر دەکرێت."),
      pro: line("If episodes escalate or avoid life areas, seek evaluation from a licensed clinician.", "ئەگەر ژیان دەگرێتەوە، پزیشک ببینە.")
    },
    lowMood: {
      title: line("Low mood patterns", "شێوازی کەمبوونەوەی هەست"),
      feel: line("Heaviness, low motivation, numbness, tearfulness, or feeling “flat.”", "قورسی، کەم هاندان، بێدەنگی، گریان، یان بێ هەستی."),
      why: line("Stress, loss, sleep disruption, isolation, or biochemical factors may contribute.", "سترێس، لەدەستدان، خەو، تەنهایی، یان هۆکاری جەستەیی."),
      worse: line("Isolation, harsh self-talk, skipping basics like food and light.", "تەنهایی، قسەی توند، نەخواردن."),
      help: line("Tiny actions, connection, sunlight, routine, self-compassion.", "کرداری بچووک، پەیوەندی، ڕووناکی، روتین."),
      ignore: line("Thoughts of self-harm or hopelessness—seek urgent professional/crisis support.", "بیری خۆزێنانی یان بێ هیوایی—فوری پشتیوانی."),
      takeaway: line("Low mood can be a signal to slow down and seek support—not proof you are broken.", "کەم هەست ئاگادارییە، نەک تێکشکاندن."),
      myth: line("“You should just be grateful.”", "«دەبێت سوپاسگوزار بیت»"),
      fact: line("Gratitude can help, but it doesn’t replace rest, care, or treatment when needed.", "سوپاس یارمەتی دەدات بەڵام جێگەی چاودێری نییە."),
      pro: line("Persistent low mood warrants a conversation with a licensed professional.", "بەردەوامی پێویستی بە قسەی پسپۆڕە.")
    },
    regulation: {
      title: line("Emotional regulation", "ڕێکخستنەوەی هەست"),
      feel: line("Big swings, shutting down, snapping, or feeling “too much.”", "گۆڕان بەرز، داخستن، تووڕەیی."),
      why: line("Overload, unmet needs, learned coping from childhood, or chronic stress.", "بار، پێویستی جێبەجێنەکراو، فێربوونی کۆن."),
      worse: line("Self-judgment during emotions, bottling up without outlets.", "حوکم لەسەر خۆت، هەڵگرتنی هەست."),
      help: line("Name emotions, reduce shame, use tools after—not during—peak flooding when possible.", "ناونانی هەست، کەمکردنەوەی شەرم، ئامراز دواتر."),
      ignore: line("Frequent emotional explosions hurting relationships or safety.", "تەقینەوەی زۆر کە زیان بە پەیوەندی دەگەیەنێت."),
      takeaway: line("Regulation is a skill set—not a personality flaw.", "توانای فێربوونە."),
      myth: line("“Feelings should be logical.”", "«هەست ڕێک و پێکیان هەبێت»"),
      fact: line("Emotions carry information; skills help you respond rather than react only.", "هەست زانیارییە."),
      pro: line("DBT-informed skills training can help with intense emotion patterns.", "DBT یارمەتی دەدات.")
    },
    selfEsteem: {
      title: line("Self-esteem", "خۆڕێزایی"),
      feel: line("Self-doubt, comparison, feeling “not enough.”", "گومان، بەراوردکردن، «پێویست نیم»."),
      why: line("Past feedback, perfectionism, social media, or conditional acceptance.", "فیدبەکی کۆن، تەواوکاری، میدیا."),
      worse: line("Avoidance, reassurance loops, tying worth to productivity.", "دوورکەوتنەوە، بەهای تەنها بە بەرهەم."),
      help: line("Values-based actions, compassionate self-talk, evidence lists, boundaries.", "کردار بەپێی بەها، قسەی میهرەبانانە، سنوور."),
      ignore: line("Persistent self-hatred or hopelessness—professional support is important.", "خۆڕەقی بەردەوام."),
      takeaway: line("Worth is not earned only by achievement.", "بەها تەنها بە سەرکەوتن نییە."),
      myth: line("“Confidence comes first, then action.”", "«سەرەتا متمانە، دواتر کردار»"),
      fact: line("Often confidence follows small repeated brave actions.", "زۆرجار متمانە دوای کرداری بچووک دێت."),
      pro: line("Therapy can address core beliefs safely.", "چارەسەر یارمەتی بیرۆکە بنەڕەتییەکان دەدات.")
    },
    boundaries: {
      title: line("Boundaries", "سنوورەکان"),
      feel: line("Resentment, fatigue, feeling used, or guilt when saying no.", "تووڕەیی، ماندوویی، هەست بە بەکارهێنان، تاوانبار وەنیە."),
      why: line("You may have learned to prioritize harmony over needs.", "لەوانەیە هاوسەنگی لەسەر پێویست بێت."),
      worse: line("Over-explaining, soft no’s that aren’t heard, self-blame.", "زۆر ڕوونکردنەوە، نەخێرەی نەرم کە ناگوێزرێتەوە."),
      help: line("Clear, kind sentences; delay tactics; practice with lower-stakes requests first.", "ڕوونی نەرم؛ دواکەوتن؛ ڕاهێنان."),
      ignore: line("Threats or coercion—safety first; seek help.", "هەڕەشە—سەرەتا سەلامەتی."),
      takeaway: line("Boundaries protect connection by reducing resentment.", "سنوور پەیوەندی پارێزن."),
      myth: line("“Boundaries are selfish.”", "«سنوور خۆپەرستییە»"),
      fact: line("They are a form of honesty that allows healthier relationships.", "ڕاستگۆیییە بۆ پەیوەندی تەندروستتر."),
      pro: line("If setting boundaries feels unsafe, professional support can help you plan.", "ئەگەر نائەمنە، پسپۆڕ یارمەتی دەدات.")
    },
    peoplePleasing: {
      title: line("People pleasing", "ڕازیبوون بە زۆر کەس"),
      feel: line("Overcommitment, anxiety about disapproval, losing your preferences.", "زۆر بەستەر، نیگەرانی لە ڕەخنە."),
      why: line("A learned strategy to stay safe or liked.", "ستراتیژی فێربووی پارێزگاری."),
      worse: line("Saying yes while resentful, avoiding conflict at all costs.", "بەڵێ لە کاتی تووڕەییدا."),
      help: line("Small honest nos, values sorting, tolerating discomfort in service of care.", "نەخێرەی بچووک، بەها، قبوڵکردنی ناڕاحەتی بچووک."),
      ignore: line("Relationships that punish your needs consistently.", "پەیوەندی کە پێویستی سزادەدات."),
      takeaway: line("Kindness includes kindness to yourself.", "میهرەبانی بۆ خۆتش دەگرێتەوە."),
      myth: line("“If I’m nice enough, I’ll be safe.”", "«ئەگەر نەرم بم سەلامەتم»"),
      fact: line("Safety also requires discernment and limits.", "سەلامەتی پێویستی بە سنوور هەیە."),
      pro: line("Therapy can unpack guilt patterns without shaming you.", "چارەسەر تاوانبار ناکات.")
    },
    grief: {
      title: line("Grief", "غەم"),
      feel: line("Waves of sadness, anger, numbness, longing, guilt.", "غەم، تووڕەیی، بێ هەست، ئارەزوو، تاوانبار."),
      why: line("Love and attachment when something ends or changes.", "خۆشەویستی کاتێک شت کۆتایی دێت."),
      worse: line("Invalidation (“move on”), isolation, using substances to numb.", "پشتڕەکردنەوە، تەنهایی."),
      help: line("Rituals, storytelling, rest, community, gentle timelines.", "ئایین، چیرۆک، پشوو، کۆمەڵ."),
      ignore: line("Inability to function, self-harm ideation—seek urgent support.", "نەتوانین یان بیری زیان—فوری."),
      takeaway: line("Grief is not linear; your pace deserves respect.", "غەم هێڵی ڕاست نییە."),
      myth: line("“You should be over it by now.”", "«دەبێت تێپەڕیبووایت»"),
      fact: line("Healing can coexist with missing; both are human.", "چاکبوون و لەدەستدان هەردووکیان مرۆڤانەن."),
      pro: line("Grief counseling or support groups can help.", "ڕاوێژکاری یان گروپ یارمەتی دەدات.")
    },
    traumaInformed: {
      title: line("Trauma-informed basics", "بنەمای زانیاری لە تروما"),
      feel: line("Hypervigilance, numbness, flash feelings, difficulty trusting.", "ئاگاداری بەرز، بێ هەست، ترس، قورسی متمانە."),
      why: line("The nervous system adapted to survive overwhelming experiences.", "سیستەم خۆی ڕێکخست بۆ مانەوە."),
      worse: line("Self-blame, rushing exposure, ignoring safety.", "خۆت تۆمەت، خێرایی، پشتگوێخستنی سەلامەتی."),
      help: line("Safety first, choice, pacing, grounding, professional support when ready.", "سەرەتا سەلامەتی، هەڵبژاردن، هەنگاو، زەمینکردنەوە."),
      ignore: line("If you feel unsafe with yourself or others, prioritize real-world help.", "نائەمنی—یارمەتی ڕاستەقینە."),
      takeaway: line("Healing emphasizes safety and autonomy—not forcing “resilience.”", "چاکبوون سەلامەتی و ئازادی دەگرێتەوە."),
      myth: line("“Just face your past head-on.”", "«ڕووبەڕووی ڕابردوو ببە»"),
      fact: line("Gradual, consented approaches tend to be safer than pressure.", "هەنگاو بە هەڵبژاردن ئاسوودەترە."),
      pro: line("Trauma-informed therapy is specialized; seek licensed clinicians.", "چارەسەری تایبەت پێویستە.")
    },
    sleep: {
      title: line("Sleep & mental health", "خەو و دەروون"),
      feel: line("Irritability, brain fog, anxiety spikes, low mood after poor sleep.", "تووڕەیی، مێشک تار، نیگەرانی، کەم هەست."),
      why: line("Sleep regulates mood and stress physiology.", "خەو دەروون و سترێس ڕێکدەخات."),
      worse: line("Late caffeine, screens in bed, irregular schedule, rumination at night.", "قهوەی درەنگ، شاشە، ناڕێک، بیر شەو."),
      help: line("Wind-down routine, light exposure daytime, consistent wake time, calming inputs.", "روتین بەرەو خەو، ڕووناکی بەیانی، هەمان کاتی هەستان."),
      ignore: line("Severe insomnia for weeks—consider medical evaluation.", "نەخۆشی خەو هەفتەکان."),
      takeaway: line("Sleep is a foundation—not a luxury.", "خەو بنەڕەتە."),
      myth: line("“I can catch up on weekends.”", "«هەفتەی کۆتایی دەتوانم»"),
      fact: line("Regularity often matters as much as duration.", "ڕێکخستن وەک درێژی گرنگە."),
      pro: line("CBT-I is an evidence-based insomnia treatment.", "CBT-I چارەسەری زانستییە.")
    },
    socialOverwhelm: {
      title: line("Social overwhelm", "بارگاوی کۆمەڵایەتی"),
      feel: line("Drained after interactions, dreading plans, needing long recovery.", "کەمبوونەوە دوای قسە، ترس لە پلان، پشووی درێژ پێویستە."),
      why: line("Sensory load, masking, or high empathy without recovery.", "بار هەستیاری، دەموچاو، هەستیاری بەرز."),
      worse: line("Overbooking, ignoring introvert needs, self-judgment for needing rest.", "زۆر پلان، خۆت تۆمەت بۆ پشوو."),
      help: line("Planned recovery, smaller gatherings, honest pacing, sensory tools.", "پشووی پلانکراو، کۆمەڵ بچووکتر."),
      ignore: line("Complete withdrawal from all support—balance matters.", "تەواوی تەنهایی—هاوسەنگی گرنگە."),
      takeaway: line("Needing recovery after social time is not a flaw.", "پشوو دوای کۆمەڵ کەموکورتی نییە."),
      myth: line("“You should enjoy every social event.”", "«دەبێت هەموو بەستەر حەز بکەیت»"),
      fact: line("Capacity varies by season, stress, and neurobiology.", "توانا بە کات جیاوازە."),
      pro: line("If social anxiety blocks goals, exposure-based therapy can help.", "ترسی کۆمەڵایەتی—چارەسەر یارمەتی دەدات.")
    },
    perfectionism: {
      title: line("Perfectionism", "تەواوکاری"),
      feel: line("Never “done,” fear of mistakes, procrastination, harsh self-review.", "هەرگیز تەواو نا، ترس لە هەڵە، دواکەوتن."),
      why: line("Often linked to fear of judgment or conditional worth.", "ترس لە حوکم یان بەهای مەرجدار."),
      worse: line("All-or-nothing thinking, avoidance, comparing to idealized standards.", "هەموو یان هیچ، دوورکەوتنەوە."),
      help: line("Good-enough goals, time limits, self-compassion, process praise.", "ئامانجی باش، کات، میهرەبانی."),
      ignore: line("Self-punishment spirals affecting safety—seek support.", "سزادانی خۆت."),
      takeaway: line("Excellence can coexist with humanity.", "تەواوکاری و مرۆڤایەتی هەردووک."),
      myth: line("“Perfectionism is my strength.”", "«تەواوکاری بەهێزم دەکات»"),
      fact: line("It often costs creativity, rest, and relationships over time.", "زۆرجار دەستەوەی دەکات."),
      pro: line("Therapy can soften rigid standards compassionately.", "چارەسەر ستاندارد نەرم دەکات.")
    },
    nervousSystem: {
      title: line("Nervous system regulation", "ڕێکخستنەوەی سیستەمی دەماغی"),
      feel: line("On edge, shut down, or swinging between both.", "لەسەر لێوە، داخراو، یان هەردووک."),
      why: line("Stress load, trauma history, sleep debt, sensory overload.", "بار، مێژوو، قەرزی خەو."),
      worse: line("Ignoring body signals, pushing through constantly.", "پشتگوێخستنی جەستە."),
      help: line("Breathing, movement, warmth, rhythm, safe connection, reducing shame.", "هەناسە، جوڵە، گەرمی، ڕیتم."),
      ignore: line("Persistent panic-like symptoms—rule out medical causes if new.", "نیشانەی نوێ—پزیشک."),
      takeaway: line("Regulation is practice, not perfection.", "ڕاهێنانە نەک تەواوکاری."),
      myth: line("“Calm down instantly.”", "«خێرا ئارام بە»"),
      fact: line("The body often needs minutes, not seconds.", "خولەک پێویستە نەک چرکە."),
      pro: line("Somatic-informed therapists can help with body-based skills.", "چارەسەری جەستەیی یارمەتی دەدات.")
    },
    loneliness: {
      title: line("Loneliness", "تەنهایی"),
      feel: line("Empty, unseen, disconnected even around people.", "بەتاڵ، نەبینراو، بێ پەیوەندی."),
      why: line("Life transitions, mismatch of needs, social anxiety, or geography.", "گۆڕان، ناهاوسەنگی، ترس، جوگرافیا."),
      worse: line("Shame spirals, withdrawal, comparing to curated online lives.", "شەرم، دەرکەوتن، بەراورد."),
      help: line("Small connection steps, shared interests, volunteering, professional support.", "هەنگاوی بچووک، هاوبەش، داواکاری."),
      ignore: line("Deep hopelessness—reach out urgently.", "بێ هیوایی قووڵ."),
      takeaway: line("Loneliness is a signal to connect—not proof you are unlovable.", "ئاگادارییە بۆ پەیوەندی."),
      myth: line("“Being alone means you failed socially.”", "«تەنها واتا شکست»"),
      fact: line("Many people struggle quietly; compassion matters.", "زۆر کەس بە نهێنی دەتکێشێت."),
      pro: line("Group therapy or community programs can reduce isolation.", "گروپ یارمەتی دەدات.")
    },
    caregiving: {
      title: line("Caregiving burnout", "بەرنئاوتی چاودێری"),
      feel: line("Guilt when resting, resentment, fatigue, feeling unseen.", "تاوانبار بۆ پشوو، تووڕەیی، ماندوویی."),
      why: line("Chronic responsibility with limited recovery.", "بەرپرسیاری بەردەوام بە پشووی کەم."),
      worse: line("Martyrdom narratives, no support network, ignoring health basics.", "چیرۆکی قوربانی، بێ تۆڕ."),
      help: line("Micro-rest, delegating, boundaries, professional respite resources.", "پشووی بچووک، هاوبەش، سنوور."),
      ignore: line("Complete depletion or resentment harming care—seek help.", "تەواوی تێکچوون."),
      takeaway: line("Sustainable care includes caring for the caregiver.", "چاودێری بەردەوام چاودێری خۆی تێدایە."),
      myth: line("“If I love them, I should never need a break.”", "«ئەگەر خۆشم بوێت نابێت پشوم پێویست بێت»"),
      fact: line("Breaks can improve presence and safety for everyone.", "پشوو ئامادەگی باشتر دەکات."),
      pro: line("Caregiver support groups and therapy exist for a reason.", "گروپ و چارەسەر هەیە.")
    },
    attachment: {
      title: line("Attachment patterns", "شێوازەکانی پەیوەستبوون"),
      feel: line("Anxious chasing, avoidant withdrawal, or mixed signals in closeness.", "نیگەرانی زۆر، دوورکەوتنەوە، یان تێکەڵ."),
      why: line("Early relationships shape expectations—not destiny, but influence.", "پەیوەندی کۆن چاوەڕوانی دەگۆڕێت."),
      worse: line("Mind-reading, protest behaviors without repair, self-blame loops.", "خوێندنەوەی مێشک، خۆت تۆمەت."),
      help: line("Clear communication, repair attempts, boundaries, therapy for patterns.", "ڕوونکردنەوە، چاککردنەوە، سنوور."),
      ignore: line("Unsafe relationships—prioritize safety over “fixing.”", "پەیوەندی نائەمن."),
      takeaway: line("Patterns can shift with awareness and consistent practice.", "شێواز دەگۆڕدرێت بە ئاگاداری."),
      myth: line("“Attachment style is fixed forever.”", "«هەمیشە هەمانە»"),
      fact: line("Neuroplasticity and relationships can support change over time.", "گۆڕان لە کاتدا دەبێت."),
      pro: line("A therapist can help you explore attachment safely.", "چارەسەر بە ئاسوودەیی دەگەڕێت.")
    }
  };
}

const LEARN_DATA = buildLearnData();

const TRACK_KEY = "mh_track_v1";
function loadTrack() {
  try {
    return JSON.parse(localStorage.getItem(TRACK_KEY) || '{"entries":[],"streak":0,"last":""}');
  } catch {
    return { entries: [], streak: 0, last: "" };
  }
}
function saveTrack(data) {
  localStorage.setItem(TRACK_KEY, JSON.stringify(data));
}

const JOURNAL_PROMPTS = {
  en: {
    anxiety: ["What am I afraid might happen—and what is actually in my control?", "If my body is alarmed, what is one gentle next step?"],
    burnout: ["Where am I giving from an empty cup?", "What would ‘enough for today’ look like?"],
    worth: ["What would I tell a friend who felt this way?", "What evidence shows I am more than this moment?"],
    reflection: ["What felt heavy today—and what felt even slightly lighter?", "What need went unmet?"],
    grief: ["What do I miss—and what do I want to remember?", "What support would feel kind right now?"]
  },
  ku: {
    anxiety: ["ترس لە چی ڕوودەدات—چی لە کۆنترۆڵمدایە؟", "ئەگەر جەستە ئاگادارە، یەک هەنگاوی نەرم چییە؟"],
    burnout: ["لەکوێ لە کوپێکی بەتاڵ دەدەم؟", "«بۆ ئەمڕۆ بەسە» چۆن دەردەکەوێت؟"],
    worth: ["بۆ هاوڕێکەم چی دەمگوت؟", "چی دەریدەخات من تەنها ئەم کاتە نیم؟"],
    reflection: ["ئەمڕۆ چی قورس بوو—چی کەمێک سووکتر؟", "کام پێویست جێبەجێ نەبوو؟"],
    grief: ["چی لەدەست دەدەم—چی دەمەوێت بیری لێ بکەمەوە؟", "ئێستا کام پشتیوانی نەرم دەتوانێت بێت؟"]
  }
};

function renderQuiz() {
  const root = $("quizRoot");
  const bar = $("quizProgressBar");
  const res = $("quizResult");
  const n = QUIZ_Q[state.lang].length;
  if (!root || !bar) return;
  if (state.quizAnswers.length === n && state.quizStep >= n) {
    root.innerHTML = "";
    bar.style.width = "100%";
    res.classList.remove("hidden");
    const r = buildQuizResult();
    res.innerHTML = `
      <p class="mini muted">${tr("notDiag")}</p>
      <h4 style="margin:0.75rem 0 0.35rem;font-family:var(--font-display)">${tr("resultTitle")}</h4>
      <div class="result-block"><h4>${tr("patternsLabel")}</h4><p>${r.patterns.map((p) => `• ${p}`).join("<br/>")}</p></div>
      <div class="result-block"><h4>${tr("blockWhat")}</h4><p>${r.what}</p></div>
      <div class="result-block"><h4>${tr("blockFeel")}</h4><p>${r.feel}</p></div>
      <div class="result-block"><h4>${tr("blockNow")}</h4><ul>${r.now.map((x) => `<li>${x}</li>`).join("")}</ul></div>
      <div class="result-block"><h4>${tr("blockWeek")}</h4><ul>${r.week.map((x) => `<li>${x}</li>`).join("")}</ul></div>
      <div class="result-block"><h4>${tr("blockSeek")}</h4><p>${r.seek}</p></div>
      <p class="support-card mini">“${r.quote}” — NSM</p>
      <button type="button" class="btn ghost mt" id="quizAgain">${tr("quizRetake")}</button>`;
    $("quizAgain").onclick = () => {
      state.quizStep = 0;
      state.quizAnswers = [];
      res.classList.add("hidden");
      renderQuiz();
      renderDashboard();
    };
    return;
  }
  const i = state.quizStep;
  const Q = QUIZ_Q[state.lang][i];
  bar.style.width = `${((i + 1) / n) * 100}%`;
  res.classList.add("hidden");
  const sel = state.quizAnswers[i];
  root.innerHTML = `<div class="quiz-step"><p class="field-label">${Q.t}</p>
    <div class="option-grid">${Q.o.map((_, j) => `<button type="button" class="option-btn${sel === j ? " selected" : ""}" data-o="${j}">${Q.o[j]}</button>`).join("")}</div></div>
    <div class="quiz-nav">
      ${i > 0 ? `<button type="button" class="btn ghost" id="qb">${tr("quizBack")}</button>` : ""}
      <button type="button" class="btn primary" id="qn" ${sel === undefined ? "disabled" : ""}>${i === n - 1 ? tr("quizSubmit") : tr("quizNext")}</button>
    </div>`;
  root.querySelectorAll(".option-btn").forEach((b) => {
    b.onclick = () => {
      const j = parseInt(b.dataset.o, 10);
      state.quizAnswers[i] = j;
      while (state.quizAnswers.length > i + 1) state.quizAnswers.pop();
      renderQuiz();
    };
  });
  const qn = $("qn");
  if ($("qb")) $("qb").onclick = () => { state.quizStep = Math.max(0, i - 1); renderQuiz(); };
  qn.onclick = () => {
    if (state.quizAnswers[i] === undefined) return;
    if (i < n - 1) state.quizStep = i + 1;
    else {
      state.quizStep = n;
      softConfetti();
    }
    renderQuiz();
    renderDashboard();
  };
}

function renderLearn() {
  const list = $("learnTopicList");
  const q = ($("learnSearch").value || "").toLowerCase();
  const topics = Object.keys(LEARN_DATA).filter((id) => {
    const d = LEARN_DATA[id];
    const title = (state.lang === "en" ? d.title.en : d.title.ku).toLowerCase();
    return !q || title.includes(q) || id.includes(q);
  });
  list.innerHTML = topics.map((id) => {
    const d = LEARN_DATA[id];
    const t = state.lang === "en" ? d.title.en : d.title.ku;
    const prev = state.lang === "en" ? d.feel.en : d.feel.ku;
    return `<details data-topic="${id}"><summary>${t}</summary><div class="topic-preview">${prev.slice(0, 160)}…</div>
      <button type="button" class="btn soft topic-open" data-open="${id}">${tr("learnOpen")}</button></details>`;
  }).join("");
  list.querySelectorAll("[data-open]").forEach((b) => { b.onclick = () => openTopicModal(b.dataset.open); });
}

function openTopicModal(id) {
  const d = LEARN_DATA[id];
  if (!d) return;
  $("modalTitle").textContent = state.lang === "en" ? d.title.en : d.title.ku;
  const S = (a) => (state.lang === "en" ? a.en : a.ku);
  $("modalBody").innerHTML = `
    <section><h4>${tr("secFeel")}</h4><p>${S(d.feel)}</p></section>
    <section><h4>${tr("secWhy")}</h4><p>${S(d.why)}</p></section>
    <section><h4>${tr("secWorse")}</h4><p>${S(d.worse)}</p></section>
    <section><h4>${tr("secHelp")}</h4><p>${S(d.help)}</p></section>
    <section><h4>${tr("secIgnore")}</h4><p>${S(d.ignore)}</p></section>
    <section><h4>${tr("secTake")}</h4><p>${S(d.takeaway)}</p></section>
    <section><h4>${tr("secMyth")}</h4><p><strong>${state.lang === "en" ? "Myth" : "میت"}:</strong> ${S(d.myth)}<br/><strong>${state.lang === "en" ? "Fact" : "ڕاستی"}:</strong> ${S(d.fact)}</p></section>
    <section><h4>${tr("secPro")}</h4><p>${S(d.pro)}</p></section>`;
  $("topicModal").classList.remove("hidden");
}

function renderBreath() {
  const pick = $("breathPicker");
  const root = $("breathTool");
  const L = state.lang === "en";
  const modes = [
    { id: "box", en: "Box (4-4-4-4)", ku: "بۆکس ٤-٤-٤-٤" },
    { id: "46", en: "4-6 breathing", ku: "٤-٦" },
    { id: "calm", en: "Calm count", ku: "ژماردنی ئارام" }
  ];
  pick.innerHTML = modes.map((m) => `<button type="button" class="chip-sm${state.breathMode === m.id ? " active" : ""}" data-bm="${m.id}">${L ? m.en : m.ku}</button>`).join("");
  pick.querySelectorAll("[data-bm]").forEach((b) => {
    b.onclick = () => { state.breathMode = b.dataset.bm; renderBreath(); };
  });
  let phase = L ? "Tap start" : "دەستپێکردن";
  root.innerHTML = `<div class="breath-circle" id="breathCircle"><span id="breathPhase">${phase}</span></div>
    <p class="mini muted" style="text-align:center">${L ? "Inhale / hold / exhale cues will cycle." : "هەناسە و ڕاگرتن دەسوڕێتەوە."}</p>
    <div style="text-align:center"><button type="button" class="btn primary" id="breathGo">${state.breathRunning ? tr("stopBreath") : tr("startBreath")}</button></div>`;
  $("breathGo").onclick = () => {
    if (state.breathRunning) {
      clearInterval(state.breathTimer);
      state.breathTimer = null;
      state.breathRunning = false;
      renderBreath();
      return;
    }
    state.breathRunning = true;
    const c = $("breathCircle");
    const ph = $("breathPhase");
    const seq = state.breathMode === "box"
      ? [L ? "Inhale 4" : "هەناسە ٤", L ? "Hold 4" : "ڕاگرتن ٤", L ? "Exhale 4" : "دەرهێنە ٤", L ? "Hold 4" : "ڕاگرتن ٤"]
      : state.breathMode === "46"
        ? [L ? "Inhale 4" : "هەناسە ٤", L ? "Exhale 6" : "دەرهێنە ٦"]
        : [L ? "In 4" : "٤", L ? "Out 6" : "٦"];
    let i = 0;
    c.classList.add("inhale");
    ph.textContent = seq[0];
    $("breathGo").textContent = tr("stopBreath");
    const ms = state.breathMode === "box" ? 4000 : 5000;
    state.breathTimer = setInterval(() => {
      i = (i + 1) % seq.length;
      ph.textContent = seq[i];
    }, ms);
  };
}

function renderGround() {
  const pick = $("groundPicker");
  const root = $("groundTool");
  const L = state.lang === "en";
  const modes = [
    { id: "54321", en: "5-4-3-2-1", ku: "٥-٤-٣-٢-١" },
    { id: "orient", en: "Orienting", ku: "ئاڕاستەکردن" },
    { id: "safe", en: "Safe naming", ku: "ناونانی ئاسوودە" },
    { id: "sense", en: "Sensory", ku: "هەست" }
  ];
  pick.innerHTML = modes.map((m) => `<button type="button" class="chip-sm${state.groundMode === m.id ? " active" : ""}" data-gm="${m.id}">${L ? m.en : m.ku}</button>`).join("");
  pick.querySelectorAll("[data-gm]").forEach((b) => {
    b.onclick = () => { state.groundMode = b.dataset.gm; renderGround(); };
  });
  const blocks = {
    "54321": L
      ? ["5 things you see", "4 you feel", "3 you hear", "2 you smell", "1 you taste"]
      : ["٥ شت دەبینیت", "٤ هەست دەکەیت", "٣ دەبیستیت", "٢ بۆن دەکەیت", "١ تام"],
    orient: L ? ["Name today’s date", "Name the room you’re in", "Press feet into floor"] : ["ڕۆژ، مانگ", "ناوی ژوور", "پێ لە زەوی"],
    safe: L ? ["Name one object that feels steady", "Describe its color and texture"] : ["یەک شتی جێگیر", "ڕەنگ و تێکست"],
    sense: L ? ["Hold something cool or warm 30s", "Notice one neutral sound"] : ["شتی سارد یان گەرم ٣٠ چرکە", "دەنگێکی نێوندی"]
  };
  const key = state.groundMode === "54321" ? "54321" : state.groundMode;
  const lines = blocks[key] || blocks["54321"];
  root.innerHTML = lines.map((t) => `<div class="ground-step">${t}</div>`).join("");
}

function renderReframe() {
  const L = state.lang === "en";
  $("reframeTool").innerHTML = `<div class="reframe-grid">
    <label>${L ? "Situation" : "بارودۆخ"}</label><input id="rfS" type="text" />
    <label>${L ? "Automatic thought" : "بیرێکی خۆکار"}</label><input id="rfT" type="text" />
    <label>${L ? "Emotion (name intensity 0–10)" : "هەست (٠–١٠)"}</label><input id="rfE" type="text" />
    <label>${L ? "Evidence for" : "بەڵگە بۆ"}</label><textarea id="rfF"></textarea>
    <label>${L ? "Evidence against" : "بەڵگە دژ"}</label><textarea id="rfA"></textarea>
    <label>${L ? "More balanced thought" : "بیرێکی هاوسەنگتر"}</label><textarea id="rfB"></textarea>
    </div><button type="button" class="btn soft mt" id="rfSave">${L ? "Save to notes (local)" : "پاشەکەوت (ناوخۆ)"}</button>
    <p id="rfMsg" class="mini muted mt"></p>`;
  $("rfSave").onclick = () => {
    const pack = { s: $("rfS").value, t: $("rfT").value, e: $("rfE").value, f: $("rfF").value, a: $("rfA").value, b: $("rfB").value };
    localStorage.setItem("mh_reframe", JSON.stringify(pack));
    $("rfMsg").textContent = L ? "Saved on this device." : "پاشەکەوت کرا.";
  };
}

function renderJournal() {
  const L = state.lang === "en";
  const cats = ["anxiety", "burnout", "worth", "reflection", "grief"];
  $("journalTool").innerHTML = `<div class="chip-row">${cats.map((c) => `<button type="button" class="chip-sm${state.journalCat === c ? " active" : ""}" data-jc="${c}">${c}</button>`).join("")}</div>
    <div class="journal-box" id="jprompt"></div>
    <button type="button" class="btn soft" id="jnext">${tr("nextPrompt")}</button>`;
  const prompts = JOURNAL_PROMPTS[state.lang][state.journalCat] || JOURNAL_PROMPTS.en.anxiety;
  const ix = Math.floor(Math.random() * prompts.length);
  $("jprompt").textContent = prompts[ix];
  $("journalTool").querySelectorAll("[data-jc]").forEach((b) => {
    b.onclick = () => { state.journalCat = b.dataset.jc; renderJournal(); };
  });
  $("jnext").onclick = () => renderJournal();
}

function renderPMR() {
  const L = state.lang === "en";
  const steps = L
    ? ["Tense shoulders 5s, release", "Hands fists 5s, release", "Jaw tight 5s, release", "Stomach tense 5s, release", "Notice overall softness"]
    : ["شان ٥ چرکە، ئارام", "مۆق ٥ چرکە، ئارام", "چەگەڵ ٥ چرکە، ئارام", "سک ٥ چرکە، ئارام", "هەست بە نەرمی"];
  $("pmrTool").innerHTML = steps.map((s) => `<div class="pmr-step">${s}</div>`).join("");
}

function renderNeed() {
  const L = state.lang === "en";
  const opts = [
    { t: L ? "Water / snack" : "ئاو / خواردن", a: L ? "Hydrate gently." : "ئاو بە نەرمی." },
    { t: L ? "Rest" : "پشوو", a: L ? "Lie down 5–10 min." : "٥–١٠ خولەک." },
    { t: L ? "Connection" : "پەیوەندی", a: L ? "One message to someone safe." : "یەک پەیام." },
    { t: L ? "Movement" : "جوڵە", a: L ? "Walk or stretch briefly." : "مەشێ یان ڕاکێشان." }
  ];
  $("needTool").innerHTML = `<p class="mini">${L ? "Tap what fits—small is valid." : "دەست بدە—بچووک دروستە."}</p>
    <div class="chip-row">${opts.map((o, i) => `<button type="button" class="chip-sm" data-nd="${i}">${o.t}</button>`).join("")}</div>
    <div id="needOut" class="support-card mt mini"></div>`;
  $("needTool").querySelectorAll("[data-nd]").forEach((b) => {
    b.onclick = () => { $("needOut").textContent = opts[parseInt(b.dataset.nd, 10)].a; };
  });
}

function renderSoothe() {
  const L = state.lang === "en";
  const items = L
    ? ["Warm drink", "Soft texture", "Low light", "Favorite scent", "Slow music", "Kind voice note"]
    : ["خواردنەوەی گەرم", "تێکستی نەرم", "ڕووناکی کەم", "بۆنی دڵخۆشکەر", "مۆسیقی هێور", "تۆمارێکی میهرەبانانە"];
  $("sootheTool").innerHTML = `<div class="track-checks">${items.map((x, i) => `<label><input type="checkbox" data-si="${i}"/> ${x}</label>`).join("")}</div>
    <p class="mini muted">${L ? "Checking items is enough—no performance needed." : "تیک هەڵبژاردن بەسە."}</p>`;
}

function renderFirstAid() {
  const L = state.lang === "en";
  $("firstAidTool").innerHTML = `<ol class="mini" style="margin:0;padding-left:1.2rem;line-height:1.7">
    <li>${L ? "Safety check: are you in immediate danger?" : "سەلامەتی: مەترسی ڕاستەوخۆ؟"}</li>
    <li>${L ? "Slow exhale ×3" : "دەرهێنە ×٣"}</li>
    <li>${L ? "Name one person you could message" : "یەک کەس بۆ پەیام"}</li>
    <li>${L ? "One tiny next step in the next 10 minutes" : "یەک هەنگاوی بچووک لە ١٠ خولەکدا"}</li>
  </ol>`;
}

function renderCrisis() {
  $("crisisNotice").innerHTML = `<div class="crisis-inner"><p>${tr("crisisBody")}</p>
    <p class="highlight-box mini">${state.lang === "en" ? "If you are not in crisis, you can still use these tools for daily support." : "ئەگەر لە قەیراندا نیت، ئامرازەکان بۆ ڕۆژانە بەردەستن."}</p></div>`;
}

function renderBurnoutMini() {
  const L = state.lang === "en";
  const qs = L
    ? ["Exhaustion most days?", "Cynicism about work/tasks?", "Focus feels reduced?"]
    : ["زۆربەی ڕۆژەکان ماندوو؟", "بێ هیوا لە کار؟", "سەرنج کەم؟"];
  $("burnoutMini").innerHTML = `<div class="chip-row">${qs.map((q, i) => `<button type="button" class="chip-sm" data-bu="${i}">${q}</button>`).join("")}</div>
    <div id="buOut" class="support-card mt mini"></div>`;
  $("burnoutMini").querySelectorAll("[data-bu]").forEach((b) => {
    b.onclick = () => {
      $("buOut").textContent = L
        ? "If several feel true, you may be experiencing burnout-like depletion. Consider rest, boundaries, and professional support—not self-blame."
        : "ئەگەر چەندێک ڕاستن، لەوانەیە کەمبوونەوە هەبێت. پشوو، سنوور، پشتیوانی پیشەیی—نە خۆت تۆمەتبارکردن.";
    };
  });
}

function renderBoundary() {
  const L = state.lang === "en";
  const scenes = [
    { id: "time", en: "Need time boundary", ku: "کات" },
    { id: "no", en: "Say no kindly", ku: "نەخێرەی نەرم" },
    { id: "space", en: "Need space", ku: "بۆشایی" }
  ];
  $("boundaryTool").innerHTML = `<div class="chip-row">${scenes.map((s) => `<button type="button" class="chip-sm" data-bs="${s.id}">${L ? s.en : s.ku}</button>`).join("")}</div>
    <pre id="bdOut" class="journal-box mini" style="white-space:pre-wrap;font-family:inherit"></pre>
    <button type="button" class="btn soft" id="bdCopy">${tr("copyBoundary")}</button>`;
  const scripts = {
    time: L ? "I care about this, and I don’t have capacity today. Can we revisit on ___?" : "گرنگمە، ئەمڕۆ توانام نییە. دەتوانین لە ___ دووبارە بکەینەوە؟",
    no: L ? "Thank you for thinking of me—I’m going to say no so I can protect my energy." : "سوپاس، بەڵام نەخێر دەڵێم بۆ پاراستنی وزە.",
    space: L ? "I need some quiet time to recharge. I’ll reach out when I’m able." : "کاتێکی هێورم پێویستە بۆ چاکبوونەوە. کاتێک توانام هەبوو دەگەمەوە."
  };
  $("boundaryTool").querySelectorAll("[data-bs]").forEach((b) => {
    b.onclick = () => { $("bdOut").textContent = scripts[b.dataset.bs]; };
  });
  $("bdCopy").onclick = () => {
    navigator.clipboard.writeText($("bdOut").textContent);
  };
}

function renderSelfTalk() {
  const L = state.lang === "en";
  $("selfTalkTool").innerHTML = `<label class="field-label">${L ? "A harsh thought you notice" : "بیرێکی توند"}</label>
    <textarea id="stIn" rows="2" style="width:100%"></textarea>
    <button type="button" class="btn primary mt" id="stGo">${L ? "Reframe with compassion" : "بە میهرەبانی دووبارە بکەوە"}</button>
    <div id="stOut" class="support-card mt mini"></div>`;
  $("stGo").onclick = () => {
    const t = ($("stIn").value || "").trim();
    $("stOut").textContent = t
      ? (L ? `A softer version might be: “This is hard, and I’m allowed to struggle without being ‘bad.’” You deserve patience while you learn.` : `وەشانێکی نەرمتر: «ئەمە قورسە، دەتوانم بەبێ ئەوەی «خراپ» بم تێکبچم.» ئارامی شایەنم کاتێک فێر دەبم.`)
      : (L ? "Write something first." : "یەکەم بنووسە.");
  };
}

function renderNsReset() {
  const root = $("nsResetTool");
  const L = state.lang === "en";
  const opts = [
    { id: "calm", en: "Calm me down", ku: "ئارامم بکە" },
    { id: "focus", en: "Help me focus", ku: "سەرنج" },
    { id: "safe", en: "Help me feel safe", ku: "ئاسوودە بم" },
    { id: "release", en: "Release tension", ku: "کش کەمەوە" }
  ];
  root.innerHTML = `<p class="mini">${L ? "Pick a state—micro-practices appear." : "دۆخ هەڵبژێرە."}</p>
    <div class="chip-row">${opts.map((o) => `<button type="button" class="chip-sm" data-ns="${o.id}">${L ? o.en : o.ku}</button>`).join("")}</div>
    <div id="nsOut" class="support-card mt mini"></div>`;
  const map = {
    calm: L ? "60s: feet on floor, exhale 6s ×5, soften jaw." : "٦٠ چرکە: پێ لە زەوی، دەرهێنە ٦ چرکە ×٥.",
    focus: L ? "10 minutes: one window task + phone away." : "١٠ خولەک: یەک کار، تەلەفۆن دوور.",
    safe: L ? "Name 3 trusted supports + one object you see." : "٣ پشتیوان + یەک شتی دەبینیت.",
    release: L ? "Shoulder rolls + unclench hands ×3." : "شان + دەست کردنەوە ×٣."
  };
  root.querySelectorAll("[data-ns]").forEach((b) => {
    b.onclick = () => { $("nsOut").textContent = map[b.dataset.ns]; };
  });
}

function renderSleepGuide() {
  const L = state.lang === "en";
  $("sleepGuideTool").innerHTML = `<ul class="mini" style="line-height:1.8;margin:0;padding-left:1.2rem">
    <li>${L ? "Dim lights 60 minutes before bed" : "کەمکردنەوەی ڕووناکی ٦٠ خولەک پێش خەو"}</li>
    <li>${L ? "Same wake time > perfect bedtime" : "هەمان کاتی هەستان > کاتی خەو"}</li>
    <li>${L ? "If mind races, write a one-line “park it” note" : "ئەگەر مێشک سوڕانەوە، یەک هێڵ بنووسە"}</li>
    <li>${L ? "Avoid shame spirals—return to breath" : "بێ شەرم—گەڕانەوە بۆ هەناسە"}</li>
  </ul>`;
}

function renderTools() {
  if (state.tab !== "tools") return;
  renderBreath();
  renderGround();
  renderReframe();
  renderJournal();
  renderPMR();
  renderNeed();
  renderSoothe();
  renderFirstAid();
  renderCrisis();
  renderBurnoutMini();
  renderBoundary();
  renderSelfTalk();
  renderNsReset();
  renderSleepGuide();
}

function computeInsights(entries) {
  const L = state.lang === "en";
  if (entries.length < 2) return [L ? "Log a few more days to see gentle patterns." : "چەند ڕۆژی تر تۆمار بکە بۆ شێواز."];
  const last = entries.slice(-7);
  const avg = (k) => last.reduce((s, e) => s + (e[k] || 0), 0) / last.length;
  const out = [];
  if (avg("sleep") < 2.5 && avg("stress") > 3) out.push(L ? "Lower sleep days appear to align with higher stress in your logs." : "ڕۆژانی کەمخەو لەگەڵ سترێسی بەرز دەچن.");
  if (avg("mood") > 3 && last.filter((e) => e.coping && e.coping.includes("ground")).length >= 2) out.push(L ? "You seem calmer on days grounding is noted." : "ڕۆژانی زەمینکردنەوە ئاسوودەترن.");
  if (avg("energy") < 2.5 && avg("stress") > 3) out.push(L ? "Energy often dips on higher-stress days—rest is data, not failure." : "وزە کەم دەبێت لە ڕۆژی سترێس—پشوو زانیارییە.");
  if (!out.length) out.push(L ? "Mood and habits look relatively steady—keep noting small changes." : "هەست و عادەت نزیک لە جێگیرن.");
  return out;
}

function renderTrack() {
  const data = loadTrack();
  const L = state.lang === "en";
  const e = data.entries[data.entries.length - 1] || {};
  const form = $("trackerForm");
  form.innerHTML = `
    <div class="slider-row"><label><span>${tr("moodLabel")}</span><span id="vMood">${e.mood ?? 3}</span></label><input type="range" id="mood" min="1" max="5" step="1" value="${e.mood ?? 3}"/></div>
    <div class="slider-row"><label><span>${tr("stressLabel")}</span><span id="vStress">${e.stress ?? 3}</span></label><input type="range" id="stress" min="0" max="5" step="1" value="${e.stress ?? 3}"/></div>
    <div class="slider-row"><label><span>${tr("anxietyLabel")}</span><span id="vAnx">${e.anxiety ?? 3}</span></label><input type="range" id="anxiety" min="0" max="5" step="1" value="${e.anxiety ?? 3}"/></div>
    <div class="slider-row"><label><span>${tr("energyLabel")}</span><span id="vEn">${e.energy ?? 3}</span></label><input type="range" id="energy" min="0" max="5" step="1" value="${e.energy ?? 3}"/></div>
    <div class="slider-row"><label><span>${tr("sleepLabel")}</span><span id="vSleep">${e.sleep ?? 3}</span></label><input type="range" id="sleep" min="0" max="5" step="1" value="${e.sleep ?? 3}"/></div>
    <div class="slider-row"><label><span>${tr("focusLabel")}</span><span id="vFocus">${e.focus ?? 3}</span></label><input type="range" id="focus" min="0" max="5" step="1" value="${e.focus ?? 3}"/></div>
    <div class="slider-row"><label><span>${tr("socialLabel")}</span><span id="vSoc">${e.social ?? 3}</span></label><input type="range" id="social" min="0" max="5" step="1" value="${e.social ?? 3}"/></div>
    <label class="field-label">${tr("triggersLabel")}</label><input id="trig" type="text" value="${e.triggers || ""}" style="width:100%;padding:0.5rem;border-radius:8px;border:1px solid var(--line)"/>
    <p class="field-label">${tr("copingUsed")}</p>
    <div class="track-checks" id="copingChecks"></div>
    <p class="field-label">${L ? "Habits today" : "عادەت ئەمڕۆ"}</p>
    <div class="track-checks">
      <label><input type="checkbox" id="hW" ${e.habits?.water ? "checked" : ""}/> ${tr("habitWater")}</label>
      <label><input type="checkbox" id="hM" ${e.habits?.move ? "checked" : ""}/> ${tr("habitMove")}</label>
      <label><input type="checkbox" id="hR" ${e.habits?.rest ? "checked" : ""}/> ${tr("habitRest")}</label>
      <label><input type="checkbox" id="hJ" ${e.habits?.journal ? "checked" : ""}/> ${tr("habitJournal")}</label>
    </div>`;
  const copings = ["breath", "ground", "journal", "therapy", "friend"];
  $("copingChecks").innerHTML = copings.map((c) => `<label><input type="checkbox" data-cp="${c}" ${(e.coping || []).includes(c) ? "checked" : ""}/> ${c}</label>`).join("");
  [["mood", "vMood"], ["stress", "vStress"], ["anxiety", "vAnx"], ["energy", "vEn"], ["sleep", "vSleep"], ["focus", "vFocus"], ["social", "vSoc"]].forEach(([id, vid]) => {
    $(id).oninput = () => { $(vid).textContent = $(id).value; };
  });

  const insights = computeInsights(data.entries);
  $("trackInsights").innerHTML = `<p class="mini muted">${tr("streakLabel")}: ${data.streak}</p>` + insights.map((t) => `<div class="insight-item">${t}</div>`).join("");
  $("smallWins").innerHTML = `<strong>${tr("smallWins")}</strong><p class="mini" style="margin:0.35rem 0 0">${L ? "Logging itself is a win." : "تۆمارکردن خۆی بردەوازییە."}</p>`;

  const week = data.entries.slice(-7);
  $("weeklyView").innerHTML = week.length
    ? `<div class="week-bar">${week.map((d, i) => {
        const h = 20 + (d.mood || 0) * 14;
        const day = new Date(d.date).toLocaleDateString(state.lang === "en" ? "en" : "ckb-IQ", { weekday: "short" });
        return `<div class="day" style="height:${h}%"><span>${day}</span></div>`;
      }).join("")}</div>`
    : `<p class="muted mini">${L ? "Save entries to see a week chart." : "تۆمار بکە بۆ هێڵی هەفتە."}</p>`;

  $("saveLog").onclick = () => {
    const entry = {
      date: new Date().toISOString(),
      mood: parseInt($("mood").value, 10),
      stress: parseInt($("stress").value, 10),
      anxiety: parseInt($("anxiety").value, 10),
      energy: parseInt($("energy").value, 10),
      sleep: parseInt($("sleep").value, 10),
      focus: parseInt($("focus").value, 10),
      social: parseInt($("social").value, 10),
      triggers: $("trig").value,
      coping: Array.from(form.querySelectorAll("[data-cp]:checked")).map((x) => x.dataset.cp),
      habits: { water: $("hW").checked, move: $("hM").checked, rest: $("hR").checked, journal: $("hJ").checked }
    };
    const today = new Date().toDateString();
    const lastStr = data.last;
    if (lastStr !== today) {
      const y = new Date();
      y.setDate(y.getDate() - 1);
      if (lastStr === y.toDateString()) data.streak = (data.streak || 0) + 1;
      else data.streak = 1;
      data.last = today;
    }
    data.entries.push(entry);
    if (data.entries.length > 120) data.entries = data.entries.slice(-120);
    saveTrack(data);
    renderTrack();
  };
}

const DISCOVER = {
  reflection: {
    en: ["What felt emotionally expensive today?", "Where did you meet yourself with kindness?"],
    ku: ["ئەمڕۆ چی بە نرخی هەستیاری زۆر بوو؟", "لەکوێ میهرەبانیت لەگەڵ خۆت کرد؟"]
  },
  mythFact: {
    en: [
      { m: "If you’re depressed you’ll always look sad.", f: "Low mood can hide behind productivity or numbness." },
      { m: "Anxiety is just overthinking.", f: "Anxiety involves body, context, and learned patterns—not only thoughts." },
      { m: "Rest is lazy if you’re stressed.", f: "Rest is part of recovery and regulation." }
    ],
    ku: [
      { m: "غەمگین هەمیشە دەردەکەوێت.", f: "کەم هەست دەتوانێت لە کار یان بێ هەستیش دەربکەوێت." },
      { m: "نیگەرانی تەنها زۆر بیرکردنەوەیە.", f: "نیگەرانی جەستە و بارودۆخ و فێربوون دەگرێتەوە." },
      { m: "پشوو لە کاتی سترێسدا تەنها تێکشکاندنە.", f: "پشوو بەشی چاکبوونەوەیە." }
    ]
  },
  compassion: {
    en: ["You are allowed to be imperfect and still worthy of care.", "Struggle is human; it is not proof you are broken."],
    ku: ["دەتوانی ناتەواو بیت و هێشتا چاودێری شایەن بیت.", "تێکچوون مرۆڤانەیە."]
  },
  relation: {
    en: ["Do I feel safer after interactions, or smaller?", "Can I name one need without apologizing for it?"],
    ku: ["دوای قسە ئاسوودەترم یان بچووکتر؟", "دەتوانم پێویستێک بێ لێبوردن بنووسم؟"]
  }
};

let discoverIx = { ref: 0, mf: 0, comp: 0 };

function renderDiscover() {
  const L = state.lang === "en";
  const lang = L ? "en" : "ku";
  $("reflectionCard").innerHTML = `<p class="journal-box">${DISCOVER.reflection[lang][discoverIx.ref % DISCOVER.reflection.en.length]}</p>
    <button type="button" class="btn soft" id="refNext">${tr("nextPrompt")}</button>`;
  $("refNext").onclick = () => { discoverIx.ref++; renderDiscover(); };

  const mf = DISCOVER.mythFact[lang][discoverIx.mf % DISCOVER.mythFact.en.length];
  $("mythFactCard").innerHTML = `<p><strong>${L ? "Myth" : "میت"}:</strong> ${mf.m}</p><p><strong>${L ? "Fact" : "ڕاستی"}:</strong> ${mf.f}</p>
    <button type="button" class="btn soft mt" id="mfNext">${L ? "Another" : "یەکێکی تر"}</button>`;
  $("mfNext").onclick = () => { discoverIx.mf++; renderDiscover(); };

  $("compassionCard").innerHTML = `<p class="support-card">${DISCOVER.compassion[lang][discoverIx.comp % DISCOVER.compassion.en.length]}</p>
    <button type="button" class="btn soft" id="coNext">${tr("nextPrompt")}</button>`;
  $("coNext").onclick = () => { discoverIx.comp++; renderDiscover(); };

  $("relationCard").innerHTML = `<ul class="mini">${DISCOVER.relation[lang].map((x) => `<li>${x}</li>`).join("")}</ul>`;

  $("discoverBoundary").innerHTML = (L
    ? ["I can’t commit to that timeline—here’s what I can do.", "I’m not available tonight; I hope you understand.", "I need to pause this conversation until I’m calmer."]
    : ["ناتوانم لەو کاتەدا بەستەر بکەم—ئەمە دەتوانم.", "ئەم شەو بەردەست نیم.", "پێویستم بە وەستاندنی قسەیە تا ئارامتر بم."]).map((x) => `<div class="highlight-box">${x}</div>`).join("");

  $("calmRoutine").innerHTML = `<ol class="mini"><li>${L ? "5 min breathing" : "٥ خولەک هەناسە"}</li><li>${L ? "Warm drink" : "خواردنەوەی گەرم"}</li><li>${L ? "One screen-free stretch" : "ڕاکێشان بێ شاشە"}</li></ol>`;

  $("supportPaths").innerHTML = `<ul class="mini"><li>${L ? "If overwhelmed → Tools → Grounding" : "ئەگەر بارگاو → زەمینکردنەوە"}</li><li>${L ? "If lonely → small connection step" : "ئەگەر تەنها → هەنگاوی بچووک"}</li><li>${L ? "If exhausted → rest + professional if persistent" : "ئەگەر ماندوو → پشوو"}</li></ul>`;

  $("mediaSuggestions").innerHTML = `<p class="mini">${L ? "Try books on self-compassion, nervous system education, or boundary skills; podcasts on psychology from reputable hosts—choose what fits your culture and values." : "کتێب لەسەر خۆشەفامێتی یان سنوور؛ پۆدکاستی زانستی لە میوانە متمانەپێدراوەکان."}</p>`;

  $("resetIdeas").innerHTML = `<div class="chip-row">
    <button type="button" class="chip-sm">${L ? "Cold water on wrists" : "ئاوی سارد"}</button>
    <button type="button" class="chip-sm">${L ? "Step outside 2 min" : "٢ خولەک دەرەوە"}</button>
    <button type="button" class="chip-sm">${L ? "Text ‘I’m struggling’ to someone safe" : "پەیام بۆ کەسێکی ئاسوودە"}</button>
  </div>`;
}

window.addEventListener("DOMContentLoaded", () => {
  $("langToggle").onclick = () => setLanguage(state.lang === "en" ? "ku" : "en");
  $("heroQuote").onclick = () => { state.quoteI += 1; renderQuote(); renderExploreSupport(); };
  document.querySelectorAll(".tab").forEach((b) => { b.onclick = () => switchTab(b.dataset.tab); });
  $("learnSearch").oninput = () => { state.learnFilter = $("learnSearch").value; renderLearn(); };
  $("closeModal").onclick = () => $("topicModal").classList.add("hidden");
  $("topicModal").onclick = (e) => { if (e.target.id === "topicModal") $("topicModal").classList.add("hidden"); };

  setLanguage(state.lang);
  switchTab("explore");
});
