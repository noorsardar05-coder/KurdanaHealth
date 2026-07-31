/**
 * NSM — Antibiotics & Flu Season Intelligence Hub
 * Vanilla JS · EN / Sorani Kurdish · Educational only (not medical advice)
 */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const STORAGE_FLU_LEGACY = "kurdana_afs_flu_v1";
  const STORAGE_FLU = "kurdana_afs_flu_v2";
  const STORAGE_LANG = "kurdana_afs_lang";

  const state = {
    lang: "en",
    quoteI: 0,
    duration: "short",
    severity: "mild",
    symptoms: {},
    /** After "Analyze pattern", show insight from pattern even if no checkboxes (until user edits symptoms). */
    abxInsightFromAnalyze: false,
    misusePoints: 0,
    quiz: { i: 0, score: 0, streak: 0, timer: null, timeLeft: 45, active: false },
    carouselI: 0,
    scenarioI: 0,
  };

  const SYM_KEYS = [
    "fever",
    "cough",
    "soreThroat",
    "fatigue",
    "runnyNose",
    "bodyAches",
    "chestDiscomfort",
    "headache",
    "difficultyBreathing",
  ];

  SYM_KEYS.forEach((k) => {
    state.symptoms[k] = false;
  });

  const NSM_QUOTES = [
    { en: "Not every illness needs medicine. Sometimes it needs wisdom.", ckb: "هەموو نەخۆشییەک پێویستی بە دەرمان نییە؛ هەندێک جار پێویستی بە تێگەیشتن و ئارامییە." },
    { en: "Understanding your health is more powerful than fearing it.", ckb: "تێگەیشتن لە تەندروستی خۆت بەهێزترە لە ترساندنی خۆت." },
    { en: "The right treatment begins with the right understanding.", ckb: "چارەسەری دروست لە تێگەیشتنی دروست دەست پێدەکات." },
    { en: "Care is smarter when knowledge leads it.", ckb: "کاتێک زانین ڕێبەری دەکات، چاودێری زیرەکتر دەبێت." },
    { en: "Calm observation often reveals what panic hides.", ckb: "چاودێری هێور زۆرجار ئەوەی دەردەخات کە بە تۆقان دەشاردرێتەوە." },
    { en: "Your body signals before it shouts—learn to listen early.", ckb: "جەستەت پێش ئەوەی بەرز بێتەوە ئاماژە دەدات؛ زوو گوێی لێ بگرە." },
    { en: "Antibiotics are tools, not universal keys.", ckb: "ئانتیبیۆتیک ئامرازن، نەک کلیلی گشتی بۆ هەموو نەخۆشییەک." },
    { en: "Flu asks for rest and fluids—not automatic pills.", ckb: "پەتا زۆرجار پشوو و ئاو داوا دەکات، نەک دەرمانی ئۆتۆماتیکی." },
    { en: "Resistance grows where antibiotics are misused.", ckb: "بەرگری بەکتریایی لەو شوێنە گەشە دەکات کە ئانتیبیۆتیک بە هەڵە بەکاردێت." },
    { en: "Healing is often quiet work done by time and care.", ckb: "چاکبوون زۆرجار کارێکی بێدەنگە کە کات و چاودێری دەکەن." },
    { en: "Trust the process of recovery as much as the plan.", ckb: "باوەڕ بە ڕێڕەوی چاکبوونەوە هەبێت وەک باوەڕ بە پلانەکە." },
    { en: "A fever is information—not always an enemy.", ckb: "تا زانیارییە، هەمیشە دوژمن نییە." },
    { en: "Hydration carries what your cells need to fight fairly.", ckb: "ئاوبوونەوە ئەوەی دەگەیەنێت کە خانەکان پێویستیان پێیەتی." },
    { en: "Breathing difficulties deserve professional eyes quickly.", ckb: "کێشەی هەناسەدان پێویستی بە بینینی پزیشکی خێرا هەیە." },
    { en: "Prevention is a daily practice, not a single act.", ckb: "پێشگیری ڕۆژانە ڕاهێنانە، نەک تەنها یەک جار." },
    { en: "Knowledge reduces unnecessary fear—and unnecessary pills.", ckb: "زانین ترسی زیادە و دەرمانی زیادە کەم دەکاتەوە." },
    { en: "The immune system learns; support it with sleep and food.", ckb: "سیستەمی بەرگری فێر دەبێت؛ بە خەوتن و خۆراک پشتیوانی بکە." },
    { en: "When in doubt, a clinician’s review is wisdom—not weakness.", ckb: "کاتێک دڵنیا نیت، پشکنینی پزیشک زانایییە، نەک لاوازی." },
    { en: "Every prescription should have a clear bacterial purpose.", ckb: "هەر دەرمانێکی دەرکردن دەبێت مەبەستێکی بەکتریایی ڕوون هەبێت." },
    { en: "Finish what your clinician prescribes—unless they tell you otherwise.", ckb: "ئەوەی پزیشک دەرمانی بۆ دەکات تەواو بکە—مەگەر فەرمانی تر نەدات." },
    { en: "Leftover antibiotics can harm the next illness you cannot see.", ckb: "ئانتیبیۆتیکی ماوە دەتوانێت زیان بە نەخۆشی داهاتوو بگەیەنێت کە نابینیت." },
    { en: "Viruses and bacteria are different worlds—treat them differently.", ckb: "ڤایرۆس و بەکتریا جیهانی جیاوازن؛ بە جۆرێکی جیاواز مامەڵە بکە." },
    { en: "Seasonal care is community care—your choices protect others.", ckb: "چاودێری وەرزی هاوکاری کۆمەڵایەتییە؛ هەڵبژاردەکانت کەسانی تر دەپارێزن." },
    { en: "Small habits (handwashing, rest) are powerful medicines too.", ckb: "عادەتە بچووکەکان وەک دەستشۆردن و پشوو هەروەها دەرمانێکی بەهێزن." },
    { en: "NSM stands for thoughtful health—not rushed fear.", ckb: "NSM واتای تەندروستی بیرکراوە، نەک ترسی پەلەپێکراو." },
  ];

  const T = {
    en: {},
    ckb: {},
  };

  function merge(lang, obj) {
    Object.assign(T[lang], obj);
  }

  merge("en", {
    skipContent: "Skip to content",
    brandTag: "Noor · Public health education",
    heroKicker: "NSM — Public Health Education",
    backDashboard: "Back to dashboard",
    heroTitle: "Antibiotics & Flu Season",
    heroSubtitle:
      "Understand your symptoms, use antibiotics wisely, and care for your health with clarity.",
    ctaSymptoms: "Check symptoms",
    ctaAntibiotics: "Learn about antibiotics",
    ctaFlu: "See flu updates",
    quoteHint: "Tap for another reflection.",
    heroDisclaimer:
      "Educational information only. This does not replace medical advice, examination, or diagnosis.",
    tabExplore: "Explore",
    tabFlu: "Flu Tracker",
    tabLibrary: "Antibiotics Library",
    tabPlay: "Play & Learn",
    tabDiscover: "Discover",
    tabsHint: "Choose a section — only that content is shown.",
    fluCleanSub:
      "Log temperature and symptoms—see your progress at a glance. Saved on this device only.",
    fluTempHint: "Optional but helpful for tracking fever trends.",
    quizResultKicker: "Flu fact challenge",
    quoteByNoor: "Quote by Noor",
    tryAgain: "Try again",
    continueLearning: "Continue learning",
    quizFeedbackHigh: "Great awareness!",
    quizFeedbackMed: "Keep learning!",
    quizFeedbackLow: "You're improving!",
    quizQuoteHigh: "Understanding your health is power. You're already ahead.",
    quizQuoteMed: "Learning is a journey. Every step makes you stronger.",
    quizQuoteLow: "Awareness starts here. You are doing better than you think.",
    timeUp: "Time's up",
    quizScoreLine: "Score",
    exploreTitle: "Explore intelligence hub",
    exploreSub: "Symptom patterns, antibiotic awareness, and calm guidance—built for clarity.",
    analyzerLabel: "Smart symptom analyzer",
    analyzerHeading: "Pattern check (not a diagnosis)",
    analyzerHelper: "Select what applies. Results describe possible patterns and safe next steps.",
    durationLabel: "Symptom duration",
    severityLabel: "Severity",
    analyzeBtn: "Analyze pattern",
    durShort: "1–3 days",
    durMed: "3–7 days",
    durLong: "7+ days",
    sevMild: "Mild",
    sevMod: "Moderate",
    sevSev: "Severe",
    symFever: "Fever",
    symCough: "Cough",
    symSore: "Sore throat",
    symFatigue: "Fatigue",
    symRunny: "Runny or stuffy nose",
    symBody: "Body aches",
    symChest: "Chest discomfort",
    symHead: "Headache",
    symBreath: "Difficulty breathing",
    abxNeedLabel: "Antibiotic insight",
    abxNeedHeading: "Do I need antibiotics?",
    abxTierLow: "Low risk",
    abxTierModerate: "Moderate",
    abxTierAttention: "Needs attention",
    abxEmptyLead: "Select symptoms for a quick estimate.",
    abxEmptyB1: "This card updates as you change selections.",
    abxEmptyB2: "Use Analyze pattern for full detail.",
    abxCardSeekH: "Antibiotics are not the first step here",
    abxCardSeekB1: "Get urgent medical evaluation.",
    abxCardSeekB2: "Do not start antibiotics without assessment.",
    abxCardBactH: "A clinician should confirm if antibiotics fit",
    abxCardBactB1: "Possible bacterial cause needs proper checks.",
    abxCardBactB2: "Do not self-prescribe antibiotics.",
    abxCardViralH: "Antibiotics likely not needed",
    abxCardViralB1: "Symptoms suggest viral illness.",
    abxCardViralB2: "Rest, fluids, monitoring.",
    abxCardMonH: "Antibiotics not indicated from selections alone",
    abxCardMonB1: "Keep observing; patterns can change.",
    abxCardMonB2: "Seek care if symptoms worsen.",
    abxCardMonWatchH: "Professional review may be appropriate",
    abxCardMonWatchB1: "Longer or stronger symptoms deserve attention.",
    abxCardMonWatchB2: "Avoid antibiotics without clear indication.",
    clinical2:
      "Flu is caused by viruses, not bacteria. Antibiotics can be life-saving when used correctly, but harmful when misused.",
    libraryInsight:
      "Antibiotics should only be used under appropriate medical guidance. This library is for education, not self-treatment.",
    resultSeek: "Seek medical evaluation",
    resultSeekBadge: "Urgent review suggested",
    resultBact: "Possible bacterial concern",
    resultBactBadge: "Professional assessment may help",
    resultViral: "Likely viral pattern",
    resultViralBadge: "Common for colds / flu",
    resultMonitor: "Monitor and rest",
    resultMonitorBadge: "Early or mild illness",
    resPattern: "Likely pattern",
    resWhy: "Why this may fit",
    resDo: "What to do now",
    resDont: "What not to do",
    resWorry: "When to worry / escalate",
    warnTitle: "When to worry",
    warnSub: "Serious signs deserve medical attention—use this as a checklist, not a substitute for care.",
    compareLabel: "Education",
    compareTitle: "Bacteria vs virus",
    compareIntro: "Different causes need different care. Antibiotics target bacteria, not viruses.",
    awareLabel: "Quick guide",
    awareTitle: "Antibiotic awareness",
    naturalLabel: "Natural supportive care",
    naturalTitle: "Comfort & recovery at home",
    naturalDisclaimer:
      "These supports comfort—they do not replace professional care when symptoms are serious.",
    newsFeaturedTag: "Latest flu bulletin",
    newsFeaturedTitle: "Seasonal respiratory awareness",
    newsFeaturedBody:
      "Stay informed about prevention, vaccination, and sensible hygiene—your daily habits matter.",
    footerDisclaimer:
      "This tool offers education and pattern reflection. It does not diagnose illness or prescribe treatment.",
    footerNote: "NSM · Kurdana Health · Antibiotics & Flu Season · Education only",
    fluTitle: "Personal flu symptom log",
    fluSub: "Track temperature, rest, fluids, and notes—saved locally on your device.",
    logToday: "Log today",
    fieldDate: "Date",
    fieldTemp: "Temperature (°C)",
    fieldSymptoms: "Symptoms today",
    fieldRest: "Rest quality",
    fieldHydration: "Hydration",
    fieldMeds: "Medications / supplements (optional)",
    fieldNotes: "Notes",
    fieldSeverity: "Overall severity",
    placeholderMeds: "e.g. paracetamol as advised",
    saveLog: "Save entry",
    saveTodayLog: "Save today's log",
    fluSaveSuccess: "Today's flu log saved.",
    savedLogsTitle: "Saved logs",
    statusStable: "Stable",
    statusMonitor: "Monitor",
    statusHigh: "High fever / consider medical advice",
    progressDays: "Days logged",
    progressLatestTemp: "Latest temperature",
    progressSymptomsToday: "Symptoms today",
    tempBarCaption: "Temperature overview (latest reading)",
    habitCaption: "Logging progress (14-day goal)",
    trendFeverUp: "Fever is increasing compared to your previous log.",
    trendImproving: "Symptoms are improving.",
    trendStable: "Symptoms appear stable today.",
    trendMonitor: "Continue monitoring rest and fluids.",
    trendWorse: "Symptoms increased versus your last entry—stay alert.",
    fluTrendStart: "Start logging to see trends and gentle guidance.",
    fluTrendFirst: "First entry saved—keep tracking daily if you can.",
    deleteLogAria: "Delete this log",
    noLogsYet: "No saved logs yet.",
    progressNoLogToday: "No entry for today yet",
    progressTotalHint: "Entries saved on this device",
    clearLog: "Clear saved log",
    restPoor: "Poor",
    restFair: "Fair",
    restGood: "Good",
    hydLow: "Low",
    hydOk: "Adequate",
    hydHigh: "Good",
    sevL: "Mild",
    sevM: "Moderate",
    sevH: "Severe",
    libraryTitle: "Antibiotics knowledge library",
    librarySub:
      "Classes, examples, and cautions—prescription decisions belong with qualified clinicians.",
    exampleDrugsTitle: "Example medications (education)",
    playTitle: "Play & learn",
    playSub: "Interactive checks—build habits that protect you and antibiotics.",
    misuseScoreLabel: "Your learning behavior score:",
    mythTitle: "Myth vs truth",
    mythSub: "Choose myth or truth, then read the explanation.",
    recoveryTitle: "Build your recovery plan",
    recoverySub: "Select what you would rely on—then see if your plan is wise or risky.",
    checkPlan: "Check plan",
    scenarioTitle: "Scenario challenge",
    scenarioSub: "Choose the most sensible first step.",
    quizTitle: "Flu fact challenge",
    quizSub: "Quick questions—tap Start when ready.",
    startQuiz: "Start quiz",
    nextQ: "Next",
    discoverTitle: "Discover",
    discoverSub: "Facts, prevention, and reflections—deepen your understanding.",
    bodyFactsTitle: "Body recovery facts",
    carouselTitle: "Myth vs fact carousel",
    prev: "Previous",
    next: "Next",
    preventionTitle: "Seasonal prevention guide",
    didYouKnow: "Did you know?",
    miniTips: "Mini tips",
    discoverQuotes: "Noor reflections",
    quoteCardLabel: "Noor wisdom",
    myth: "Myth",
    truth: "Truth",
    correct: "Correct",
    wrong: "Not quite",
    explain: "Explanation",
    scoreWord: "Score",
    streakWord: "Streak",
    planWise: "Wise plan",
    planRisky: "Risky choices detected",
    safe: "Safe learner",
    risky: "Needs caution",
    misuseWarn: "Misuse warning",
  });

  merge("ckb", {
    skipContent: "بڕۆ بۆ ناوەڕۆک",
    brandTag: "نور · فێرکاری تەندروستی گشتی",
    heroKicker: "NSM — فێرکاری تەندروستی گشتی",
    backDashboard: "گەڕانەوە بۆ داشبۆرد",
    heroTitle: "ئانتیبیۆتیک و وەرزی زکام",
    heroSubtitle:
      "نیشانەکانت تێبگە، ئانتیبیۆتیک بە زانست بەکاربهێنە، تەندروستیت بە ڕوونی بپارێزە.",
    ctaSymptoms: "نیشانەکان بپشکنە",
    ctaAntibiotics: "فێربە دەربارەی ئانتیبیۆتیک",
    ctaFlu: "نوێکارییەکانی پەتا ببینە",
    quoteHint: "دەست لێبدە بۆ بیرکردنەوەی تر.",
    heroDisclaimer:
      "ئەمە تەنها زانیاری فێرکارییە؛ جێگای ڕاوێژی پزیشکی، پشکنین یان دۆزینەوە ناگرێتەوە.",
    tabExplore: "گەڕان",
    tabFlu: "تۆمارکردنی پەتا",
    tabLibrary: "کتێبخانەی ئانتیبیۆتیک",
    tabPlay: "یاری و فێربوون",
    tabDiscover: "دۆزینەوە",
    tabsHint: "بەش هەڵبژێرە — تەنها ئەو ناوەڕۆکە دەردەکەوێت.",
    fluCleanSub:
      "پلەی گەرمی و نیشانەکان تۆمار بکە—پێشکەوتن بە خێرایی ببینە. تەنها لەسەر ئەم ئامێرە هەڵدەگیرێت.",
    fluTempHint: "ئارەزوومەندانە بەڵام یارمەتی بۆ چاودێری تای دەدات.",
    quizResultKicker: "کۆڕەوەی ڕاستی پەتا",
    quoteByNoor: "وتەی نور",
    tryAgain: "دووبارە هەوڵ بدە",
    continueLearning: "بەردەوام بە لە فێربوون",
    quizFeedbackHigh: "هۆشیاری زۆر باشە!",
    quizFeedbackMed: "بەردەوام بە لە فێربوون!",
    quizFeedbackLow: "باشتر دەبیت!",
    quizQuoteHigh: "تێگەیشتن لە تەندروستی خۆت بەهێزە؛ تۆ پێشتر لە زۆر کەسیت.",
    quizQuoteMed: "فێربوون گەشتێکە؛ هەر هەنگاوێک تۆ بەهێزتر دەکات.",
    quizQuoteLow: "ئاگاداری لێرە دەست پێ دەکات؛ باشتر لەوەی ئەزانیت.",
    timeUp: "کات تەواو بوو",
    quizScoreLine: "نمرە",
    exploreTitle: "ناوەندی زیرەکی فێرکاری",
    exploreSub: "شێوازی نیشانەکان، هۆشیاری دەربارەی ئانتیبیۆتیک، ڕێنمایی هێور—بۆ ڕوونایی.",
    analyzerLabel: "شیكارکەری نیشانەکان",
    analyzerHeading: "پشکنینی شێواز (دۆزینەوە نییە)",
    analyzerHelper: "ئەوەی ڕاستە هەڵبژێرە. ئەنجامەکان شێوازێکی ئەگەری دەردەخەن و هەنگاوی سەلامەت دەڵێن.",
    durationLabel: "ماوەی نیشانەکان",
    severityLabel: "توندی",
    analyzeBtn: "شیبکەرەوە",
    durShort: "١–٣ ڕۆژ",
    durMed: "٣–٧ ڕۆژ",
    durLong: "+٧ ڕۆژ",
    sevMild: "سووک",
    sevMod: "مامناوەند",
    sevSev: "توند",
    symFever: "تا",
    symCough: "کۆخە",
    symSore: "ئازاری گەروەن",
    symFatigue: "ماندووبوون",
    symRunny: "ئاوی لووت یان گیپێکردن",
    symBody: "ئازاری جەستە",
    symChest: "ئازاری سینە",
    symHead: "سەرئێشە",
    symBreath: "قورسی هەناسەدان",
    abxNeedLabel: "تێگەیشتنی ئانتیبیۆتیک",
    abxNeedHeading: "ئایا پێویستم بە ئانتیبیۆتیکە؟",
    abxTierLow: "مەترسی کەم",
    abxTierModerate: "مامناوەند",
    abxTierAttention: "پێویستی بە وریاییە",
    abxEmptyLead: "نیشانەکان هەڵبژێرە بۆ تێگەیشتنێکی خێرا.",
    abxEmptyB1: "کارتێک لەگەڵ هەڵبژاردنەکاندا نوێ دەبێتەوە.",
    abxEmptyB2: "بۆ وردەکاری تەواو «شیبکەرەوە» بەکاربهێنە.",
    abxCardSeekH: "لێرە یەکەم هەنگاو ئانتیبیۆتیک نییە",
    abxCardSeekB1: "پشکنینی پزیشکی خێرا وەربگرە.",
    abxCardSeekB2: "بە بێ پشکنین ئانتیبیۆتیک دەست پێ مەکە.",
    abxCardBactH: "تەنها پزیشک دەتوانێت بڕیار بدات ئایا ئانتیبیۆتیک گونجاوە",
    abxCardBactB1: "ئەگەری هۆکاری بەکتریایی پشکنینی پزیشکی دەوێت.",
    abxCardBactB2: "خۆت ئانتیبیۆتیک مەدە.",
    abxCardViralH: "زۆرجار ئانتیبیۆتیک پێویست نییە",
    abxCardViralB1: "نیشانەکان ڤایرۆسی دەناسێنن.",
    abxCardViralB2: "پشوو، ئاو، چاودێری.",
    abxCardMonH: "تەنها بەم هەڵبژاردنانە ئانتیبیۆتیک نیشانە ناکرێت",
    abxCardMonB1: "چاودێری بەردەوام بکە؛ دەتوانێت بگۆڕێت.",
    abxCardMonB2: "ئەگەر نیشانەکان خراپتر بوون سەردان بکە.",
    abxCardMonWatchH: "لەوانەیە پشکنینی پزیشکی گونجاو بێت",
    abxCardMonWatchB1: "ماوەی درێژتر یان توندی بەرز پێویستی بە چاودێرییە.",
    abxCardMonWatchB2: "بە بێ نیشانەی ڕوون ئانتیبیۆتیک مەکڕە.",
    clinical2:
      "پەتا بە ڤایرۆس دروست دەبێت، نەک بەکتریا. ئانتیبیۆتیک کاتێک بە دروستی بەکاردێت ژیان ڕزگار دەکات، بەڵام کاتێک بە هەڵە بەکاردێت زیانگەلێکە.",
    libraryInsight:
      "ئانتیبیۆتیک تەنها لە ژێر ڕێنمایی پزیشکی گونجاو بەکاربهێنرێت. ئەم کتێبخانەیە بۆ فێرکارییە، نەک چارەسەرکردنی خۆت.",
    resultSeek: "پشکنینی پزیشکی پێویستە",
    resultSeekBadge: "پێشنیاری پشکنینی خێرا",
    resultBact: "ئەگەری کێشەی بەکتریایی",
    resultBactBadge: "لەوانەیە پشکنین پێویست بێت",
    resultViral: "شێوازی ڤایرۆسییە",
    resultViralBadge: "باوە لە ساردبوونەوە / پەتا",
    resultMonitor: "چاودێری و پشوو",
    resultMonitorBadge: "نەخۆشی سەرەتایی یان سووک",
    resPattern: "شێوازی ئەگەری",
    resWhy: "بۆچی لەگەڵ ئەمەدا دەگونجێت",
    resDo: "ئێستا چ بکەیت",
    resDont: "چی نەکەیت",
    resWorry: "کەی نیگەران بیت / بەرز بکەیتەوە",
    warnTitle: "کەی نیگەران بیت",
    warnSub: "نیشانە جیدیەکان پێویستیان بە چاودێری پزیشکی هەیە—وەک لیست بەکاربهێنە، نەک جێگای سەردانی پزیشک.",
    compareLabel: "فێرکاری",
    compareTitle: "بەکتریا و ڤایرۆس",
    compareIntro: "هۆکارە جیاوازەکان چاودێری جیاواز دەوێت. ئانتیبیۆتیک بۆ بەکتریاکانە، نەک ڤایرۆس.",
    awareLabel: "ڕێنمایی خێرا",
    awareTitle: "هۆشیاری ئانتیبیۆتیک",
    naturalLabel: "چاودێری سروشتی پشتیوان",
    naturalTitle: "ئاسایش و چاکبوون لە ماڵەوە",
    naturalDisclaimer:
      "ئەمە ئاسانکاری دەکات؛ کاتێک نیشانەکان جیدین، جێگای چاودێری پزیشکی ناگرێتەوە.",
    newsFeaturedTag: "دوایین ئاگاداری پەتا",
    newsFeaturedTitle: "هۆشیاری هەناسەیی وەرزی",
    newsFeaturedBody:
      "لەسەر پێشگیری، وەکسین و پاکیزەیی ڕۆژانە بەدواداچۆ بکە—عادەتەکانی ڕۆژانەت کاریگەرن.",
    footerDisclaimer:
      "ئەم ئامرازە فێرکاری و بیرکردنەوە لەسەر شێوازەکان پێشکەش دەکات؛ نەخۆشی دۆزینەوە یان چارەسەر دەرناکات.",
    footerNote: "NSM · کوردانا هێلس · ئانتیبیۆتیک و پەتا · تەنها فێرکاری",
    fluTitle: "تۆماری کەسی نیشانەکانی پەتا",
    fluSub: "پلەی گەرمی، پشوو، ئاو و تێبینی تۆمار بکە—لەسەر ئامێرەکەت هەڵدەگیرێت.",
    logToday: "تۆماری ئەمڕۆ",
    fieldDate: "ڕۆژ",
    fieldTemp: "پلەی گەرمی (°C)",
    fieldSymptoms: "نیشانەکانی ئەمڕۆ",
    fieldRest: "جۆری پشوو",
    fieldHydration: "ئاوبوونەوە",
    fieldMeds: "دەرمان / تەواوکەر (ئارەزوومەندانە)",
    fieldNotes: "تێبینی",
    fieldSeverity: "توندی گشتی",
    placeholderMeds: "وەک نموونە پاراسیتامۆل بەپێی ڕاوێژ",
    saveLog: "پاشەکەوتکردن",
    saveTodayLog: "تۆماری ئەمڕۆ پاشەکەوت بکە",
    fluSaveSuccess: "تۆماری پەتا بۆ ئەمڕۆ پاشەکەوت کرا.",
    savedLogsTitle: "تۆمارە پاشەکەوتکراوەکان",
    statusStable: "جێگیر",
    statusMonitor: "چاودێری",
    statusHigh: "تای بەرز / ڕاوێژی پزیشک بیر بکەرەوە",
    progressDays: "ڕۆژانی تۆمارکراو",
    progressLatestTemp: "دوایین پلەی گەرمی",
    progressSymptomsToday: "نیشانەکانی ئەمڕۆ",
    tempBarCaption: "پێداچوونەوەی پلەی گەرمی (دوایین)",
    habitCaption: "پێشکەوتنی تۆمارکردن (ئامانجی ١٤ ڕۆژ)",
    trendFeverUp: "تای لە تۆماری پێشوو بەرزترە.",
    trendImproving: "نیشانەکان باشتر دەبن.",
    trendStable: "نیشانەکان ئەمڕۆ جێگیر دەردەکەون.",
    trendMonitor: "چاودێری، پشوو و ئاو بەردەوام بکە.",
    trendWorse: "نیشانەکان زیاترن لە تۆماری پێشوو—ئاگادار بە.",
    fluTrendStart: "تۆمار دەست پێ بکە بۆ بینینی ڕەوش و ڕاوێژ.",
    fluTrendFirst: "یەکەم تۆمار پاشەکەوت کرا—ئەگەر دەتوانیت ڕۆژانە بەردەوام بە.",
    deleteLogAria: "ئەم تۆمارە بسڕەوە",
    noLogsYet: "هێشتا تۆمار نییە.",
    progressNoLogToday: "ئەمڕۆ تۆمار نییە",
    progressTotalHint: "تۆمارەکان لەسەر ئەم ئامێرە",
    clearLog: "سڕینەوەی تۆمار",
    restPoor: "خراپ",
    restFair: "مامناوەند",
    restGood: "باش",
    hydLow: "کەم",
    hydOk: "گونجاو",
    hydHigh: "باش",
    sevL: "سووک",
    sevM: "مامناوەند",
    sevH: "توند",
    libraryTitle: "کتێبخانەی زانیاری ئانتیبیۆتیک",
    librarySub: "پۆلەکان، نموونەکان، ئاگادارییەکان—بڕیاری دەرمان لەگەڵ پزیشکە شارەزاکانە.",
    exampleDrugsTitle: "نموونەی دەرمان (فێرکاری)",
    playTitle: "یاری و فێربوون",
    playSub: "پشکنینی کارلێکراو—عادەت دروست بکە کە خۆت و ئانتیبیۆتیک بپارێزیت.",
    misuseScoreLabel: "نمرەی فێربوون:",
    mythTitle: "ئەفسانە و ڕاستی",
    mythSub: "ئەفسانە یان ڕاستی هەڵبژێرە، دواتر ڕوونکردنەوە بخوێنەوە.",
    recoveryTitle: "پلانی چاکبوون دروست بکە",
    recoverySub: "ئەوەی پشت بە وە دەکەیت هەڵبژێرە—دواتر بزانە زیرەکە یان مەترسیدارە.",
    checkPlan: "پشکنینی پلان",
    scenarioTitle: "ئاستی چیرۆک",
    scenarioSub: "گونجاوترین هەنگاوی یەکەم هەڵبژێرە.",
    quizTitle: "کۆڕەوەی ڕاستی پەتا",
    quizSub: "پرسیارە خێراکان—دوای ئامادەبوون دەست پێ بکە.",
    startQuiz: "دەستپێکردن",
    nextQ: "دواتر",
    discoverTitle: "دۆزینەوە",
    discoverSub: "ڕاستییەکان، پێشگیری، بیرکردنەوە—تێگەیشتن قووڵتر بکە.",
    bodyFactsTitle: "ڕاستی چاکبوونی جەستە",
    carouselTitle: "کارۆسێلی ئەفسانە و ڕاستی",
    prev: "پێشوو",
    next: "دواتر",
    preventionTitle: "ڕێنمایی پێشگیری وەرزی",
    didYouKnow: "ئایا دەزانی؟",
    miniTips: "ئامۆژگاری بچووک",
    discoverQuotes: "بیرکردنەوەکانی نور",
    quoteCardLabel: "پیرۆزی نور",
    myth: "ئەفسانە",
    truth: "ڕاستی",
    correct: "دروستە",
    wrong: "تەواو دروست نییە",
    explain: "ڕوونکردنەوە",
    scoreWord: "نمرە",
    streakWord: "زنجیرە",
    planWise: "پلانی زیرەک",
    planRisky: "هەڵبژاردنی مەترسیدار هەیە",
    safe: "فێرخوازێکی سەلامەت",
    risky: "پێویستی بە وریاییە",
    misuseWarn: "ئاگاداری بەکارهێنانی هەڵە",
  });

  function t(key) {
    const v = T[state.lang][key];
    return v != null ? v : T.en[key] || key;
  }

  function applyI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (k) el.textContent = t(k);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const k = el.getAttribute("data-i18n-placeholder");
      if (k) el.placeholder = t(k);
    });
    $("langLabel").textContent = state.lang === "en" ? "English" : "کوردی (سۆرانی)";
    document.documentElement.lang = state.lang === "en" ? "en" : "ckb";
    document.documentElement.dir = state.lang === "ckb" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ckb", state.lang === "ckb");
    document.body.classList.toggle("lang-en", state.lang === "en");
  }

  function setQuote(el, index) {
    const q = NSM_QUOTES[index % NSM_QUOTES.length];
    el.textContent = state.lang === "en" ? q.en : q.ckb;
  }

  function nextQuote() {
    state.quoteI = (state.quoteI + 1) % NSM_QUOTES.length;
    const fade = (id) => {
      const el = $(id);
      if (!el) return;
      el.style.opacity = "0";
      setTimeout(() => {
        setQuote(el, state.quoteI);
        el.style.transition = "opacity 0.35s ease";
        el.style.opacity = "1";
      }, 180);
    };
    fade("quoteText");
    fade("exploreQuoteText");
    fade("discoverQuoteText");
  }

  function renderSymptomChecks() {
    const keyToT = {
      fever: "symFever",
      cough: "symCough",
      soreThroat: "symSore",
      fatigue: "symFatigue",
      runnyNose: "symRunny",
      bodyAches: "symBody",
      chestDiscomfort: "symChest",
      headache: "symHead",
      difficultyBreathing: "symBreath",
    };
    const root = $("symptomChecks");
    root.innerHTML = SYM_KEYS.map(
      (k) => `
      <label class="check-row">
        <input type="checkbox" data-sym="${k}" ${state.symptoms[k] ? "checked" : ""}>
        <span>${t(keyToT[k])}</span>
      </label>`
    ).join("");
    root.querySelectorAll("input[data-sym]").forEach((inp) => {
      inp.addEventListener("change", () => {
        state.symptoms[inp.dataset.sym] = inp.checked;
        state.abxInsightFromAnalyze = false;
        updateAbxInsightCard();
      });
    });
  }

  function renderDurationSeverity() {
    const dur = [
      { k: "short", tk: "durShort" },
      { k: "medium", tk: "durMed" },
      { k: "long", tk: "durLong" },
    ];
    const sev = [
      { k: "mild", tk: "sevMild" },
      { k: "moderate", tk: "sevMod" },
      { k: "severe", tk: "sevSev" },
    ];
    const dc = $("durationChips");
    dc.innerHTML = dur
      .map(
        (d) =>
          `<button type="button" class="chip${state.duration === d.k ? " selected" : ""}" data-dur="${d.k}">${t(d.tk)}</button>`
      )
      .join("");
    dc.querySelectorAll("[data-dur]").forEach((b) => {
      b.addEventListener("click", () => {
        state.duration = b.dataset.dur;
        renderDurationSeverity();
      });
    });
    const sc = $("severityChips");
    sc.innerHTML = sev
      .map(
        (d) =>
          `<button type="button" class="chip${state.severity === d.k ? " selected" : ""}" data-sev="${d.k}">${t(d.tk)}</button>`
      )
      .join("");
    sc.querySelectorAll("[data-sev]").forEach((b) => {
      b.addEventListener("click", () => {
        state.severity = b.dataset.sev;
        renderDurationSeverity();
      });
    });
    updateAbxInsightCard();
  }

  function analyzePattern() {
    const s = state.symptoms;
    const dur = state.duration;
    const sev = state.severity;

    if (s.difficultyBreathing) {
      return {
        cat: "seek",
        pattern:
          state.lang === "en"
            ? "Breathing difficulty may suggest a serious problem and needs prompt medical assessment."
            : "قورسی هەناسەدان لەوانەیە کێشەی جیدی بێت و پێویستی بە پشکنینی خێرا هەیە.",
        why:
          state.lang === "en"
            ? "This symptom is prioritized because it can signal lower oxygenation or severe respiratory illness."
            : "ئەم نیشانە گرنگە چونکە دەتوانێت ئاماژە بە کەمبوونەوەی ئۆکسجین یان نەخۆشی هەناسەیی توند بکات.",
        doText:
          state.lang === "en"
            ? "Seek urgent medical advice or emergency care as local guidance recommends."
            : "بەپێی ڕێنمایی ناوچەکەت ڕاوێژی پزیشکی یان فریاکەوتن بە خێرایی وەربگرە.",
        dontText:
          state.lang === "en"
            ? "Do not rely on antibiotics at home without evaluation; do not delay care."
            : "بە بێ پشکنین پشت بە ئانتیبیۆتیک لە ماڵەوە مەبەستێنە؛ چاودێری دواخستن مەکە.",
        worryText:
          state.lang === "en"
            ? "If breathing worsens, lips turn blue, or you feel faint, treat as an emergency."
            : "ئەگەر هەناسە خراپتر بوو، لێوەکان شین بوون یان سەرگەردان بووی، وەک فریاکەوتن مامەڵە بکە.",
      };
    }

    if (s.chestDiscomfort && (sev === "severe" || sev === "moderate")) {
      return {
        cat: "seek",
        pattern:
          state.lang === "en"
            ? "Chest discomfort with higher severity should be assessed—many causes exist, some urgent."
            : "ئازاری سینە لەگەڵ توندی بەرز پێویستی بە پشکنینە—هۆکارەکان جیاوازن، هەندێکیان خێران.",
        why:
          state.lang === "en"
            ? "Chest symptoms can reflect heart or lung issues; caution is appropriate."
            : "نیشانەکانی سینە دەتوانن پەیوەندی بە دڵ یان سییەکانەوە هەبێت؛ وریایی پێویستە.",
        doText:
          state.lang === "en"
            ? "Contact a clinician promptly for examination and advice."
            : "بە خێرایی پزیشک ڕابگەیەنە بۆ پشکنین و ڕاوێژ.",
        dontText:
          state.lang === "en"
            ? "Do not assume antibiotics are needed without assessment."
            : "بە بێ پشکنین وا مەزانە ئانتیبیۆتیک پێویستە.",
        worryText:
          state.lang === "en"
            ? "If pain spreads, you sweat cold, or breathing is hard, seek urgent care."
            : "ئەگەر ئازار بڵاوبووەوە، هەست بە سەرماکردن کرد یان هەناسە قورس بوو، چاودێری خێرا.",
      };
    }

    const viralScore =
      (s.runnyNose ? 1 : 0) +
      (s.cough ? 1 : 0) +
      (s.fatigue ? 1 : 0) +
      (s.headache ? 1 : 0) +
      (s.bodyAches ? 1 : 0);
    const bacterialHint =
      s.soreThroat &&
      s.fever &&
      !s.runnyNose &&
      (dur === "medium" || dur === "long") &&
      sev !== "mild";

    if (bacterialHint) {
      return {
        cat: "bacterial",
        pattern:
          state.lang === "en"
            ? "Your selections could be consistent with an illness that sometimes needs evaluation for bacterial causes (for example, certain throat infections)."
            : "هەڵبژاردەکانت لەوانەیە لەگەڵ نەخۆشییەکدا بگونجێت کە هەندێک جار پێویستی بە پشکنین بۆ هۆکاری بەکتریایی هەیە.",
        why:
          state.lang === "en"
            ? "Fever and sore throat without typical cold congestion may warrant a professional review—not a diagnosis here."
            : "تا و ئازاری گەروەن بەبێ ئاوی لووتی باو لەوانەیە پێویستی بە پشکنینی پزیشکی بێت—لێرە دۆزینەوە نییە.",
        doText:
          state.lang === "en"
            ? "Arrange medical review; throat swabs or other checks are decided by clinicians."
            : "سەردانی پزیشک بکە؛ تاقیکردنەوە لەلایەن پزیشکەوە دیاری دەکرێت.",
        dontText:
          state.lang === "en"
            ? "Do not start antibiotics without prescription and clear indication."
            : "بە بێ دەرکردن و نیشانەی ڕوون ئانتیبیۆتیک دەست پێ مەکە.",
        worryText:
          state.lang === "en"
            ? "If swallowing or breathing becomes difficult, seek urgent care."
            : "ئەگەر قوتدان یان هەناسەدان قورس بوو، چاودێری خێرا.",
      };
    }

    if (viralScore >= 3 && dur === "short" && sev === "mild") {
      return {
        cat: "viral",
        pattern:
          state.lang === "en"
            ? "This may suggest a common viral upper-respiratory pattern (for example, cold or mild flu-like illness)."
            : "لەوانەیە شێوازێکی باو ڤایرۆسی بێت (وەک ساردبوونەوە یان پەتا سووک).",
        why:
          state.lang === "en"
            ? "Runny nose, cough, and mild systemic symptoms often fit viral illnesses; antibiotics usually do not help."
            : "ئاوی لووت، کۆخە و نیشانە سووکەکان زۆرجار ڤایرۆس دەناسێنن؛ ئانتیبیۆتیک زۆرجار سوودی نییە.",
        doText:
          state.lang === "en"
            ? "Rest, fluids, and monitoring; use symptom relief as a clinician advises."
            : "پشوو، ئاو و چاودێری؛ کەمکردنەوەی نیشانەکان بەپێی ڕاوێژی پزیشک.",
        dontText:
          state.lang === "en"
            ? "Do not take antibiotics ‘just in case’ for typical viral symptoms."
            : "بۆ نیشانە ڤایرۆسییە باوەکان ئانتیبیۆتیک بەکارمەهێنە «تەنها بۆ ئەگەر».",
        worryText:
          state.lang === "en"
            ? "If fever lasts more than three days or symptoms worsen, seek medical advice."
            : "ئەگەر تا زیاتر لە سێ ڕۆژ مایەوە یان نیشانەکان خراپتر بوون، ڕاوێژی پزیشکی وەربگرە.",
      };
    }

    if (sev === "severe" || dur === "long") {
      return {
        cat: "monitor",
        pattern:
          state.lang === "en"
            ? "Longer duration or higher severity means careful monitoring and timely professional review if things change."
            : "ماوەی درێژتر یان توندی بەرز واتای چاودێری ورد و پشکنینی کاتی پزیشکی ئەگەر شتێک گۆڕا.",
        why:
          state.lang === "en"
            ? "Illness can evolve; persistence or intensity increases the value of clinical assessment."
            : "نەخۆشی دەتوانێت بگۆڕێت؛ بەردەوامی یان توندی پشکنین گرنگتر دەکات.",
        doText:
          state.lang === "en"
            ? "Hydrate, rest, track symptoms daily, and book an appointment if uncertain."
            : "ئاو، پشوو، ڕۆژانە تۆمار بکە، ئەگەر دڵنیا نیت کاتێک بۆ پزیشک دابنێ.",
        dontText:
          state.lang === "en"
            ? "Do not ignore worsening signs; do not self-prescribe antibiotics."
            : "نیشانە خراپبووەکان فەرامۆش مەکە؛ خۆت دەرمانی ئانتیبیۆتیک مەدە.",
        worryText:
          state.lang === "en"
            ? "Escalate care for breathing trouble, confusion, dehydration, or very high fever."
            : "چاودێری بەرز بکەرەوە بۆ هەناسە، سەرگەردانی، وشکبوونەوە یان تای زۆر بەرز.",
      };
    }

    return {
      cat: "monitor",
      pattern:
        state.lang === "en"
          ? "Early illness often looks non-specific. Observation, rest, and hydration are reasonable while you monitor."
          : "لە سەرەتای نەخۆشیدا زۆرجار نیشانەکان نادیارن؛ چاودێری، پشوو و ئاو گونجاوە.",
      why:
        state.lang === "en"
          ? "Few red-flag symptoms were selected; patterns may still change over 24–48 hours."
          : "نیشانە مەترسیدارەکان کەم هەڵبژێردراون؛ لە ٢٤–٤٨ کاتژمێردا دەتوانێت بگۆڕێت.",
      doText:
        state.lang === "en"
          ? "Continue monitoring; prioritize sleep and fluids; seek advice if symptoms evolve."
          : "چاودێری بەردەوام بکە؛ خەوتن و ئاو؛ ئەگەر نیشانەکان گۆڕان ڕاوێژ وەربگرە.",
      dontText:
        state.lang === "en"
          ? "Avoid antibiotic use without a clear bacterial indication from a clinician."
          : "بە بێ نیشانەی بەکتریایی ڕوون لە پزیشک ئانتیبیۆتیک مەکڕە.",
      worryText:
        state.lang === "en"
          ? "Seek care sooner if new warning signs appear (breathing, chest pain, confusion)."
          : "ئەگەر نیشانە هۆشداریی نوێ هات (هەناسە، ئازاری سینە، سەرگەردانی) زووتر سەردان بکە.",
    };
  }

  function anySymptomSelected() {
    return SYM_KEYS.some((k) => state.symptoms[k]);
  }

  function updateAbxInsightCard(opts) {
    const forcePattern = (opts && opts.forcePattern) || state.abxInsightFromAnalyze;
    const el = $("abxInsightCard");
    if (!el) return;

    if (!forcePattern && !anySymptomSelected()) {
      el.className = "abx-insight-card abx-insight-card--empty";
      el.innerHTML = `
        <div class="abx-insight-card__inner">
          <p class="abx-insight-card__kicker">${t("abxNeedHeading")}</p>
          <p class="abx-insight-card__result">${t("abxEmptyLead")}</p>
          <ul class="abx-insight-card__list">
            <li>${t("abxEmptyB1")}</li>
            <li>${t("abxEmptyB2")}</li>
          </ul>
        </div>`;
      return;
    }

    const r = analyzePattern();
    let tierClass = "abx-insight-card--low";
    let tierKey = "abxTierLow";

    if (r.cat === "seek") {
      tierClass = "abx-insight-card--attention";
      tierKey = "abxTierAttention";
    } else if (
      r.cat === "bacterial" ||
      (r.cat === "monitor" && (state.severity === "severe" || state.duration === "long"))
    ) {
      tierClass = "abx-insight-card--moderate";
      tierKey = "abxTierModerate";
    }

    let headlineKey;
    let b1Key;
    let b2Key;
    if (r.cat === "seek") {
      headlineKey = "abxCardSeekH";
      b1Key = "abxCardSeekB1";
      b2Key = "abxCardSeekB2";
    } else if (r.cat === "bacterial") {
      headlineKey = "abxCardBactH";
      b1Key = "abxCardBactB1";
      b2Key = "abxCardBactB2";
    } else if (r.cat === "viral") {
      headlineKey = "abxCardViralH";
      b1Key = "abxCardViralB1";
      b2Key = "abxCardViralB2";
    } else {
      const watch = state.severity === "severe" || state.duration === "long";
      headlineKey = watch ? "abxCardMonWatchH" : "abxCardMonH";
      b1Key = watch ? "abxCardMonWatchB1" : "abxCardMonB1";
      b2Key = watch ? "abxCardMonWatchB2" : "abxCardMonB2";
    }

    el.className = `abx-insight-card ${tierClass}`;
    el.innerHTML = `
      <div class="abx-insight-card__inner">
        <p class="abx-insight-card__kicker">${t("abxNeedHeading")}</p>
        <span class="abx-insight-card__tier">${t(tierKey)}</span>
        <p class="abx-insight-card__result">${t(headlineKey)}</p>
        <ul class="abx-insight-card__list">
          <li>${t(b1Key)}</li>
          <li>${t(b2Key)}</li>
        </ul>
      </div>`;
  }

  function showAnalyzerResult() {
    state.abxInsightFromAnalyze = true;
    const r = analyzePattern();
    const titles = {
      seek: { title: "resultSeek", badge: "resultSeekBadge" },
      bacterial: { title: "resultBact", badge: "resultBactBadge" },
      viral: { title: "resultViral", badge: "resultViralBadge" },
      monitor: { title: "resultMonitor", badge: "resultMonitorBadge" },
    };
    const Tm = titles[r.cat] || titles.monitor;
    const box = $("analyzerResult");
    box.classList.remove("hidden");
    box.innerHTML = `
      <span class="badge-cat">${t(Tm.badge)}</span>
      <h4>${t(Tm.title)}</h4>
      <div class="result-block"><strong>${t("resPattern")}</strong><p>${r.pattern}</p></div>
      <div class="result-block"><strong>${t("resWhy")}</strong><p>${r.why}</p></div>
      <div class="result-block"><strong>${t("resDo")}</strong><p>${r.doText}</p></div>
      <div class="result-block"><strong>${t("resDont")}</strong><p>${r.dontText}</p></div>
      <div class="result-block"><strong>${t("resWorry")}</strong><p>${r.worryText}</p></div>
    `;
    updateAbxInsightCard();
  }

  function renderWarnings() {
    const items = [
      {
        en: { h: "Fever more than 3 days", p: "Persistent fever can mean different causes—seek medical advice for evaluation." },
        ckb: { h: "تا زیاتر لە سێ ڕۆژ", p: "تای بەردەوام هۆکارەکانی جیاواز هەیە—بۆ پشکنین ڕاوێژی پزیشکی وەربگرە." },
      },
      {
        en: { h: "Trouble breathing", p: "Working hard to breathe, bluish lips, or silent chest needs urgent care." },
        ckb: { h: "قورسی هەناسەدان", p: "هەوڵدان بۆ هەناسە، لێو شین یان سینە بێدەنگ پێویستی بە فریاکەوتنە." },
      },
      {
        en: { h: "Chest pain or pressure", p: "New severe chest symptoms should be assessed promptly—do not ignore." },
        ckb: { h: "ئازار یان فشاری سینە", p: "نیشانە نوێ و توندی سینە پێویستی بە پشکنینی خێرا هەیە." },
      },
      {
        en: { h: "Dehydration", p: "Very low urine, dizziness, or inability to keep fluids down needs attention." },
        ckb: { h: "وشکبوونەوە", p: "میزکردنی زۆر کەم، سەرگەردانی یان نەتوانین ئاو بخوێنیت پێویستی بە چاودێرییە." },
      },
      {
        en: { h: "Confusion or unusual drowsiness", p: "Altered consciousness is a warning sign—seek urgent medical care." },
        ckb: { h: "سەرگەردانی یان خەوتنی نائاسایی", p: "گۆڕان لە هۆشدا هۆشدارییە—چاودێری خێرا." },
      },
      {
        en: { h: "Worsening symptoms", p: "If everything is getting worse instead of improving, escalate care." },
        ckb: { h: "خراپتربوونی نیشانەکان", p: "ئەگەر بە جیاتی باشبوون خراپتر دەبێت، چاودێری بەرز بکەرەوە." },
      },
      {
        en: { h: "Very high fever", p: "Extreme temperatures, especially with rash or stiff neck, need prompt review." },
        ckb: { h: "تای زۆر بەرز", p: "پلەی گەرمی زۆر بەرز، تایبەت لەگەڵ دەرک یان مۆقی ڕەق، پشکنینی خێرا دەوێت." },
      },
    ];
    $("warnCards").innerHTML = items
      .map((it) => {
        const x = state.lang === "en" ? it.en : it.ckb;
        return `<div class="warn-card"><h4>${x.h}</h4><p>${x.p}</p></div>`;
      })
      .join("");
  }

  function renderCompare() {
    const rows = [
      {
        en: ["Viruses", "Tiny intracellular parasites; need host cells to reproduce."],
        ckb: ["ڤایرۆسەکان", "ئەندامانی زۆر بچووکن؛ پێویستیان بە خانەی جەستە هەیە بۆ زۆربوونەوە."],
      },
      {
        en: ["Bacteria", "Single-celled organisms; some are harmless, some cause infection."],
        ckb: ["بەکتریاکان", "تاکی تاک خانە؛ هەندێک بێ زیانن، هەندێک تووشبوون دروست دەکەن."],
      },
      {
        en: ["When antibiotics help", "Confirmed or strongly suspected bacterial infections, as prescribed."],
        ckb: ["کاتێک ئانتیبیۆتیک یارمەتیدەرە", "تووشبوونی بەکتریایی دڵنیاکراو یان گومانێکی بەهێز، وەک دەرمان دەرکراوە."],
      },
      {
        en: ["When they do not", "Typical flu, most colds, many sore throats—viral causes dominate."],
        ckb: ["کاتێک یارمەتیدەر نین", "پەتا، زۆربەی ساردبوونەوە، هەندێک گەروەن—ڤایرۆس باوانە."],
      },
      {
        en: ["Examples", "Flu & common cold: viral. Some throat, urine, or skin infections: may be bacterial—clinician decides."],
        ckb: ["نموونەکان", "پەتا و ساردبوونەوە: ڤایرۆسی. هەندێک گەروەن/میز/پێست: لەوانەیە بەکتریایی بێت—پزیشک بڕیار دەدات."],
      },
    ];
    $("compareTableWrap").innerHTML = `
      <table class="compare-table">
        <thead><tr><th>${state.lang === "en" ? "Topic" : "بابەت"}</th><th>${state.lang === "en" ? "Summary" : "کورتە"}</th></tr></thead>
        <tbody>
          ${rows.map((r) => `<tr><td>${r[state.lang === "en" ? "en" : "ckb"][0]}</td><td>${r[state.lang === "en" ? "en" : "ckb"][1]}</td></tr>`).join("")}
        </tbody>
      </table>`;
  }

  function renderAwareness() {
    const lines = [
      state.lang === "en"
        ? "Use antibiotics only when a clinician prescribes them for a clear reason."
        : "ئانتیبیۆتیک تەنها کاتێک بەکاربهێنە کە پزیشک بە هۆکارێکی ڕوون دەی دەرکات.",
      state.lang === "en"
        ? "Complete the course as directed unless your clinician tells you to stop."
        : "دەرمانەکە وەک فەرمان تەواو بکە مەگەر پزیشک بڵێت وەستێنە.",
      state.lang === "en"
        ? "Never share antibiotics or use leftovers from an old illness."
        : "ئانتیبیۆتیک لەگەڵ کەسانی تر مەشەڕکە و دەرمانی کۆن مەکڕە.",
      state.lang === "en"
        ? "Prevention: vaccination where available, hand hygiene, masks in crowded outbreaks."
        : "پێشگیری: وەکسین ئەگەر بەردەست بێت، پاکیزەیی دەست، ماسک لە کۆڕەوەی تووشبوون.",
    ];
    $("awareList").innerHTML = lines.map((l) => `<li>${l}</li>`).join("");
  }

  function renderNatural() {
    const blocks = [
      {
        en: { t: "What helps comfort", b: "Warm fluids, humidified air, salt-water gargles (if suitable), light foods, and steady hydration." },
        ckb: { t: "چی ئاسایش دەکات", b: "شلە گەرم، هەوای نەم، غەرقکردنی گەروەن بە ئاو و خوێ بە شێوەی گونجاو، خۆراک سووک و ئاوی بەردەوام." },
      },
      {
        en: { t: "What supports recovery", b: "Sleep, balanced nutrition, gentle pacing, and avoiding smoke or strong irritants." },
        ckb: { t: "چی چاکبوون پشتیوانی دەکات", b: "خەوتن، خۆراک متوازن، هەنگاوی ئارام، دوورکەوتنەوە لە جگە و ماددە ئازارکەرەکان." },
      },
      {
        en: { t: "What to avoid", b: "Alcohol excess, dehydration, and taking prescription medicines without guidance." },
        ckb: { t: "چی خۆپارێزی لێ بکەیت", b: "زۆر خواردنەوەی کحول، وشکبوونەوە، دەرمانی دەرکردوو بە بێ ڕێنمایی." },
      },
      {
        en: { t: "When home care is not enough", b: "Warning signs in this page, persistent high fever, or feeling ‘not right’—seek professional care." },
        ckb: { t: "کاتێک چاودێری ماڵەوە کەمە", b: "نیشانە هۆشدارەکان، تای بەردەوام، هەست بە نائاسایی—چاودێری پزیشکی." },
      },
    ];
    $("naturalCareWrap").innerHTML = blocks
      .map((b) => {
        const x = b[state.lang === "en" ? "en" : "ckb"];
        return `<div class="insight-box" style="margin-top:0.75rem"><strong>${x.t}</strong><p style="margin:0.35rem 0 0">${x.b}</p></div>`;
      })
      .join("");
  }

  function renderNews() {
    const cards = [
      {
        tag: state.lang === "en" ? "Trends" : "ڕەوش",
        t: state.lang === "en" ? "Seasonal flu waves" : "شەپۆلی پەتا",
        b:
          state.lang === "en"
            ? "Activity varies by region and year—hygiene and vaccination remain key layers."
            : "چالاکی بە ناوچە و ساڵ دەگۆڕێت—پاکیزەیی و وەکسین هێشتا گرنگن.",
      },
      {
        tag: state.lang === "en" ? "Prevention" : "پێشگیری",
        t: state.lang === "en" ? "Hands, face, space" : "دەست، دەموچاو، مەودا",
        b:
          state.lang === "en"
            ? "Simple habits reduce spread in homes, schools, and workplaces."
            : "عادەتە سادەکان بڵاوبوونەوە لە ماڵ و قوتابخانە و کار کەم دەکەنەوە.",
      },
      {
        tag: state.lang === "en" ? "Vaccination" : "وەکسین",
        t: state.lang === "en" ? "Annual flu vaccine" : "وەکسینی پەتا ساڵانە",
        b:
          state.lang === "en"
            ? "Ask your clinician what is recommended for your age and health conditions."
            : "لە پزیشک بپرسە چی بۆ تەمەن و دۆخی تەندروستیت گونجاوە.",
      },
      {
        tag: state.lang === "en" ? "Public health" : "تەندروستی گشتی",
        t: state.lang === "en" ? "Community protection" : "پاراستنی کۆمەڵ",
        b:
          state.lang === "en"
            ? "Staying home when very ill protects vulnerable people around you."
            : "کاتێک زۆر نەخۆشی ماڵەوە بمێنەرەوە کەسانی لاواز دەپارێزیت.",
      },
    ];
    $("newsGrid").innerHTML = cards
      .map(
        (c) =>
          `<div class="news-card"><p class="tag">${c.tag}</p><h4 style="margin:0.35rem 0">${c.t}</h4><p class="muted small">${c.b}</p></div>`
      )
      .join("");
  }

  const FLU_SYM_KEYS = ["fever", "cough", "soreThroat", "fatigue", "runnyNose", "headache", "bodyAches"];

  const SYM_KEY_TO_I18N = {
    fever: "symFever",
    cough: "symCough",
    soreThroat: "symSore",
    fatigue: "symFatigue",
    runnyNose: "symRunny",
    headache: "symHead",
    bodyAches: "symBody",
  };

  function countFluSymptoms(symptoms) {
    return FLU_SYM_KEYS.filter((k) => symptoms && symptoms[k]).length;
  }

  function computeLogStatus(tempVal, symptomCount) {
    const tNum =
      tempVal === "" || tempVal == null || Number.isNaN(Number(tempVal)) ? null : Number(tempVal);
    const manySymptoms = symptomCount >= 5;
    const severalSymptoms = symptomCount >= 3;
    const fewSymptoms = symptomCount <= 2;
    const highTemp = tNum !== null && tNum >= 38.5;
    const midTemp = tNum !== null && tNum >= 37.5 && tNum < 38.5;
    const lowTemp = tNum === null || tNum < 37.5;

    if (highTemp || manySymptoms) return "high";
    if (midTemp || severalSymptoms) return "monitor";
    if (lowTemp && fewSymptoms) return "stable";
    return "monitor";
  }

  function migrateLegacyFluStorage() {
    try {
      if (localStorage.getItem(STORAGE_FLU)) return;
      const rawLegacy = localStorage.getItem(STORAGE_FLU_LEGACY);
      if (!rawLegacy) return;
      const arr = JSON.parse(rawLegacy);
      if (!Array.isArray(arr)) return;
      const migrated = arr.map((e, i) => {
        const symptoms = e.symptoms || {};
        const sc = countFluSymptoms(symptoms);
        const parsed =
          e.temp === "" || e.temp == null || e.temp === undefined ? null : parseFloat(e.temp);
        const okTemp = Number.isFinite(parsed) ? Math.round(parsed * 10) / 10 : null;
        return {
          id: e.id || `mig-${String(e.date)}-${i}`,
          date: e.date,
          temp: okTemp,
          symptoms,
          createdAt: e.createdAt || new Date().toISOString(),
          status: computeLogStatus(okTemp, sc),
        };
      });
      localStorage.setItem(STORAGE_FLU, JSON.stringify(migrated));
    } catch (_) {
      /* ignore */
    }
  }

  function loadFluLog() {
    migrateLegacyFluStorage();
    try {
      const raw = localStorage.getItem(STORAGE_FLU);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveFluLog(entries) {
    localStorage.setItem(STORAGE_FLU, JSON.stringify(entries));
  }

  function parseTempInput(val) {
    if (val === "" || val == null) return null;
    const n = parseFloat(val);
    return Number.isFinite(n) ? Math.round(n * 10) / 10 : null;
  }

  function sortFluEntriesDesc(entries) {
    return entries.slice().sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }

  function sortFluEntriesAsc(entries) {
    return entries.slice().sort((a, b) => {
      if (a.date !== b.date) return a.date > b.date ? 1 : -1;
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    });
  }

  function statusLabel(level) {
    if (level === "high") return t("statusHigh");
    if (level === "stable") return t("statusStable");
    return t("statusMonitor");
  }

  function formatCreatedTime(iso) {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      return d.toLocaleString(state.lang === "en" ? "en-GB" : "ckb-IQ", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return "";
    }
  }

  function computeTrendMessage(entriesChrono) {
    if (entriesChrono.length === 0) return t("fluTrendStart");
    if (entriesChrono.length === 1) return t("fluTrendFirst");
    const prev = entriesChrono[entriesChrono.length - 2];
    const last = entriesChrono[entriesChrono.length - 1];
    const lastCount = countFluSymptoms(last.symptoms);
    const prevCount = countFluSymptoms(prev.symptoms);
    const lastT = last.temp;
    const prevT = prev.temp;
    if (lastT != null && prevT != null && lastT > prevT + 0.2) return t("trendFeverUp");
    if (lastCount < prevCount) return t("trendImproving");
    if (lastCount > prevCount) return t("trendWorse");
    if (
      lastCount === prevCount &&
      lastT != null &&
      prevT != null &&
      Math.abs(lastT - prevT) < 0.15
    )
      return t("trendStable");
    return t("trendMonitor");
  }

  function tempBarPercent(temp) {
    if (temp == null || !Number.isFinite(temp)) return 0;
    const min = 35;
    const max = 42;
    const p = ((temp - min) / (max - min)) * 100;
    return Math.max(0, Math.min(100, p));
  }

  function renderFluFormOptions() {
    const fd = $("fluDate");
    if (fd) fd.value = new Date().toISOString().slice(0, 10);
  }

  function renderFluSymptomChecks() {
    const root = $("fluSymptomChecks");
    if (!root) return;
    root.innerHTML = FLU_SYM_KEYS.map(
      (k) =>
        `<label class="check-row"><input type="checkbox" data-flus="${k}"><span>${t(SYM_KEY_TO_I18N[k])}</span></label>`
    ).join("");
  }

  function collectFluSymptoms() {
    const o = {};
    FLU_SYM_KEYS.forEach((k) => {
      o[k] = false;
    });
    document.querySelectorAll("#fluSymptomChecks input[data-flus]").forEach((inp) => {
      o[inp.dataset.flus] = inp.checked;
    });
    return o;
  }

  function showFluSaveToast() {
    const el = $("fluSaveToast");
    if (!el) return;
    el.textContent = t("fluSaveSuccess");
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add("is-visible"));
    clearTimeout(window.__fluToastT);
    window.__fluToastT = setTimeout(() => {
      el.classList.remove("is-visible");
      setTimeout(() => {
        el.hidden = true;
      }, 280);
    }, 3000);
  }

  function renderSavedFluLogs(sortedDesc) {
    const wrap = $("fluSavedLogs");
    if (!wrap) return;
    if (!sortedDesc.length) {
      wrap.innerHTML = `<p class="flu-empty-logs muted">${t("noLogsYet")}</p>`;
      return;
    }
    wrap.innerHTML = sortedDesc
      .map((e) => {
        const level = e.status || computeLogStatus(e.temp, countFluSymptoms(e.symptoms));
        const syms = FLU_SYM_KEYS.filter((k) => e.symptoms && e.symptoms[k])
          .map((k) => t(SYM_KEY_TO_I18N[k]))
          .join(", ");
        const tempStr =
          e.temp != null && Number.isFinite(e.temp) ? `${e.temp}°C` : "—";
        return `<article class="flu-log-card flu-log-card--${level}" data-log-id="${e.id}">
          <div class="flu-log-card__top">
            <span class="status-pill status-pill--${level}">${statusLabel(level)}</span>
            <button type="button" class="flu-log-delete" data-delete-log="${e.id}" aria-label="${t("deleteLogAria")}">×</button>
          </div>
          <p class="flu-log-card__date">${e.date}</p>
          <p class="flu-log-card__meta"><span class="muted">${t("fieldTemp")}:</span> <strong>${tempStr}</strong></p>
          <p class="flu-log-card__syms">${syms || "—"}</p>
          <p class="flu-log-card__created small muted">${formatCreatedTime(e.createdAt)}</p>
        </article>`;
      })
      .join("");
  }

  function renderFluUI() {
    migrateLegacyFluStorage();
    const entries = loadFluLog();
    const sortedDesc = sortFluEntriesDesc(entries);
    const chrono = sortFluEntriesAsc(entries);
    const trendMsg = computeTrendMessage(chrono);
    const uniqueDays = new Set(entries.map((e) => e.date)).size;
    const maxDays = 14;
    const pct = Math.min(100, (uniqueDays / maxDays) * 100);
    const barEl = $("fluProgressBar");
    if (barEl) barEl.style.width = pct + "%";

    const last = sortedDesc[0];
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayCandidates = sortedDesc.filter((e) => e.date === todayStr);
    const todayEntry =
      todayCandidates.length > 0
        ? todayCandidates.reduce((a, b) =>
            new Date(a.createdAt || 0) > new Date(b.createdAt || 0) ? a : b
          )
        : null;
    const symptomCountToday = todayEntry ? countFluSymptoms(todayEntry.symptoms) : null;

    const tempFill = $("fluTempBarFill");
    const tempMarker = $("fluTempBarMarker");
    if (last && last.temp != null && Number.isFinite(last.temp)) {
      const p = tempBarPercent(last.temp);
      if (tempFill) tempFill.style.width = p + "%";
      if (tempMarker) tempMarker.style.left = `calc(${p}% - 6px)`;
    } else {
      if (tempFill) tempFill.style.width = "0%";
      if (tempMarker) tempMarker.style.left = "0%";
    }

    const card = $("fluProgressCard");
    if (card) {
      const dash = "—";
      const latestTemp =
        last && last.temp != null && Number.isFinite(last.temp) ? `${last.temp}°C` : dash;
      const symToday =
        symptomCountToday !== null ? String(symptomCountToday) : dash;

      card.innerHTML =
        entries.length === 0
          ? `<p class="muted flu-progress-empty">${t("noLogsYet")}</p>`
          : `<div class="flu-progress-stats">
          <div class="flu-stat flu-stat--blue">
            <span class="flu-stat__value">${uniqueDays}</span>
            <span class="flu-stat__label">${t("progressDays")}</span>
          </div>
          <div class="flu-stat flu-stat--info">
            <span class="flu-stat__value">${latestTemp}</span>
            <span class="flu-stat__label">${t("progressLatestTemp")}</span>
          </div>
          <div class="flu-stat flu-stat--amber">
            <span class="flu-stat__value">${symToday}</span>
            <span class="flu-stat__label">${t("progressSymptomsToday")}</span>
          </div>
        </div>
        <p class="flu-trend-line">${trendMsg}</p>
        <p class="flu-progress-hint small muted">${t("progressTotalHint")}</p>`;
    }

    renderSavedFluLogs(sortedDesc);

    const fluTimeline = $("fluTimeline");
    if (fluTimeline) {
      fluTimeline.innerHTML =
        sortedDesc
          .map((e) => {
            const syms = FLU_SYM_KEYS.filter((k) => e.symptoms && e.symptoms[k])
              .map((k) => t(SYM_KEY_TO_I18N[k]))
              .join(", ");
            const tempShow =
              e.temp != null && Number.isFinite(e.temp) ? `${e.temp}°C` : "—";
            return `<div class="timeline-entry">
          <strong>${e.date}</strong> · ${tempShow}
          <p class="small muted">${syms || "—"}</p>
        </div>`;
          })
          .join("") ||
        `<p class="muted">${state.lang === "en" ? "No timeline data." : "هێشتا داتا نییە."}</p>`;
    }
  }

  function handleSaveFluLog() {
    const dateEl = $("fluDate");
    const tempEl = $("fluTemp");
    if (!dateEl || !dateEl.value) return;
    const symptoms = collectFluSymptoms();
    const temp = parseTempInput(tempEl ? tempEl.value : "");
    const sc = countFluSymptoms(symptoms);
    const status = computeLogStatus(temp, sc);
    const entry = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `flu-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      date: dateEl.value,
      temp,
      symptoms,
      createdAt: new Date().toISOString(),
      status,
    };
    const all = loadFluLog();
    all.push(entry);
    saveFluLog(all);
    renderFluUI();
    document.querySelectorAll("#fluSymptomChecks input[data-flus]").forEach((i) => {
      i.checked = false;
    });
    if (tempEl) tempEl.value = "";
    showFluSaveToast();
  }

  function deleteFluEntry(id) {
    const all = loadFluLog().filter((e) => e.id !== id);
    saveFluLog(all);
    renderFluUI();
  }

  const ANT_CLASSES = [
    {
      id: "pen",
      en: {
        n: "Penicillins",
        what: "Beta-lactam antibiotics that weaken bacterial cell walls.",
        for: "Some strep throat, ear infections, skin infections—when bacterial cause is suspected/confirmed.",
        ex: "Penicillin V, amoxicillin, ampicillin",
        not: "Viral colds, flu, most coughs without bacterial pneumonia.",
        caut: "Allergy screening matters; complete course when prescribed.",
        why: "Wrong use drives resistance and allergic risk without benefit.",
      },
      ckb: {
        n: "پێنیسیلینەکان",
        what: "ئانتیبیۆتیکی بێتا-لاکتام کە دیواری خانەی بەکتریا لاواز دەکەن.",
        for: "هەندێک گەروەنی ستریپ، تووشبوونی گوێ، پێست—کاتێک هۆکاری بەکتریایی گومان یان دڵنیاکراوە.",
        ex: "پێنیسیلین ڤی، ئەمۆکسیسیلین، ئەمپیسیلین",
        not: "ساردبوونەوە و پەتا و زۆربەی کۆخەکان بێ پەنۆمۆنیای بەکتریایی.",
        caut: "پشکنینی ئەلەرژی گرنگە؛ کۆرس تەواو بکە کاتێک دەرکراوە.",
        why: "بەکارهێنانی هەڵە بەرگری دروست دەکات و مەترسی ئەلەرژی بەبێ سوود.",
      },
    },
    {
      id: "ceph",
      en: {
        n: "Cephalosporins",
        what: "Beta-lactam cousins with broad coverage depending on generation.",
        for: "Selected respiratory, urinary, skin, and surgical prophylaxis cases—as prescribed.",
        ex: "Cephalexin, ceftriaxone (hospital use)",
        not: "Routine viral illnesses.",
        caut: "Cross-allergy possible in some penicillin-allergic patients—clinician decision.",
        why: "Spectrum must match infection site and severity.",
      },
      ckb: {
        n: "سێفالۆسپۆرینەکان",
        what: "خۆشەویستی بێتا-لاکتام بە داپۆشینی جیاواز بەپێی نەو.",
        for: "هەندێک هەناسە، میز، پێست و کاتەکانی پێشگیری نەشتەرگەری—وەک دەرمان.",
        ex: "سێفالێکسین، سێفتریئاکسۆن (زۆرجار لە نەخۆشخانە)",
        not: "نەخۆشی ڤایرۆسی ڕۆتین.",
        caut: "لە هەندێک تووشبووی ئەلەرژی پێنیسیلیندا ئەلەرژی هاوبەش ڕوودەدات—بڕیاری پزیشک.",
        why: "پێویستە داپۆشین بگونجێت لەگەڵ شوێن و توندی تووشبوون.",
      },
    },
    {
      id: "macro",
      en: {
        n: "Macrolides",
        what: "They block bacterial protein production.",
        for: "Some atypical pneumonia, certain strep scenarios, selected skin/soft tissue plans.",
        ex: "Azithromycin, clarithromycin, erythromycin",
        not: "Typical viral flu as a default self-treatment.",
        caut: "Drug interactions and QT prolongation risk in some people.",
        why: "Not ‘stronger’—just different spectrum and side-effect profile.",
      },
      ckb: {
        n: "ماکرۆلیدەکان",
        what: "بەرهەمهێنانی پرۆتینی بەکتریا ڕاگر دەگرن.",
        for: "هەندێک پەنۆمۆنیای نائاسایی، هەندێک حاڵەتی گەروەن، پلانی دیاریکراوی پێست.",
        ex: "ئەزithromycin، کلاریترۆمایسین، ئەریترۆمایسین",
        not: "پەتا ڤایرۆسی وەک چارەسەری خۆکار.",
        caut: "تێکەڵبوون لەگەڵ دەرمان و مەترسی درێژکردنەوەی QT لە هەندێک کەس.",
        why: "بەهێزتر نین—تەنها داپۆشین و لایەنی لاوەکی جیاوازە.",
      },
    },
    {
      id: "tetra",
      en: {
        n: "Tetracyclines",
        what: "Broad-spectrum protein synthesis inhibitors.",
        for: "Some respiratory/skin plans, selected tick-borne or atypical infections—clinician guided.",
        ex: "Doxycycline, minocycline",
        not: "Young children and pregnancy have specific restrictions.",
        caut: "Sun sensitivity; take with water; avoid lying down immediately after some forms.",
        why: "Timing and patient factors determine safety.",
      },
      ckb: {
        n: "تێتراسایکلینەکان",
        what: "دژە بەکتریا بە پانی داپۆشین؛ ڕاگرێکی پرۆتین.",
        for: "هەندێک پلانی هەناسە/پێست، هەندێک تووشبوونی کرم/نائاسایی—بە ڕێنمایی پزیشک.",
        ex: "دۆکساسایکلین، مینۆسایکلین",
        not: "منداڵی بچووک و دوگیان سنووردارکردنی تایبەت هەیە.",
        caut: "هەستیاری بە هەتاو؛ لەگەڵ ئاو؛ دوای هەندێک شێواز خەوتن خێرا مەکە.",
        why: "کات و تایبەتمەندی کەس سەلامەتی دیاری دەکات.",
      },
    },
    {
      id: "fluoro",
      en: {
        n: "Fluoroquinolones",
        what: "Broad DNA-gyrase targeting agents with notable side-effect considerations.",
        for: "Selected urinary, GI, and respiratory infections when appropriate—often reserved.",
        ex: "Ciprofloxacin, levofloxacin",
        not: "First-line for simple viral illnesses.",
        caut: "Tendon, nerve, and mood side effects exist—use only when clearly indicated.",
        why: "Overuse harms patients and resistance patterns.",
      },
      ckb: {
        n: "فلۆرۆکینۆلۆنەکان",
        what: "دژە بەکتریا بە پانی بە لایەنی لاوەکی گرنگ.",
        for: "هەندێک میز، هەرس، هەناسە—زۆرجار پاش هەڵبژاردەکانی تر.",
        ex: "سیپرۆفلۆکساسین، لێڤۆفلۆکساسین",
        not: "هێڵی یەکەم بۆ نەخۆشی ڤایرۆسی سادە.",
        caut: "لایەنی لاوەکی بۆ تەندۆن، دەماغ و هەست هەیە—تەنها کاتێک نیشانە ڕوونە.",
        why: "بەکارهێنانی زۆر زیان بە کەس و بەرگری دەگەیەنێت.",
      },
    },
    {
      id: "sulfa",
      en: {
        n: "Sulfonamides",
        what: "Folate pathway inhibitors combined in common formulations.",
        for: "Some urinary and certain pneumocystis plans—context-specific.",
        ex: "Trimethoprim-sulfamethoxazole",
        not: "Viral upper respiratory infections by default.",
        caut: "Hydration, sun sensitivity, and drug interactions.",
        why: "Allergy and side-effect profiles require medical oversight.",
      },
      ckb: {
        n: "سۆلفۆنامیدەکان",
        what: "ڕاگرەکانی ڕێڕەوی فۆلات لە فۆرمولەی تێکەڵ.",
        for: "هەندێک میز و هەندێک پلانی تایبەت—بەپێی دۆخ.",
        ex: "ترایمێتۆپریم-سۆلفامێتۆکسازۆل",
        not: "تووشبوونی سەرەوە ڤایرۆسی وەک بنەڕەت.",
        caut: "ئاو، هەستیاری هەتاو، تێکەڵبوونی دەرمان.",
        why: "ئەلەرژی و لایەنی لاوەکی پێویستی بە چاودێری پزیشکی هەیە.",
      },
    },
    {
      id: "amino",
      en: {
        n: "Aminoglycosides",
        what: "Potent agents often used in serious infections with monitoring.",
        for: "Serious gram-negative infections—typically inpatient with kidney/hearing monitoring.",
        ex: "Gentamicin, amikacin",
        not: "Home treatment for colds.",
        caut: "Kidney and ear toxicity—requires labs and dosing expertise.",
        why: "Reserved for specific scenarios due to toxicity.",
      },
      ckb: {
        n: "ئامینۆگلایکۆسیدەکان",
        what: "دەرمانێکی بەهێز بۆ تووشبوونی جیدی بە چاودێری.",
        for: "تووشبوونی گرام-نێگیتیڤی جیدی—زۆرجار لە نەخۆشخانە لەگەڵ چاودێری گورچیلە و گوێ.",
        ex: "جێنتامایسین، ئامیکاسین",
        not: "چارەسەری ماڵەوە بۆ ساردبوونەوە.",
        caut: "تووکچی گورچیلە و گوێ—پێویستی بە تاقیکردنەوە و دۆزە زانستییە.",
        why: "بۆ حاڵەتە دیاریکراوەکان دەپارێزرێت بەهۆی تووکچی.",
      },
    },
    {
      id: "nitro",
      en: {
        n: "Nitroimidazoles",
        what: "Agents with anaerobic coverage; metronidazole is a key example.",
        for: "Certain anaerobic and protozoal infections as prescribed.",
        ex: "Metronidazole",
        not: "Routine viral sore throat.",
        caut: "Avoid alcohol; neurological side effects if misused.",
        why: "Spectrum is specific—not a substitute for correct diagnosis.",
      },
      ckb: {
        n: "نایترۆئیمیدازۆلەکان",
        what: "داپۆشینی ئەنایەڕۆبی؛ مێترۆنیدازۆل نموونەی سەرەکییە.",
        for: "هەندێک تووشبوونی ئەنایەڕۆبی و پرۆتۆزۆیی وەک دەرمان.",
        ex: "مێترۆنیدازۆل",
        not: "گەروەنی ڤایرۆسی ڕۆتین.",
        caut: "کحول مەکە؛ لایەنی دەماغی ئەگەر بە هەڵە بەکاربهێنرێت.",
        why: "داپۆشین تایبەتە—جێگای دۆزینەوەی دروست ناگرێتەوە.",
      },
    },
    {
      id: "carba",
      en: {
        n: "Carbapenems",
        what: "Broad beta-lactams reserved for complex infections.",
        for: "Hospital-selected multidrug-resistant scenarios—specialist-led.",
        ex: "Meropenem, imipenem",
        not: "Outpatient flu care.",
        caut: "Resistance stewardship is critical.",
        why: "Powerful agents require strict medical governance.",
      },
      ckb: {
        n: "کارباپێنەمەکان",
        what: "بێتا-لاکتامی بە پانی بۆ تووشبوونی ئاڵۆز.",
        for: "حاڵەتی نەخۆشخانە و بەرگری دژ بە دەرمان—بە سەرپەرشتی شارەزا.",
        ex: "مێرۆپێنەم، ئیمێپێنەم",
        not: "چاودێری پەتا لە دەرەوە.",
        caut: "بەڕێوەبردنی بەرگری گرنگە.",
        why: "دەرمانێکی بەهێز پێویستی بە بەڕێوەبردنی پزیشکی توند هەیە.",
      },
    },
    {
      id: "glyco",
      en: {
        n: "Glycopeptides",
        what: "Cell wall agents used for serious gram-positive infections.",
        for: "Serious MRSA-related plans and some C. difficile strategies—hospital context often.",
        ex: "Vancomycin",
        not: "Simple viral illnesses.",
        caut: "Kidney monitoring; infusion reactions—hospital protocols.",
        why: "Reserved for targeted bacterial threats.",
      },
      ckb: {
        n: "گلایکۆپێپتیدەکان",
        what: "دژ بە دیواری خانە بۆ تووشبوونی گرام-پۆزیتیڤی جیدی.",
        for: "هەندێک پلانی MRSA و هەندێک ستراتیژی کڵۆستریدیوم—زۆرجار نەخۆشخانە.",
        ex: "ڤانکۆمایسین",
        not: "نەخۆشی ڤایرۆسی سادە.",
        caut: "چاودێری گورچیلە؛ کاردانەوەی دەرمان—پڕۆتۆکۆڵی نەخۆشخانە.",
        why: "بۆ مەترسی بەکتریایی دیاریکراو دەپارێزرێت.",
      },
    },
  ];

  const DRUGS = [
    {
      en: { n: "Penicillin", cl: "Penicillin", tr: "Strep throat (when bacterial), some skin infections", no: "Flu, common cold", ca: "Allergy; use only as prescribed" },
      ckb: { n: "پێنیسیلین", cl: "پێنیسیلین", tr: "گەروەنی ستریپ (کاتێک بەکتریاییە)، هەندێک پێست", no: "پەتا، ساردبوونەوە", ca: "ئەلەرژی؛ تەنها وەک دەرمان" },
    },
    {
      en: { n: "Amoxicillin", cl: "Aminopenicillin", tr: "Some ear/sinus/skin infections when indicated", no: "Typical viral flu", ca: "Allergies; complete course if prescribed" },
      ckb: { n: "ئەمۆکسیسیلین", cl: "ئامینۆپێنیسیلین", tr: "هەندێک گوێ/سینوس/پێست کاتێک نیشانە هەیە", no: "پەتا ڤایرۆسی باو", ca: "ئەلەرژی؛ کۆرس تەواو بکە" },
    },
    {
      en: { n: "Azithromycin", cl: "Macrolide", tr: "Selected atypical/bacterial plans per clinician", no: "Default treatment for viral colds", ca: "Interactions; heart rhythm risk in some" },
      ckb: { n: "ئەزithromycin", cl: "ماکرۆلید", tr: "هەندێک پلانی بەکتریایی/نائاسایی بەپێی پزیشک", no: "چارەسەری بنەڕەتی ساردبوونەوە", ca: "تێکەڵبوون؛ مەترسی ڕیتمی دڵ لە هەندێک کەس" },
    },
    {
      en: { n: "Cephalexin", cl: "1st-gen cephalosporin", tr: "Some skin/UTI plans", no: "Viral upper respiratory illness alone", ca: "Allergy cross-reactivity possible" },
      ckb: { n: "سێفالێکسین", cl: "سێفالۆسپۆرینی نەو یەکەم", tr: "هەندێک پێست/میز", no: "تەنها نەخۆشی سەرەوە ڤایرۆسی", ca: "ئەلەرژی هاوبەش ڕوودەدات" },
    },
    {
      en: { n: "Doxycycline", cl: "Tetracycline", tr: "Some atypical pneumonia/tick-related plans", no: "Routine childhood colds", ca: "Not for young kids/pregnancy per guidance" },
      ckb: { n: "دۆکساسایکلین", cl: "تێتراسایکلین", tr: "هەندێک پەنۆمۆنیای نائاسایی/کرم", no: "ساردبوونەوەی منداڵی بچووک وەک ڕۆتین", ca: "منداڵی بچووک و دوگیان سنووردارە" },
    },
    {
      en: { n: "Ciprofloxacin", cl: "Fluoroquinolone", tr: "Selected urinary/GI infections when appropriate", no: "Simple viral flu", ca: "Tendon/nerve risks; not first-line casually" },
      ckb: { n: "سیپرۆفلۆکساسین", cl: "فلۆرۆکینۆلۆن", tr: "هەندێک میز/هەرس کاتێک گونجاوە", no: "پەتا ڤایرۆسی سادە", ca: "مەترسی تەندۆن/دەمار؛ نەک هێڵی یەکەم بە ئاسانی" },
    },
    {
      en: { n: "Metronidazole", cl: "Nitroimidazole", tr: "Anaerobic and certain protozoal infections", no: "Viral sore throat by default", ca: "No alcohol; specific indications only" },
      ckb: { n: "مێترۆنیدازۆل", cl: "نایترۆئیمیدازۆل", tr: "ئەنایەڕۆبی و هەندێک پرۆتۆزۆ", no: "گەروەنی ڤایرۆسی بنەڕەت", ca: "کحول مەکە؛ تەنها نیشانەی دیاریکراو" },
    },
    {
      en: { n: "Vancomycin", cl: "Glycopeptide", tr: "Serious MRSA-related infections—hospital dosing", no: "Home flu care", ca: "Kidney monitoring; specialist use" },
      ckb: { n: "ڤانکۆمایسین", cl: "گلایکۆپێپتید", tr: "تووشبوونی جیدی MRSA—دۆزی نەخۆشخانە", no: "چاودێری پەتا لە ماڵەوە", ca: "چاودێری گورچیلە؛ بەکارهێنانی شارەزا" },
    },
  ];

  function renderLibrary() {
    $("libraryInsight").innerHTML = `<p>${t("libraryInsight")}</p>`;
    $("clinicalInsight2").innerHTML = `<p>${t("clinical2")}</p>`;
    const L = state.lang === "en" ? "en" : "ckb";
    $("libraryCategories").innerHTML = ANT_CLASSES.map(
      (c) => `
      <details class="lib-cat">
        <summary>${c[L].n}</summary>
        <div class="lib-body">
          <dl>
            <dt>${L === "en" ? "What it is" : "چییە"}</dt><dd>${c[L].what}</dd>
            <dt>${L === "en" ? "May be used for" : "لەوانەیە بۆ ئەمانە بەکاربهێنرێت"}</dt><dd>${c[L].for}</dd>
            <dt>${L === "en" ? "Common examples" : "نموونە باوەکان"}</dt><dd>${c[L].ex}</dd>
            <dt>${L === "en" ? "Usually not for" : "زۆرجار نەبۆ ئەمانە"}</dt><dd>${c[L].not}</dd>
            <dt>${L === "en" ? "Important caution" : "ئاگاداری گرنگ"}</dt><dd>${c[L].caut}</dd>
            <dt>${L === "en" ? "Why prescription quality matters" : "بۆچی دەرکردنی دروست گرنگە"}</dt><dd>${c[L].why}</dd>
          </dl>
        </div>
      </details>`
    ).join("");
    $("drugCards").innerHTML = DRUGS.map((d) => {
      const x = d[L];
      return `<div class="drug-card"><h4>${x.n}</h4><div class="class-tag">${x.cl}</div>
        <p><strong>${L === "en" ? "May be prescribed for" : "لەوانەیە دەرمان بێت بۆ"}:</strong> ${x.tr}</p>
        <p><strong>${L === "en" ? "Does not treat" : "چارەسەر ناکات"}:</strong> ${x.no}</p>
        <p class="small muted"><strong>${L === "en" ? "Caution" : "ئاگاداری"}:</strong> ${x.ca}</p></div>`;
    }).join("");
  }

  const MYTH_Q = [
    {
      en: { q: "Antibiotics cure flu.", m: "Flu is viral; antibiotics do not cure it unless a separate bacterial infection exists.", corr: "myth" },
      ckb: { q: "ئانتیبیۆتیک پەتا چاک دەکات.", m: "پەتا ڤایرۆسییە؛ ئانتیبیۆتیک چارەسەری ناکات مەگەر تووشبوونی بەکتریایی جیاواز هەبێت.", corr: "myth" },
    },
    {
      en: { q: "Stopping antibiotics early is okay if you feel better.", m: "Stopping early can fail treatment and fuel resistance—follow clinician advice.", corr: "myth" },
      ckb: { q: "زوو وەستاندنی ئانتیبیۆتیک باشە ئەگەر هەست بە باشبوون کرد.", m: "زوو وەستاندن دەتوانێت چارەسەر شکست بێنێت و بەرگری دروست بکات—فەرمانی پزیشک جێبەجێ بکە.", corr: "myth" },
    },
    {
      en: { q: "Hydration helps recovery.", m: "Fluids support circulation, mucus clearance, and comfort during illness.", corr: "truth" },
      ckb: { q: "ئاوبوونەوە یارمەتی چاکبوون دەدات.", m: "شلە خوێڕەوانی و ئاسایشی ئاسان دەکات لە نەخۆشییدا.", corr: "truth" },
    },
    {
      en: { q: "Viral infections always need antibiotics.", m: "Most viral infections do not benefit from antibiotics.", corr: "myth" },
      ckb: { q: "تووشبوونی ڤایرۆسی هەمیشە پێویستی بە ئانتیبیۆتیکە.", m: "زۆربەی تووشبوونی ڤایرۆسی لە ئانتیبیۆتیک سوود وەرناگرن.", corr: "myth" },
    },
    {
      en: { q: "Hand hygiene reduces spread of respiratory viruses.", m: "Cleaning hands lowers transmission risk in households and communities.", corr: "truth" },
      ckb: { q: "پاکیزەیی دەست بڵاوبوونەوەی ڤایرۆسی کەم دەکاتەوە.", m: "دەستشۆردن مەترسی گواستنەوە لە ماڵ و کۆمەڵ کەم دەکاتەوە.", corr: "truth" },
    },
    {
      en: { q: "Leftover antibiotics are safe to use next time.", m: "Old antibiotics may be wrong drug, wrong dose, or harmful—avoid self-use.", corr: "myth" },
      ckb: { q: "ئانتیبیۆتیکی ماوە بۆ جارێکی تر سەلامەتە.", m: "دەرمانی کۆن ڕەنگە هەڵبێت یان دۆزی هەڵ—خۆت چارەسەر مەکە.", corr: "myth" },
    },
  ];

  const RECOVERY_OPTS = [
    { id: "rest", good: true, en: "Rest", ckb: "پشوو" },
    { id: "water", good: true, en: "Water / fluids", ckb: "ئاو / شلە" },
    { id: "sleep", good: true, en: "Sleep", ckb: "خەوتن" },
    { id: "food", good: true, en: "Healthy food", ckb: "خۆراکی تەندروست" },
    { id: "steam", good: true, en: "Steam / humid air", ckb: "هەڵم / هەوای نەم" },
    { id: "soup", good: true, en: "Warm soup", ckb: "شۆربای گەرم" },
    { id: "doc", good: true, en: "Doctor visit if worsening", ckb: "سەردانی پزیشک ئەگەر خراپتر بوو" },
    { id: "abx", good: false, en: "Antibiotics without prescription", ckb: "ئانتیبیۆتیک بێ دەرکردن" },
  ];

  const SCENARIOS = [
    {
      en: {
        q: "Sore throat and fever for 1 day. What is the best first step?",
        opts: [
          { k: "abx", ok: false, t: "Take antibiotics immediately" },
          { k: "mon", ok: true, t: "Monitor, hydrate, rest, and seek review if worse" },
          { k: "ign", ok: false, t: "Ignore completely" },
          { k: "er", ok: false, t: "Assume emergency for every fever" },
        ],
        exp: "Early viral illness often needs monitoring first; clinicians decide if testing/treatment is needed.",
      },
      ckb: {
        q: "ئازاری گەروەن و تا بۆ ١ ڕۆژ. باشترین هەنگاوی یەکەم؟",
        opts: [
          { k: "abx", ok: false, t: "دەرەمجە ئانتیبیۆتیک" },
          { k: "mon", ok: true, t: "چاودێری، ئاو، پشوو؛ ئەگەر خراپتر بوو پشکنین" },
          { k: "ign", ok: false, t: "تەواو پشتگوێ بخە" },
          { k: "er", ok: false, t: "هەموو تا فریاکەوتنە" },
        ],
        exp: "لە سەرەتادا زۆرجار چاودێری پێویستە؛ پزیشک بڕیاری تاقیکردنەوە/چارەسەر دەدات.",
      },
    },
    {
      en: {
        q: "You have cough and runny nose but breathe normally. Most likely?",
        opts: [
          { k: "v", ok: true, t: "Viral upper respiratory pattern—supportive care" },
          { k: "b", ok: false, t: "Definitely bacterial—take antibiotics" },
          { k: "ig", ok: false, t: "No care needed at all" },
          { k: "st", ok: false, t: "Only steroids without advice" },
        ],
        exp: "Typical cold symptoms often follow viral patterns; antibiotics are not first-line.",
      },
      ckb: {
        q: "کۆخە و ئاوی لووت هەیە بەڵام هەناسەت ئاسایە. زۆرینەی کات؟",
        opts: [
          { k: "v", ok: true, t: "شێوازی سەرەوە ڤایرۆسی—چاودێری پشتیوان" },
          { k: "b", ok: false, t: "دڵنیابەکتریایی—ئانتیبیۆتیک بگرە" },
          { k: "ig", ok: false, t: "هیچ چاودێرییەک پێویست نییە" },
          { k: "st", ok: false, t: "تەنها ستیرۆید بێ ڕاوێژ" },
        ],
        exp: "نیشانەکانی ساردبوونەوە زۆرجار ڤایرۆس دەناسێنن؛ ئانتیبیۆتیک هێڵی یەکەم نییە.",
      },
    },
  ];

  const QUIZ_Q = [
    {
      en: { q: "Influenza is caused by:", a: ["Bacteria", "Viruses", "Fungi", "Allergies"], i: 1 },
      ckb: { q: "پەتا بە چی دروست دەبێت؟", a: ["بەکتریا", "ڤایرۆس", "قەڕەچووک", "ئەلەرژی"], i: 1 },
    },
    {
      en: { q: "Antibiotics target:", a: ["Viruses primarily", "Bacteria", "Vitamins", "Pain signals"], i: 1 },
      ckb: { q: "ئانتیبیۆتیک لەسەر چی کاریگەرە؟", a: ["سەرەتا ڤایرۆس", "بەکتریا", "ڤیتامین", "ئازار"], i: 1 },
    },
    {
      en: { q: "Antimicrobial resistance means:", a: ["Drugs work better over time", "Germs adapt and drugs can fail", "Only allergies", "Only children"], i: 1 },
      ckb: { q: "بەرگری دژ بە دەرمان واتای:", a: ["دەرمان باشتر دەبێت", "میکرۆب دەگۆڕێت و دەرمان شکست دەهێنێت", "تەنها ئەلەرژی", "تەنها منداڵ"], i: 1 },
    },
    {
      en: { q: "A key supportive step during flu is:", a: ["Dehydration", "Rest and fluids", "Skipping sleep", "Ignoring fever always"], i: 1 },
      ckb: { q: "یەک هەنگاوی پشتیوانی گرنگ لە پەتادا:", a: ["وشکبوونەوە", "پشوو و ئاو", "خەوتن فەرامۆش بکە", "تا پشتگوێ بخە"], i: 1 },
    },
    {
      en: { q: "Why finish a prescribed antibiotic course (unless told to stop)?", a: ["To kill bacteria more completely and reduce resistance risk", "To use fewer pills", "Because more is always better", "No reason"], i: 0 },
      ckb: { q: "بۆچی کۆرسی دەرکردوو تەواو بکەیت (مەگەر فەرمان بدرێت وەستێنرێت)؟", a: ["بۆ مردنی تەواوتری بەکتریا و کەمکردنەوەی مەترسی بەرگری", "بۆ کەمتر خواردنەوەی حەب", "چونکە زۆرتر هەمیشە باشترە", "هیچ هۆکار نییە"], i: 0 },
    },
    {
      en: { q: "Handwashing mainly helps by:", a: ["Removing germs from hands before they reach your face", "Curing infection", "Replacing vaccines", "Cooling the skin"], i: 0 },
      ckb: { q: "شۆردنەوەی دەست سەرەکی یارمەتی:", a: ["لابردنی میکرۆب لە دەست پێش گەیشتن بە دەموچاو", "چارەسەری تووشبوون", "جێگرتنەوەی وەکسین", "ساردکردنەوەی پێست"], i: 0 },
    },
    {
      en: { q: "Most sore throats in children and adults are:", a: ["Often viral; antibiotics are not automatically needed", "Always strep", "Always fungal", "Always allergic"], i: 0 },
      ckb: { q: "زۆربەی ئازاری گەروەن لە منداڵ و گەورەدا:", a: ["زۆرجار ڤایرۆسییە؛ ئانتیبیۆتیک بە ئۆتۆماتیک پێویست نییە", "هەمیشە ستریپ", "هەمیشە قەڕەچووکی", "هەمیشە ئەلەرژی"], i: 0 },
    },
    {
      en: { q: "Antibiotics can cause harm when misused, including:", a: ["Side effects and resistance", "Stronger immunity automatically", "Better sleep automatically", "Vitamin replacement"], i: 0 },
      ckb: { q: "ئانتیبیۆتیک کاتێک بە هەڵە بەکاردێت دەتوانێت زیان بگەیەنێت، لەوانە:", a: ["کاریگەری لاوەکی و بەرگری", "بەرگری بە ئۆتۆماتیک بەهێزتر", "خەوتن بە ئۆتۆماتیک باشتر", "جێگرتنەوەی ڤیتامین"], i: 0 },
    },
  ];

  function renderMythGame() {
    const L = state.lang === "en" ? "en" : "ckb";
    $("mythGame").innerHTML = MYTH_Q.map(
      (item, idx) => `
      <div class="card mt" style="padding:1rem">
        <p class="myth-q">${idx + 1}. ${item[L].q}</p>
        <div class="chip-row">
          <button type="button" class="chip" data-myth="${idx}" data-ans="myth">${t("myth")}</button>
          <button type="button" class="chip" data-myth="${idx}" data-ans="truth">${t("truth")}</button>
        </div>
        <div class="small muted myth-explain-${idx}" style="margin-top:0.75rem"></div>
      </div>`
    ).join("");
    $("mythGame").querySelectorAll("[data-myth]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = +btn.dataset.myth;
        const card = btn.closest(".card");
        if (card && card.dataset.answered === "1") return;
        if (card) card.dataset.answered = "1";
        const ans = btn.dataset.ans;
        const item = MYTH_Q[idx][L];
        const ok = item.corr === ans;
        const box = $("mythGame").querySelector(`.myth-explain-${idx}`);
        box.innerHTML = `<strong>${ok ? t("correct") : t("wrong")}.</strong> ${t("explain")}: ${item.m}`;
        if (ok) {
          state.misusePoints += 2;
          updateMisuseScore();
        } else {
          state.misusePoints -= 1;
          updateMisuseScore();
        }
      });
    });
  }

  function renderRecoveryGame() {
    const L = state.lang === "en" ? "en" : "ckb";
    $("recoveryGame").innerHTML = `<div class="symptom-grid">${RECOVERY_OPTS.map(
      (o) => `<label class="check-row"><input type="checkbox" data-rec="${o.id}"><span>${o[L]}</span></label>`
    ).join("")}</div>`;
  }

  function evalRecovery() {
    const sel = [];
    document.querySelectorAll("#recoveryGame input[data-rec]").forEach((inp) => {
      if (inp.checked) sel.push(inp.dataset.rec);
    });
    const bad = RECOVERY_OPTS.filter((o) => o.good === false && sel.includes(o.id)).length;
    const good = RECOVERY_OPTS.filter((o) => o.good && sel.includes(o.id)).length;
    const res = $("recoveryResult");
    res.classList.remove("hidden");
    if (bad > 0) {
      res.innerHTML = `<p class="score-pill score-bad">${t("planRisky")}</p><p class="small">${state.lang === "en" ? "Avoid unprescribed antibiotics; prioritize rest, fluids, and medical review if needed." : "ئانتیبیۆتیکی بێ دەرکردن دوور بگرەوە؛ پشوو، ئاو و پشکنین کاتێک پێویستە."}</p>`;
      state.misusePoints -= 3;
    } else if (good >= 3) {
      res.innerHTML = `<p class="score-pill score-safe">${t("planWise")}</p><p class="small">${state.lang === "en" ? "Supportive, sensible choices align with typical viral recovery." : "هەڵبژاردنە پشتیوانەکان لەگەڵ چاکبوونی ڤایرۆسی باو دەگونجێت."}</p>`;
      state.misusePoints += 4;
      softConfetti();
    } else {
      res.innerHTML = `<p class="score-pill score-risk">${t("risky")}</p><p class="small">${state.lang === "en" ? "Add hydration, rest, and a plan to seek care if symptoms worsen." : "ئاو و پشوو زیاد بکە و پلان بۆ سەردانی پزیشک ئەگەر نیشانەکان خراپتر بوون."}</p>`;
    }
    updateMisuseScore();
  }

  function renderScenario() {
    const L = state.lang === "en" ? "en" : "ckb";
    const sc = SCENARIOS[state.scenarioI % SCENARIOS.length];
    const s = sc[L];
    $("scenarioGame").innerHTML = `
      <p class="myth-q">${s.q}</p>
      <div class="symptom-grid">${s.opts
        .map(
          (o) =>
            `<label class="check-row"><input type="radio" name="scen" data-ok="${o.ok}"><span>${o.t}</span></label>`
        )
        .join("")}</div>
      <button type="button" class="btn btn-secondary mt" id="scenarioCheck">${state.lang === "en" ? "Check answer" : "پشکنین"}</button>
      <div id="scenarioExpl" class="mt small muted"></div>
    `;
    $("scenarioCheck").onclick = () => {
      const picked = document.querySelector("#scenarioGame input[name='scen']:checked");
      const expl = $("scenarioExpl");
      if (!picked) {
        expl.textContent = state.lang === "en" ? "Select an option." : "هەڵبژاردنێک دیاری بکە.";
        return;
      }
      const ok = picked.dataset.ok === "true";
      expl.innerHTML = `<strong>${ok ? t("correct") : t("wrong")}.</strong> ${s.exp}`;
      if (ok) {
        state.misusePoints += 3;
        updateMisuseScore();
      }
    };
  }

  function renderQuiz() {
    state.quiz.i = 0;
    state.quiz.score = 0;
    state.quiz.streak = 0;
    $("quizGame").innerHTML = "";
    $("nextQuiz").classList.add("hidden");
    $("startQuiz").classList.remove("hidden");
  }

  function showQuizQuestion() {
    const L = state.lang === "en" ? "en" : "ckb";
    const qi = state.quiz.i;
    if (qi >= QUIZ_Q.length) {
      clearInterval(state.quiz.timer);
      const pct = Math.round((state.quiz.score / QUIZ_Q.length) * 100);
      $("quizGame").innerHTML = `<p class="muted small">${t("streakWord")}: ${state.quiz.streak}</p>`;
      $("nextQuiz").classList.add("hidden");
      $("startQuiz").classList.remove("hidden");
      openQuizModal({ pct, score: state.quiz.score, total: QUIZ_Q.length, timedOut: false });
      return;
    }
    const q = QUIZ_Q[qi][L];
    $("quizGame").innerHTML = `
      <p class="myth-q">${q.q}</p>
      <div class="symptom-grid">${q.a
        .map(
          (opt, i) =>
            `<label class="check-row"><input type="radio" name="qz" value="${i}"><span>${opt}</span></label>`
        )
        .join("")}</div>`;
    $("nextQuiz").classList.remove("hidden");
    $("startQuiz").classList.add("hidden");
  }

  function updateMisuseScore() {
    const el = $("misuseScoreDisplay");
    let label = t("safe");
    let cls = "score-pill score-safe";
    if (state.misusePoints < 0) {
      label = t("misuseWarn");
      cls = "score-pill score-bad";
    } else if (state.misusePoints < 5) {
      label = t("risky");
      cls = "score-pill score-risk";
    }
    el.className = cls;
    el.textContent = `${label} (${state.misusePoints})`;
  }

  function softConfetti() {
    const c = $("confettiCanvas");
    if (!c) return;
    const ctx = c.getContext("2d");
    c.width = innerWidth;
    c.height = innerHeight;
    const parts = Array.from({ length: 52 }, () => ({
      x: Math.random() * c.width,
      y: -10 - Math.random() * 80,
      vy: 0.8 + Math.random() * 1.4,
      s: 2 + Math.random() * 3,
      a: 0.12 + Math.random() * 0.28,
      hue: 160 + Math.random() * 80,
    }));
    let f = 0;
    function tick() {
      f++;
      ctx.clearRect(0, 0, c.width, c.height);
      parts.forEach((p) => {
        p.y += p.vy;
        ctx.fillStyle = `hsla(${p.hue}, 40%, 72%, ${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      });
      if (f < 110) requestAnimationFrame(tick);
    }
    tick();
  }

  /** Soft pastel sparkles for quiz completion — diamonds + dots, not childish */
  function quizCelebrationConfetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = $("quizFxCanvas") || $("confettiCanvas");
    if (!c) return;
    const ctx = c.getContext("2d");
    c.width = innerWidth;
    c.height = innerHeight;
    const parts = Array.from({ length: 88 }, () => ({
      x: Math.random() * c.width,
      y: -30 - Math.random() * 140,
      vy: 0.35 + Math.random() * 1.1,
      vx: (Math.random() - 0.5) * 1.2,
      s: 1.5 + Math.random() * 3.5,
      a: 0.09 + Math.random() * 0.2,
      hue: 155 + Math.random() * 95,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.12,
      kind: Math.random() > 0.45 ? "dia" : "dot",
    }));
    let f = 0;
    function tick() {
      f++;
      ctx.clearRect(0, 0, c.width, c.height);
      parts.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(f * 0.02 + p.y * 0.008) * 0.35;
        p.rot += p.vr;
        ctx.fillStyle = `hsla(${p.hue}, 42%, 76%, ${p.a})`;
        if (p.kind === "dot") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.s * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.beginPath();
          ctx.moveTo(0, -p.s);
          ctx.lineTo(p.s * 0.55, 0);
          ctx.lineTo(0, p.s);
          ctx.lineTo(-p.s * 0.55, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      });
      if (f < 150) requestAnimationFrame(tick);
    }
    tick();
  }

  let quizModalCloseTimer = null;

  function openQuizModal({ pct, score, total, timedOut }) {
    const modal = $("quizResultModal");
    if (!modal) return;
    let tier = "Med";
    if (pct >= 75) tier = "High";
    else if (pct >= 50) tier = "Med";
    else tier = "Low";
    const fb =
      tier === "High" ? "quizFeedbackHigh" : tier === "Med" ? "quizFeedbackMed" : "quizFeedbackLow";
    const qk =
      tier === "High" ? "quizQuoteHigh" : tier === "Med" ? "quizQuoteMed" : "quizQuoteLow";
    applyI18n();
    $("quizModalScoreEl").textContent = pct + "%";
    const subParts = [`${t("quizScoreLine")}: ${score}/${total}`];
    if (timedOut) subParts.push(t("timeUp"));
    $("quizModalSub").textContent = subParts.join(" · ");
    $("quizModalFeedback").textContent = t(fb);
    $("quizModalQuote").textContent = t(qk);
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
    modal.classList.remove("quiz-modal--visible");
    clearTimeout(quizModalCloseTimer);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add("quiz-modal--visible");
      });
    });
    quizCelebrationConfetti();
    if (pct >= 75) {
      state.misusePoints += 5;
      updateMisuseScore();
    }
  }

  function closeQuizModal() {
    const modal = $("quizResultModal");
    if (!modal) return;
    modal.classList.remove("quiz-modal--visible");
    document.body.classList.remove("modal-open");
    quizModalCloseTimer = setTimeout(() => {
      modal.classList.add("hidden");
    }, 320);
  }

  const BODY_FACTS = [
    { en: "Fever can be part of immune activation—not always harmful.", ckb: "تا لەوانەیە بەشێک بێت لە چالاککردنی بەرگری—هەمیشە زیانناک نییە." },
    { en: "Rest reallocates energy toward healing.", ckb: "پشوو وزە دەگەڕێتەوە بۆ چاکبوون." },
    { en: "Fluids help mucus stay thinner and easier to clear.", ckb: "ئاو ئابڕۆک دەنەرم و ئاسانتر دەکات بۆ دەرهێنان." },
    { en: "Antibiotic resistance spreads between people indirectly through bacteria.", ckb: "بەرگری دژ بە دەرمان بە ناتەواومەند لە نێوان کەساندا بڵاودەبێتەوە." },
  ];

  const CAROUSEL = [
    { en: { m: "Green mucus always means bacteria.", f: "Color alone does not prove bacterial infection." }, ckb: { m: "ئابڕۆکی سەوز هەمیشە واتای بەکتریا.", f: "ڕەنگ بە تەنها دڵنایی بەکتریا ناکات." } },
    { en: { m: "Flu vaccine prevents all colds.", f: "Flu vaccine targets influenza viruses—not every cold virus." }, ckb: { m: "وەکسین هەموو ساردبوونەوە ڕاگر دەکات.", f: "وەکسینی پەتا تەنها ڤایرۆسی پەتا ڕاگر دەکات." } },
  ];

  const PREVENT = [
    { en: { t: "Vaccination", b: "Ask what is due for you this season." }, ckb: { t: "وەکسین", b: "بزانە ئەم وەرزە چی بۆ تۆ گونجاوە." } },
    { en: { t: "Ventilation", b: "Fresh air reduces crowded viral buildup." }, ckb: { t: "هەواکردن", b: "هەوای تازە کۆبوونەوەی ڤایرۆس کەم دەکاتەوە." } },
    { en: { t: "Masks in outbreaks", b: "Use when guidance recommends in crowded settings." }, ckb: { t: "ماسک", b: "کاتێک ڕێنمایی پێشنیار دەکات لە شوێنی قەرەباڵغ." } },
  ];

  const DID = [
    { en: "Finishing prescribed antibiotics reduces incomplete killing of bacteria.", ckb: "تەواوکردنی دەرمانی دەرکراو کەم دەکاتەوە لە مردنی ناتەواوی بەکتریا." },
    { en: "Leftover antibiotics may be the wrong drug for the next problem.", ckb: "دەرمانی ماوە ڕەنگە بۆ کێشەی داهاتوو هەڵبێت." },
  ];

  const TIPS = [
    { en: "Track symptoms daily to notice trends early.", ckb: "ڕۆژانە تۆمار بکە بۆ بینینی ڕەوش بە زوو." },
    { en: "Warm showers can ease muscle aches temporarily.", ckb: "دووشەوەی گەرم ئازاری جەستە کەم دەکاتەوە بۆ کاتێک." },
  ];

  function renderDiscover() {
    const L = state.lang === "en" ? "en" : "ckb";
    $("bodyFacts").innerHTML = BODY_FACTS.map((x) => `<div class="fact-chip">${x[L]}</div>`).join("");
    renderCarousel();
    $("preventionGrid").innerHTML = PREVENT.map(
      (p) => `<div class="card" style="padding:1rem"><h4 style="margin:0 0 .35rem">${p[L].t}</h4><p class="small muted">${p[L].b}</p></div>`
    ).join("");
    $("didYouKnow").innerHTML = DID.map((d) => `<p class="insight-box">${d[L]}</p>`).join("");
    $("miniTips").innerHTML = TIPS.map((d) => `<p class="fact-chip">${d[L]}</p>`).join("");
  }

  function renderCarousel() {
    const L = state.lang === "en" ? "en" : "ckb";
    const item = CAROUSEL[state.carouselI % CAROUSEL.length][L];
    $("carouselSlide").innerHTML = `<p><strong>${t("myth")}:</strong> ${item.m}</p><p><strong>${t("truth")}:</strong> ${item.f}</p>`;
  }

  function switchTab(name) {
    document.querySelectorAll(".tab").forEach((b) => {
      const on = b.dataset.tab === name;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.querySelectorAll(".panel").forEach((p) => {
      const id = p.dataset.panel;
      const on = id === name;
      p.hidden = !on;
      p.classList.toggle("is-active", on);
    });
    document.body.setAttribute("data-dept-tab", name);
    document.documentElement.setAttribute("data-dept-tab", name);
    const hero = $("heroBlock");
    if (hero) hero.hidden = name !== "explore";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function refreshAllRenders() {
    applyI18n();
    renderSymptomChecks();
    renderDurationSeverity();
    renderWarnings();
    renderCompare();
    renderAwareness();
    renderNatural();
    renderNews();
    renderFluFormOptions();
    renderFluSymptomChecks();
    renderFluUI();
    renderLibrary();
    renderMythGame();
    renderRecoveryGame();
    renderScenario();
    renderQuiz();
    renderDiscover();
    setQuote($("quoteText"), state.quoteI);
    setQuote($("exploreQuoteText"), state.quoteI);
    setQuote($("discoverQuoteText"), state.quoteI);
    updateMisuseScore();
  }

  function init() {
    state.lang = localStorage.getItem(STORAGE_LANG) === "ckb" ? "ckb" : "en";
    refreshAllRenders();
    switchTab("explore");

    $("langToggle").addEventListener("click", () => {
      state.lang = state.lang === "en" ? "ckb" : "en";
      localStorage.setItem(STORAGE_LANG, state.lang);
      refreshAllRenders();
    });

    document.querySelectorAll(".tab").forEach((btn) => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    $("analyzeBtn").addEventListener("click", showAnalyzerResult);

    $("heroQuoteBtn").addEventListener("click", nextQuote);
    $("exploreQuoteBtn").addEventListener("click", nextQuote);
    $("discoverQuoteBtn").addEventListener("click", nextQuote);

    $("ctaSymptoms").addEventListener("click", () => {
      switchTab("explore");
      $("analyzerHeading").scrollIntoView({ behavior: "smooth" });
    });
    $("ctaAntibiotics").addEventListener("click", () => {
      switchTab("library");
    });
    $("ctaFlu").addEventListener("click", () => {
      switchTab("flu");
    });

    $("fluForm").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    const fluSaveBtn = $("fluSaveBtn");
    if (fluSaveBtn) fluSaveBtn.addEventListener("click", handleSaveFluLog);

    const fluSavedLogs = $("fluSavedLogs");
    if (fluSavedLogs) {
      fluSavedLogs.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-delete-log]");
        if (!btn) return;
        const id = btn.getAttribute("data-delete-log");
        if (
          !confirm(
            state.lang === "en" ? "Delete this log entry?" : "ئەم تۆمارە بسڕدرێتەوە؟"
          )
        )
          return;
        deleteFluEntry(id);
      });
    }

    $("clearFluLog").addEventListener("click", () => {
      if (confirm(state.lang === "en" ? "Clear all saved entries?" : "هەموو تۆمارەکان بسڕدرێنەوە؟")) {
        localStorage.removeItem(STORAGE_FLU);
        localStorage.removeItem(STORAGE_FLU_LEGACY);
        renderFluUI();
      }
    });

    $("checkRecoveryPlan").addEventListener("click", evalRecovery);

    $("startQuiz").addEventListener("click", () => {
      state.quiz.active = true;
      state.quiz.timeLeft = 45;
      $("quizTimer").textContent = "0:45";
      state.quiz.i = 0;
      state.quiz.score = 0;
      $("quizScore").textContent = "";
      clearInterval(state.quiz.timer);
      state.quiz.timer = setInterval(() => {
        state.quiz.timeLeft--;
        const m = Math.floor(state.quiz.timeLeft / 60);
        const s = state.quiz.timeLeft % 60;
        $("quizTimer").textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
        if (state.quiz.timeLeft <= 0) {
          clearInterval(state.quiz.timer);
          $("nextQuiz").classList.add("hidden");
          $("startQuiz").classList.remove("hidden");
          const pct = Math.round((state.quiz.score / QUIZ_Q.length) * 100);
          $("quizGame").innerHTML = `<p class="muted small">${t("timeUp")}</p>`;
          openQuizModal({
            pct,
            score: state.quiz.score,
            total: QUIZ_Q.length,
            timedOut: true,
          });
        }
      }, 1000);
      showQuizQuestion();
    });

    const qTry = $("quizModalTryAgain");
    const qCont = $("quizModalContinue");
    if (qTry)
      qTry.addEventListener("click", () => {
        closeQuizModal();
        renderQuiz();
      });
    if (qCont)
      qCont.addEventListener("click", () => {
        closeQuizModal();
        switchTab("explore");
      });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && $("quizResultModal") && !$("quizResultModal").classList.contains("hidden")) {
        closeQuizModal();
      }
    });

    $("nextQuiz").addEventListener("click", () => {
      const picked = document.querySelector("#quizGame input[name='qz']:checked");
      if (!picked) return;
      const L = state.lang === "en" ? "en" : "ckb";
      const q = QUIZ_Q[state.quiz.i][L];
      if (+picked.value === q.i) {
        state.quiz.score++;
        state.quiz.streak++;
      } else {
        state.quiz.streak = 0;
      }
      state.quiz.i++;
      $("quizScore").textContent = `${t("scoreWord")}: ${state.quiz.score}/${QUIZ_Q.length}`;
      showQuizQuestion();
    });

    $("carouselPrev").addEventListener("click", () => {
      state.carouselI--;
      renderCarousel();
    });
    $("carouselNext").addEventListener("click", () => {
      state.carouselI++;
      renderCarousel();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

