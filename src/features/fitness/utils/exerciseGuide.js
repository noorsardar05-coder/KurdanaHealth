import { exInstruction, exName, exSafety } from "./exerciseHelpers.js";

const GUIDE_LABELS = {
  en: {
    setup: "Set up",
    movement: "Movement",
    breathing: "Breathing",
    commonMistake: "Common mistake",
    safety: "Safety",
    easier: "Beginner option",
    harder: "Advanced option",
  },
  ku: {
    setup: "ئامادەکردن",
    movement: "جوڵە",
    breathing: "هەناسە",
    commonMistake: "هەڵەی باو",
    safety: "ئامۆژگاری سەلامەتی",
    easier: "ئاسانتر",
    harder: "قورستر",
  },
};

const CATEGORY_TEMPLATES = {
  en: {
    cardio: {
      setup: "Stand tall with feet hip-width apart and core gently braced.",
      movement: "Move with steady rhythm — keep control through each rep or interval.",
      breathing: "Breathe in through your nose, out through your mouth. Don't hold your breath.",
      commonMistake: "Going too fast and losing form.",
      easier: "Slow the pace or march in place instead.",
      harder: "Increase speed or add arm drive for more intensity.",
    },
    strength: {
      setup: "Feet stable, spine neutral, and joints stacked before you begin.",
      movement: "Move slowly on the way down, strong and controlled on the way up.",
      breathing: "Exhale on the effort, inhale on the return.",
      commonMistake: "Rushing reps or using momentum instead of muscle.",
      easier: "Reduce range of motion or use fewer reps.",
      harder: "Add a pause at the hardest point or increase reps.",
    },
    core: {
      setup: "Draw your belly button toward your spine. Keep ribs down.",
      movement: "Move from your core — keep hips and shoulders stable.",
      breathing: "Breathe steadily. Avoid bearing down hard.",
      commonMistake: "Letting your lower back arch or hips sag.",
      easier: "Shorten hold time or reduce range of motion.",
      harder: "Hold longer or add a slow pulse at the end.",
    },
    legs: {
      setup: "Feet shoulder-width, weight in your heels, chest lifted.",
      movement: "Sit hips back and down, then drive through your heels to stand.",
      breathing: "Inhale as you lower, exhale as you push up.",
      commonMistake: "Knees collapsing inward or heels lifting off the floor.",
      easier: "Use a chair for support or shorten the range.",
      harder: "Add a pause at the bottom or slow the tempo.",
    },
    glutes: {
      setup: "Feet flat, knees aligned with toes, core engaged.",
      movement: "Squeeze your glutes at the top of each rep — don't hyperextend your back.",
      breathing: "Exhale as you lift, inhale as you lower.",
      commonMistake: "Overarching the lower back instead of using glutes.",
      easier: "Reduce range or perform without weight.",
      harder: "Hold the top position for 2–3 seconds each rep.",
    },
    arms: {
      setup: "Shoulders relaxed down and back. Elbows close to your sides if needed.",
      movement: "Control the weight — no swinging. Full range without locking joints.",
      breathing: "Exhale on the lift, inhale on the lower.",
      commonMistake: "Shrugging shoulders or using momentum.",
      easier: "Use lighter resistance or shorter range.",
      harder: "Slow the lowering phase to 3 seconds.",
    },
    back: {
      setup: "Spine long, chest open, shoulders away from ears.",
      movement: "Pull or extend through your back muscles — avoid jerking.",
      breathing: "Exhale during effort, inhale on release.",
      commonMistake: "Rounding the upper back or straining the neck.",
      easier: "Reduce range or use support.",
      harder: "Add a squeeze at peak contraction for 2 seconds.",
    },
    stretching: {
      setup: "Find a stable position. Move into the stretch gently.",
      movement: "Hold steady — no bouncing. Feel a mild pull, not pain.",
      breathing: "Take slow, deep breaths to help muscles release.",
      commonMistake: "Forcing the stretch too far too fast.",
      easier: "Reduce the stretch angle slightly.",
      harder: "Hold 10–15 seconds longer with steady breathing.",
    },
    mobility: {
      setup: "Stand or sit with good posture. Move joints through comfortable range.",
      movement: "Smooth, controlled circles or reaches — stay pain-free.",
      breathing: "Keep breathing relaxed throughout.",
      commonMistake: "Moving too quickly through stiff areas.",
      easier: "Smaller range of motion.",
      harder: "Slow down each rep and add one extra set.",
    },
    "warm-up": {
      setup: "Start easy — prepare your body for movement.",
      movement: "Gradually increase range and speed over the set.",
      breathing: "Breathe naturally and stay relaxed.",
      commonMistake: "Skipping warm-up and going too hard too soon.",
      easier: "Keep movements smaller and slower.",
      harder: "Extend duration by 15–20 seconds.",
    },
    cooldown: {
      setup: "Slow your pace. Let your heart rate come down.",
      movement: "Gentle movement or light stretching — no strain.",
      breathing: "Long exhales help your body recover.",
      commonMistake: "Stopping abruptly without cooling down.",
      easier: "Stay at an easy pace throughout.",
      harder: "Add deep breathing for 30 extra seconds.",
    },
    "cool-down": {
      setup: "Slow your pace. Let your heart rate come down.",
      movement: "Gentle movement or light stretching — no strain.",
      breathing: "Long exhales help your body recover.",
      commonMistake: "Stopping abruptly without cooling down.",
      easier: "Stay at an easy pace throughout.",
      harder: "Add deep breathing for 30 extra seconds.",
    },
    default: {
      setup: "Stand with feet hip-width apart, core engaged, and posture tall.",
      movement: "Follow the exercise pattern with control and full awareness.",
      breathing: "Breathe steadily — never hold your breath.",
      commonMistake: "Rushing through reps without proper form.",
      easier: "Reduce time, reps, or range of motion.",
      harder: "Slow the tempo or add 2–3 more reps.",
    },
  },
};

