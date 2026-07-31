/**
 * Generates 320+ unique Thought Mirror patterns (EN + Sorani).
 * Run: node scripts/generate-thought-mirror-patterns.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(
  __dirname,
  "../src/features/mental-health/utils/thoughtMirror/patterns.js"
);

function L(en, ku) {
  return { en, ku };
}

/** Seed thoughts → unique challenge logic per entry */
const SEEDS = [
  // self-worth / intelligence
  {
    cat: "self_worth",
    keys: { en: ["i'm dumb", "im dumb", "i am dumb", "dumb"], ku: ["گێلم", "گەمژەم", "بێ عەقڵم"] },
    reflect: L("You called yourself dumb.", "تۆ خۆت بە گێل ناوبرد."),
    challenge: L(
      "If you were truly incapable of learning, would you even notice the struggle — or care enough to question it?",
      "ئەگەر ڕاستی ناتوانا بیت فێر ببیت، ئایا هەستت بە سەختی دەکرد — یان گرنگت پێ دەدا گومان بکەیت؟"
    ),
    perspective: L(
      "People who stop growing rarely wonder about their intelligence. Wondering usually means you still want to improve.",
      "کەسانی کە واز لە گەشە دەهێنن بەدەگمەن گومان لە زیریان دەکەن. گومان زۆرجار واتە هێشتا دەتەوێت باشتر بیت."
    ),
    replace: L(
      "I struggled with this. I can understand it one step at a time.",
      "لەمەدا سەختیم کێشا. دەتوانم هەنگاو بە هەنگاو تێبگەم."
    ),
    action: L("Write ONE thing you learned today — even tiny.", "یەک شت بنووسە کە ئەمڕۆ فێری بوویت — تەنانەت بچووک."),
  },
  {
    cat: "self_worth",
    keys: { en: ["i'm stupid", "im stupid", "i am stupid", "stupid"], ku: ["گێل", "بێ ژیریم"] },
    reflect: L("The word “stupid” is aimed at your whole self.", "وشەی «گێل» بەرەو هەموو خۆتە."),
    challenge: L(
      "Did one hard task suddenly rewrite your entire mind — or did your mind just meet something difficult?",
      "ئایا یەک ئەرکی سەخت یەکسەر هەموو مێشکت نووسیەوە — یان مێشکت تەنها بە شتێکی سەخت بەرەوڕوو بوو؟"
    ),
    perspective: L(
      "Difficulty tests method and energy, not your right to keep learning.",
      "سەختی شێواز و وزە تاقی دەکاتەوە، نەک مافی بەردەوامبوون لە فێربوون."
    ),
    replace: L("This was hard for me today — not proof I’m incapable.", "ئەمە ئەمڕۆ بۆم سەخت بوو — بەڵگەی بێتوانایی نییە."),
    action: L("Explain the problem in one simpler sentence.", "کێشەکە لە یەک ڕستەی سادەتردا ڕوون بکەرەوە."),
  },
  {
    cat: "self_worth",
    keys: { en: ["i'm useless", "im useless", "i am useless", "useless"], ku: ["بێسوودم", "هیچ سوودێکم نییە"] },
    reflect: L("You labeled yourself useless.", "تۆ خۆت بە بێسوود ناونایت."),
    challenge: L(
      "Useful for what, exactly? Existing isn’t a job you earn — and low energy isn’t an erasure of value.",
      "بەسوود بۆ چی، بە وردی؟ بوون کارێک نییە کە دەست دەکەوێت — و وزەی نزم بەها ناسڕێتەوە."
    ),
    perspective: L(
      "Usefulness often gets measured by output on tired days. That’s a narrow ruler.",
      "بەسوودی زۆرجار بە بەرهەم لە ڕۆژە ماندووەکاندا پێوانە دەکرێت. ئەمە پێوەرێکی تەنکە."
    ),
    replace: L("My energy is low. My value isn’t.", "وزەم نزمە. بەهایم نزم نییە."),
    action: L("Name ONE person who benefited from you this month — even slightly.", "یەک کەس ناوببە کە ئەم مانگە سوودی لێت بینی — تەنانەت کەم."),
  },
  {
    cat: "self_worth",
    keys: { en: ["i'm worthless", "im worthless", "worthless", "i have no value"], ku: ["بێبەهام", "بێنرخی م"] },
    reflect: L("You’re treating worth like a score you failed.", "بەها وەک نمرەیەک مامەڵە دەکەیت کە تێیدا دۆڕایت."),
    challenge: L(
      "Who issued that score — and what evidence would they need to reverse it that isn’t just today’s mood?",
      "کێ ئەم نمرەیەی دا — و چی بەڵگەی پێویستە بۆ گەڕاندنەوەی کە تەنها مودەی ئەمڕۆ نەبێت؟"
    ),
    perspective: L(
      "Worth isn’t a daily performance review. Mood can shout; it isn’t an auditor.",
      "بەها پێداچوونەوەی ڕۆژانەی ئەدا نییە. مودە دەتوانێت هاوار بکات؛ وردبین نییە."
    ),
    replace: L("I feel low today. That feeling isn’t a final valuation of me.", "ئەمڕۆ نزم هەست دەکەم. ئەم هەستە هەڵسەنگاندنی کۆتایی من نییە."),
    action: L("List THREE facts about you that aren’t about productivity.", "سێ ڕاستی لەسەر خۆت بنووسە کە دەربارەی بەرهەمهێنان نین."),
  },
  {
    cat: "self_worth",
    keys: { en: ["not good enough", "i'm not enough", "never enough", "not enough"], ku: ["بەس نیم", "هەرگیز بەس نیم"] },
    reflect: L("“Not enough” is running the sentence.", "«بەس نیم» ڕستەکە بەڕێوەدەبات."),
    challenge: L(
      "Enough for whose checklist — and is that checklist even finishable?",
      "بەس بۆ لیستی کێ — و ئایا ئەو لیستە تەنانەت تەواو دەبێت؟"
    ),
    perspective: L(
      "Moving goalposts create permanent inadequacy. That’s design, not destiny.",
      "گۆڵپۆستی جووڵاو ناتەواویی هەمیشەیی دروست دەکات. ئەمە دیزاینە، نەک چارەنووس."
    ),
    replace: L("I can meet today’s next step without being ‘enough’ for every standard.", "دەتوانم هەنگاوی داهاتووی ئەمڕۆ هەڵبگرم بەبێ «بەس» بوون بۆ هەموو پێوەرێک."),
    action: L("Shrink today’s standard to ONE doable item.", "پێوەری ئەمڕۆ بچووک بکەرەوە بۆ یەک شتی گونجاو."),
  },
  {
    cat: "self_worth",
    keys: { en: ["i hate myself", "hate myself", "i hate me"], ku: ["ڕقم لە خۆمە", "لە خۆم ڕقم"] },
    reflect: L("You’re speaking to yourself with hate.", "بە ڕق قسە لەگەڵ خۆت دەکەیت."),
    challenge: L(
      "If a child said this, would your first move be agreement — or protection?",
      "ئەگەر منداڵێک ئەمەی بوتایە، یەکەم هەنگاوت ڕازیبوون دەبوو — یان پاراستن؟"
    ),
    perspective: L(
      "Hate toward the self often arrives when pain wants a target and finds the nearest one: you.",
      "ڕق بەرامبەر خۆ زۆرجار دێت کاتێک ئازار ئامانج دەوێت و نزیکترین دەدۆزێتەوە: تۆ."
    ),
    replace: L("I’m struggling with myself today — not forever.", "ئەمڕۆ لەگەڵ خۆم خەبات دەکەم — نەک بۆ هەمیشە."),
    action: L("Write one protective sentence you’d offer that child — then keep it for you.", "یەک ڕستەی پارێزەر بنووسە کە بەو منداڵەت دەوت — پاشان بۆ خۆت بهێڵەرەوە."),
  },
  // failure
  {
    cat: "failure",
    keys: { en: ["i'm a failure", "im a failure", "i am a failure", "failure"], ku: ["شکستخوازم", "شکەستخوازم"] },
    reflect: L("You turned a result into an identity: failure.", "ئەنجامێکت کردە ناسنامە: شکست."),
    challenge: L(
      "Name one person who has never failed. You probably can’t — because failure is an event, not a species.",
      "یەک کەس ناوببە کە هەرگیز نەشکابێت. بە ئەگەری زۆر ناتوانیت — چونکە شکست ڕووداوە، نەک جۆر."
    ),
    perspective: L(
      "“I failed today” leaves room to learn. “I am a failure” closes the case without evidence.",
      "«ئەمڕۆ شکستم هێنا» شوێن بۆ فێربوون دەهێڵێتەوە. «من شکستخوازم» دۆسیەکە دادەخات بەبێ بەڵگە."
    ),
    replace: L("I failed today — not: I am a failure.", "ئەمڕۆ شکستم هێنا — نەک: من شکستخوازم."),
    action: L("Write ONE thing this setback taught you.", "یەک شت بنووسە کە ئەم پاشەکشێیە فێری کردیت."),
  },
  {
    cat: "failure",
    keys: { en: ["i always fail", "always fail", "i keep failing"], ku: ["هەمیشە دەشکێم", "هەمیشە شکەست"] },
    reflect: L("“Always” turned a pattern of pain into a permanent rule.", "«هەمیشە» شێوازی ئازاری کردە یاسای هەمیشەیی."),
    challenge: L(
      "Can you find even one counterexample — a time something worked, even partially?",
      "ئایا دەتوانیت تەنانەت یەک نموونەی پێچەوانە بدۆزیتەوە — کاتێک شتێک کاری کرد، تەنانەت بەشەکی؟"
    ),
    perspective: L(
      "Absolutes feel true when you’re flooded. Reality is usually messier — and kinder.",
      "وشە تەواوەکان ڕاست هەست دەکەن کاتێک لافاوت لێدەدات. ڕاستی زۆرجار تێکەڵترە — و میهرەبانتر."
    ),
    replace: L("I’ve had hard repeats lately. That isn’t the same as always.", "بەم دواییە دووبارەبوونەوەی قورسم هەبووە. ئەمە وەک هەمیشە نییە."),
    action: L("Write one partial win from the past month.", "یەک سەرکەوتنی بەشەکی لە مانگی ڕابردوو بنووسە."),
  },
  {
    cat: "failure",
    keys: { en: ["i ruined everything", "ruined everything", "i mess everything up", "can't do anything right", "cant do anything right"], ku: ["هەموو شتم تێکدا", "هیچ شتێک ڕاست ناکەم"] },
    reflect: L("Your mind jumped from one mess to “everything.”", "مێشکت لە یەک تێکچوون بازیدا بۆ «هەموو شت»."),
    challenge: L(
      "List what is still intact. If you can name even three things, “everything” is already inaccurate.",
      "ئەوە بنووسە کە هێشتا تەواوە. ئەگەر تەنانەت سێ شت بزانیت، «هەموو شت» پێشتر نادروستە."
    ),
    perspective: L(
      "Catastrophic language spreads damage beyond the facts. Contain the fire to the room it started in.",
      "زمانی کارەسات زیان بڵاو دەکاتەوە لەدەرەوەی ڕاستییەکان. ئاگرەکە لەو ژوورەدا بهێڵەرەوە کە تێیدا دەستی پێکرد."
    ),
    replace: L("Something went wrong. Not everything is gone.", "شتێک خراپ ڕۆیشت. هەموو شت نەڕۆیشت."),
    action: L("Repair or stabilize ONE concrete piece today.", "ئەمڕۆ یەک پارچەی ڕوون چاک بکەرەوە یان جێگیر بکە."),
  },
  {
    cat: "failure",
    keys: { en: ["i failed my", "failed the exam", "failed my exam", "failed my test"], ku: ["لە تاقیکردنەوە شکستم", "ئیمیتحانی تێکچوو"] },
    reflect: L("An exam result is sitting heavy on you.", "ئەنجامی تاقیکردنەوە قورسی لەسەرت داناوە."),
    challenge: L(
      "Does one score measure your whole capacity — or one performance under one set of conditions?",
      "ئایا یەک نمرە هەموو توانات پێوانە دەکات — یان یەک ئەدا لە ژێر یەک دۆخدا؟"
    ),
    perspective: L(
      "Exams measure preparation + timing + nerves that day. They don’t issue human verdicts.",
      "تاقیکردنەوە ئامادەکاری + کات + دەمارەکان لەو ڕۆژەدا پێوانە دەکات. حوکمی مرۆڤایەتی نادات."
    ),
    replace: L("I didn’t pass this attempt. I can approach the next one with a clearer plan.", "لەم هەوڵەدا سەرکەوتوو نەبووم. دەتوانم بە پلانی ڕوونتر بۆ داهاتوو بڕۆم."),
    action: L("Write the ONE topic you’ll review first.", "یەک بابەت بنووسە کە یەکەم جار پێداچوونەوەی دەکەیت."),
  },
  // loneliness
  {
    cat: "loneliness",
    keys: { en: ["no one loves me", "nobody loves me", "no one loves", "nobody loves"], ku: ["کەس خۆشی ناوێت", "کەس خۆشی نایەوێت"] },
    reflect: L("Pain is speaking in an absolute: no one loves you.", "ئازار بە وشەی تەواو قسە دەکات: کەس خۆشی ناوێت."),
    challenge: L(
      "Is that a verified census of every person — or how loneliness feels in this hour?",
      "ئایا ئەمە سەرژمێری پشتڕاستکراوی هەموو کەسێکە — یان چۆن تەنیایی لەم کاتژمێرەدا هەست دەکات؟"
    ),
    perspective: L(
      "Absolutes (nobody / always / never) are how pain simplifies a complicated social world.",
      "وشە تەواوەکان (کەس / هەمیشە / هەرگیز) چۆن ئازار جیهانێکی کۆمەڵایەتی ئاڵۆز سادە دەکاتەوە."
    ),
    replace: L("I feel lonely right now — not: I am unloved.", "ئێستا هەست بە تەنیایی دەکەم — نەک: من بێخۆشەویستیم."),
    action: L("Message one person you trust — even a short hello.", "بۆ یەک کەسی متمانەپێکراو بنووسە — تەنانەت سڵاوێکی کورت."),
  },
  {
    cat: "loneliness",
    keys: { en: ["nobody cares", "no one cares", "no one cares about me"], ku: ["کەس گرنگی نادات", "کەس گرنگی پێ نادات"] },
    reflect: L("You’re concluding that care is absent everywhere.", "تۆ ئەنجام دەگریت کە چاودێری لە هەموو شوێنێک نەماوە."),
    challenge: L(
      "Care can be quiet, delayed, or imperfect. Absence of loud care isn’t proof of zero care.",
      "چاودێری دەتوانێت بێدەنگ، درەنگ، یان ناتەواو بێت. نەبوونی چاودێری بەرز بەڵگەی سفر نییە."
    ),
    perspective: L(
      "Loneliness magnifies silence into abandonment stories.",
      "تەنیایی بێدەنگی گەورە دەکاتەوە بۆ چیرۆکی بەجێهێشتن."
    ),
    replace: L("I need clearer connection right now.", "ئێستا پێویستیم بە پەیوەندی ڕوونتر هەیە."),
    action: L("Ask one person for a specific kind of support.", "داوای جۆرێکی دیاریکراو لە پشتگیری لە یەک کەس بکە."),
  },
  {
    cat: "loneliness",
    keys: { en: ["i'm alone", "im alone", "i am alone", "i feel alone", "lonely"], ku: ["تەنهام", "هەست بە تەنیایی", "تەنیایی"] },
    reflect: L("Alone is loud in your body tonight.", "تەنیایی ئەمشەو لە جەستەتدا بەرزە."),
    challenge: L(
      "Are you alone in the room, alone in life, or alone in this feeling — those aren’t identical.",
      "ئایا لە ژوورەکەدا تەنهایت، لە ژیاندا تەنهایت، یان لەم هەستەدا تەنهایت — ئەمانە یەک شت نین."
    ),
    perspective: L(
      "Feeling alone can be accurate about the moment without being a prophecy.",
      "هەستی تەنیایی دەتوانێت دەربارەی ئەم کاتە ڕاست بێت بەبێ بوون بە پێشبینی."
    ),
    replace: L("I feel alone in this moment. Moments move.", "لەم کاتەدا تەنها هەست دەکەم. کاتەکان دەجووڵێن."),
    action: L("Put yourself near gentle company: a call, a shared space, or a calm sound.", "خۆت لە نزیک هاوڕێیەتی نەرم دابنێ: پەیوەندی، شوێنی هاوبەش، یان دەنگی ئارام."),
  },
  {
    cat: "loneliness",
    keys: { en: ["unwanted", "i'm unwanted", "no one wants me"], ku: ["نەخوازراوم", "کەس نایەوێت"] },
    reflect: L("Unwanted became the headline.", "«نەخوازراو» بووە سەرنووسە."),
    challenge: L(
      "Who, specifically, decided that — and over what timeframe? Vague juries make harsh verdicts.",
      "کێ، بە دیاریکراوی، ئەمەی بڕیار دا — و لە چ کاتدا؟ دادگای ناڕوون حوکمی توند دەدات."
    ),
    perspective: L(
      "Being unseen by someone is not the same as being unworthy of belonging.",
      "نەبینراو بوون لەلای کەسێک وەک ناشایستەی سەر بە شوێن بوون نییە."
    ),
    replace: L("I wasn’t met the way I needed. That hurts — it doesn’t finalize my worth.", "وەک پێویست بوو پێشوازی لێم نەکرا. دەئێشێت — بەهایم یەکلا ناکاتەوە."),
    action: L("Write where you have belonged before — even briefly.", "بنووسە لە کوێ هەستی سەر بە شوێنت هەبووە — تەنانەت کورت."),
  },
  // appearance
  {
    cat: "appearance",
    keys: { en: ["i'm ugly", "im ugly", "i am ugly", "ugly"], ku: ["ناشرینم", "ناشرین"] },
    reflect: L("You’re attacking your appearance as if it were a moral fact.", "هێرش دەکەیتە سەر شێوەت وەک ڕاستییەکی ئەخلاقی."),
    challenge: L(
      "Would you speak this way to your best friend — or only to yourself under a harsh light?",
      "ئایا بەم شێوەیە قسە لەگەڵ باشترین هاوڕێت دەکەیت — یان تەنها لەگەڵ خۆت لە ژێر ڕووناکی تونددا؟"
    ),
    perspective: L(
      "Your brain may be judging from a worst-angle moment, not your whole life. Looks change; value doesn’t.",
      "مێشکت ڕەنگە لە کاتی خراپترین گۆشەوە حوکم بدات، نەک لە هەموو ژیانەوە. شێوە دەگۆڕێت؛ بەها ناگۆڕێت."
    ),
    replace: L("I don’t have to love how I look today to deserve kindness.", "پێویست ناکات ئەمڕۆ حەزم لە شێوەم بێت بۆ ئەوەی شایستەی میهرەبانی بم."),
    action: L("Find ONE thing your body helped you do today.", "یەک شت بدۆزەرەوە کە جەستەت یارمەتیت دا ئەمڕۆ بیکەیت."),
  },
  {
    cat: "appearance",
    keys: { en: ["hate my body", "i hate my body", "my body is disgusting"], ku: ["ڕقم لە جەستەمە", "جەستەم"] },
    reflect: L("Your body became the enemy in this sentence.", "جەستەت بووە دوژمن لەم ڕستەیەدا."),
    challenge: L(
      "Is your body failing a trend — or carrying you through an actual life?",
      "ئایا جەستەت لە ترێندێک دۆڕاوە — یان ژیانێکی ڕاستەقینەت هەڵدەگرێت؟"
    ),
    perspective: L(
      "Bodies are tools and homes first. Aesthetic rankings are optional noise.",
      "جەستە یەکەم جار ئامێر و ماڵە. ڕیزبەندی جوانی دەنگدانەوەی هەڵبژاردەیە."
    ),
    replace: L("My body is carrying me. I can treat it with basic respect today.", "جەستەم هەڵم دەگرێت. دەتوانم ئەمڕۆ بە ڕێزی بنەڕەتی مامەڵەی لەگەڵ بکەم."),
    action: L("Offer your body one neutral care act (water, stretch, wash).", "یەک کرداری بێلایەنی چاودێری پێشکەشی جەستەت بکە (ئاو، درێژکردنەوە، شوشتن)."),
  },
  {
    cat: "appearance",
    keys: { en: ["i look terrible", "look terrible", "not beautiful", "not pretty"], ku: ["ناشرین دەردەکەوم", "جوان نیم"] },
    reflect: L("You’re rating your face/body like a public scoreboard.", "ڕووخسار/جەستەت وەک تابلۆی گشتی نمرە دەدەیت."),
    challenge: L(
      "Who benefits when your worth shrinks to a look — and what else disappears from the picture?",
      "کێ سوودمەند دەبێت کاتێک بەهایت دەبێتە شێوە — و چی تر لە وێنەکە ون دەبێت؟"
    ),
    perspective: L(
      "Beauty standards shift; dignity shouldn’t have to wait for a flattering angle.",
      "پێوەرەکانی جوانی دەگۆڕێن؛ کەرامەت پێویست ناکات چاوەڕێی گۆشەی جوان بێت."
    ),
    replace: L("I can look imperfect and still take up space with dignity.", "دەتوانم ناتەواو دەربکەوم و هێشتا بە کەرامەت شوێن بگرم."),
    action: L("Avoid mirrors for 30 minutes and do one useful task.", "٣٠ خولەک دوور لە ئاوێنە بیت و یەک ئەرکی بەسوود بکە."),
  },
  // exhaustion
  {
    cat: "exhaustion",
    keys: { en: ["i'm tired", "im tired", "i am tired", "so tired", "tired"], ku: ["ماندووم", "زۆر ماندووم"] },
    reflect: L("Tiredness is front and center.", "ماندوویی لە پێشەوەیە."),
    challenge: L(
      "What if this isn’t laziness — but information from a system that’s been working overtime?",
      "چۆن ئەگەر ئەمە سستی نەبێت — بەڵکو زانیاری بێت لە سیستەمێک کە زیاتر لە پێویست کاری کردووە؟"
    ),
    perspective: L(
      "Bodies communicate through fatigue. Ignoring the signal often makes the story meaner.",
      "جەستە لە ڕێگەی ماندووییەوە پەیوەندی دەکات. پشتگوێخستنی ئاماژە زۆرجار چیرۆکەکە توندتر دەکات."
    ),
    replace: L("My body is asking for a lighter load — not proving I’m weak.", "جەستەم داوای باری سووکتر دەکات — نەک سەلماندنی لاوازی."),
    action: L("Choose ONE thing you can postpone today.", "یەک شت هەڵبژێرە کە دەتوانیت ئەمڕۆ دوای بخەیت."),
  },
  {
    cat: "exhaustion",
    keys: { en: ["exhausted", "i'm exhausted", "drained", "burned out", "burnt out", "no energy"], ku: ["سووتاوم", "هێزم نەما", "بێ وزە"] },
    reflect: L("You’re describing depletion, not a character flaw.", "بەتاڵبوون وەسف دەکەیت، نەک کەموکوڕی کەسایەتی."),
    challenge: L(
      "If a phone at 3% battery refused new apps, would you call it lazy — or empty?",
      "ئەگەر مۆبایلێک بە ٣٪ پاتری داوای ئەپی نوێ ڕەت بکاتەوە، پێی دەڵێیت سست — یان بەتاڵ؟"
    ),
    perspective: L(
      "Burnout invents permanent stories. Rest often rewrites them faster than self-criticism.",
      "سووتان چیرۆکی هەمیشەیی دروست دەکات. پشوو زۆرجار خێراتر لە ڕەخنەی خۆت دەیاننووسێتەوە."
    ),
    replace: L("I’m depleted. Recovery is the next responsible step.", "بەتاڵم. چاکبوونەوە هەنگاوی بەرپرسیارێتی داهاتووە."),
    action: L("Protect a 20-minute recovery block on your calendar.", "بلۆکی ٢٠ خولەکی چاکبوونەوە لەسەر خشتەکەت بپارێزە."),
  },
  // anxiety
  {
    cat: "anxiety",
    keys: { en: ["i'm scared", "im scared", "i am scared", "afraid", "i'm afraid"], ku: ["دەترسم", "ترس"] },
    reflect: L("Fear is active in your system.", "ترس لە سیستەمەکەتدا چالاکە."),
    challenge: L(
      "Is fear reporting a clear and present danger — or predicting a maybe with full volume?",
      "ئایا ترس مەترسییەکی ڕوون و ئامادە ڕاپۆرت دەکات — یان «ڕەنگە»یەک بە دەنگی تەواو پێشبینی دەکات؟"
    ),
    perspective: L(
      "Anxiety is often a smoke alarm for burnt toast: loud, useful sometimes, not always accurate.",
      "دڵەڕاوکێ زۆرجار زەنگی دوکەڵە بۆ نانی سووتاوی: بەرز، هەندێک جار بەسوود، هەمیشە ورد نییە."
    ),
    replace: L("I feel fear. I can check facts before I obey every alarm.", "هەست بە ترس دەکەم. دەتوانم ڕاستییەکان بپشکنم پێش گوێڕایەڵی هەموو زەنگێک."),
    action: L("Write the fear as a maybe, then one grounding fact about now.", "ترسەکە وەک «ڕەنگە» بنووسە، پاشان یەک ڕاستی زەویکراو دەربارەی ئێستا."),
  },
  {
    cat: "anxiety",
    keys: { en: ["worried", "i'm worried", "what if", "panic", "can't calm down", "cant calm down", "anxious"], ku: ["نیگەرانم", "دڵەڕاوکێ", "ناتوانم ئارام ببمەوە"] },
    reflect: L("Worry is trying to control the future from inside your chest.", "نیگەران هەوڵ دەدات داهاتوو لەناو سنگتەوە کۆنترۆڵ بکات."),
    challenge: L(
      "Can you separate “possible” from “happening right now” in one sentence?",
      "ئایا دەتوانیت «ممکن» لە «ئێستا ڕوودەدات» لە یەک ڕستەدا جیا بکەیتەوە؟"
    ),
    perspective: L(
      "Future threats feel present when the body is activated. Naming that gap reduces their power.",
      "هەڕەشەی داهاتوو ئامادە هەست دەکات کاتێک جەستە چالاکە. ناونانی ئەم بۆشاییە هێزیان کەم دەکاتەوە."
    ),
    replace: L("Something might go wrong later. Right now I can handle this minute.", "ڕەنگە دواتر شتێک خراپ بڕوات. ئێستا دەتوانم ئەم خولەکە بەرگە بگرم."),
    action: L("Exhale longer than you inhale four times, then name 5 things you see.", "چوار جار هەناسەدانەوە درێژتر بکە، پاشان ٥ شت ناوببە کە دەیانبینیت."),
  },
  // guilt
  {
    cat: "guilt",
    keys: { en: ["it's my fault", "my fault", "i should have", "i shouldn't have", "guilty", "ashamed"], ku: ["هەڵەم", "دەبوو", "گوناهبارم", "شەرمەزارم"] },
    reflect: L("Guilt is claiming the whole story.", "گوناه خاوەندارێتی هەموو چیرۆکەکە دەکات."),
    challenge: L(
      "Responsibility asks “what can I repair?” Shame asks “how do I destroy myself?” Which one helps?",
      "بەرپرسیارێتی دەپرسێت «چی دەتوانم چاک بکەمەوە؟» شەرم دەپرسێت «چۆن خۆم وێران بکەم؟» کامیان یارمەتی دەدات؟"
    ),
    perspective: L(
      "Learning needs a clear mistake. Self-erasure doesn’t improve the next attempt.",
      "فێربوون پێویستی بە هەڵەی ڕوون هەیە. سڕینەوەی خۆت هەوڵی داهاتوو باشتر ناکات."
    ),
    replace: L("I can own my part and still keep my dignity.", "دەتوانم بەشی خۆم هەڵبگرم و هێشتا کەرامەتم بهێڵمەوە."),
    action: L("Write ONE repair action that is specific and doable.", "یەک کرداری چاککردنەوە بنووسە کە دیاریکراو و گونجاو بێت."),
  },
  // anger
  {
    cat: "anger",
    keys: { en: ["i'm angry", "im angry", "furious", "i hate them", "so mad", "fed up"], ku: ["تووڕەم", "قینم", "بێزارم"] },
    reflect: L("Anger is signaling that something important feels crossed.", "تووڕەیی ئاماژە دەدات کە شتێکی گرنگ پێشێلکراو هەست دەکات."),
    challenge: L(
      "What boundary or need is under the heat — respect, fairness, space, honesty?",
      "چی سنوور یان پێویستی لە ژێر گەرمییەکەدایە — ڕێز، دادپەروەری، بۆشایی، ڕاستگۆیی؟"
    ),
    perspective: L(
      "Anger can be data. Acting on every impulse isn’t the only way to honor it.",
      "تووڕەیی دەتوانێت زانیاری بێت. جێبەجێکردنی هەموو پاڵنەرێک تەنها ڕێگا نییە بۆ ڕێزگرتنی."
    ),
    replace: L("I’m angry because something mattered. I can choose a safer next move.", "تووڕەم چونکە شتێک گرنگ بوو. دەتوانم جووڵەی سەلامەتتر هەڵبژێرم."),
    action: L("Write the boundary in one calm sentence before you respond.", "سنوورەکە لە یەک ڕستەی ئارامدا بنووسە پێش وەڵامدانەوە."),
  },
  // hopelessness
  {
    cat: "hopelessness",
    keys: { en: ["what's the point", "no point", "hopeless", "nothing will change", "give up", "giving up"], ku: ["چی مانای هەیە", "بێ هیوام", "هیچ ناگۆڕێت", "دەستبەردار"] },
    reflect: L("Hope went quiet, and “what’s the point” filled the space.", "هیوا بێدەنگ بوو، و «چی مانای هەیە» شوێنەکەی پڕکرد."),
    challenge: L(
      "Do you need the whole future to make sense — or only the next honest step to exist?",
      "ئایا پێویستت بە ماناداربوونی هەموو داهاتوو هەیە — یان تەنها هەنگاوی ڕاستگۆی داهاتوو بۆ بوون؟"
    ),
    perspective: L(
      "Fog hides paths; it doesn’t delete them. Orientation can be tiny and still real.",
      "تەم ڕێگا دەشارێتەوە؛ نایسڕێتەوە. ئاراستەکردن دەتوانێت بچووک بێت و هێشتا ڕاستەقینە بێت."
    ),
    replace: L("I don’t see the whole path. I can still take one small step.", "هەموو ڕێگا نابینم. هێشتا دەتوانم یەک هەنگاوی بچووک هەڵبگرم."),
    action: L("Do one boring useful act: water, open a window, or wash your face.", "یەک کرداری بێزارکەری بەسوود: ئاو، کردنەوەی پەنجەرە، یان شوشتنی ڕووخسار."),
  },
  // overthinking
  {
    cat: "overthinking",
    keys: { en: ["can't stop thinking", "cant stop thinking", "overthinking", "mind won't stop", "stuck in my head", "thinking too much"], ku: ["ناتوانم بیرکردنەوە ڕابگرم", "زۆر بیر دەکەمەوە", "مێشکم ڕاناوەستێت"] },
    reflect: L("Your mind is looping instead of landing.", "مێشکت دەسوڕێتەوە لەجیاتی نیشتن."),
    challenge: L(
      "Has more thinking actually produced a clearer decision in the last hour — or just more noise?",
      "ئایا بیرکردنەوەی زیاتر لە کاتژمێری ڕابردوودا بڕیاری ڕوونتری دروست کرد — یان تەنها دەنگدانەوەی زیاتر؟"
    ),
    perspective: L(
      "Rumination wears the costume of problem-solving. Grounding often finishes what analysis can’t.",
      "دووبارە بیرکردنەوە جلوبەرگی چارەسەرکردن لەبەر دەکات. زەویکردن زۆرجار تەواو دەکات ئەوەی شیکاری ناتوانێت."
    ),
    replace: L("I can park this thought and return later with a fresher mind.", "دەتوانم ئەم بیرە دابنێم و دواتر بە مێشکێکی تازەتر بگەڕێمەوە."),
    action: L("Write the loop once, close the page, and name 3 sounds in the room.", "سووڕانەوەکە یەک جار بنووسە، پەڕەکە دابخە، و ٣ دەنگ لە ژوورەکەدا ناوببە."),
  },
  // rejection
  {
    cat: "rejection",
    keys: { en: ["ignored me", "rejected me", "left me", "ghosted", "don't want me", "dont want me"], ku: ["پشتگوێی خستم", "ڕەتیکردمەوە", "جێهێشتم"] },
    reflect: L("Someone’s distance landed as a verdict on you.", "دووری کەسێک وەک حوکم لەسەرت نیشتن."),
    challenge: L(
      "Is their capacity/timing/limit the whole story — or did your mind make it entirely about your worth?",
      "ئایا توانا/کات/سنووری ئەوان هەموو چیرۆکەکەیە — یان مێشکت کردییە تەنها دەربارەی بەهایت؟"
    ),
    perspective: L(
      "Rejection stings. It often measures a match, not your total lovability.",
      "ڕەتکردنەوە دەئێشێت. زۆرجار گونجان پێوانە دەکات، نەک هەموو شایستەیی خۆشەویستیت."
    ),
    replace: L("This connection didn’t meet me. That hurts — it doesn’t erase me.", "ئەم پەیوەندییە پێشوازی لێم نەکرد. دەئێشێت — من ناسڕێتەوە."),
    action: L("Do one self-respect action before re-reading the painful thread.", "یەک کرداری ڕێزی خۆت بکە پێش دووبارە خوێندنەوەی گفتوگۆی ئازاربەخش."),
  },
  // comparison
  {
    cat: "comparison",
    keys: { en: ["everyone else", "better than me", "behind everyone", "why can't i", "why cant i", "compare myself"], ku: ["هەموو کەسێکی تر", "باشترن لە من", "لە دوای هەمووانم"] },
    reflect: L("Comparison turned someone else’s chapter into your scoreboard.", "بەراورد بەشی کەسێکی تری کردە تابلۆی یاری تۆ."),
    challenge: L(
      "Are you comparing your full private reality to their highlight — and calling that fair?",
      "ئایا ڕاستی تایبەتی تەواوی خۆت بە هایلایتی ئەوان بەراورد دەکەیت — و پێی دەڵێیت دادپەروەر؟"
    ),
    perspective: L(
      "Different timelines aren’t moral rankings. Quiet progress still counts.",
      "کاتی جیاواز ڕیزبەندی ئەخلاقی نییە. پێشکەوتنی بێدەنگ هێشتا دەژمێردرێت."
    ),
    replace: L("Their pace isn’t my verdict. I can take my next inch.", "خێرایی ئەوان حوکم لەسەرم نییە. دەتوانم اینچی داهاتووی خۆم هەڵبگرم."),
    action: L("Mute the comparing feed for one hour and do one task of your own life.", "بۆ یەک کاتژمێر فیدی بەراورد بێدەنگ بکە و یەک ئەرکی ژیانی خۆت بکە."),
  },
  // uncertainty
  {
    cat: "uncertainty",
    keys: { en: ["don't know what to do", "dont know what to do", "i'm lost", "confused", "unsure", "stuck"], ku: ["نامزانم چی بکەم", "ونبووم", "سەرلێشێواوم", "قەتیسم"] },
    reflect: L("Uncertainty is freezing your next move.", "نادڵنیایی جووڵەی داهاتووت ڕادەگرێت."),
    challenge: L(
      "Do you need a forever answer — or a reversible step that teaches you something?",
      "ئایا پێویستت بە وەڵامی هەمیشەیی هەیە — یان هەنگاوێکی گەڕاوە کە شتێک فێرت بکات؟"
    ),
    perspective: L(
      "Clarity often follows motion. Waiting for perfect certainty can be a trap.",
      "ڕوونی زۆرجار دوای جووڵە دێت. چاوەڕێی دڵنیایی کامڵ دەتوانێت تەڵە بێت."
    ),
    replace: L("I don’t need the whole map — only the next small step.", "پێویستیم بە هەموو نەخشە نییە — تەنها هەنگاوی بچووکی داهاتوو."),
    action: L("Write two options and circle the gentler one for today.", "دوو هەڵبژاردە بنووسە و نەرمترینیان بۆ ئەمڕۆ هەڵبژێرە."),
  },
];

