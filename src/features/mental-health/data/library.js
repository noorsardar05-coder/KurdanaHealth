export const DISCLAIMER = {
  en: "This is gentle education — not a diagnosis or replacement for professional care.",
  ku: "ئەمە فێرکارییەکی نەرمە — نەک دەستنیشانکردن، و جێگەی چاودێری پسپۆڕی ناگرێتەوە.",
};

export const LIBRARY_CATEGORIES = [
  { id: "all", title: { en: "All", ku: "هەموو" } },
  { id: "mood", title: { en: "Mood", ku: "دۆخی دەروونی" } },
  { id: "anxiety", title: { en: "Anxiety & Fear", ku: "نیگەرانی و ترس" } },
  { id: "stress", title: { en: "Stress & Energy", ku: "فشار و وزە" } },
  { id: "self", title: { en: "Self & Identity", ku: "خۆت و ناسنامە" } },
  { id: "life", title: { en: "Life Challenges", ku: "ئاڵنگارییەکانی ژیان" } },
  { id: "neuro", title: { en: "Neurodiversity", ku: "جیاوازیی مێشک و هەست" } },
];

export const LIBRARY_TOPICS = [
  {
    id: "anxiety",
    category: "anxiety",
    hue: "#8B7EC8",
    accent: "#6B5B95",
    title: { en: "Anxiety", ku: "نیگەرانی" },
    subtitle: { en: "When worry won’t quiet down", ku: "کاتێک نیگەرانی ئارام نابێتەوە." },
    explanation: {
      en: "Anxiety is your body’s alarm system trying to protect you from danger — even when there isn’t any right now. It can show up as racing thoughts, a tight chest, or a restless feeling that won’t settle. This page is here to help you understand it, not to diagnose you.",
      ku: "دڵەڕاوکێ سیستەمی ئاگاداری جەستەتە کە هەوڵ دەدات بتپارێزێت لە مەترسی — تەنانەت کاتێک ئێستا هیچ مەترسیەک نییە. دەکرێت وەک بیرکردنەوەی خێرا، توندی سنگ، یان هەستێکی بێقەراری دەربکەوێت کە دانانیشێت. ئەم پەڕەیە بۆ ئەوەیە یارمەتیت بدات تێبگەیت، نەک دەستنیشانکردن.",
    },
    symptoms: [
      { en: "Racing or repetitive worried thoughts", ku: "بیرکردنەوەی خێرا و دووبارەبووی نیگەرانی" },
      { en: "A tight chest or fast heartbeat", ku: "توندی سنگ یان لێدانی خێرای دڵ" },
      { en: "Trouble sitting still or relaxing", ku: "گرفت لە دانیشتنی هێمن یان ئارامگرتن" },
      { en: "Trouble falling asleep because the mind won’t stop", ku: "گرفت لە خەوتن چونکە مێشک ناوەستێت" },
      { en: "Avoiding places or situations that feel unsafe", ku: "دووریگرتنەوە لە شوێن یان دۆخێک کە ناسەلامەت هەست پێی دەکرێت" },
    ],
    myths: [
      {
        myth: { en: "Anxious people just need to relax", ku: "کەسانی دڵەڕاوکێدار تەنها پێویستیان بە ئارامگرتنە" },
        fact: { en: "Anxiety is a real body response, not a choice — it can’t be switched off by willpower alone.", ku: "دڵەڕاوکێ وەڵامێکی ڕاستەقینەی جەستەیە، نەک هەڵبژاردن — تەنها بە ویست ناتوانرێت بکوژرێتەوە." },
      },
      {
        myth: { en: "If you look calm, you’re not anxious", ku: "ئەگەر بە ئارام دیاربیت، ئەوا دڵەڕاوکێت نییە" },
        fact: { en: "Many people hide anxiety well while feeling a storm inside.", ku: "زۆر کەس دڵەڕاوکێیان بە باشی دەشارنەوە کاتێک لە ناوەوە هەستی بە زریان دەکەن." },
      },
      {
        myth: { en: "Anxiety means something is seriously wrong with you", ku: "دڵەڕاوکێ واتای ئەوەیە کە شتێکی گەورە هەڵەیە لەگەڵت" },
        fact: { en: "Anxiety is one of the most common human experiences — it doesn’t mean you are broken.", ku: "دڵەڕاوکێ یەکێکە لە باوترین ئەزموونەکانی مرۆڤایەتی — واتای ئەوە نییە کە تۆ تێکچووی." },
      },
    ],
    seekHelp: {
      en: "If worry stays most days for weeks, or it stops you from daily life, talking to a mental health professional can help. This is general information, not a diagnosis.",
      ku: "ئەگەر نیگەرانی زۆربەی ڕۆژەکان بۆ هەفتەکان بمێنێتەوە، یان ڕێگری لە ژیانی ڕۆژانەت بکات، قسەکردن لەگەڵ پسپۆڕێکی تەندروستی دەروونی دەتوانێت یارمەتیدەر بێت. ئەمە زانیاریی گشتییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Take slow breaths — make the exhale longer than the inhale.", ku: "بە هێواشی هەناسە بدە — هەناسەدان لە هەناسەکێشان درێژتر بکە." },
      { en: "Name five things you can see and three you can hear.", ku: "پێنج شت ناوببە کە دەیبینیت و سێ شت کە دەیبیستیت." },
      { en: "Write worries down instead of replaying them in your head.", ku: "نیگەرانییەکان بنووسە لەبری ئەوەی لە مێشکتدا دووبارەیان بکەیتەوە." },
      { en: "Move your body — even a short walk helps release tension.", ku: "جەستەت بجوڵێنە — تەنانەت پیادەڕۆیشتنێکی کورت یارمەتی بەربوونی گوشار دەدات." },
      { en: "Limit caffeine — it can make a racing mind feel worse.", ku: "کافین کەم بکەرەوە — دەتوانێت هەستی بیرکردنەوەی خێرا خراپتر بکات." },
    ],
    related: ["panic", "stress", "sleep"],
    quiz: [
      {
        q: { en: "What is anxiety, in simple terms?", ku: "دڵەڕاوکێ بە سادەیی چییە؟" },
        options: [
          { en: "A sign of weakness", ku: "نیشانەی لاوازی" },
          { en: "The body’s alarm system reacting to perceived danger", ku: "سیستەمی ئاگاداری جەستە کە وەڵامی مەترسی خەیاڵی دەداتەوە" },
          { en: "A disease that never improves", ku: "نەخۆشییەکە هەرگیز باش نابێتەوە" },
        ],
        correct: 1,
        explain: { en: "Anxiety is a protective response — understanding it as biology, not weakness, is the first step.", ku: "دڵەڕاوکێ وەڵامێکی پاراستنە — تێگەیشتن لێی وەک زیندەزانی، نەک لاوازی، هەنگاوی یەکەمە." },
      },
      {
        q: { en: "Which of these can genuinely help with anxiety?", ku: "کام لەمانە ڕاستەقینە یارمەتی دڵەڕاوکێ دەدات؟" },
        options: [
          { en: "Slow breathing and grounding", ku: "هەناسەدانی هێواش و دامەزراندنی هۆش" },
          { en: "Avoiding every hard situation forever", ku: "هەمیشە دووریگرتنەوە لە هەموو دۆخێکی سەخت" },
          { en: "Ignoring the feeling completely", ku: "پشتگوێخستنی تەواوی هەستەکە" },
        ],
        correct: 0,
        explain: { en: "Slow breathing and grounding calm the body’s alarm system in the moment.", ku: "هەناسەدانی هێواش و دامەزراندنی هۆش لەو ساتەدا سیستەمی ئاگاداری جەستە هێور دەکاتەوە." },
      },
      {
        q: { en: "True or false: Anxiety means something is seriously wrong with you.", ku: "ڕاستە یان هەڵە: دڵەڕاوکێ واتای ئەوەیە کە شتێکی گەورە هەڵەیە لەگەڵت؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — it’s a common human experience", ku: "هەڵەیە — ئەزموونێکی باوی مرۆڤایەتییە" },
          { en: "Only true for adults", ku: "تەنها بۆ گەورەکان ڕاستە" },
        ],
        correct: 1,
        explain: { en: "Anxiety is one of the most common experiences people share — it doesn’t define who you are.", ku: "دڵەڕاوکێ یەکێکە لە باوترین ئەزموونەکان کە خەڵک هاوبەشی دەکەن — ئەوە دیاریناکات تۆ کێیت." },
      },
    ],
    dailyTip: { en: "Today, try one slow breath before reacting to a worry.", ku: "ئەمڕۆ، پێش وەڵامدانەوە بە نیگەرانییەک، یەک هەناسەی هێواش تاقی بکەرەوە." },
  },
  {
    id: "depression",
    category: "mood",
    hue: "#6B93B8",
    accent: "#4A6C8C",
    title: { en: "Depression", ku: "خەمۆکی" },
    subtitle: { en: "When everything feels heavy", ku: "کاتێک هەموو شتێک قورس هەست پێدەکرێت." },
    explanation: {
      en: "Depression is more than sadness — it can drain energy, motivation, and joy from things you used to love. It often comes with heavy thoughts and a sense that nothing will change. Learning about it is a step toward understanding, not a diagnosis.",
      ku: "خەمۆکی زیاترە لە دڵتەنگی — دەتوانێت وزە، ئاراستە، و خۆشی لەو شتانە بسڕێتەوە کە جاران خۆشت دەویستن. زۆرجار لەگەڵ بیرکردنەوەی قورس و هەستێک دێت کە هیچ شتێک ناگۆڕدرێت. فێربوون لەسەری هەنگاوێکە بەرەو تێگەیشتن، نەک دەستنیشانکردن.",
    },
    symptoms: [
      { en: "Feeling sad, empty, or numb most of the day", ku: "هەستکردن بە خەمۆکی، بەتاڵی، یان بێهەستی زۆربەی ڕۆژ" },
      { en: "Losing interest in things you used to enjoy", ku: "لەدەستدانی ئارەزوو بۆ شتانێک کە جاران خۆشت دەویستن" },
      { en: "Changes in sleep or appetite", ku: "گۆڕانکاری لە خەو یان بەتامی خواردن" },
      { en: "Feeling tired even after resting", ku: "هەستکردن بە ماندووبوون تەنانەت دوای پشوودان" },
      { en: "Trouble concentrating or making decisions", ku: "گرفت لە کۆکردنەوەی بیر یان بڕیاردان" },
    ],
    myths: [
      {
        myth: { en: "Depression is just being lazy or sad for no reason", ku: "خەمۆکی تەنها تەمبەڵی یان دڵتەنگی بێ هۆکارە" },
        fact: { en: "Depression is a real condition involving brain chemistry, life events, and biology — not a character flaw.", ku: "خەمۆکی دۆخێکی ڕاستەقینەیە کە کیمیای مێشک، ڕووداوی ژیان، و زیندەزانی تێدایە — نەک کێشەیەکی کەسایەتی." },
      },
      {
        myth: { en: "People with depression always look sad", ku: "کەسانی خەمۆک هەمیشە دڵتەنگ دیارن" },
        fact: { en: "Many people with depression smile and function daily while struggling deeply inside.", ku: "زۆر کەسی خەمۆک پێدەکەنن و کاری ڕۆژانە دەکەن کاتێک لە ناوەوە بە قوڵی تێدەکۆشن." },
      },
      {
        myth: { en: "You can just snap out of depression", ku: "دەتوانیت بە یەکجار لە خەمۆکی دەربچیت" },
        fact: { en: "Recovery usually takes time, support, and sometimes professional care — not a single decision.", ku: "چاکبوونەوە زۆرجار کات، پشتگیری، و هەندێک جار چاودێری پسپۆڕی پێویستە — نەک تەنها یەک بڕیار." },
      },
    ],
    seekHelp: {
      en: "If low mood lasts most days for two weeks or more, or affects daily life, reaching out to a mental health professional is a caring step. This page offers education, not diagnosis.",
      ku: "ئەگەر خەمۆکی زۆربەی ڕۆژەکان بۆ دوو هەفتە یان زیاتر بمێنێتەوە، یان کاریگەری لەسەر ژیانی ڕۆژانە دابنێت، پەیوەندیکردن لەگەڵ پسپۆڕێکی تەندروستی دەروونی هەنگاوێکی خۆشەویستییە. ئەم پەڕەیە فێرکاری پێشکەش دەکات، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Try to keep one small daily routine, even if it feels hard.", ku: "هەوڵبدە یەک ڕۆتینی بچووکی ڕۆژانە بپارێزیت، تەنانەت ئەگەر سەخت بێت." },
      { en: "Get sunlight or fresh air for a few minutes each day.", ku: "چەند خولەکێک ڕۆژانە تیشکی خۆر یان هەوای پاک وەربگرە." },
      { en: "Reach out to one person, even with a short message.", ku: "پەیوەندی لەگەڵ یەک کەس بکە، تەنانەت بە نامەیەکی کورت." },
      { en: "Break tasks into very small steps.", ku: "کارەکان بکە بە هەنگاوی زۆر بچووک." },
      { en: "Be gentle with yourself — healing isn’t a straight line.", ku: "لەگەڵ خۆت نەرم بە — چاکبوونەوە هێڵێکی ڕاست نییە." },
    ],
    related: ["grief", "loneliness", "self-esteem"],
    quiz: [
      {
        q: { en: "Depression is best described as:", ku: "باشترین ڕوونکردنەوەی خەمۆکی چییە؟" },
        options: [
          { en: "Just feeling sad sometimes", ku: "تەنها هەندێک جار دڵتەنگبوون" },
          { en: "A lasting state that drains energy and joy", ku: "دۆخێکی بەردەوام کە وزە و خۆشی دەسڕێتەوە" },
          { en: "A choice someone makes", ku: "هەڵبژاردنێکە کە کەسێک دەیکات" },
        ],
        correct: 1,
        explain: { en: "Depression lasts longer than everyday sadness and affects energy, sleep, and motivation.", ku: "خەمۆکی لە دڵتەنگیی ڕۆژانە درێژتر دەخایەنێت و کاریگەری لەسەر وزە، خەو، و ئاراستە دادەنێت." },
      },
      {
        q: { en: "What can help someone with depression?", ku: "چی دەتوانێت یارمەتی کەسێکی خەمۆک بدات؟" },
        options: [
          { en: "Telling them to just be happy", ku: "پێیان بڵێی تەنها دڵخۆش بن" },
          { en: "Small routines, sunlight, and gentle support", ku: "ڕۆتینی بچووک، تیشکی خۆر، و پشتگیریی نەرم" },
          { en: "Leaving them completely alone", ku: "بە تەواوی بەجێهێشتنیان" },
        ],
        correct: 1,
        explain: { en: "Small steady steps and support make recovery more possible over time.", ku: "هەنگاوی بچووکی بەردەوام و پشتگیری چاکبوونەوە بە کاتی زیاتر شیاو دەکات." },
      },
      {
        q: { en: "True or false: People with depression always look visibly sad.", ku: "ڕاستە یان هەڵە: کەسانی خەمۆک هەمیشە بە ئاشکرا دڵتەنگ دیارن؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — many hide it well", ku: "هەڵەیە — زۆر کەس بە باشی دەیشارنەوە" },
          { en: "Only children hide it", ku: "تەنها منداڵان دەیشارنەوە" },
        ],
        correct: 1,
        explain: { en: "Depression can be invisible — someone smiling may still be struggling deeply.", ku: "خەمۆکی دەتوانێت نەبیندراو بێت — کەسێک کە پێدەکەنێت لەوانەیە هێشتا بە قوڵی تێبکۆشێت." },
      },
    ],
    dailyTip: { en: "Today, try one small act of kindness toward yourself.", ku: "ئەمڕۆ، یەک کردەوەی بچووکی میهرەبانی بۆ خۆت تاقی بکەرەوە." },
  },
  {
    id: "panic",
    category: "anxiety",
    hue: "#C87E9E",
    accent: "#95466B",
    title: { en: "Panic Attacks", ku: "هێرشەکانی دڵەڕاوکێ" },
    subtitle: { en: "When fear arrives all at once", ku: "کاتێک ترس بە یەکجار دێت." },
    explanation: {
      en: "A panic attack is a sudden surge of intense fear that peaks within minutes, often with strong physical sensations. It can feel terrifying, but it is not dangerous by itself and it does pass. Understanding what’s happening in your body can make it feel less frightening.",
      ku: "هێرشی دڵەڕاوکێ شەپۆلێکی لەناکاوی ترسی بەهێزە کە لە ماوەی چەند خولەکێکدا دەگاتە لووتکە، زۆرجار لەگەڵ هەستی بەهێزی جەستەیی. دەتوانێت ترسناک هەست پێبکرێت، بەڵام بەخۆیی مەترسیدار نییە و تێدەپەڕێت. تێگەیشتن لەوەی چی لە جەستەتدا ڕوودەدات دەتوانێت کەمتر ترسناک بیکات.",
    },
    symptoms: [
      { en: "A racing heart or pounding chest", ku: "دڵێکی خێرا یان تەکانی سنگ" },
      { en: "Shortness of breath or feeling like you can’t breathe", ku: "کورتی هەناسە یان هەستکردن بەوەی ناتوانیت هەناسە بدەیت" },
      { en: "Dizziness or feeling unreal", ku: "سەرگێژان یان هەستکردن بەوەی هەموو شتێک ناڕاستەقینەیە" },
      { en: "Trembling, sweating, or tingling hands", ku: "لەرزین، خۆڵقاندن، یان کزکردنی دەست" },
      { en: "A sudden fear that something terrible is about to happen", ku: "ترسێکی لەناکاو کە شتێکی خراپ خەریکە ڕوودەدات" },
    ],
    myths: [
      {
        myth: { en: "A panic attack means you’re having a heart attack", ku: "هێرشی دڵەڕاوکێ واتای ئەوەیە کە هێرشی دڵت هەیە" },
        fact: { en: "Panic attacks feel intense but are not physically dangerous, even though the body reacts strongly.", ku: "هێرشی دڵەڕاوکێ بەهێز هەست پێدەکرێت بەڵام لە ڕووی جەستەییەوە مەترسیدار نییە، هەرچەندە جەستە بەهێز وەڵام دەداتەوە." },
      },
      {
        myth: { en: "You can control a panic attack by willpower alone", ku: "دەتوانیت هێرشی دڵەڕاوکێ تەنها بە ویست کۆنترۆڵ بکەیت" },
        fact: { en: "Panic attacks are an automatic body response — coping tools help, but forcing it to stop can make it harder.", ku: "هێرشی دڵەڕاوکێ وەڵامێکی خۆکاری جەستەیە — ئامرازەکانی مامەڵەکردن یارمەتی دەدەن، بەڵام زۆرلێکردن بۆ وەستاندنی دەکات بە سەختتر." },
      },
      {
        myth: { en: "If you’ve had one panic attack, you’ll always have them", ku: "ئەگەر یەک هێرشی دڵەڕاوکێت هەبووبێت، هەمیشە دەتهەبێت" },
        fact: { en: "Many people have one or a few panic attacks and never experience them again.", ku: "زۆر کەس یەک یان چەند هێرشی دڵەڕاوکێیان هەبووە و هەرگیز دووبارە ئەزموونیان نەکردووەتەوە." },
      },
    ],
    seekHelp: {
      en: "If panic attacks happen often or you start avoiding places out of fear of having one, a mental health professional can help you find relief. This is educational, not a diagnosis.",
      ku: "ئەگەر هێرشی دڵەڕاوکێ بەردەوام ڕوودەدات یان دەستپێدەکەیت بە دووریگرتنەوە لە شوێنەکان لە ترسی هێرشێکی تر، پسپۆڕێکی تەندروستی دەروونی دەتوانێت یارمەتیت بدات بۆ دۆزینەوەی ئارامی. ئەمە فێرکارییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Remind yourself: this is scary, but it will pass in minutes.", ku: "بە خۆت بڵێ: ئەمە ترسناکە، بەڵام لە چەند خولەکێکدا تێدەپەڕێت." },
      { en: "Breathe out slowly through pursed lips, longer than you breathe in.", ku: "بە هێواشی هەناسە بدە لە ڕێگەی لێوی داخراوەوە، درێژتر لە هەناسەکێشان." },
      { en: "Ground yourself by naming things you can touch and see.", ku: "خۆت دامەزرێنە بە ناوهێنانی شتانێک کە دەیانلمسیت و دەیانبینیت." },
      { en: "Splash cool water on your face or hold something cold.", ku: "ئاوی سارد بدە بە دەموچاوت یان شتێکی سارد بگرە." },
      { en: "Sit down somewhere safe and let the wave pass without fighting it.", ku: "لە شوێنێکی سەلامەت دابنیشە و ڕێگە بدە شەپۆلەکە تێبپەڕێت بێ خەباتکردن لەگەڵی." },
    ],
    related: ["anxiety", "social-anxiety", "stress"],
    quiz: [
      {
        q: { en: "How long does a panic attack usually last at its peak?", ku: "بە شێوەیەکی گشتی هێرشی دڵەڕاوکێ لە لووتکەیدا چەند دەخایەنێت؟" },
        options: [
          { en: "Just a few minutes", ku: "تەنها چەند خولەکێک" },
          { en: "Several hours", ku: "چەند کاتژمێرێک" },
          { en: "Days", ku: "چەند ڕۆژێک" },
        ],
        correct: 0,
        explain: { en: "Panic attacks are intense but usually peak and ease within about ten minutes.", ku: "هێرشی دڵەڕاوکێ بەهێزە بەڵام بەشێوەیەکی گشتی لە ماوەی نزیکەی دە خولەکدا دەگاتە لووتکە و کەم دەبێتەوە." },
      },
      {
        q: { en: "Is a panic attack physically dangerous?", ku: "ئایا هێرشی دڵەڕاوکێ لە ڕووی جەستەییەوە مەترسیداره؟" },
        options: [
          { en: "Yes, always", ku: "بەڵێ، هەمیشە" },
          { en: "No, though it feels very intense", ku: "نەخێر، هەرچەندە زۆر بەهێز هەست پێدەکرێت" },
          { en: "Only in older adults", ku: "تەنها بۆ گەورەسالان" },
        ],
        correct: 1,
        explain: { en: "Panic attacks feel overwhelming but are not physically harmful by themselves.", ku: "هێرشی دڵەڕاوکێ زۆر بەهێز هەست پێدەکرێت بەڵام بەخۆیی زیانی جەستەیی نییە." },
      },
      {
        q: { en: "What can help during a panic attack?", ku: "لە کاتی هێرشی دڵەڕاوکێدا چی یارمەتیدەرە؟" },
        options: [
          { en: "Fighting the feeling as hard as possible", ku: "خەباتکردن لەگەڵ هەستەکە بە هەموو توانا" },
          { en: "Slow exhales and grounding techniques", ku: "هەناسەدانی هێواش و شێوازەکانی دامەزراندن" },
          { en: "Holding your breath completely", ku: "بە تەواوی هەناسە هەڵگرتن" },
        ],
        correct: 1,
        explain: { en: "Slow, longer exhales and grounding can help the body settle.", ku: "هەناسەدانی هێواش و درێژ و دامەزراندن یارمەتی دەدەن جەستە ئارام بێتەوە." },
      },
    ],
    dailyTip: { en: "Today, practice one slow exhale you can use if fear ever spikes.", ku: "ئەمڕۆ، یەک هەناسەدانی هێواش ڕاهێنان بکە کە بەکاریبهێنیت ئەگەر ترس بەرز بووەوە." },
  },
  {
    id: "ocd",
    category: "anxiety",
    hue: "#7EC8B8",
    accent: "#4A9C87",
    title: { en: "OCD", ku: "کێشەی بیر و کردارە دووبارەکان" },
    subtitle: { en: "When thoughts loop and rituals feel necessary", ku: "کاتێک بیر دەسوڕێتەوە و کردارەکان پێویست دەردەکەون." },
    explanation: {
      en: "OCD involves unwanted, repeating thoughts (obsessions) that cause distress, followed by actions or mental rituals (compulsions) done to ease that distress. The relief compulsions bring is usually short-lived, so the cycle repeats. It is a real and treatable condition, not a personality quirk.",
      ku: "ئەم کێشەیە بیرکردنەوەی نەخوازراو و دووبارەبووی تێدایە (بیرە داگیرکەرەکان) کە ناڕەحەتی دروست دەکات، دواتر کردار یان کردارە مێشکییەکان (کردارە داگیرکەرەکان) ئەنجام دەدرێن بۆ سووکبوونەوەی ئەو ناڕەحەتییە. ئارامیی کە کردارەکان دەیهێنن زۆرجار کورتخایەنە، بۆیە خولگەکە دووبارە دەبێتەوە. ئەمە دۆخێکی ڕاستەقینە و چارەسەرکراوە، نەک تایبەتمەندییەکی کەسایەتی.",
    },
    symptoms: [
      { en: "Repeated, unwanted thoughts that cause distress", ku: "بیرکردنەوەی دووبارە و نەخوازراو کە ناڕەحەتی دروست دەکات" },
      { en: "Feeling driven to repeat actions like checking or washing", ku: "هەستکردن بەوەی ناچاری بۆ دووبارەکردنەوەی کردار وەک پشکنین یان شوشتن" },
      { en: "Needing things to feel “just right” or symmetrical", ku: "پێویستیت بە هەستکردنی «تەواو ڕاست» یان هاوسەنگ بۆ شتەکان" },
      { en: "Spending significant time on rituals each day", ku: "بەسەربردنی کاتێکی زۆر بۆ کردارە دووبارەکراوەکان هەموو ڕۆژێک" },
      { en: "Feeling temporary relief after a compulsion, then the worry returns", ku: "هەستکردن بە ئارامیی کاتی دوای کردارێک، پاشان نیگەرانی دەگەڕێتەوە" },
    ],
    myths: [
      {
        myth: { en: "OCD just means being extra tidy or organized", ku: "ئەم کێشەیە تەنها واتای پاکوخاوێنی یان ڕێکخستنی زیادەیە" },
        fact: { en: "OCD involves distressing intrusive thoughts and rituals done to ease anxiety — it’s not about liking things clean.", ku: "ئەم کێشەیە بیرکردنەوەی داگیرکەری ناڕەحەتکەر و کردارە دووبارەکراوەکانی تێدایە بۆ سووکبوونەوەی دڵەڕاوکێ — پەیوەندی بە پاکی خۆشویستنەوە نییە." },
      },
      {
        myth: { en: "People with OCD can just stop the rituals if they try harder", ku: "کەسانی ئەم کێشەیە دەتوانن کردارەکان ڕابگرن ئەگەر زیاتر هەوڵ بدەن" },
        fact: { en: "The urges feel involuntary and very hard to resist without support or treatment.", ku: "ئارەزووەکان ناچاری و زۆر سەخت هەست پێدەکرێن بۆ بەرگریکردن لێیان بێ پشتگیری یان چارەسەری." },
      },
      {
        myth: { en: "OCD is rare and always obvious", ku: "ئەم کێشەیە کەمە و هەمیشە ئاشکرایە" },
        fact: { en: "OCD is more common than people think, and many hide their rituals out of shame.", ku: "ئەم کێشەیە زۆرترە لەوەی خەڵک بیر لێدەکاتەوە، و زۆر کەس کردارەکانیان لە شەرمەوە دەشارنەوە." },
      },
    ],
    seekHelp: {
      en: "If intrusive thoughts or rituals take up an hour or more of your day, or cause real distress, a mental health professional trained in OCD can help. This is educational information, not a diagnosis.",
      ku: "ئەگەر بیرکردنەوەی داگیرکەر یان کردارە دووبارەکراوەکان کاتژمێرێک یان زیاتر لە ڕۆژت دەگرنەوە، یان ناڕەحەتیی ڕاستەقینە دروست دەکەن، پسپۆڕێکی تەندروستی دەروونی ڕاهێنراو لەم بوارە دەتوانێت یارمەتیت بدات. ئەمە زانیاریی فێرکارییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Try to delay a ritual by a few minutes before doing it.", ku: "هەوڵبدە کردارەکە چەند خولەکێک دواخەیت پێش ئەنجامدانی." },
      { en: "Remind yourself: a thought is just a thought, not a fact.", ku: "بە خۆت بڵێ: بیرکردنەوە تەنها بیرکردنەوەیە، نەک ڕاستی." },
      { en: "Write down the worry instead of acting on it immediately.", ku: "نیگەرانییەکە بنووسە لەبری ئەوەی یەکسەر کردار لەسەری بکەیت." },
      { en: "Practice slow breathing when the urge feels strongest.", ku: "کاتێک ئارەزووەکە زۆر بەهێز هەست پێدەکرێت، هەناسەدانی هێواش ڕاهێنان بکە." },
      { en: "Celebrate small wins when you resist a ritual, even briefly.", ku: "بۆ سەرکەوتنی بچووک، کاتێک بەرگریت کرد لە کردارێک تەنانەت بۆ کاتێکی کورت، شادمان بە." },
    ],
    related: ["anxiety", "perfectionism", "emotional-regulation"],
    quiz: [
      {
        q: { en: "OCD is best described as:", ku: "باشترین ڕوونکردنەوەی کێشەی بیر و کردار چییە؟" },
        options: [
          { en: "Liking things very clean and tidy", ku: "خۆشویستنی زۆر پاکی و ڕێکی شتەکان" },
          { en: "Distressing repeated thoughts followed by rituals to ease them", ku: "بیرکردنەوەی دووبارەی ناڕەحەتکەر کە کردارە دووبارەکراوەکان بۆ سووکبوونەوەی دوای دێت" },
          { en: "A rare personality trait", ku: "تایبەتمەندییەکی کەسایەتیی کەم" },
        ],
        correct: 1,
        explain: { en: "OCD centers on unwanted thoughts and the compulsions used to relieve the distress they cause.", ku: "ئەم کێشەیە سەرەکی لەسەر بیرکردنەوەی نەخوازراو و کردارە دووبارەکراوەکانە کە بۆ سووکبوونەوەی ناڕەحەتی بەکاردێن." },
      },
      {
        q: { en: "How does relief from a compulsion usually feel?", ku: "بەشێوەیەکی گشتی ئارامیی کردارێکی دووبارە چۆن هەست پێدەکرێت؟" },
        options: [
          { en: "Permanent", ku: "هەمیشەیی" },
          { en: "Temporary, so the cycle repeats", ku: "کاتی، بۆیە خولگەکە دووبارە دەبێتەوە" },
          { en: "It never brings any relief", ku: "هەرگیز هیچ ئارامییەک ناهێنێت" },
        ],
        correct: 1,
        explain: { en: "Relief from compulsions is usually short-lived, which keeps the cycle going.", ku: "ئارامیی کردارە دووبارەکراوەکان زۆرجار کورتخایەنە، ئەمەش خولگەکە بەردەوام دەکات." },
      },
      {
        q: { en: "True or false: OCD is rare and always easy to notice.", ku: "ڕاستە یان هەڵە: کێشەی بیر و کردار کەمە و هەمیشە ئاسانە بۆ بینین؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — many people hide it", ku: "هەڵەیە — زۆر کەس دەیشارنەوە" },
          { en: "Only children have it", ku: "تەنها منداڵان هەیانە" },
        ],
        correct: 1,
        explain: { en: "OCD is more common than people realize, and shame often keeps it hidden.", ku: "کێشەی بیر و کردار زۆرترە لەوەی خەڵک بیری لێدەکاتەوە، و شەرم زۆرجار دەیشارێتەوە." },
      },
    ],
    dailyTip: { en: "Today, notice one thought without immediately acting on it.", ku: "ئەمڕۆ، یەک بیرکردنەوە تێبینی بکە بێ ئەوەی یەکسەر کردار لەسەری بکەیت." },
  },
  {
    id: "ptsd",
    category: "life",
    hue: "#9E7EC8",
    accent: "#6B4A95",
    title: { en: "PTSD", ku: "کاریگەری دڵتەزێنی دوای ڕووداو" },
    subtitle: { en: "When the past keeps returning", ku: "کاتێک ڕابردوو جار جار دەگەڕێتەوە." },
    explanation: {
      en: "PTSD can develop after a frightening or overwhelming event, causing the mind and body to keep reacting as if danger is still present. Memories can return unwanted, and the nervous system may stay on high alert. It’s the mind’s attempt to protect you, even after the danger has passed.",
      ku: "کاریگەری دڵتەزێنی دوای ڕووداو دەکرێت دوای ڕووداوێکی ترسناک یان قورس دروست بێت، وا دەکات مێشک و جەستە بەردەوام وەڵام بدەنەوە وەک ئەوەی مەترسی هێشتا لەوێیە. یادەوەرییەکان دەتوانن نەخوازراو بگەڕێنەوە، و سیستەمی دەماری لەوانەیە لەسەر ئاگاداریی بەرز بمێنێتەوە. ئەمە هەوڵی مێشکە بۆ پاراستنت، تەنانەت دوای تێپەڕینی مەترسییەکە.",
    },
    symptoms: [
      { en: "Unwanted memories or flashbacks of the event", ku: "یادەوەری یان دووبارەبوونەوەی نەخوازراوی ڕووداوەکە" },
      { en: "Avoiding places, people, or talk that reminds you of it", ku: "دووریگرتنەوە لە شوێن، کەس، یان قسە کە بیرت دەخاتەوە" },
      { en: "Feeling constantly on edge or easily startled", ku: "هەستکردن بە بەردەوام لەسەر لێواری هەستیاری یان بە ئاسانی تۆقین" },
      { en: "Nightmares or trouble sleeping", ku: "خەونی خراپ یان گرفت لە خەوتن" },
      { en: "Feeling numb, distant, or disconnected from others", ku: "هەستکردن بە بێهەستی یان ساردبوونی هەستەکان" },
    ],
    myths: [
      {
        myth: { en: "Only soldiers experience PTSD", ku: "تەنها سەربازان کاریگەری دڵتەزێنی دوای ڕووداویان هەیە" },
        fact: { en: "PTSD can follow any deeply frightening event — accidents, loss, violence, or other trauma.", ku: "کاریگەری دڵتەزێنی دوای ڕووداو دەتوانێت دوای هەر ڕووداوێکی زۆر ترسناک بێت — ڕووداو، لەدەستدان، توندوتیژی، یان برینداری دەروونیکانی تر." },
      },
      {
        myth: { en: "If you don’t remember the event clearly, it wasn’t traumatic", ku: "ئەگەر ڕووداوەکەت بە ڕوونی لەبیر نەبێت، بریندار نەبووە" },
        fact: { en: "Trauma can affect memory in complex ways — unclear memories don’t mean it wasn’t serious.", ku: "برینداری دەروونی دەتوانێت کاریگەری لەسەر یادەوەری بە شێوازێکی ئاڵۆز دابنێت — یادەوەری ناڕوون واتای ئەوە نییە کە گرنگ نەبووە." },
      },
      {
        myth: { en: "Time alone heals PTSD", ku: "کات بەتەنها کاریگەری دڵتەزێنی دوای ڕووداو چاک دەکاتەوە" },
        fact: { en: "Support and, often, professional treatment help far more than time alone.", ku: "پشتگیری و، زۆرجار، چارەسەری پسپۆڕی زۆر زیاتر یارمەتی دەدات لە کات بەتەنها." },
      },
    ],
    seekHelp: {
      en: "If memories of a hard event keep disrupting your daily life, sleep, or relationships, a trauma-informed professional can offer real support. This page shares general education, not a diagnosis.",
      ku: "ئەگەر یادەوەری ڕووداوێکی سەخت بەردەوام کێشە بۆ ژیانی ڕۆژانە، خەو، یان پەیوەندییەکانت دروست دەکات، پسپۆڕێکی ئاشنا بە برینداری دەروونی دەتوانێت پشتگیریی ڕاستەقینە پێشکەش بکات. ئەم پەڕەیە فێرکاریی گشتی هاوبەش دەکات، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Ground yourself in the present using your senses when memories intrude.", ku: "خۆت لە ئێستادا دامەزرێنە بە بەکارهێنانی هەستەکانت کاتێک یادەوەری دێتە ناوەوە." },
      { en: "Keep a steady daily routine to give your nervous system stability.", ku: "ڕۆتینێکی جێگیری ڕۆژانە بپارێزە بۆ جێگیریی سیستەمی دەماریت." },
      { en: "Share how you feel with someone you trust, at your own pace.", ku: "هەستەکانت لەگەڵ کەسێک بڵێ کە پشتی پێ دەبەستیت، بە خێراییی خۆت." },
      { en: "Move your body gently — walking or stretching can release stored tension.", ku: "بە نەرمی جەستەت بجوڵێنە — پیادەڕۆیشتن یان درێژکردنەوە دەتوانێت گوشاری کۆکراو ئازاد بکات." },
      { en: "Be patient with yourself — healing from trauma is not linear.", ku: "لەگەڵ خۆت پشوودراو بە — چاکبوونەوە لە برینداری دەروونیدا هێڵێکی ڕاست نییە." },
    ],
    related: ["trauma", "anxiety", "emotional-regulation"],
    quiz: [
      {
        q: { en: "PTSD can develop after:", ku: "کاریگەری دڵتەزێنی دوای ڕووداو دەکرێت دوای چی دروست بێت؟" },
        options: [
          { en: "Only combat experiences", ku: "تەنها ئەزموونی جەنگ" },
          { en: "Any deeply frightening or overwhelming event", ku: "هەر ڕووداوێکی زۆر ترسناک یان قورس" },
          { en: "Only childhood events", ku: "تەنها ڕووداوەکانی منداڵی" },
        ],
        correct: 1,
        explain: { en: "PTSD can follow many kinds of trauma, not just combat.", ku: "کاریگەری دڵتەزێنی دوای ڕووداو دەتوانێت دوای زۆر جۆر برینداری دەروونی بێت، نەک تەنها جەنگ." },
      },
      {
        q: { en: "Flashbacks and nightmares after trauma are:", ku: "دووبارەبوونەوەی یادەوەری و خەونی خراپ دوای برینداری دەروونی چین؟" },
        options: [
          { en: "A sign of weakness", ku: "نیشانەی لاوازی" },
          { en: "A common way the mind tries to process danger", ku: "شێوازێکی باوی مێشک بۆ چارەسەرکردنی مەترسی" },
          { en: "Something to ignore completely", ku: "شتێک کە دەبێت بە تەواوی پشتگوێبخرێت" },
        ],
        correct: 1,
        explain: { en: "These reactions reflect the mind’s attempt to make sense of overwhelming events.", ku: "ئەم وەڵامانە هەوڵی مێشکن بۆ تێگەیشتن لە ڕووداوی قورس." },
      },
      {
        q: { en: "What helps most in recovering from trauma?", ku: "چی زۆرترین یارمەتی دەدات بۆ چاکبوونەوە لە برینداری دەروونی؟" },
        options: [
          { en: "Time alone with no support", ku: "کات بەتەنها بێ هیچ پشتگیرییەک" },
          { en: "Support and, often, professional care", ku: "پشتگیری و، زۆرجار، چاودێریی پسپۆڕی" },
          { en: "Avoiding the topic forever", ku: "هەمیشە دووریگرتنەوە لە بابەتەکە" },
        ],
        correct: 1,
        explain: { en: "Connection and professional support consistently help more than time alone.", ku: "پەیوەندی و پشتگیریی پسپۆڕی بەردەوام زیاتر یارمەتی دەدەن لە کات بەتەنها." },
      },
    ],
    dailyTip: { en: "Today, name three things around you that feel safe right now.", ku: "ئەمڕۆ، سێ شت لە دەوروبەرت ناوببە کە ئێستا سەلامەت هەست پێدەکرێن." },
  },
  {
    id: "adhd",
    category: "neuro",
    hue: "#E0A868",
    accent: "#C48A3E",
    title: { en: "ADHD", ku: "کێشەی سەرنج و چالاکی" },
    subtitle: { en: "A different way of paying attention", ku: "شێوازێکی جیاواز بۆ سەرنجدان." },
    explanation: {
      en: "ADHD is a neurodevelopmental difference that affects attention, impulse control, and activity levels. It’s not about laziness or lack of trying — brains with ADHD are wired to work differently, often thriving with the right supports. Many people with ADHD are also deeply creative and energetic.",
      ku: "کێشەی سەرنج جیاوازییەکی گەشەسەندنی دەمارییە کە کاریگەری لەسەر سەرنج، ڕێکخستنی هەستی لەناکاو، و ئاستی چالاکی دادەنێت. پەیوەندی بە تەمبەڵی یان کەمیی هەوڵدان نییە — مێشک لە کێشەی سەرنجداندا بە شێوازێکی جیاواز کار دەکات، و زۆرجار بە پشتگیریی گونجاو گەشە دەکات. زۆر کەسی ئەم کێشەیە هەروەها داهێنەر و پڕ وزەن.",
    },
    symptoms: [
      { en: "Trouble focusing on tasks that feel boring or repetitive", ku: "گرفت لە سەرنجدان بۆ کارێک بێزارکەر یان دووبارەکراوەیە" },
      { en: "Losing track of time or forgetting appointments", ku: "لەدەستدانی کاتژمار یان لەبیرکردنی چاوپێکەوتن" },
      { en: "Feeling restless or needing to move often", ku: "هەستکردن بە بێقەراری یان پێویستیت بە جوڵانەوەی زۆر" },
      { en: "Acting or speaking before thinking things through", ku: "کردار یان قسەکردن پێش بیرکردنەوەی تەواو" },
      { en: "Starting many tasks but struggling to finish them", ku: "دەستپێکردنی زۆر کار بەڵام کێشەی تەواوکردنیان" },
    ],
    myths: [
      {
        myth: { en: "ADHD is just a lack of discipline", ku: "کێشەی سەرنج تەنها کەمیی ڕێکخستنی خۆ" },
        fact: { en: "ADHD is a neurological difference in brain wiring — it isn’t about trying harder.", ku: "کێشەی سەرنج جیاوازییەکی دەماریی لە کارکردنی مێشکە — پەیوەندی بە زیاتر هەوڵدان نییە." },
      },
      {
        myth: { en: "Only hyperactive boys have ADHD", ku: "تەنها کوڕانی زۆر چالاک کێشەی سەرنجیان هەیە" },
        fact: { en: "ADHD affects people of all genders and ages, and can look like inattentiveness rather than hyperactivity.", ku: "کێشەی سەرنج کاریگەری لەسەر خەڵکی هەموو ڕەگەز و تەمەنێک دادەنێت، و دەتوانێت وەک کێشەی سەرنج دەربکەوێت نەک بزوێنراوی زۆر." },
      },
      {
        myth: { en: "People with ADHD can’t focus on anything", ku: "کەسانی ئەم کێشەیە ناتوانن سەرنج بدەن بۆ هیچ شتێک" },
        fact: { en: "Many people with ADHD can focus intensely on things that interest them — it’s about interest, not ability.", ku: "زۆر کەسی ئەم کێشەیە دەتوانن بە قوڵی سەرنج بدەن بۆ شتانێک کە سەرنجی ڕادەکێشن — پەیوەندی بە ئارەزوو هەیە، نەک توانا." },
      },
    ],
    seekHelp: {
      en: "If focus, organization, or impulsivity struggles are affecting school, work, or relationships, an assessment from a mental health professional can bring clarity. This is education, not a diagnosis.",
      ku: "ئەگەر کێشەی سەرنج، ڕێکخستن، یان کارکردنی هەستی لەناکاو کاریگەری لەسەر خوێندن، کار، یان پەیوەندییەکانت دادەنێت، هەڵسەنگاندنێک لەلایەن پسپۆڕێکی تەندروستی دەروونییەوە دەتوانێت ڕوونی بهێنێت. ئەمە فێرکارییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Break big tasks into small, clear steps.", ku: "کارە گەورەکان بکە بە هەنگاوی بچووک و ڕوون." },
      { en: "Use timers or alarms to help track time.", ku: "کاتژمێری یان زەنگ بەکاربهێنە بۆ یارمەتیدان لە شوێنکەوتنی کات." },
      { en: "Reduce distractions in your workspace when possible.", ku: "لادانەکان لە شوێنی کارت کەم بکەرەوە کاتێک دەکرێت." },
      { en: "Allow movement breaks instead of forcing long stillness.", ku: "ڕێگە بدە بۆ پشوودانی جووڵە لەبری زۆرلێکردن بۆ دانیشتنی درێژ." },
      { en: "Celebrate finishing tasks, even small ones — progress matters.", ku: "بۆ تەواوکردنی کارەکان شادمان بە، تەنانەت بچووکەکانیش — پێشکەوتن گرنگە." },
    ],
    related: ["autism", "stress", "emotional-regulation"],
    quiz: [
      {
        q: { en: "ADHD is best understood as:", ku: "باشترین تێگەیشتن لە کێشەی سەرنج چییە؟" },
        options: [
          { en: "A lack of discipline", ku: "کەمیی ڕێکخستنی خۆ" },
          { en: "A neurological difference in attention and activity", ku: "جیاوازییەکی دەماریی لە سەرنج و چالاکی" },
          { en: "A childhood phase everyone outgrows", ku: "قۆناغێکی منداڵییە کە هەموو کەس تێدەپەڕێت" },
        ],
        correct: 1,
        explain: { en: "ADHD reflects real differences in how the brain regulates attention and activity.", ku: "کێشەی سەرنج جیاوازیی ڕاستەقینە لە شێوازی ڕێکخستنی سەرنج و چالاکی لەلایەن مێشکەوە نیشان دەدات." },
      },
      {
        q: { en: "Which is true about ADHD and focus?", ku: "کام ڕاستە دەربارەی کێشەی سەرنج و سەرنج؟" },
        options: [
          { en: "People with ADHD can never focus on anything", ku: "کەسانی ئەم کێشەیە هەرگیز ناتوانن سەرنج بدەن بۆ هیچ شتێک" },
          { en: "They can focus intensely on things that interest them", ku: "دەتوانن بە قوڵی سەرنج بدەن بۆ شتانێک کە سەرنجیان ڕادەکێشن" },
          { en: "Focus is impossible without medication", ku: "سەرنجدان بێ دەرمان مەحاڵە" },
        ],
        correct: 1,
        explain: { en: "Interest-based focus, sometimes called hyperfocus, is common in ADHD.", ku: "سەرنجدانی بەپێی ئارەزوو، کە هەندێک جار پێی دەگوترێت سەرنجدانی قووڵ، لەم کێشەیەدا باوە." },
      },
      {
        q: { en: "True or false: Only hyperactive children have ADHD.", ku: "ڕاستە یان هەڵە: تەنها منداڵانی زۆر چالاک کێشەی سەرنجیان هەیە؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — it affects all ages and can look like inattentiveness", ku: "هەڵەیە — کاریگەری لەسەر هەموو تەمەنێک هەیە و دەتوانێت وەک کێشەی سەرنج دەربکەوێت" },
          { en: "Only adults have it", ku: "تەنها گەورەسالان هەیانە" },
        ],
        correct: 1,
        explain: { en: "ADHD shows up differently across ages and people, not only as hyperactivity.", ku: "کێشەی سەرنج بە شێوازی جیاواز لە تەمەن و کەسانی جیاوازدا دەردەکەوێت، نەک تەنها وەک بزوێنراوی زۆر." },
      },
    ],
    dailyTip: { en: "Today, try breaking one task into three small steps before starting.", ku: "ئەمڕۆ، پێش دەستپێکردن، یەک کار بکە بە سێ هەنگاوی بچووک." },
  },
  {
    id: "autism",
    category: "neuro",
    hue: "#68B8E0",
    accent: "#3E8AC4",
    title: { en: "Autism", ku: "ئۆتیزم" },
    subtitle: { en: "A different way of experiencing the world", ku: "شێوازێکی جیاواز بۆ بینینی جیهان." },
    explanation: {
      en: "Autism is a neurodevelopmental difference that shapes how someone experiences the world, communicates, and processes senses. It is not an illness to cure, but a different way of thinking and feeling. Autistic people have unique strengths alongside their challenges, and every autistic experience is different.",
      ku: "ئۆتیزم جیاوازییەکی گەشەسەندنی دەماریی کە شێوازی ئەزموونکردنی جیهان، پەیوەندیکردن، و چارەسەرکردنی هەستەکان لای کەسێک شێوە دەدات. نەخۆشی نییە کە پێویستی بە چارەسەر هەبێت، بەڵکو شێوازێکی جیاوازی بیرکردنەوە و هەستکردنە. کەسانی ئۆتیزم خاڵی بەهێزی تایبەتیان هەیە لەگەڵ ئاڵنگارییەکانیان، و هەر ئەزموونێکی ئۆتیزم جیاوازە.",
    },
    symptoms: [
      { en: "Finding social cues or small talk difficult to read", ku: "گرفت لە تێگەیشتن لە نیشانە کۆمەڵایەتییەکان یان قسەی سادە" },
      { en: "Strong focus or deep interest in specific topics", ku: "سەرنجی بەهێز یان ئارەزووی قوڵ بۆ بابەتی دیاریکراو" },
      { en: "Sensitivity to sounds, lights, textures, or crowds", ku: "هەستیاری بۆ دەنگ، ڕووناکی، دەستلێدان، یان قەرەباڵغی" },
      { en: "Preferring routine and finding sudden change stressful", ku: "پێی خۆشە ڕۆتین و گۆڕانی لەناکاو بۆی پڕ لە فشارە" },
      { en: "Communicating or expressing emotions in a different style", ku: "پەیوەندیکردن یان دەربڕینی هەستەکان بە شێوازێکی جیاواز" },
    ],
    myths: [
      {
        myth: { en: "Autistic people don’t feel emotions or want connection", ku: "کەسانی ئۆتیزم هەست ناکەن یان پێویستیان بە پەیوەندی نییە" },
        fact: { en: "Autistic people feel deeply and often deeply value connection — they may just express it differently.", ku: "کەسانی ئۆتیزم بە قوڵی هەست دەکەن و زۆرجار بایەخێکی گەورە بە پەیوەندی دەدەن — تەنها لەوانەیە بە شێوازێکی جیاواز دەریبخات." },
      },
      {
        myth: { en: "Autism only affects children", ku: "ئۆتیزم تەنها کاریگەری لەسەر منداڵان هەیە" },
        fact: { en: "Autism is lifelong — autistic children grow into autistic adults.", ku: "ئۆتیزم بۆ هەموو ژیانە — منداڵی ئۆتیزم دەبێتە گەورەسالی ئۆتیزم." },
      },
      {
        myth: { en: "All autistic people are the same", ku: "هەموو کەسانی ئۆتیزم وەکو یەکن" },
        fact: { en: "Autism is a spectrum — every autistic person has a unique mix of strengths and challenges.", ku: "ئۆتیزم سپێکترۆمە — هەر کەسێکی ئۆتیزم تێکەڵەیەکی تایبەتی خاڵی بەهێز و ئاڵنگاری هەیە." },
      },
    ],
    seekHelp: {
      en: "If sensory, social, or communication differences are causing distress or affecting daily life, an assessment can help you find understanding and support that fits. This page is educational, not a diagnosis.",
      ku: "ئەگەر جیاوازیی هەستی، کۆمەڵایەتی، یان پەیوەندیکردن ناڕەحەتی دروست دەکات یان کاریگەری لەسەر ژیانی ڕۆژانە هەیە، هەڵسەنگاندنێک دەتوانێت یارمەتیت بدات بۆ دۆزینەوەی تێگەیشتن و پشتگیریی گونجاو. ئەم پەڕەیە فێرکارییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Create sensory-friendly spaces with control over light and sound.", ku: "شوێنی گونجاو بۆ هەستەکان دروست بکە بە ڕێکخستنی ڕووناکی و دەنگ." },
      { en: "Keep helpful routines while allowing room for flexibility.", ku: "ڕۆتینە یارمەتیدەرەکان بپارێزە لەگەڵ جێگە بۆ نەرمی." },
      { en: "Use written or visual communication when speaking feels harder.", ku: "پەیوەندیکردنی نووسراو یان بینایی بەکاربهێنە کاتێک قسەکردن سەختترە." },
      { en: "Take sensory breaks in a quiet space when overwhelmed.", ku: "لە کاتی قورسیدا، پشوویەکی هەستی لە شوێنێکی هێمن وەربگرە." },
      { en: "Connect with others who understand your experience, autistic or not.", ku: "پەیوەندی لەگەڵ کەسانێک بکە کە ئەزموونەکەت تێدەگەن، ئۆتیزمبن یان نا." },
    ],
    related: ["adhd", "social-anxiety", "emotional-regulation"],
    quiz: [
      {
        q: { en: "Autism is best described as:", ku: "باشترین ڕوونکردنەوەی ئۆتیزم چییە؟" },
        options: [
          { en: "An illness that needs curing", ku: "نەخۆشییەک کە پێویستی بە چارەسەر هەیە" },
          { en: "A different way of experiencing and processing the world", ku: "شێوازێکی جیاواز بۆ ئەزموونکردن و چارەسەرکردنی جیهان" },
          { en: "Something only children have", ku: "شتێک کە تەنها منداڵان هەیانە" },
        ],
        correct: 1,
        explain: { en: "Autism is a neurodevelopmental difference, not a disease — and it lasts a lifetime.", ku: "ئۆتیزم جیاوازییەکی گەشەسەندنی دەماریە، نەک نەخۆشی — و بۆ هەموو ژیانە." },
      },
      {
        q: { en: "Do autistic people feel emotions and want connection?", ku: "ئایا کەسانی ئۆتیزم هەست دەکەن و پێویستیان بە پەیوەندییە؟" },
        options: [
          { en: "No, never", ku: "نەخێر، هەرگیز" },
          { en: "Yes, often deeply — they may express it differently", ku: "بەڵێ، زۆرجار بە قوڵی — لەوانەیە بە شێوازێکی جیاواز دەریبخەن" },
          { en: "Only some autistic people do", ku: "تەنها هەندێک کەسی ئۆتیزم" },
        ],
        correct: 1,
        explain: { en: "Autistic people often feel deeply, even when expression looks different.", ku: "کەسانی ئۆتیزم زۆرجار بە قوڵی هەست دەکەن، تەنانەت کاتێک دەربڕین جیاواز دیارە." },
      },
      {
        q: { en: "True or false: All autistic people are the same.", ku: "ڕاستە یان هەڵە: هەموو کەسانی ئۆتیزم وەکو یەکن؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — autism is a spectrum with unique experiences", ku: "هەڵەیە — ئۆتیزم سپێکترۆمە لەگەڵ ئەزموونی تایبەت" },
          { en: "True, only intensity differs", ku: "ڕاستە، تەنها توندی جیاوازە" },
        ],
        correct: 1,
        explain: { en: "Every autistic person has a unique combination of traits, strengths, and challenges.", ku: "هەر کەسێکی ئۆتیزم تێکەڵەیەکی تایبەتی تایبەتمەندی، خاڵی بەهێز، و ئاڵنگاری هەیە." },
      },
    ],
    dailyTip: { en: "Today, notice one sensory need of yours and honor it gently.", ku: "ئەمڕۆ، یەک پێویستیی هەستیی خۆت تێبینی بکە و بە نەرمی ڕێزی لێبگرە." },
  },
  {
    id: "stress",
    category: "stress",
    hue: "#D9A05B",
    accent: "#B37A35",
    title: { en: "Stress", ku: "فشار" },
    subtitle: { en: "When pressure builds up inside", ku: "کاتێک فشار لە ناوەوە زیاد دەبێت." },
    explanation: {
      en: "Stress is the body’s natural response to pressure or demands, and a little can even help you perform. But when it builds up without relief, it can affect your mind and body in lasting ways. Learning to notice and release stress early makes a real difference.",
      ku: "فشار وەڵامی سروشتیی جەستەیە بۆ گوشار یان داواکاری، و کەمێکی دەتوانێت یارمەتیت بدات باشتر کار بکەیت. بەڵام کاتێک بێ ئارامیدان کۆدەبێتەوە، دەتوانێت کاریگەریی بەردەوام لەسەر مێشک و جەستەت دابنێت. فێربوونی تێبینیکردن و بەربوونی فشار بەخێرایی جیاوازیی ڕاستەقینە دروست دەکات.",
    },
    symptoms: [
      { en: "Feeling tense, on edge, or irritable", ku: "هەستکردن بە توندی، لەسەر لێواری هەستیاری، یان تووڕەیی" },
      { en: "Headaches, muscle tension, or stomach trouble", ku: "ئێشی سەر، توندیی ماسولکە، یان گرفتی گەدە" },
      { en: "Trouble sleeping or racing thoughts at night", ku: "گرفت لە خەوتن یان بیرکردنەوەی خێرا لە شەودا" },
      { en: "Feeling overwhelmed by tasks that used to feel manageable", ku: "هەستکردن بە قورسی لەبەر کارانێک کە جاران ئاسان بوون" },
      { en: "Changes in appetite or energy levels", ku: "گۆڕانکاری لە بەتامی خواردن یان ئاستی وزە" },
    ],
    myths: [
      {
        myth: { en: "Stress is always bad for you", ku: "فشار هەمیشە خراپە بۆت" },
        fact: { en: "Short bursts of stress can actually help focus and performance — it’s chronic, unrelieved stress that harms.", ku: "شەپۆلی کورتخایەنی فشار بەڕاستی دەتوانێت یارمەتی سەرنجدان و کارکردن بدات — فشاری بەردەوام و بێ ئارامیدانە کە زیان دەگەیەنێت." },
      },
      {
        myth: { en: "You should be able to just push through stress", ku: "دەبێت بتوانیت تەنها بەسەردا بچیت لە فشار" },
        fact: { en: "Ignoring stress signals for too long can lead to burnout and health problems.", ku: "پشتگوێخستنی نیشانەکانی فشار بۆ ماوەیەکی زۆر دەتوانێت ببێتە هۆی ماندووبوونی دەروونی و کێشەی تەندروستی." },
      },
      {
        myth: { en: "Only big life events cause stress", ku: "تەنها ڕووداوە گەورەکانی ژیان فشار دروست دەکەن" },
        fact: { en: "Small daily hassles can add up and cause just as much stress as big events.", ku: "کێشەی بچووکی ڕۆژانە دەتوانێت کۆببێتەوە و هەمان فشار دروست بکات وەک ڕووداوی گەورە." },
      },
    ],
    seekHelp: {
      en: "If stress feels constant, affects your sleep or health, or doesn’t ease with rest, talking to a professional can help you build better tools. This is general education, not a diagnosis.",
      ku: "ئەگەر فشار بەردەوام هەست پێدەکرێت، کاریگەری لەسەر خەو یان تەندروستیت هەیە، یان بە پشوودان کەم نابێتەوە، قسەکردن لەگەڵ پسپۆڕێک دەتوانێت یارمەتیت بدات بۆ دروستکردنی ئامرازی باشتر. ئەمە فێرکاریی گشتییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Break overwhelming tasks into smaller, manageable pieces.", ku: "کارە قورسەکان بکە بە پارچەی بچووکتر و ئاسانتر." },
      { en: "Take short breaks to breathe or stretch during the day.", ku: "لە درێژایی ڕۆژدا پشوویەکی کورت بۆ هەناسەدان یان درێژکردنەوە وەربگرە." },
      { en: "Say no to one extra task this week if you can.", ku: "ئەگەر دەتوانیت، ئەم هەفتەیە نەخێر بڵێ بە یەک کاری زیادە." },
      { en: "Move your body — even light exercise lowers stress hormones.", ku: "جەستەت بجوڵێنە — تەنانەت وەرزشی سووک هۆرمۆنی فشار کەم دەکاتەوە." },
      { en: "Protect time for something that genuinely relaxes you.", ku: "کات بپارێزە بۆ شتێک کە بەڕاستی ئارامت دەکاتەوە." },
    ],
    related: ["burnout", "sleep", "anxiety"],
    quiz: [
      {
        q: { en: "Is all stress harmful?", ku: "ئایا هەموو فشار زیانبەخشە؟" },
        options: [
          { en: "Yes, always", ku: "بەڵێ، هەمیشە" },
          { en: "No — short bursts can help, but chronic stress harms", ku: "نەخێر — شەپۆلی کورتخایەن یارمەتیدەرە، بەڵام فشاری بەردەوام زیان دەگەیەنێت" },
          { en: "No, stress never causes problems", ku: "نەخێر، فشار هەرگیز کێشە دروست ناکات" },
        ],
        correct: 1,
        explain: { en: "Brief stress can sharpen focus; it’s ongoing, unrelieved stress that causes harm.", ku: "فشاری کورتخایەن دەتوانێت سەرنج تیژتر بکات؛ فشاری بەردەوام و بێ ئارامیدانە کە زیان دەگەیەنێت." },
      },
      {
        q: { en: "What can help reduce daily stress?", ku: "چی یارمەتی کەمکردنەوەی فشاری ڕۆژانە دەدات؟" },
        options: [
          { en: "Ignoring it completely", ku: "بە تەواوی پشتگوێخستنی" },
          { en: "Breaking tasks down and taking small breaks", ku: "کارەکان بەشکردن و وەرگرتنی پشووی بچووک" },
          { en: "Taking on even more responsibilities", ku: "وەرگرتنی بەرپرسیارێتیی زیاتریش" },
        ],
        correct: 1,
        explain: { en: "Smaller tasks and regular breaks help the body reset before stress builds too high.", ku: "کاری بچووکتر و پشووی ڕێکوپێک یارمەتی جەستە دەدەن پێش ئەوەی فشار زۆر بەرز بێت." },
      },
      {
        q: { en: "True or false: Only big life events cause stress.", ku: "ڕاستە یان هەڵە: تەنها ڕووداوە گەورەکانی ژیان فشار دروست دەکەن؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — small daily hassles add up too", ku: "هەڵەیە — کێشەی بچووکی ڕۆژانەش کۆدەبنەوە" },
          { en: "True, small things never matter", ku: "ڕاستە، شتی بچووک هەرگیز گرنگ نییە" },
        ],
        correct: 1,
        explain: { en: "Small daily stresses accumulate and can be just as impactful as major events.", ku: "فشاری بچووکی ڕۆژانە کۆدەبێتەوە و دەتوانێت هەمان کاریگەریی ڕووداوی گەورەی هەبێت." },
      },
    ],
    dailyTip: { en: "Today, take three slow breaths before starting your busiest task.", ku: "ئەمڕۆ، پێش دەستپێکردنی قورسترین کارت، سێ هەناسەی هێواش بدە." },
  },
  {
    id: "burnout",
    category: "stress",
    hue: "#C67B5C",
    accent: "#954A2E",
    title: { en: "Burnout", ku: "ماندووبوونی دەروونی" },
    subtitle: { en: "When exhaustion becomes constant", ku: "کاتێک ماندووبوون بەردەوام دەبێت." },
    explanation: {
      en: "Burnout is a state of deep physical and emotional exhaustion that builds up from prolonged stress, often related to work or caregiving. It can leave you feeling drained, detached, and less effective, even at things you used to handle well. It’s a signal that something needs to change, not a personal failure.",
      ku: "ماندووبوونی دەروونی دۆخێکی ماندووبوونی قوڵی جەستەیی و هەستییە کە لە فشاری درێژخایەندا کۆدەبێتەوە، زۆرجار پەیوەندیدارە بە کار یان چاودێری. دەتوانێت وا لێت بکات هەستی بە بێزاری، دووری، و کەمی کارایی بکەیت، تەنانەت لە شتانێک کە جاران باش دەتکردن. ئەمە نیشانەیەکە کە شتێک پێویستی بە گۆڕان هەیە، نەک شکستی کەسی.",
    },
    symptoms: [
      { en: "Feeling exhausted even after rest", ku: "هەستکردن بە ماندووبوون تەنانەت دوای پشوودان" },
      { en: "Feeling cynical, detached, or numb about work or duties", ku: "هەستکردن بە بێباوەڕی، دووری، یان بێهەستی دەربارەی کار یان ئەرک" },
      { en: "Reduced sense of accomplishment or effectiveness", ku: "کەمبوونەوەی هەستی سەرکەوتن یان کارایی" },
      { en: "Difficulty concentrating or making decisions", ku: "گرفت لە کۆکردنەوەی بیر یان بڕیاردان" },
      { en: "Physical signs like headaches or getting sick more often", ku: "نیشانەی جەستەیی وەک ئێشی سەر یان نەخۆشکەوتنی زیاتر" },
    ],
    myths: [
      {
        myth: { en: "Burnout just means you need one weekend off", ku: "ماندووبوونی دەروونی تەنها واتای ئەوەیە پێویستیت بە یەک کۆتایی هەفتەی پشوو هەیە" },
        fact: { en: "Burnout usually takes real, sustained changes to recover from — not just a short break.", ku: "ماندووبوونی دەروونی زۆرجار پێویستیی بە گۆڕانکاریی ڕاستەقینە و بەردەوام هەیە بۆ چاکبوونەوە — نەک تەنها پشوویەکی کورت." },
      },
      {
        myth: { en: "Only overworked professionals experience burnout", ku: "تەنها کارمەندانی زۆر بارگاوی ماندووبوونی دەروونییان هەیە" },
        fact: { en: "Burnout can affect parents, students, and caregivers too — anyone under prolonged pressure.", ku: "ماندووبوونی دەروونی دەتوانێت کاریگەری لەسەر دایک و باوک، خوێندکار، و چاودێریشیش هەبێت — هەر کەسێک لەژێر گوشاری درێژخایەندا." },
      },
      {
        myth: { en: "Burnout is just laziness", ku: "ماندووبوونی دەروونی تەنها تەمبەڵییە" },
        fact: { en: "Burnout is the opposite of laziness — it often happens to people who cared and gave too much for too long.", ku: "ماندووبوونی دەروونی پێچەوانەی تەمبەڵییە — زۆرجار بۆ کەسانێک ڕوودەدات کە زۆر گرنگیان دابووە و زۆر ماوەیان بەخشیوە." },
      },
    ],
    seekHelp: {
      en: "If exhaustion, detachment, and reduced effectiveness last for weeks and rest doesn’t help, a professional can support you in finding real recovery. This is general information, not a diagnosis.",
      ku: "ئەگەر ماندووبوون، دووری، و کەمی کارایی بۆ هەفتەکان بمێنێتەوە و پشوودان یارمەتی نەدات، پسپۆڕێک دەتوانێت پشتگیریت بکات بۆ دۆزینەوەی چاکبوونەوەیەکی ڕاستەقینە. ئەمە زانیاریی گشتییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Identify what’s draining you most and look for one thing to reduce.", ku: "ئەو شتانە دیاری بکە کە زۆرترین وزەت لێدەسڕنەوە و بۆ کەمکردنەوەی یەکێکیان بگەڕێ." },
      { en: "Protect real rest time, not just distraction time.", ku: "کاتی پشوودانی ڕاستەقینە بپارێزە، نەک تەنها کاتی سەرقاڵبوون." },
      { en: "Set one small boundary this week, even a gentle one.", ku: "ئەم هەفتەیە یەک سنووری بچووک دابنێ، تەنانەت یەکێکی نەرمیش." },
      { en: "Ask for help or delegate one task if possible.", ku: "داوای یارمەتی بکە یان ئەگەر دەکرێت یەک کار بدە بە کەسێکی تر." },
      { en: "Reconnect with one small thing that used to bring you joy.", ku: "پەیوەندی دووبارە دروست بکە لەگەڵ شتێکی بچووک کە جاران خۆشحاڵی پێدەبەخشیت." },
    ],
    related: ["stress", "sleep", "depression"],
    quiz: [
      {
        q: { en: "Burnout is best described as:", ku: "باشترین ڕوونکردنەوەی ماندووبوونی دەروونی چییە؟" },
        options: [
          { en: "Simple tiredness after one busy day", ku: "ماندووبوونێکی سادە دوای ڕۆژێکی قورس" },
          { en: "Deep exhaustion from prolonged, unrelieved stress", ku: "ماندووبوونێکی قوڵ لە فشاری درێژخایەن و بێ ئارامیدان" },
          { en: "A sign of laziness", ku: "نیشانەی تەمبەڵی" },
        ],
        correct: 1,
        explain: { en: "Burnout builds up over time from stress that never gets a real chance to ease.", ku: "ماندووبوونی دەروونی بە درێژایی کات کۆدەبێتەوە لە فشارێک کە هەرگیز دەرفەتی ڕاستەقینەی ئارامیی نەدراوە." },
      },
      {
        q: { en: "Who can experience burnout?", ku: "کێ دەتوانێت ماندووبوونی دەروونی هەبێت؟" },
        options: [
          { en: "Only office workers", ku: "تەنها کارمەندانی ئۆفیس" },
          { en: "Anyone under prolonged pressure, including parents and students", ku: "هەر کەسێک لەژێر گوشاری درێژخایەندا، لەوانە دایک و باوک و خوێندکار" },
          { en: "Only people who are lazy", ku: "تەنها کەسانی تەمبەڵ" },
        ],
        correct: 1,
        explain: { en: "Burnout can affect anyone facing sustained pressure, not just certain jobs.", ku: "ماندووبوونی دەروونی دەتوانێت کاریگەری لەسەر هەر کەسێک هەبێت کە بەردەوام لەژێر گوشاردایە، نەک تەنها هەندێک کار." },
      },
      {
        q: { en: "What genuinely helps recovery from burnout?", ku: "چی بەڕاستی یارمەتی چاکبوونەوە لە ماندووبوونی دەروونی دەدات؟" },
        options: [
          { en: "One single weekend off", ku: "تەنها یەک کۆتایی هەفتەی پشوو" },
          { en: "Real, sustained changes and rest", ku: "گۆڕانکاریی ڕاستەقینە و بەردەوام و پشوودان" },
          { en: "Working even harder to catch up", ku: "زیاتر کارکردن بۆ گەیشتنەوە" },
        ],
        correct: 1,
        explain: { en: "Lasting recovery from burnout usually needs real changes, not just a short pause.", ku: "چاکبوونەوەی بەردەوام لە ماندووبوونی دەروونی زۆرجار پێویستیی بە گۆڕانکاریی ڕاستەقینە هەیە، نەک تەنها وەستانێکی کورت." },
      },
    ],
    dailyTip: { en: "Today, protect twenty minutes of real, guilt-free rest.", ku: "ئەمڕۆ، بیست خولەک پشوودانی ڕاستەقینە و بێ هەستی گوناه بپارێزە." },
  },
  {
    id: "loneliness",
    category: "life",
    hue: "#7E93C8",
    accent: "#4A5F95",
    title: { en: "Loneliness", ku: "تەنهایی" },
    subtitle: { en: "When connection feels far away", ku: "کاتێک پەیوەندی دوور هەست پێدەکرێت." },
    explanation: {
      en: "Loneliness is the painful gap between the connection you have and the connection you want — it can happen even when surrounded by people. It’s a signal, much like hunger, telling you that connection matters. Understanding it as a normal human signal can make it feel less shameful.",
      ku: "تەنیایی بۆشاییەکی ئازاردەرە لەنێوان ئەو پەیوەندییەی هەتە و ئەوەی دەتەوێت — دەتوانێت تەنانەت لە نێو خەڵکدا ڕووبدات. نیشانەیەکە، وەک برسیێتی، پێت دەڵێت پەیوەندی گرنگە. تێگەیشتن لێی وەک نیشانەیەکی مرۆیی ئاسایی دەتوانێت کەمتر شەرمەزار هەست پێبکرێت.",
    },
    symptoms: [
      { en: "Feeling disconnected even around other people", ku: "هەستکردن بە بێپەیوەندی تەنانەت لە نێو خەڵکیشدا" },
      { en: "A persistent ache to be understood or seen", ku: "ئازارێکی بەردەوام بۆ ئەوەی تێبگرێت یان ببینرێیت" },
      { en: "Avoiding social contact even when you miss it", ku: "دووریگرتنەوە لە پەیوەندیی کۆمەڵایەتی تەنانەت کاتێک بیرت دەکاتەوە" },
      { en: "Feeling like no one really knows the real you", ku: "هەستکردن بەوەی هیچ کەس بە ڕاستی خۆی ڕاستەقینەت نازانێت" },
      { en: "Low mood or restlessness tied to feeling isolated", ku: "خەمۆکی یان بێقەراری پەیوەستبوو بە هەستی جیاکراوەیی" },
    ],
    myths: [
      {
        myth: { en: "Loneliness only happens to people who are alone", ku: "تەنیایی تەنها بۆ کەسانی تاک ڕوودەدات" },
        fact: { en: "You can feel deeply lonely even in a crowd or a relationship if connection feels shallow.", ku: "دەتوانیت بە قوڵی تەنیایی هەست بکەیت تەنانەت لە نێو قەرەباڵغی یان پەیوەندییەکدا ئەگەر پەیوەندییەکە کەم قوڵ بێت." },
      },
      {
        myth: { en: "Feeling lonely means something is wrong with you", ku: "هەستکردن بە تەنیایی واتای ئەوەیە کە شتێک هەڵەیە لەگەڵت" },
        fact: { en: "Loneliness is a normal human signal, like hunger — it means connection needs attention.", ku: "تەنیایی نیشانەیەکی ئاسایی مرۆییە، وەک برسیێتی — واتای ئەوەیە پەیوەندی پێویستیی بە سەرنجە." },
      },
      {
        myth: { en: "More social media use fixes loneliness", ku: "بەکارهێنانی زیاتری میدیای کۆمەڵایەتی تەنیایی چارەسەر دەکات" },
        fact: { en: "Deep, real connection helps more than passive scrolling, which can sometimes deepen loneliness.", ku: "پەیوەندیی قوڵ و ڕاستەقینە زیاتر یارمەتی دەدات لە گەڕانی بێ ئاراستەی میدیا، کە هەندێک جار دەتوانێت تەنیایی قوڵتر بکات." },
      },
    ],
    seekHelp: {
      en: "If loneliness feels constant, heavy, or connected to low mood, talking to someone — a friend or professional — can be a gentle first step. This is educational, not a diagnosis.",
      ku: "ئەگەر تەنیایی بەردەوام، قورس، یان پەیوەستبوو بە خەمۆکی هەست پێبکرێت، قسەکردن لەگەڵ کەسێک — هاوڕێ یان پسپۆڕ — دەتوانێت هەنگاوێکی نەرمی یەکەم بێت. ئەمە فێرکارییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Reach out to one person, even with a small message.", ku: "پەیوەندی لەگەڵ یەک کەس بکە، تەنانەت بە نامەیەکی بچووک." },
      { en: "Join a group or activity around something you enjoy.", ku: "بەشداری لە کۆمەڵ یان چالاکییەک بکە دەربارەی شتێک کە خۆشت دەوێت." },
      { en: "Be honest with someone about how you feel.", ku: "لەگەڵ کەسێک ڕاستگۆ بە دەربارەی هەستەکانت." },
      { en: "Limit passive scrolling and seek real conversation instead.", ku: "گەڕانی بێ ئاراستە کەم بکەرەوە و لە جیاتی گفتوگۆی ڕاستەقینە بگەڕێ." },
      { en: "Practice self-compassion — loneliness isn’t a personal failure.", ku: "میهرەبانی لەگەڵ خۆت ڕاهێنان بکە — تەنیایی شکستی کەسی نییە." },
    ],
    related: ["depression", "social-anxiety", "grief"],
    quiz: [
      {
        q: { en: "Loneliness can be described as:", ku: "تەنیایی چۆن دەکرێت ڕوون بکرێتەوە؟" },
        options: [
          { en: "Only happening when physically alone", ku: "تەنها کاتێک بە جەستەیی تاک بیت ڕوودەدات" },
          { en: "A gap between the connection you have and want", ku: "بۆشاییەکە لەنێوان پەیوەندییەکەت و ئەوەی دەتەوێت" },
          { en: "A rare and unusual feeling", ku: "هەستێکی کەم و نائاسایی" },
        ],
        correct: 1,
        explain: { en: "Loneliness is about the quality of connection, not just being physically alone.", ku: "تەنیایی پەیوەندی بە کوالیتیی پەیوەندییەوە هەیە، نەک تەنها تاکبوونی جەستەیی." },
      },
      {
        q: { en: "What genuinely helps ease loneliness?", ku: "چی بەڕاستی یارمەتی کەمکردنەوەی تەنیایی دەدات؟" },
        options: [
          { en: "More time scrolling social media alone", ku: "کاتی زیاتر بۆ گەڕان لە میدیای کۆمەڵایەتی بەتەنها" },
          { en: "Real, honest connection with others", ku: "پەیوەندیی ڕاستەقینە و ڕاستگۆ لەگەڵ خەڵک" },
          { en: "Avoiding people completely", ku: "بە تەواوی دووریگرتنەوە لە خەڵک" },
        ],
        correct: 1,
        explain: { en: "Genuine connection addresses loneliness far more than passive online time.", ku: "پەیوەندیی ڕاستەقینە زۆر زیاتر یارمەتی تەنیایی دەدات لە کاتی بێ چالاکی ئۆنلاین." },
      },
      {
        q: { en: "True or false: Feeling lonely means something is wrong with you.", ku: "ڕاستە یان هەڵە: هەستکردن بە تەنیایی واتای ئەوەیە کە شتێک هەڵەیە لەگەڵت؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — it’s a normal human signal", ku: "هەڵەیە — نیشانەیەکی ئاسایی مرۆییە" },
          { en: "True, only weak people feel it", ku: "ڕاستە، تەنها کەسی لاواز هەستی پێدەکات" },
        ],
        correct: 1,
        explain: { en: "Loneliness is a normal signal that connection needs attention, not a flaw.", ku: "تەنیایی نیشانەیەکی ئاساییە کە پەیوەندی پێویستیی بە سەرنجە، نەک کەموکوڕی." },
      },
    ],
    dailyTip: { en: "Today, send one message to someone you’ve been meaning to reach.", ku: "ئەمڕۆ، نامەیەک بنێرە بۆ کەسێک کە مێژووە دەتەوێت پەیوەندی پێوە بکەیت." },
  },
  {
    id: "grief",
    category: "life",
    hue: "#8E8EA0",
    accent: "#5C5C70",
    title: { en: "Grief", ku: "خەمی لەدەستدان" },
    subtitle: { en: "The weight of losing someone or something", ku: "قورسی لەدەستدانی کەسێک یان شتێک." },
    explanation: {
      en: "Grief is the natural response to loss — of a person, relationship, health, or a life that used to be. It doesn’t move in neat stages; it can come in waves, long after others expect you to have “moved on.” There is no right timeline for grief.",
      ku: "خەمی لەدەستدان وەڵامی سروشتییە بۆ لەدەستدان — کەسێک، پەیوەندییەک، تەندروستی، یان ژیانێک کە جاران هەبوو. بە قۆناغی ڕێکوپێک نایگوازێتەوە؛ دەتوانێت وەک شەپۆل بێت، دوای ماوەیەکی درێژ کاتێک خەڵکی تر چاوەڕوانن کە «تێپەڕیبیت». هیچ کاتژماری ڕاستی بۆ خەمی لەدەستدان نییە.",
    },
    symptoms: [
      { en: "Waves of sadness that come and go unpredictably", ku: "شەپۆلی دڵتەنگی کە بەبێ پێشبینیکردن دێن و دەچن" },
      { en: "Trouble concentrating or feeling foggy", ku: "گرفت لە کۆکردنەوەی بیر یان هەستکردن بە تەمومژ" },
      { en: "Changes in sleep or appetite", ku: "گۆڕانکاری لە خەو یان بەتامی خواردن" },
      { en: "Feeling anger, guilt, or relief mixed with sadness", ku: "هەستکردن بە تووڕەیی، گوناه، یان ئاسوودەیی تێکەڵ بە دڵتەنگی" },
      { en: "Missing the person or thing intensely at unexpected moments", ku: "بە توندی بیرکردنەوە بۆ کەسەکە یان شتەکە لە ساتی چاوەڕواننەکراو" },
    ],
    myths: [
      {
        myth: { en: "Grief follows five neat stages in order", ku: "خەمی لەدەستدان بەدوای پێنج قۆناغی ڕێکوپێک بە ڕیزدا دەچێت" },
        fact: { en: "Grief is different for everyone — it can loop, skip stages, or feel entirely unique.", ku: "خەمی لەدەستدان بۆ هەر کەسێک جیاوازە — دەتوانێت بگەڕێتەوە، قۆناغ بپەڕێنێت، یان بە تەواوی تایبەت هەست پێبکرێت." },
      },
      {
        myth: { en: "You should be “over it” after a certain amount of time", ku: "دەبێت دوای ماوەیەکی دیاریکراو «تێپەڕیبیت»" },
        fact: { en: "There’s no fixed timeline for grief — some waves can return years later, and that’s normal.", ku: "هیچ کاتژماری جێگیر بۆ خەمی لەدەستدان نییە — هەندێک شەپۆل دەتوانن دوای ساڵان بگەڕێنەوە، و ئەمە ئاساییە." },
      },
      {
        myth: { en: "Feeling relief after a loss means you didn’t care", ku: "هەستکردن بە ئاسوودەیی دوای لەدەستدانێک واتای ئەوەیە بایەخت نەدابوو" },
        fact: { en: "Relief can appear alongside grief, especially after long illness or hardship — it doesn’t erase love.", ku: "ئاسوودەیی دەتوانێت لەگەڵ خەمی لەدەستداندا دەربکەوێت، بەتایبەتی دوای نەخۆشیی درێژخایەن یان سەختی — خۆشەویستی ناسڕێتەوە." },
      },
    ],
    seekHelp: {
      en: "If grief feels stuck, overwhelming for a very long time, or comes with thoughts of not wanting to go on, please reach out to a professional or support line. This page offers education, not a diagnosis.",
      ku: "ئەگەر خەمی لەدەستدان گیر بکات، بۆ ماوەیەکی زۆر درێژ قورس بێت، یان لەگەڵ بیرکردنەوەی نەمانەوە بێت، تکایە پەیوەندی بکە بە پسپۆڕێک یان هێڵی پشتگیری. ئەم پەڕەیە فێرکاری پێشکەش دەکات، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Let yourself feel the wave without rushing past it.", ku: "ڕێگە بدە خۆت هەست بە شەپۆلەکە بکەیت بێ خێرا تێپەڕین." },
      { en: "Talk about the person or loss with someone who’ll listen.", ku: "دەربارەی کەسەکە یان لەدەستدانەکە قسە بکە لەگەڵ کەسێک کە گوێت لێدەگرێت." },
      { en: "Keep a small ritual that honors the memory.", ku: "ئایینێکی بچووک بپارێزە کە ڕێزی یادەوەرییەکە دەگرێت." },
      { en: "Be patient — grief has no deadline.", ku: "پشوودراو بە — خەمی لەدەستدان کۆتا کات نییە." },
      { en: "Take care of basic needs — food, rest, gentle movement.", ku: "چاودێری پێویستییە بنەڕەتییەکان بکە — خواردن، پشوودان، جووڵەی نەرم." },
    ],
    related: ["depression", "loneliness", "trauma"],
    quiz: [
      {
        q: { en: "Grief is best understood as:", ku: "باشترین تێگەیشتن لە خەمی لەدەستدان چییە؟" },
        options: [
          { en: "A neat process with five fixed stages", ku: "پرۆسەیەکی ڕێکوپێک لەگەڵ پێنج قۆناغی جێگیر" },
          { en: "A wave-like response unique to each person", ku: "وەڵامێکی شەپۆلی وابەتایبەت بۆ هەر کەسێک" },
          { en: "Something that should end within a month", ku: "شتێک کە دەبێت لە ماوەی مانگێکدا کۆتایی پێبێت" },
        ],
        correct: 1,
        explain: { en: "Grief moves differently for everyone, often in waves rather than a fixed order.", ku: "خەمی لەدەستدان بۆ هەر کەسێک بە شێوازێکی جیاواز دەجوڵێتەوە، زۆرجار وەک شەپۆل نەک ڕیزێکی جێگیر." },
      },
      {
        q: { en: "Is there a “correct” timeline for grieving?", ku: "ئایا کاتژمارێکی «ڕاست» بۆ خەمی لەدەستدان هەیە؟" },
        options: [
          { en: "Yes, a few weeks", ku: "بەڵێ، چەند هەفتەیەک" },
          { en: "No — grief has no fixed timeline", ku: "نەخێر — خەمی لەدەستدان هیچ کاتژمارێکی جێگیری نییە" },
          { en: "Yes, exactly one year", ku: "بەڵێ، تەواو یەک ساڵ" },
        ],
        correct: 1,
        explain: { en: "There’s no universal deadline for grief — it can ebb and flow for a long time.", ku: "هیچ کۆتا کاتێکی گشتی بۆ خەمی لەدەستدان نییە — دەتوانێت بۆ ماوەیەکی زۆر بەرزوبنی هەبێت." },
      },
      {
        q: { en: "Can feeling relief after a loss be normal?", ku: "ئایا هەستکردن بە ئاسوودەیی دوای لەدەستدانێک دەتوانێت ئاسایی بێت؟" },
        options: [
          { en: "No, it means you didn’t care", ku: "نەخێر، واتای ئەوەیە بایەخت نەدابوو" },
          { en: "Yes, relief can appear alongside grief", ku: "بەڵێ، ئاسوودەیی دەتوانێت لەگەڵ خەمی لەدەستداندا دەربکەوێت" },
          { en: "Only if the loss was minor", ku: "تەنها ئەگەر لەدەستدانەکە بچووک بووبێت" },
        ],
        correct: 1,
        explain: { en: "Relief, especially after long suffering, can coexist with deep love and grief.", ku: "ئاسوودەیی، بەتایبەتی دوای ئازارێکی درێژ، دەتوانێت لەگەڵ خۆشەویستی و خەمی لەدەستدانی قوڵدا هەبێت." },
      },
    ],
    dailyTip: { en: "Today, allow yourself one quiet moment to remember without judgment.", ku: "ئەمڕۆ، ڕێگە بدە خۆت یەک ساتی هێمن بۆ بیرکردنەوە بێ حوکمدان." },
  },
  {
    id: "bipolar",
    category: "mood",
    hue: "#A87EC8",
    accent: "#7A4A95",
    title: { en: "Bipolar Disorder", ku: "نەخۆشی دووقۆناغی دەروونی" },
    subtitle: { en: "When mood shifts between highs and lows", ku: "کاتێک هەست لە نێوان بەرزی و نزمی دەگۆڕێت." },
    explanation: {
      en: "Bipolar disorder involves mood episodes that shift between depressive lows and manic or hypomanic highs, which are more intense and longer-lasting than everyday mood changes. These shifts affect energy, sleep, and behavior, not just feelings. With understanding and support, many people manage it well.",
      ku: "نەخۆشی دووقۆناغی دەروونی قۆناغی هەستی تێدایە کە لەنێوان نزمیی خەمۆکی و بەرزیی مانیا یان نیمچە مانیادا دەگۆڕێت، کە لە گۆڕانی ئاساییی هەستی ڕۆژانە بەهێزتر و درێژخایەنترن. ئەم گۆڕانکارییانە کاریگەری لەسەر وزە، خەو، و ڕەفتار دادەنێن، نەک تەنها هەستەکان. بە تێگەیشتن و پشتگیری، زۆر کەس بە باشی بەڕێوەی دەبەن.",
    },
    symptoms: [
      { en: "Periods of low mood, low energy, and hopelessness", ku: "ماوەی خەمۆکیی نزم، وزەی کەم، و بێهیوایی" },
      { en: "Periods of unusually high energy or elevated mood", ku: "ماوەی وزەی نائاسایی بەرز یان هەستی بەرزکراوە" },
      { en: "Reduced need for sleep during high periods", ku: "کەمبوونەوەی پێویستی خەو لە کاتی ماوەی بەرزیدا" },
      { en: "Impulsive decisions or rapid, racing thoughts", ku: "بڕیاری لەناکاو یان بیرکردنەوەی خێرا و بەردەوام" },
      { en: "Noticeable shifts in behavior that others may also notice", ku: "گۆڕانکاریی بەرچاو لە ڕەفتار کە خەڵکی تریش دەتوانن تێبینی بکەن" },
    ],
    myths: [
      {
        myth: { en: "Bipolar means having quick mood swings within the same day", ku: "نەخۆشی دووقۆناغی دەروونی واتای گۆڕانی خێرای هەست لە هەمان ڕۆژدایە" },
        fact: { en: "Bipolar episodes usually last days to weeks, not minutes or hours.", ku: "قۆناغەکانی دووقۆناغی دەروونی زۆرجار چەند ڕۆژ تا هەفتەکان دەخایەنن، نەک خولەک یان کاتژمێر." },
      },
      {
        myth: { en: "People with bipolar disorder can’t live stable, successful lives", ku: "کەسانی دووقۆناغی دەروونی ناتوانن ژیانێکی جێگیر و سەرکەوتوو بژین" },
        fact: { en: "With the right support and treatment, many people with bipolar disorder thrive at work and in relationships.", ku: "بە پشتگیری و چارەسەری گونجاو، زۆر کەسی دووقۆناغی دەروونی لە کار و پەیوەندییەکاندا سەرکەوتوون." },
      },
      {
        myth: { en: "Manic episodes are always fun or exciting", ku: "قۆناغی مانیا هەمیشە خۆش و سەرنجڕاکێشن" },
        fact: { en: "Mania can feel intense and even frightening, sometimes leading to risky decisions or exhaustion.", ku: "مانیا دەتوانێت بەهێز و تەنانەت ترسناک هەست پێبکرێت، هەندێک جار دەبێتە هۆی بڕیاری مەترسیدار یان ماندووبوون." },
      },
    ],
    seekHelp: {
      en: "If you notice extreme mood shifts affecting sleep, energy, or decisions, an evaluation from a mental health professional can guide you toward the right support. This is education, not a diagnosis.",
      ku: "ئەگەر گۆڕانی توندی هەست تێبینی دەکەیت کە کاریگەری لەسەر خەو، وزە، یان بڕیارەکانت هەیە، هەڵسەنگاندنێک لەلایەن پسپۆڕێکی تەندروستی دەروونییەوە دەتوانێت ڕێنماییت بکات بۆ پشتگیریی گونجاو. ئەمە فێرکارییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Track your mood, sleep, and energy patterns over time.", ku: "شێوازی هەست، خەو، و وزەت بەدرێژایی کات تۆمار بکە." },
      { en: "Keep a steady sleep schedule — it strongly affects mood stability.", ku: "خشتەیەکی جێگیری خەو بپارێزە — کاریگەریی بەهێزی لەسەر جێگیریی هەست هەیە." },
      { en: "Build a support plan with people you trust for harder periods.", ku: "پلانی پشتگیری دروست بکە لەگەڵ کەسانێک کە پشتیان پێ دەبەستیت بۆ ماوەی سەختتر." },
      { en: "Avoid major decisions during very high or very low periods when possible.", ku: "ئەگەر دەکرێت، لە کاتی ماوەی زۆر بەرز یان زۆر نزمدا دووری بگرەوە لە بڕیاری گەورە." },
      { en: "Stay connected with treatment and support if you have a care plan.", ku: "ئەگەر پلانی چاودێریت هەیە، پەیوەندیت لەگەڵ چارەسەری و پشتگیری بەردەوام بکە." },
    ],
    related: ["depression", "emotional-regulation", "sleep"],
    quiz: [
      {
        q: { en: "Bipolar mood episodes typically last:", ku: "قۆناغەکانی هەستی دووقۆناغی بەشێوەیەکی گشتی چەند دەخایەنن؟" },
        options: [
          { en: "A few minutes", ku: "چەند خولەکێک" },
          { en: "Days to weeks", ku: "چەند ڕۆژ تا هەفتەکان" },
          { en: "Only a few seconds", ku: "تەنها چەند چرکەیەک" },
        ],
        correct: 1,
        explain: { en: "Bipolar episodes are longer-lasting shifts, unlike brief everyday mood changes.", ku: "قۆناغەکانی دووقۆناغی دەروونی گۆڕانی درێژخایەنترن، برەکس لە گۆڕانی کورتخایەنی هەستی ڕۆژانە." },
      },
      {
        q: { en: "Can people with bipolar disorder live successful, stable lives?", ku: "ئایا کەسانی دووقۆناغی دەروونی دەتوانن ژیانێکی سەرکەوتوو و جێگیر بژین؟" },
        options: [
          { en: "No, never", ku: "نەخێر، هەرگیز" },
          { en: "Yes, with the right support and treatment", ku: "بەڵێ، بە پشتگیری و چارەسەری گونجاو" },
          { en: "Only for a few years", ku: "تەنها بۆ چەند ساڵێک" },
        ],
        correct: 1,
        explain: { en: "With proper support, many people with bipolar disorder manage it well long-term.", ku: "بە پشتگیریی گونجاو، زۆر کەسی دووقۆناغی دەروونی بۆ ماوەیەکی درێژ بە باشی بەڕێوەی دەبەن." },
      },
      {
        q: { en: "True or false: Manic episodes always feel fun and exciting.", ku: "ڕاستە یان هەڵە: قۆناغی مانیا هەمیشە خۆش و سەرنجڕاکێش هەست پێدەکرێت؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — mania can feel intense or even frightening", ku: "هەڵەیە — مانیا دەتوانێت بەهێز یان تەنانەت ترسناک هەست پێبکرێت" },
          { en: "True, it’s always pleasant", ku: "ڕاستە، هەمیشە خۆشە" },
        ],
        correct: 1,
        explain: { en: "Mania can involve risky choices and exhaustion, not just excitement.", ku: "مانیا دەتوانێت بڕیاری مەترسیدار و ماندووبوونی تێدابێت، نەک تەنها خۆشی." },
      },
    ],
    dailyTip: { en: "Today, notice one pattern in your sleep or energy and write it down.", ku: "ئەمڕۆ، یەک شێواز لە خەو یان وزەت تێبینی بکە و بینووسە." },
  },
  {
    id: "social-anxiety",
    category: "anxiety",
    hue: "#C88B7E",
    accent: "#954A3E",
    title: { en: "Social Anxiety", ku: "نیگەرانی کۆمەڵایەتی" },
    subtitle: { en: "When being seen feels overwhelming", ku: "کاتێک لەبەردەم خەڵکدا هەست بە قورسی دەکەیت." },
    explanation: {
      en: "Social anxiety is an intense fear of being judged, embarrassed, or watched by others in social situations. It can make everyday moments — ordering food, speaking up, meeting new people — feel frightening. It’s more than shyness; it’s a strong fear response that can be understood and eased.",
      ku: "نیگەرانی کۆمەڵایەتی ترسێکی بەهێزە لە حوکمدان، شەرمەزاری، یان تەماشاکردن لەلایەن خەڵکەوە لە دۆخی کۆمەڵایەتیدا. دەتوانێت ساتی ڕۆژانە — داواکردنی خواردن، قسەکردن، بینینی خەڵکی نوێ — ترسناک بکات. زیاترە لە شەرمن؛ وەڵامێکی بەهێزی ترسە کە دەتوانرێت تێبگرێت و کەم بکرێتەوە.",
    },
    symptoms: [
      { en: "Intense fear before social events, sometimes for days", ku: "ترسێکی بەهێز پێش بۆنەکانی کۆمەڵایەتی، هەندێک جار بۆ چەند ڕۆژێک" },
      { en: "Worrying about saying or doing something embarrassing", ku: "نیگەرانی دەربارەی وتن یان کردنی شتێکی شەرمەزارکەر" },
      { en: "Physical signs like blushing, sweating, or a shaky voice", ku: "نیشانەی جەستەیی وەک سوورهەڵگەڕان، خۆڵقاندن، یان دەنگی لەرزۆک" },
      { en: "Avoiding eye contact or group situations", ku: "دووریگرتنەوە لە تەماشاکردنی چاو یان دۆخی کۆمەڵ" },
      { en: "Replaying social interactions afterward, judging yourself harshly", ku: "دووبارەکردنەوەی پەیوەندییە کۆمەڵایەتییەکان دواتر، بە توندی حوکمدان لەسەر خۆت" },
    ],
    myths: [
      {
        myth: { en: "Social anxiety is just shyness", ku: "نیگەرانی کۆمەڵایەتی تەنها شەرمنییە" },
        fact: { en: "Social anxiety is a stronger fear response that can significantly limit daily life, unlike everyday shyness.", ku: "نیگەرانی کۆمەڵایەتی وەڵامێکی بەهێزتری ترسە کە دەتوانێت بە جددی سنوور بۆ ژیانی ڕۆژانە دابنێت، جیاواز لە شەرمنیی ئاسایی." },
      },
      {
        myth: { en: "People with social anxiety just don’t want friends", ku: "کەسانی نیگەرانی کۆمەڵایەتی تەنها ناویستن هاوڕێ هەبێت" },
        fact: { en: "Many people with social anxiety deeply want connection but fear being judged.", ku: "زۆر کەسی نیگەرانی کۆمەڵایەتی بە قوڵی پەیوەندییان دەوێت بەڵام لە حوکمدان دەترسن." },
      },
      {
        myth: { en: "You can just tell yourself to stop worrying", ku: "دەتوانیت بە خۆت بڵێیت وازبهێنە لە نیگەرانی" },
        fact: { en: "The fear response is automatic — coping tools help much more than willing it away.", ku: "وەڵامی ترس خۆکارییە — ئامرازەکانی مامەڵەکردن زۆر زیاتر یارمەتی دەدەن لە بە ویست لادانی." },
      },
    ],
    seekHelp: {
      en: "If social fear stops you from things you want to do — school, work, friendships — a mental health professional can help you build confidence gradually. This is educational, not a diagnosis.",
      ku: "ئەگەر ترسی کۆمەڵایەتی ڕێگری لێت دەکات لەو شتانەی دەتەوێت بیکەیت — خوێندن، کار، هاوڕێیەتی — پسپۆڕێکی تەندروستی دەروونی دەتوانێت یارمەتیت بدات بۆ بنیاتنانی متمانە هەنگاو بە هەنگاو. ئەمە فێرکارییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Start with small, low-pressure social interactions.", ku: "دەستپێبکە بە پەیوەندیی کۆمەڵایەتیی بچووک و بێ گوشار." },
      { en: "Challenge harsh self-judgments after social moments.", ku: "بەرەنگاری حوکمدانی توندی خۆت بەرەو خۆت دوای ساتی کۆمەڵایەتی." },
      { en: "Practice slow breathing before entering a social situation.", ku: "پێش چوونە ناو دۆخی کۆمەڵایەتی، هەناسەدانی هێواش ڕاهێنان بکە." },
      { en: "Remember: most people are focused on themselves, not judging you closely.", ku: "بیرت بێت: زۆربەی خەڵک سەرنجیان لەسەر خۆیانە، نەک بە وردی حوکمدان لەسەر تۆ." },
      { en: "Celebrate small brave moments, even a short conversation.", ku: "بۆ ساتی بچووکی ئازایانە شادمان بە، تەنانەت گفتوگۆیەکی کورتیش." },
    ],
    related: ["anxiety", "self-esteem", "loneliness"],
    quiz: [
      {
        q: { en: "Social anxiety is different from shyness because it:", ku: "نیگەرانی کۆمەڵایەتی چۆن جیاوازە لە شەرمن؟" },
        options: [
          { en: "Is much milder", ku: "زۆر سووکترە" },
          { en: "Can significantly limit daily life through intense fear", ku: "دەتوانێت بە توندی سنوور بۆ ژیانی ڕۆژانە دابنێت لە ڕێگەی ترسی بەهێزەوە" },
          { en: "Only affects children", ku: "تەنها کاریگەری لەسەر منداڵان هەیە" },
        ],
        correct: 1,
        explain: { en: "Social anxiety involves a stronger, more limiting fear response than typical shyness.", ku: "نیگەرانی کۆمەڵایەتی وەڵامێکی ترسی بەهێزتر و سنوورداری زیاتری تێدایە لە شەرمنیی ئاسایی." },
      },
      {
        q: { en: "Do people with social anxiety want connection?", ku: "ئایا کەسانی نیگەرانی کۆمەڵایەتی پەیوەندییان دەوێت؟" },
        options: [
          { en: "No, they prefer being alone always", ku: "نەخێر، هەمیشە پێیان خۆشە تاک بن" },
          { en: "Many deeply want it but fear judgment", ku: "زۆرکەس بە قوڵی دەیانەوێت بەڵام لە حوکمدان دەترسن" },
          { en: "It varies with no pattern", ku: "بەبێ هیچ شێوازێک جیاوازە" },
        ],
        correct: 1,
        explain: { en: "The fear is about judgment, not a lack of wanting connection.", ku: "ترسەکە دەربارەی حوکمدانە، نەک نەبوونی خواستی پەیوەندی." },
      },
      {
        q: { en: "What can help before a social event?", ku: "پێش بۆنەیەکی کۆمەڵایەتی چی یارمەتیدەرە؟" },
        options: [
          { en: "Avoiding it forever", ku: "هەمیشە دووریگرتنەوە لێی" },
          { en: "Slow breathing and starting small", ku: "هەناسەدانی هێواش و دەستپێکردن بە بچووک" },
          { en: "Rehearsing every worst-case scenario", ku: "دووبارەکردنەوەی هەموو باری خراپترین" },
        ],
        correct: 1,
        explain: { en: "Calming the body and starting with manageable steps builds confidence over time.", ku: "هێورکردنەوەی جەستە و دەستپێکردن بە هەنگاوی ئاسان بە درێژایی کات متمانە بنیات دەنێت." },
      },
    ],
    dailyTip: { en: "Today, try one small, low-pressure social interaction.", ku: "ئەمڕۆ، یەک پەیوەندیی کۆمەڵایەتیی بچووک و بێ گوشار تاقی بکەرەوە." },
  },
  {
    id: "eating",
    category: "life",
    hue: "#B8A87E",
    accent: "#8C7A4A",
    title: { en: "Eating & Body Image", ku: "خواردن و وێنەی جەستە" },
    subtitle: { en: "When food or body image feels hard", ku: "کاتێک خواردن یان وێنەی جەستە سەخت دەبێت." },
    explanation: {
      en: "Eating disorders involve a difficult relationship with food, eating, or body image that affects wellbeing — they are not about vanity or choice. They can affect anyone, regardless of body size, age, or gender. This page keeps things gentle and general; specific numbers or behaviors around food are intentionally left out.",
      ku: "کێشەکانی خواردن پەیوەندییەکی سەختیان تێدایە لەگەڵ خواردن، خواردنەوە، یان وێنەی جەستە کە کاریگەری لەسەر باشی دەروونی دادەنێت — پەیوەندی بە خۆشەویستنی ڕووکەشی یان هەڵبژاردن نییە. دەتوانێت کاریگەری لەسەر هەر کەسێک هەبێت، سەرباری قەبارەی جەستە، تەمەن، یان ڕەگەز. ئەم پەڕەیە شتەکان بە نەرمی و گشتی دەهێڵێتەوە؛ ژمارە یان ڕەفتاری تایبەت دەربارەی خواردن بە ئاگایانە پشتگوێخراوە.",
    },
    symptoms: [
      { en: "Persistent worry about food, eating, or body shape", ku: "نیگەرانیی بەردەوام دەربارەی خواردن، خواردنەوە، یان شێوەی جەستە" },
      { en: "Eating patterns that feel out of your control", ku: "شێوازی خواردن کە دەرەوەی کۆنترۆڵت هەست پێدەکرێت" },
      { en: "Strong feelings of guilt or shame connected to eating", ku: "هەستی بەهێزی گوناه یان شەرمەزاری پەیوەست بە خواردنەوە" },
      { en: "Withdrawing from meals or social eating situations", ku: "دووریگرتنەوە لە نانخواردن یان دۆخی خواردنی کۆمەڵایەتی" },
      { en: "Body image feeling closely tied to self-worth", ku: "هەستکردن بەوەی وێنەی جەستە بە توندی پەیوەستە بە بەهای خۆت" },
    ],
    myths: [
      {
        myth: { en: "Eating disorders are a choice or about vanity", ku: "کێشەکانی خواردن هەڵبژاردنێکن یان دەربارەی خۆشەویستنی ڕووکەشن" },
        fact: { en: "Eating disorders are complex conditions shaped by emotional, biological, and social factors — not a lifestyle choice.", ku: "کێشەکانی خواردن دۆخی ئاڵۆزن کە هۆکاری هەستی، زیندەزانی، و کۆمەڵایەتی شێوەیان داوە — نەک هەڵبژاردنی شێوازی ژیان." },
      },
      {
        myth: { en: "Only thin young women get eating disorders", ku: "تەنها کچانی لاواز و لاغر کێشەی خواردنیان هەیە" },
        fact: { en: "Eating disorders affect people of all body types, genders, and ages.", ku: "کێشەکانی خواردن کاریگەری لەسەر خەڵکی هەموو جۆرە جەستە، ڕەگەز، و تەمەنێک هەیە." },
      },
      {
        myth: { en: "You can tell someone has an eating disorder just by looking at them", ku: "دەتوانیت بزانیت کەسێک کێشەی خواردنی هەیە تەنها بە تەماشاکردنی" },
        fact: { en: "Eating disorders often aren’t visible from the outside — many people hide their struggle well.", ku: "کێشەکانی خواردن زۆرجار لە دەرەوە دیار نین — زۆر کەس خەباتەکەیان بە باشی دەشارنەوە." },
      },
    ],
    seekHelp: {
      en: "If thoughts about food or body image feel controlling, distressing, or are affecting your health, please reach out to a doctor or mental health professional — support really can help. This page offers gentle education, not a diagnosis.",
      ku: "ئەگەر بیرکردنەوە دەربارەی خواردن یان وێنەی جەستە کۆنترۆڵکەر، ناڕەحەتکەر، یان کاریگەری لەسەر تەندروستیت هەیە، تکایە پەیوەندی بکە بە پزیشکێک یان پسپۆڕێکی تەندروستی دەروونی — پشتگیری بەڕاستی دەتوانێت یارمەتی بدات. ئەم پەڕەیە فێرکارییەکی نەرم پێشکەش دەکات، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Try to speak to yourself with the same kindness you’d offer a friend.", ku: "هەوڵبدە لەگەڵ خۆت بە هەمان میهرەبانی قسە بکەیت کە بۆ هاوڕێیەک دەیکەیت." },
      { en: "Notice if social media is affecting how you feel about your body.", ku: "تێبینی بکە ئایا میدیای کۆمەڵایەتی کاریگەری لەسەر هەستت بۆ جەستەت هەیە." },
      { en: "Reach out to someone you trust if eating feels heavy.", ku: "ئەگەر خواردن قورس هەست پێدەکرێت، پەیوەندی لەگەڵ کەسێک بکە کە پشتی پێ دەبەستیت." },
      { en: "Focus on how food and movement make you feel, not appearance alone.", ku: "سەرنج بدە بۆ ئەوەی خواردن و جووڵە چۆن هەستت پێدەکەن، نەک تەنها دەرەوە." },
      { en: "Remember that seeking help is a sign of strength, not failure.", ku: "بیرت بێت داواکردنی یارمەتی نیشانەی هێزە، نەک شکست." },
    ],
    related: ["self-esteem", "perfectionism", "emotional-regulation"],
    quiz: [
      {
        q: { en: "Eating disorders are best understood as:", ku: "باشترین تێگەیشتن لە کێشەکانی خواردن چییە؟" },
        options: [
          { en: "A choice about appearance", ku: "هەڵبژاردنێک دەربارەی دەرەوە" },
          { en: "A complex condition shaped by emotional and biological factors", ku: "دۆخێکی ئاڵۆز کە هۆکاری هەستی و زیندەزانی شێوەیان داوە" },
          { en: "Something that only affects diet choices", ku: "شتێک کە تەنها کاریگەری لەسەر هەڵبژاردنی خۆراک هەیە" },
        ],
        correct: 1,
        explain: { en: "Eating disorders involve complex emotional and biological factors, not simple choices.", ku: "کێشەکانی خواردن هۆکاری هەستی و زیندەزانیی ئاڵۆزیان تێدایە، نەک هەڵبژاردنی سادە." },
      },
      {
        q: { en: "Who can be affected by eating disorders?", ku: "کێ دەتوانێت کاریگەری کێشەکانی خواردنی لەسەر بێت؟" },
        options: [
          { en: "Only thin young women", ku: "تەنها کچانی لاغری لاوان" },
          { en: "People of all body types, genders, and ages", ku: "خەڵکی هەموو جۆرە جەستە، ڕەگەز، و تەمەنێک" },
          { en: "Only teenagers", ku: "تەنها گەنجان" },
        ],
        correct: 1,
        explain: { en: "Eating disorders can affect anyone, regardless of appearance, gender, or age.", ku: "کێشەکانی خواردن دەتوانێت کاریگەری لەسەر هەر کەسێک هەبێت، سەرباری دەرەوە، ڕەگەز، یان تەمەن." },
      },
      {
        q: { en: "True or false: You can always tell if someone has an eating disorder just by looking at them.", ku: "ڕاستە یان هەڵە: هەمیشە دەتوانیت بزانیت کەسێک کێشەی خواردنی هەیە تەنها بە تەماشاکردنی؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — it’s often hidden", ku: "هەڵەیە — زۆرجار شاراوەیە" },
          { en: "True, weight always shows it", ku: "ڕاستە، کێش هەمیشە نیشانی دەدات" },
        ],
        correct: 1,
        explain: { en: "Eating disorders are often invisible from the outside.", ku: "کێشەکانی خواردن زۆرجار لە دەرەوە نەبیندراون." },
      },
    ],
    dailyTip: { en: "Today, try one kind thought about your body instead of a critical one.", ku: "ئەمڕۆ، لەبری بیرکردنەوەیەکی ڕەخنەیی، یەک بیرکردنەوەی میهرەبان بۆ جەستەت تاقی بکەرەوە." },
  },
  {
    id: "self-esteem",
    category: "self",
    hue: "#E0C068",
    accent: "#C49A3E",
    title: { en: "Self-Esteem", ku: "نرخدانی خۆ" },
    subtitle: { en: "How you see and value yourself", ku: "چۆن خۆت دەبینیت و نرخ دەدەیت." },
    explanation: {
      en: "Self-esteem is how you see and value yourself — your sense of worth beneath achievements or others’ opinions. Low self-esteem can make you doubt your worth or dismiss your own needs. It can be gently rebuilt with practice, patience, and kindness toward yourself.",
      ku: "بەهای خۆت ئەوەیە چۆن خۆت دەبینیت و بەها پێدەدەیت — هەستی بەهات لەژێر سەرکەوتن یان ڕای خەڵکەوە. بەهای خۆتی نزم دەتوانێت وا لێت بکات گومان لە بەهای خۆت بکەیت یان پێویستییەکانی خۆت پشتگوێبخەیت. دەتوانرێت بە نەرمی و ڕاهێنان و پشوودراویی لەگەڵ خۆتدا دووبارە بنیات بنرێتەوە.",
    },
    symptoms: [
      { en: "Frequently doubting your own worth or abilities", ku: "زۆرجار گومان لە بەها یان تواناکانی خۆت دەکەیت" },
      { en: "Difficulty accepting compliments", ku: "گرفت لە وەرگرتنی ستایش" },
      { en: "Comparing yourself harshly to others", ku: "بەراوردکردنی خۆت بە توندی لەگەڵ خەڵکی تر" },
      { en: "Struggling to set boundaries or say no", ku: "کێشە لە دانانی سنوور یان وتنی نەخێر" },
      { en: "A harsh inner voice that criticizes often", ku: "دەنگێکی توندی ناوخۆیی کە زۆرجار ڕەخنە دەگرێت" },
    ],
    myths: [
      {
        myth: { en: "Self-esteem means thinking you’re better than others", ku: "بەهای خۆت واتای ئەوەیە بیر بکەیتەوە کە لە خەڵکی تر باشتریت" },
        fact: { en: "Healthy self-esteem is a steady sense of worth, not superiority over others.", ku: "بەهای خۆتی تەندروست هەستێکی جێگیری بەهایە، نەک باشتربوون لە خەڵکی تر." },
      },
      {
        myth: { en: "Low self-esteem can’t really change", ku: "بەهای خۆتی نزم بەڕاستی ناتوانێت بگۆڕدرێت" },
        fact: { en: "Self-esteem can grow with practice, self-compassion, and small consistent steps.", ku: "بەهای خۆت دەتوانێت بگەشێت بە ڕاهێنان، میهرەبانی لەگەڵ خۆت، و هەنگاوی بچووکی بەردەوام." },
      },
      {
        myth: { en: "Confidence and self-esteem are the same thing", ku: "متمانە و بەهای خۆت هەمان شتن" },
        fact: { en: "Confidence is often about specific skills, while self-esteem is a deeper sense of overall worth.", ku: "متمانە زۆرجار دەربارەی لێهاتووییەکی دیاریکراوە، بەڵام بەهای خۆت هەستێکی قوڵتری بەهای گشتییە." },
      },
    ],
    seekHelp: {
      en: "If low self-worth feels constant and affects relationships or decisions, talking with a mental health professional can help you build a steadier sense of self. This is education, not a diagnosis.",
      ku: "ئەگەر بەهای خۆتی نزم بەردەوام هەست پێبکرێت و کاریگەری لەسەر پەیوەندییەکان یان بڕیارەکانت هەبێت، قسەکردن لەگەڵ پسپۆڕێکی تەندروستی دەروونی دەتوانێت یارمەتیت بدات بۆ بنیاتنانی هەستێکی جێگیرتری خۆت. ئەمە فێرکارییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Notice your inner critic and ask if you’d say the same to a friend.", ku: "دەنگی ڕەخنەگری ناوخۆیی خۆت تێبینی بکە و بپرسە ئایا هەمان شت بە هاوڕێیەک دەڵێیت." },
      { en: "Write down one thing you did well each day, however small.", ku: "هەموو ڕۆژێک یەک شت بنووسە کە باش کردووتە، هەرچەندە بچووکیش بێت." },
      { en: "Practice accepting a compliment with a simple “thank you.”", ku: "ڕاهێنان بکە بۆ وەرگرتنی ستایش بە «سوپاس»ێکی سادە." },
      { en: "Set one small boundary and notice how it feels.", ku: "یەک سنووری بچووک دابنێ و تێبینی بکە چۆن هەست پێدەکرێت." },
      { en: "Surround yourself with people who treat you with respect.", ku: "خۆت لەگەڵ کەسانێک بگرە کە بە ڕێزەوە مامەڵەت لەگەڵ دەکەن." },
    ],
    related: ["perfectionism", "social-anxiety", "depression"],
    quiz: [
      {
        q: { en: "Healthy self-esteem means:", ku: "بەهای خۆتی تەندروست واتای چییە؟" },
        options: [
          { en: "Believing you’re better than everyone else", ku: "باوەڕکردن بەوەی لە هەموو کەسێک باشتریت" },
          { en: "Having a steady sense of your own worth", ku: "هەبوونی هەستێکی جێگیر لە بەهای خۆت" },
          { en: "Never making mistakes", ku: "هەرگیز هەڵە نەکردن" },
        ],
        correct: 1,
        explain: { en: "Self-esteem is about a stable inner sense of worth, not comparison to others.", ku: "بەهای خۆت دەربارەی هەستێکی جێگیری ناوخۆیی بەهایە، نەک بەراوردکردن لەگەڵ خەڵکی تر." },
      },
      {
        q: { en: "Can low self-esteem improve over time?", ku: "ئایا بەهای خۆتی نزم دەتوانێت بە درێژایی کات باشتر بێت؟" },
        options: [
          { en: "No, it’s fixed forever", ku: "نەخێر، هەمیشە جێگیرە" },
          { en: "Yes, with practice and self-compassion", ku: "بەڵێ، بە ڕاهێنان و میهرەبانی لەگەڵ خۆت" },
          { en: "Only through others’ approval", ku: "تەنها لە ڕێگەی ڕەزامەندیی خەڵکی تر" },
        ],
        correct: 1,
        explain: { en: "Small consistent steps and self-compassion can gradually build stronger self-esteem.", ku: "هەنگاوی بچووکی بەردەوام و میهرەبانی لەگەڵ خۆت بە هێواشی بەهای خۆتی بەهێزتر بنیات دەنێت." },
      },
      {
        q: { en: "True or false: Confidence and self-esteem are exactly the same.", ku: "ڕاستە یان هەڵە: متمانە و بەهای خۆت تەواو هەمان شتن؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — confidence relates to skills, self-esteem to overall worth", ku: "هەڵەیە — متمانە پەیوەندی بە لێهاتووی هەیە، بەهای خۆت بە بەهای گشتی" },
          { en: "True, they can’t exist separately", ku: "ڕاستە، ناتوانن بەجیا بوونیان هەبێت" },
        ],
        correct: 1,
        explain: { en: "You can be confident in one skill while still struggling with overall self-esteem.", ku: "دەتوانیت لە یەک لێهاتووی متمانەت هەبێت لەکاتێکدا هێشتا لەگەڵ بەهای خۆتی گشتی تێدەکۆشیت." },
      },
    ],
    dailyTip: { en: "Today, write down one thing you appreciate about yourself.", ku: "ئەمڕۆ، یەک شت بنووسە کە بایەخی پێدەدەیت دەربارەی خۆت." },
  },
  {
    id: "perfectionism",
    category: "self",
    hue: "#8EA8C8",
    accent: "#5C7A9C",
    title: { en: "Perfectionism", ku: "تەواوکاری" },
    subtitle: { en: "When “good enough” never feels enough", ku: "کاتێک «باشی گونجاو» هەرگیز بەس نابێت." },
    explanation: {
      en: "Perfectionism is the drive to meet impossibly high standards, often paired with harsh self-criticism when they aren’t met. It can look like productivity from the outside, but inside it often feels like constant pressure and fear of failure. Progress, not perfection, is a kinder and more realistic goal.",
      ku: "تەواوکاری ئارەزووی گەیشتنە بە ستانداردی زۆر بەرز کە مەحاڵە، زۆرجار لەگەڵ ڕەخنەی توندی خۆت کاتێک نایگاتێ. لە دەرەوە دەکرێت وەک بەرهەمهێنان دیار بێت، بەڵام لە ناوەوە زۆرجار وەک گوشاری بەردەوام و ترسی شکست هەست پێدەکرێت. پێشکەوتن، نەک تەواوی، ئامانجێکی میهرەبانتر و ڕاستەقینەترە.",
    },
    symptoms: [
      { en: "Setting standards that feel impossible to reach", ku: "دانانی ستانداردی مەحاڵ بۆ گەیشتنی" },
      { en: "Harsh self-criticism after small mistakes", ku: "ڕەخنەی توندی خۆت دوای هەڵەی بچووک" },
      { en: "Procrastinating out of fear of not doing something perfectly", ku: "دواخستنی کار لە ترسی ئەوەی تەواو ئەنجام نەدرێت" },
      { en: "Difficulty feeling satisfied even after success", ku: "گرفت لە هەستکردن بە تێری تەنانەت دوای سەرکەوتن" },
      { en: "Tying self-worth tightly to achievement", ku: "بەستنەوەی بەهای خۆت بە توندی بە سەرکەوتنەوە" },
    ],
    myths: [
      {
        myth: { en: "Perfectionism is just having high standards", ku: "تەواوکاری تەنها هەبوونی ستانداردی بەرزە" },
        fact: { en: "Healthy high standards feel motivating; perfectionism feels punishing and rarely satisfied.", ku: "ستانداردی بەرزی تەندروست هاندەرانە هەست پێدەکرێت؛ تەواوکاری سزادەرانە هەست پێدەکرێت و بە دژواری تێردەبێت." },
      },
      {
        myth: { en: "Perfectionism always leads to better results", ku: "تەواوکاری هەمیشە دەبێتە هۆی ئەنجامی باشتر" },
        fact: { en: "Perfectionism can actually cause procrastination, burnout, and lower productivity over time.", ku: "تەواوکاری بەڕاستی دەتوانێت ببێتە هۆی دواخستنی کار، ماندووبوونی دەروونی، و کەمی بەرهەمهێنان بە درێژایی کات." },
      },
      {
        myth: { en: "You have to be a perfectionist to succeed", ku: "پێویستە تەواوخواز بیت بۆ سەرکەوتن" },
        fact: { en: "Many successful people thrive through consistency and self-compassion, not relentless perfectionism.", ku: "زۆر کەسی سەرکەوتوو گەشە دەکەن لە ڕێگەی بەردەوامی و میهرەبانی لەگەڵ خۆت، نەک تەواوکاریی بێ وچان." },
      },
    ],
    seekHelp: {
      en: "If perfectionism is causing significant stress, procrastination, or affecting your wellbeing, a professional can help you build a healthier relationship with achievement. This is educational, not a diagnosis.",
      ku: "ئەگەر تەواوکاری فشاری بەرچاو، دواخستنی کار، یان کاریگەری لەسەر باشی دەروونیت دروست دەکات، پسپۆڕێک دەتوانێت یارمەتیت بدات بۆ بنیاتنانی پەیوەندییەکی تەندروستتر لەگەڵ سەرکەوتن. ئەمە فێرکارییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Aim for “good enough” instead of perfect on low-stakes tasks.", ku: "ئامانج بگرە بۆ «باشی گونجاو» لەبری تەواوی لە کاری کەم گرنگ." },
      { en: "Set time limits on tasks to prevent endless refining.", ku: "کاتی سنووردار بۆ کارەکان دابنێ بۆ ڕێگریکردن لە چاکسازیی بێکۆتایی." },
      { en: "Notice and challenge all-or-nothing thinking.", ku: "بیرکردنەوەی «هەموو یان هیچ» تێبینی بکە و بەرەنگاری بەرەوە." },
      { en: "Celebrate effort and progress, not just outcomes.", ku: "شادمانی بۆ هەوڵدان و پێشکەوتن بکە، نەک تەنها ئەنجام." },
      { en: "Practice sharing imperfect work — the world rarely notices what you fear.", ku: "ڕاهێنان بکە بۆ هاوبەشکردنی کاری نا تەواو — جیهان بە دژواری تێبینی ئەو شتانە دەکات کە لێی دەترسیت." },
    ],
    related: ["self-esteem", "stress", "ocd"],
    quiz: [
      {
        q: { en: "How is perfectionism different from having high standards?", ku: "تەواوکاری چۆن جیاوازە لە هەبوونی ستانداردی بەرز؟" },
        options: [
          { en: "There’s no real difference", ku: "هیچ جیاوازیی ڕاستەقینە نییە" },
          { en: "Perfectionism feels punishing and is rarely satisfied", ku: "تەواوکاری سزادەرانە هەست پێدەکرێت و بە دژواری تێردەبێت" },
          { en: "Perfectionism is always healthier", ku: "تەواوکاری هەمیشە تەندروستترە" },
        ],
        correct: 1,
        explain: { en: "Healthy standards motivate, while perfectionism often brings harsh self-judgment and rarely feels satisfied.", ku: "ستانداردی تەندروست هاندەرانەیە، بەڵام تەواوکاری زۆرجار حوکمدانی توندی خۆت لەگەڵ دەهێنێت و بە دژواری تێردەبێت." },
      },
      {
        q: { en: "Can perfectionism hurt productivity?", ku: "ئایا تەواوکاری دەتوانێت زیان بگەیەنێت بە بەرهەمهێنان؟" },
        options: [
          { en: "No, it always helps", ku: "نەخێر، هەمیشە یارمەتی دەدات" },
          { en: "Yes, it can cause procrastination and burnout", ku: "بەڵێ، دەتوانێت دواخستنی کار و ماندووبوونی دەروونی دروست بکات" },
          { en: "Only for artists", ku: "تەنها بۆ هونەرمەندان" },
        ],
        correct: 1,
        explain: { en: "Fear of imperfection often delays tasks and drains energy over time.", ku: "ترس لە نا تەواوی زۆرجار کارەکان دوادەخات و بە درێژایی کات وزە دەسڕێتەوە." },
      },
      {
        q: { en: "True or false: You must be a perfectionist to succeed.", ku: "ڕاستە یان هەڵە: پێویستە تەواوخواز بیت بۆ سەرکەوتن؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — consistency and self-compassion work just as well", ku: "هەڵەیە — بەردەوامی و میهرەبانی لەگەڵ خۆت هەمان کاریگەرییان هەیە" },
          { en: "True, only in competitive fields", ku: "ڕاستە، تەنها لە بوارە پێشبڕکێییەکان" },
        ],
        correct: 1,
        explain: { en: "Many people succeed through steady effort rather than relentless perfectionism.", ku: "زۆر کەس بە هەوڵدانی بەردەوام سەردەکەون نەک بە تەواوکاریی بێ وچان." },
      },
    ],
    dailyTip: { en: "Today, let one small task be “good enough” instead of perfect.", ku: "ئەمڕۆ، ڕێگە بدە یەک کاری بچووک «باشی گونجاو» بێت لەبری تەواوی." },
  },
  {
    id: "sleep",
    category: "stress",
    hue: "#6B7EC8",
    accent: "#4A5595",
    title: { en: "Sleep & Rest", ku: "خەو و پشوودان" },
    subtitle: { en: "When rest feels hard to find", ku: "کاتێک پشوودان دەست ناکەوێت." },
    explanation: {
      en: "Sleep is essential for emotional regulation, memory, and physical health — yet stress and anxiety often make it harder to fall or stay asleep. Poor sleep and low mood can feed each other in a cycle. Small, steady habits can help your body remember how to rest.",
      ku: "خەو گرنگە بۆ ڕێکخستنی هەست، یادەوەری، و تەندروستیی جەستەیی — بەڵام فشار و دڵەڕاوکێ زۆرجار خەوتن یان بەردەوامیی خەو سەختتر دەکەن. خەوی خراپ و خەمۆکی دەتوانن یەکتری خۆراک بدەن لە خولگەیەکدا. ڕاهێنانی بچووک و بەردەوام دەتوانێت یارمەتی جەستەت بدات بیربکاتەوە چۆن پشوو بدات.",
    },
    symptoms: [
      { en: "Trouble falling asleep because the mind won’t settle", ku: "گرفت لە خەوتن چونکە مێشک ئارام نابێتەوە" },
      { en: "Waking up often during the night", ku: "زۆرجار هەستان لە شەودا" },
      { en: "Feeling tired even after a full night’s sleep", ku: "هەستکردن بە ماندووبوون تەنانەت دوای شەوێکی تەواوی خەو" },
      { en: "Racing thoughts or worry right before bed", ku: "بیرکردنەوەی خێرا یان نیگەرانی ڕاستەوخۆ پێش خەوتن" },
      { en: "Irregular sleep schedule that shifts night to night", ku: "خشتەی خەوی بێ ڕێکوپێک کە شەو بە شەو دەگۆڕێت" },
    ],
    myths: [
      {
        myth: { en: "You can catch up on lost sleep over the weekend", ku: "دەتوانیت لە کۆتایی هەفتەدا لەدەستدانی خەو تەواو بکەیتەوە" },
        fact: { en: "Sleep debt doesn’t fully reverse with weekend catch-up — consistency matters more.", ku: "قەرزی خەو بە تەواوی بە کۆتایی هەفتەی زیادە ناسڕدرێتەوە — بەردەوامی زیاتر گرنگە." },
      },
      {
        myth: { en: "Screens right before bed don’t really affect sleep", ku: "بەکارهێنانی شاشە پێش خەوتن بەڕاستی کاریگەری لەسەر خەو نییە" },
        fact: { en: "Screen light can delay the body’s natural sleep signals, making it harder to fall asleep.", ku: "ڕووناکیی شاشە دەتوانێت نیشانەی سروشتیی خەوی جەستە دواخات، وا لێدەکات خەوتن سەختتر بێت." },
      },
      {
        myth: { en: "Lying in bed trying harder to sleep always works", ku: "خۆلادان لە جێگا و زیاتر هەوڵدان بۆ خەوتن هەمیشە کاردەکات" },
        fact: { en: "If sleep won’t come after twenty minutes, getting up briefly and returning when sleepy often helps more.", ku: "ئەگەر خەو دوای بیست خولەک نەهات، هەستان بۆ ماوەیەکی کورت و گەڕانەوە کاتێک هەستت بە خەو کرد زۆرجار زیاتر یارمەتی دەدات." },
      },
    ],
    seekHelp: {
      en: "If sleep trouble lasts for weeks and affects your mood, focus, or health, a doctor or sleep specialist can help identify what’s going on. This is general education, not a diagnosis.",
      ku: "ئەگەر گرفتی خەو بۆ هەفتەکان بمێنێتەوە و کاریگەری لەسەر هەست، سەرنج، یان تەندروستیت هەبێت، پزیشکێک یان پسپۆڕی خەو دەتوانێت یارمەتیت بدات بۆ دۆزینەوەی هۆکارەکە. ئەمە فێرکاریی گشتییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Keep a consistent sleep and wake time, even on weekends.", ku: "کاتی خەوتن و هەستان جێگیر بپارێزە، تەنانەت لە کۆتایی هەفتەشدا." },
      { en: "Dim lights and screens an hour before bed.", ku: "کاتژمێرێک پێش خەوتن ڕووناکی و شاشەکان کەم بکەرەوە." },
      { en: "Write down worries before bed to clear your mind.", ku: "پێش خەوتن نیگەرانییەکان بنووسە بۆ خاڵیکردنەوەی مێشکت." },
      { en: "Keep your bedroom cool, dark, and quiet.", ku: "ژووری خەوت سارد، تاریک، و هێمن بپارێزە." },
      { en: "Avoid caffeine in the afternoon and evening.", ku: "دووریگرتنەوە لە کافین لە دوانیوەڕۆ و ئێوارە." },
    ],
    related: ["stress", "anxiety", "burnout"],
    quiz: [
      {
        q: { en: "Can you fully catch up on lost sleep over the weekend?", ku: "ئایا دەتوانیت بە تەواوی لەدەستدانی خەو لە کۆتایی هەفتەدا زیادە بکەیتەوە؟" },
        options: [
          { en: "Yes, completely", ku: "بەڵێ، بە تەواوی" },
          { en: "Not fully — consistency matters more", ku: "نا بە تەواوی — بەردەوامی زیاتر گرنگە" },
          { en: "Only if you sleep 20 hours straight", ku: "تەنها ئەگەر ٢٠ کاتژمێر بەردەوام بخەویت" },
        ],
        correct: 1,
        explain: { en: "Sleep debt doesn’t fully reverse with a single catch-up — regular habits matter more.", ku: "قەرزی خەو بە یەک زیادەکردنەوە بە تەواوی ناسڕدرێتەوە — ڕاهێنانی ڕێکوپێک زیاتر گرنگە." },
      },
      {
        q: { en: "What can help improve sleep?", ku: "چی دەتوانێت یارمەتی باشترکردنی خەو بدات؟" },
        options: [
          { en: "Using bright screens right before bed", ku: "بەکارهێنانی شاشەی ڕووناک ڕاستەوخۆ پێش خەوتن" },
          { en: "A consistent sleep schedule and dim lights before bed", ku: "خشتەیەکی جێگیری خەو و ڕووناکیی کەم پێش خەوتن" },
          { en: "Drinking coffee in the evening", ku: "خواردنەوەی قاوە لە ئێوارە" },
        ],
        correct: 1,
        explain: { en: "Consistency and reducing light exposure before bed support the body’s natural sleep signals.", ku: "بەردەوامی و کەمکردنەوەی ڕووناکی پێش خەوتن پشتگیریی نیشانەی سروشتیی خەوی جەستە دەکات." },
      },
      {
        q: { en: "True or false: Trying harder to fall asleep always works.", ku: "ڕاستە یان هەڵە: زیاتر هەوڵدان بۆ خەوتن هەمیشە کاردەکات؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — getting up briefly can help more", ku: "هەڵەیە — هەستانێکی کورت زیاتر دەتوانێت یارمەتی بدات" },
          { en: "True, forcing it always works fastest", ku: "ڕاستە، زۆرلێکردن هەمیشە خێراترە" },
        ],
        correct: 1,
        explain: { en: "Forcing sleep often increases frustration — a brief break can ease the mind first.", ku: "زۆرلێکردن بۆ خەوتن زۆرجار دڵگرانی زیاد دەکات — پشوویەکی کورت دەتوانێت یەکەم جار مێشک ئارام بکاتەوە." },
      },
    ],
    dailyTip: { en: "Today, dim the lights an hour earlier than usual.", ku: "ئەمڕۆ، ڕووناکییەکان کاتژمێرێک زووتر لە ئاسایی کەم بکەرەوە." },
  },
  {
    id: "trauma",
    category: "life",
    hue: "#9E6B93",
    accent: "#6B3E5C",
    title: { en: "Trauma", ku: "برینداری دەروونی" },
    subtitle: { en: "When an experience overwhelms your ability to cope", ku: "کاتێک ڕووداوێک لە توانای هەڵگرتنت قورستر دەبێت." },
    explanation: {
      en: "Trauma happens when an experience overwhelms your ability to cope, leaving lasting effects on the mind and body. It can come from a single event or repeated difficult experiences over time. Trauma responses are the body’s way of trying to protect you, even when they feel confusing.",
      ku: "برینداری دەروونی ڕوودەدات کاتێک ئەزموونێک تواناکانت بۆ مامەڵەکردن قورس دەکات، کاریگەریی بەردەوام لەسەر مێشک و جەستە جێدەهێڵێت. دەتوانێت لە ڕووداوێکی تاک یان ئەزموونی سەخت و دووبارە بەدرێژایی کاتەوە بێت. وەڵامی برینداری دەروونی شێوازی جەستەیە بۆ هەوڵدان بۆ پاراستنت، تەنانەت کاتێک سەرلێشێواو هەست پێدەکرێت.",
    },
    symptoms: [
      { en: "Feeling on edge or easily startled", ku: "هەستکردن بە لەسەر لێواری هەستیاری یان بە ئاسانی تۆقین" },
      { en: "Difficulty trusting others or feeling safe", ku: "گرفت لە باوەڕپێکردنی خەڵکی تر یان هەستکردن بە سەلامەتی" },
      { en: "Intense reactions to reminders of the event", ku: "وەڵامی بەهێز بۆ بیرخستنەوەکانی ڕووداوەکە" },
      { en: "Feeling disconnected from your body or emotions", ku: "هەستکردن بە بێپەیوەندی لەگەڵ جەستە یان هەستەکانت" },
      { en: "Avoiding people, places, or topics tied to the experience", ku: "دووریگرتنەوە لە کەس، شوێن، یان بابەت پەیوەست بە ئەزموونەکە" },
    ],
    myths: [
      {
        myth: { en: "Only life-threatening events cause trauma", ku: "تەنها ڕووداوی مەترسیدار بۆ ژیان برینداری دەروونی دروست دەکات" },
        fact: { en: "Trauma can also come from ongoing emotional harm, neglect, or repeated hard experiences.", ku: "برینداری دەروونی دەتوانێت هەروەها لە زیانی هەستیی بەردەوام، پشتگوێخستن، یان ئەزموونی سەختی دووبارە بێت." },
      },
      {
        myth: { en: "If you weren’t there physically, it can’t be traumatic", ku: "ئەگەر بە جەستەیی لەوێ نەبووی، ناتوانێت بریندار بێت" },
        fact: { en: "Witnessing harm to someone else, or learning about it, can also be deeply traumatic.", ku: "بینینی زیان بۆ کەسێکی تر، یان زانین دەربارەی، دەتوانێت بە قوڵی تراماوی بێت." },
      },
      {
        myth: { en: "You should be able to just move on from trauma", ku: "دەبێت بتوانیت تەنها لە برینداری دەروونی تێپەڕیت" },
        fact: { en: "Healing from trauma takes time and often support — it isn’t a simple decision to “move on.”", ku: "چاکبوونەوە لە برینداری دەروونی کات و زۆرجار پشتگیریی پێویستە — بڕیارێکی سادە نییە بۆ «تێپەڕین»." },
      },
    ],
    seekHelp: {
      en: "If reactions to a hard experience keep disrupting your life, sleep, or relationships, a trauma-informed professional can offer real support and tools. This page shares general education, not a diagnosis.",
      ku: "ئەگەر وەڵامەکان بۆ ئەزموونێکی سەخت بەردەوام کێشە بۆ ژیان، خەو، یان پەیوەندییەکانت دروست دەکات، پسپۆڕێکی ئاشنا بە برینداری دەروونی دەتوانێت پشتگیری و ئامرازی ڕاستەقینە پێشکەش بکات. ئەم پەڕەیە فێرکاریی گشتی هاوبەش دەکات، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Ground yourself in the present when memories intrude.", ku: "خۆت لە ئێستادا دامەزرێنە کاتێک یادەوەری دێتە ناوەوە." },
      { en: "Give yourself permission to go at your own pace with healing.", ku: "مۆڵەت بدە بە خۆت بۆ چاکبوونەوە بە خێراییی خۆت." },
      { en: "Build a small circle of people who feel safe.", ku: "کۆمەڵێکی بچووک لە خەڵکی سەلامەت بۆ خۆت بنیات بنێ." },
      { en: "Notice bodily tension and try gentle release, like stretching.", ku: "توندیی جەستە تێبینی بکە و هەوڵبدە بە نەرمی ئازادی بکەیت، وەک درێژکردنەوە." },
      { en: "Remind yourself: your reactions made sense given what happened.", ku: "بە خۆت بڵێ: وەڵامەکانت لەبەر ئەوەی ڕوویدا واتای هەبوون." },
    ],
    related: ["ptsd", "grief", "emotional-regulation"],
    quiz: [
      {
        q: { en: "Trauma can result from:", ku: "برینداری دەروونی دەتوانێت ئەنجامی چی بێت؟" },
        options: [
          { en: "Only life-threatening events", ku: "تەنها ڕووداوی مەترسیدار بۆ ژیان" },
          { en: "A single event or repeated difficult experiences", ku: "ڕووداوێکی تاک یان ئەزموونی سەختی دووبارە" },
          { en: "Only events from childhood", ku: "تەنها ڕووداوەکانی منداڵی" },
        ],
        correct: 1,
        explain: { en: "Trauma can stem from single events or from prolonged, repeated hardship.", ku: "برینداری دەروونی دەتوانێت لە ڕووداوێکی تاک یان سەختیی درێژخایەن و دووبارە بێت." },
      },
      {
        q: { en: "Can witnessing harm to someone else be traumatic?", ku: "ئایا بینینی زیان بۆ کەسێکی تر دەتوانێت تراماوی بێت؟" },
        options: [
          { en: "No, only direct experience counts", ku: "نەخێر، تەنها ئەزموونی ڕاستەوخۆ ژمێردراوە" },
          { en: "Yes, witnessing can also be deeply traumatic", ku: "بەڵێ، بینین دەتوانێت بە قوڵی تراماویش بێت" },
          { en: "Only if it happened recently", ku: "تەنها ئەگەر بەم دواییانە ڕووی دابێت" },
        ],
        correct: 1,
        explain: { en: "Witnessing or learning about harm to others can also cause real trauma.", ku: "بینین یان زانین دەربارەی زیان بۆ خەڵکی تر دەتوانێت برینداری دەروونیش دروست بکات." },
      },
      {
        q: { en: "What helps most in healing from trauma?", ku: "چی زۆرترین یارمەتی دەدات بۆ چاکبوونەوە لە برینداری دەروونی؟" },
        options: [
          { en: "Forcing yourself to move on quickly", ku: "زۆرلێکردنی خۆت بۆ خێرا تێپەڕین" },
          { en: "Time, support, and often professional care", ku: "کات، پشتگیری، و زۆرجار چاودێریی پسپۆڕی" },
          { en: "Avoiding the topic completely forever", ku: "بە تەواوی و هەمیشە دووریگرتنەوە لە بابەتەکە" },
        ],
        correct: 1,
        explain: { en: "Healing usually needs time, connection, and sometimes professional support.", ku: "چاکبوونەوە زۆرجار پێویستیی بە کات، پەیوەندی، و هەندێک جار پشتگیریی پسپۆڕی هەیە." },
      },
    ],
    dailyTip: { en: "Today, notice one thing that helps you feel grounded and safe.", ku: "ئەمڕۆ، یەک شت تێبینی بکە کە یارمەتیت دەدات هەستی دامەزراوی و سەلامەت بکەیت." },
  },
  {
    id: "emotional-regulation",
    category: "self",
    hue: "#7EC89E",
    accent: "#4A956B",
    title: { en: "Emotional Regulation", ku: "ڕێکخستنی هەستەکان" },
    subtitle: { en: "Learning to ride the wave of feelings", ku: "فێربوونی مامەڵەکردن لەگەڵ شەپۆلی هەستەکان." },
    explanation: {
      en: "Emotional regulation is the ability to notice, understand, and manage your emotions in healthy ways — not suppressing them, but not being swept away either. It’s a skill that can be learned at any age, with practice. Big feelings are normal; how we respond to them can grow over time.",
      ku: "ڕێکخستنی هەست تواناییە بۆ تێبینیکردن، تێگەیشتن، و بەڕێوەبردنی هەستەکانت بە شێوازێکی تەندروست — نەک چەپاندنیان، بەڵام نەبردنیشیان بەرەو هەڵکشان. لێهاتووییەکە کە لە هەر تەمەنێکدا دەتوانرێت فێری بیت، بە ڕاهێنان. هەستی گەورە ئاساییە؛ چۆنیەتیی وەڵامدانەوەمان بۆیان دەتوانێت بە درێژایی کات گەشە بکات.",
    },
    symptoms: [
      { en: "Feeling completely overwhelmed by small triggers", ku: "هەستکردن بە قورسی تەواوی لەبەر هۆکاری بچووک" },
      { en: "Reacting intensely before understanding the feeling", ku: "بە توندی وەڵامدانەوە پێش تێگەیشتن لە هەستەکە" },
      { en: "Struggling to calm down once upset", ku: "کێشە لە ئارامبوونەوە کاتێک تووڕەبوویت" },
      { en: "Suppressing feelings until they build up and burst out", ku: "چەپاندنی هەستەکان تا کۆدەبنەوە و بە یەکجار دەردەکەون" },
      { en: "Difficulty naming what you’re actually feeling", ku: "گرفت لە ناونانی ئەوەی بەڕاستی هەستی پێدەکەیت" },
    ],
    myths: [
      {
        myth: { en: "Regulating emotions means not feeling them", ku: "ڕێکخستنی هەست واتای هەست نەکردنیانە" },
        fact: { en: "Emotional regulation means feeling emotions fully while choosing how to respond — not suppressing them.", ku: "ڕێکخستنی هەست واتای بە تەواوی هەستکردنە بە هەستەکانت لەکاتێکدا هەڵدەبژێریت چۆن وەڵامیان دەدەیتەوە — نەک چەپاندنیان." },
      },
      {
        myth: { en: "Some people are just born unable to control their emotions", ku: "هەندێک کەس لەدایکبوون ناتوانن هەستەکانیان کۆنترۆڵ بکەن" },
        fact: { en: "Emotional regulation is a learnable skill, though it can be harder for some due to experience or brain differences.", ku: "ڕێکخستنی هەست لێهاتووییەکی فێربووە، هەرچەندە دەتوانێت بۆ هەندێک کەس سەختتر بێت لەبەر ئەزموون یان جیاوازیی دەماری." },
      },
      {
        myth: { en: "Crying or anger always means poor emotional regulation", ku: "گریان یان تووڕەیی هەمیشە واتای ڕێکخستنی هەستی خراپە" },
        fact: { en: "Expressing emotions in healthy ways, including crying or anger, can actually be a sign of good regulation.", ku: "دەربڕینی هەستەکان بە شێوازی تەندروست، لەوانە گریان یان تووڕەیی، بەڕاستی دەتوانێت نیشانەی ڕێکخستنی هەستی باش بێت." },
      },
    ],
    seekHelp: {
      en: "If big emotions consistently feel unmanageable or are affecting relationships and daily life, a mental health professional can teach helpful tools. This is educational, not a diagnosis.",
      ku: "ئەگەر هەستی گەورە بەردەوام بەڕێوەنەبراو هەست پێبکرێت یان کاریگەری لەسەر پەیوەندییەکان و ژیانی ڕۆژانەت هەبێت، پسپۆڕێکی تەندروستی دەروونی دەتوانێت ئامرازی یارمەتیدەر فێرت بکات. ئەمە فێرکارییە، نەک دەستنیشانکردن.",
    },
    coping: [
      { en: "Pause and name the emotion before reacting.", ku: "وەستە و هەستەکە ناوببە پێش وەڵامدانەوە." },
      { en: "Take slow breaths to give your body time to settle.", ku: "هەناسەی هێواش بدە بۆ ئەوەی جەستەت کاتی هەبێت بۆ ئارامبوونەوە." },
      { en: "Ask yourself what the emotion might be trying to tell you.", ku: "لە خۆت بپرسە هەستەکە لەوانەیە هەوڵدات چی پێت بڵێت." },
      { en: "Use movement or writing to release intense feelings safely.", ku: "جووڵە یان نووسین بەکاربهێنە بۆ ئازادکردنی هەستی بەهێز بە سەلامەتی." },
      { en: "Practice self-compassion when emotions feel hard to manage.", ku: "کاتێک هەستەکان سەخت بەڕێوەدەبرێن، میهرەبانی لەگەڵ خۆت ڕاهێنان بکە." },
    ],
    related: ["anxiety", "stress", "self-esteem"],
    quiz: [
      {
        q: { en: "Emotional regulation means:", ku: "ڕێکخستنی هەست واتای چییە؟" },
        options: [
          { en: "Never feeling strong emotions", ku: "هەرگیز هەستی بەهێز نەکردن" },
          { en: "Feeling emotions fully while choosing a healthy response", ku: "بە تەواوی هەستکردن بە هەستەکان لەکاتێکدا وەڵامدانەوەیەکی تەندروست هەڵدەبژێریت" },
          { en: "Suppressing feelings until they disappear", ku: "چەپاندنی هەستەکان تا نامێنن" },
        ],
        correct: 1,
        explain: { en: "Regulation is about feeling emotions and responding thoughtfully, not hiding them.", ku: "ڕێکخستن دەربارەی هەستکردنە بە هەستەکان و وەڵامدانەوەیەکی بیرکردنەوانەیە، نەک شاردنەوەیان." },
      },
      {
        q: { en: "Is emotional regulation a skill that can be learned?", ku: "ئایا ڕێکخستنی هەست لێهاتووییەکە کە دەتوانرێت فێری بیت؟" },
        options: [
          { en: "No, it’s fixed from birth", ku: "نەخێر، لەدایکبووەوە جێگیرە" },
          { en: "Yes, it can be learned and practiced at any age", ku: "بەڵێ، دەتوانرێت لە هەر تەمەنێکدا فێری بیت و ڕاهێنانی بکەیت" },
          { en: "Only children can learn it", ku: "تەنها منداڵان دەتوانن فێری ببن" },
        ],
        correct: 1,
        explain: { en: "Emotional regulation can be developed with practice throughout life.", ku: "ڕێکخستنی هەست دەتوانرێت بە ڕاهێنان بەدرێژایی ژیان گەشە بکات." },
      },
      {
        q: { en: "True or false: Crying or expressing anger always means poor emotional regulation.", ku: "ڕاستە یان هەڵە: گریان یان دەربڕینی تووڕەیی هەمیشە واتای ڕێکخستنی هەستی خراپە؟" },
        options: [
          { en: "True", ku: "ڕاستە" },
          { en: "False — healthy expression can be a sign of good regulation", ku: "هەڵەیە — دەربڕینی تەندروست دەتوانێت نیشانەی ڕێکخستنی هەستی باش بێت" },
          { en: "True, emotions should never be shown", ku: "ڕاستە، هەستەکان نابێت هەرگیز نیشان بدرێن" },
        ],
        correct: 1,
        explain: { en: "Healthy emotional expression, including crying or anger, can reflect good regulation, not poor.", ku: "دەربڕینی تەندروستی هەست، لەوانە گریان یان تووڕەیی، دەتوانێت ڕێکخستنی هەستی باش نیشان بدات، نەک خراپ." },
      },
    ],
    dailyTip: { en: "Today, pause for five seconds before reacting to something frustrating.", ku: "ئەمڕۆ، پێش وەڵامدانەوە بۆ شتێکی دڵگران، پێنج چرکە وەستە." },
  },
];

export function getTopic(id) {
  return LIBRARY_TOPICS.find((topic) => topic.id === id) || null;
}

export function getRelatedTopics(id) {
  const topic = getTopic(id);
  if (!topic || !Array.isArray(topic.related)) return [];
  return topic.related
    .map((relatedId) => getTopic(relatedId))
    .filter(Boolean);
}

export function searchTopics(query, lang) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return LIBRARY_TOPICS;
  const key = lang === "ku" ? "ku" : "en";

  return LIBRARY_TOPICS.filter((topic) => {
    const haystack = [
      topic.title?.en,
      topic.title?.ku,
      topic.subtitle?.en,
      topic.subtitle?.ku,
      topic.explanation?.[key],
      ...(topic.symptoms || []).map((s) => s?.[key]),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}
