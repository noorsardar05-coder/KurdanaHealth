/**
 * Educational drug rows + infection cards + articles + mini-game seeds.
 * Not exhaustive clinical reference — learner-facing summaries only.
 */
(function () {
  "use strict";

  window.AFS_DRUGS = [
    { id: "pen_v", classId: "penicillins", tags: ["resp", "not_flu"], names: { en: "Penicillin V", ku: "پێنیسلین V" } },
    { id: "amox", classId: "penicillins", tags: ["resp", "ear", "not_flu"], names: { en: "Amoxicillin", ku: "ئامۆکسیسلین" } },
    { id: "amp", classId: "penicillins", tags: ["resp", "uti", "not_flu"], names: { en: "Ampicillin", ku: "ئەمپیسلین" } },
    { id: "fluclo", classId: "penicillins", tags: ["skin", "not_flu"], names: { en: "Flucloxacillin", ku: "فلۆکلۆکساسیلین" } },
    { id: "pip_tazo", classId: "penicillins", tags: ["broad", "not_flu"], names: { en: "Piperacillin–tazobactam", ku: "پایپێراسیلین–تازۆباکتام" } },
    { id: "cephlex", classId: "cephalosporins", tags: ["skin", "resp", "not_flu"], names: { en: "Cephalexin", ku: "سێفالێکسین" } },
    { id: "cefurox", classId: "cephalosporins", tags: ["resp", "not_flu"], names: { en: "Cefuroxime", ku: "سێفورۆکسیم" } },
    { id: "cefix", classId: "cephalosporins", tags: ["resp", "not_flu"], names: { en: "Cefixime", ku: "سێفیکسیم" } },
    { id: "ceftri", classId: "cephalosporins", tags: ["broad", "not_flu"], names: { en: "Ceftriaxone", ku: "سێفتڕیاکسۆن" } },
    { id: "cefep", classId: "cephalosporins", tags: ["broad", "not_flu"], names: { en: "Cefepime", ku: "سێفێپیم" } },
    { id: "azith", classId: "macrolides", tags: ["resp", "not_flu"], names: { en: "Azithromycin", ku: "ئەزیترۆمایسین" } },
    { id: "clarith", classId: "macrolides", tags: ["resp", "not_flu"], names: { en: "Clarithromycin", ku: "کلاریترۆمایسین" } },
    { id: "eryth", classId: "macrolides", tags: ["resp", "not_flu"], names: { en: "Erythromycin", ku: "ئەریترۆمایسین" } },
    { id: "doxy", classId: "tetracyclines", tags: ["resp", "skin", "not_flu"], names: { en: "Doxycycline", ku: "دۆکساسایکلین" } },
    { id: "mino", classId: "tetracyclines", tags: ["skin", "not_flu"], names: { en: "Minocycline", ku: "مینۆسایکلین" } },
    { id: "tetra", classId: "tetracyclines", tags: ["skin", "not_flu"], names: { en: "Tetracycline", ku: "تێتراسایکلین" } },
    { id: "cipro", classId: "fluoroquinolones", tags: ["uti", "gi", "not_flu"], names: { en: "Ciprofloxacin", ku: "سیپرۆفلۆکساسین" } },
    { id: "levo", classId: "fluoroquinolones", tags: ["resp", "uti", "not_flu"], names: { en: "Levofloxacin", ku: "لێڤۆفلۆکساسین" } },
    { id: "moxi", classId: "fluoroquinolones", tags: ["resp", "not_flu"], names: { en: "Moxifloxacin", ku: "مۆکسیفلۆکساسین" } },
    { id: "tmp_smx", classId: "sulfonamides", tags: ["uti", "resp", "not_flu"], names: { en: "Trimethoprim–sulfamethoxazole", ku: "ترایمێثۆپریم–سولفامێثۆکسازۆل" } },
    { id: "clinda", classId: "lincosamides", tags: ["skin", "resp", "not_flu"], names: { en: "Clindamycin", ku: "کلیندامایسین" } },
    { id: "metro", classId: "nitroimidazoles", tags: ["gi", "not_flu"], names: { en: "Metronidazole", ku: "مێترۆنیدازۆل" } },
    { id: "gent", classId: "aminoglycosides", tags: ["broad", "not_flu"], names: { en: "Gentamicin", ku: "جێنتامایسین" } },
    { id: "amik", classId: "aminoglycosides", tags: ["broad", "not_flu"], names: { en: "Amikacin", ku: "ئامیکاسین" } },
    { id: "tobra", classId: "aminoglycosides", tags: ["broad", "not_flu"], names: { en: "Tobramycin", ku: "تۆبرامایسین" } },
    { id: "vanco", classId: "glycopeptides", tags: ["broad", "skin", "not_flu"], names: { en: "Vancomycin", ku: "ڤانکۆمایسین" } },
    { id: "mero", classId: "carbapenems", tags: ["broad", "not_flu"], names: { en: "Meropenem", ku: "مێرۆپێنەم" } },
    { id: "imip", classId: "carbapenems", tags: ["broad", "not_flu"], names: { en: "Imipenem", ku: "ئیمێپێنەم" } },
    { id: "erta", classId: "carbapenems", tags: ["broad", "not_flu"], names: { en: "Ertapenem", ku: "ئێرتاپێنەم" } },
    { id: "linez", classId: "oxazolidinones", tags: ["skin", "resp", "not_flu"], names: { en: "Linezolid", ku: "لاینێزۆلید" } },
    { id: "nitrofur", classId: "nitrofurans", tags: ["uti", "not_flu"], names: { en: "Nitrofurantoin", ku: "نیترۆفێرانتۆئین" } },
  ];

  window.AFS_DRUG_DETAILS = {
    en: {
      defaultUses:
        "Educational: some bacterial infections when clinically appropriate—prescriber decides.",
      defaultNot:
        "Does not treat viral illnesses such as typical flu or common cold; misuse worsens resistance.",
      defaultSide: "Side effects vary (GI upset, allergy risk, drug interactions)—ask a clinician/pharmacist.",
      defaultWarn: "Penicillin allergy and other contraindications must be reviewed by a clinician.",
      defaultResist: "Resistance is a real risk—use only when clearly indicated and completed as prescribed when advised.",
      defaultDoctor: "Starting, stopping, or changing antibiotics requires clinician guidance.",
    },
    ku: {
      defaultUses:
        "پەروەردەیی: هەندێک تووشبوونی بەکتریایی کاتێک پزیشک دەریان دەخات.",
      defaultNot:
        "بۆ نەخۆشی ڤایرۆسی وەک زکامی ئاسایی یارمەتیدەر نییە؛ بەکارهێنانی هەڵە بەرگری دروست دەکات.",
      defaultSide: "کاریگەری لاوەکی جیاواز دەبێت—پزیشک یان دەرمانساز بپرسە.",
      defaultWarn: "ئاڵەرژی پێنیسلین و بەربەستەکان دەبێت پزیشک پێداچوونەوە بکات.",
      defaultResist: "بەرگری مەترسیدارە—تەنها کاتێک دەربڕدراوە وەک ڕێنمایی تەواو بکە.",
      defaultDoctor: "دەستپێکردن، ڕاگرتن، یان گۆڕینی ئانتیبیۆتیک پێویستی بە پزیشکە.",
    },
  };

  window.AFS_INFECTIONS = [
    {
      id: "viral",
      names: { en: "Viral infection", ku: "تووشبوونی ڤایرۆسی" },
      abx: "maybe",
      sym: {
        en: "Variable: fever, fatigue, runny nose, sore throat, cough—often gradual.",
        ku: "جیاواز: گەرمی، ستەم، بینی ڕژاو، گێژەی قووڵ، کۆک.",
      },
      do: {
        en: "Rest, fluids, monitoring; seek care if red flags or worsening.",
        ku: "پشوو، ئاو، چاودێری؛ ئەگەر ئاڵەرتی سوڕیا هەبوو پزیشک.",
      },
      care: {
        en: "Escalate urgently for breathing difficulty, chest pain, confusion, dehydration.",
        ku: "بۆ کێشەی هەناسە، ئازاری سینە، گیجی، کەمئاوەیی بە فرێ بڕۆ.",
      },
    },
    {
      id: "bacterial",
      names: { en: "Bacterial infection", ku: "تووشبوونی بەکتریایی" },
      abx: "maybe",
      sym: {
        en: "Depends on site—may include focal pain, pus, persistent high fever in some cases.",
        ku: "بەپێی شوێن دەگۆڕێت—ڕەنگە ئازاری ناوخۆیی، چەوری، گەرمی بەردەوام.",
      },
      do: {
        en: "Clinical assessment often needed; antibiotics only when appropriate.",
        ku: "زۆرجار پشکنین پێویستە؛ ئانتیبیۆتیک تەنها کاتێک گونجاوە.",
      },
      care: {
        en: "Do not self-start antibiotics—misuse harms you and others.",
        ku: "خۆت ئانتیبیۆتیک دەستپێمەکە—زیان بە خۆت و کەسانی تر دەگەیەنێت.",
      },
    },
    {
      id: "cold",
      names: { en: "Common cold", ku: "زکامی ئاسایی" },
      abx: "no",
      sym: {
        en: "Stuffy/runny nose, sneezing, mild sore throat; fever less common in adults.",
        ku: "بینی پڕ، سووتان، گێژەی سوک؛ گەرمی کەمتر لە گەورەکان.",
      },
      do: {
        en: "Fluids, rest, saline rinses; symptoms often peak days 2–4 then improve.",
        ku: "ئاو، پشوو؛ زۆرجار ڕۆژ ٢–٤ زۆرترینە دواتر باشتر دەبێت.",
      },
      care: {
        en: "Antibiotics do not treat typical colds (viral).",
        ku: "ئانتیبیۆتیک زکامی ئاسایی چارەسەر ناکات.",
      },
    },
    {
      id: "flu",
      names: { en: "Influenza (flu)", ku: "پەتا (فڵۆ)" },
      abx: "no",
      sym: {
        en: "Sudden fever, body aches, fatigue, cough, headache common.",
        ku: "گەرمی، ئازاری لەش، ستەم، کۆک، سەرئێشە.",
      },
      do: {
        en: "Rest, fluids, isolate when possible; antivirals are clinician decisions—not antibiotics.",
        ku: "پشوو، ئاو، دابڕین؛ دژەڤایرۆس بڕیاری پزیشکە—نەک ئانتیبیۆتیک.",
      },
      care: {
        en: "Seek urgent care for breathing problems, chest pain, confusion, persistent high fever.",
        ku: "بۆ هەناسە، سینە، گیجی، گەرمی بەردەوام بە فرێ بڕۆ.",
      },
    },
    {
      id: "covid_like",
      names: { en: "COVID-like respiratory illness", ku: "نەخۆشی سی وەک کۆڤید" },
      abx: "no",
      sym: {
        en: "Overlaps with cold/flu—fever, cough, fatigue, loss of smell may occur.",
        ku: "وەک زکام/پەتا—گەرمی، کۆک، ستەم.",
      },
      do: {
        en: "Follow public health guidance; test when advised; supportive care.",
        ku: "ڕێنمایی تەندروستی جێبەجێ بکە؛ پشتیوانی چاودێری.",
      },
      care: {
        en: "Antibiotics do not treat viruses; escalation based on severity.",
        ku: "ئانتیبیۆتیک ڤایرۆس چارەسەر ناکات.",
      },
    },
    {
      id: "sinus",
      names: { en: "Sinus symptoms", ku: "نیشانەکانی سینوس" },
      abx: "maybe",
      sym: {
        en: "Facial pressure, nasal congestion, post-nasal drip—often viral early.",
        ku: "فشڵ، پڕی لە بینی—زۆرجار سەرەتای ڤایرۆسی.",
      },
      do: {
        en: "Saline rinses, hydration; prolonged severe symptoms need clinician review.",
        ku: "شۆردنەوە، ئاو؛ نیشانە درێژ و قورس پزیشک.",
      },
      care: {
        en: "Most cases do not require antibiotics; bacterial sinusitis is a clinician diagnosis.",
        ku: "زۆربەیان ئانتیبیۆتیک پێویست ناکات.",
      },
    },
    {
      id: "sore_throat",
      names: { en: "Sore throat", ku: "گێژەی قووڵ" },
      abx: "maybe",
      sym: {
        en: "Painful swallowing; may accompany cough/runny nose (viral) or fever without cough (needs evaluation).",
        ku: "ئازاری قووڵ؛ لەگەڵ کۆک یان بێ کۆک.",
      },
      do: {
        en: "Fluids, throat-soothing measures; testing may guide bacterial concerns.",
        ku: "ئاو، هۆکارەکانی ئارامکردنەوە؛ تاقیکردنەوە ڕەنگە یارمەتی بدات.",
      },
      care: {
        en: "Strep decisions require appropriate testing—avoid guessing antibiotics.",
        ku: "بڕیار بۆ سترێپ پێویستی بە تاقیکردنەوە هەیە.",
      },
    },
    {
      id: "ear",
      names: { en: "Ear infection symptoms", ku: "نیشانەکانی تووشبوونی گووچکە" },
      abx: "maybe",
      sym: {
        en: "Ear pain, fullness, sometimes fever—more common in children.",
        ku: "ئازاری گووچکە، پڕی، گەرمی.",
      },
      do: {
        en: "Pain relief as advised; clinician decides if antibiotics are indicated.",
        ku: "کەمکردنەوەی ئازار بە ڕاوێژ؛ پزیشک بڕیار دەدات.",
      },
      care: {
        en: "Not all ear pain is bacterial—professional exam helps.",
        ku: "هەموو ئازارێک بەکتریایی نییە.",
      },
    },
    {
      id: "chest",
      names: { en: "Chest infection symptoms", ku: "نیشانەکانی تووشبوونی سینە" },
      abx: "maybe",
      sym: {
        en: "Cough, sputum, fever, breathlessness—severity varies widely.",
        ku: "کۆک، ئاوژە، گەرمی، کورتبوونی هەناسە.",
      },
      do: {
        en: "Red flags need urgent care; management depends on clinical assessment.",
        ku: "ئاڵەرتی سوڕیا چاودێری فرێ؛ بەپێی پشکنین.",
      },
      care: {
        en: "Pneumonia care plans are clinician-led; do not self-prescribe.",
        ku: "چارەسەری پەیموونیا بڕیاری پزیشکە.",
      },
    },
    {
      id: "uti",
      names: { en: "Urinary tract infection (symptoms)", ku: "نیشانەکانی تووشبوونی میزڕەگ" },
      abx: "maybe",
      sym: {
        en: "Burning urination, frequency, urgency, sometimes fever/flank pain.",
        ku: "ئازاری میزکردن، زۆر جار میز، گەرمی.",
      },
      do: {
        en: "Clinical evaluation and sometimes urine tests guide antibiotics if needed.",
        ku: "پشکنین و تاقیکردنەوە ڕێبەر دەبێت.",
      },
      care: {
        en: "Untreated complicated UTIs can be serious—seek timely care.",
        ku: "تووشبوونی قورس پێویستی بە چاودێری یە.",
      },
    },
  ];

  window.AFS_ARTICLES = [
    {
      id: "a1",
      titles: {
        en: "Why antibiotics don’t treat flu",
        ku: "بۆچی ئانتیبیۆتیک پەتا چارەسەر ناکات",
      },
      bodies: {
        en: "Influenza is viral. Antibiotics target bacteria. Taking them ‘just in case’ can cause side effects and resistance without benefit.",
        ku: "پەتا ڤایرۆسە. ئانتیبیۆتیک بەکتریای ئامانج دەکات. بەکارهێنانی بێ سوود زیان و بەرگری دروست دەکات.",
      },
    },
    {
      id: "a2",
      titles: {
        en: "What antimicrobial resistance means",
        ku: "بەرگری دژە دەرمان واتا چییە",
      },
      bodies: {
        en: "Germs adapt; misuse speeds this. Common infections can become harder to treat for everyone.",
        ku: "بەکتریا گۆڕانکاری دەکات؛ بەکارهێنانی هەڵە خێراتری دەکات. تووشبوونی ئاسایی قورستر دەبێت.",
      },
    },
    {
      id: "a3",
      titles: {
        en: "Why finishing prescribed antibiotics matters",
        ku: "بۆچی تەواوکردنی دەرمان گرنگە",
      },
      bodies: {
        en: "Unless your clinician tells you to stop, incomplete courses can contribute to resistance and relapse risk.",
        ku: "تەنها ئەگەر پزیشک فەرمانی نەدات، ناتەواوکردن بەرگری و ڕیسکی دووبارەبوونەوە زیاد دەکات.",
      },
    },
    {
      id: "a4",
      titles: {
        en: "Why leftover antibiotics are dangerous",
        ku: "بۆچی ئانتیبیۆتیکی ماوە مەترسیدارە",
      },
      bodies: {
        en: "Wrong drug, wrong dose, wrong bug—delays correct care and fuels resistance.",
        ku: "دەرمانی هەڵە، دۆزی هەڵە، چارەسەری دروست دواکەوتوو دەکات.",
      },
    },
    {
      id: "a5",
      titles: {
        en: "When fever needs attention",
        ku: "کاتێک گەرمی پێویستی بە سەرنجە",
      },
      bodies: {
        en: "Context matters: age, duration, breathing, hydration, and red flags. Escalate urgently when warning signs appear.",
        ku: "تەمەن، ماوە، هەناسە، ئاو، ئاڵەرتی سوڕیا — کاتێک پێویستە بە فرێ بڕۆ.",
      },
    },
    {
      id: "a6",
      titles: {
        en: "Caring for flu at home (supportive care)",
        ku: "چاودێری پەتا لە ماڵەوە",
      },
      bodies: {
        en: "Rest, fluids, isolation when appropriate, and monitoring. Seek care if severe symptoms develop.",
        ku: "پشوو، ئاو، دابڕین، چاودێری؛ ئەگەر قورس بوو پزیشک.",
      },
    },
    {
      id: "a7",
      titles: {
        en: "Preventing spread during illness",
        ku: "ڕێگریکردن لە بڵاوبوونەوە",
      },
      bodies: {
        en: "Hand hygiene, masks when appropriate, covering coughs, staying home when sick.",
        ku: "خاوێنکردنەوەی دەست، ماسک کاتێک گونجاوە، پشوو لە نەخۆشی.",
      },
    },
  ];

  window.AFS_VIRUS_GAME = [
    {
      q: { en: "Common cold with runny nose and mild cough", ku: "زکامی ئاسایی لەگەڵ بینی ڕژاو و کۆکی سوک" },
      a: "virus",
    },
    {
      q: { en: "Sudden high fever, body aches, and fatigue for 3 days", ku: "گەرمی، ئازاری لەش، ستەم بۆ ٣ ڕۆژ" },
      a: "virus",
    },
    {
      q: {
        en: "Typical seasonal influenza-like illness without bacterial confirmation",
        ku: "وەک پەتا بەبێ پشکنینی بەکتریایی",
      },
      a: "virus",
    },
    {
      q: {
        en: "Confirmed bacterial pneumonia (clinician diagnosis)—management plan",
        ku: "پەیموونیای بەکتریایی (پزیشک دەریاندەکات)",
      },
      a: "bacteria",
    },
    {
      q: { en: "Most uncomplicated viral bronchitis presentations", ku: "زۆربەی برۆنکیتسی ڤایرۆسیی ئاسایی" },
      a: "virus",
    },
  ];

  window.AFS_MYTH_GAME = [
    {
      st: {
        en: "Green mucus always means you need antibiotics.",
        ku: "بینی سەوز هەمیشە واتای ئانتیبیۆتیکە.",
      },
      ok: false,
      exp: {
        en: "Color alone cannot prove bacterial infection—context and exam matter.",
        ku: "ڕەنگ بە تەنها دەستنیشانکردنی بەکتریایی نییە.",
      },
    },
    {
      st: {
        en: "Antibiotics can cure most cases of the common cold.",
        ku: "ئانتیبیۆتیک زۆربەی زکام چارەسەر دەکات.",
      },
      ok: false,
      exp: {
        en: "Colds are usually viral—antibiotics don’t treat them.",
        ku: "زکام ڤایرۆسییە—ئانتیبیۆتیک یارمەتیدەر نین.",
      },
    },
    {
      st: {
        en: "Stopping antibiotics early because you feel better is always safe.",
        ku: "کەمکردنەوەی زوو ئانتیبیۆتیک هەمیشە سەلامەتە.",
      },
      ok: false,
      exp: {
        en: "Unless your clinician advises stopping, incomplete courses can fuel resistance.",
        ku: "تەنها بە ڕاوێژی پزیشک ڕابگرە؛ ناتەواوکردن بەرگری دروست دەکات.",
      },
    },
    {
      st: {
        en: "Sharing antibiotics with family can help them recover faster.",
        ku: "هاوبەشکردنی ئانتیبیۆتیک یارمەتیدەرە.",
      },
      ok: false,
      exp: {
        en: "Wrong drug/dose and delays in proper care—never share prescriptions.",
        ku: "دەرمانی هەڵە و دواکەوتنی چاودێری—هاوبەش مەکە.",
      },
    },
  ];

  window.AFS_RESIST_GAME = [
    {
      q: {
        en: "You have leftover antibiotics from a past prescription. A friend has flu symptoms. What is safest?",
        ku: "ئانتیبیۆتیکی ماوەت هەیە. هاوڕێکەت نیشانەی زکامی هەیە. چی سەلامەتترە؟",
      },
      opts: [
        { en: "Share the leftover antibiotics", ku: "هاوبەشکردنی ئانتیبیۆتیکی ماوە" },
        { en: "Encourage rest, fluids, and clinician advice if worsening", ku: "پشوو، ئاو، و ڕاوێژی پزیشک ئەگەر خراپتر بوو" },
      ],
      correct: 1,
      exp: {
        en: "Leftover antibiotics are the wrong drug, dose, and duration—and fuel resistance.",
        ku: "ئانتیبیۆتیکی ماوە دەرمان، دۆز، و ماوەی هەڵەیە—بەرگری دروست دەکات.",
      },
    },
    {
      q: {
        en: "You feel better on day 3 of a prescribed antibiotic course. What should you do?",
        ku: "لە ڕۆژی ٣ی دەرمانی پزیشک باشتر دەبیت. چی بکەیت؟",
      },
      opts: [
        { en: "Stop early because you feel fine", ku: "زوو ڕابگرە چونکە باشیت" },
        { en: "Continue as prescribed unless your clinician says otherwise", ku: "بەردەوام بە وەک پزیشک فەرموویە مەگەر پزیشک فەرمانی تر بدات" },
      ],
      correct: 1,
      exp: {
        en: "Stopping early can leave bacteria alive and drive resistance—only clinicians adjust courses.",
        ku: "وەستاندنی زوو بەکتریا دەهێڵێتەوە و بەرگری دروست دەکات.",
      },
    },
    {
      q: {
        en: "Your child has a runny nose and mild cough for 2 days. Best public-health choice?",
        ku: "منداڵەکەت ٢ ڕۆژە بینی ڕژاو و کۆکی سوکی هەیە. باشترین هەڵبژاردن؟",
      },
      opts: [
        { en: "Start antibiotics 'just in case'", ku: "ئانتیبیۆتیک دەستپێبکە 'بۆ دڵنیایی'" },
        { en: "Supportive care and seek care if red flags appear", ku: "چاودێری پشتیوان و پزیشک ئەگەر ئاڵەرتی سوڕیا دەرکەوت" },
      ],
      correct: 1,
      exp: {
        en: "Most colds are viral. Antibiotic overuse harms everyone by spreading resistance.",
        ku: "زۆربەی زکامەکان ڤایرۆسین. بەکارهێنانی زۆری ئانتیبیۆتیک زیان بە هەمووان دەگەیەنێت.",
      },
    },
    {
      q: {
        en: "A pharmacy offers antibiotics without a prescription. What is wisest?",
        ku: "دەرمانخانە ئانتیبیۆتیک بەبێ دەرمان دەدات. چی زیرەکترە؟",
      },
      opts: [
        { en: "Buy them to avoid a clinic visit", ku: "بیکڕە بۆ ئەوەی نەچیتە پزیشک" },
        { en: "Decline—antibiotics need proper clinical assessment", ku: "ڕەت بکەرەوە—پێویستی بە پشکنینی پزیشکی هەیە" },
      ],
      correct: 1,
      exp: {
        en: "Without assessment you may treat the wrong infection and worsen resistance.",
        ku: "بەبێ پشکنین ڕەنگە تووشبوونی هەڵە چارەسەر بکەیت و بەرگری بەهێز بکەیت.",
      },
    },
  ];

  window.AFS_PLAN_OPTIONS = [
    { id: "rest", safe: true, labels: { en: "Rest", ku: "پشوو" } },
    { id: "fluids", safe: true, labels: { en: "Fluids / hydration", ku: "ئاو / ئاوخۆڕین" } },
    { id: "sleep", safe: true, labels: { en: "Sleep", ku: "خەو" } },
    { id: "otc", safe: true, labels: { en: "Simple symptom relief only as advised by clinician/pharmacist", ku: "کەمکردنەوەی نیشان بە ڕاوێژی پزیشک/دەرمانساز" } },
    { id: "doc", safe: true, labels: { en: "Seek clinician if worsening or unsure", ku: "پزیشک ئەگەر خراپتر بوو یان نادڵنیت" } },
    { id: "abx_self", safe: false, labels: { en: "Start leftover antibiotics at home", ku: "ئانتیبیۆتیکی ماوە دەستپێبکە" } },
    { id: "share_abx", safe: false, labels: { en: "Borrow antibiotics from someone else", ku: "ئانتیبیۆتیک لە کەسی تر بگرە" } },
  ];

  window.AFS_ABX_LABELS = {
    en: { yes: "Antibiotics usually needed? Often no for typical viral illness.", maybe: "Maybe — clinician assessment", no: "Usually not — viruses common" },
    ku: {
      yes: "پێویست بە ئانتیبیۆتیک؟ زۆرجار نە بۆ ڤایرۆس.",
      maybe: "ڕەنگە — پشکنینی پزیشک",
      no: "زۆرجار نە — ڤایرۆس باوە",
    },
  };
})();
