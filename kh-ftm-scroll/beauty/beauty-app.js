(function () {
  "use strict";

  var LANG = "en";
  var QUIZ_STEP = 0;
  var QUIZ_ANS = {};
  var ANALYSIS = null;

  function getUserKey() {
    try {
      var p = new URLSearchParams(location.search || "");
      var uk = p.get("uk");
      if (uk) return decodeURIComponent(uk).slice(0, 80);
    } catch (e) {}
    try {
      var raw = localStorage.getItem("user");
      if (!raw) return "kurdana_beauty_guest";
      var u = JSON.parse(raw);
      if (!u || typeof u.name !== "string" || !String(u.name).trim()) return "kurdana_beauty_guest";
      var slug = String(u.name)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF]+/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "")
        .slice(0, 64);
      return (slug || "user") + "_" + (u.gender || "x");
    } catch (e2) {
      return "kurdana_beauty_guest";
    }
  }

  var USER_KEY = getUserKey();
  function keyQuiz() {
    return "kurdana_beauty_quiz_" + USER_KEY;
  }
  function keyAnalysis() {
    return "kurdana_beauty_analysis_" + USER_KEY;
  }
  function keyRoutine() {
    return "kurdana_beauty_routine_" + USER_KEY;
  }
  function keyTracker() {
    return "kurdana_beauty_tracker_" + USER_KEY;
  }

  function beautyCelebrateLabels() {
    return {
      en: {
        great: "Great job!",
        line: "You scored {c}/{t} and earned {e} points.",
        totalSaved: "Total saved points: {n}.",
        playAgain: "Play Again",
        backDept: "Back to Department",
      },
      ku: {
        great: "زۆر باش!",
        line: "تۆ {c} لە {t}ت بەدەستهێنا و {e} خاڵت وەرگرت.",
        totalSaved: "کۆی خاڵە پاشەکەوتکراوەکان: {n}.",
        playAgain: "دووبارە یاری بکە",
        backDept: "گەڕانەوە بۆ بەش",
      },
    };
  }

  function showBeautyPlayCelebrate(correct, total, pointsRound, resetIds) {
    if (!window.KurdanaGameCelebration) return;
    KurdanaGameCelebration.show({
      userKey: USER_KEY,
      lang: LANG,
      correct: correct,
      total: total,
      pointsRound: pointsRound,
      labels: beautyCelebrateLabels(),
      onPlayAgain: function () {
        (resetIds || []).forEach(function (gid) {
          var g = $id(gid);
          if (g) g._done = false;
        });
        renderPlay();
      },
      onBack: function () {
        jumpTab("home");
        window.scrollTo(0, 0);
      },
    });
  }

  var T = {
    en: {
      badge: "Kurdana · Beauty Studio",
      heroTitle: "Beauty & Self-Care",
      heroSub: "Personalized skincare guidance, routines, and beauty insights.",
      heroQuote: "“Glow is a routine, not a rush.”",
      btnQuiz: "Take Beauty Quiz",
      btnAi: "AI Selfie Analysis",
      btnTrends: "Explore Trends",
      disclaimer:
        "This is educational beauty guidance, not a medical diagnosis. See a dermatologist for serious skin concerns.",
      tabHome: "Glow",
      tabQuiz: "Quiz & AI",
      tabRoutine: "My Routine",
      tabTrack: "Track",
      tabTrends: "Trends",
      tabLearn: "Learn",
      tabPlay: "Play",
      homeTitle: "Your beauty dashboard",
      homeDesc: "Quiz results, AI insights, and streaks come together here.",
      quizTitle: "Beauty discovery quiz",
      quizDesc: "Five steps — we tailor routines and AI context to your answers.",
      next: "Continue",
      back: "Back",
      restartQuiz: "Retake quiz",
      aiPrivacyShort: "Camera preview for AI runs only during analysis.",
      aiPrivacy:
        "Your image is processed locally. No photo is saved.",
      analyzing: "Analyzing data…",
      analyzeBtn: "Analyze face",
      cancel: "Close camera",
      routineSecTitle: "My Beauty Routine",
      routineSecDesc: "Check off steps and build your streak.",
      morningTitle: "Morning",
      nightTitle: "Night",
      weeklyRoutineTitle: "Weekly add-ons",
      saveRoutine: "Save today’s routine",
      streakLabel: "Glow streak",
      trackerTitle: "Beauty tracker",
      trackerDesc: "Log how your skin feels day by day.",
      lblSkinMood: "Skin mood",
      lblHydration: "Hydration (0–10)",
      lblSleep: "Sleep (hours)",
      lblBreakout: "Breakouts",
      lblOil: "Oiliness",
      lblNotes: "Notes",
      saveEntry: "Save entry",
      trendsTitle: "Explore trends",
      trendsDesc: "Curated inspiration — gentle, evidence-informed habits.",
      learnLearnMore: "Learn more",
      learnTitle: "Beauty foundations",
      learnDesc: "Quick reads that make routines smarter.",
      playTitle: "Beauty play",
      playDesc: "Mini games for routine muscle memory.",
      gameOrderTitle: "Skincare order",
      gameMatchTitle: "Ingredient match",
      gameRoutineTitle: "Routine builder",
      moodClear: "Clear",
      moodOkay: "Okay",
      moodRough: "Rough",
      moodGlow: "Glowing",
      statusGood: "Looks good",
      statusMid: "Moderate",
      statusBad: "Needs help",
      catOil: "Oiliness",
      catAcne: "Acne",
      catDark: "Dark circles",
      catWrinkle: "Fine lines",
      catEven: "Skin evenness",
      catDry: "Dryness",
      catRed: "Redness",
      catGlow: "Glow score",
      planConcerns: "Top focus areas",
      planMorning: "Morning routine",
      planNight: "Night routine",
      planWeekly: "Weekly extras",
      planAvoid: "Things to ease off",
      planHabit: "Glow habit",
      trendKTitle: "Korean skincare routine",
      trendKDesc: "Layer hydration from thinnest to thickest.",
      trendSpfTitle: "SPF daily reminder",
      trendSpfDesc: "Sunscreen is the quiet anti-aging hero.",
      trendGlassTitle: "Glass skin trend",
      trendGlassDesc: "Hydration + barrier care over harsh stripping.",
      trendLipTitle: "Lip care routine",
      trendLipDesc: "Exfoliate gently, seal with balm.",
      trendHairTitle: "Hair care basics",
      trendHairDesc: "Scalp health supports shine.",
      trendGlowTitle: "Natural glow tips",
      trendGlowDesc: "Sleep, water, then products.",
      eduSpfTitle: "What is SPF?",
      eduSpfBody: "Sun Protection Factor measures UVB protection — use broad-spectrum daily.",
      eduMoistTitle: "Why moisturizer matters",
      eduMoistBody: "It supports barrier function so treatments work better.",
      eduExTitle: "Avoid over-exfoliating",
      eduExBody: "Too much scrub or acid weakens barrier — pace yourself.",
      eduOilTitle: "Oily vs dehydrated skin",
      eduOilBody: "Skin can be oily yet water-depleted — lightweight hydration still helps.",
      eduBeginTitle: "Beginner routine shape",
      eduBeginBody: "Cleanse → hydrate → protect (AM) | cleanse → treat → moisturize (PM).",
      chkGlasses: "Remove glasses",
      chkFace: "Face the camera directly",
      chkLight: "Use good lighting",
      chkHair: "Pull hair away from face",
      camPermTitle: "Camera access needed",
      camPermBody:
        "To use AI Coach / Skin Analyzer, please allow camera access. Your camera stays on your device and nothing is saved.",
      camPermAllow: "Allow Camera",
      camHttpsWarn: "Camera may not work on phones unless the site is opened with HTTPS.",
      camDenied: "Camera permission was denied. Please enable camera access in your browser settings.",
      camUnavailable: "No camera found on this device.",
      camTipFace: "Face the camera directly.",
      camTipLight: "Use good lighting.",
      camTipGlasses: "Remove glasses.",
      camTipHair: "Pull hair away from face.",
    },
    ku: {
      badge: "کوردانە · ستودیۆی جوانکاری",
      heroTitle: "جوانکاری و چاودێریکردنی خۆ",
      heroSub: "ڕێنمایی تایبەت بۆ پێست، روتین، و تێگەیشتنی جوانکاری.",
      heroQuote: "«درەوشانەوە نەریتە، نە خێرایی.»",
      btnQuiz: "تاقیکردنەوەی جوانکاری",
      btnAi: "شیکاری خۆوێنەی AI",
      btnTrends: "گەڕان بە ترێندەکان",
      disclaimer:
        "ئەمە تەنها ڕێنمایی پەروەردەیی جوانکارییە، نەک دەستنیشانکردنی پزیشکی. بۆ کێشەی گەورەی پێست، سەردانی پزیشکی پێست بکە.",
      tabHome: "درەوشانەوە",
      tabQuiz: "تاقی و AI",
      tabRoutine: "روتینەکەم",
      tabTrack: "شوێنکەوتن",
      tabTrends: "ترێندەکان",
      tabLearn: "فێربوون",
      tabPlay: "یاری",
      homeTitle: "داشبۆردی جوانکاری",
      homeDesc: "ئەنجامی تاقی، شیکاری AI، و زنجیرە لێرە کۆدەکەنەوە.",
      quizTitle: "تاقیکردنەوەی دۆزینەوە",
      quizDesc: "پێنج هەنگاو — روتین و AI بەپێی وەڵامەکانت دەگونجێنین.",
      next: "بەردەوام بە",
      back: "گەڕانەوە",
      restartQuiz: "دووبارەکردنەوەی تاقی",
      aiPrivacyShort: "کامێرا تەنها لە کاتی شیکارکردندا.",
      aiPrivacy: "وێنەکەت تەنها لەسەر ئامێرەکەت پرۆسێس دەکرێت. هیچ وێنەیەک پاشەکەوت ناکرێت.",
      analyzing: "دەیتا شیکار دەکرێت…",
      analyzeBtn: "شیکاری ڕوو",
      cancel: "داخستنی کامێرا",
      routineSecTitle: "روتینی جوانکاری من",
      routineSecDesc: "هەنگاوەکان نیشانە بکە و زنجیرە دروست بکە.",
      morningTitle: "بەیانی",
      nightTitle: "شەو",
      weeklyRoutineTitle: "هەفتانە",
      saveRoutine: "پاشەکەوتکردنی روتینی ئەمڕۆ",
      streakLabel: "زنجیرەی درەوشانەوە",
      trackerTitle: "شوێنکەوتنی جوانکاری",
      trackerDesc: "هەستی پێستت ڕۆژانە تۆمار بکە.",
      lblHydration: "ئاو-دان (٠–١٠)",
      lblSleep: "خەو (کاتژمێر)",
      lblBreakout: "سپی و سووربوون",
      lblOil: "چەوری",
      lblNotes: "تێبینی",
      lblSkinMood: "هەستی پێست",
      saveEntry: "پاشەکەوتکردنی تۆمار",
      trendsTitle: "ترێندەکان",
      trendsDesc: "بیرۆکەی هەڵبژێردراو — habits نەرم و زانستی.",
      learnLearnMore: "زیاتر بخوێنەرەوە",
      learnTitle: "بنەمای جوانکاری",
      learnDesc: "خوێندنەوەی خێرا بۆ روتینی زیرەکتر.",
      playTitle: "یاری جوانکاری",
      playDesc: "یاری بچووک بۆ بیرکردنەوەی روتین.",
      gameOrderTitle: "ڕیزکردنی سکینکێر",
      gameMatchTitle: "هاوتاکردنی پێکهاتە",
      gameRoutineTitle: "ڕوتین دروست بکە",
      lblSkinMood: "هەستی پێست",
      moodClear: "پاک",
      moodOkay: "ئاسایی",
      moodRough: "قورس",
      moodGlow: "درەوشاو",
      statusGood: "باش دەردەکەوێت",
      statusMid: "مامناوەند",
      statusBad: "پێویستی یارمەتی هەیە",
      catOil: "چەوری",
      catAcne: "ئاکنە",
      catDark: "تاریکی ژێر چاو",
      catWrinkle: "هێڵی تەنک",
      catEven: "هاوسەنگی ڕەنگ",
      catDry: "وشکی",
      catRed: "سووربوون",
      catGlow: "نمرەی درەوشانەوە",
      planConcerns: "سەرنجی سەرەکی",
      planMorning: "روتینی بەیانی",
      planNight: "روتینی شەو",
      planWeekly: "زیادەکانی هەفتانە",
      planAvoid: "دووربکەوە لە",
      planHabit: "نەریتی درەوشانەوە",
      trendKTitle: "روتینی کۆری بۆ پێست",
      trendKDesc: "ئاو لە ناسکەوە بۆ قەڵەو لایەربەند بکە.",
      trendSpfTitle: "بیرخستنەوەی ڕۆژانەی SPF",
      trendSpfDesc: "پاراستنی خۆر بەخێرایی دژە-پیربوونە.",
      trendGlassTitle: "ترێندی پێستی شووشە",
      trendGlassDesc: "ئاو و باریێر لە سڕینەوەی توند گرنگترە.",
      trendLipTitle: "چاودێری لێو",
      trendLipDesc: "نەرم بکەرەوە، بە بام دابگرە.",
      trendHairTitle: "بنەمای چاودێری قژ",
      trendHairDesc: "تەندروستی سەرپێست بۆ درەوشانەوە یارمەتیدەرە.",
      trendGlowTitle: "ئامۆژگاری درەوشانەوەی سروشتی",
      trendGlowDesc: "خەو، ئاو، دواتر بەرهەم.",
      eduSpfTitle: "SPF چییە؟",
      eduSpfBody: "پێوانەی پاراستنی UVB ـە — هەموو ڕۆژ بەرفراوان بەکاربهێنە.",
      eduMoistTitle: "بۆچی نەمکەرەوە گرنگە",
      eduMoistBody: "باریێر بەهێز دەکات بۆ ئەوەی چارەسەرەکان باشتر کار بکەن.",
      eduExTitle: "سڕینەوەی زۆری ڕووی پێست مەکە",
      eduExBody: "زۆر scrub یان ئەسید باریێر لاواز دەکات.",
      eduOilTitle: "پێستی چەور و کەمی ئاو",
      eduOilBody: "پێست دەتوانێت چەور بێت بەڵام ئاو کەم بێت — ئاو-دانی سووک هێشتا سوودبەخشە.",
      eduBeginTitle: "ڕوتینی دەستپێکەر",
      eduBeginBody: "پاککردنەوە → ئاو → پاراستن (بەیانی) | پاککردنەوە → چارەسەر → نەمکەرەوە (شەو).",
      chkGlasses: "چاویلکە لابدە",
      chkFace: "ڕوو ڕاست بە کامێراکە بکە",
      chkLight: "ڕووناکی باش بەکاربهێنە",
      chkHair: "قژ دوور لە ڕوو بگرە",
      camPermTitle: "پێویستە ڕێگە بە کامێرا بدەیت",
      camPermBody:
        "بۆ بەکارهێنانی AI Coach / Skin Analyzer، تکایە ڕێگە بە کامێرا بدە. کامێراکەت تەنها لەسەر ئامێرەکەت کار دەکات و هیچ شتێک پاشەکەوت ناکرێت.",
      camPermAllow: "ڕێگە بە کامێرا بدە",
      camHttpsWarn: "کامێرا لە مۆبایل زۆرجار پێویستی بە HTTPS هەیە.",
      camDenied: "ڕێگەپێدانی کامێرا ڕەتکرایەوە. لە ڕێکخستنی وێبگەڕ چالاکی بکە.",
      camUnavailable: "کامێرا لەسەر ئەم ئامێرە نەدۆزرایەوە.",
      camTipFace: "ڕوو ڕاست بە کامێراکە بکە.",
      camTipLight: "ڕووناکی باش بەکاربهێنە.",
      camTipGlasses: "چاویلکە لابدە.",
      camTipHair: "قژ دوور لە ڕوو بگرە.",
    },
  };

  function tr(k) {
    return (T[LANG] && T[LANG][k]) || (T.en && T.en[k]) || k;
  }

  var QUIZ_STEPS = [
    {
      key: "skinType",
      qEn: "What is your skin type?",
      qKu: "جۆری پێستت چییە?",
      opts: [
        { id: "oily", en: "Oily", ku: "چەور" },
        { id: "dry", en: "Dry", ku: "وشک" },
        { id: "combo", en: "Combination", ku: "تێکەڵ" },
        { id: "sensitive", en: "Sensitive", ku: "هەستیار" },
        { id: "normal", en: "Normal", ku: "ئاسایی" },
      ],
    },
    {
      key: "concern",
      qEn: "Main concern?",
      qKu: "گرنگترین کێشە?",
      opts: [
        { id: "acne", en: "Acne", ku: "ئاکنە" },
        { id: "dark", en: "Dark circles", ku: "تاریکی ژێر چاو" },
        { id: "oil", en: "Oiliness", ku: "چەوری" },
        { id: "dry", en: "Dryness", ku: "وشکی" },
        { id: "wrinkle", en: "Wrinkles", ku: "هێڵ و چەمەکان" },
        { id: "uneven", en: "Uneven skin tone", ku: "ڕەنگی ناهاوسەنگ" },
        { id: "red", en: "Redness", ku: "سووربوون" },
      ],
    },
    {
      key: "routine",
      qEn: "Current routine?",
      qKu: "روتینی ئێستات?",
      opts: [
        { id: "none", en: "None", ku: "هیچ" },
        { id: "basic", en: "Basic", ku: "بنەڕەتی" },
        { id: "moderate", en: "Moderate", ku: "مامناوەند" },
        { id: "advanced", en: "Advanced", ku: "پێشکەوتوو" },
      ],
    },
    {
      key: "life",
      qEn: "Lifestyle factor?",
      qKu: "کێشەی ژیان?",
      opts: [
        { id: "stress", en: "Stress", ku: "سترێس" },
        { id: "sleep", en: "Low sleep", ku: "خەوی کەم" },
        { id: "makeup", en: "Makeup often", ku: "زۆرجار میکاپ" },
        { id: "sun", en: "Outdoor sun exposure", ku: "خۆرەوەی زۆر" },
        { id: "hydration", en: "Hydration issues", ku: "کێشەی ئاو خواردن" },
      ],
    },
    {
      key: "goal",
      qEn: "Goal?",
      qKu: "ئامانج?",
      opts: [
        { id: "clear", en: "Clear skin", ku: "پێستی پاک" },
        { id: "glow", en: "Glow", ku: "درەوشانەوە" },
        { id: "antiage", en: "Anti-aging", ku: "دژە-پیربوون" },
        { id: "even", en: "Even tone", ku: "ڕەنگی هاوسەنگ" },
        { id: "hyd", en: "Hydration", ku: "ئاو-دان" },
        { id: "oilctrl", en: "Oil control", ku: "کۆنترۆڵی چەوری" },
      ],
    },
  ];

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function landmarkSeed(lm) {
    if (!lm || !lm.length) return (Date.now() % 90000) + 10000;
    var s = 0;
    for (var i = 0; i < lm.length; i += 5) {
      if (lm[i]) s += lm[i].x * 4099 + lm[i].y * 8191;
    }
    return Math.abs(Math.floor(s * 733)) % 1000000 + 1;
  }

  function rnd(seed, lo, hi) {
    seed = (seed * 9301 + 49297) % 233280;
    return lo + (seed % (hi - lo + 1));
  }

  function computeScores(quiz, lm) {
    var seed = landmarkSeed(lm);
    var q = quiz || {};
    function bias(cat, baseLo, baseHi) {
      var v = rnd(seed, baseLo, baseHi);
      seed = (seed * 13 + 7) % 999983;
      if (cat === "oiliness") {
        if (q.skinType === "oily") v += 12;
        if (q.goal === "oilctrl") v -= 8;
        if (q.concern === "oil") v += 10;
      }
      if (cat === "acne") {
        if (q.concern === "acne") v -= 15;
        if (q.life === "stress") v -= 6;
      }
      if (cat === "darkCircles") {
        if (q.concern === "dark") v -= 18;
        if (q.life === "sleep") v -= 12;
      }
      if (cat === "wrinkles") {
        if (q.concern === "wrinkle") v -= 10;
        if (q.goal === "antiage") v -= 5;
      }
      if (cat === "evenness") {
        if (q.concern === "uneven") v -= 14;
      }
      if (cat === "dryness") {
        if (q.skinType === "dry") v -= 15;
        if (q.concern === "dry") v -= 12;
      }
      if (cat === "redness") {
        if (q.skinType === "sensitive") v -= 10;
        if (q.concern === "red") v -= 14;
      }
      if (cat === "glow") {
        if (q.goal === "glow") v += 8;
        if (q.routine === "advanced") v += 5;
      }
      return clamp(v, 5, 98);
    }

    return {
      oiliness: bias("oiliness", 30, 78),
      acne: bias("acne", 38, 85),
      darkCircles: bias("darkCircles", 32, 82),
      wrinkles: bias("wrinkles", 40, 88),
      evenness: bias("evenness", 35, 86),
      dryness: bias("dryness", 36, 84),
      redness: bias("redness", 42, 88),
      glow: bias("glow", 48, 94),
    };
  }

  function statusTier(s) {
    if (s >= 70) return "good";
    if (s >= 45) return "mid";
    return "bad";
  }

  function explainKey(cat, tier) {
    var e = {
      oiliness: {
        good: "oilGood",
        mid: "oilMid",
        bad: "oilBad",
      },
      acne: { good: "acneGood", mid: "acneMid", bad: "acneBad" },
      darkCircles: { good: "darkGood", mid: "darkMid", bad: "darkBad" },
      wrinkles: { good: "wrGood", mid: "wrMid", bad: "wrBad" },
      evenness: { good: "evGood", mid: "evMid", bad: "evBad" },
      dryness: { good: "dryGood", mid: "dryMid", bad: "dryBad" },
      redness: { good: "redGood", mid: "redMid", bad: "redBad" },
      glow: { good: "glowGood", mid: "glowMid", bad: "glowBad" },
    };
    var B = {
      en: {
        oilGood: "T-zone looks balanced in this snapshot.",
        oilMid: "Some shine possible — lightweight hydration can help.",
        oilBad: "T-zone appears oilier — gentle cleansing and lighter moisturizer may help.",
        acneGood: "Texture looks relatively calm today.",
        acneMid: "Minor congestion possible — keep actives paced.",
        acneBad: "Focus on barrier-friendly cleansing and targeted treatment.",
        darkGood: "Under-eye area looks rested.",
        darkMid: "Slight shadowing — sleep and gentle massage support brightness.",
        darkBad: "Dark circles noticeable — prioritize sleep and soothing eye care.",
        wrGood: "Skin smoothness reads favorable.",
        wrMid: "Fine lines may appear with movement — hydrate consistently.",
        wrBad: "Prioritize SPF and barrier support before strong actives.",
        evGood: "Tone looks fairly even in frame.",
        evMid: "Minor unevenness — vitamin C or niacinamide may help over time.",
        evBad: "Tone variation visible — sunscreen daily + targeted brighteners gradually.",
        dryGood: "Hydration cues look okay here.",
        dryMid: "Could use more water-binding ingredients.",
        dryBad: "Dryness signals — layer humectants then seal with cream.",
        redGood: "Minimal redness visible.",
        redMid: "Some flushing possible — simplify irritants.",
        redBad: "Redness noticeable — soothing routine and SPF.",
        glowGood: "Natural luminosity reads strong.",
        glowMid: "Glow building — stay consistent.",
        glowBad: "Barrier support + sleep will lift radiance.",
      },
      ku: {
        oilGood: "ناوچەی T لەم وێنەیەدا هاوسەنگ دەردەکەوێت.",
        oilMid: "ڕەنگە کەمێک درەوشاوە بێت — ئاو-دانی سووک یارمەتیدەرە.",
        oilBad: "ناوچەی T چەورتر دەردەکەوێت — پاککردنەوەی نەرم و نەمکەرەوەی سووک لەوانەیە یارمەتیدەر بێت.",
        acneGood: "پێست لەم کاتەدا نسبەتەن ئارام دەردەکەوێت.",
        acneMid: "ڕەنگە کەمێک داخراو بێت — ئاکتیڤەکان بە هێواشی زیاد بکە.",
        acneBad: "سەرنج بدە بە پاککردنەوەی نەرم بۆ باریێر و چارەسەری ئامانجدار.",
        darkGood: "ژێر چاوەکە پەیدای ئارام دەردەکەوێت.",
        darkMid: "کەمێک سێبەر هەیە — خەو و مەساجی نەرم یارمەتیدەرە.",
        darkBad: "تاریکی دیارە — خەو و چاودێری نەرمی چاو گرنگە.",
        wrGood: "پێست نەرم دەردەکەوێت.",
        wrMid: "ڕەنگە هێڵی تەنک دەربکەوێت — بە بەردەوامی ئاو بدە.",
        wrBad: "سەرەتا SPF و باریێر، دواتر ئاکتیڤی توند.",
        evGood: "ڕەنگ هاوسەنگ دەردەکەوێت.",
        evMid: "کەمێک ناهاوسەنگی — ویتامین C یان نیاسینامید لە ماوەیەکدا یارمەتیدەرە.",
        evBad: "جیاوازی ڕەنگ دیارە — هەموو ڕۆژ SPF و دواتر ڕوونکەرەوەکان بە هێواشی.",
        dryGood: "نیشانەی ئاو-دان باش دەردەکەوێت.",
        dryMid: "ڕەنگە پێویستی بە پێکهاتەی ڕاکێشانی ئاو بێت.",
        dryBad: "نیشانەی وشکی — لایەری ئاو دواتر کریم بەستەوە.",
        redGood: "سووربوونی کەم دیارە.",
        redMid: "ڕەنگە کەمێک سووربوون بێت — ئازاری کەم بکەرەوە.",
        redBad: "سووربوون دیارە — روتینی ئارام و SPF.",
        glowGood: "درەوشانەوەی سروشتی بەهێزە.",
        glowMid: "درەوشانەوە دروست دەبێت — بەردەوام بە.",
        glowBad: "باریێر و خەو درەوشانەوە بەرز دەکەنەوە.",
      },
    };
    var k = e[cat][tier];
    return B[LANG][k] || B.en[k];
  }

  function $id(id) {
    return document.getElementById(id);
  }

  function setLang(lang) {
    LANG = lang === "ku" ? "ku" : "en";
    try {
      localStorage.setItem("beauty_lang_v2", LANG);
    } catch (e) {}
    document.documentElement.lang = LANG === "ku" ? "ku" : "en";
    document.documentElement.dir = LANG === "ku" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i]").forEach(function (el) {
      var k = el.getAttribute("data-i");
      if (k && tr(k)) el.textContent = tr(k);
    });
    var lt = $id("langToggle");
    if (lt) lt.textContent = LANG === "en" ? "کوردی" : "English";
    ["gameOrder", "gameMatch", "gameRoutine"].forEach(function (gid) {
      var g = $id(gid);
      if (g) g._done = false;
    });
    renderAll();
  }

  function loadQuiz() {
    try {
      var raw = localStorage.getItem(keyQuiz());
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  function saveQuiz(obj) {
    try {
      localStorage.setItem(keyQuiz(), JSON.stringify(obj));
    } catch (e) {}
  }

  function loadAnalysis() {
    try {
      var raw = localStorage.getItem(keyAnalysis());
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  function saveAnalysis(obj) {
    try {
      localStorage.setItem(keyAnalysis(), JSON.stringify(obj));
    } catch (e) {}
  }

  function parseUrlLang() {
    try {
      var p = new URLSearchParams(location.search);
      var l = p.get("lang");
      if (l === "ku" || l === "en") return l;
    } catch (e) {}
    return null;
  }

  function wireTabs() {
    document.querySelectorAll(".b-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tab = btn.getAttribute("data-tab");
        document.querySelectorAll(".b-tab").forEach(function (b) {
          b.classList.toggle("active", b.getAttribute("data-tab") === tab);
        });
        document.querySelectorAll(".b-panel").forEach(function (p) {
          p.classList.toggle("active", p.id === "panel-" + tab);
        });
        if (tab === "play") renderPlay();
      });
    });
  }

  function jumpTab(name) {
    var b = document.querySelector('.b-tab[data-tab="' + name + '"]');
    if (b) b.click();
  }

  function renderQuiz() {
    var root = $id("quizRoot");
    var actions = $id("quizActions");
    var bar = $id("quizProgBar");
    if (!root) return;
    var saved = loadQuiz();
    if (saved && saved.answers) QUIZ_ANS = saved.answers;
    if (saved && typeof saved.step === "number") QUIZ_STEP = saved.step;
    if (Object.keys(QUIZ_ANS).length >= QUIZ_STEPS.length) QUIZ_STEP = QUIZ_STEPS.length;

    if (QUIZ_STEP >= QUIZ_STEPS.length) {
      root.innerHTML = "<p class='mini'>" + tr("restartQuiz") + "</p>";
      if (actions) actions.classList.add("hidden");
      if (bar) bar.style.width = "100%";
      renderQuizResultBlock();
      return;
    }

    var step = QUIZ_STEPS[QUIZ_STEP];
    var qtext = LANG === "ku" ? step.qKu : step.qEn;
    var pct = ((QUIZ_STEP + 1) / QUIZ_STEPS.length) * 100;
    if (bar) bar.style.width = pct + "%";

    var optsHtml = step.opts
      .map(function (o) {
        var sel = QUIZ_ANS[step.key] === o.id ? " selected" : "";
        var lab = LANG === "ku" ? o.ku : o.en;
        return '<button type="button" class="quiz-opt' + sel + '" data-qk="' + step.key + '" data-qv="' + o.id + '">' + lab + "</button>";
      })
      .join("");

    root.innerHTML = '<p class="quiz-q">' + qtext + '</p><div class="quiz-options">' + optsHtml + "</div>";
    root.querySelectorAll(".quiz-opt").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var qk = btn.getAttribute("data-qk");
        var qv = btn.getAttribute("data-qv");
        QUIZ_ANS[qk] = qv;
        root.querySelectorAll(".quiz-opt").forEach(function (x) {
          x.classList.toggle("selected", x.getAttribute("data-qv") === qv && x.getAttribute("data-qk") === qk);
        });
      });
    });

    if (actions) {
      actions.classList.remove("hidden");
      var nextBtn = $id("quizNext");
      var backBtn = $id("quizBack");
      if (nextBtn) {
        nextBtn.onclick = function () {
          if (!QUIZ_ANS[step.key]) return;
          QUIZ_STEP++;
          saveQuiz({ answers: QUIZ_ANS, step: QUIZ_STEP });
          if (QUIZ_STEP >= QUIZ_STEPS.length) {
            confettiBurst();
            renderQuiz();
            renderHome();
            renderPersonalized();
          } else renderQuiz();
        };
      }
      if (backBtn) {
        backBtn.onclick = function () {
          if (QUIZ_STEP <= 0) return;
          QUIZ_STEP--;
          renderQuiz();
        };
        backBtn.style.visibility = QUIZ_STEP === 0 ? "hidden" : "visible";
      }
    }
  }

  function renderQuizResultBlock() {
    var area = $id("quizResultArea");
    if (!area) return;
    area.classList.remove("hidden");
    var skin = QUIZ_ANS.skinType || "—";
    var concern = QUIZ_ANS.concern || "—";
    area.innerHTML =
      "<div class='plan-block'><h3>" +
      tr("quizTitle") +
      "</h3><p class='mini'>" +
      (LANG === "ku" ? "پێست: " : "Skin: ") +
      skin +
      " · " +
      (LANG === "ku" ? "کێشە: " : "Concern: ") +
      concern +
      "</p></div>";
  }

  function renderScoreCards(scores, snapshotDataUrl) {
    var wrap = $id("analysisResults");
    if (!wrap) return;
    wrap.classList.remove("hidden");
    var cats = [
      { k: "oiliness", tk: "catOil" },
      { k: "acne", tk: "catAcne" },
      { k: "darkCircles", tk: "catDark" },
      { k: "wrinkles", tk: "catWrinkle" },
      { k: "evenness", tk: "catEven" },
      { k: "dryness", tk: "catDry" },
      { k: "redness", tk: "catRed" },
      { k: "glow", tk: "catGlow" },
    ];
    var imgHtml = snapshotDataUrl
      ? '<div class="snapshot-wrap"><img src="' + snapshotDataUrl + '" alt="" /></div>'
      : "";
    var cards = cats
      .map(function (c) {
        var s = scores[c.k];
        var tier = statusTier(s);
        var stLabel = tr(tier === "good" ? "statusGood" : tier === "mid" ? "statusMid" : "statusBad");
        var cls = tier === "good" ? "status-good" : tier === "mid" ? "status-mid" : "status-bad";
        var exp = explainKey(c.k, tier);
        return (
          '<div class="score-card"><h4>' +
          tr(c.tk) +
          '</h4><div class="score-num ' +
          cls +
          '">' +
          Math.round(s) +
          '</div><p class="mini">' +
          stLabel +
          "</p><p class='mini'>" +
          exp +
          "</p></div>"
        );
      })
      .join("");
    wrap.innerHTML = "<h3 class='panel-h' style='margin-top:0'>AI snapshot</h3>" + imgHtml + '<div class="score-grid">' + cards + "</div>";
  }

  function renderPersonalized() {
    var el = $id("personalizedPlan");
    var preview = $id("planPreview");
    if (!el && !preview) return;
    var quiz = QUIZ_ANS;
    var scores = ANALYSIS && ANALYSIS.scores ? ANALYSIS.scores : computeScores(quiz, null);

    var concerns = [];
    var pairs = [
      ["acne", "catAcne"],
      ["darkCircles", "catDark"],
      ["oiliness", "catOil"],
      ["dryness", "catDry"],
      ["redness", "catRed"],
      ["evenness", "catEven"],
      ["wrinkles", "catWrinkle"],
    ];
    pairs.forEach(function (p) {
      concerns.push({ key: p[0], score: scores[p[0]], label: tr(p[1]) });
    });
    concerns.sort(function (a, b) {
      return a.score - b.score;
    });
    var top3 = concerns.slice(0, 3).map(function (x) {
      return x.label;
    });

    var morning =
      "<li>Gentle cleanser</li><li>Hydrating toner or essence</li><li>Lightweight moisturizer</li><li>Broad-spectrum SPF</li>";
    var night =
      "<li>Cleanser</li><li>Treatment for your focus concern</li><li>Moisturizer</li>";
    var weekly = "<li>Clay mask or exfoliant (1× weekly if tolerated)</li><li>Face massage or gua sha</li>";
    var avoid =
      "<li>Harsh scrubs daily</li><li>Multiple new actives at once</li><li>Skipping SPF</li>";
    var habit = LANG === "ku" ? "هەر ڕۆژ ئاو • خەو • SPF" : "Water · Sleep · SPF — daily non-negotiables.";

    if (LANG === "ku") {
      morning =
        "<li>پاککەرەوەی نەرم</li><li>تۆنەر یان ئیسێنس</li><li>نەمکەرەوەی سووک</li><li>SPF بەرفراوان</li>";
      night = "<li>پاککەرەوە</li><li>چارەسەر بۆ کێشەکەت</li><li>نەمکەرەوە</li>";
      weekly = "<li>ماسکی خەڵوز یان لابردنی ئاسایی (١× لە هەفتەدا)</li><li>مەساجی ڕوو</li>";
      avoid = "<li>سڕینەوەی ڕووی زۆر ڕۆژانە</li><li>چەند ئاکتیڤی نوێ لە یەک کاتدا</li><li>بێ SPF</li>";
    }

    var skinLab =
      QUIZ_STEPS[0].opts.find(function (o) {
        return o.id === quiz.skinType;
      }) || {};
    var skinName = LANG === "ku" ? skinLab.ku || quiz.skinType : skinLab.en || quiz.skinType;

    var html =
      '<div class="plan-block"><h3>' +
      tr("planConcerns") +
      "</h3><p>" +
      top3.join(" · ") +
      '</p></div><div class="plan-block"><h3>' +
      tr("planMorning") +
      '</h3><ol>' +
      morning +
      '</ol></div><div class="plan-block"><h3>' +
      tr("planNight") +
      '</h3><ol>' +
      night +
      '</ol></div><div class="plan-block"><h3>' +
      tr("planWeekly") +
      '</h3><ul>' +
      weekly +
      '</ul></div><div class="plan-block"><h3>' +
      tr("planAvoid") +
      '</h3><ul>' +
      avoid +
      '</ul></div><div class="plan-block"><h3>' +
      tr("planHabit") +
      "</h3><p>" +
      habit +
      '</p></div><p class="mini">' +
      (LANG === "ku" ? "جۆری پێست (تاقی): " : "Skin type (quiz): ") +
      skinName +
      "</p>";

    if (el) {
      el.classList.remove("hidden");
      el.innerHTML = "<h3 class='panel-h'>" + (LANG === "ku" ? "پلانی تایبەت" : "Personalized plan") + "</h3>" + html;
    }
    if (preview) preview.innerHTML = html;
  }

  function renderHome() {
    var hs = $id("homeSummary");
    if (!hs) return;
    var quizDone = loadQuiz() && Object.keys(QUIZ_ANS).length >= 5;
    var streak = getRoutineStreak();
    hs.innerHTML =
      '<div class="stat-pill"><span>' +
      (LANG === "ku" ? "تاقی" : "Quiz") +
      '</span><strong>' +
      (quizDone ? "✓" : "…") +
      '</strong></div><div class="stat-pill"><span>' +
      tr("streakLabel") +
      '</span><strong class="ltr-num">' +
      streak +
      "</strong></div>";
    renderPersonalized();
  }

  function getRoutineData() {
    try {
      var raw = localStorage.getItem(keyRoutine());
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { morning: {}, night: {}, weekly: {}, lastSave: "", streak: 0 };
  }

  function saveRoutineData(d) {
    try {
      localStorage.setItem(keyRoutine(), JSON.stringify(d));
    } catch (e) {}
  }

  function getRoutineStreak() {
    return getRoutineData().streak || 0;
  }

  function renderRoutineBuilder() {
    var rd = getRoutineData();
    var mSteps = [
      { id: "m1", en: "Gentle cleanser", ku: "پاککەرەوەی نەرم" },
      { id: "m2", en: "Hydrating toner", ku: "تۆنەری ئاو-دان" },
      { id: "m3", en: "Lightweight moisturizer", ku: "نەمکەرەوەی سووک" },
      { id: "m4", en: "SPF 30+", ku: "SPF ٣٠+" },
    ];
    var nSteps = [
      { id: "n1", en: "Cleanser", ku: "پاککەرەوە" },
      { id: "n2", en: "Treatment serum", ku: "سیرۆمی چارەسەر" },
      { id: "n3", en: "Moisturizer", ku: "نەمکەرەوە" },
    ];
    var wSteps = [{ id: "w1", en: "Mask or exfoliate (1×)", ku: "ماسک یان لابردن (١×)" }];

    function listHtml(steps, prefix, checkedMap) {
      return steps
        .map(function (s) {
          var chk = checkedMap[s.id] ? " checked" : "";
          var lab = LANG === "ku" ? s.ku : s.en;
          return '<li><label><input type="checkbox" data-routine="' + prefix + '" data-id="' + s.id + '"' + chk + " /> " + lab + "</label></li>";
        })
        .join("");
    }

    var mh = $id("morningSteps");
    var nh = $id("nightSteps");
    var wh = $id("weeklySteps");
    if (mh) mh.innerHTML = listHtml(mSteps, "m", rd.morning || {});
    if (nh) nh.innerHTML = listHtml(nSteps, "n", rd.night || {});
    if (wh) wh.innerHTML = listHtml(wSteps, "w", rd.weekly || {});

    document.querySelectorAll('.routine-checklist input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener("change", function () {
        var r = getRoutineData();
        var prefix = cb.getAttribute("data-routine");
        var id = cb.getAttribute("data-id");
        var bucket = prefix === "m" ? "morning" : prefix === "n" ? "night" : "weekly";
        if (!r[bucket]) r[bucket] = {};
        r[bucket][id] = cb.checked;
        saveRoutineData(r);
      });
    });

    var saveBtn = $id("saveRoutineDay");
    if (saveBtn) {
      saveBtn.onclick = function () {
        var r = getRoutineData();
        var today = new Date().toISOString().slice(0, 10);
        var doneM = mSteps.every(function (s) {
          return r.morning && r.morning[s.id];
        });
        var doneN = nSteps.every(function (s) {
          return r.night && r.night[s.id];
        });
        if (doneM && doneN) {
          if (r.lastSave !== today) {
            r.streak = (r.streak || 0) + 1;
            r.lastSave = today;
          }
        }
        saveRoutineData(r);
        var fill = $id("routineStreakFill");
        var num = $id("routineStreakNum");
        if (fill) fill.style.width = clamp((r.streak || 0) * 10, 0, 100) + "%";
        if (num) num.textContent = String(r.streak || 0);
      };
    }
    var fill = $id("routineStreakFill");
    var num = $id("routineStreakNum");
    if (fill) fill.style.width = clamp((rd.streak || 0) * 10, 0, 100) + "%";
    if (num) num.textContent = String(rd.streak || 0);
  }

  function renderTracker() {
    var moodSel = $id("trMood");
    if (moodSel && moodSel.options.length === 0) {
      ["moodClear", "moodOkay", "moodRough", "moodGlow"].forEach(function (key) {
        var o = document.createElement("option");
        o.value = key;
        o.textContent = tr(key);
        moodSel.appendChild(o);
      });
    }

    var hist = $id("trackerHistory");
    var entries = [];
    try {
      entries = JSON.parse(localStorage.getItem(keyTracker()) || "[]");
    } catch (e) {}
    if (!hist) return;
    hist.innerHTML = entries
      .slice(0, 14)
      .map(function (e) {
        return (
          '<div class="track-card"><strong class="ltr-num">' +
          e.date +
          "</strong> · " +
          (e.mood || "") +
          " · sleep " +
          e.sleep +
          " · H₂O sense " +
          e.hydration +
          "<br/>" +
          (e.notes || "") +
          "</div>"
        );
      })
      .join("");

    var form = $id("trackerForm");
    if (form && !form._wired) {
      form._wired = true;
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var entry = {
          date: new Date().toISOString().slice(0, 10),
          mood: $id("trMood").value,
          hydration: $id("trHydration").value,
          sleep: $id("trSleep").value || "7",
          breakout: $id("trBreakout").value,
          oil: $id("trOil").value,
          notes: ($id("trNotes").value || "").slice(0, 500),
        };
        var list = [];
        try {
          list = JSON.parse(localStorage.getItem(keyTracker()) || "[]");
        } catch (e2) {}
        list.unshift(entry);
        localStorage.setItem(keyTracker(), JSON.stringify(list.slice(0, 60)));
        renderTracker();
        form.reset();
        $id("trHydration").value = 5;
        $id("trBreakout").value = 0;
        $id("trOil").value = 5;
      });
    }
  }

  var TRENDS = [
    { key: "trendKTitle", d: "trendKDesc" },
    { key: "trendSpfTitle", d: "trendSpfDesc" },
    { key: "trendGlassTitle", d: "trendGlassDesc" },
    { key: "trendLipTitle", d: "trendLipDesc" },
    { key: "trendHairTitle", d: "trendHairDesc" },
    { key: "trendGlowTitle", d: "trendGlowDesc" },
  ];

  function renderTrends() {
    var g = $id("trendsGrid");
    if (!g) return;
    g.innerHTML = TRENDS.map(function (t) {
      return (
        '<article class="card-trend glass-card"><h3>' +
        tr(t.key) +
        "</h3><p>" +
        tr(t.d) +
        '</p><button type="button" class="btn-soft learn-more" data-jump="learn">' +
        tr("learnLearnMore") +
        "</button></article>"
      );
    }).join("");
    g.querySelectorAll(".learn-more").forEach(function (btn) {
      btn.addEventListener("click", function () {
        jumpTab(btn.getAttribute("data-jump"));
      });
    });
  }

  var EDU = [
    { t: "eduSpfTitle", b: "eduSpfBody" },
    { t: "eduMoistTitle", b: "eduMoistBody" },
    { t: "eduExTitle", b: "eduExBody" },
    { t: "eduOilTitle", b: "eduOilBody" },
    { t: "eduBeginTitle", b: "eduBeginBody" },
  ];

  function renderLearn() {
    var g = $id("learnGrid");
    if (!g) return;
    g.innerHTML = EDU.map(function (e) {
      return '<article class="card-learn glass-card"><h3>' + tr(e.t) + "</h3><p>" + tr(e.b) + "</p></article>";
    }).join("");
  }

  /* ----- Mini games ----- */
  var orderSteps = ["cleanse", "tone", "moist", "spf"];
  var orderLabels = {
    en: { cleanse: "Cleanser", tone: "Toner", moist: "Moisturizer", spf: "SPF" },
    ku: { cleanse: "پاککەرەوە", tone: "تۆنەر", moist: "نەمکەرەوە", spf: "SPF" },
  };

  function renderPlay() {
    renderGameOrder();
    renderGameMatch();
    renderGameRoutine();
  }

  function renderGameOrder() {
    var root = $id("gameOrder");
    if (!root || root._done) return;
    root._done = true;
    var shuffled = orderSteps.slice().sort(function () {
      return Math.random() - 0.5;
    });
    var picked = [];
    root.innerHTML =
      "<p class='mini'>" +
      (LANG === "ku" ? "پێویستە ڕیز بکرێت: پاککەرەوە → تۆنەر → نەمکەرەوە → SPF" : "Tap in order: Cleanser → Toner → Moisturizer → SPF") +
      '</p><div id="orderBtns"></div><p id="orderMsg"></p>';
    var container = $id("orderBtns");
    function drawBtns() {
      container.innerHTML = shuffled
        .map(function (k) {
          return '<button type="button" class="btn-soft order-step" data-k="' + k + '">' + orderLabels[LANG][k] + "</button>";
        })
        .join("");
      container.querySelectorAll(".order-step").forEach(function (b) {
        b.addEventListener("click", function () {
          var k = b.getAttribute("data-k");
          var expect = orderSteps[picked.length];
          if (k !== expect) {
            picked = [];
            $id("orderMsg").textContent = LANG === "ku" ? "دووبارە دەستپێبکە" : "Wrong — sequence reset.";
            return;
          }
          picked.push(k);
          b.disabled = true;
          if (picked.length === orderSteps.length) {
            $id("orderMsg").textContent = LANG === "ku" ? "نایابە!" : "Perfect!";
            showBeautyPlayCelebrate(4, 4, 40, ["gameOrder"]);
          }
        });
      });
    }
    drawBtns();
  }

  var matchRounds = [
    { ing: "Niacinamide", ok: "calm" },
    { ing: "Hyaluronic Acid", ok: "hydrate" },
    { ing: "Ceramides", ok: "barrier" },
  ];
  var matchOpts = {
    en: {
      calm: "Calm & balance oil",
      hydrate: "Boost hydration",
      barrier: "Barrier support",
    },
    ku: {
      calm: "ئارامکردنەوە و هاوسەنگی چەوری",
      hydrate: "زیادکردنی ئاو",
      barrier: "پشتیوانی باریێر",
    },
  };

  function renderGameMatch() {
    var root = $id("gameMatch");
    if (!root || root._done) return;
    root._done = true;
    var ri = 0,
      sc = 0;
    function round() {
      if (ri >= matchRounds.length) {
        root.innerHTML += "<p>" + (LANG === "ku" ? "کۆتایی — نمرە: " : "Done — score: ") + sc + "</p>";
        showBeautyPlayCelebrate(sc, matchRounds.length, sc * 20, ["gameMatch"]);
        return;
      }
      var r = matchRounds[ri];
      root.innerHTML =
        "<p><b>" +
        r.ing +
        '</b></p><div id="matchPick"></div><p id="matchFb"></p>';
      var picks = $id("matchPick");
      ["calm", "hydrate", "barrier"].forEach(function (key) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-soft";
        btn.textContent = matchOpts[LANG][key];
        btn.onclick = function () {
          if (key === r.ok) {
            sc++;
            $id("matchFb").textContent = LANG === "ku" ? "دروست!" : "Correct!";
            ri++;
            round();
          } else $id("matchFb").textContent = LANG === "ku" ? "هەوڵی دواتر" : "Try again.";
        };
        picks.appendChild(btn);
      });
    }
    round();
  }

  function renderGameRoutine() {
    var root = $id("gameRoutine");
    if (!root || root._done) return;
    root._done = true;
    var seq = ["cleanse", "treat", "moist"];
    var labels = {
      en: { cleanse: "Cleanse", treat: "Treatment", moist: "Moisturize" },
      ku: { cleanse: "پاککردنەوە", treat: "چارەسەر", moist: "نەمکەرەوە" },
    };
    var user = [];
    var shuf = seq.slice().sort(function () {
      return Math.random() - 0.5;
    });
    root.innerHTML =
      "<p class='mini'>" +
      (LANG === "ku" ? "ڕیز: پاککردنەوە → چارەسەر → نەمکەرەوە" : "Order: Cleanse → Treatment → Moisturize") +
      '</p><div id="rgBtns"></div><p id="rgFb"></p>';
    var box = $id("rgBtns");
    shuf.forEach(function (k) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "btn-soft";
      b.textContent = labels[LANG][k];
      b.onclick = function () {
        var exp = seq[user.length];
        if (k !== exp) {
          user = [];
          $id("rgFb").textContent = LANG === "ku" ? "دووبارە" : "Reset.";
          return;
        }
        user.push(k);
        b.disabled = true;
        if (user.length === seq.length) {
          $id("rgFb").textContent = LANG === "ku" ? "تەواو!" : "Locked in!";
          showBeautyPlayCelebrate(3, 3, 30, ["gameRoutine"]);
        }
      };
      box.appendChild(b);
    });
  }

  function confettiBurst() {
    var c = $id("confettiBeauty");
    if (!c) return;
    var ctx = c.getContext("2d");
    c.width = innerWidth;
    c.height = innerHeight;
    var parts = [];
    for (var i = 0; i < 80; i++) {
      parts.push({
        x: Math.random() * c.width,
        y: -20 - Math.random() * 80,
        vx: -2 + Math.random() * 4,
        vy: 2 + Math.random() * 5,
        col: ["#f9b4cc", "#e8d4ff", "#fdeef2", "#c9a8e8"][i % 4],
      });
    }
    var t0 = Date.now();
    function tick() {
      ctx.clearRect(0, 0, c.width, c.height);
      parts.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillStyle = p.col;
        ctx.fillRect(p.x, p.y, 6, 6);
      });
      if (Date.now() - t0 < 1400) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, c.width, c.height);
    }
    tick();
  }

  function openAiModal() {
    var modal = $id("aiModal");
    var gate = $id("aiPermissionGate");
    var phase = $id("aiCameraPhase");
    var vid = $id("aiVideo");
    var cvs = $id("aiCanvas");
    var checklist = $id("aiChecklist");
    var httpsN = $id("aiHttpsNote");
    var errEl = $id("aiCamError");
    var allowBtn = $id("aiAllowCamera");
    var analyzeBtn = $id("aiAnalyzeBtn");
    var prog = $id("aiProgSpan");
    var analyzing = $id("aiAnalyzing");
    if (!modal || !vid || !cvs || !gate || !phase) return;

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    gate.classList.remove("hidden");
    phase.classList.add("hidden");
    if (analyzing) analyzing.classList.add("hidden");
    if (prog) prog.style.width = "0%";
    if (errEl) {
      errEl.classList.add("hidden");
      errEl.textContent = "";
    }

    var insecure =
      typeof location !== "undefined" &&
      location.protocol !== "https:" &&
      location.hostname !== "localhost" &&
      location.hostname !== "127.0.0.1";
    if (httpsN) httpsN.classList.toggle("hidden", !insecure);

    checklist.innerHTML =
      "<strong>" +
      (LANG === "ku" ? "پێش دەستپێکردن" : "Before you start") +
      "</strong><ul><li>" +
      tr("chkGlasses") +
      "</li><li>" +
      tr("chkFace") +
      "</li><li>" +
      tr("chkLight") +
      "</li><li>" +
      tr("chkHair") +
      "</li></ul>";

    if (typeof KurdanaBeautyFace === "undefined") {
      if (errEl) {
        errEl.textContent = LANG === "ku" ? "بارکردنی Face Mesh سەرکەوتوو نەبوو." : "Face Mesh failed to load.";
        errEl.classList.remove("hidden");
      }
      return;
    }

    function finishAnalysis() {
      var lm = KurdanaBeautyFace.getLastLandmarks();
      var scores = computeScores(QUIZ_ANS, lm);
      ANALYSIS = { scores: scores, at: Date.now() };
      saveAnalysis(ANALYSIS);
      var snap = KurdanaBeautyFace.captureSnapshot(lm);
      var dataUrl = snap ? snap.toDataURL("image/jpeg", 0.85) : "";
      KurdanaBeautyFace.stopPreview();
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      gate.classList.remove("hidden");
      phase.classList.add("hidden");
      if (analyzing) analyzing.classList.add("hidden");
      renderScoreCards(scores, dataUrl);
      renderPersonalized();
      jumpTab("quiz");
    }

    function wireAnalyze() {
      if (!analyzeBtn) return;
      analyzeBtn.onclick = function () {
        if (analyzing) analyzing.classList.remove("hidden");
        var p = 0;
        var iv = setInterval(function () {
          p += 8;
          if (prog) prog.style.width = Math.min(100, p) + "%";
          if (p >= 100) {
            clearInterval(iv);
            setTimeout(finishAnalysis, 350);
          }
        }, 120);
      };
    }

    if (allowBtn) {
      allowBtn.onclick = function () {
        if (errEl) {
          errEl.classList.add("hidden");
          errEl.textContent = "";
        }
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          if (errEl) {
            errEl.textContent = tr("camUnavailable");
            errEl.classList.remove("hidden");
          }
          return;
        }
        KurdanaBeautyFace.requestUserCameraStream()
          .then(function (stream) {
            gate.classList.add("hidden");
            phase.classList.remove("hidden");
            return KurdanaBeautyFace.startWithStream(stream, {
              video: vid,
              canvas: cvs,
              onReady: function () {
                wireAnalyze();
              },
              onError: function () {
                try {
                  stream.getTracks().forEach(function (t) {
                    t.stop();
                  });
                } catch (e) {}
                if (errEl) {
                  errEl.textContent = tr("camUnavailable");
                  errEl.classList.remove("hidden");
                }
                gate.classList.remove("hidden");
                phase.classList.add("hidden");
              },
            });
          })
          .catch(function (err) {
            var name = err && err.name ? String(err.name) : "";
            if (errEl) errEl.classList.remove("hidden");
            if (name === "NotAllowedError" || name === "PermissionDeniedError") {
              if (errEl) errEl.textContent = tr("camDenied");
            } else if (insecure) {
              if (errEl) errEl.textContent = tr("camHttpsWarn");
            } else {
              if (errEl) errEl.textContent = tr("camUnavailable");
            }
          });
      };
    }

    var closeBtn = $id("aiClose");
    var cancelBtn = $id("aiCancelBtn");
    function closeM() {
      if (typeof KurdanaBeautyFace !== "undefined") KurdanaBeautyFace.stopPreview();
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      gate.classList.remove("hidden");
      phase.classList.add("hidden");
      if (analyzing) analyzing.classList.add("hidden");
    }
    if (closeBtn) closeBtn.onclick = closeM;
    if (cancelBtn) cancelBtn.onclick = closeM;
  }

  function renderAll() {
    var sv = loadQuiz();
    if (sv && sv.answers) QUIZ_ANS = sv.answers;
    if (sv && typeof sv.step === "number") QUIZ_STEP = sv.step;
    if (Object.keys(QUIZ_ANS).length >= QUIZ_STEPS.length) QUIZ_STEP = QUIZ_STEPS.length;
    ANALYSIS = loadAnalysis();
    renderQuiz();
    renderHome();
    renderRoutineBuilder();
    renderTracker();
    renderTrends();
    renderLearn();
    if (document.querySelector('#panel-play.active')) renderPlay();

    if (ANALYSIS && ANALYSIS.scores) renderScoreCards(ANALYSIS.scores, "");
  }

  function init() {
    var urlLang = parseUrlLang();
    var stored = localStorage.getItem("beauty_lang_v2");
    if (urlLang) setLang(urlLang);
    else if (stored === "ku" || stored === "en") setLang(stored);
    else setLang("en");

    wireTabs();
    $id("langToggle").addEventListener("click", function () {
      setLang(LANG === "en" ? "ku" : "en");
    });

    $id("btnQuizJump").addEventListener("click", function () {
      jumpTab("quiz");
    });
    $id("btnAiJump").addEventListener("click", function () {
      jumpTab("quiz");
      setTimeout(openAiModal, 400);
    });
    $id("btnTrendsJump").addEventListener("click", function () {
      jumpTab("trends");
    });
    $id("openAiModal").addEventListener("click", openAiModal);

    window.addEventListener("message", function (e) {
      if (!e.data || e.data.type !== "kh-lang") return;
      if (e.data.lang === "ku" || e.data.lang === "en") setLang(e.data.lang);
    });

    renderAll();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