function kuTemplates() {
  return {
    cardio: {
      setup: "ڕاست وەستە، پێ بە پانی مەلەوان، ناوەڕاست بە نەرمی ئامادە.",
      movement: "بە ڕیتمێکی جێگیر بجوڵێ — کۆntrۆڵ لە هەر دووبارەکردنەوەیەکدا.",
      breathing: "هەناسە لە لووت، دەرچوون لە دەم. هەناسە مەگرە.",
      commonMistake: "زۆر خێرا ڕۆیشتن و لەدەستدانی فۆrm.",
      easier: "خاوتر بکە یان لە شوێنی خۆت بجوڵێ.",
      harder: "خێرایی زیاد بکە.",
    },
    strength: {
      setup: "پێ جێگیر، پشت ڕاست، پێش ئەوەی دەستپێبکەیت ئامادەبە.",
      movement: "بە ئارامی بجوڵێ — کۆntrۆڵ لە هەر دووبارەکردنەوەیەکدا.",
      breathing: "لە کاتی هەوڵدا هەناسە دەر بکە، لە گەڕانەوەدا بکێشەوە.",
      commonMistake: "پەلە کردن لە دووبارەکردنەوە.",
      easier: "مەودا کەم بکە یان دووبارەکردنەوە کەم بکە.",
      harder: "لە قورسترین شوێندا بوەستە.",
    },
    core: {
      setup: "ناوەڕاست بە توندی بگرە. ڕیبەکان خوارەوە.",
      movement: "لە ناوەڕastەوە بجوڵێ — مەلەوان و شان جێگیر.",
      breathing: "هەناسە بە ئارامی. هەناسە مەگرە.",
      commonMistake: "پشت لادان یان مەلەوان کەوتن.",
      easier: "کاتی گرتن کەم بکە.",
      harder: "کاتی گرتن درێژ بکە.",
    },
    legs: {
      setup: "پێ بە پانی شان، کێش لە پاش پێ، سینە بەرز.",
      movement: "قۆڵ بکەرەوە و خوار بچۆ، دواتر لە پاش پێ بەرز ببەوە.",
      breathing: "لە خوارچووندا هەناسە بکێشەوە، لە بەرزبوونەوەدا دەر بکە.",
      commonMistake: "ئەژنۆ لەناوەوە یان پاش پێ لە زەوی بەرزبوونەوە.",
      easier: "کورسی بەکاربهێنە بۆ پشتگیری.",
      harder: "لە خوارەوە بوەستە.",
    },
    glutes: {
      setup: "پێ لە زەوی، ئەژنۆ لەگەڵ پەنجەی پێ، ناوەڕاست ئامادە.",
      movement: "گلوت لە سەرەوە بگرە — پشت زۆر لادە مە.",
      breathing: "لە بەرزبوونەوەدا هەناسە دەر بکە.",
      commonMistake: "پشت زۆر لادان لە جیاتی گلوت.",
      easier: "مەودا کەم بکە.",
      harder: "٢–٣ چرکە لە سەرەوە بمێنە.",
    },
    arms: {
      setup: "شان ئارام، ئەستۆ لەگەڵ جەستە.",
      movement: "بە کۆntrۆڵ بجوڵێ — بێ swing.",
      breathing: "لە بەرزکردنەوەدا هەناسە دەر بکە.",
      commonMistake: "شان بەرزکردنەوە یان پەلە.",
      easier: "مەودا کەم بکە.",
      harder: "فازەی دابەزین ٣ چرکە.",
    },
    back: {
      setup: "پشت درێژ، سینە کراوە، شان دوور لە گوێ.",
      movement: "لە ماسولکەی پشتەوە بکێشە — بێ jerk.",
      breathing: "لە کاتی هەوڵدا هەناسە دەر بکە.",
      commonMistake: "گرد کردنەوەی پشت.",
      easier: "مەودا کەم بکە.",
      harder: "٢ چرکە لە کۆتایی بگرە.",
    },
    stretching: {
      setup: "شوێنێکی جێگیر بدۆزەرەوە. بە نەرمی بچۆ ناو کێشان.",
      movement: "بە جێگیری بمێنە — bounce مەکە.",
      breathing: "هەناسەی قووڵ و خاو.",
      commonMistake: "زۆر زۆر کێشان.",
      easier: "گۆشە کەم بکە.",
      harder: "١٠–١٥ چرکە زیاتر بگرە.",
    },
    mobility: {
      setup: "بە ڕەوختی باش بمێنە. مفاصل بە مەودای ئاسوودە.",
      movement: "خاڵ و گەڕانی نەرم — بێ ئازار.",
      breathing: "هەناسە ئارام.",
      commonMistake: "زۆر خێرا لە شوێنە سختەکان.",
      easier: "مەودای بچووکتر.",
      harder: "هەر دووبارەکردنەوەیەک خاوتر.",
    },
    "warm-up": {
      setup: "بە ئاسانی دەستپێبکە — جەستە ئامادە بکە.",
      movement: "مەودا و خێرایی بە تدریج زیاد بکە.",
      breathing: "هەناسە سروشتی.",
      commonMistake: "گەرمکردنەوە تێپەڕاندن.",
      easier: "جوڵە بچووکتر و خاوتر.",
      harder: "١٥–٢٠ چرکە زیاتر.",
    },
    cooldown: {
      setup: "خاو بکەرەوە. ڕێ بدە دڵ ئارام ببێتەوە.",
      movement: "جوڵەی نەرم — بێ فشار.",
      breathing: "هەناسەی درێژ یارمەتیدەرە.",
      commonMistake: "بە یەکجار وەستان.",
      easier: "ئاسان بمێنەرەوە.",
      harder: "٣٠ چرکەی هەناسەی قووڵ زیاد بکە.",
    },
    "cool-down": {
      setup: "خاو بکەرەوە. ڕێ بدە دڵ ئارام ببێتەوە.",
      movement: "جوڵەی نەرم — بێ فشار.",
      breathing: "هەناسەی درێژ یارمەتیدەرە.",
      commonMistake: "بە یەکجار وەستان.",
      easier: "ئاسان بمێنەرەوە.",
      harder: "٣٠ چرکەی هەناسەی قووڵ زیاد بکە.",
    },
    default: {
      setup: "پێ بە پانی مەلەوان، ناوەڕاست ئامادە، ڕەوختی بەرز.",
      movement: "بە کۆntrۆڵ ئەنجام بدە.",
      breathing: "هەناسە بە ئارامی — هەناسە مەگرە.",
      commonMistake: "پەلە کردن بەبێ فۆrm.",
      easier: "کات، دووبارەکردنەوە، یان مەودا کەم بکە.",
      harder: "خاوتر بکە یان ٢–٣ دووبارەکردنەوە زیاد بکە.",
    },
  };
}