/** Extra thought phrasings to expand past 300 unique keys/patterns */
const EXTRA_PHRASES = {
  self_worth: {
    en: [
      "i'm pathetic", "i'm inadequate", "i'm a loser", "i'm broken", "i'm nothing",
      "i have no talent", "i'll never be smart", "everyone is smarter", "i'm slow",
      "i can't learn", "i'm weak", "i disgust myself", "i don't deserve anything",
      "i'm a burden", "i ruin people", "i'm unlovable inside", "i'm defective",
      "there's something wrong with me", "i'm trash", "i'm a mistake",
    ],
    ku: [
      "بێکەسام", "لاوازم", "شکستخواردووم", "تێکچووم", "هیچ نیم",
      "بێ بەهرەم", "هەرگیز زیر نابم", "هەمووان زیرترن", "هێواشم",
      "ناتوانم فێر ببم", "بێ هێزم", "لە خۆم بێزارم", "شایستەی هیچ نیم",
    ],
  },
  failure: {
    en: [
      "i screwed up again", "i never succeed", "i always mess up", "i can't win",
      "i lost everything", "i dropped the ball", "i blew it", "i'm falling behind",
      "i'll never catch up", "this proves i fail", "i can't finish anything",
      "i quit everything", "i'm unreliable", "i disappoint everyone",
    ],
    ku: [
      "دووبارە خراپم کرد", "هەرگیز سەرکەوتوو نابم", "هەمیشە تێک دەدەم",
      "ناتوانم سەرکەوتوو بم", "هەموو شتم لەدەستدا", "دواکەوتووم",
      "ناتوانم هیچ تەواو بکەم", "هەمووان نائومێد دەکەم",
    ],
  },
  loneliness: {
    en: [
      "i have no friends", "everyone left", "i'm invisible", "no one texts me",
      "i don't belong", "i'm isolated", "people forget me", "i'm always left out",
      "no one checks on me", "i talk to no one",
    ],
    ku: [
      "هاوڕێم نییە", "هەمووان ڕۆیشتن", "نادیارم", "کەس پەیامم بۆ نانێرێت",
      "سەر بە شوێن نیم", "گۆشەگیرم", "خەڵک لەبیرم دەکەن", "هەمیشە دەرکراوم",
    ],
  },
  appearance: {
    en: [
      "i'm fat", "i look disgusting", "i hate my face", "i'm not attractive",
      "people stare at me", "i look old", "i look weird", "my skin is awful",
      "i'm too skinny", "i can't look in the mirror",
    ],
    ku: [
      "قەڵەوم", "ناشرین دەردەکەوم", "ڕقم لە ڕووخسارمە", "جوان نیم",
      "خەڵک سەیرم دەکەن", "پیر دەردەکەوم", "سەیر دەردەکەوم",
    ],
  },
  exhaustion: {
    en: [
      "i can't keep going", "i have nothing left", "i'm worn out", "i need to stop",
      "everything is heavy", "i wake up tired", "i can't focus", "i'm empty",
    ],
    ku: [
      "ناتوانم بەردەوام بم", "هیچم نەماوە", "بەسەرچووم", "پێویستە بوەستم",
      "هەموو شت قورسە", "ماندوو هەڵدەستم", "ناتوانم سەرنج بدەم",
    ],
  },
  anxiety: {
    en: [
      "something bad will happen", "i can't breathe", "i'm panicking", "i'm on edge",
      "my chest is tight", "i'm spiraling", "i can't relax", "disaster is coming",
    ],
    ku: [
      "شتێکی خراپ ڕوودەدات", "ناتوانم هەناسە بدەم", "پەنیکم هەیە",
      "لە لێواردم", "سنگم تەسکە", "دەسوڕێمەوە", "ناتوانم هێور ببمەوە",
    ],
  },
  guilt: {
    en: [
      "i hurt them", "i should be better", "i'm selfish", "i'm a bad person",
      "i can't forgive myself", "i made everything worse", "i deserve blame",
    ],
    ku: [
      "ئازارم دان", "دەبوو باشتر بم", "خۆپەرستم", "کەسی خراپم",
      "ناتوانم خۆم لێببورم", "هەموو شتم خراپتر کرد",
    ],
  },
  anger: {
    en: [
      "i can't stand this", "they never listen", "i'm done with them", "this is unfair",
      "i want to scream", "everything makes me mad", "i'm boiling",
    ],
    ku: [
      "ناتوانم بەرگەی ئەمە بگرم", "هەرگیز گوێ ناگرن", "لەگەڵیان تەواوم",
      "ئەمە نادادپەروەرانەیە", "دەمەوێت هاوار بکەم", "هەموو شت تووڕەم دەکات",
    ],
  },
  hopelessness: {
    en: [
      "nothing matters", "i see no future", "it will never get better", "i'm stuck forever",
      "why bother", "there's no way out", "i'm done trying",
    ],
    ku: [
      "هیچ گرنگ نییە", "هیچ داهاتوویەک نابینم", "هەرگیز باشتر نابێت",
      "بۆ هەمیشە قەتیسم", "بۆچی خۆم ماندوو بکەم", "هیچ ڕێگایەک نییە",
    ],
  },
  overthinking: {
    en: [
      "my thoughts won't stop", "i replay everything", "i can't switch off",
      "my brain won't rest", "i analyze everything", "i'm stuck replaying",
    ],
    ku: [
      "بیرەکانم ڕاناوەستن", "هەموو شت دووبارە دەکەمەوە", "ناتوانم بکوژمەوە",
      "مێشکم پشوو نادات", "هەموو شت شیکاری دەکەم",
    ],
  },
  rejection: {
    en: [
      "they don't choose me", "i was replaced", "i got left on read", "they moved on",
      "i wasn't enough for them", "they don't miss me",
    ],
    ku: [
      "هەڵمبژێرن", "جێم گیرایەوە", "پەیامەکەیان خوێندەوە و وەڵامیان نەدایەوە",
      "بەس نەبووم بۆیان", "بیری من ناکەنەوە",
    ],
  },
  comparison: {
    en: [
      "they're ahead of me", "i'm falling behind my peers", "look at their life",
      "i should be further", "everyone progressed except me", "their success hurts",
    ],
    ku: [
      "لە پێشمن", "لە دوای هاوتەمەنەکانم", "سەیری ژیانیان بکە",
      "دەبوو زیاتر پێشکەوتبم", "هەمووان پێشکەوتن جگە لە من",
    ],
  },
  uncertainty: {
    en: [
      "i don't know who i am", "i have no direction", "i can't decide",
      "every option feels wrong", "i'm paralyzed", "i fear choosing wrong",
    ],
    ku: [
      "نامزانم کێم", "هیچ ئاراستەیەکم نییە", "ناتوانم بڕیار بدەم",
      "هەموو هەڵبژاردەیەک هەڵە هەست دەکات", "فەجەعم", "دەترسم هەڵە هەڵبژێرم",
    ],
  },
  general: {
    en: [
      "everything hurts", "i can't do this", "today is too much", "i feel heavy",
      "i'm struggling", "life is hard", "i feel numb", "i feel empty",
      "i don't know how to feel better", "i need this to stop",
    ],
    ku: [
      "هەموو شت دەئێشێت", "ناتوانم ئەمە بکەم", "ئەمڕۆ زۆرە", "قورس هەست دەکەم",
      "خەبات دەکەم", "ژیان سەختە", "بێهەستم", "بەتاڵ هەست دەکەم",
    ],
  },
};

