import { writeFileSync } from "fs";

const ku = {
  vExcerpt:
    "\u062F\u06D5\u062A\u0648\u0627\u0646\u06CC\u062A \u0633\u0646\u0648\u0648\u0631 \u0628\u062F\u06D5\u06CC\u062A \u0644\u06D5 \u0633\u06D5\u0631\u062F\u0627\u0646\u060C \u06AF\u0631\u062A\u0646\u060C \u0648 \u0626\u0627\u0645\u06CC\u0695\u06AF\u0627\u0631\u06CC\u002E \u067E\u0627\u0631\u0627\u0633\u062A\u0646\u06CC \u067E\u0634\u0648\u0648 \u0628\u06D5\u0634\u06CE\u06A9 \u0644\u06D5 \u0686\u0627\u0648\u062F\u06CE\u0631\u06CC \u0645\u0646\u062F\u0627\u0644\u06CE\u002E",
  vBody1:
    "\u0628\u0627\u0634\u06D5 \u0644\u06D5 \u0645\u06CE\u0648\u0627\u0646 \u0628\u062E\u0648\u0627\u0632\u06CC \u062F\u06D5\u0633\u062A \u0628\u0634\u0648\u06CE\u062A\u060C \u0633\u06D5\u0631\u062F\u0627\u0646 \u06A9\u0648\u0631\u062A \u0628\u06CE\u062A\u060C \u06CC\u0627\u0646 \u062F\u0648\u0627\u062A\u0631 \u0628\u06AF\u06D5\u0631\u06CE\u062A\u06D5\u0648\u06D5\u002E \u0686\u0627\u06A9\u0628\u0648\u0648\u0646\u06D5\u0648\u06D5\u06CC \u062A\u06CC \u0648 \u0633\u06CC\u0633\u062A\u06D5\u0645\u06CC \u0628\u06D5\u0631\u06AF\u0631\u06CC \u0645\u0646\u062F\u0627\u0644 \u0647\u06CE\u0634\u062A\u0627 \u062C\u06CE\u06AF\u06CC\u0631 \u062F\u06D5\u0628\u0646\u002E",
  vBody2:
    "\u0626\u0627\u0645\u06CC\u0695\u06AF\u0627\u0631\u06CC \u0628\u06B5 \u062F\u0627\u0648\u0627 \u0628\u0627\u0631 \u0642\u0648\u0631\u0633\u06D5\u002E \u0633\u0648\u067E\u0627\u0633 \u0648 \u0695\u06CE\u0646\u0645\u0627\u06CC\u06CC \u0633\u0627\u062F\u06D5 \u2014 \u06CC\u0627\u0646 \u0647\u0627\u0648\u0633\u06D5\u0631 \u067E\u0631\u0633\u06CC\u0627\u0631\u06D5\u06A9\u0627\u0646 \u0648\u06D5\u0644\u0627\u0645 \u0628\u062F\u0627\u062A\u06D5\u0648\u06D5 \u2014 \u0626\u0627\u0631\u0627\u0645\u06CC \u062F\u06D5\u067E\u0627\u0631\u06CE\u0632\u06CE\u062A\u002E",
  eTitle: "\u0645\u0646\u062F\u0627\u0644 \u0695\u0627\u0633\u062A\u06CC \u0686\u06CC \u062F\u06D5\u0648\u06CE\u062A\u061F",
  eExcerpt:
    "\u062C\u06CE\u0648\u06D5\u06AF\u0631\u062A\u0646 \u0644\u06D5 \u06A9\u06D5\u0644\u0648\u067E\u06D5\u0644 \u2014 \u06AF\u06D5\u0631\u0645\u06CC\u060C \u0634\u06CC\u0631\u060C \u067E\u0627\u0645\u067E\u06D5\u0631\u06CC \u067E\u0627\u06A9\u060C \u0648 \u0626\u0627\u0645\u0627\u062F\u06D5\u0628\u0648\u0648\u0646\u06CC \u062A\u0648 \u0632\u06CC\u0627\u062F\u0628\u06D5\u06CC \u067E\u06CE\u062F\u0627\u0648\u06CC\u0633\u062A\u06CC\u06CC\u06D5\u06A9\u0627\u0646 \u062F\u06D5\u067E\u06CC\u0695\u06CC\u062A\u002E",
  eBody1:
    "\u0633\u0627\u062F\u06D5 \u062F\u06D5\u0633\u062A \u067E\u06CE \u0628\u06A9\u06D5\u003A \u0634\u0648\u06D5\u0646\u06CC \u062E\u06D5\u0648\u06CC \u0633\u0627\u0644\u0645\u060C \u062E\u0648\u0627\u0631\u062F\u0646\u060C \u067E\u0627\u0645\u067E\u06D5\u0631\u060C \u0686\u06D5\u0646\u062F \u062C\u0644\u060C \u0648 \u0628\u06D5\u0631\u0647\u06D5\u0645\u06CC \u067E\u0627\u06A9\u06A9\u0631\u062F\u0646\u06D5\u0648\u06D5\u06CC \u0646\u06D5\u0631\u0645\u002E \u0632\u06CC\u0627\u062A\u0631 \u0644\u06D5 \u06A9\u0627\u062A\u06CC \u06A9\u06D5 \u062F\u06D5\u0632\u0627\u0646\u06CC\u062A \u0686\u06CC \u06AF\u0648\u0646\u062C\u0627\u0648\u06D5\u002E",
  eBody2:
    "\u0628\u06D5\u0631\u0647\u06D5\u0645\u06CC \u06AF\u0631\u0627\u0646 \u0644\u06D5 \u0647\u06D5\u0641\u062A\u06D5 \u0633\u06D5\u0631\u06D5\u062A\u0627\u06CC\u06CC\u06D5\u06A9\u0627\u0646 \u06A9\u06D5\u0645 \u067E\u06CE\u0648\u06CC\u0633\u062A\u0646\u002E \u0645\u062A\u0645\u0627\u0646\u0647 \u0628\u06D5 \u0695\u06CE\u0646\u0645\u0627\u06CC\u06CC \u067E\u0632\u06CC\u0634\u06A9 \u0628\u06D5 \u0643\u0648\u0631\u0633\u06CC \u0626\u06CC\u062A\u06CC\u0645\u0628\u06CC\u0644\u060C \u067E\u06CE\u0648\u06D5\u0631\u06CC \u06AF\u06D5\u0631\u0645\u06CC\u060C \u0648 \u0628\u06D5\u0631\u0647\u06D5\u0645\u06CC \u062A\u0627\u06CC\u0628\u06D5\u062A\u002E",
  cTitle: "\u06A9\u06D5\u06CC \u067E\u06D5\u06CC\u0648\u06D5\u0646\u062F\u06CC \u0628\u06A9\u06D5\u061F",
  cExcerpt:
    "\u0645\u062A\u0645\u0627\u0646\u0647 \u0628\u06D5 \u0647\u06D5\u0633\u062A\u002E \u06A9\u0627\u062A\u06CE\u06A9 \u06AF\u0648\u0645\u0627\u0646\u062A \u0647\u06D5\u0628\u0648\u0648\u060C \u067E\u06D5\u06CC\u0648\u06D5\u0646\u062F\u06CC \u0628\u06D5 \u062A\u06CC\u0645\u06D5 \u0686\u0627\u0648\u062F\u06CE\u0631\u06CC\u06CC\u06D5\u06A9\u06D5\u062A \u0647\u06D5\u0645\u06CC\u0634\u06D5 \u06AF\u0648\u0646\u062C\u0627\u0648\u06D5 \u2014 \u0632\u0648\u0648 \u0628\u06D5\u0647\u062A\u0631\u06D5\u002E",
  cBody1:
    "\u0628\u06D5 \u0645\u0646\u062F\u0627\u0644\u003A \u06AF\u06D5\u0631\u0645\u06CC \u0644\u06D5 \u062E\u0648\u0627\u0631 \u0633\u06CE \u0645\u0627\u0646\u06AF\u060C \u06A9\u06CE\u0634\u06D5\u06CC \u0647\u06D5\u0646\u0627\u0633\u06D5\u060C \u067E\u0627\u0645\u067E\u06D5\u0631\u06CC \u062A\u06D5\u0631 \u06A9\u06D5\u0645\u060C \u0695\u0634\u0627\u0646\u06D5\u0648\u06D5\u06CC \u0628\u06D5\u0647\u06CE\u0632\u060C \u06CC\u0627\u0646 \u0644\u0627\u0648\u0627\u0632\u06CC \u0628\u06B5 \u0648\u06D5\u0644\u0627\u0645 \u2014 \u0632\u0648\u0648 \u067E\u06D5\u06CC\u0648\u06D5\u0646\u062F\u06CC \u0628\u06A9\u06D5\u002E",
  cBody2:
    "\u0628\u06D5 \u062E\u06C6\u062A\u003A \u062E\u0648\u0646\u0628\u0627\u0631\u06CC \u0642\u0648\u0631\u0633\u060C \u0626\u0627\u0632\u0627\u0631\u06CC \u062A\u0648\u0646\u062F\u060C \u06AF\u06D5\u0631\u0645\u06CC\u060C \u0626\u0627\u0632\u0627\u0631\u06CC \u0633\u06CC\u0646\u06D5\u060C \u06CC\u0627\u0646 \u0628\u06CC\u0631\u06A9\u0627\u0631\u062F\u0646\u06D5\u0648\u06D5\u06CC \u0632\u06CC\u0627\u0646 \u2014 \u0686\u0627\u0648\u062F\u06CE\u0631\u06CC \u0641\u0648\u0631\u06CC\u002E \u0626\u06D5\u0645\u06D5 \u0695\u06CE\u0646\u0645\u0627\u06CC\u06CC \u067E\u06D5\u0631\u0648\u06D5\u0631\u062F\u06D5\u06CC\u06CC\u06D5\u061B \u062C\u06CC\u06AF\u06D5\u06CC \u0626\u0627\u0645\u06CC\u0695\u06AF\u0627\u0631\u06CC \u067E\u0632\u06CC\u0634\u06A9 \u0646\u0627\u06AF\u0631\u06CC\u062A\u06D5\u0648\u06D5\u002E",
  sTitle: "\u0686\u0627\u0648\u062F\u06CE\u0631\u06CC \u062E\u06C6\u062A \u062E\u06CC\u0627\u0646\u06D5\u062A \u0646\u06CC\u06CC\u06D5\u061F",
  sExcerpt:
    "\u067E\u0634\u0648\u0648\u060C \u062E\u0648\u0627\u0631\u062F\u0646\u060C \u0648 \u067E\u06D5\u06CC\u0648\u06D5\u0646\u062F\u06CC \u0628\u0686\u0648\u0648\u06A9 \u0626\u06D5\u0648 \u0648\u0632\u06CE\u06CC\u06D5\u06CC \u06A9\u06D5 \u062F\u06D5\u062F\u06D5\u06CC\u062A \u0628\u06D5 \u0645\u0646\u062F\u0627\u0644 \u062F\u0648\u0648\u0627\u0631 \u067E\u0631 \u062F\u06D5\u06A9\u0627\u062A\u06D5\u0648\u06D5\u002E",
  sBody1:
    "\u0628\u062E\u06C6 \u06A9\u0627\u062A\u06CE\u06A9 \u062F\u06D5\u062A\u0648\u0627\u0646\u06CC\u062A\u060C \u0626\u0627\u0648 \u0628\u062E\u06C6\u0631\u06D5\u0648\u06D5 \u0644\u06D5 \u0695\u06CC\u0695\u062F\u0627\u060C \u0648 \u06CC\u0627\u0631\u0645\u06D5\u062A\u06CC \u0644\u06D5 \u062E\u0648\u0627\u0631\u062F\u0646\u062F\u0627 \u0642\u0628\u0648\u0644 \u0628\u06A9\u06D5\u002E \u06CC\u06D5\u06A9 \u062D\u06D5\u0645\u0627\u0645 \u06CC\u0627\u0646 \u067E\u06CC\u0627\u0633\u06D5\u06CC\u06D5\u06A9\u06CC \u0643\u0648\u0631\u062A \u062F\u06D5\u062A\u0648\u0627\u0646\u06CC\u062A \u0695\u06CC\u0695\u06CE\u06A9\u06CC \u0642\u0648\u0631\u0633 \u0628\u06AF\u0648\u0647\u06D5\u0631\u06CE\u062A\u002E",
  sBody2:
    "\u0644\u06D5 \u06CC\u06D5\u06A9 \u06A9\u06D5\u0633\u06CC \u0645\u062A\u0645\u0627\u0646\u0647\u067E\u06CE\u06A9\u0631\u0627\u0648 \u0628\u06D5 \u0628\u06D5\u0631\u062F\u0648\u0627\u0645\u06CC \u067E\u06D5\u06CC\u0648\u06D5\u0646\u062F\u06CC \u0628\u06A9\u06D5 \u2014 \u0647\u06D5\u06A4\u0627\u0644\u060C \u0645\u0627\u0644\u0628\u0627\u062A\u060C \u06CC\u0627\u0646 \u06AF\u0631\u0648\u067E\u06CC \u067E\u0634\u062A\u06AF\u06CC\u0631\u002E \u062A\u0646\u06CC\u0627\u06CC\u06CC \u0645\u0627\u0646\u062F\u0648\u0648\u0628\u0648\u0648\u0646 \u0645\u06D5\u0632\u06CE\u0646 \u062F\u06D5\u06A9\u0627\u062A\u003B \u062F\u06D5\u0646\u06AF \u06A9\u06D5\u0645 \u062F\u06D5\u06A9\u0627\u062A\u002E",
  fTitle:
    "\u0633\u0627\u0644\u06CC \u06CC\u06D5\u06A9\u06D5\u0645 \u062F\u06D5\u06AF\u0627\u062A\u06D5 \u067E\u06CE\u0634\u06D5\u0648\u06D5\u002E",
  fExcerpt:
    "\u0647\u06D5\u0631 \u0645\u0646\u062F\u0627\u0644 \u0628\u06D5 \u062E\u0648\u06CC \u062E\u0648 \u062F\u06D5\u0695\u06CC\u062A\u002E \u0647\u06D5\u0646\u06AF\u0627\u0648\u06CC \u0628\u0686\u0648\u0648\u06A9 \u0626\u0627\u0647\u06D5\u0646\u06AF \u0628\u06AF\u0631\u06D5 \u0648 \u0645\u062A\u0645\u0627\u0646\u0647 \u0628\u06D5 \u067E\u06D5\u06CC\u0648\u06D5\u0646\u062F\u06CC \u06A9\u06D5 \u062F\u0631\u0648\u0633\u062A \u062F\u06D5\u06A9\u06D5\u06CC\u062A\u002E",
  fBody1:
    "\u067E\u06CE\u06A9\u06D5\u0646\u06CC\u060C \u06AF\u06D5\u0695\u0627\u0646\u060C \u062F\u0627\u0646\u06CC\u0634\u062A\u0646\u060C \u06CC\u06D5\u06A9\u06D5\u0645 \u067E\u06CE\u06CC\u0648\u06CC \u2014 \u0645\u06D5\u0648\u062F\u06D5 \u062C\u06CC\u0627\u0648\u0627\u0632\u06D5 \u0648 \u0647\u06D5\u0631 \u0647\u06D5\u0646\u06AF\u0627\u0648 \u0644\u06D5 \u0646\u0627\u0648\u0686\u06CC \u06AF\u06D5\u0634\u06D5\u06CC \u0633\u0627\u0644\u0645 \u062F\u06D5\u06AF\u0631\u06CE\u062A\u002E \u0628\u06D5\u0631\u0627\u0648\u06D5\u0631\u062F \u062E\u06C6\u0634\u06CC \u062F\u06D5\u062F\u0632\u06CE\u0646\u06CC\u062A\u003B \u062D\u06D5\u0632\u062F\u0627\u0631\u06CC \u062F\u06D5\u06AF\u06D5\u06CC\u062A\u06D5\u0648\u06D5\u002E",
  fBody2:
    "\u0633\u06D5\u0631\u062F\u0627\u0646\u06CC \u0645\u0646\u062F\u0627\u0644\u06CC \u0633\u0627\u0644\u0645 \u0648 \u06A4\u0627\u06A9\u0633\u06CC\u0646 \u0648\u06A9 \u067E\u0632\u06CC\u0634\u06A9 \u0695\u06CE\u0646\u0645\u0627\u06CC\u06CC \u062F\u06D5\u06A9\u0627\u062A\u002E \u067E\u0631\u0633\u06CC\u0627\u0631 \u0628\u06CE\u0646\u06D5 \u2014 \u0646\u06CE\u06AF\u06D5\u0631\u0627\u0646\u06CC \u0628\u0686\u0648\u0648\u06A9 \u0646\u06CC\u06CC\u06D5 \u0628\u06D5 \u062A\u06CC\u0645\u06D5 \u0686\u0627\u0648\u062F\u06CE\u0631\u06CC\u06CC\u06D5\u06A9\u06D5\u002E",
};