const NAME_PATTERNS = [
  {
    test: /push.?up|press.?up|wall push/i,
    en: {
      setup: "Place hands under shoulders and keep your body in one straight line.",
      movement: "Lower your chest toward the floor, then push back up with control.",
      breathing: "Inhale as you lower, exhale as you push up.",
      commonMistake: "Letting your hips drop or flare elbows too wide.",
      safety: "Stop if you feel shoulder or wrist pain.",
      easier: "Do it on your knees or against a wall.",
      harder: "Hold halfway down or add a slow 3-second lower.",
    },
  },
  {
    test: /squat/i,
    en: {
      setup: "Feet shoulder-width, toes slightly out, chest up.",
      movement: "Sit hips back and down until thighs are parallel, then stand tall.",
      breathing: "Inhale down, exhale up.",
      commonMistake: "Knees caving in or heels lifting.",
      easier: "Sit back onto a chair.",
      harder: "Pause 2 seconds at the bottom.",
    },
  },
  {
    test: /plank|hold/i,
    en: {
      setup: "Forearms or hands under shoulders, body in one line from head to heels.",
      movement: "Hold steady — squeeze glutes and brace your core.",
      breathing: "Breathe slowly; do not hold your breath.",
      commonMistake: "Hips sagging or piking up.",
      easier: "Drop to knees while keeping a straight line.",
      harder: "Hold lower or increase time.",
    },
  },
  {
    test: /lunge/i,
    en: {
      setup: "Stand tall, step one foot forward with enough space.",
      movement: "Lower until both knees bend ~90°, front knee over ankle, then push back.",
      breathing: "Inhale down, exhale to return.",
      commonMistake: "Front knee passing too far over toes.",
      easier: "Shorten the step or hold a wall.",
      harder: "Add a pause at the bottom.",
    },
  },
  {
    test: /jump|jack|burpee/i,
    en: {
      setup: "Soft knees, land-ready posture, core braced.",
      movement: "Explosive but controlled — land softly through your whole foot.",
      breathing: "Find a rhythm; breathe don't gasp.",
      commonMistake: "Landing with locked knees.",
      easier: "Step instead of jump.",
      harder: "Pick up the pace safely.",
    },
  },
  {
    test: /stretch|flex/i,
    en: {
      setup: "Move into position slowly until you feel a mild stretch.",
      movement: "Hold still — breathe into the stretch.",
      breathing: "Long exhales help release tension.",
      commonMistake: "Bouncing or forcing range.",
      easier: "Reduce the stretch angle.",
      harder: "Hold 15 seconds longer.",
    },
  },
];