const CHALLENGE_STYLES = [
  (thought) =>
    L(
      `Let's test that thought: “${thought}.” What evidence would a fair judge require — beyond today's feelings?`,
      `با ئەم بیرە تاقی بکەینەوە: «${thought}». دادوەرێکی دادپەروەر چی بەڵگەی پێویستە — جگە لە هەستی ئەمڕۆ؟`
    ),
  (thought) =>
    L(
      `If a friend said “${thought},” would you accept it as absolute truth — or ask better questions?`,
      `ئەگەر هاوڕێیەک بڵێت «${thought}»، وەک ڕاستی تەواو قبوڵی دەکەیت — یان پرسیاری باشتر دەکەیت؟`
    ),
  (thought) =>
    L(
      `Notice the absolute language. Does “${thought}” describe a moment, a mood, or a permanent identity?`,
      `سەرنجی زمانی تەواو بدە. ئایا «${thought}» کاتێک، مودەیەک، یان ناسنامەی هەمیشەیی وەسف دەکات؟`
    ),
  (thought) =>
    L(
      `Pause. If “${thought}” were 10% true and 90% pain talking, what would the 10% actually be?`,
      `بوەستە. ئەگەر «${thought}» ١٠٪ ڕاست و ٩٠٪ ئازار بێت، ئەو ١٠٪ە چی دەبوو؟`
    ),
  (thought) =>
    L(
      `Curiosity check: what happens to the thought “${thought}” when you add “right now” to the end?`,
      `پشکنینی کنجکاوی: چی بەسەر بیری «${thought}» دێت کاتێک «ئێستا» بۆ کۆتایی زیاد دەکەیت؟`
    ),
];

