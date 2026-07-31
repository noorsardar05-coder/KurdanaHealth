/**
 * Immersive bilingual organ journeys.
 * Medical statements kept accurate; tone is warm and curious.
 */

function L(en, ku) {
  return { en, ku };
}

export const JOURNEYS = {
  heart: {
    title: L("Meet your heart.", "ئاشنای دڵت ببە."),
    whisper: L("It never rests — not even while you sleep.", "هەرگیز پشوو نادات — تەنانەت کاتێک دەخەویت."),
    cards: [
      {
        kind: "who",
        title: L("Who am I?", "من کێم؟"),
        body: L(
          "A four-chamber muscular pump in the mediastinum — slightly left of center, between your lungs.",
          "پەمپێکی ماسوولکەیی چوار ژووری لە ناوەڕاستی سنگی — کەمێک لای چەپ، لە نێوان سیهەکانت."
        ),
      },
      {
        kind: "do",
        title: L("What do I do?", "چی دەکەم؟"),
        body: L(
          "I drive blood through the lungs and the whole body — about 100,000 beats every day.",
          "خوێن دەنێرم بۆ سیهە و هەموو جەستە — نزیکەی ١٠٠٬٠٠٠ لیدان لە ڕۆژێکدا."
        ),
      },
      {
        kind: "wow",
        title: L("Did you know?", "دەتزانی؟"),
        body: L(
          "Most of me sits in the center. My tip only leans slightly left — a common myth says I'm fully on the left.",
          "زۆربەی من لە ناوەڕاستم. تەنها لوتکەم کەمێک لای چەپ لار دەبێتەوە."
        ),
      },
      {
        kind: "clinic",
        title: L("Clinical note", "تێبینی پزیشکی"),
        body: L(
          "Chest pain with breathlessness or arm pain needs urgent medical care — never ignore warning signs.",
          "ئازاری سنگ لەگەڵ هەناسەتەنگی یان ئازاری قۆڵ پێویستی بە چارەسەری خێرا هەیە."
        ),
      },
      {
        kind: "health",
        title: L("Keep me strong", "بەهێزم بهێڵەوە"),
        body: L(
          "Move most days, sleep well, avoid smoking, and know your blood pressure.",
          "زۆربەی ڕۆژان بجوڵێ، باش بخەوە، جگەرە مەکێشە، و پەستانی خوێنت بزانە."
        ),
      },
      {
        kind: "play",
        title: L("Heart rhythm", "ڕیتمی دڵ"),
        body: L("Keep a steady beat — learn how rhythm protects life.", "ڕیتمێکی جێگیر بهێڵەوە — فێربە چۆن ڕیتم ژیان دەپارێزێت."),
        game: "heart-rhythm",
      },
    ],
  },
  brain: {
    title: L("Meet your brain.", "ئاشنای مێشکت ببە."),
    whisper: L("Eighty-six billion neurons, whispering constantly.", "هەشتا و شەش ملیار نێورۆن، هەمیشە قسە دەکەن."),
    cards: [
      {
        kind: "who",
        title: L("Who am I?", "من کێم؟"),
        body: L("I live inside your skull — protected by bone, fluid, and meninges.", "لەناو کەلەکەرتدام — پارێزراو بە ئێسک و شلە و پەردە."),
      },
      {
        kind: "do",
        title: L("What do I do?", "چی دەکەم؟"),
        body: L("I sense, move, remember, feel, and keep vital rhythms running.", "هەست دەکەم، دەجوڵێم، بیر دەهێنمەوە، و ڕیتمە گرنگەکان دەپارێزم."),
      },
      {
        kind: "wow",
        title: L("Did you know?", "دەتزانی؟"),
        body: L("I use about 20% of resting energy while weighing only ~2% of your body.", "نزیکەی ٢٠٪ی وزەی پشوو بەکاردەهێنم، لە کاتێکدا تەنها ~٢٪ی کێشی جەستەم."),
      },
      {
        kind: "clinic",
        title: L("Clinical note", "تێبینی پزیشکی"),
        body: L("Sudden weakness or speech trouble can signal stroke — seek emergency care.", "لاوازی لەناکاو یان کێشەی قسەکردن دەتوانێت نیشانەی جەڵتە بێت."),
      },
      {
        kind: "play",
        title: L("Brain challenge", "بەرەنگاری مێشک"),
        body: L("Test memory and reaction — train your cortex.", "بیرەوەری و کاردانەوە تاقی بکەوە."),
        game: "brain-challenge",
      },
    ],
  },
  lungs: {
    title: L("Meet your lungs.", "ئاشنای سیهەکانت ببە."),
    whisper: L("Two sponges exchanging life with every breath.", "دوو سەفنج کە لەگەڵ هەر هەناسەیەک ژیان دەگۆڕن."),
    cards: [
      {
        kind: "who",
        title: L("Who am I?", "من کێم؟"),
        body: L("Paired organs beside the heart. The right lung is usually larger.", "ئەندامێکی جووت لە تەنیشت دڵ. سیهەی ڕاست زۆرجار گەورەترە."),
      },
      {
        kind: "do",
        title: L("What do I do?", "چی دەکەم؟"),
        body: L("I pull oxygen in and send carbon dioxide out — thousands of times a day.", "ئۆکسجین دەهێنمە ژوورەوە و کاربۆن دایۆکساید دەردەکەم."),
      },
      {
        kind: "wow",
        title: L("Did you know?", "دەتزانی؟"),
        body: L("Millions of alveoli create a huge surface for gas exchange.", "ملیۆنان هەواچەڵک ڕووبەرێکی گەورە بۆ گۆڕینی گاز دروست دەکەن."),
      },
      {
        kind: "health",
        title: L("Keep me clear", "پاکم بهێڵەوە"),
        body: L("Avoid smoke and polluted air when you can.", "دووکەڵ و هەوای پیس دوور بخەوە."),
      },
      {
        kind: "play",
        title: L("Breath sync", "هاوسەنگی هەناسە"),
        body: L("Match inhale and exhale with lung mechanics.", "هەناسەدان و دەرکردن لەگەڵ سیهە هاوتەریب بکە."),
        game: "organ-hunt",
      },
    ],
  },
  liver: {
    title: L("Meet your liver.", "ئاشنای جگەرت ببە."),
    whisper: L("The quiet chemist under your right ribs.", "کیمیاگەرێکی بێدەنگ لە ژێر قەفەسی ڕاست."),
    cards: [
      {
        kind: "who",
        title: L("Who am I?", "من کێم؟"),
        body: L("The largest internal organ — upper right abdomen.", "گەورەترین ئەندامی ناوەوە — سەرەوەی لای ڕاستی سک."),
      },
      {
        kind: "do",
        title: L("What do I do?", "چی دەکەم؟"),
        body: L("Metabolism, bile, detox pathways, proteins, and energy storage.", "میتابۆلیزم، زەرداو، پاککردنەوە، پرۆتین، و هەڵگرتنی وزە."),
      },
      {
        kind: "play",
        title: L("Organ Hunt", "ڕاوە ئەندام"),
        body: L("Can you find me on the atlas?", "دەتوانیت لەسەر نەخشەم بدۆزیتەوە؟"),
        game: "organ-hunt",
      },
    ],
  },
  stomach: {
    title: L("Meet your stomach.", "ئاشنای گەدەت ببە."),
    whisper: L("An acid workshop in the upper left abdomen.", "کارگەیەکی ترش لە سەرەوەی لای چەپی سک."),
    cards: [
      {
        kind: "who",
        title: L("Who am I?", "من کێم؟"),
        body: L("A J-shaped organ under the left diaphragm.", "ئەندامێکی شێوەی J لە ژێر دیافراگمی چەپ."),
      },
      {
        kind: "do",
        title: L("What do I do?", "چی دەکەم؟"),
        body: L("I mix food with acid and enzymes, then pass chyme to the duodenum.", "خواردن لەگەڵ ترش و ئینزایم تێکەڵ دەکەم."),
      },
      {
        kind: "play",
        title: L("Digestive journey", "گەشتی هەرس"),
        body: L("Guide a meal through the real GI path.", "خواردنێک لە ڕێگای هەرسدا ببە."),
        game: "digestive-journey",
      },
    ],
  },
  kidneys: {
    title: L("Meet your kidneys.", "ئاشنای گورچیلەکانت ببە."),
    whisper: L("Twin filters behind the abdomen.", "دوو فلتەری جووت لە پشت سک."),
    cards: [
      {
        kind: "who",
        title: L("Who am I?", "من کێم؟"),
        body: L("Retroperitoneal twins beside the spine — not in the front belly.", "جووتی پشت-سک لە تەنیشت بڕبڕە — نەک لە پێشی سک."),
      },
      {
        kind: "do",
        title: L("What do I do?", "چی دەکەم؟"),
        body: L("I filter blood, balance salts and water, and help blood pressure.", "خوێن فلتەر دەکەم، خوێ و ئاو هاوسەنگ دەکەم."),
      },
    ],
  },
  pancreas: {
    title: L("Meet your pancreas.", "ئاشنای پەنکریاست ببە."),
    whisper: L("Hidden behind the stomach — enzymes and hormones.", "شاردراوەتەوە لە پشت گەدە — ئینزایم و هۆرمۆن."),
    cards: [
      {
        kind: "who",
        title: L("Who am I?", "من کێم؟"),
        body: L("A gland behind the stomach crossing the midline.", "غودەدەیەک لە پشت گەدە کە لەناوەڕاست تێدەپەڕێت."),
      },
      {
        kind: "play",
        title: L("Hormone match", "هاوتاکردنی هۆرمۆن"),
        body: L("Match glands to their messengers.", "غودەدەکان لەگەڵ پەیامەکانیان هاوتا بکە."),
        game: "hormone-match",
      },
    ],
  },
  spleen: {
    title: L("Meet your spleen.", "ئاشنای سپلینت ببە."),
    whisper: L("A soft guardian in the left upper abdomen.", "پارێزەرێکی نەرم لە سەرەوەی لای چەپی سک."),
    cards: [
      {
        kind: "do",
        title: L("What do I do?", "چی دەکەم؟"),
        body: L("I filter blood and support immune responses.", "خوێن فلتەر دەکەم و بەرگری پشتگیری دەکەم."),
      },
    ],
  },
  intestines: {
    title: L("Meet your intestines.", "ئاشنای ڕیخۆڵەکانت ببە."),
    whisper: L("Where most nutrients are absorbed.", "لێرە زۆربەی خۆراک دەمژرێت."),
    cards: [
      {
        kind: "do",
        title: L("What do I do?", "چی دەکەم؟"),
        body: L("Small intestine absorbs nutrients; large intestine reclaim water.", "ڕیخۆڵەی بچووک خۆراک دەمژێت؛ گەورە ئاو دەگەڕێنێتەوە."),
      },
      {
        kind: "play",
        title: L("Digestive journey", "گەشتی هەرس"),
        body: L("Follow the path from mouth to exit.", "ڕێگا لە دەمەوە تا دەرچوون بگرە."),
        game: "digestive-journey",
      },
    ],
  },
  appendix: {
    title: L("Meet your appendix.", "ئاشنای ئەپێندیکست ببە."),
    whisper: L("A small pouch in the lower right abdomen.", "گیرفانێکی بچووک لە خوارەوەی لای ڕاستی سک."),
    cards: [
      {
        kind: "clinic",
        title: L("Clinical note", "تێبینی پزیشکی"),
        body: L("Migrating pain to the right lower quadrant with fever needs urgent review.", "ئازار کە دەڕوات بۆ خوارەوەی ڕاست لەگەڵ تا پێویستی بە پشکنینی خێرا هەیە."),
      },
      {
        kind: "play",
        title: L("Emergency Room", "ژووری فریاکەوتن"),
        body: L("Match symptoms to the right organ.", "نیشانەکان لەگەڵ ئەندامی دروست هاوتا بکە."),
        game: "emergency-room",
      },
    ],
  },
  gallbladder: {
    title: L("Meet your gallbladder.", "ئاشنای کیسەی زەرداو ببە."),
    whisper: L("Bile storage under the liver.", "کۆگای زەرداو لە ژێر جگەر."),
    cards: [
      {
        kind: "do",
        title: L("What do I do?", "چی دەکەم؟"),
        body: L("I store and release bile to help digest fats.", "زەرداو هەڵدەگرم و دەردەکەم بۆ هەرسکردنی چەوری."),
      },
    ],
  },
  bladder: {
    title: L("Meet your bladder.", "ئاشنای میزەڵدان ببە."),
    whisper: L("A muscular reservoir in the pelvis.", "کۆگایەکی ماسوولکەیی لە ناو حەوز."),
    cards: [
      {
        kind: "do",
        title: L("What do I do?", "چی دەکەم؟"),
        body: L("I store urine until you choose to empty.", "میز هەڵدەگرم تا کاتی دەرکردن."),
      },
    ],
  },
  spinalCord: {
    title: L("Meet your spinal cord.", "ئاشنای بڕبڕە پەتک ببە."),
    whisper: L("The signal cable inside your vertebrae.", "کێبڵی سیگناڵ لەناو بڕبڕەکان."),
    cards: [
      {
        kind: "who",
        title: L("Who am I?", "من کێم؟"),
        body: L("I run inside the vertebral canal — never outside the spine.", "لەناو کەناڵی بڕبڕەدا دەڕۆم — هەرگیز لە دەرەوەی بڕبڕە نا."),
      },
      {
        kind: "play",
        title: L("Brain challenge", "بەرەنگاری مێشک"),
        body: L("Race a signal along a pathway.", "سیگناڵێک لەسەر ڕێگا ڕاکێشە."),
        game: "brain-challenge",
      },
    ],
  },
};

export function textOf(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en || "";
}
