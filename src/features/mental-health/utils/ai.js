/**
 * Local helpers for mood personalization only.
 * Thought Mirror / companion chat use the on-device thoughtMirror engine.
 */

function L(en, ku, lang) {
  return lang === "ku" ? ku : en;
}

/** @deprecated Legacy stub — Thought Mirror uses local engine, not network. */
export function companionReply() {
  return "";
}

/** Local brain-dump sorter (on-device). Not AI. */
export function organizeBrainDump(raw, lang = "en") {
  const text = (raw || "").trim();
  const lines = text
    .split(/[\n.!?؛۔]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);

  const controlWords = /can|will|plan|call|write|drink|walk|دەتوانم|دەکەم|پلان|پەیوەندی|بنووس|بخۆمەوە|بڕۆم/i;
  const cannotWords = /weather|they|others|past|کەس|ئەوان|ڕابردوو|کەش|ناتوانم/i;
  const tomorrowWords = /tomorrow|later|next|سبەینێ|دواتر/i;
  const winWords = /did|finished|proud|got up|خەو|هەستام|تەواوم|شانازی/i;

  const can = [];
  const cannot = [];
  const tomorrow = [];
  const letGo = [];
  const wins = [];

  for (const line of lines) {
    if (winWords.test(line)) wins.push(line);
    else if (tomorrowWords.test(line)) tomorrow.push(line);
    else if (cannotWords.test(line)) cannot.push(line);
    else if (controlWords.test(line)) can.push(line);
    else letGo.push(line);
  }

  if (!can.length && lines[0]) can.push(lines[0]);
  if (!letGo.length && lines[1]) letGo.push(lines[1]);

  const next =
    can[0] ||
    tomorrow[0] ||
    L("Drink water and sit still for one minute.", "ئاو بخۆرەوە و یەک خولەک دانیشە.", lang);

  const empty = L("Nothing here yet — that’s okay.", "هێشتا هیچ نییە — ئاساییە.", lang);

  return {
    can: can.length ? can : [empty],
    cannot: cannot.length ? cannot : [L("Other people’s choices.", "هەڵبژاردنی کەسانی تر.", lang)],
    tomorrow: tomorrow.length ? tomorrow : [L("One small thing, not everything.", "یەک شتی بچووک، نەک هەموو شت.", lang)],
    letGo: letGo.length ? letGo : [L("The urge to fix everything tonight.", "ئارەزووی چارەسەرکردنی هەموو شت ئەمشەو.", lang)],
    wins: wins.length ? wins : [L("You wrote it down. That is a win.", "نووسیشت. ئەمەش سەرکەوتنێکە.", lang)],
    next,
  };
}

export function dailyCompanionLine(lang, state) {
  const day = new Date().getDate();
  const pattern = detectPattern(state);

  if (state?.lastOpen) {
    const days = Math.floor((Date.now() - state.lastOpen) / 86400000);
    if (days >= 7) {
      return lang === "ku"
        ? "بەخێربێیتەوە. هیچ پێویست ناکات ڕوونی بکەیتەوە — تەنها لێرەبە."
        : "Welcome back. You don’t owe an explanation — just be here.";
    }
  }

  if (pattern === "anxiety") {
    return lang === "ku"
      ? "دڵەڕاوکێ زۆر سەردانی کردوویت. ئەمڕۆ هێواشتر دەڕۆین."
      : "Anxiety has visited often. We’ll go slower today.";
  }
  if (pattern === "burnout") {
    return lang === "ku"
      ? "ماندوویی قووڵ دەبینم. پشوو کارە — نەک خەڵات."
      : "I see deep tiredness. Rest is the work — not a reward.";
  }
  if (pattern === "loneliness") {
    return lang === "ku"
      ? "تەنیایی قورسە. تۆ بە تەنها نیت لێرە."
      : "Loneliness is heavy. You’re not alone in this space.";
  }
  if (pattern === "grief") {
    return lang === "ku"
      ? "هەندێک ڕۆژ تەنها هەناسە بەسە. من لێرەم."
      : "Some days, breathing is enough. I’m here.";
  }

  const lines = lang === "ku"
    ? [
        "خۆشحاڵم لێرەیت.",
        "پێویست ناکات ئەمڕۆ هەموو شت چارەسەر بکەیت.",
        "دوێنێت تێپەڕاند. ئەمەش گرنگە.",
        "با تەنها سەیری کاتژمێری داهاتوو بکەین.",
        "تۆ شایستەی نەرمییت.",
        "هەناسەیەک. پاشان یەک هەنگاو.",
        "لێرەم. بێ پەلە.",
      ]
    : [
        "I’m glad you’re here.",
        "You don’t have to fix everything today.",
        "You survived yesterday.",
        "Let’s only focus on the next hour.",
        "You deserve softness.",
        "One breath. Then one step.",
        "I’m here. No rush.",
      ];

  return lines[day % lines.length];
}