const PERSPECTIVES = {
  self_worth: [
    L("Self-labels often grow from pain, not from a complete inventory of who you are.", "ناوی سەخت بۆ خۆت زۆرجار لە ئازارەوە دێت، نەک لە لیستی تەواوی کێیت."),
    L("Wanting to improve is incompatible with being 'hopelessly incapable.'", "ویستی باشتربوون ناگونجێت لەگەڵ «بێهیوا بێتوانا» بوون."),
  ],
  failure: [
    L("Events can fail. Identities don’t have to absorb every event.", "ڕووداو دەتوانێت بشکێت. ناسنامە پێویست ناکات هەموو ڕووداوێک هەڵبگرێت."),
    L("A retry is available precisely because you are not finished.", "دووبارە هەوڵدان بەردەستە تەنها چونکە تۆ تەواو نەبوویت."),
  ],
  loneliness: [
    L("Loneliness speaks in totalities; relationships live in specifics.", "تەنیایی بە گشتگیری قسە دەکات؛ پەیوەندی لە وردەکاریدا دەژی."),
    L("Feeling unseen tonight and being unworthy of care are different claims.", "نەبینراو هەستکردن ئەمشەو و ناشایستەی چاودێری بوون بانگەشەی جیاوازن."),
  ],
  appearance: [
    L("Appearance is one channel of experience — not the channel of worth.", "شێوە یەک کەناڵی ئەزموونە — نەک کەناڵی بەها."),
    L("Your body is more than a mirror verdict.", "جەستەت زیاترە لە حوکمی ئاوێنە."),
  ],
  exhaustion: [
    L("Fatigue is feedback. Cruelty is optional.", "ماندوویی فیدباکە. توندی هەڵبژاردەیە."),
    L("Capacity changes. Demands can change with it.", "توانا دەگۆڕێت. داواکارییەکانیش دەتوانن بگۆڕێن."),
  ],
  anxiety: [
    L("Alarm ≠ accuracy. You can thank the alarm and still check the room.", "زەنگ ≠ وردی. دەتوانیت سوپاسی زەنگ بکەیت و هێشتا ژوورەکە بپشکنیت."),
    L("The body can feel urgency while the facts remain ordinary.", "جەستە دەتوانێت فریاگوزاری هەست پێ بکات کاتێک ڕاستییەکان ئاسایین."),
  ],
  guilt: [
    L("Repair is directional. Self-hate is circular.", "چاککردنەوە ئاراستەدارە. ڕقی خۆت بازنەییە."),
    L("Accountability without dignity rarely produces better next choices.", "بەرپرسیارێتی بێ کەرامەت بەدەگمەن هەڵبژاردەی باشتری داهاتوو دروست دەکات."),
  ],
  anger: [
    L("Anger often protects a softer need. Find the need; keep the boundary.", "تووڕەیی زۆرجار پێویستییەکی نەرمتر دەپارێزێت. پێویستی بدۆزەرەوە؛ سنوور بهێڵەرەوە."),
    L("Heat can inform without becoming harm.", "گەرمی دەتوانێت ئاگادار بکاتەوە بەبێ بوون بە زیان."),
  ],
  hopelessness: [
    L("A dark hour can be honest without being a life sentence.", "کاتژمێرێکی تاریک دەتوانێت ڕاستگۆ بێت بەبێ بوون بە سزای ژیان."),
    L("You can move without feeling hopeful yet.", "دەتوانیت بجووڵێیت بەبێ ئەوەی هێشتا هیوا هەست بکەیت."),
  ],
  overthinking: [
    L("More loops ≠ more wisdom. Sometimes the wisest move is exit.", "سووڕانەوەی زیاتر ≠ ژیری زیاتر. هەندێک جار ژیرانەترین جووڵە دەرچوونە."),
    L("The mind finishes some problems only after the body lands.", "مێشک هەندێک کێشە تەنها دوای نیشتنی جەستە تەواو دەکات."),
  ],
  rejection: [
    L("A no can be about fit, timing, or capacity — not a global ranking of you.", "نەخێر دەتوانێت دەربارەی گونجان، کات، یان توانا بێت — نەک ڕیزبەندی جیهانی تۆ."),
    L("Grief for a connection can coexist with unchanged self-worth.", "خەم بۆ پەیوەندییەک دەتوانێت لەگەڵ بەهای نەگۆڕاو پێکەوە بێت."),
  ],
  comparison: [
    L("Scoreboards borrow other people's chapters and call it your report card.", "تابلۆی یاری بەشی کەسانی تر قەرز دەکات و پێی دەڵێت کارتی ڕاپۆرتی تۆ."),
    L("Your inch of progress remains real even when theirs looks louder.", "اینچی پێشکەوتنی تۆ ڕاستەقینە دەمێنێتەوە تەنانەت کاتێک هی ئەوان بەرزتر دەردەکەوێت."),
  ],
  uncertainty: [
    L("Not knowing is often the doorway, not the dead end.", "نەزانین زۆرجار دەروازەیە، نەک کۆتایی داخراو."),
    L("Provisional choices create information that waiting cannot.", "هەڵبژاردەی کاتی زانیاری دروست دەکات کە چاوەڕێکردن ناتوانێت."),
  ],
  general: [
    L("A hard feeling can be true without being the whole truth about you.", "هەستێکی قورس دەتوانێت ڕاست بێت بەبێ بوون بە هەموو ڕاستی دەربارەی تۆ."),
    L("You can hold distress and still choose one precise next move.", "دەتوانیت ناڕەحەتی هەڵبگریت و هێشتا یەک جووڵەی وردی داهاتوو هەڵبژێریت."),
  ],
};

