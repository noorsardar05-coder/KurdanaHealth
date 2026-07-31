/**
 * NSM — First-Time Mothers Department
 * Bilingual EN / Sorani Kurdish — vanilla JS
 */
(function () {
  "use strict";

  const STORAGE = {
    lang: "ftm-lang",
    checkIn: "ftm-checkin",
    quizResult: "ftm-quiz-result",
    logs: "ftm-logs",
    dailyTipIdx: "ftm-daily-tip",
  };

  let currentLang = localStorage.getItem(STORAGE.lang) || "en";
  let quoteIndex = 0;
  let exploreQuoteIndex = 1;
  let discoverQuoteIndex = 2;

  /* ---------- Shared UI helpers ---------- */
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function setDirAndLang() {
    document.documentElement.lang = currentLang === "ku" ? "ckb" : "en";
    document.documentElement.dir = currentLang === "ku" ? "rtl" : "ltr";
  }

  function t(key) {
    const bucket = I18N[currentLang] || I18N.en;
    return bucket[key] != null ? bucket[key] : I18N.en[key] || key;
  }

  function applyI18n() {
    setDirAndLang();
    $all("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (key && I18N[currentLang] && I18N[currentLang][key] != null) {
        el.textContent = I18N[currentLang][key];
      } else if (key && I18N.en[key] != null) {
        el.textContent = I18N.en[key];
      }
    });
    const langBtn = $("#langToggle");
    if (langBtn) {
      langBtn.textContent =
        currentLang === "en" ? "کوردی" : "English";
      langBtn.setAttribute(
        "aria-label",
        currentLang === "en" ? "گۆڕین بۆ کوردی" : "Switch to English"
      );
    }
  }

  function pickQuote() {
    const i = Math.floor(Math.random() * NOOR_QUOTES.length);
    return NOOR_QUOTES[i];
  }

  function showQuote(el, animClass) {
    if (!el) return;
    const q = pickQuote();
    const line = currentLang === "ku" ? q.ku : q.en;
    if (animClass) {
      el.classList.add(animClass);
      setTimeout(function () {
        el.textContent = line;
        el.classList.remove(animClass);
      }, 200);
    } else {
      el.textContent = line;
    }
  }

  function initQuoteButtons() {
    const hq = $("#heroQuoteText");
    const eq = $("#exploreQuoteText");
    const dq = $("#discoverQuoteText");
    if (hq) hq.textContent = (currentLang === "ku" ? NOOR_QUOTES[0].ku : NOOR_QUOTES[0].en);
    if (eq) eq.textContent = (currentLang === "ku" ? NOOR_QUOTES[1].ku : NOOR_QUOTES[1].en);
    if (dq) dq.textContent = (currentLang === "ku" ? NOOR_QUOTES[2].ku : NOOR_QUOTES[2].en);

    const hb = $("#heroQuoteBtn");
    if (hb) {
      hb.onclick = function () {
        showQuote($("#heroQuoteText"), "fade-out");
      };
    }
    const eb = $("#exploreQuoteBtn");
    if (eb) {
      eb.onclick = function () {
        showQuote($("#exploreQuoteText"), "fade-out");
      };
    }
    const db = $("#discoverQuoteBtn");
    if (db) {
      db.onclick = function () {
        showQuote($("#discoverQuoteText"), "fade-out");
      };
    }
  }

  /* ---------- Tabs ---------- */
  function switchTab(id) {
    $all(".tab").forEach(function (btn) {
      const on = btn.getAttribute("data-tab") === id;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    $all(".panel").forEach(function (p) {
      const panelId = p.id.replace("panel-", "");
      const show = panelId === id;
      p.hidden = !show;
      p.classList.toggle("active", show);
    });
    if (id === "learn") renderLearn();
    if (id === "care") renderCareTools();
    if (id === "track") renderTrack();
    if (id === "discover") renderDiscover();
  }

  function initTabs() {
    $all(".tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        switchTab(btn.getAttribute("data-tab"));
      });
    });
  }

  /* ---------- Hero CTAs ---------- */
  function initHeroCtas() {
    $("#ctaCheckIn")?.addEventListener("click", function () {
      switchTab("explore");
      document.getElementById("explore-heading")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(function () {
        $("#checkInRoot")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    });
    $("#ctaExplore")?.addEventListener("click", function () {
      switchTab("explore");
      document.getElementById("explore-heading")?.scrollIntoView({ behavior: "smooth" });
    });
    $("#ctaGuidance")?.addEventListener("click", function () {
      switchTab("care");
      document.getElementById("care-heading")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  function refreshAll() {
    applyI18n();
    initQuoteButtons();
    renderCheckIn();
    renderDashboard();
    renderQuiz();
    renderGuidanceCards();
    renderLearn();
    renderCareTools();
    renderTrack();
    renderDiscover();
  }

  /* ---------- Celebrate (quiz complete) ---------- */
  function celebrateLite() {
    const c = document.getElementById("celebrateCanvas");
    if (!c) return;
    const ctx = c.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = window.innerWidth * dpr;
    c.height = window.innerHeight * dpr;
    c.style.width = "100%";
    c.style.height = "100%";
    ctx.scale(dpr, dpr);
    const parts = [];
    for (let i = 0; i < 36; i++) {
      parts.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 80,
        r: 2 + Math.random() * 3,
        vy: 1 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 1.5,
        a: 0.5 + Math.random() * 0.5,
        hue: [200, 320, 45, 140][Math.floor(Math.random() * 4)],
      });
    }
    let frame = 0;
    function tick() {
      frame++;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      parts.forEach(function (p) {
        p.y += p.vy;
        p.x += p.vx;
        ctx.globalAlpha = p.a * (1 - frame / 90);
        ctx.fillStyle = "hsl(" + p.hue + ", 45%, 70%)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (frame < 75) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- NOOR quotes (28) ---------- */
  const NOOR_QUOTES = [
    { en: "You do not need perfection. You need support.", ku: "تۆ پێویستت بە تەواوی تەواو نەبووە؛ پێویستت بە پاڵپشتی هەیە." },
    { en: "A mother is also healing while learning.", ku: "دایک لە هەمان کاتدا چاک دەبێتەوە لە کاتی فێربوونیدا." },
    { en: "Small moments of care matter more than perfect days.", ku: "چەن خولەکێک چاوەڕوانی ناسک لەخۆگران، لە ڕۆژێکی «تەواو» گرنگترن." },
    { en: "You are growing too, not just your baby.", ku: "تۆش گەشە دەکەیت، تەنها منداڵەکەت نییە." },
    { en: "Softness is strength in motherhood.", ku: "نەرمی لە دایکایەتیدا هێزێکی ناسک و بەهێزە." },
    { en: "Rest is not a luxury — it is part of the work of caring.", ku: "نەستەمانی ڕەخسەتێکی دوور نییە — بەشێکە لە کارەکانی چاوەڕوانی." },
    { en: "Asking for help is a gentle kind of courage.", ku: "داوای یارمەتی کردن جونەتی ناسک و بە «بەهێز»ە." },
    { en: "You are allowed to feel tired and still be a wonderful mother.", ku: "دەکرێت لە هەمانکاتدا ماندوو بیت و دایکێکی جوان بیت." },
    { en: "Your baby is not grading you — they are learning you.", ku: "منداڵەکەت نانووسێتەوە؛ تۆ فێر دەبێت و تۆش فێری ئەو دەبیت." },
    { en: "One calm breath can soften a whole hour.", ku: "نیگایەکی ئارام دەتوانێت کاتژمێرێک نەرم بکاتەوە." },
    { en: "You are not behind; you are in your own season.", ku: "تۆ لە پاشەوە نیت؛ لە وەرزێکی تایبەت بە خۆتدایت." },
    { en: "Healing and holding can happen in the same arms.", ku: "چاکبوونەوە و لەخۆگرتن دەتوانن لە هەمان باوەشدا بێت." },
    { en: "Love sometimes looks like repeated, ordinary tries.", ku: "خۆشەویستی هەندێک جار وەک هەوڵی ئاسایی دووبارەبووەوە دەردەکەوێت." },
    { en: "You deserve spaces where you do not have to explain yourself.", ku: "شوێنێکت پێ دەبێت کە پێویست نەکات زۆر خۆت ڕوون بکەیتەوە." },
    { en: "Your pace is valid, even when the world feels loud.", ku: "خێرایی تۆ دروستە، تەنانەت کاتێکیش جیهان بێدەنگ نەبێت." },
    { en: "Being unsure does not mean you are failing.", ku: "نەزانین واتای شکست نییە." },
    { en: "A gentle routine is a gift to a tired mind.", ku: "ڕۆتینێکی ناسک، هدییەکە بۆ بیرێکی ماندوو." },
    { en: "You can hold your baby and still need to be held, too.", ku: "دەکرێت منداڵەکە بگرێت و هێشتا پێویستت بەگرێنەوەکەشی هەبێت." },
    { en: "Tonight does not define all your tomorrows.", ku: "ئەم شەو وەسفی هەموو بەیانییەکانت ناکات." },
    { en: "Progress can be quieter than you expect.", ku: "پێشکەوتن دەتوانێت بێدەنگتر بێت لەوەی چاوەڕوانت بێت." },
    { en: "Your wellbeing is woven into your baby’s world.", ku: "تەندروستی تۆ بەشێکە لە جیهانی منداڵەکەت." },
    { en: "There is wisdom in taking things one sip, one nap, one step at a time.", ku: "ژیرایەتییەک هەیە لە کارپێکردنی شت بە یەکجار: یەک خواردنەوە، یەک خەوتنەوە، یەک هەنگاو." },
    { en: "You are learning a love that has no finished syllabus.", ku: "تۆ فێری خۆشەویستییەک دەبیت کە کورتەیەکی کۆتایی نییە." },
    { en: "It is okay if some days feel like survival — you are still showing up.", ku: "باشە ئەگەر هەندێک ڕۆژ وەک مانەوە هەست بکرێت — تۆ هێشتا ئامادەیت." },
    { en: "Your tenderness is not weakness; it is refuge.", ku: "نەرمی تۆ بێهێز نییە؛ پەنایەکە." },
    { en: "The village can start with one trusted voice.", ku: "گوند دەتوانێت بە دەنگێکی متمانەپێکراو دەست پێ بکات." },
    { en: "You are allowed to change your mind as you learn your baby.", ku: "دەکرێت بیرت بگۆڕێت کاتێک فێری منداڵەکە دەبیت." },
    { en: "This chapter is hard, and you are still worthy of gentleness.", ku: "ئەم بەشە قورسە، و تۆ هێشتا بە نەرمی شایستەیت." },
  ];

  /* ---------- I18N keys (EN + Sorani) ---------- */
  const I18N = {
    en: {
      skipContent: "Skip to content",
      brandTag: "First-Time Mothers",
      heroEyebrow: "Department of Care",
      heroTitle: "First-Time Mothers",
      heroSubtitle:
        "A calm companion for guidance, healing, and the early days of motherhood — structured, practical, and emotionally safe.",
      quoteHint: "Tap or click for another gentle thought",
      ctaCheckIn: "Start Check-In",
      ctaExplore: "Explore Mother Care",
      ctaGuidance: "Get Guidance",
      heroDisclaimer:
        "This space offers general wellness support, not medical diagnosis. Reach out to a qualified professional for clinical concerns.",
      tabExplore: "Explore",
      tabLearn: "Learn",
      tabCare: "Care Tools",
      tabTrack: "Track",
      tabDiscover: "Discover",
      exploreTitle: "Explore",
      exploreSub:
        "Your entry point — check in, notice your patterns, and find what helps today without pressure.",
      checkInTitle: "Mother Check-In",
      dashboardTitle: "Personalized Support Dashboard",
      quizTitle: "Advanced Motherhood Quiz",
      guidanceCardsTitle: "Gentle guidance",
      noorSectionTitle: "A moment with Noor",
      learnTitle: "Learn",
      learnSub: "A premium-feeling library — scannable, warm, and built for short windows of time.",
      careTitle: "Care Tools",
      careSub: "Interactive helpers for real moments — step by step, never judgmental.",
      trackTitle: "Track",
      trackSub: "Logs stay on this device — patterns and softness, not punishment.",
      discoverTitle: "Discover",
      discoverSub: "Curated extras — light for your day, wins, and calm reminders.",
      dailyTipTitle: "Today’s motherhood tip",
      anotherTip: "Another tip",
      smallWinsTitle: "Small wins",
      calmCardsTitle: "Calming cards",
      discoverMythTitle: "Myth vs fact — quick",
      stageGuideTitle: "Simple guide by stage",
      discoverQuoteTitle: "Noor for you",
      footerNote: "Made with care for first-time mothers. NSM — Noor-style support.",
      toolNowTitle: "What do I do right now?",
      toolFeedTitle: "Feeding helper",
      toolSleepTitle: "Sleep support",
      reassureCardsTitle: "Reassurance cards",
      pathwayTitle: "Quick support pathway",
      pathwayIntro: "Choose what you need most — we will point you to the right tab or tool.",
      logTodayTitle: "Log today",
      saveLog: "Save entry",
      summaryTitle: "Recent summary",
      insightsTitle: "Gentle insights",
      historyTitle: "Daily log",
      checkStart: "Begin check-in",
      checkNext: "Continue",
      checkBack: "Back",
      checkFinish: "See gentle guidance",
      checkFeeling: "How are you feeling today?",
      checkEnergy: "How is your energy today?",
      checkSleep: "How was your sleep recently?",
      checkSupported: "How supported do you feel?",
      checkHardest: "What feels hardest right now?",
      checkBabyStage: "Baby’s age / stage",
      checkNeeds: "What kind of support sounds helpful? (choose any)",
      optLow: "Low / heavy",
      optOkay: "Okay / mixed",
      optGood: "Steady / lighter",
      optVeryLow: "Very low",
      optPoor: "Broken or very little",
      optSome: "Some nights okay",
      optBetter: "A bit better lately",
      optRarely: "Rarely",
      optSometimes: "Sometimes",
      optOften: "Often / well surrounded",
      hardestFeed: "Feeding or latch worries",
      hardestSleep: "Sleep — mine or baby’s",
      hardestOverwhelm: "Overwhelm / anxiety",
      hardestAlone: "Loneliness or low support",
      hardestRecovery: "Body recovery / pain",
      hardestRoutine: "Rhythm / routine",
      stageNewborn: "Newborn",
      stage13: "1–3 months",
      stage36: "3–6 months",
      stage6p: "6+ months",
      needRest: "Rest",
      needReassure: "Reassurance",
      needBabyCare: "Baby care guidance",
      needFeed: "Feeding support",
      needSleep: "Sleep support",
      needEmotional: "Emotional support",
      needRoutine: "Routine help",
      dashEmpty:
        "Complete a check-in to see a gentle summary here. This dashboard is private on your device.",
      dashLast: "Last check-in snapshot",
      dashEnergy: "Energy",
      dashSleep: "Sleep",
      dashSupport: "Supported",
      dashHardest: "Hardest area",
      dashStage: "Stage",
      dashSuggest: "You might start with",
      goLearn: "Open Learn",
      goCare: "Open Care Tools",
      goTrack: "Open Track",
      guidance1t: "When the day feels loud",
      guidance1:
        "Lower the bar to one kind thing for your body: water, a snack, two slow breaths, or five minutes off your feet.",
      guidance2t: "Feeding worries",
      guidance2:
        "Most concerns benefit from calm observation and patience. The Feeding helper offers gentle steps — not rules.",
      guidance3t: "Sleep survival",
      guidance3:
        "Short stretches still count as rest. Pair safe-sleep basics with tiny recovery windows for you.",
      quizIntro: "One question at a time. Take your time — there are no wrong answers.",
      quizBack: "Back",
      quizNext: "Next",
      quizFinish: "See my gentle summary",
      quizRestart: "Retake",
      learnPickTopic: "Choose a topic",
      toolPick: "Choose what is happening",
      toolSteps: "Gentle steps",
      feedPick: "What do you want support with?",
      sleepPick: "What is the struggle?",
      pathwayCalm: "I need calm right now",
      pathwayFeed: "Feeding help",
      pathwaySleep: "Sleep help",
      pathwayBaby: "Baby care basics",
      pathwayEmo: "Emotional support",
      pathwayRoutine: "Routine / rhythm",
      trackSaved: "Saved for today. Thank you for tending to yourself.",
      mood: "Your mood (1–5)",
      energyLog: "Energy (1–5)",
      restLog: "Rest quality (1–5)",
      feedTime: "Last feeding (approx. time)",
      sleepBaby: "Baby sleep (note)",
      diaper: "Diaper changes (count today)",
      notes: "Notes / concerns",
      noLogs: "No entries yet. One small log can already help you see patterns.",
      insightGeneric:
        "When you log regularly, gentle patterns may appear — never to judge you, only to support reflection.",
    },
    ku: {
      skipContent: "بڕۆ بەرەو ناوەڕۆک",
      brandTag: "دایکانی یەکەمجار",
      heroEyebrow: "بەشی چاوەڕوانی",
      heroTitle: "دایکانی یەکەمجار",
      heroSubtitle:
        "هاوڕێیەکی ئارام بۆ ڕێنمایی، چاکبوونەوە، و ڕۆژە سەرەتاییەکانی دایکایەتی — ڕێکخراو، کاربەردە، و هەستیارانە بێهۆشکاری.",
      quoteHint: "کلیک بکە بۆ بیرێکی تر",
      ctaCheckIn: "دەستپێکردنی چاوەڕوانی",
      ctaExplore: "پشکنینی چاوەڕوانی دایکایەتی",
      ctaGuidance: "وەرگرتنی ڕێنمایی",
      heroDisclaimer:
        "ئەم شوێنە پشتگیری گشتی تەندروستی پێشکەش دەکات، نەشێوەر نییە. بۆ نیگەرانی پزیشکی، پەیوەندی بە پسپۆڕەوە بکە.",
      tabExplore: "پشکنین",
      tabLearn: "فێربوون",
      tabCare: "ئامرازەکان",
      tabTrack: "تۆمار",
      tabDiscover: "دۆزینەوە",
      exploreTitle: "پشکنین",
      exploreSub:
        "دەستەکەت لێ دەست پێ دەکێت — خۆت بپشکنە، تێبگە لە شێوازەکان، بزانە ئەمڕۆ چی یارمەتیت دەدات بێ فشار.",
      checkInTitle: "چاوەڕوانی دایک",
      dashboardTitle: "داشبۆردی پشتگیری تایبەت",
      quizTitle: "تێستی پێشکەوتوو",
      guidanceCardsTitle: "ڕێنمایی نەرم",
      noorSectionTitle: "ساتێک لەگەڵ نور",
      learnTitle: "فێربوون",
      learnSub:
        "کتێبخانەیەکی هەڵبژاردوو — خوێندنەوەی ئاسان، گەرم، بۆ کاتە کورتەکان.",
      careTitle: "ئامرازەکانی چاوەڕوانی",
      careSub:
        "یاریدەدەر بۆ کاتی ڕاستەقینە — هەنگاو بە هەنگاو، بێ حوکمدان.",
      trackTitle: "تۆمار",
      trackSub:
        "تۆمارەکان لەسەر ئەم ئامێرە دەمێننەوە؛ شێواز و نەرمی، نەک سزادان.",
      discoverTitle: "دۆزینەوە",
      discoverSub:
        "زیادکراوەکان — ڕووناکی بۆ ڕۆژەکەت، سەرکەوتنی بچووک، بیرهێنانەوەی ئارام.",
      dailyTipTitle: "ئامۆژگاریی ئەمڕۆ",
      anotherTip: "ئامۆژگاریی تر",
      smallWinsTitle: "سەرکەوتنی بچووک",
      calmCardsTitle: "کارتی ئارامکردنەوە",
      discoverMythTitle: "درۆ و ڕاستی — کورت",
      stageGuideTitle: "ڕێنمایی بەپێی قۆناغ",
      discoverQuoteTitle: "نور بۆ تۆ",
      footerNote:
        "بە وریایی دروستکراوە بۆ دایکانی یەکەمجار. NSM — پشتگیری شیوەی نور.",
      toolNowTitle: "ئێستا چ بکەم؟",
      toolFeedTitle: "یارمەتی خواردنەوە",
      toolSleepTitle: "پشتگیری خەوتن",
      reassureCardsTitle: "کارتی هێنانەوە دڵنیایی",
      pathwayTitle: "ڕێگای پشتگیری خێرا",
      pathwayIntro: "پێویستی خۆت هەڵبژێرە — ئێمە بۆ تۆ نیشان دەدەین لە کوێ بچیت.",
      logTodayTitle: "تۆماری ئەمڕۆ",
      saveLog: "پاشەکەوت",
      summaryTitle: "پوختەی دوایی",
      insightsTitle: "تێگەیشتنی نەرم",
      historyTitle: "تۆماری ڕۆژانە",
      checkStart: "دەستپێکردن",
      checkNext: "بەردەوامبوون",
      checkBack: "گەڕانەوە",
      checkFinish: "پیشاندانی ڕێنمایی نەرم",
      checkFeeling: "ئەمڕۆ چۆن هەست دەکەیت؟",
      checkEnergy: "ئەمڕۆ وزەەکەت چۆنە؟",
      checkSleep: "خەوتنەوەکەت چۆن بووە بەدواوە؟",
      checkSupported: "چەندە هەست بە پاڵپشتی دەکەیت؟",
      checkHardest: "ئێستا دوورترین شت چییە؟",
      checkBabyStage: "تەمەن/قۆناغی منداڵ",
      checkNeeds: "چ جۆرە پشتگیریەک پێویستتە؟ (هەرچەندێک)",
      optLow: "کەم / قورس",
      optOkay: "مامناوەند / تێکەڵ",
      optGood: "جێگیر / سوکتر",
      optVeryLow: "زۆر کەم",
      optPoor: "شکاوە یان زۆر کەم",
      optSome: "هەندێک شەو باشتر",
      optBetter: "ماوەیەکە باشتر بووە",
      optRarely: "زۆر کەم",
      optSometimes: "هەندێک جار",
      optOften: "زۆرجار / پاڵپشتی باش",
      hardestFeed: "نیگەرانی خواردنەوە یان لکاندن",
      hardestSleep: "خەوتن — من یان منداڵ",
      hardestOverwhelm: "متمانەنەوەی زیاد / نیگەرانی",
      hardestAlone: "تەنیایی یان پشتگیری کەم",
      hardestRecovery: "چاکبوونەوەی جەستە / ئازار",
      hardestRoutine: "ڕیتم / ڕۆتین",
      stageNewborn: "نوێزاد",
      stage13: "١–٣ مانگ",
      stage36: "٣–٦ مانگ",
      stage6p: "٦+ مانگ",
      needRest: "نەستەمانی",
      needReassure: "هێنانەوە دڵنیایی",
      needBabyCare: "ڕێنمایی چاوەڕوانی منداڵ",
      needFeed: "پشتگیری خواردنەوە",
      needSleep: "پشتگیری خەوتن",
      needEmotional: "پشتگیری هەستیاری",
      needRoutine: "یارمەتی ڕۆتین",
      dashEmpty:
        "چاوەڕوانییەک تەواو بکە بۆ بینینی پوختەیەکی نەرم لێرە. ئەم داشبۆردە تایبەتە لەسەر ئەم ئامێرە.",
      dashLast: "دوایین چاوەڕوانی",
      dashEnergy: "وزە",
      dashSleep: "خەوتنەوە",
      dashSupport: "پاڵپشتی",
      dashHardest: "دوورترین بوار",
      dashStage: "قۆناغ",
      dashSuggest: "لەوانەیە دەست پێ بکەیت لە",
      goLearn: "فێربوون",
      goCare: "ئامرازەکان",
      goTrack: "تۆمار",
      guidance1t: "کاتێک ڕۆژەکە «قورس» دەهەرمێت",
      guidance1:
        "ئاستەکە نزم بکەرەوە بۆ یەک شتی میهرەبانانە بۆ جەستەت: ئاو، نان، دوو هەناسەی هێواش، یان پێنج خولەک دابنە.",
      guidance2t: "نیگەرانی خواردنەوە",
      guidance2:
        "زۆربەی نیگەرانییەکان لەبەردەم چاودێری ئارام و ئارامییەوە سوک دەکرێنەوە؛ یارمەتیدەرەکە هەنگاوە نەرمەکان پێشکەش دەکات — نەک یاسای توند.",
      guidance3t: "مانەوەی خەوتن",
      guidance3:
        "کاتە کورتەکانیش نەستەمانین. ئاسایشی خەوتنەوە لەگەڵ چرکەی چاکبوونەوە بۆ تۆ دابنێ.",
      quizIntro: "هەر جارێک یەک پرسیار. کاتت بگرە — وەڵامێکی «هەڵە» نییە.",
      quizBack: "گەڕانەوە",
      quizNext: "دواتر",
      quizFinish: "بینینی پوختەی نەرم",
      quizRestart: "دووبارەکردنەوە",
      learnPickTopic: "بابەت هەڵبژێرە",
      toolPick: "چ ڕوودەدات هەڵبژێرە",
      toolSteps: "هەنگاوە نەرمەکان",
      feedPick: "دەربارەی چی پشتگیری دەویت؟",
      sleepPick: "کێشەکە چییە؟",
      pathwayCalm: "ئێستا پێویستم بە ئارامی هەیە",
      pathwayFeed: "یارمەتی خواردنەوە",
      pathwaySleep: "یارمەتی خەوتن",
      pathwayBaby: "بنچینەکانی چاوەڕوانی",
      pathwayEmo: "پشتگیری هەستیاری",
      pathwayRoutine: "ڕیتم / ڕۆتین",
      trackSaved: "پاشەکەوت کرا. سوپاس کە خۆت دەپاری.",
      mood: "هەست (١–٥)",
      energyLog: "وزە (١–٥)",
      restLog: "جۆری نەستەمانی (١–٥)",
      feedTime: "کاتی دوایین خواردنەوە (نزیک بە)",
      sleepBaby: "خەوتنەوەی منداڵ (تێبینی)",
      diaper: "گۆڕینی بەل (ژماردن ی ئەمڕۆ)",
      notes: "تێبینی / نیگەرانی",
      noLogs: "هێشتا تۆمار نییە. تۆمارێکی بچووک دەتوانێت شێوازەکانت ڕوون بکاتەوە.",
      insightGeneric:
        "کاتێک بەردەوام تۆمار دەکەیت، شێوازە نەرمەکان دەردەکەون — نەک بۆ حوکمدان، تەنها بۆ بیرکردنەوە.",
    },
  };

  /* ---------- QUIZ ---------- */
  function quizQuestions() {
    return [
      {
        id: "age",
        q: currentLang === "ku"
          ? "منداڵەکەت لە چ قۆناغێکدایە؟"
          : "Where is your baby in their stage right now?",
        opts: [
          { text: t("stageNewborn"), p: "practical" },
          { text: t("stage13"), p: "overload" },
          { text: t("stage36"), p: "steady" },
          { text: t("stage6p"), p: "steady" },
        ],
      },
      {
        id: "feed",
        q: currentLang === "ku"
          ? "خواردنەوەکەت چۆن دەڕێت؟"
          : "How does feeding feel for you right now?",
        opts: [
          { text: currentLang === "ku" ? "سێیی/تێکەڵ" : "Mixed / figuring it out", p: "practical" },
          { text: currentLang === "ku" ? "زۆرتر شیر" : "Mostly breastfeeding", p: "practical" },
          { text: currentLang === "ku" ? "زۆرتر شیر خشتو" : "Mostly formula", p: "steady" },
          { text: currentLang === "ku" ? "زۆر نیگەرانم" : "It worries me a lot", p: "emotion" },
        ],
      },
      {
        id: "sleep",
        q: currentLang === "ku"
          ? "خەوتن (تۆ یان منداڵ) چۆن وەسف دەکەیت؟"
          : "How would you describe sleep lately (you or baby)?",
        opts: [
          { text: currentLang === "ku" ? "زۆر شکاوە" : "Very broken", p: "overload" },
          { text: currentLang === "ku" ? "کەمێک باشتر بێت" : "Improving slightly", p: "steady" },
          { text: currentLang === "ku" ? "ڕێکخراوە بەگشتی" : "Mostly workable", p: "steady" },
          { text: currentLang === "ku" ? "سەرەکەکەم ئاوە" : "It weighs on me heavily", p: "emotion" },
        ],
      },
      {
        id: "emo",
        q: currentLang === "ku"
          ? "ئەم دوایانە هەستی متمانەنەوەی زۆر دەکەیت؟"
          : "How often do you feel emotionally overwhelmed?",
        opts: [
          { text: currentLang === "ku" ? "زۆر جار" : "Often", p: "emotion" },
          { text: currentLang === "ku" ? "هەندێک جار" : "Sometimes", p: "overload" },
          { text: currentLang === "ku" ? "کەم" : "Rarely", p: "steady" },
          { text: currentLang === "ku" ? "نازانم — هەموو شت خێرا دەگۆڕێت" : "Unsure — everything shifts fast", p: "practical" },
        ],
      },
      {
        id: "conf",
        q: currentLang === "ku"
          ? "ئاستی دڵنیایی بەخۆت وەک دایک؟"
          : "How is your confidence as a mother right now?",
        opts: [
          { text: currentLang === "ku" ? "لاواز" : "Shaky", p: "emotion" },
          { text: currentLang === "ku" ? "زۆر جار هەڵدەکڵمەوە" : "Up and down", p: "overload" },
          { text: currentLang === "ku" ? "بەهێواشی ڕوون دەکەمەوە" : "Growing slowly", p: "steady" },
          { text: currentLang === "ku" ? "بەتەنیا لە هەندێک بوار" : "Fine in some areas", p: "practical" },
        ],
      },
      {
        id: "support",
        q: currentLang === "ku"
          ? "ژێرخۆی پشتیوانێت چۆنە؟"
          : "What is your support system like?",
        opts: [
          { text: currentLang === "ku" ? "پاڵپشتی ڕاستەقینەم کەمە" : "Limited hands-on support", p: "emotion" },
          { text: currentLang === "ku" ? "هەیە بەڵام دەمەوێت زیاتر بێت" : "Some — I wish for more", p: "overload" },
          { text: currentLang === "ku" ? "باشە" : "Steady enough", p: "steady" },
          { text: currentLang === "ku" ? "زۆر باشە" : "Strong", p: "recovery" },
        ],
      },
      {
        id: "routine",
        q: currentLang === "ku"
          ? "ڕۆتین و ڕیتم چۆنە؟"
          : "How are routine and rhythm going?",
        opts: [
          { text: currentLang === "ku" ? "هێشتا نەورێزە" : "Still messy", p: "practical" },
          { text: currentLang === "ku" ? "هەوڵ دەدەم بنیات بنێم" : "Trying to build one", p: "steady" },
          { text: currentLang === "ku" ? "کار دەکات" : "It mostly works", p: "steady" },
          { text: currentLang === "ku" ? "فشار زۆرە" : "Feels pressured", p: "overload" },
        ],
      },
      {
        id: "recovery",
        q: currentLang === "ku"
          ? "چاکبوونەوەی جەستەت چۆنە؟"
          : "How is your physical recovery feeling?",
        opts: [
          { text: currentLang === "ku" ? "ئازار یان ماندوویی" : "Pain or heavy fatigue", p: "recovery" },
          { text: currentLang === "ku" ? "هەندێک باشبوون" : "Some improvement", p: "recovery" },
          { text: currentLang === "ku" ? "زۆر نازانم" : "I don’t really track it", p: "practical" },
          { text: currentLang === "ku" ? "باشترم" : "Generally okay", p: "steady" },
        ],
      },
      {
        id: "biggest",
        q: currentLang === "ku"
          ? "ئەمڕۆ گەورەتریناریەکەت چییە؟"
          : "What feels like the biggest load today?",
        opts: [
          { text: currentLang === "ku" ? "خەوتن" : "Sleep", p: "overload" },
          { text: currentLang === "ku" ? "خواردنەوە" : "Feeding", p: "practical" },
          { text: currentLang === "ku" ? "هەستەکان" : "Emotions", p: "emotion" },
          { text: currentLang === "ku" ? "جەستە/چاکبوونەوە" : "Body / healing", p: "recovery" },
        ],
      },
      {
        id: "selfcare",
        q: currentLang === "ku"
          ? "بۆخۆت چەند جار بۆ خۆت کات دابنێیت؟"
          : "How often do you get tiny moments for yourself?",
        opts: [
          { text: currentLang === "ku" ? "زۆر کەم" : "Almost never", p: "overload" },
          { text: currentLang === "ku" ? "هەندێک جار" : "Sometimes", p: "emotion" },
          { text: currentLang === "ku" ? "هەوڵ دەدەم" : "I try", p: "steady" },
          { text: currentLang === "ku" ? "بەنیسبەت باش" : "Fairly regular", p: "recovery" },
        ],
      },
    ];
  }

  const QUIZ_RESULTS = {
    overload: {
      en: {
        title: "A season of heavy load",
        going: "You may be carrying exhaustion, fragmented sleep, and the weight of constant responsibility at once.",
        reassure: "This overlap is very common in early motherhood — especially when nights and days blur together.",
        now: ["Rest in micro-windows where you can.", "Lower expectations to one next right action.", "Let someone else hold one small task if possible.", "Name one worry out loud — it often softens alone."],
        week: ["Try a simple feeding/sleep note for patterns, not perfection.", "Protect one short wind-down for you, even five minutes.", "Batch basics: water, snacks, diapers within reach.", "Revisit safe-sleep reminders calmly when tired."],
        help: "If exhaustion feels unshakeable, low mood lasts most days, scary thoughts appear, or you cannot care for yourself or baby safely, please contact a clinician or local urgent line.",
        quote: NOOR_QUOTES[6],
      },
      ku: {
        title: "وەرزێکی بار گران",
        going: "لەوانەیە هەمانکاتدا ماندوویی، خەوتنی تێکشکاو، و قورسی بەرپرسیارێتی هەست بکەیت.",
        reassure: "ئەم تێکەڵبوونە لە سەرەتای دایکایەتیدا زۆر ئاسایە — تایبەت کاتێک شەو و ڕۆژ تێکەڵ دەبن.",
        now: ["لە چرکە کورتەکاندا نەستەمان بکە.", "چاوەڕوانی بکە بۆ یەک هەنگاوی داهاتووی ڕاست.", "ئەگەر دەکرێت یارمەتییەکی بچووک بدەیت بە کەسێک.", "یەک نیگەرانی بە دەنگی بڵند بڵێ — زۆرجار لە تەنیا سوکتر دەبێت."],
        week: ["تێبینییەکی سادە لە خواردنەوە/خەوتن بۆ شێواز، نەک تەواو.", "پارێزگاری لە چرکەیەکی کەم بۆ خۆت، تەنانەت پێنج خولەک.", "ئامادەکاریی سادە: ئاو، خواردن، بەل لە دەستدا.", "بیرهێنانەوەی ئاسایشی خەوتنەوە بە ئارامی کاتێک ماندووایت."],
        help: "ئەگەر ماندوویی ناچارییە، هەستی نزم زۆربەی ڕۆژەکان دەمێنێتەوە، بیرۆکەی ترسناک دەردەکەوێت، یان ناتوانیت بە سەلامەتی خۆت یان منداڵ بپاریت، پەیوەندی بە پزیشک یان هێڵی فریاکەوتنەوە بکە.",
        quote: NOOR_QUOTES[6],
      },
    },
    emotion: {
      en: {
        title: "Big feelings, tender heart",
        going: "You may be experiencing emotional overload, sensitivity, or loneliness — even while loving your baby deeply.",
        reassure: "Crying, doubt, and surges of anxiety can visit good mothers. Feelings are information, not a report card.",
        now: ["Text one trusted person an honest sentence.", "Grounding: notice 3 sounds, 2 touches, 1 slow breath.", "Step away safely for two minutes if overstimulated.", "Use the reassurance cards — they are for you."],
        week: ["Name one boundary that would help (visits, tasks, messages).", "Pair Discover tab’s small wins with your days.", "Consider peer or professional support — you deserve follow-through.", "Keep sleep basics gentle; prioritize your nervous system."],
        help: "If panic, hopelessness, self-harm thoughts, or fear of hurting anyone appears — seek urgent professional help now.",
        quote: NOOR_QUOTES[16],
      },
      ku: {
        title: "هەستە گەورەکان، دڵێکی ناسک",
        going: "لەوانەیە متمانەنەوەی هەستیاری، هەستبڕکی، یان تەنیایی هەست بکەیت — تەنانەت کاتێک بە قووڵی خۆشدەوێت منداڵەکەت.",
        reassure: "گریان، گومان، و نیگەرانی دەتوانن سەر بکەون بە دایکە چاکەکان. هەستەکان زانیارییە، نەک نمرە.",
        now: ["بۆ کەسێکی متمانەپێکراو یەک ڕستەی ڕاست بنێرە.", "ئارامکردنەوە: سێ دەنگ، دوو دەستلێدان، یەک هەناسەی هێواش.", "ئەگەر زۆر هەستکراو بیت، بە سەلامەتی دوو خولەک دوور بکەوە.", "کارتی دڵنیایی بەکاربهێنە — ئەوان بۆ تۆن."],
        week: ["سنوورێک ناو بنێ کە یارمەتی دەدات (سەردان، کار، نامە).", "سەرکەوتنی بچووک لەگەڵ ڕۆژەکانت دابنێ.", "تەماشای پشتگیری هاوتا یان پسپۆڕ بکە — شایستەی بەدواداچوونیت.", "بنچینەکانی خەوتن نەرم بهێڵەرەوە؛ سیستەمی دەماغ ڕەچاو بکە."],
        help: "ئەگەر ترس، نەمەنی، بیرۆکەی زیان پێگەیاندن، یان ترس لە زیانگەیاندن دەردەکەوت — ئێستا یارمەتی پزیشکی بگرە.",
        quote: NOOR_QUOTES[16],
      },
    },
    practical: {
      en: {
        title: "Learning the everyday skills",
        going: "You may be in a practical learning curve — reading cues, feeding rhythms, and daily baby care questions.",
        reassure: "Competence builds through repetition and curiosity, not instant mastery.",
        now: ["Pick one question from Care Tools and follow steps slowly.", "Snapshot: is baby warm, dry, fed recently, needing contact?", "Pause comparison — your baby has their own curve.", "Celebrate one observed cue you understood correctly."],
        week: ["Use Learn tab on newborn basics or feeding in small doses.", "Note one pattern time-of-day that repeats.", "Share load: dishes, laundry, or errands if available.", "Stack soothing basics: sound, sway, skin-to-skin when safe."],
        help: "If baby seems ill, very lethargic, feeding poorly with weight concerns, or breathing looks off — contact your clinician promptly.",
        quote: NOOR_QUOTES[8],
      },
      ku: {
        title: "فێربوونی کارەکانی ڕۆژانە",
        going: "لەوانەیە لە قۆناغی فێربوونی کاربەردەدایت — ئاماژەکان، ڕیتمی خواردنەوە، و پرسیارەکانی چاوەڕوانی ڕۆژانە.",
        reassure: "لێهاتوویی لە دووبارەبوونەوە و سەرنجڕاکێشان دروست دەبێت، نەک لە تەواوبوونی لە یەک چرکەدا.",
        now: ["یەک پرسیار لە ئامرازەکان هەڵبژێرە و هەنگاو بە هەنگاو بپەرە.", "پشکنین: منداڵ گەرمە؟ وشکە؟ لە نزیکدا خواردنەوەی هەیە؟ پێویستی بە پەیوەندییە؟", "بەراوردکردن وەستێنە — منداڵەکەت هێڵی خۆی هەیە.", "یەک ئاماژەی تێگەیشتوو جەژن بکە."],
        week: ["فێربوون بە بەشێکی بچووک دەربارەی نوێزاد یان خواردنەوە.", "کاتێک لە ڕۆژەکەدا دووبارە دەبێتەوە تێبینی بکە.", "بار دابەش بکە ئەگەر دەسەڵات هەیە.", "بنچینەکانی سوککردنەوە: دەنگ، سووینان، پێست بەپێست کاتێک سەلامەتە."],
        help: "ئەگەر منداڵ نەخۆش دەردەکەوێت، زۆر بێهێزە، خواردنەوە زۆر خراپە یان نیگەرانی کێشە، یان هەناسە نەئاسایە — زوو پزیشک ئاگادار بکەوە.",
        quote: NOOR_QUOTES[8],
      },
    },
    recovery: {
      en: {
        title: "Healing is part of the story",
        going: "Your body and energy may still be catching up after birth — tenderness, fatigue, or slower days can sit alongside baby care.",
        reassure: "Recovery is not linear. Gentle pacing and asking for help with tasks are forms of strength.",
        now: ["Rest legs elevated briefly if swelling or aching.", "Hydrate and eat regularly — even small portions.", "Tag one chore someone else can take.", "Note pain changes in one line for appointments if useful."],
        week: ["Discuss ongoing pain or heavy bleeding with your clinician as advised.", "Follow movement and recovery guidance you were given.", "Pair Track with mood/rest to notice trends without judgment.", "Soften expectations for “bouncing back” — you are rebuilding."],
        help: "Fever, worsening pain, heavy bleeding, chest pain, breathing trouble, or thoughts of harm need urgent medical attention.",
        quote: NOOR_QUOTES[11],
      },
      ku: {
        title: "چاکبوونەوە بەشێکە لە چیرۆکەکە",
        going: "لەوانەیە جەستە و وزە هێشتا لە دوای دەربڕینەوە بگەڕێنەوە — نەرمی، ماندوویی، یان ڕۆژە سوکەکان لەگەڵ چاوەڕوانی منداڵدا بن.",
        reassure: "چاکبوونەوە هێڵی ڕاست نییە. ئارام گرتن و داوای یارمەتی بۆ کارەکان هێزە.",
        now: ["ئەگەر ورم یان ئازار هەیە، پێ لووتەکانت بەرز بکە کاتێکی کورت.", "ئاو بخۆرەوە و بە بەردەوامی بیخوە — تەنانەت بە بەشێکی بچووک.", "یەک کار دیاری بکە کە کەسێکی تر بیکات.", "گۆڕانی ئازار تێبینی بکە؛ یەک دێڵ بۆ چاوپێکەوتن ئەگەر یارمەتی کات."],
        week: ["ئازاری بەردەوام یان خوێنبەری قورس بە پزیشک بڵێ وەک ئامۆژگاری.", "ڕێنمایی جوڵە و چاکبوونەوە ڕەچاو بکە.", "تۆمار لەگەڵ هەست/نەستەمانی بەکاربهێنە بۆ شێواز بێ حوکمدان.", "چاوەڕوانی «زوو گەڕانەوە» سوک بکەرەوە — تۆ دووبارە دروست بوونەوەیت."],
        help: "تەبی، ئازاری خراپبوو، خوێنبەری زۆر، ئازاری سنگ، کێشەی هەناسە، یان بیرۆکەی زیان پێویستی بە چاودێری پزیشکی فریاکەوتن هەیە.",
        quote: NOOR_QUOTES[11],
      },
    },
    steady: {
      en: {
        title: "Steady with normal bumps",
        going: "You may be finding a workable rhythm while still meeting familiar challenges — that is still a lot of learning.",
        reassure: "Not every hard moment means something is wrong. Many mothers feel both capable and tired in the same hour.",
        now: ["Keep one anchor in the day (walk, shower, call, tea).", "Notice a win, however small.", "Swap one scroll for one breath of daylight.", "Offer yourself the same patience you offer baby."],
        week: ["Maintain light tracking only if it helps — drop it if it adds stress.", "Add one pleasurable micro-moment daily.", "Review Myth vs Fact when doubts spiral.", "Share wins with your support person."],
        help: "If new persistent anxiety, depression signs, or physical red flags appear, reach out to your care team.",
        quote: NOOR_QUOTES[3],
      },
      ku: {
        title: "جێگیر لەگەڵ کەموکوڕی ئاسایی",
        going: "لەوانەیە ڕیتمێکی کاربەردەت دۆزیبێتەوە لە کاتێکدا هێشتا ئاستەنگ هەیە — ئەمەش فێربوونی زۆرە.",
        reassure: "هەر ساتێکی قورس واتای هەڵە نییە. زۆر دایک لە هەمان کاتدا هەست بە لێهاتوویی و ماندوویی دەکەن.",
        now: ["یەک لنگەر لە ڕۆژدا بهێڵەوە (ڕێڕەو، دووش، پەیوەندی، چا).", "سەرکەوتنێک تێبینی بکە، هەرچەند بچووک بێت.", "یەک جار پشوو لە مۆبایل بۆ یەک هەناسە لە ڕووناکی ڕۆژ.", "بۆ خۆت هەمان ئارامی بدە کە بۆ منداڵ دەدەیت."],
        week: ["تۆماری سوک تەنها ئەگەر یارمەتی دەکات — فەرامۆشی بکە ئەگەر فشار زیاد دەکات.", "ڕۆژانە یەک ساتی سوکت زیاد بکە.", "کاتێک گومان هەڵدەستێت درۆ/ڕاستی بخوێنەوە.", "سەرکەوتنەکان لەگەڵ پاڵپشتی بەش بکە."],
        help: "ئەگەر نیگەرانی یان نیشانەکانی نزمبوونەوەی هەست بەردەوام بوو، یان ئاڵامەتە جەستەیی، پەیوەندی بە تیمەکانی چاوەڕوانییەوە بکە.",
        quote: NOOR_QUOTES[3],
      },
    },
  };

  function quizResultForProfile(profile) {
    const lang = currentLang === "ku" ? "ku" : "en";
    return QUIZ_RESULTS[profile] ? QUIZ_RESULTS[profile][lang] : QUIZ_RESULTS.steady[lang];
  }

  function tallyQuizProfiles(selectedP) {
    const counts = { overload: 0, emotion: 0, practical: 0, recovery: 0, steady: 0 };
    selectedP.forEach(function (p) {
      if (counts[p] != null) counts[p]++;
    });
    let best = "steady";
    let max = -1;
    Object.keys(counts).forEach(function (k) {
      if (counts[k] > max) {
        max = counts[k];
        best = k;
      }
    });
    return best;
  }

  let quizStep = 0;
  let quizPickIndex = [];

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function quizLabel(key, bodyHtml) {
    const ku = {
      on: "چی لەوانەیە ڕووبدات",
      re: "هێنانەوە دڵنیایی",
      now: "ئەمڕۆ چی ئەتوانێت یارمەتی بدات",
      week: "ئەم هەفتەیە چی ئەتوانێت یارمەتی بدات",
      pro: "کاتێک پێویست بە یارمەتی زیاتر هەیە",
    };
    const en = {
      on: "What may be going on",
      re: "Reassurance",
      now: "What may help right now",
      week: "What may help this week",
      pro: "When to seek more help",
    };
    const L = currentLang === "ku" ? ku : en;
    const titles = { on: L.on, re: L.re, now: L.now, week: L.week, pro: L.pro };
    return '<div class="quiz-section"><h5>' + escapeHtml(titles[key]) + "</h5>" + bodyHtml + "</div>";
  }

  function renderQuiz() {
    const root = $("#quizRoot");
    const bar = $("#quizProgressBar");
    const resEl = $("#quizResult");
    if (!root) return;
    const qs = quizQuestions();
    if (quizStep >= qs.length) {
      const profiles = quizPickIndex.map(function (idx, si) {
        return qs[si].opts[idx].p;
      });
      const profile = tallyQuizProfiles(profiles);
      try {
        localStorage.setItem(STORAGE.quizResult, profile);
      } catch (e) {}
      if (bar) bar.style.width = "100%";
      root.innerHTML = "";
      if (resEl) {
        const d = quizResultForProfile(profile);
        const qLine = currentLang === "ku" ? d.quote.ku : d.quote.en;
        resEl.classList.remove("hidden");
        let listNow = "<ul>";
        d.now.forEach(function (x) {
          listNow += "<li>" + escapeHtml(x) + "</li>";
        });
        listNow += "</ul>";
        let listWeek = "<ul>";
        d.week.forEach(function (x) {
          listWeek += "<li>" + escapeHtml(x) + "</li>";
        });
        listWeek += "</ul>";
        resEl.innerHTML =
          '<div class="quiz-result-card result-reveal">' +
          "<h4>" + escapeHtml(d.title) + "</h4>" +
          quizLabel("on", "<p>" + escapeHtml(d.going) + "</p>") +
          quizLabel("re", "<p>" + escapeHtml(d.reassure) + "</p>") +
          quizLabel("now", listNow) +
          quizLabel("week", listWeek) +
          quizLabel("pro", "<p>" + escapeHtml(d.help) + "</p>") +
          '<div class="quiz-section"><p class="quote-nsm" style="border:none;background:transparent;padding:0;font-size:1rem;">‘' +
          escapeHtml(qLine) + "’ — NSM</p></div>" +
          '<button type="button" class="btn secondary mt" id="quizRestartBtn">' + escapeHtml(t("quizRestart")) + "</button></div>";
        $("#quizRestartBtn")?.addEventListener("click", function () {
          quizStep = 0;
          quizPickIndex = [];
          resEl.classList.add("hidden");
          resEl.innerHTML = "";
          delete resEl.dataset.celebrated;
          renderQuiz();
        });
        if (!resEl.dataset.celebrated) {
          celebrateLite();
          resEl.dataset.celebrated = "1";
        }
      }
      renderDashboard();
      return;
    }
    const q = qs[quizStep];
    if (bar) bar.style.width = ((quizStep + 1) / qs.length) * 100 + "%";
    resEl?.classList.add("hidden");
    resEl && (resEl.innerHTML = "");
    let html =
      '<p class="muted small">' + escapeHtml(t("quizIntro")) + "</p>" +
      '<div class="quiz-screen"><p class="quiz-q">' + escapeHtml(q.q) + '</p><div class="quiz-options">';
    q.opts.forEach(function (opt, i) {
      const sel = quizPickIndex[quizStep] === i ? " selected" : "";
      html += '<button type="button" class="quiz-opt' + sel + '" data-i="' + i + '">' + escapeHtml(opt.text) + "</button>";
    });
    html += '</div><div class="quiz-nav">';
    html += '<button type="button" class="btn ghost" id="quizBackBtn"' + (quizStep === 0 ? " disabled" : "") + ">" + escapeHtml(t("quizBack")) + "</button>";
    const last = quizStep === qs.length - 1;
    html += '<button type="button" class="btn primary" id="quizNextBtn">' + escapeHtml(last ? t("quizFinish") : t("quizNext")) + "</button></div></div>";
    root.innerHTML = html;
    root.querySelectorAll(".quiz-opt").forEach(function (b) {
      b.addEventListener("click", function () {
        const i = parseInt(b.getAttribute("data-i"), 10);
        root.querySelectorAll(".quiz-opt").forEach(function (x) {
          x.classList.remove("selected");
        });
        b.classList.add("selected");
        quizPickIndex[quizStep] = i;
      });
    });
    $("#quizBackBtn")?.addEventListener("click", function () {
      if (quizStep > 0) {
        quizStep--;
        renderQuiz();
      }
    });
    $("#quizNextBtn")?.addEventListener("click", function () {
      if (quizPickIndex[quizStep] == null) return;
      quizStep++;
      renderQuiz();
    });
  }

  /* ---------- Check-in ---------- */
  let checkStep = 0;
  let checkData = { needs: [] };

  function renderCheckIn() {
    const el = $("#checkInRoot");
    if (!el) return;
    const steps = [
      { key: "feeling", label: t("checkFeeling"), type: "opts", options: [t("optLow"), t("optOkay"), t("optGood")] },
      { key: "energy", label: t("checkEnergy"), type: "opts", options: [t("optVeryLow"), t("optOkay"), t("optGood")] },
      { key: "sleep", label: t("checkSleep"), type: "opts", options: [t("optPoor"), t("optSome"), t("optBetter")] },
      { key: "supported", label: t("checkSupported"), type: "opts", options: [t("optRarely"), t("optSometimes"), t("optOften")] },
      { key: "hardest", label: t("checkHardest"), type: "opts", options: [t("hardestFeed"), t("hardestSleep"), t("hardestOverwhelm"), t("hardestAlone"), t("hardestRecovery"), t("hardestRoutine")] },
      { key: "stage", label: t("checkBabyStage"), type: "opts", options: [t("stageNewborn"), t("stage13"), t("stage36"), t("stage6p")] },
      {
        key: "needs",
        label: t("checkNeeds"),
        type: "multi",
        needKeys: ["needRest", "needReassure", "needBabyCare", "needFeed", "needSleep", "needEmotional", "needRoutine"],
      },
    ];
    if (checkStep >= steps.length) {
      try {
        localStorage.setItem(STORAGE.checkIn, JSON.stringify(checkData));
      } catch (e) {}
      const guide = checkSuggest(checkData);
      el.innerHTML =
        '<div class="check-result"><h4>' + escapeHtml(currentLang === "ku" ? "ڕێنمایی نەرم" : "Gentle next steps") + "</h4><p>" +
        escapeHtml(guide.text) + '</p><ul>' + guide.links.map(function (l) {
          return "<li>" + escapeHtml(l) + "</li>";
        }).join("") + '</ul><button type="button" class="btn ghost sm mt" id="checkReset">' +
        escapeHtml(currentLang === "ku" ? "دووبارەکردنەوە" : "Start over") + "</button></div>";
      $("#checkReset")?.addEventListener("click", function () {
        checkStep = 0;
        checkData = { needs: [] };
        renderCheckIn();
      });
      renderDashboard();
      return;
    }
    const s = steps[checkStep];
    let body = '<div class="check-step"><label>' + escapeHtml(s.label) + "</label>";
    if (s.type === "opts") {
      body += '<div class="option-grid">';
      s.options.forEach(function (opt) {
        const on = checkData[s.key] === opt ? " selected" : "";
        body += '<button type="button" class="option-btn' + on + '" data-v="' + escapeHtml(opt) + '">' + escapeHtml(opt) + "</button>";
      });
      body += "</div></div>";
    } else {
      body += '<div class="option-grid">';
      s.needKeys.forEach(function (nk) {
        const lab = t(nk);
        const has = (checkData.needs || []).indexOf(nk) >= 0;
        const on = has ? " selected" : "";
        body += '<button type="button" class="option-btn' + on + '" data-need="' + nk + '">' + escapeHtml(lab) + "</button>";
      });
      body += "</div></div>";
    }
    body += '<div class="check-actions">';
    if (checkStep > 0) {
      body += '<button type="button" class="btn ghost" id="checkBackBtn">' + escapeHtml(t("checkBack")) + "</button>";
    }
    body += '<button type="button" class="btn primary" id="checkFwdBtn">' + (checkStep === steps.length - 1 ? escapeHtml(t("checkFinish")) : escapeHtml(checkStep === 0 ? t("checkStart") : t("checkNext"))) + "</button></div>";
    el.innerHTML = body;
    el.querySelectorAll(".option-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        if (s.type === "opts") {
          const v = b.getAttribute("data-v");
          checkData[s.key] = v;
          el.querySelectorAll(".option-btn").forEach(function (x) {
            x.classList.remove("selected");
          });
          b.classList.add("selected");
        } else {
          const n = b.getAttribute("data-need");
          checkData.needs = checkData.needs || [];
          const i = checkData.needs.indexOf(n);
          if (i >= 0) {
            checkData.needs.splice(i, 1);
            b.classList.remove("selected");
          } else {
            checkData.needs.push(n);
            b.classList.add("selected");
          }
        }
      });
    });
    $("#checkBackBtn")?.addEventListener("click", function () {
      if (checkStep > 0) checkStep--;
      renderCheckIn();
    });
    $("#checkFwdBtn")?.addEventListener("click", function () {
      if (s.type === "opts" && !checkData[s.key]) return;
      if (s.type === "multi" && (!checkData.needs || !checkData.needs.length)) return;
      checkStep++;
      renderCheckIn();
    });
  }

  function checkSuggest(d) {
    const en = currentLang === "en";
    const links = [];
    let text = "";
    function hasNeed(code) {
      return d.needs && d.needs.indexOf(code) >= 0;
    }
    function legacyHas(tr) {
      return d.needs && d.needs.indexOf(tr) >= 0;
    }
    if (
      hasNeed("needFeed") ||
      legacyHas(t("needFeed")) ||
      (d.hardest && d.hardest === t("hardestFeed"))
    ) {
      links.push(en ? "Care Tools → Feeding helper" : "ئامرازەکان → یارمەتی خواردنەوە");
    }
    if (
      hasNeed("needSleep") ||
      legacyHas(t("needSleep")) ||
      (d.hardest && d.hardest === t("hardestSleep"))
    ) {
      links.push(en ? "Care Tools → Sleep support + Learn → Sleep" : "ئامرازەکان → خەوتن + فێربوون → خەوتن");
    }
    if (
      hasNeed("needEmotional") ||
      legacyHas(t("needEmotional")) ||
      (d.hardest && d.hardest === t("hardestOverwhelm"))
    ) {
      links.push(en ? "Learn → Emotional wellbeing + Care reassurance cards" : "فێربوون → تەندروستی هەستیاری + کارتی دڵنیایی");
    }
    if (hasNeed("needRest") || legacyHas(t("needRest"))) {
      links.push(en ? "Track rest + Discover small wins" : "تۆمار + دۆزینەوە");
    }
    if (!links.length) {
      links.push(en ? "Learn library (pick one short section)" : "فێربوون — یەک بەشی کورت");
    }
    text = en
      ? "Based on your check-in, lean toward what you named — in tiny steps, without rushing yourself."
      : "پشت بەم هەست و پێداچوونەوە ببەستە — بە هەنگاوێکی بچووک، بێ پەلەپەلە کردن.";
    return { text: text, links: links };
  }

  function renderDashboard() {
    const el = $("#supportDashboard");
    if (!el) return;
    let raw;
    try {
      raw = localStorage.getItem(STORAGE.checkIn);
    } catch (e) {}
    let quizP;
    try {
      quizP = localStorage.getItem(STORAGE.quizResult);
    } catch (e) {}
    if (!raw) {
      el.innerHTML = '<p class="dashboard-placeholder">' + escapeHtml(t("dashEmpty")) + "</p>";
      return;
    }
    let d;
    try {
      d = JSON.parse(raw);
    } catch (e) {
      el.innerHTML = '<p class="dashboard-placeholder">' + escapeHtml(t("dashEmpty")) + "</p>";
      return;
    }
    let h = '<p class="small muted">' + escapeHtml(t("dashLast")) + "</p>";
    h += '<p><span class="dashboard-pill">' + escapeHtml(t("dashEnergy")) + ": " + escapeHtml(d.energy || "—") + "</span>";
    h += '<span class="dashboard-pill">' + escapeHtml(t("dashSleep")) + ": " + escapeHtml(d.sleep || "—") + "</span>";
    h += '<span class="dashboard-pill">' + escapeHtml(t("dashSupport")) + ": " + escapeHtml(d.supported || "—") + "</span></p>";
    h += "<p><strong>" + escapeHtml(t("dashHardest")) + ":</strong> " + escapeHtml(d.hardest || "—") + "</p>";
    h += "<p><strong>" + escapeHtml(t("dashStage")) + ":</strong> " + escapeHtml(d.stage || "—") + "</p>";
    if (quizP && QUIZ_RESULTS[quizP]) {
      const title = quizResultForProfile(quizP).title;
      h += '<p class="small"><strong>' + (currentLang === "ku" ? "دوایین تێست" : "Latest quiz tone") + ":</strong> " + escapeHtml(title) + "</p>";
    }
    h += "<p><strong>" + escapeHtml(t("dashSuggest")) + ":</strong></p>";
    h += '<button type="button" class="btn secondary sm pathway-mini" data-go="learn">' + escapeHtml(t("goLearn")) + "</button> ";
    h += '<button type="button" class="btn secondary sm pathway-mini" data-go="care">' + escapeHtml(t("goCare")) + "</button> ";
    h += '<button type="button" class="btn secondary sm pathway-mini" data-go="track">' + escapeHtml(t("goTrack")) + "</button>";
    el.innerHTML = h;
    el.querySelectorAll(".pathway-mini").forEach(function (b) {
      b.addEventListener("click", function () {
        switchTab(b.getAttribute("data-go"));
      });
    });
  }

  function renderGuidanceCards() {
    const el = $("#guidanceCards");
    if (!el) return;
    el.innerHTML =
      '<div class="guidance-card"><strong>' + escapeHtml(t("guidance1t")) + "</strong>" + escapeHtml(t("guidance1")) + "</div>" +
      '<div class="guidance-card"><strong>' + escapeHtml(t("guidance2t")) + "</strong>" + escapeHtml(t("guidance2")) + "</div>" +
      '<div class="guidance-card"><strong>' + escapeHtml(t("guidance3t")) + "</strong>" + escapeHtml(t("guidance3")) + "</div>";
  }

  /* ---------- Learn ---------- */
  let learnTopic = "newborn";

  const LEARN_TOPICS = [
    { id: "newborn", en: "Newborn basics", ku: "بنچینەکانی نوێزاد" },
    { id: "feeding", en: "Feeding support", ku: "پشتگیری خواردنەوە" },
    { id: "sleep", en: "Sleep & routine", ku: "خەوتن و ڕۆتین" },
    { id: "recovery", en: "Mother recovery", ku: "چاکبوونەوەی دایک" },
    { id: "emotional", en: "Emotional wellbeing", ku: "تەندروستی هەستیاری" },
    { id: "growth", en: "Baby growth stages", ku: "قۆناغەکانی گەشە" },
    { id: "myth", en: "Myth vs fact", ku: "درۆ و ڕاستی" },
  ];

  function learnBlock(enTit, kuTit, paras) {
    const title = currentLang === "ku" ? kuTit : enTit;
    let h = '<div class="learn-accordion"><button type="button" class="learn-acc-head" aria-expanded="false">';
    h += '<span>' + escapeHtml(title) + '</span><span class="learn-acc-icon">▾</span></button><div class="learn-acc-panel" hidden>';
    paras.forEach(function (p) {
      const head = currentLang === "ku" ? p.kh : p.eh;
      const body = currentLang === "ku" ? p.kb : p.eb;
      if (head) h += "<h4>" + escapeHtml(head) + "</h4>";
      h += "<p>" + escapeHtml(body) + "</p>";
    });
    h += "</div></div>";
    return h;
  }

  function learnContentNewborn() {
    return (
      learnBlock("Crying & soothing", "گریان و ئارامکردنەوە", [
        { eh: "What this means", kh: "واتای چییە", eb: "Crying is your baby’s clearest early language — hunger, discomfort, tiredness, or need for closeness can look similar at first.", kb: "گریان زمانی سەرەتایی منداڵە — برسێتی، نارەحەتی، ماندوویی، یان پێویستی بە نزیکی لە سەرەتادا دەتوانن هاوشێوە دەربکەون." },
        { eh: "What may help", kh: "چی ئەتوانێت یارمەتی بدات", eb: "Try feeding check, diaper check, slower rocking, lower stimulation, skin-to-skin if safe.", kb: "پشکنینی خواردنەوە، گۆڕینی بەل، سووینانی هێواش، کەمکردنەوەی هیجان، پێست بەپێست کاتێک سەلامەتە." },
      ]) +
      learnBlock("Feeding basics", "بنچینەکانی خواردنەوە", [
        { eh: "Key takeaway", kh: "کورتەی گرنگ", eb: "Watch for early hunger cues before crying escalates; pace feeds; burp gently.", kb: "ئاماژەی برسێتی پێش توندبوونی گریان؛ خواردنەوەی ئارام؛ بەوردی بەوردی." },
      ]) +
      learnBlock("Diapers & hygiene", "بەل و پایە", [
        { eb: "Change often, clean gently, allow skin to dry; reach out if rashes persist or baby seems unwell.", kb: "زۆرجار بگۆڕە، بە نەرمی پاك بکەوە؛ ئەگەر تووشبوون درێژە کەێشێت پزیشک ڕەچاو بکە." },
      ])
    );
  }

  function learnPanelsHtml(id) {
    if (id === "newborn") return learnContentNewborn();
    if (id === "feeding") {
      return (
        learnBlock("Breastfeeding basics", "بنچینەکانی شیردان", [
          { eb: "Comfortable positioning, deep latch when possible, feed on cue, hydrate yourself.", kb: "جێگیری ئاسان، لکاندنی قووڵ ئەگەر دەکرێت، خواردنەوە بەپێی پێویست، ئاو بۆ خۆت." },
        ]) +
        learnBlock("Formula & mixed feeding", "شیر خشتو و تێکەڵ", [
          { eb: "Sterile preparation as instructed, paced bottle holding, no shame in chosen path.", kb: "ئامادەکردنی پاک وەک ڕێنمایی، شووشەی ئارام، هەڵبژاردنەکەت شەرمەزار ناکرێت." },
        ]) +
        learnBlock("Signs of fullness", "نیشانەکانی پڕبوون", [
          { eb: "Relaxed hands, turning away, slower sucking — patterns vary by baby.", kb: "دەست ئارام، دوورکەوتنەوە، موچەک هێواتر — هەر منداڵێکی جیایە." },
        ])
      );
    }
    if (id === "sleep") {
      return (
        learnBlock("Newborn sleep patterns", "شێوازی خەوتنی نوێزاد", [
          { eb: "Short cycles are normal; day/night sorting takes weeks.", kb: "خەون کورت ئاسایە؛ جیاکردنەوەی شەو/ڕۆژ کات دەوێت." },
        ]) +
        learnBlock("Safe sleep", "خەوتنەوە بە سەلامەتی", [
          { eb: "Firm flat surface, alone space, smoke-free — follow local health guidance.", kb: "سەرفەیات توند، شوێنی تەنیشت بێ دوخان — ڕێنمایی تەندروستی جێبەجێ بکە." },
        ]) +
        learnBlock("Mother sleep survival", "مانەوەی خەوتنی دایک", [
          { eb: "Sleep when you can, tag-team if possible, dim lights for night feeds.", kb: "خە بخە کاتێک دەکرێت، ئەگەر هەبوو هاوبەش، تاریکی هێنا بۆ خواردنەوەی شەو." },
        ])
      );
    }
    if (id === "recovery") {
      return (
        learnBlock("Postpartum healing", "چاکبوونەوەی دوای دەربڕین", [
          { eb: "Bleeding changes, tenderness, fatigue — gentleness with your pace.", kb: "گۆڕانکاری خوێن، نەرمی، ماندوویی — ئارامی لەگەڵ خێرایی خۆت." },
        ]) +
        learnBlock("Asking for help", "داوای یارمەتی", [
          { eb: "Concrete requests beat vague “I’m fine” — people often want to help.", kb: "داوای ڕوون لە هەستی گشتی «باشم» باشترە — زۆر کەس دەینەوێت یارمەتی بدات." },
        ])
      );
    }
    if (id === "emotional") {
      return (
        learnBlock("Overwhelm & guilt", "متمانەنەوە و تاوانبارکردنی خۆت", [
          { eb: "Guilt often appears when you care deeply; it is not proof you failed.", kb: "تاوانبارکردن زۆرجار کاتێک دەرکەوێت کە زۆر گرنگیت بدەیت؛ بەڵگەی شکست نییە." },
        ]) +
        learnBlock("Loneliness", "تەنیایی", [
          { eb: "Connection can be small: voice note, online group, one neighbor.", kb: "پەیوەندی دەتوانێت بچووک بێت: دەنگ، گرووپ، دراوسێ." },
        ])
      );
    }
    if (id === "growth") {
      return (
        learnBlock("Stages overview", "پوختەی قۆناغەکان", [
          { eb: "Newborn: lots of contact; 1–3 mo: more alert; 3–6: rolling prep; 6+: solids conversation with clinician.", kb: "نوێزاد: پەیوەندی زۆر؛ ١–٣ مانگ: ئاگاداری؛ ٣–٦: ئامادەیی جوڵە؛ ٦+: خواردنی تەواو لەگەڵ پزیشک." },
        ])
      );
    }
    return (
      learnBlock("Myth vs fact", "درۆ و ڕاستی", [
        { eh: "Myth", kh: "درۆ", eb: "“Spoiling” a young baby with holding.", kb: "«زیاد لەپەر» لەگەڵی گرتنی نوێزاد." },
        { eh: "Fact", kh: "ڕاستی", eb: "Responsive care builds safety; you cannot spoil a newborn with love.", kb: "چاوەڕوانی هەستکەر ئاسایشی دروست دەکات؛ خۆشەویستی نوێزاد «زیاد» ناکات." },
      ]) +
      learnBlock("Sleep myths", "درۆکانی خەوتن", [
        { eb: "Myth: baby must sleep through immediately. Fact: development unfolds gradually.", kb: "درۆ: دەبێت زوو بە یەکجار بخەوێت. ڕاستی: گەشە بە هێواشی دەچێت." },
      ])
    );
  }

  function renderLearn() {
    const nav = $("#learnTopicNav");
    const body = $("#learnContent");
    if (!nav || !body) return;
    let nh = "";
    LEARN_TOPICS.forEach(function (topic) {
      const lab = currentLang === "ku" ? topic.ku : topic.en;
      nh += '<button type="button" class="learn-tab' + (learnTopic === topic.id ? " active" : "") + '" data-lt="' + topic.id + '">' + escapeHtml(lab) + "</button>";
    });
    nav.innerHTML = '<p class="muted small" style="width:100%;margin:0 0 0.5rem;">' + escapeHtml(t("learnPickTopic")) + "</p>" + nh;
    nav.querySelectorAll(".learn-tab").forEach(function (b) {
      b.addEventListener("click", function () {
        learnTopic = b.getAttribute("data-lt");
        renderLearn();
      });
    });
    body.innerHTML = learnPanelsHtml(learnTopic);
    body.querySelectorAll(".learn-acc-head").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        const next = !expanded;
        btn.setAttribute("aria-expanded", next ? "true" : "false");
        const panel = btn.nextElementSibling;
        if (panel) panel.hidden = !next;
      });
    });
  }

  /* ---------- Care tools ---------- */
  const NOW_SCENARIOS = [
    {
      id: "cry",
      en: "Baby crying",
      ku: "منداڵ دەگریێت",
      stepsEn: ["Run quick basics: hunger, diaper, temperature comfort.", "Lower stimulation — dim light, slow voice.", "Offer skin-to-skin if safe and you are able.", "If escalating and you feel shaky, place baby safely and step away 1–2 minutes to breathe."],
      stepsKu: ["بنچینە: برسێتی، بەل، گەرمی.", "کەمکردنەوەی هیجان — ڕووناکی کەم، دەنگی هێواش.", "پێست بەپێست ئەگەر سەلامەتە.", "ئەگەر توندوتیژ بوو و تۆش لەرزوت گرت، بە سەلامەتی منداڵ دابنێ و ١–٢ خولەک هەناسە."],
    },
    {
      id: "sleep",
      en: "Baby won’t sleep",
      ku: "منداڵ ناخەوێت",
      stepsEn: ["Check awake time — sometimes babies need help winding down.", "Darken room, white noise low, slow pat.", "Avoid overtired spiral: earlier nap attempt tomorrow if today was rough.", "Safe sleep surface non-negotiable."],
      stepsKu: ["کاتی بیداری بەربڵاو بکەوە؛ لەوانەیە پێویستی بە هێواشبوونەوە بێت.", "تاریک، دەنگی نەرم، سوکبوونەوە.", "خە نزمتر هەوڵ بدە ئەگەر ئەمڕۆ قورس بوو.", "خەوتنەوە لەسەر ژێرمە سەلامەت نابەزیێت."],
    },
    {
      id: "over",
      en: "I feel overwhelmed",
      ku: "متمانەنەوەم زۆرە",
      stepsEn: ["Name it aloud once — “this is a lot.”", "Two minutes of water + shoulder rolls.", "Text one sentence for support.", "Shrink goal to next 20 minutes only."],
      stepsKu: ["یەک جار بڵێ «ئەمە زۆرە».", "دوو خولەک ئاو + جوڵەی شان.", "یەک ڕستە بۆ پشتگیری.", "ئامانج تەنها ٢٠ خولەکی داهاتوو."],
    },
    {
      id: "feed",
      en: "Feeding feels hard",
      ku: "خواردنەوە قورسە",
      stepsEn: ["Comfort latch/position; pause if distressed.", "Small cluster feeds okay in early weeks.", "Track one side/time pattern to discuss with clinician if worries continue.", "Hydrate yourself."],
      stepsKu: ["جێگیری لکاندن؛ ڕاوەستە ئەگەر ناڕەحەتە.", "زنجیرەی خواردنەوەی بچووک لە هەفتەی سەرەتادا ئاساییە.", "شێوازێک تێبینی بکە بۆ گفتوگۆ لەگەڵ پزیشک.", "ئاو بۆ خۆت."],
    },
    {
      id: "tired",
      en: "I am exhausted",
      ku: "زۆر ماندووم",
      stepsEn: ["Micro-rest now: eyes closed 3 minutes.", "Swap one non-urgent task.", "Ask for specific help: “hold baby while I shower.”", "If unsafe sleepiness while holding baby — set baby down safely first."],
      stepsKu: ["ئێستا ٣ خولەک دابخە.", "یەک کار کە کتوپڕ نییە دابخە.", "یارمەتی دیاری: «منداڵ بگرە کاتێک دووش دەکەم».", "ئەگەر ماندوویی ناڕەحەت لەگەڵ مانداڵدا — یەکەم جار منداڵ بە سەلامەتی دابنێ."],
    },
    {
      id: "alone",
      en: "I feel alone",
      ku: "تەنیام",
      stepsEn: ["One honest voice note to someone safe.", "Online community at your comfort level.", "Care Tools reassurance deck.", "Professional support is allowed early."],
      stepsKu: ["یەک دەنگنامە بە کەسێکی سەلامەت.", "کۆمەڵگای ئۆنلاین ئەگەر بۆت باشەدا.", "کارتی دڵنیایی.", "پشتگیری پسپۆڕ لە سەرەتا ڕێگەپێدراوە."],
    },
    {
      id: "clue",
      en: "I don’t know what baby needs",
      ku: "نازانم منداڵ چی پێویستی هەیە",
      stepsEn: ["HALO check: hungry, anxious, lonely, overstimulated, other discomfort.", "Offer feed if due; fresh diaper; reduce noise.", "If crying peaks, pacing outside room briefly with another adult helps some families.", "Trust learning curve — you are not failing to read a manual that does not exist."],
      stepsKu: ["پشکنینی خێرا: برسێتی، نیگەرانی، تەنیایی، هیجان، نارەحەتی تر.", "خواردنەوە ئەگەر کاتی هات؛ بەل؛ کەمکردنەوەی دەنگ.", "ئەگەر دەگریان توندبوو، هەندێک خێزان لەگەڵ کەسی تر ساتێک دوور دەبنەوە.", "متمانە بە فێربوون — دەستەوەنامەی تەواو نییە."],
    },
  ];

  function renderToolNow() {
    const root = $("#toolNowRoot");
    if (!root) return;
    let html = '<p class="muted small">' + escapeHtml(t("toolPick")) + '</p><div class="option-grid">';
    NOW_SCENARIOS.forEach(function (s) {
      html += '<button type="button" class="option-btn tool-now" data-id="' + s.id + '">' + escapeHtml(currentLang === "ku" ? s.ku : s.en) + "</button>";
    });
    html += '</div><div id="toolNowOut" class="pathway-result hidden"></div>';
    root.innerHTML = html;
    const out = $("#toolNowOut");
    root.querySelectorAll(".tool-now").forEach(function (b) {
      b.addEventListener("click", function () {
        const id = b.getAttribute("data-id");
        let s = null;
        for (let i = 0; i < NOW_SCENARIOS.length; i++) {
          if (NOW_SCENARIOS[i].id === id) {
            s = NOW_SCENARIOS[i];
            break;
          }
        }
        if (!s || !out) return;
        const steps = currentLang === "ku" ? s.stepsKu : s.stepsEn;
        out.classList.remove("hidden");
        out.innerHTML = "<strong>" + escapeHtml(t("toolSteps")) + "</strong><ol class=\"tool-steps\">" + steps.map(function (st) {
          return "<li>" + escapeHtml(st) + "</li>";
        }).join("") + "</ol>";
      });
    });
  }

  function renderToolFeedSleep() {
    const fr = $("#toolFeedRoot");
    const sr = $("#toolSleepRoot");
    if (fr) {
      const tipsEn = ["Early cues: rooting, hands to mouth.", "Paced feeding reduces guzzling.", "Burp mid-feed if fussy."];
      const tipsKu = ["ئاماژەی سەرەتا: گەڕان، دەست بۆ دەموچاو.", "خواردنەوەی ئارام.", "بەوردی ناو نیوە ئەگەر نارەحەتە."];
      const tlist = currentLang === "ku" ? tipsKu : tipsEn;
      fr.innerHTML =
        "<p class=\"muted small\">" + escapeHtml(t("feedPick")) + "</p><ul class=\"tool-steps\" style=\"list-style:disc;padding-left:1.2rem;\">" +
          tlist.map(function (x) {
            return "<li>" + escapeHtml(x) + "</li>";
          }).join("") + "</ul>";
    }
    if (sr) {
      const tipsEn = ["Shorter awake windows often help younger babies wind down.", "Same rough bedtime sequence most nights.", "Morning light supports day/night sorting."];
      const tipsKu = ["کاتە کورتی بیداری زیاتر یارمەتی ئارامبوونەوە دەدات.", "ڕیزبەندی شەو هاوشێوە.", "ڕووناکی بەیانی ڕۆژ و شەو ڕوون دەکاتەوە."];
      const tlist = currentLang === "ku" ? tipsKu : tipsEn;
      sr.innerHTML =
        "<p class=\"muted small\">" + escapeHtml(t("sleepPick")) + "</p><ul class=\"tool-steps\" style=\"list-style:disc;\">" +
          tlist.map(function (x) {
            return "<li>" + escapeHtml(x) + "</li>";
          }).join("") + "</ul>";
    }
  }

  const REASSURE = [
    { en: "You are doing more than you think.", ku: "زیاتر دەکەیت لەوەی بیر دەکەیتەوە." },
    { en: "Learning your baby takes time.", ku: "فێربوونی منداڵەکە کات دەوێت." },
    { en: "Rest is also part of caring.", ku: "نەستەمانیش بەشی چاوەڕوانییە." },
    { en: "It is okay to need help — it is human.", ku: "پێویستی بە یارمەتی دروستە." },
    { en: "Small tries still count.", ku: "هەوڵی بچووکیش ژماردە." },
  ];

  function renderReassure() {
    const el = $("#reassureCards");
    if (!el) return;
    el.innerHTML = REASSURE.map(function (r, i) {
      const txt = currentLang === "ku" ? r.ku : r.en;
      return '<button type="button" class="reassure-card" data-i="' + i + '">' + escapeHtml(txt) + "</button>";
    }).join("");
  }

  function renderPathway() {
    const root = $("#pathwayRoot");
    if (!root) return;
    const items = [
      { k: "calm", tab: "care", noteEn: "Use “What do I do now?” + reassurance cards.", noteKu: "«ئێستا چ بکەم؟» + کارتی دڵنیایی." },
      { k: "feed", tab: "care", noteEn: "Feeding helper + Learn → Feeding.", noteKu: "یارمەتی خواردنەوە + فێربوون." },
      { k: "sleep", tab: "care", noteEn: "Sleep support + Learn → Sleep.", noteKu: "پشتگیری خەوتن + فێربوون." },
      { k: "baby", tab: "learn", noteEn: "Learn → Newborn basics.", noteKu: "فێربوون → نوێزاد." },
      { k: "emo", tab: "learn", noteEn: "Learn → Emotional wellbeing + Track mood.", noteKu: "فێربوون → هەستیاری + تۆمار." },
      { k: "routine", tab: "learn", noteEn: "Learn → Sleep & routine.", noteKu: "فێربوون → ڕۆتین." },
    ];
    let html = '<div class="pathway-chips">';
    items.forEach(function (it) {
      const label = t("pathway" + it.k.charAt(0).toUpperCase() + it.k.slice(1));
      html += '<button type="button" class="pathway-chip" data-tab="' + it.tab + '" data-note="' + escapeHtml(currentLang === "ku" ? it.noteKu : it.noteEn) + '">' + escapeHtml(label) + "</button>";
    });
    html += '</div><div id="pathwayOut" class="pathway-result hidden"></div>';
    root.innerHTML = html;
    root.querySelectorAll(".pathway-chip").forEach(function (b) {
      b.addEventListener("click", function () {
        const note = b.getAttribute("data-note");
        const tab = b.getAttribute("data-tab");
        root.querySelectorAll(".pathway-chip").forEach(function (c) {
          c.classList.remove("active");
        });
        b.classList.add("active");
        const out = $("#pathwayOut");
        if (out) {
          out.classList.remove("hidden");
          out.innerHTML = escapeHtml(note) + ' <button type="button" class="btn sm primary" id="pathGoTab">' + escapeHtml(currentLang === "ku" ? "بچۆ بۆ بەش" : "Go to tab") + "</button>";
          const go = $("#pathGoTab");
          if (go) {
            go.onclick = function () {
              switchTab(tab);
            };
          }
        }
      });
    });
  }

  function renderCareTools() {
    renderToolNow();
    renderToolFeedSleep();
    renderReassure();
    renderPathway();
  }

  /* ---------- Track ---------- */
  function loadLogs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE.logs) || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveLogs(arr) {
    try {
      localStorage.setItem(STORAGE.logs, JSON.stringify(arr));
    } catch (e) {}
  }

  function renderTrack() {
    const form = $("#trackForm");
    if (form) {
      form.innerHTML =
        '<div class="field"><label for="mood">' + escapeHtml(t("mood")) + '</label><input type="number" id="mood" min="1" max="5" value="3"></div>' +
        '<div class="field"><label for="elog">' + escapeHtml(t("energyLog")) + '</label><input type="number" id="elog" min="1" max="5" value="3"></div>' +
        '<div class="field"><label for="rlog">' + escapeHtml(t("restLog")) + '</label><input type="number" id="rlog" min="1" max="5" value="3"></div>' +
        '<div class="field"><label for="ftime">' + escapeHtml(t("feedTime")) + '</label><input type="time" id="ftime"></div>' +
        '<div class="field"><label for="snote">' + escapeHtml(t("sleepBaby")) + '</label><input type="text" id="snote" placeholder="…"></div>' +
        '<div class="field"><label for="dcount">' + escapeHtml(t("diaper")) + '</label><input type="number" id="dcount" min="0" value="0"></div>' +
        '<div class="field"><label for="nnotes">' + escapeHtml(t("notes")) + '</label><textarea id="nnotes"></textarea></div>';
    }
    const saveBtn = $("#saveLog");
    saveBtn.onclick = function () {
      const entry = {
        date: new Date().toISOString().slice(0, 10),
        mood: +$("#mood").value || 3,
        energy: +$("#elog").value || 3,
        rest: +$("#rlog").value || 3,
        feed: $("#ftime").value || "",
        sleepNote: $("#snote").value || "",
        diaper: +$("#dcount").value || 0,
        notes: $("#nnotes").value || "",
      };
      const logs = loadLogs();
      logs.unshift(entry);
      saveLogs(logs.slice(0, 60));
      alert(t("trackSaved"));
      renderTrack();
    };

    const logs = loadLogs();
    const sum = $("#trackSummary");
    if (sum) {
      if (!logs.length) {
        sum.innerHTML = '<p class="muted">' + escapeHtml(t("noLogs")) + "</p>";
      } else {
        const last7 = logs.slice(0, 7);
        const avg = function (key) {
          const a = last7.map(function (l) {
            return l[key];
          }).filter(function (n) {
            return typeof n === "number";
          });
          if (!a.length) return "—";
          return (a.reduce(function (s, x) {
            return s + x;
          }, 0) / a.length).toFixed(1);
        };
        sum.innerHTML =
          '<div class="summary-stats">' +
          '<div class="stat-pill"><strong>' + avg("mood") + '</strong><span>' + escapeHtml(t("mood")) + '</span></div>' +
          '<div class="stat-pill"><strong>' + avg("energy") + '</strong><span>' + escapeHtml(t("energyLog")) + '</span></div>' +
          '<div class="stat-pill"><strong>' + avg("rest") + '</strong><span>' + escapeHtml(t("restLog")) + '</span></div></div>';
      }
    }
    const ins = $("#trackInsights");
    if (ins) {
      ins.innerHTML = "";
      if (logs.length >= 3) {
        const en = currentLang === "en";
        if (logs[0].rest < logs[1].rest && logs[0].mood < logs[1].mood) {
          ins.innerHTML += '<div class="insight-item">' + escapeHtml(en ? "Mood may dip on lower-rest days — consider a protected rest window." : "کاتێک نەستەمانی کەمترە هەست بە نزمبوونەوە — پارێزراوی نەستەمان هەوڵ بدە.") + "</div>";
        }
        ins.innerHTML += '<div class="insight-item">' + escapeHtml(en ? "Feeding times clustering can mean emerging rhythms — observe gently." : "کۆبوونەوەی کاتی خواردنەوە دەتوانێت شێوازێ نوێ بێت — بە ئارامی چاودێری بکە.") + "</div>";
      } else {
        ins.innerHTML = '<div class="insight-item">' + escapeHtml(t("insightGeneric")) + "</div>";
      }
    }
    const hist = $("#trackHistory");
    if (hist) {
      if (!logs.length) hist.innerHTML = '<p class="muted">' + escapeHtml(t("noLogs")) + "</p>";
      else {
        hist.innerHTML = logs
          .slice(0, 14)
          .map(function (l) {
            return (
              '<div class="history-entry"><time>' +
              escapeHtml(l.date) +
              "</time><br>" +
              escapeHtml([t("mood") + ": " + l.mood, t("energyLog") + ": " + l.energy, t("diaper") + ": " + l.diaper].join(" · ")) +
              (l.notes ? "<br>" + escapeHtml(l.notes) : "") +
              "</div>"
            );
          })
          .join("");
      }
    }
  }

  /* ---------- Discover ---------- */
  const DAILY_TIPS = [
    { en: "One glass of water before your next task is quietly radical self-care.", ku: "یەک پەرداخ ئاو پێش کارەکەی داهاتوو، چاوەڕوانی ناسکە بۆ خۆت." },
    { en: "Five minutes of sunlight can reset your clock a little.", ku: "پێنج خولەک ڕووناکی ڕۆژ دەتوانێت کاتژمێرەکەت هێواش بگۆڕێت." },
    { en: "Your baby does not need a perfect parent — they need a present one.", ku: "منداڵ دایکی تەواو ناوێت — دایکی ئامادە دەخوازێت." },
  ];

  function renderDiscover() {
    let idx = 0;
    try {
      idx = parseInt(localStorage.getItem(STORAGE.dailyTipIdx) || "0", 10) || 0;
    } catch (e) {}
    const tip = $("#dailyTip");
    if (tip) {
      const row = DAILY_TIPS[idx % DAILY_TIPS.length];
      tip.textContent = currentLang === "ku" ? row.ku : row.en;
    }
    const rd = $("#refreshDaily");
    if (rd && !rd.dataset.bound) {
      rd.dataset.bound = "1";
      rd.addEventListener("click", function () {
        try {
          let i = parseInt(localStorage.getItem(STORAGE.dailyTipIdx) || "0", 10) || 0;
          i++;
          localStorage.setItem(STORAGE.dailyTipIdx, String(i));
        } catch (e) {}
        renderDiscover();
      });
    }
    const wins = $("#smallWinsList");
    if (wins) {
      const w = currentLang === "ku"
        ? ["خواردنەوەی ئاو", "یەک پشوو", "یەک سات بە منداڵ بەبێ مۆبایل", "یەک دەنگی ئارام لەگەڵ خۆت"]
        : ["You hydrated", "You rested briefly", "One phone-free minute with baby", "One gentle word to yourself"];
      wins.innerHTML = w.map(function (x) {
        return "<li>" + escapeHtml(x) + "</li>";
      }).join("");
    }
    const calm = $("#calmCards");
    if (calm) {
      const c = currentLang === "ku"
        ? ["سێ هەناسەی درێژ", "شانەکان بە نەرمی هەڵگرە", "ئاوێکت بە دەستەوە بگرە", "چرکەیەک ساتەکانی ئەمڕۆ بیر بکەوە"]
        : ["Three long breaths", "Soft shoulder rolls", "Hold a warm cup", "Name one thing that went okay today"];
      calm.innerHTML = c.map(function (x) {
        return '<button type="button" class="calm-card">' + escapeHtml(x) + "</button>";
      }).join("");
    }
    const dm = $("#discoverMyth");
    if (dm) {
      dm.innerHTML =
        '<div class="learn-myth"><div class="myth-row myth"><strong>' + (currentLang === "ku" ? "درۆ" : "Myth") + "</strong> " + escapeHtml(currentLang === "ku" ? "دایک دەبێت هەموو شت بە تەنیا بکات." : "A mother should do everything alone.") + "</div>" +
        '<div class="myth-row fact"><strong>' + (currentLang === "ku" ? "ڕاستی" : "Fact") + "</strong> " + escapeHtml(currentLang === "ku" ? "دەستەی زۆر دەتوانێت لە چاوەڕوانیدا سوکتر بێت." : "Teams, even tiny ones, often parent better together.") + "</div></div>";
    }
    const sg = $("#stageGuide");
    if (sg) {
      sg.innerHTML =
        "<ul class=\"tool-steps\"><li>" + escapeHtml(t("stageNewborn") + " — " + (currentLang === "ku" ? "پەیوەندی زۆر، خواردنەوەی بەپێی پێداویست." : "Contact, on-demand feeding basics.")) + "</li><li>" +
        escapeHtml(t("stage13") + " — " + (currentLang === "ku" ? "زۆرنیناسی، ئاگاداری زیاتر." : "More alert stretches, smiles emerging.")) + "</li><li>" +
        escapeHtml(t("stage36") + " — " + (currentLang === "ku" ? "جوڵەی زۆرتر، یاری." : "Movement play, curiosity.")) + "</li><li>" +
        escapeHtml(t("stage6p") + " — " + (currentLang === "ku" ? "گفتوگۆ لەگەڵ پزیشک دەربارەی خواردنی تەواو." : "Solids conversation with clinician.")) + "</li></ul>";
    }
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyI18n();
    initTabs();
    initHeroCtas();
    initQuoteButtons();
    renderCheckIn();
    renderDashboard();
    renderQuiz();
    renderGuidanceCards();
    $("#langToggle")?.addEventListener("click", function () {
      currentLang = currentLang === "en" ? "ku" : "en";
      localStorage.setItem(STORAGE.lang, currentLang);
      refreshAll();
    });
  });
})();