for (const v of Object.values(ku)) {
  if (/[a-zA-Z]/.test(v)) throw new Error("Latin in: " + v);
}

const header = `import { bi } from "../utils/locale.js";

export const LEARN_ARTICLES = [
  {
    id: "welcome-motherhood",
    slug: "welcome-to-motherhood",
    title: bi("Welcome to Your New Chapter", "بەخێربێیت بۆ بەشێکی نوێ"),
    excerpt: bi(
      "The first days with a newborn are tender and intense. You do not need to have it all figured out — learning together is enough.",
      "ڕۆژە سەرەتاییەکان لەگەڵ نوێ لەدایکبوو نەرم و توندن. پێویست نییە هەموو شت بزانیت — فێربوون پێکەوە بەسە."
    ),
    body: [
      bi(
        "Becoming a mother is not a single moment — it unfolds in quiet feeds, sleepless nights, and small discoveries. Give yourself permission to move slowly and ask questions without shame.",
        "دایکبوون کاتێک نییە — لە خواردنی نەرم، شەوی بێخەو، و دۆزینەوەی بچووکدا دەردەکەوێت. مافی خۆت بدە بە هێواش بچیت و بێ شەرم پرسیار بکە."
      ),
      bi(
        "Your baby is learning you as much as you are learning them. Eye contact, gentle touch, and your voice build safety. There is no perfect script — presence matters most.",
        "منداڵەکەت هەنگاو بە هەنگاو فێر دەبێت وەک ئەوەی تۆ فێری ئەو دەبیت. تێکەڵاوی چاو، دەست لێدانی نەرم، و دەنگت ئاسوودەیی دروست دەکات. هیچ شێوازێکی تەواو نییە — ئامادەبوون گرنگترینە."
      ),
    ],
    tags: ["newborn", "emotional", "basics"],
    minutes: 4,
  },
  {
    id: "bonding-baby",
    slug: "bonding-with-your-baby",
    title: bi("Bonding in Small Moments", "پەیوەندی لە ساتە بچووکەکان"),
    excerpt: bi(
      "Bonding is not one grand event — it grows through everyday care, voice, and closeness.",
      "پەیوەندی یەک ڕووداوی گەورە نییە — لە خواردن، دەنگ، و نزیکبوونەوە گەشە دەکات."
    ),
    body: [
      bi(
        "Hold your baby skin-to-skin when you can. Talk during diaper changes, feeds, and walks. These ordinary moments teach your baby that the world is safe.",
        "کاتێک دەتوانیت منداڵ لە پێستی خۆتدا بگرە. لە کاتی گۆڕینی پامپەر، خواردن، و پیاسەدا قسە بکە. ئەم ساتە ئاساییانە فێری منداڵ دەکەن کە جیهان سالمە."
      ),
      bi(
        "If bonding feels slow, that is common too — especially after a difficult birth or when you are exhausted. Connection deepens over time, not on a deadline.",
        "ئەگەر پەیوەندی هێواش بوو، ئەمەش ئاساییە — تایبەتەن دوای لەدایکبوونێکی قورس یان کاتی ماندووبوون. پەیوەندی بە کات قووڵتر دەبێت، نەک لە کاتی کۆتایی."
      ),
    ],
    tags: ["bonding", "newborn", "emotional"],
    minutes: 5,
  },
  {
    id: "feeding-confidence",
    slug: "feeding-with-confidence",
    title: bi("Feeding With Confidence", "خواردن بە متمانە"),
    excerpt: bi(
      "Whether breast, bottle, or both — responsive feeding and your calm presence matter most.",
      "بە شیر، شیشە، یان هەردوو — خواردنی وەڵامدار و ئارامی تۆ گرنگترینە."
    ),
    body: [
      bi(
        "Watch for hunger cues — rooting, hands to mouth, fussiness — rather than the clock alone. Feeding on demand is widely recommended for newborns.",
        "نیشانەی برسی ببینە — گەڕان بۆ دەم، دەست بۆ دەم، نارەحەتی — نەک تەنها کات. خواردن بە داوای منداڵ بۆ نوێ لەدایکبوو زۆر پێشنیار دەکرێت."
      ),
      bi(
        "If you supplement or formula-feed, you are still nourishing your baby well. Ask your clinician about amounts, preparation, and any concerns — there is no shame in asking.",
        "ئەگەر تکمیل یان شیرێکی دەستکرد بدەیت، هێشتا منداڵ بە باشی دەخۆرێنیت. لە پزیشک بپرسە دەربارەی بڕ، ئامادەکردن، و هەر نیگەرانییەک — بێ شەرم پرسیار بکە."
      ),
    ],
    tags: ["feeding", "newborn", "practical"],
    minutes: 6,
  },
  {
    id: "sleep-reality",
    slug: "sleep-in-the-first-months",
    title: bi("Sleep — What to Expect", "خەو — چی چاوەڕوان بکە"),
    excerpt: bi(
      "Newborn sleep is fragmented and unpredictable. Safe sleep practices protect while you rest when you can.",
      "خەوی منداڵی نوێ پارچە و ناڕێکە. ڕێکارەکانی خەوی سالم پارێزگاری دەکات لەکاتێکدا دەتوانیت بخەویت."
    ),
    body: [
      bi(
        "Babies wake often — for feeds, comfort, and development. Short stretches of sleep are normal; so is needing help at night.",
        "منداڵ زۆر هەست دەکاتەوە — بۆ خواردن، ئاسوودەیی، و گەشە. بەشە کورتەکانی خەو ئاساییە؛ هەروەها پێویستی بە یارمەتی لە شەودا."
      ),
      bi(
        "Place baby on their back in a clear sleep space — firm surface, no loose blankets. Room-sharing without bed-sharing is recommended for the first months.",
        "منداڵ بە پشت لە شوێنێکی خەوی پاکدا بخەوێنە — ڕووێکی جێگیر، بێ پۆشینی شل. هاوبەشی ژوور بەبێ هاوبەشی جگەرە بۆ مانگە سەرەتاییەکان پێشنیار دەکرێت."
      ),
    ],
    tags: ["sleep", "safety", "newborn"],
    minutes: 5,
  },
  {
    id: "postpartum-recovery",
    slug: "gentle-postpartum-recovery",
    title: bi("Your Body After Birth", "لەشت دوای لەدایکبوون"),
    excerpt: bi(
      "Recovery takes weeks, not days. Bleeding, soreness, and fatigue are part of healing — rest is part of care.",
      "چاکبوونەوە هەفتە دەوێت، نەک ڕۆژ. خونباری، نارەحەتی، و ماندووبوون بەشێک لە چاکبوون — پشوو بەشێک لە چاودێریە."
    ),
    body: [
      bi(
        "Lochia — postpartum bleeding — usually lightens over time. Pads, comfortable underwear, and gentle movement support healing.",
        "خونباری دوای لەدایکبوون — بە کاتێک کەم دەبێت. پامپەر، جلێکی ئاسوودە، و جوڵەی نەرم یارمەتی چاکبوون دەدات."
      ),
      bi(
        "Pelvic floor and abdominal changes are gradual. Avoid comparing your timeline to others. Your clinician can guide when to resume exercise.",
        "گۆڕانکارییەکانی ناوچەی لاوە و سک هێواش دەبێت. خۆت لە کەسانی تر مەبەرەوە. پزیشک ڕێنمایی دەکات کەی بگەڕێیتەوە بۆ وەرزش."
      ),
    ],
    tags: ["recovery", "postpartum", "body"],
    minutes: 6,
  },
  {
    id: "partner-support",
    slug: "support-from-your-partner",
    title: bi("Sharing the Load", "هاوبەشکردنی بار"),
    excerpt: bi(
      "Partners and support people can lighten daily care — communication and small tasks add up.",
      "هاوسەر و کەسانی پشتگیر دەتوانن بارەی ڕۆژانە سوک بکەن — گفتوگۆ و کارە بچووکەکان کۆ دەبن."
    ),
    body: [
      bi(
        "Be specific about what helps — a nap, a meal, holding baby while you shower. Vague offers are harder to accept; clear requests build teamwork.",
        "دیار بکە چی یارمەتی دەدات — خەوێک، خواردن، گرتنی منداڵ لەکاتی حەمام. پێشنیاری نادیار قورسە قبوڵ بکرێت؛ داوای ڕاست تیمکاری دروست دەکات."
      ),
      bi(
        "Partners may feel unsure too. Include them in feeds, bathing, and soothing when safe — confidence grows with practice.",
        "هاوسەریش لەوانەیە نادڵنی بێت. ئەوان لە خواردن، حەمام، و ئارامکردندا بەشدار بکە کاتێک سالمە — بە ڕاهێنان متمانە گەشە دەکات."
      ),
    ],
    tags: ["partner", "support", "practical"],
    minutes: 4,
  },
  {
    id: "mental-health",
    slug: "emotional-health-after-birth",
    title: bi("Emotional Health Matters", "تەندروستی هەستی گرنگە"),
    excerpt: bi(
      "Baby blues, anxiety, and low mood are common — and treatable. You deserve support without judgment.",
      "هەستی منداڵانە، نیگەرانی، و هەستی کەم ئاساییە — و دەکرێت چارەسەر بکرێت. شایستەی پشتگیری بیت بێ حوکم."
    ),
    body: [
      bi(
        "Hormonal shifts after birth can bring tears, irritability, or feeling disconnected. If low mood lasts beyond two weeks or feels overwhelming, reach out.",
        "گۆڕانکاری هۆرمۆن دوای لەدایکبوون گرین، تیژی، یان هەستی دوورکەوتنەوە دەهێنێت. ئەگەر هەستی کەم زیاتر لە دوو هەفتە بێت یان زۆر سەرقاڵ بێت، پەیوەندی بکە."
      ),
      bi(
        "Thoughts of harming yourself or your baby need urgent care — not shame. Contact your clinician, midwife, or emergency services. You are not alone.",
        "بیرکردنەوەی زیانگەیاندن بە خۆت یان منداڵ پێویستی بە چاودێری فوری هەیە — نەک شەرم. پەیوەندی بە پزیشک، مامانی، یان فریاگوزاری بکە. تەنیا نیت."
      ),
    ],
    tags: ["mental-health", "postpartum", "support"],
    minutes: 7,
  },
`;