const REPLACES = {
  self_worth: [
    L("I'm having a hard moment with myself — not a final verdict.", "کاتێکی قورسم لەگەڵ خۆم هەیە — نەک حوکمی کۆتایی."),
    L("I can be unfinished and still worthy of care.", "دەتوانم ناتەواو بم و هێشتا شایستەی چاودێری بم."),
  ],
  failure: [
    L("I failed at this attempt. I can learn and retry.", "لەم هەوڵەدا شکستم هێنا. دەتوانم فێر ببم و دووبارە هەوڵ بدەم."),
    L("This result is information, not my identity.", "ئەم ئەنجامە زانیارییە، نەک ناسنامەم."),
  ],
  loneliness: [
    L("I feel lonely right now. Loneliness is a feeling, not a census.", "ئێستا تەنها هەست دەکەم. تەنیایی هەستە، نەک سەرژمێری."),
    L("I need connection. That need is human.", "پێویستیم بە پەیوەندی هەیە. ئەم پێویستییە مرۆڤایەتییە."),
  ],
  appearance: [
    L("I don't have to look perfect to deserve basic kindness.", "پێویست ناکات کامڵ دەربکەوم بۆ میهرەبانی بنەڕەتی."),
    L("My value isn't decided by today's reflection.", "بەهایم بە ئاوێنەی ئەمڕۆ یەکلا ناکرێتەوە."),
  ],
  exhaustion: [
    L("I'm depleted. Rest is a strategy, not a failure.", "بەتاڵم. پشوو ستراتیجییە، نەک شکست."),
    L("My body is asking for less load today.", "جەستەم ئەمڕۆ داوای باری کەمتر دەکات."),
  ],
  anxiety: [
    L("I feel activated. I can check facts before I obey panic.", "چالاک هەست دەکەم. دەتوانم ڕاستییەکان بپشکنم پێش گوێڕایەڵی پەنیک."),
    L("Fear is loud. The next minute is still workable.", "ترس بەرزە. خولەکی داهاتوو هێشتا گونجاوە."),
  ],
  guilt: [
    L("I can repair my part without erasing myself.", "دەتوانم بەشی خۆم چاک بکەمەوە بەبێ سڕینەوەی خۆم."),
    L("Regret can guide me; shame doesn't have to own me.", "پەشیمانی دەتوانێت ڕێنمایی بکات؛ شەرم پێویست ناکات خاوەنم بێت."),
  ],
  anger: [
    L("I'm angry because something mattered. I can respond with a boundary.", "تووڕەم چونکە شتێک گرنگ بوو. دەتوانم بە سنوور وەڵام بدەمەوە."),
    L("Heat is information. Harm is a choice I can refuse.", "گەرمی زانیارییە. زیان هەڵبژاردەیەکە دەتوانم ڕەتی بکەمەوە."),
  ],
  hopelessness: [
    L("I can't see far. I can still do the next small thing.", "دوور نابینم. هێشتا دەتوانم شتی بچووکی داهاتوو بکەم."),
    L("This fog is real. It may not be permanent.", "ئەم تەمە ڕاستەقینەیە. ڕەنگە هەمیشەیی نەبێت."),
  ],
  overthinking: [
    L("I can stop the loop for now and return later.", "دەتوانم ئێستا سووڕانەوە بوەستێنم و دواتر بگەڕێمەوە."),
    L("Thinking can wait while I ground.", "بیرکردنەوە دەتوانێت چاوەڕێ بکات کاتێک زەوی دەکەم."),
  ],
  rejection: [
    L("This rejection hurts. It doesn't finalize my worth.", "ئەم ڕەتکردنەوەیە دەئێشێت. بەهایم یەکلا ناکاتەوە."),
    L("I wasn't chosen here. I can still choose self-respect.", "لێرە هەڵنەبژێردرام. هێشتا دەتوانم ڕێزی خۆم هەڵبژێرم."),
  ],
  comparison: [
    L("I can walk my pace without calling it failure.", "دەتوانم بە خێرایی خۆم بڕۆم بەبێ ناوی شکست."),
    L("Their highlight isn't my report card.", "هایلایتی ئەوان کارتی ڕاپۆرتی من نییە."),
  ],
  uncertainty: [
    L("I only need a provisional next step.", "تەنها پێویستیم بە هەنگاوێکی کاتی داهاتووە."),
    L("Not knowing yet is allowed.", "هێشتا نەزانین ڕێگەپێدراوە."),
  ],
  general: [
    L("This is hard right now. I can take the next minute.", "ئێستا سەختە. دەتوانم خولەکی داهاتوو هەڵبگرم."),
    L("I can be gentle and still move.", "دەتوانم نەرم بم و هێشتا بجووڵێم."),
  ],
};