/** Detect recurring emotional patterns from mood history — never diagnoses. */
export function detectPattern(state) {
  const hist = state?.moodHistory || [];
  const recent = hist.slice(-10);
  if (recent.length < 3) return null;
  const counts = recent.reduce((acc, h) => {
    acc[h.mood] = (acc[h.mood] || 0) + 1;
    return acc;
  }, {});
  if ((counts.anxious || 0) >= 3) return "anxiety";
  if ((counts.tired || 0) >= 3) return "burnout";
  if ((counts.overwhelmed || 0) >= 3) return "burnout";
  if ((counts.unknown || 0) >= 3) return "grief";
  return null;
}

export function moodHomePlan(mood, lang, state) {
  const pattern = detectPattern(state);
  const plans = {
    okay: {
      accent: "okay",
      first: "discover",
      hint: L("A gentle day. Keep it light.", "ڕۆژێکی نەرم. سووک بیهێڵەرەوە.", lang),
      secondary: "translator",
    },
    tired: {
      accent: "tired",
      first: "sounds",
      hint: L(
        "Soft tools first. Drink water. Rest is allowed.",
        "ئامێری نەرم یەکەم. ئاو بخۆرەوە. پشوو ڕێگەپێدراوە.",
        lang
      ),
      secondary: "selfCare",
      tip: L("Hydration reminder: one slow glass of water.", "بیرخستنەوەی ئاو: یەک گڵاسی هێواش.", lang),
    },
    overwhelmed: {
      accent: "overwhelmed",
      first: "dump",
      hint: L("Let’s empty your head first.", "با یەکەم جار سەرت بەتاڵ بکەین.", lang),
      secondary: "sounds",
    },
    anxious: {
      accent: "anxious",
      first: "breathe",
      hint: L("Slower now. Breathe with me.", "ئێستا هێواشتر. لەگەڵم هەناسە بدە.", lang),
      secondary: "translator",
    },
    unknown: {
      accent: "unknown",
      first: "translator",
      hint: L("Not knowing is okay. We’ll go gently.", "نەزانین ئاساییە. بە نەرمی دەڕۆین.", lang),
      secondary: "comfort",
    },
  };
  const base = plans[mood] || plans.unknown;
  if (pattern === "anxiety" && mood !== "anxious") {
    return {
      ...base,
      hint: L(
        "I’ve noticed anxiety visiting often. Breathing is waiting when you need it.",
        "تێبینی دەکەم دڵەڕاوکێ زۆر دێت. هەناسە چاوەڕوانە کاتێک پێویستت پێی بێت.",
        lang
      ),
    };
  }
  if (pattern === "loneliness") {
    return {
      ...base,
      hint: L(
        "Your Gratitude Tree is waiting — a private place to notice what is good.",
        "داری سوپاسگوزاریت چاوەڕوانە — شوێنێکی تایبەت بۆ بینینی خێرەکان.",
        lang
      ),
      secondary: "community",
    };
  }
  return base;
}
