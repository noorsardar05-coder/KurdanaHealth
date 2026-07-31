import { writeFileSync } from "fs";
import { bi } from "../src/features/first-time-mothers/utils/locale.js";

function q(s) {
  if (/[a-zA-Z]/.test(s)) throw new Error("Latin: " + s);
  return s;
}

const articles = [
  {
    id: "welcome-motherhood",
    slug: "welcome-to-motherhood",
    title: bi("Welcome to Your New Chapter", q("بەخێربێیت بۆ بەشێکی نوێ")),
    excerpt: bi(
      "The first days with a newborn are tender and intense. You do not need to have it all figured out — learning together is enough.",
      q("ڕۆژە سەرەتاییەکان لەگەڵ نوێ لەدایکبوو نەرم و توندن. پێویست نییە هەموو شت بزانیت — فێربوون پێکەوە بەسە.")
    ),
    body: [
      bi(
        "Becoming a mother is not a single moment — it unfolds in quiet feeds, sleepless nights, and small discoveries. Give yourself permission to move slowly and ask questions without shame.",
        q("دایکبوون کاتێک نییە — لە خواردنی نەرم، شەوی بێخەو، و دۆزینەوەی بچووکدا دەردەکەوێت. مافی خۆت بدە بە هێواش بچیت و بێ شەرم پرسیار بکە.")
      ),
      bi(
        "Your baby is learning you as much as you are learning them. Eye contact, gentle touch, and your voice build safety. There is no perfect script — presence matters most.",
        q("منداڵەکەت هەنگاو بە هەنگاو فێر دەبێت وەک ئەوەی تۆ فێری ئەو دەبیت. تێکەڵاوی چاو، دەست لێدانی نەرم، و دەنگت ئاسوودەیی دروست دەکات. هیچ شێوازێکی تەواو نییە — ئامادەبوون گرنگترینە.")
      ),
    ],
    tags: ["newborn", "emotional", "basics"],
    minutes: 4,
  },
  {
    id: "bonding-baby",
    slug: "bonding-with-your-baby",
    title: bi("Bonding in Small Moments", q("پەیوەندی لە ساتە بچووکەکان")),
    excerpt: bi(
      "Bonding is not one grand event — it grows through everyday care, voice, and closeness.",
      q("پەیوەندی یەک ڕووداوی گەورە نییە — لە خواردن، دەنگ، و نزیکبوونەوە گەشە دەکات.")
    ),
    body: [
      bi(
        "Hold your baby skin-to-skin when you can. Talk during diaper changes, feeds, and walks. These ordinary moments teach your baby that the world is safe.",
        q("کاتێک دەتوانیت منداڵ لە پێستی خۆتدا بگرە. لە کاتی گۆڕینی پامپەر، خواردن، و پیاسەدا قسە بکە. ئەم ساتە ئاساییانە فێری منداڵ دەکەن کە جیهان سالمە.")
      ),
      bi(
        "If bonding feels slow, that is common too — especially after a difficult birth or when you are exhausted. Connection deepens over time, not on a deadline.",
        q("ئەگەر پەیوەندی هێواش بوو، ئەمەش ئاساییە — تایبەتەن دوای لەدایکبوونێکی قورس یان کاتی ماندووبوون. پەیوەندی بە کات قووڵتر دەبێت، نەک لە کاتی کۆتایی.")
      ),
    ],
    tags: ["bonding", "newborn", "emotional"],
    minutes: 5,
  },
  {
    id: "feeding-confidence",
    slug: "feeding-with-confidence",
    title: bi("Feeding With Confidence", q("خواردن بە متمانە")),
    excerpt: bi(
      "Whether breast, bottle, or both — responsive feeding and your calm presence matter most.",
      q("بە شیر، شیشە، یان هەردوو — خواردنی وەڵامدار و ئارامی تۆ گرنگترینە.")
    ),
    body: [
      bi(
        "Watch for hunger cues — rooting, hands to mouth, fussiness — rather than the clock alone. Feeding on demand is widely recommended for newborns.",
        q("نیشانەی برسی ببینە — گەڕان بۆ دەم، دەست بۆ دەم، نارەحەتی — نەک تەنها کات. خواردن بە داوای منداڵ بۆ نوێ لەدایکبوو زۆر پێشنیار دەکرێت.")
      ),
      bi(
        "If you supplement or formula-feed, you are still nourishing your baby well. Ask your clinician about amounts, preparation, and any concerns — there is no shame in asking.",
        q("ئەگەر تکمیل یان شیرێکی دەستکرد بدەیت، هێشتا منداڵ بە باشی دەخۆرێنیت. لە پزیشک بپرسە دەربارەی بڕ، ئامادەکردن، و هەر نیگەرانییەک — بێ شەرم پرسیار بکە.")
      ),
    ],
    tags: ["feeding", "newborn", "practical"],
    minutes: 6,
  },
  {
    id: "sleep-reality",
    slug: "sleep-in-the-first-months",
    title: bi("Sleep — What to Expect", q("خەو — چی چاوەڕوان بکە")),
    excerpt: bi(
      "Newborn sleep is fragmented and unpredictable. Safe sleep practices protect while you rest when you can.",
      q("خەوی منداڵی نوێ پارچە و ناڕێکە. ڕێکارەکانی خەوی سالم پارێزگاری دەکات لەکاتێکدا دەتوانیت بخەویت.")
    ),
    body: [
      bi(
        "Babies wake often — for feeds, comfort, and development. Short stretches of sleep are normal; so is needing help at night.",
        q("منداڵ زۆر هەست دەکاتەوە — بۆ خواردن، ئاسوودەیی، و گەشە. بەشە کورتەکانی خەو ئاساییە؛ هەروەها پێویستی بە یارمەتی لە شەودا.")
      ),
      bi(
        "Place baby on their back in a clear sleep space — firm surface, no loose blankets. Room-sharing without bed-sharing is recommended for the first months.",
        q("منداڵ بە پشت لە شوێنێکی خەوی پاکدا بخەوێنە — ڕووێکی جێگیر، بێ پۆشینی شل. هاوبەشی ژوور بەبێ هاوبەشی جگەرە بۆ مانگە سەرەتاییەکان پێشنیار دەکرێت.")
      ),
    ],
    tags: ["sleep", "safety", "newborn"],
    minutes: 5,
  },
  {
    id: "postpartum-recovery",
    slug: "gentle-postpartum-recovery",
    title: bi("Your Body After Birth", q("لەشت دوای لەدایکبوون")),
    excerpt: bi(
      "Recovery takes weeks, not days. Bleeding, soreness, and fatigue are part of healing — rest is part of care.",
      q("چاکبوونەوە هەفتە دەوێت، نەک ڕۆژ. خونباری، نارەحەتی، و ماندووبوون بەشێک لە چاکبوون — پشوو بەشێک لە چاودێریە.")
    ),
    body: [
      bi(
        "Lochia — postpartum bleeding — usually lightens over time. Pads, comfortable underwear, and gentle movement support healing.",
        q("خونباری دوای لەدایکبوون — بە کاتێک کەم دەبێت. پامپەر، جلێکی ئاسوودە، و جوڵەی نەرم یارمەتی چاکبوون دەدات.")
      ),
      bi(
        "Pelvic floor and abdominal changes are gradual. Avoid comparing your timeline to others. Your clinician can guide when to resume exercise.",
        q("گۆڕانکارییەکانی ناوچەی لاوە و سک هێواش دەبێت. خۆت لە کەسانی تر مەبەرەوە. پزیشک ڕێنمایی دەکات کەی بگەڕێیتەوە بۆ وەرزش.")
      ),
    ],
    tags: ["recovery", "postpartum", "body"],
    minutes: 6,
  },
  {
    id: "partner-support",
    slug: "support-from-your-partner",
    title: bi("Sharing the Load", q("هاوبەشکردنی بار")),
    excerpt: bi(
      "Partners and support people can lighten daily care — communication and small tasks add up.",
      q("هاوسەر و کەسانی پشتگیر دەتوانن بارەی ڕۆژانە سوک بکەن — گفتوگۆ و کارە بچووکەکان کۆ دەبن.")
    ),
    body: [
      bi(
        "Be specific about what helps — a nap, a meal, holding baby while you shower. Vague offers are harder to accept; clear requests build teamwork.",
        q("دیار بکە چی یارمەتی دەدات — خەوێک، خواردن، گرتنی منداڵ لەکاتی حەمام. پێشنیاری نادیار قورسە قبوڵ بکرێت؛ داوای ڕاست تیمکاری دروست دەکات.")
      ),
      bi(
        "Partners may feel unsure too. Include them in feeds, bathing, and soothing when safe — confidence grows with practice.",
        q("هاوسەریش لەوانەیە نادڵنی بێت. ئەوان لە خواردن، حەمام، و ئارامکردندا بەشدار بکە کاتێک سالمە — بە ڕاهێنان متمانە گەشە دەکات.")
      ),
    ],
    tags: ["partner", "support", "practical"],
    minutes: 4,
  },
  {
    id: "mental-health",
    slug: "emotional-health-after-birth",
    title: bi("Emotional Health Matters", q("تەندروستی هەستی گرنگە")),
    excerpt: bi(
      "Baby blues, anxiety, and low mood are common — and treatable. You deserve support without judgment.",
      q("هەستی منداڵانە، نیگەرانی، و هەستی کەم ئاساییە — و دەکرێت چارەسەر بکرێت. شایستەی پشتگیری بیت بێ حوکم.")
    ),
    body: [
      bi(
        "Hormonal shifts after birth can bring tears, irritability, or feeling disconnected. If low mood lasts beyond two weeks or feels overwhelming, reach out.",
        q("گۆڕانکاری هۆرمۆن دوای لەدایکبوون گرین، تیژی، یان هەستی دوورکەوتنەوە دەهێنێت. ئەگەر هەستی کەم زیاتر لە دوو هەفتە بێت یان زۆر سەرقاڵ بێت، پەیوەندی بکە.")
      ),
      bi(
        "Thoughts of harming yourself or your baby need urgent care — not shame. Contact your clinician, midwife, or emergency services. You are not alone.",
        q("بیرکردنەوەی زیانگەیاندن بە خۆت یان منداڵ پێویستی بە چاودێری فوری هەیە — نەک شەرم. پەیوەندی بە پزیشک، مامانی، یان فریاگوزاری بکە. تەنیا نیت.")
      ),
    ],
    tags: ["mental-health", "postpartum", "support"],
    minutes: 7,
  },
  {
    id: "visitors-boundaries",
    slug: "visitors-and-boundaries",
    title: bi("Visitors and Gentle Boundaries", q("مێوان و سنووری نەرم")),
    excerpt: bi(
      "You may set limits on visits, holding, and advice. Protecting rest is part of caring for your baby.",
      q("دەتوانیت سنوور بدەیت لە سەردان، گرتن، و ئامۆژگاری. پارastni pshû beşek le chawdirî mndal e.")
    ),
    body: [
      bi(
        "It is okay to ask visitors to wash hands, keep visits short, or come back later. Your recovery and baby's immune system are still settling.",
        q("باشە لە میوان بخوازیت دەست بشۆێت، سەردان کورت بێت، یان دواتر بگەڕێتەوە. چاکبوونەوەی تۆ و سیستەمی بەرگری منداڵ هێشتا جێگیر دەبن.")
      ),
      bi(
        "Unsolicited advice can feel heavy. A simple thank-you and redirect — or asking your partner to field questions — preserves peace.",
        q("ئamojgari bê dawa bar qûl e. spas u rêveberî sade — yan hevsêr bprse — aramî diparêzit.")
      ),
    ],
    tags: ["visitors", "boundaries", "practical"],
    minutes: 4,
  },
  {
    id: "baby-essentials",
    slug: "what-baby-really-needs",
    title: bi("What Baby Really Needs", q("منداڵ ڕastî chî dêxwazit")),
    excerpt: bi(
      "Beyond gear and gadgets — warmth, milk, clean diapers, and your responsive presence cover most needs.",
      q("jêveberî ziatr — germî, şîr, pampêr pak, u amadebûni te zorbey pewistî dapôsh dêkat.")
    ),
    body: [
      bi(
        "Start simple: safe sleep space, feeding supplies, diapers, a few outfits, and gentle cleansing products. Add items as you discover what suits your family.",
        q("sade dest pê bke: cih xewi salm, xwardn, pampêr, chend jil, u berhemi pakkrdn nerm. ziatr le kati ku dît chî guncaw e.")
      ),
      bi(
        "Expensive items are rarely essential in early weeks. Trust your clinician's guidance on car seats, thermometers, and any specialty products.",
        q("berhemi giran le heftey sertayî kem pewist in. metmane be rênmayî pzishk bo kursî otomobil, pîwaney germî, u berhemi taybet.")
      ),
    ],
    tags: ["essentials", "gear", "practical"],
    minutes: 5,
  },
  {
    id: "when-to-call",
    slug: "when-to-call-for-help",
    title: bi("When to Call for Help", q("کengê peywendi bke")),
    excerpt: bi(
      "Trust your instincts. When in doubt, contacting your care team is always reasonable — early is better than late.",
      q("metmane be hest. kati gomant hebu, peywendi le tim chawdirî her dem maqûl e — zû behtr e.")
    ),
    body: [
      bi(
        "For baby: fever in infants under three months, breathing difficulty, fewer wet diapers, projectile vomiting, or unresponsive limpness — call promptly.",
        q("bo mndal: germi le xwar sê mang, keshay henasa, pampêr ter kêm, rshanevey behez, yan laveazi bê wllam — zû peywendi bke.")
      ),
      bi(
        "For you: heavy bleeding, severe pain, fever, chest pain, or thoughts of harm — seek urgent care. This guide educates; it does not replace clinical advice.",
        q("bo xot: xonbary qurs, azar tund, germi, azar sine, yan birkardnewey ziyan — chawdirî furi. ev rênmaye perevedeye; cih nagirît le şîreti pzishk.")
      ),
    ],
    tags: ["safety", "urgent", "guidance"],
    minutes: 5,
  },
  {
    id: "self-care",
    slug: "self-care-for-new-mothers",
    title: bi("Self-Care Is Not Selfish", q("chawdirî xot xiyanet nîne")),
    excerpt: bi(
      "Small acts of rest, nourishment, and connection refill the energy you give your baby.",
      q("pshû, xwardn, u pêwendi bchûk enerjiya ku dideit mndal dîsa pij dêkat.")
    ),
    body: [
      bi(
        "Eat when you can, sip water through the day, and accept help with meals. One shower or short walk can shift a difficult afternoon.",
        q("bixô kati detwanit, av bvexô le roj, yarmetî le xwardn qebûl bke. yek hemam yan geran kurt dêtwanit rojek qûl biguherîne.")
      ),
      bi(
        "Connect with one trusted person regularly — a friend, family member, or support group. Isolation magnifies exhaustion; voice shrinks it.",
        q("le yek kes metmane bi berdewamî peywendî bke — heval, malbat, yan grûp pshigir. tenya mndûbûn mezin dêkat; deng kêm dêkat.")
      ),
    ],
    tags: ["self-care", "postpartum", "emotional"],
    minutes: 5,
  },
  {
    id: "first-year",
    slug: "the-first-year-unfolding",
    title: bi("The First Year Unfolds", q("sale yekem vekirê")),
    excerpt: bi(
      "Each baby follows their own pace. Celebrate small steps and trust the relationship you are building.",
      q("her mndal be xoşî xo dêçit. hengaw bchûk aheng bgrî u metmane be pêwendî ku drust dêkît.")
    ),
    body: [
      bi(
        "Smiles, rolling, sitting, first words — ranges vary widely and still fall within healthy development. Comparison steals joy; curiosity restores it.",
        q("pêkenî, geran, danishtn, yekem peyve — mewde jiawaz e u hêj geshe salme. berawerd xoşî dêdizit; hézdari veger dide.")
      ),
      bi(
        "Keep well-baby visits and vaccinations as your clinician advises. Bring questions — no concern is too small for a caring team.",
        q("serdani mndali salm u vaksin wek pzishk rênmayî dêkat. prsiar bîne — nigirani bchûk nîne bo tim chawdirî.")
      ),
    ],
    tags: ["milestones", "first-year", "development"],
    minutes: 6,
  },
];

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function renderBi(b) {
  return `bi(\n        "${esc(b.en)}",\n        "${esc(b.ku)}"\n      )`;
}

const lines = [
  'import { bi } from "../utils/locale.js";',
  "",
  "export const LEARN_ARTICLES = [",
];

for (const a of articles) {
  lines.push("  {");
  lines.push(`    id: "${a.id}",`);
  lines.push(`    slug: "${a.slug}",`);
  lines.push(`    title: bi("${esc(a.title.en)}", "${esc(a.title.ku)}"),`);
  lines.push(`    excerpt: ${renderBi(a.excerpt)},`);
  lines.push("    body: [");
  for (const p of a.body) {
    lines.push(`      ${renderBi(p)},`);
  }
  lines.push("    ],");
  lines.push(`    tags: ${JSON.stringify(a.tags)},`);
  lines.push(`    minutes: ${a.minutes},`);
  lines.push("  },");
}

lines.push("];");
lines.push("");

const out =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/learnArticles.js";
writeFileSync(out, lines.join("\n"));
console.log("Wrote", articles.length, "articles");