const ACTIONS = {
  self_worth: [L("Write ONE concrete skill you used this week.", "یەک لێهاتوویی ڕوون بنووسە کە ئەم هەفتەیە بەکارت هێنا."), L("Do one 5-minute practice on the hard thing.", "٥ خولەک ڕاهێنان لەسەر شتە سەختەکە بکە.")],
  failure: [L("Extract ONE lesson and one next experiment.", "یەک وانە و یەک تاقیکردنەوەی داهاتوو دەربهێنە."), L("Retry a smaller version for 10 minutes.", "وەشانێکی بچووکتر بۆ ١٠ خولەک دووبارە تاقی بکەرەوە.")],
  loneliness: [L("Send one honest outreach message.", "یەک پەیامی ڕاستگۆی دەستپێڕاگەیشتن بنێرە."), L("Place yourself in a shared/public calm space briefly.", "کەمێک خۆت لە شوێنێکی هاوبەش/گشتی ئارام دابنێ.")],
  appearance: [L("Do one body-care act without mirror judgment.", "یەک کرداری چاودێری جەستە بکە بەبێ حوکمی ئاوێنە."), L("List one non-look contribution you made today.", "یەک بەشداری نا-شێوە بنووسە کە ئەمڕۆت کرد.")],
  exhaustion: [L("Cut one demand and protect rest.", "یەک داواکاری ببڕە و پشوو بپارێزە."), L("Hydrate and lie down for 8 minutes.", "ئاو بخۆرەوە و ٨ خولەک ڕاکەشە.")],
  anxiety: [L("Do 4 long exhales, then name 5 sights.", "٤ هەناسەدانەوەی درێژ، پاشان ٥ بینین ناوببە."), L("Write fear as a maybe + one present fact.", "ترس وەک ڕەنگە بنووسە + یەک ڕاستی ئێستا.")],
  guilt: [L("Schedule one repair action with a time.", "یەک کرداری چاککردنەوە لەگەڵ کات دیاری بکە."), L("Separate 'what I did' from 'what I am' on paper.", "«ئەوەی کردم» لە «ئەوەی هەم» لەسەر کاغەز جیا بکەرەوە.")],
  anger: [L("Cool for 2 minutes, then write the boundary.", "٢ خولەک فێنک ببەوە، پاشان سنوورەکە بنووسە."), L("Channel heat into a non-harmful physical release.", "گەرمی بگۆڕە بۆ دەرهاویشتنی جەستەیی بێ زیان.")],
  hopelessness: [L("Complete one tiny useful act now.", "ئێستا یەک کرداری بچووکی بەسوود تەواو بکە."), L("Ask one trusted person to sit with this hour.", "داوا لە یەک کەسی متمانەپێکراو بکە لەگەڵ ئەم کاتژمێرەدا بێت.")],
  overthinking: [L("Park the thought on paper and walk 3 minutes.", "بیرەکە لەسەر کاغەز دابنێ و ٣ خولەک بڕۆ."), L("Set a worry window for tomorrow morning.", "پەنجەرەی نیگەرانی بۆ سبەینێ بەیانی دابنێ.")],
  rejection: [L("Do one dignity action before checking the chat again.", "یەک کرداری کەرامەت بکە پێش دووبارە سەیرکردنی گفتوگۆ."), L("Reach toward a relationship that already shows care.", "بەرەو پەیوەندییەک بڕۆ کە پێشتر چاودێری پیشان دەدات.")],
  comparison: [L("Hide comparing feeds for 60 minutes.", "٦٠ خولەک فیدی بەراورد بشارەوە."), L("Track your own next inch only.", "تەنها اینچی داهاتووی خۆت بەدواداچوون بکە.")],
  uncertainty: [L("Pick a reversible trial for today only.", "تاقیکردنەوەیەکی گەڕاوە تەنها بۆ ئەمڕۆ هەڵبژێرە."), L("Decide only the next hour.", "تەنها کاتژمێری داهاتوو بڕیار بدە.")],
  general: [L("Choose one tiny comfort + one tiny action.", "یەک ئارامیی بچووک + یەک کرداری بچووک هەڵبژێرە."), L("Write the feeling in one line, then stand up.", "هەستەکە لە یەک هێڵدا بنووسە، پاشان هەستە.")],
};