function normalizeCategory(ex) {
  const cat = ex.category || "default";
  const map = {
    flexibility: "stretching",
    "low-impact": "mobility",
    "warm-up": "warm-up",
    "cool-down": "cooldown",
  };
  return map[cat] || cat;
}

function pickNameGuide(nameEn) {
  for (const p of NAME_PATTERNS) {
    if (p.test.test(nameEn)) return p.en;
  }
  return null;
}

export function getGuideLabels(lang) {
  return GUIDE_LABELS[lang === "ku" ? "ku" : "en"];
}

export function getExerciseGuide(ex, lang = "en") {
  if (!ex) return null;

  const custom = ex.guide || ex.guideEn;
  if (custom && typeof custom === "object") {
    const ku = ex.guideKu;
    if (lang === "ku" && ku) {
      return {
        setup: ku.setup || custom.setup,
        movement: ku.movement || custom.movement,
        breathing: ku.breathing || custom.breathing,
        commonMistake: ku.commonMistake || custom.commonMistake,
        safety: ku.safety || custom.safety,
        easier: ku.easier || custom.easier,
        harder: ku.harder || custom.harder,
      };
    }
    return { ...custom };
  }

  const cat = normalizeCategory(ex);
  const templates = lang === "ku" ? kuTemplates() : CATEGORY_TEMPLATES.en;
  const base = templates[cat] || templates.default;
  const nameGuide = pickNameGuide(ex.nameEn || "");

  const instruction = exInstruction(ex, lang);
  const safety = exSafety(ex, lang);
  const alt = lang === "ku" ? ex.lowImpactAltKu : ex.lowImpactAltEn;

  return {
    setup: nameGuide?.setup || base.setup,
    movement: nameGuide?.movement || instruction || base.movement,
    breathing: nameGuide?.breathing || base.breathing,
    commonMistake: nameGuide?.commonMistake || base.commonMistake,
    safety: nameGuide?.safety || safety || base.safety || (lang === "ku" ? "ئەگەر ئازاری تیژ هەبوو وەستە." : "Stop if you feel sharp pain."),
    easier: nameGuide?.easier || alt || base.easier,
    harder: nameGuide?.harder || base.harder,
  };
}

export function coachBubbleText(t, ratio, lang) {
  if (ratio < 0.2) return t("coachBubble1");
  if (ratio < 0.5) return t("coachBubble2");
  if (ratio < 0.8) return t("coachBubble3");
  return t("coachBubble4");
}