const tail = `
  {
    id: "visitors-boundaries",
    slug: "visitors-and-boundaries",
    title: bi("Visitors and Gentle Boundaries", "مێوان و سنووری نەرم"),
    excerpt: bi(
      "You may set limits on visits, holding, and advice. Protecting rest is part of caring for your baby.",
      "${ku.vExcerpt}"
    ),
    body: [
      bi(
        "It is okay to ask visitors to wash hands, keep visits short, or come back later. Your recovery and baby's immune system are still settling.",
        "${ku.vBody1}"
      ),
      bi(
        "Unsolicited advice can feel heavy. A simple thank-you and redirect — or asking your partner to field questions — preserves peace.",
        "${ku.vBody2}"
      ),
    ],
    tags: ["visitors", "boundaries", "practical"],
    minutes: 4,
  },
  {
    id: "baby-essentials",
    slug: "what-baby-really-needs",
    title: bi("What Baby Really Needs", "${ku.eTitle}"),
    excerpt: bi(
      "Beyond gear and gadgets — warmth, milk, clean diapers, and your responsive presence cover most needs.",
      "${ku.eExcerpt}"
    ),
    body: [
      bi(
        "Start simple: safe sleep space, feeding supplies, diapers, a few outfits, and gentle cleansing products. Add items as you discover what suits your family.",
        "${ku.eBody1}"
      ),
      bi(
        "Expensive items are rarely essential in early weeks. Trust your clinician's guidance on car seats, thermometers, and any specialty products.",
        "${ku.eBody2}"
      ),
    ],
    tags: ["essentials", "gear", "practical"],
    minutes: 5,
  },
  {
    id: "when-to-call",
    slug: "when-to-call-for-help",
    title: bi("When to Call for Help", "${ku.cTitle}"),
    excerpt: bi(
      "Trust your instincts. When in doubt, contacting your care team is always reasonable — early is better than late.",
      "${ku.cExcerpt}"
    ),
    body: [
      bi(
        "For baby: fever in infants under three months, breathing difficulty, fewer wet diapers, projectile vomiting, or unresponsive limpness — call promptly.",
        "${ku.cBody1}"
      ),
      bi(
        "For you: heavy bleeding, severe pain, fever, chest pain, or thoughts of harm — seek urgent care. This guide educates; it does not replace clinical advice.",
        "${ku.cBody2}"
      ),
    ],
    tags: ["safety", "urgent", "guidance"],
    minutes: 5,
  },
  {
    id: "self-care",
    slug: "self-care-for-new-mothers",
    title: bi("Self-Care Is Not Selfish", "${ku.sTitle}"),
    excerpt: bi(
      "Small acts of rest, nourishment, and connection refill the energy you give your baby.",
      "${ku.sExcerpt}"
    ),
    body: [
      bi(
        "Eat when you can, sip water through the day, and accept help with meals. One shower or short walk can shift a difficult afternoon.",
        "${ku.sBody1}"
      ),
      bi(
        "Connect with one trusted person regularly — a friend, family member, or support group. Isolation magnifies exhaustion; voice shrinks it.",
        "${ku.sBody2}"
      ),
    ],
    tags: ["self-care", "postpartum", "emotional"],
    minutes: 5,
  },
  {
    id: "first-year",
    slug: "the-first-year-unfolding",
    title: bi("The First Year Unfolds", "${ku.fTitle}"),
    excerpt: bi(
      "Each baby follows their own pace. Celebrate small steps and trust the relationship you are building.",
      "${ku.fExcerpt}"
    ),
    body: [
      bi(
        "Smiles, rolling, sitting, first words — ranges vary widely and still fall within healthy development. Comparison steals joy; curiosity restores it.",
        "${ku.fBody1}"
      ),
      bi(
        "Keep well-baby visits and vaccinations as your clinician advises. Bring questions — no concern is too small for a caring team.",
        "${ku.fBody2}"
      ),
    ],
    tags: ["milestones", "first-year", "development"],
    minutes: 6,
  },
];
`;

const out =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/learnArticles.js";
writeFileSync(out, header + tail);
console.log("OK", out);