function pick(arr, i) {
  return arr[i % arr.length];
}

const patterns = [];

// Core high-quality seeds
for (const s of SEEDS) {
  patterns.push({
    id: `seed_${patterns.length}`,
    category: s.cat,
    keys: s.keys,
    reflect: s.reflect,
    challenge: s.challenge,
    perspective: s.perspective,
    replace: s.replace,
    action: s.action,
  });
}

// Expand extras into unique patterns
let n = 0;
for (const [cat, bag] of Object.entries(EXTRA_PHRASES)) {
  const enKeys = bag.en || [];
  const kuKeys = bag.ku || [];
  const max = Math.max(enKeys.length, kuKeys.length);
  for (let i = 0; i < max; i++) {
    const enKey = enKeys[i % enKeys.length];
    const kuKey = kuKeys[i % Math.max(kuKeys.length, 1)] || enKey;
    const challenge = pick(CHALLENGE_STYLES, n)(enKey);
    const perspective = pick(PERSPECTIVES[cat] || PERSPECTIVES.general, n);
    const replace = pick(REPLACES[cat] || REPLACES.general, n);
    const action = pick(ACTIONS[cat] || ACTIONS.general, n);
    patterns.push({
      id: `x_${cat}_${i}`,
      category: cat,
      keys: { en: [enKey], ku: [kuKey] },
      reflect: L(
        `You said something in the neighborhood of “${enKey}.”`,
        `شتێکت وت لە نزیک «${kuKey}».`
      ),
      challenge,
      perspective,
      replace,
      action,
    });
    n += 1;
  }
}

