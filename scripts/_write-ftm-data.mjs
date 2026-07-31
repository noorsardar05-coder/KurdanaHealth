import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "src/features/first-time-mothers/data");

const babyCare = `import { bi } from "../utils/locale.js";

export const BABY_AGE_BANDS = [
  {
    id: "newborn",
    ageRange: "0-2w",
    title: bi("Newborn (0–2 weeks)", "نوێ لەدایکبوو (٠–٢ هەفتە)"),
    summary: bi(
      "The first two weeks are a gentle settling-in. Your baby is learning the world outside the womb — and you are learning them. Small routines and soft responses build trust on both sides.",
      "دوو هەفتەی یەکەم کاتێکی ئارامبوون و جێگیربوونە. منداڵەکەت فێری جیهانی دەرەوەی گەدە دەبێت — و تۆش فێری ئەو دەبیت. ڕۆتینی بچووک و وەڵامدانەوەی نەرم متمانە لە هەردوولا دروست دەکات."
    ),
  },
  {
    id: "weeks2to8",
    ageRange: "2-8w",
    title: bi("Early Weeks (2–8 weeks)", "هەفتە سەرەتاییەکان (٢–٨ هەفتە)"),
    summary: bi(
      "Patterns may begin to emerge, though days can still feel unpredictable. Feeding, sleep, and crying often peak in intensity — this phase passes, and your confidence grows with each day.",
      "شێوازەکان لەوانەیە دەست پێبکەن، هەرچەندە ڕۆژەکان هێشتا ناڕێک دەردەکەون. خواردن، خەو، و گریان زۆرجار لە ئاستی بەرزدا دەبن — ئەم قۆناغە تێدەپەڕێت و متمانەکەت لەگەڵ هەر ڕۆژێکدا زیاد دەبێت."
    ),
  },
  {
    id: "months2to4",
    ageRange: "2-4m",
    title: bi("Growing Baby (2–4 months)", "منداڵی گەشەکردوو (٢–٤ مانگ)"),
    summary: bi(
      "Smiles, coos, and longer awake windows arrive. Your baby is becoming more social and curious. Care routines stay simple — consistency and warmth matter more than perfection.",
      "پێکەنین، دەنگی نەرم، و کاتەکانی هۆشیاری درێژتر دێن. منداڵەکەت کۆمەڵایەتی و حەزداری زیاتر دەبێت. ڕۆتینی چاودێری سادە دەمێنێتەوە — بەردەوامی و گەرمی گرنگترە لە تەواوبوون."
    ),
  },
  {
    id: "months4to6",
    ageRange: "4-6m",
    title: bi("Ready to Explore (4–6 months)", "ئامادە بۆ گەڕان (٤–٦ مانگ)"),
    summary: bi(
      "Rolling, reaching, and interest in the world around them mark this stage. Sleep may shift again. Safety and responsive care remain your steady anchors.",
      "گەڕان، درێژکردنەوە، و حەزداری بۆ جیهانی دەوروبەر نیشانەی ئەم قۆناغەن. خەو لەوانەیە دووبارە بگۆڕێت. سالمبوون و چاودێری وەڵامدانەوە هێشتا پێگەی جێگیرت دەبن."
    ),
  },
  {
    id: "months6to12",
    ageRange: "6-12m",
    title: bi("First Year Unfolding (6–12 months)", "یەکەم ساڵ دەگاتە پێشەوە (٦–١٢ مانگ)"),
    summary: bi(
      "Sitting, crawling, first foods, and personality shining through. Each baby follows their own timeline. Celebrate small steps and trust your growing instincts.",
      "دانیشتن، خزاندن، یەکەم خواردن، و کەسایەتی دەردەکەوێت. هەر منداڵێک بە کاتێکی خۆی دەڕوات. هەنگاوە بچووکەکان ئاهەنگ بگرە و متمانە بە هەستە گەشەکردووەکانت بکە."
    ),
  },
];

export const BABY_TOPICS = [
  {
    id: "diapering",
    title: bi("Diapering with Care", "گۆڕینی پامپەر بە چاودێری"),
    body: [
      bi(
        "Diaper changes happen many times a day — each one is a quiet moment of connection. Lay your baby on a safe, flat surface and keep supplies within reach so you can move calmly and without rush.",
        "گۆڕینی پامپەر چەندین جار لە ڕۆژدا ڕوودەدات — هەر جارێک ساتێکی بێدەنگی پەیوەندییە. منداڵەکەت لەسەر ڕوویەکی سالم و ڕێک دابنێ و پێداویستیەکان لە دەستتدا بهێڵەوە بۆ ئەوەی بە ئارامی و بێ پەلە بجوڵیت."
      ),
      bi(
        "Clean gently from front to back, especially for girls, to protect delicate skin. Allow a moment of bare skin when possible — fresh air helps prevent irritation. A thin barrier cream can soothe if the area looks pink.",
        "بە نەرمی لە پێشەوە بۆ دواوە پاک بکەوە، بەتایبەت بۆ کچان، بۆ پاراستنی پێستی ناسک. کاتێک دەتوانی ساتێک پێستی ڕووت بهێڵەوە — هەوای تازە یارمەتی کەمکردنەوەی ئازار دەدات. کرمی پاراستنی نازک دەتوانێت ئارام بکات ئەگەر ناوچەکە ڕەنگی پەمەیی هەبێت."
      ),
      bi(
        "A snug but comfortable fit prevents leaks without pinching. Fasten tapes evenly and check that nothing rubs the umbilical area in early weeks. Trust your hands — you will find a rhythm that suits you both.",
        "گونجاندنێکی باش بەڵام ئاسوودە ڕێگری لە تێپەڕاندن دەکات بەبێ فشار. چسپاندنەکان بە یەکسانی بکە و دڵنیابە لە هەفتە سەرەتاییەکان هیچ شتێک لە ناوچەی ناف ناگریت. متمانە بە دەستەکانت بکە — ڕیتمێک دەدۆزیتەوە کە بۆ هەردووکتان گونجاوە."
      ),
    ],
    tips: [
      bi("Warm wipes in your palm on cold days — small comfort matters", "لە ڕۆژانی سارد دەستکێشەکان لە کەفەکەتدا گەرم بکە — ئاسوودەیی بچووک گرنگە"),
      bi("Talk or sing during changes — it builds calm association", "لە کاتی گۆڕاندندا قسە بکە یان گۆرانی بڵێ — پەیوەندی ئارام دروست دەکات"),
      bi("Stock diapers in several rooms to reduce trips", "پامپەر لە چەند ژوورێکدا هەڵبگرە بۆ کەمکردنەوەی گەڕان"),
      bi("Log wet and dirty nappies if your clinician asks — it helps track feeding", "پامپەری تەڕ و پیس تۆمار بکە ئەگەر پزیشک داوای کرد — یارمەتی شوێنکەوتنی خواردن دەدات"),
    ],
    whenToAsk: [
      bi("Persistent rash that does not improve with gentle care", "پەستنی بەردەوام کە لەگەڵ چاودێری نەرم باشتر نابێت"),
      bi("Blood in stool or unusual discharge in the diaper", "خوێن لە ڕشانەوە یان دەرچوونی نائاسایی لە پامپەر"),
      bi("Fewer wet diapers than expected for your baby's age", "پامپەری تەڕ کەمتر لە چاوەڕوانکراو بۆ تەمەنی منداڵ"),
    ],
  },
  {
    id: "bathing",
    title: bi("Gentle Bathing", "حەمامی نەرم"),
    body: [
      bi(
        "Newborns do not need daily baths — two or three times a week is often enough until they become more active. Sponge baths work well until the umbilical cord stump has healed and fallen off.",
        "نوێ لەدایکبووەکان پێویستیان بە حەمامی ڕۆژانە نییە — دوو یان سێ جار لە هەفتەیەکدا زۆرجار بەسە تا چالاکتر دەبن. حەمامی بە دەستکێش باشە تا ناف چاک بێت و بیپەڕێت."
      ),
      bi(
        "Prepare everything before you begin: warm water, a soft cloth, towel, clean diaper, and clothes. Test water temperature with your elbow — it should feel comfortably warm, never hot.",
        "پێش دەستپێکردن هەموو شت ئامادە بکە: ئاوی گەرم، دەستکێشێکی نەرم، خاولی، پامپەری پاک، و جل. پلەی گەرمی ئاو بە ئەژنۆت بپشکنە — دەبێت گەرم و ئاسوودە هەست بکرێت، هەرگیز گەرم نەبێت."
      ),
      bi(
        "Support the head and neck throughout. Wash face first, then body, saving the diaper area for last. Pat dry gently, especially skin folds. A bath can become a soothing bedtime ritual as your baby grows.",
        "سەر و مل پشتگیری بکە لە هەموو کاتدا. سەرەتا دەموچاو بشۆ، دواتر لەش، ناوچەی پامپەر بۆ کۆتایی بهێڵەوە. بە نەرمی وشک بکەوە، بەتایبەت لە چەناکەکان. حەمام دەتوانێت وەک قۆناغی گەشەکردن عادتی ئارامبوونی کاتی خەو بێت."
      ),
    ],
    tips: [
      bi("Bath before a feed when baby is calm, not hungry or overtired", "حەمام پێش خواردن کاتێک منداڵ ئارامە، نەک برسی یان زۆر ماندوو"),
      bi("Never leave baby alone in or near water — even for a moment", "منداڵ بە تەنیا لە نزیک یان لەناو ئاو مەهێڵەوە — تەنانەت بۆ ساتێک"),
      bi("Plain water is enough for most newborn baths — no soap needed every time", "ئاوی سادە بۆ زۆربەی حەمامەکانی نوێ لەدایکبوو بەسە — هەر جارێک سابون پێویست نییە"),
      bi("Keep room warm to prevent chilling when undressed", "ژوور گەرم بهێڵەوە بۆ ڕێگریکردن لە ساردبوون کاتێک جل لادەبرێت"),
    ],
    whenToAsk: [
      bi("Cord area looks red, swollen, or has an unpleasant smell", "ناوچەی ناف سوور، ئاوساو، یان بۆنی خراپ هەبێت"),
      bi("Skin blisters, peeling with redness, or widespread rash after bathing", "بۆرە، پووکانەوە لەگەڵ سووری، یان پەستنی بەرفراوان دوای حەمام"),
      bi("Baby seems very distressed during every bath — ask about gentle alternatives", "منداڵ لە هەموو حەمامێکدا زۆر نارەحەت دەبێت — لە ڕێگای نەرمتر بپرسە"),
    ],
  },
  {
    id: "cord",
    title: bi("Umbilical Cord Care", "چاودێری نافی منداڵ"),
    body: [
      bi(
        "The umbilical cord stump dries and falls off naturally, usually within one to three weeks. Until then, keep the area clean and dry — fold the diaper below the stump so it is not rubbed or covered in moisture.",
        "نافی منداڵ بە سروشتی وشک دەبێت و دەپەڕێت، بەزۆری لە نێوان یەک تا سێ هەفتەدا. تا ئەو کاتە ناوچەکە پاک و وشک بهێڵەوە — پامپەر لە خوارەوەی ناف بگرە بۆ ئەوەی نەگریت یان شل نەبێت."
      ),
      bi(
        "Sponge baths rather than full immersion help keep the stump dry. Some clinicians recommend wiping with plain water or alcohol — follow the guidance your care team gives you.",
        "حەمامی بە دەستکێش لە جیاتی تەواو لە ئاودا ماندن یارمەتی وشک ماندنی ناف دەدات. هەندێک پزیشک پاککردنەوە بە ئاوی سادە یان کحول پێشنیار دەکەن — ڕێنمایی تیمە چاودێریەکەت جێبەجێ بکە."
      ),
      bi(
        "A small amount of dried blood or slight odor can be normal as it separates. Avoid pulling the stump — it will come away on its own when ready. Once it falls off, continue gentle cleaning until fully healed.",
        "بڕێکی کەم خوێنی وشک یان بۆنێکی کەم لەوانەیە ئاسایی بێت لەکاتی جیابوونەوە. نافەکە مەکێشە — بەخۆی دەپەڕێت کاتێک ئامادە دەبێت. دوای پەڕین، بەردەوام بە پاککردنەوەی نەرم تا تەواو چاک بێت."
      ),
    ],
    tips: [
      bi("Dress in loose tops or fold waistbands below the stump", "جلێکی شل بپۆشە یان کمر لە خوارەوەی ناف بگرە"),
      bi("Do not cover with tight bandages unless advised", "بە بەندێکی توند نادەپۆشێنە مەگەر ڕێنمایی کرابێت"),
      bi("Air exposure for short periods can help drying", "بەرکەوتنی هەوا بۆ ماوەیەکی کورت یارمەتی وشکبوون دەدات"),
      bi("Note the date it falls off for your health records if helpful", "ڕۆژی پەڕین تۆمار بکە بۆ تۆمارە تەندروستییەکانت ئەگەر یارمەتیدەرە"),
    ],
    whenToAsk: [
      bi("Redness spreading beyond the base, or pus-like discharge", "سووربوون کە لە بنەوە بڵاودەبێتەوە، یان دەرچوونی وەک پیسی"),
      bi("Fever, fussiness, or baby refusing feeds with cord concerns", "گەرمی، نارەحەتی، یان ڕەتکردنەوەی خواردن لەگەڵ نیگەرانی دەربارەی ناف"),
      bi("Stump has not fallen off by three weeks — your clinician can reassess", "ناف تا سێ هەفتە نەپەڕیوە — پزیشک دەتوانێت دووبارە پێداچوونەوە بکات"),
    ],
  },
  {
    id: "clothing",
    title: bi("Dressing Your Baby", "جلپۆشینی منداڵ"),
    body: [
      bi(
        "Babies regulate temperature differently from adults — they cannot easily tell you when they are too hot or cold. A simple rule: dress them in one more layer than you would wear in the same room.",
        "منداڵەکان پلەی گەرمی بە جیاوازی لە گەورەکان ڕێکدەخەن — بە ئاسانی ناتوانن بڵێن کاتێک زۆر گەرمن یان ساردن. یاسایەکی سادە: یەک چین زیاتر لەوەی تۆ لە هەمان ژووردا دەپۆشیت."
      ),
      bi(
        "Soft, breathable fabrics like cotton feel gentle on newborn skin. Avoid tight elastics, scratchy tags, or overdressing. Check the back of the neck — warm and dry usually means comfortable.",
        "قوماشی نەرم و هەناسەدار وەک لۆکە هەستی نەرم لەسەر پێستی نوێ لەدایکبوو دروست دەکات. کێشانی توند، تاگی خراپ، یان جلپۆشینی زۆر دوور بخەوە. پشتوی گردن بپشکنە — گەرم و وشک زۆرجار واتای ئاسوودەییە."
      ),
      bi(
        "Sleep sacks or swaddles can replace loose blankets for safer sleep. In warm climates, fewer layers may suffice. Trust touch over guesswork — your hands learn quickly what feels right.",
        "کیسەی خەو یان قوتقێن دەتوانێت جێگەی پۆشینی شل بگرێت بۆ خەوی سالمتر. لە کەشوهەوای گەرمدا لەوانەیە چینێکی کەمتر بەس بێت. متمانە بە دەست لێدان بکە لە جیاتی خەملاندن — دەستەکانت بە خێرایی فێر دەبن چی دروستە."
      ),
    ],
    tips: [
      bi("Mittens only if baby scratches face — remove when supervised awake", "دەستکێش تەنها ئەگەر دەموچاو دەخولێنێت — لاببە کاتێک هۆشیار و چاودێریکراوە"),
      bi("Hat indoors only if room is cool or clinician advised", "کڵاو لەناو ماڵ تەنها ئەگەر ژوور ساردە یان پزیشک ڕێنمایی کرد"),
      bi("Snap or zip front openings make nighttime changes easier", "کردنەوەی پێشەوە بە دوگمە یان زیپ گۆڕینی شەو ئاسانتر دەکات"),
      bi("Wash new clothes before first wear to soften and remove residues", "جلە نوێیەکان پێش یەکەم جار بشۆ بۆ نەرمبوون و لابردنی ماوە"),
    ],
    whenToAsk: [
      bi("Baby feels consistently cold despite extra layers", "منداڵ بەردەوام سارد دەردەکەوێت سەرەڕای چینی زیاتر"),
      bi("Heat rash, sweating, or flushed skin from overdressing", "پەستنی گەرمی، چڵەچڵە، یان پێستی سوور لە جلپۆشینی زۆر"),
      bi("Unsure how to dress for illness or fever — ask your care team", "نادڵنیایت چۆن بپۆشیت لە نەخۆشی یان گەرمی — لە تیمە چاودێریەکەت بپرسە"),
    ],
  },
  {
    id: "soothing",
    title: bi("Soothing Your Baby", "ئارامکردنی منداڵ"),
    body: [
      bi(
        "Newborns seek the closeness they knew in the womb — warmth, rhythm, and your voice. Holding, rocking, swaying, and skin-to-skin contact are not spoiling; they are how babies learn safety and calm.",
        "نوێ لەدایکبووەکان نزیکبوونەوە دەگەڕێن کە لە گەدا دەیناسن — گەرمی، ڕیتم، و دەنگی تۆ. بگرە، لەرزاندن، جوڵان، و پێست بە پێست خراپکردن نییە؛ ئەمە ڕێگەی فێربوونی منداڵە بۆ سالمبوون و ئارامبوون."
      ),
      bi(
        "The five S's — swaddle, side or stomach hold while awake, shush, swing, and suck — work for many families. Not every technique suits every baby; experiment gently and notice what helps.",
        "پێنج ش — قوتقێن، گرتن لە لاو یان سک کاتێک هۆشیارە، دەنگی ش، لەرزاندن، و مژاندن — بۆ زۆر خێزان کار دەکات. هەر تەکنیکێک بۆ هەر منداڵێک گونجاو نییە؛ بە نەرمی تاقی بکەوە و بزانە چی یارمەتیدەرە."
      ),
      bi(
        "Your calm matters as much as the technique. Take slow breaths, lower your shoulders, and remind yourself that fussiness is communication, not rejection. It is okay to put baby down safely and collect yourself for a moment.",
        "ئارامی تۆ بەها هەیە وەک تەکنیکەکە. هەناسە هێواش بکە، شانەکانت دابەزێنە، و بیرخستنەوە بکە کە نارەحەتی پەیامدانە، نەک ڕەتکردنەوە. باشە منداڵ بە سالم دابنێیت و ساتێک بۆ خۆت کۆبکەیتەوە."
      ),
    ],
    tips: [
      bi("White noise or a gentle hum mimics womb sounds", "دەنگی سپی یان دەنگێکی نەرم دەنگی گەدا دەلێنێت"),
      bi("Carry in a sling or wrap for hands-free closeness when safe", "لە کۆڵ یان پێچدا بگرە بۆ نزیکبوونەوە بەبێ دەست کاتێک سالمە"),
      bi("Dim lights and reduce stimulation when baby is overwhelmed", "ڕووناکی کەم بکە و هاندان کەم بکە کاتێک منداڵ زۆر سەرقاڵە"),
      bi("Tag-team with partner — soothing is shared work", "لەگەڵ هاوسەر دەستبەست بکە — ئارامکردن کاری هاوبەشە"),
    ],
    whenToAsk: [
      bi("Inconsolable crying for hours despite all soothing attempts", "گریانی ناچاربوون بۆ کاتژمێrەکان سەرەڕای هەموو هەوڵەکان"),
      bi("Baby arches stiffly or seems in pain when held certain ways", "منداڵ بە توندی قوس دەدات یان وەک ئازار هەست دەکات بە شێوەیەکی دیاریکراو"),
      bi("You feel overwhelmed or unable to cope — reach out for support", "هەست دەکەیت زۆر سەرقاڵیت یان ناتوانیت بەرگە بگریت — داوای پشتگیری بکە"),
    ],
  },
  {
    id: "crying",
    title: bi("Understanding Crying", "تێگەیشتن لە گریان"),
    body: [
      bi(
        "Crying is your baby's primary language in early weeks. Hunger, discomfort, tiredness, overstimulation, or simply needing closeness can all sound similar. Over time, you will learn subtle differences — but not every cry has an obvious answer.",
        "گریان زمانی سەرەکی منداڵەکەتە لە هەفتە سەرەتاییەکان. برسی، نارەحەتی، ماندووبوون، هاندانی زۆر، یان تەنها پێویستی بە نزیکبوونەوە — هەموویان لەوانەیە هاوشێوە بن. بە تێپەڕبوونی کات جیاوازییە ناسکەکان دەفێزیت — بەڵام هەموو گریانێک وەڵامێکی ڕوونی نییە."
      ),
      bi(
        "The period of increased crying often peaks around six to eight weeks and then eases. This is sometimes called the period of purple crying — it does not mean something is wrong with you or your baby. It passes.",
        "ماوەی گریانی زیاتر زۆرجار لە نێوان شەش تا هەشت هەفتەدا بەرز دەبێت و دواتر کەم دەبێتەوە. هەندێک جار ماوەی گریانی مۆر پێی دەگوترێت — واتای هەڵەیەک لە تۆ یان منداڵەکەت نییە. تێدەپەڕێت."
      ),
      bi(
        "Responding consistently builds security — you cannot create bad habits by comforting a newborn. If crying feels endless, rotate with a support person, step outside for fresh air, and remember to eat and rest yourself.",
        "وەڵامدانەوەی بەردەوام متمانە دروست دەکات — ناتوانیت خووی خراپ دروست بکەیت بە ئاسوودەکردنی نوێ لەدایکبوو. ئەگەر گریان بێ کۆتاکە، لەگەڵ کەسی پشتگیر دەورە بگۆڕە، بۆ هەوای تازە بچۆ دەرەوە، و بیر لە خۆت بکەرەوە بخۆیت و پشوو بدەیت."
      ),
    ],
    tips: [
      bi("Check basics first — wet diaper, hunger, temperature, burp needed", "سەرەتا بنەڕەتەکان بپشکنە — پamپەر، برسی، پلەی گەرmi، پێویستی بە بۆڕکردن"),
      bi("Use a simple cry log if patterns are unclear — time, feed, sleep before", "تۆماری گریانی سادە بەکاربهێنە ئەگەر شێواز ناروونە — کات، خواردن، خەو پێشتر"),
      bi("Movement — walk, bounce on ball, stroller — often helps", "جوڵە — پیاسە، گۆڕینی گۆی، گەڕۆک — زۆرجار یارمەتیدەرە"),
      bi("Never shake a baby — place safely in crib and step away if frustrated", "منداڵ هەرگیز مەجووڵێنە — بە سالم لە گۆڕە دابنێ و دوور بکەوە ئەگەر بێزار بوoit"),
    ],
    whenToAsk: [
      bi("High-pitched, weak, or unusual cry that concerns you", "گریانی بەرز، لاواز، یان نائاسایی کە نیگەرانت دەکات"),
      bi("Crying with fever, vomiting, or refusal to feed", "گریان لەگەڵ گەرmi، ڕشانەوە، یان ڕەتکردنەوەی خواردن"),
      bi("You feel anger or urge to harm when baby cries — seek help immediately", "هەست بە تووڕەیی یان ئارەزووی زیانگەیاندن دەکەیت — یەکسەر داوای یارمەتی بکە"),
    ],
  },
`;

writeFileSync(join(dataDir, "babyCare.js"), babyCare);
console.log("partial write - need full file");
