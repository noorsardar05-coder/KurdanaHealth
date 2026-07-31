import { readFileSync, writeFileSync } from "fs";

const babyPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/babyCare.js";
const learnPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/learnArticles.js";

let baby = readFileSync(babyPath, "utf8");
baby = baby.replace(/گەرmkirdn/g, "گەرمبوون");

const cut = baby.indexOf('    id: "milestones"');
if (cut === -1) throw new Error("milestones marker not found");
const headEnd = baby.lastIndexOf("  {", cut);
const head = baby.slice(0, headEnd);

const tail = `  {
    id: "milestones",
    title: bi("Developmental Milestones", "هەنگاوەکانی گەشە"),
    body: [
      bi(
        "Milestones are guides, not deadlines. Your baby will smile, lift their head, grasp your finger, and coo in their own time. Comparing to other babies or charts can steal joy — notice your child's unique pace instead.",
        "هەنگاوەکان ڕێنماییە، نەک کاتێکی کۆتایی. منداڵەکەت بە کاتێکی خۆی پێکەنی، سەر بەرز دەکاتەوە، پەنجەت دەگرێت، و دەنگی نەرم دەدات. بەراوردکردن لەگەڵ منداڵانی تر یان خشتەکان خۆشی دەدزرێنێت — لە جیاتی ئەوە خێرایی تایبەتی منداڵەکەت ببینە."
      ),
      bi(
        "In the first months, social smiles, tracking faces with eyes, and stronger head control emerge. By four to six months, rolling and reaching appear. Sitting, babbling, and first teeth may follow between six and twelve months — wide ranges are normal.",
        "لە مانگە سەرەتاییەکاندا پێکەنی کۆمەڵایەتی، شوێنکەوتنی دەموچاو بە چاو، و بەهێزتری سەر دەردەکەوێت. لە نێوان چوار تا شەش مانگدا گەڕان و درێژکردنەوە دێت. دانیشتن، قسەی منداڵانە، و یەکەم ددان لەوانەیە لە نێوان شەش تا دوازدە مانگدا بن — مەودایەکی فراوان ئاساییە."
      ),
      bi(
        "Talk, read, and play face-to-face every day — these simple interactions fuel brain development more than any toy. Trust your instincts; if something feels different from what you expected, your clinician can offer reassurance or a gentle check.",
        "ڕۆژانە قسە بکە، بخوێنەوە، و ڕاستەوخۆ یاری بکە — ئەم کارە سادانە زیاتر لە هەر یارییەکێک مێشک گەشە پێ دەدەن. متمانە بە هەستەکانت؛ ئەگەر شتێک جیاواز لە چاوەڕوانی بوو، پزیشک دەتوانێت ئاسودابوون یان پشکنینێکی نەرم پێشکەش بکات."
      ),
    ],
    tips: [
      bi("Celebrate attempts, not just successes — effort is development", "هەوڵ ئاهەنگ بگرە، نەک تەنها سەرکەوتن — هەوڵ گەشەیە"),
      bi("Floor time on a safe mat builds strength and exploration", "کاتی سک لەسەر پاشماڵێکی سالم بەهێزی و گەڕان دروست دەکات"),
      bi("Respond to coos and babbles — conversation starts early", "وەڵامی دەنگە نەرم و قسەکانی منداڵانە بدە — گفتوگۆ زوو دەست پێدەکات"),
      bi("Avoid rushing sitting or walking — spine develops in sequence", "پەلە مەکە بۆ دانیشتن یان ڕۆشتن — ستون بە ڕیز گەشە دەکات"),
    ],
    whenToAsk: [
      bi("No social smile by three months", "بێ پێکەنی کۆمەڵایەتی تا سێ مانگ"),
      bi("One side of body seems much weaker or stiff", "یەک لای لەش زۆر لاواز یان ڕەق دەردەکەوێت"),
      bi("Loss of skills once gained — regression deserves attention", "لەدەستدانی شارەزایی کە بەدەست هاتبوو — گەڕانەوە شایانی سەرنجە"),
    ],
  },
  {
    id: "vaccines",
    title: bi("Vaccines and Immunizations", "ڤاکسین و پاراستن"),
    body: [
      bi(
        "Vaccines protect your baby from serious illnesses by teaching the immune system to recognize and fight germs. National schedules vary — your clinician or health visitor will tell you which vaccines are due and when.",
        "ڤاکسینەکان منداڵەکەت لە نەخۆشییە گرنگەکان دەparێزن بە فێrkirdni سیستەمی بەرگری بۆ ناسین و شikandni مikrob. خشتەی نیشtimani جیاwazە — پzishk یان سەrdankeri تەndrosty دەڵێت کام ڤaksin کەیە و کەی."
      ),
`;

writeFileSync(babyPath, head + tail);
console.log("partial write - need full script");