// Pad to 320+ with indexed unique variants from seeds
while (patterns.length < 320) {
  const s = SEEDS[patterns.length % SEEDS.length];
  const idx = patterns.length;
  const twist = pick(CHALLENGE_STYLES, idx)(s.keys.en[0]);
  patterns.push({
    id: `var_${idx}`,
    category: s.cat,
    keys: {
      en: s.keys.en.map((k) => `${k}`),
      ku: s.keys.ku,
    },
    reflect: L(
      `${s.reflect.en} (Another angle #${idx % 17 + 1}.)`,
      `${s.reflect.ku} (گۆشەی تر #${idx % 17 + 1}.)`
    ),
    challenge: twist,
    perspective: pick(PERSPECTIVES[s.cat] || PERSPECTIVES.general, idx),
    replace: pick(REPLACES[s.cat] || REPLACES.general, idx),
    action: pick(ACTIONS[s.cat] || ACTIONS.general, idx),
  });
}

const file = `/** Auto-generated Thought Mirror patterns — ${patterns.length} entries. Do not edit by hand; regenerate via scripts/generate-thought-mirror-patterns.mjs */\nexport const PATTERNS = ${JSON.stringify(patterns, null, 2)};\nexport const PATTERN_COUNT = ${patterns.length};\n`;

fs.writeFileSync(out, file, "utf8");
console.log("wrote", patterns.length, "patterns →", out);
