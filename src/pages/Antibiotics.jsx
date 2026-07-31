import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

const content = {
  en: {
    title: "Antibiotics and Flu Season",
    subtitle:
      "Learn what helps during flu season, what does not, and how to care for yourself safely.",
    backDashboard: "Back to dashboard",
    symptomTracker: "Flu Symptom Tracker",
    symptomHelper: "Select symptoms — guidance updates instantly as you go.",
    symptoms: {
      fever: "Fever",
      cough: "Cough",
      soreThroat: "Sore throat",
      bodyAches: "Body aches",
      fatigue: "Fatigue",
      runnyNose: "Runny nose",
      chestDiscomfort: "Chest discomfort",
      difficultyBreathing: "Difficulty breathing",
    },
    liveResultsTitle: "Live guidance",
    selectPrompt: "Select any symptoms above to see your risk level and next steps.",
    riskLow: "Low risk",
    riskModerate: "Moderate risk",
    riskHigher: "Higher concern",
    patternFluLike: "Flu-like pattern",
    explainViral:
      "Your symptoms match a common viral pattern. Antibiotics are not typically needed.",
    explainFluLike:
      "Fever with sore throat and body aches often fits a flu-like illness. Rest and fluids usually come first; antibiotics target bacteria, not viruses.",
    explainLow:
      "Your selections suggest mild or limited symptoms. Keep observing how you feel.",
    explainHigherMany:
      "Several strong symptoms together deserve attention. Consider contacting a clinician, especially if you feel worse over the next day or two.",
    explainRedFlag:
      "Chest discomfort or difficulty breathing can be serious. Seek medical advice promptly—especially if symptoms are severe or worsening.",
    actionsTitle: "Suggested next steps",
    actionRest: "Rest and hydrate",
    actionMonitor: "Monitor symptoms for 48 hours",
    actionDoctor: "Consider seeing a doctor if symptoms worsen",
    gameTitle: "Mini Game: Antibiotic or Not?",
    gameHelper: "Choose the right option for each scenario and test your knowledge.",
    antibiotic: "Antibiotics",
    noAntibiotic: "No antibiotics",
    correct: "Correct",
    incorrect: "Incorrect",
    score: "Score",
    antibioticsGuide: "Antibiotics Guide",
    nonMedicalCare: "Non-Medical Care",
    warning:
      "Antibiotics do NOT treat viral infections like flu or cold.",
    noorQuote:
      "Not every illness needs medicine. Sometimes your body only needs patience, care, and understanding.",
    quoteBy: "NSM",
    whenToUse: "When to use",
    whenNotToUse: "When NOT to use",
    treats: "What it treats",
    comingSoon: "Always follow a qualified healthcare professional.",
  },
  ku: {
    title: "ئانتیبیۆتیک و وەرزی زکام",
    subtitle:
      "نیشانەکانت باشتر بناسە، ئانتیبیۆتیک بە ژیری بەکاربهێنە، و ئاگاداری تەندروستیت بە ڕوونی بکە.",
    backDashboard: "گەڕانەوە بۆ داشبۆرد",
    symptomTracker: "شوێنکەوتنی زکام",
    symptomHelper: "نیشانەکان هەڵبژێرە — ڕاوێژ بە ڕاستی دەگۆڕێت.",
    symptoms: {
      fever: "تا",
      cough: "کۆخە",
      soreThroat: "ئازاری گەروو",
      bodyAches: "ئازاری جەستە",
      fatigue: "ماندووبوون",
      runnyNose: "ئاوی لووت",
      chestDiscomfort: "ئازاری سینگ",
      difficultyBreathing: "قەتی هەناسەدان",
    },
    liveResultsTitle: "ڕاوێژی ڕاستەوخۆ",
    selectPrompt: "نیشانەکان هەڵبژێرە بۆ بینینی ئاستی مەترسی و هەنگاوەکانی دواتر.",
    riskLow: "مەترسی کەم",
    riskModerate: "مەترسی مامناوەند",
    riskHigher: "پێویستی بە وریایی زیاتر",
    patternFluLike: "نیشانەکانی وەک زکام",
    explainViral:
      "نیشانەکانت لەگەڵ تووشبوونی ڤایرۆسی باو دەچن. زۆرجار ئانتیبیۆتیک پێویست نییە.",
    explainFluLike:
      "تا لەگەڵ ئازاری گەروو و ئازاری جەستە زۆرجار لەگەڵ نەخۆشی وەک زکام دەچن. پشوو و ئاو یەکەم هەنگاوە؛ ئانتیبیۆتیک بۆ بەکتریا، نەک ڤایرۆس.",
    explainLow:
      "ئەم هەڵبژاردنانە نیشانی کەمێک یان سنووردار دەدەن. بەردەوام چاودێری حاڵەتەکەت بکە.",
    explainHigherMany:
      "چەند نیشانەیەکی بەهێز پێکەوە پێویستی بە تەرکیز دەخەن. ڕاوێژ لەگەڵ پزیشک ببینە ئەگەر خراپتر بوویت.",
    explainRedFlag:
      "ئازاری سینگ یان قەتی هەناسەدان دەبێت بە جدی وەرگیرێت. بە زوو لەگەڵ پزیشک ڕاوێژ بکە ئەگەر نیشانەکان توند بوون یان زیاد بوون.",
    actionsTitle: "هەنگاوەکانی پێشنیارکراو",
    actionRest: "پشوو و ئاوخواردنەوە",
    actionMonitor: "نیشانەکان بۆ ٤٨ کاتژمێر چاودێری بکە",
    actionDoctor: "ئەگەر نیشانەکان خراپتر بوون پزیشک ببینە",
    gameTitle: "یاریی بچووک: ئانتیبیۆتیک یان نا؟",
    gameHelper: "بۆ هەر دۆخێک هەڵبژاردەی دروست هەڵبژێرە و زانیاریت تاقیبکەرەوە.",
    antibiotic: "ئانتیبیۆتیک",
    noAntibiotic: "پێویست نییە",
    correct: "دروستە",
    incorrect: "هەڵەیە",
    score: "نمرە",
    antibioticsGuide: "ڕێنمایی ئانتیبیۆتیک",
    nonMedicalCare: "چاودێریی یارمەتیدەر",
    warning:
      "ئانتیبیۆتیک چارەسەری تووشبوونی ڤایرۆسی وەک زکام یان ساردبوونەوە ناکات.",
    noorQuote:
      "هەموو نەخۆشییەک پێویستی بە دەرمان نییە. هەندێک جار جەستەت تەنها پێویستی بە پشوو و چاودێریی باش هەیە.",
    quoteBy: "NSM",
    whenToUse: "کەی بەکاردێت",
    whenNotToUse: "کەی نابێت بەکاربهێنرێت",
    treats: "چی چارەسەر دەکات",
    comingSoon: "هەمیشە شوێنی ڕاوێژی پزیشکی پسپۆر بکەوە.",
  },
};

const symptomKeys = [
  "fever",
  "cough",
  "soreThroat",
  "bodyAches",
  "fatigue",
  "runnyNose",
  "chestDiscomfort",
  "difficultyBreathing",
];

function computeSymptomInsight(symptoms, text) {
  const selectedCount = symptomKeys.filter((k) => symptoms[k]).length;

  if (selectedCount === 0) {
    return {
      empty: true,
      riskLevel: null,
      riskLabel: "",
      riskBadgeClass: "",
      patternLabel: null,
      explanation: "",
      actions: [],
      animationSeed: "empty",
    };
  }

  const {
    fever,
    cough,
    soreThroat,
    fatigue,
    runnyNose,
    bodyAches,
    chestDiscomfort,
    difficultyBreathing,
  } = symptoms;

  const redFlag = chestDiscomfort || difficultyBreathing;
  const systemicCount = [fever, cough, soreThroat, bodyAches].filter(Boolean).length;
  const fluLike = fever && soreThroat && bodyAches;

  const onlyMild =
    !fever &&
    !cough &&
    !soreThroat &&
    !bodyAches &&
    !chestDiscomfort &&
    !difficultyBreathing &&
    (runnyNose || fatigue);

  let riskLevel = "moderate";
  if (redFlag) riskLevel = "high";
  else if (fluLike) riskLevel = "moderate";
  else if (systemicCount >= 3) riskLevel = "high";
  else if (onlyMild && systemicCount === 0) riskLevel = "low";
  else riskLevel = "moderate";

  const riskBadgeClass =
    riskLevel === "low"
      ? "border-emerald-300/90 bg-emerald-50 text-emerald-900 shadow-sm"
      : riskLevel === "high"
        ? "border-rose-300/90 bg-rose-50 text-rose-900 shadow-sm"
        : "border-amber-300/90 bg-amber-50 text-amber-950 shadow-sm";

  const riskLabel =
    riskLevel === "low"
      ? text.riskLow
      : riskLevel === "high"
        ? text.riskHigher
        : text.riskModerate;

  let explanation = text.explainViral;
  let patternLabel = null;

  if (redFlag) {
    explanation = text.explainRedFlag;
  } else if (fluLike) {
    patternLabel = text.patternFluLike;
    explanation = text.explainFluLike;
  } else if (riskLevel === "low") {
    explanation = text.explainLow;
  } else if (riskLevel === "high") {
    explanation = text.explainHigherMany;
  } else {
    explanation = text.explainViral;
  }

  const actions = [text.actionRest, text.actionMonitor, text.actionDoctor];

  return {
    empty: false,
    riskLevel,
    riskLabel,
    riskBadgeClass,
    patternLabel,
    explanation,
    actions,
    animationSeed: `${riskLevel}-${Boolean(fluLike)}-${selectedCount}-${redFlag}`,
  };
}

const gameScenarios = [
  {
    key: "coldRunnyNose",
    textEn: "You have a cold and runny nose.",
    textKu: "ساردبوونەوە و ئاوی لووتت هەیە.",
    correct: "no",
  },
  {
    key: "bacterialInfection",
    textEn: "A doctor confirms a bacterial infection.",
    textKu: "پزیشک دڵنیایی دەدات تووشبوونی بەکتریایی هەیە.",
    correct: "yes",
  },
  {
    key: "flu",
    textEn: "You have flu symptoms.",
    textKu: "نیشانەکانی زکامت هەیە.",
    correct: "no",
  },
  {
    key: "throatInfection",
    textEn: "A doctor confirms bacterial throat infection.",
    textKu: "پزیشک دڵنیایی دەدات تووشبوونی بەکتریایی گەرووت هەیە.",
    correct: "yes",
  },
  {
    key: "feverOnly",
    textEn: "You only have fever for one day.",
    textKu: "تەنها بۆ یەک ڕۆژ تا هەیە.",
    correct: "no",
  },
];

const antibioticsCards = [
  {
    name: "Penicillin",
    treatsEn: "Some bacterial throat, skin, and dental infections.",
    treatsKu: "هەندێک تووشبوونی بەکتریایی گەروو، پێست و ددان.",
    useEn: "Only when prescribed for confirmed bacterial infection.",
    useKu: "تەنها کاتێک پزیشک بۆ تووشبوونی بەکتریایی دڵنیابوو نوسیوێتی.",
    avoidEn: "Not for flu, common cold, or most viral sore throats.",
    avoidKu: "بۆ زکام، ساردبوونەوە یان زۆربەی ئازاری وایرۆسی گەروو نابێت.",
  },
  {
    name: "Amoxicillin",
    treatsEn: "Ear, sinus, chest, and some urinary bacterial infections.",
    treatsKu: "هەندێک تووشبوونی بەکتریایی گوێ، سینوس، سنگ و میزەڕێ.",
    useEn: "Take full prescribed course at correct times.",
    useKu: "دەبێت بە تەواوی و لە کاتی دیاریکراودا بخۆیت.",
    avoidEn: "Do not self-start for flu or viral cough.",
    avoidKu: "بەخۆت بۆ زکام یان کۆخەی وایرۆسی دەست پێ مەکە.",
  },
  {
    name: "Azithromycin",
    treatsEn: "Selected respiratory and atypical bacterial infections.",
    treatsKu: "هەندێک تووشبوونی تایبەتی بەکتریایی هەناسەیی.",
    useEn: "Used when clinically suitable by professional advice.",
    useKu: "کاتێک گونجاو بێت بە ڕاوێژی پسپۆر بەکاردهێنرێت.",
    avoidEn: "Not routine for common colds or simple flu.",
    avoidKu: "بۆ ساردبوونەوەی ئاسایی یان زکامی سادە بەکارنایەت.",
  },
  {
    name: "Cephalosporins",
    treatsEn: "Various moderate to serious bacterial infections.",
    treatsKu: "جۆرە جیاوازەکانی تووشبوونی مامناوەند تا توندی بەکتریایی.",
    useEn: "Used under medical supervision based on diagnosis.",
    useKu: "بەپێی دەرئەنجامی پشکنین لە ژێر چاودێری پزیشکی بەکاردێت.",
    avoidEn: "Never use leftover doses or someone else's medicine.",
    avoidKu: "هەرگیز دۆزی ماوە یان دەرمانی کەسێکی تر بەکارمەهێنە.",
  },
];

const nonMedicalCards = [
  {
    icon: "💧",
    titleEn: "Hydration",
    titleKu: "ئاوبوونەوە",
    descriptionEn: "Drink water often to support recovery and reduce fatigue.",
    descriptionKu: "بەردەوام ئاو بخۆ بۆ یارمەتیدانی چاکبوون و کەمکردنەوەی ماندووبوون.",
  },
  {
    icon: "🛌",
    titleEn: "Rest",
    titleKu: "پشوودان",
    descriptionEn: "Prioritize sleep so your immune system can work better.",
    descriptionKu: "خەوتن گرنگ بدە بۆ ئەوەی سیستەمی بەرگری جەستەت باشتر کاربکات.",
  },
  {
    icon: "🍵",
    titleEn: "Warm fluids",
    titleKu: "شەربەتی گەرم",
    descriptionEn: "Warm soups and teas can soothe throat and comfort body.",
    descriptionKu: "شۆربا و چا گەرم دەکرێت گەروو ئارام بکات و جەستە دڵخۆش بکات.",
  },
  {
    icon: "🌫️",
    titleEn: "Steam inhalation",
    titleKu: "هەناسەدان بە هەڵم",
    descriptionEn: "Gentle steam may ease congestion and breathing discomfort.",
    descriptionKu: "هەڵمی نەرم دەکرێت گیربوونی لووت کەم بکاتەوە و هەناسەدان ئاسان بکات.",
  },
];

export default function Antibiotics() {
  const { language } = useLanguage();
  const text = content[language];

  const [symptoms, setSymptoms] = useState(() =>
    Object.fromEntries(symptomKeys.map((k) => [k, false]))
  );
  const [answers, setAnswers] = useState({});

  const insight = useMemo(() => computeSymptomInsight(symptoms, text), [symptoms, text]);

  const score = useMemo(
    () =>
      gameScenarios.reduce((total, item) => {
        if (answers[item.key] === item.correct) return total + 1;
        return total;
      }, 0),
    [answers]
  );

  const allAnswered = Object.keys(answers).length === gameScenarios.length;

  function toggleSymptom(key) {
    setSymptoms((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function chooseAnswer(questionKey, value) {
    setAnswers((prev) => ({ ...prev, [questionKey]: value }));
  }

  return (
    <main
      className={`min-h-screen bg-transparent py-10 sm:py-12 ${language === "ku" ? "font-ku" : ""}`}
      dir={language === "ku" ? "rtl" : "ltr"}
      lang={language === "ku" ? "ku" : "en"}
    >
      <div className="app-container">
        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="inline-flex rounded-full bg-pastel-green/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                Kurdana Health
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-800 sm:text-4xl">
                {text.title}
              </h1>
              <p className="mt-3 max-w-none text-slate-600">{text.subtitle}</p>
            </div>
            <Link
              to="/dashboard"
              className="rounded-2xl bg-pastel-blue px-4 py-2 text-sm font-semibold text-slate-800 transition duration-200 hover:brightness-95"
            >
              {text.backDashboard}
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-card">
            <h2 className="text-xl font-bold text-slate-800">{text.symptomTracker}</h2>
            <p className="mt-2 text-sm text-slate-600">{text.symptomHelper}</p>
            <div className="mt-4 space-y-3">
              {symptomKeys.map((key) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 transition hover:bg-pastel-green/30"
                >
                  <input
                    type="checkbox"
                    checked={symptoms[key]}
                    onChange={() => toggleSymptom(key)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-300"
                  />
                  <span className="font-medium text-slate-700">{text.symptoms[key]}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-100/90 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {text.liveResultsTitle}
              </p>

              {insight.empty ? (
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{text.selectPrompt}</p>
              ) : (
                <div key={insight.animationSeed} className="symptom-live-panel mt-4 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded-full border px-4 py-1.5 text-sm font-bold transition-colors duration-300 ${insight.riskBadgeClass}`}
                    >
                      {insight.riskLabel}
                    </span>
                    {insight.patternLabel ? (
                      <span className="inline-flex rounded-full border border-sky-200/90 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-900">
                        {insight.patternLabel}
                      </span>
                    ) : null}
                  </div>

                  <div className="rounded-2xl border border-slate-100/80 bg-gradient-to-br from-slate-50/90 to-pastel-blue/20 p-4 shadow-sm transition-colors duration-300">
                    <p className="text-sm font-semibold leading-relaxed text-slate-800">
                      {insight.explanation}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-100/80 bg-emerald-50/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900/90">
                      {text.actionsTitle}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-800">
                      {insight.actions.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                          <span className="leading-relaxed">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </article>

          <article className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-card">
            <h2 className="text-xl font-bold text-slate-800">{text.gameTitle}</h2>
            <p className="mt-2 text-sm text-slate-600">{text.gameHelper}</p>
            <div className="mt-4 space-y-4">
              {gameScenarios.map((item) => {
                const scenarioText = language === "ku" ? item.textKu : item.textEn;
                const selected = answers[item.key];
                const isCorrect = selected && selected === item.correct;
                return (
                  <div
                    key={item.key}
                    className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                  >
                    <p className="font-medium text-slate-700">{scenarioText}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => chooseAnswer(item.key, "yes")}
                        className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                          selected === "yes"
                            ? "bg-pastel-green text-slate-800"
                            : "bg-white text-slate-600 hover:bg-pastel-green/40"
                        }`}
                      >
                        {text.antibiotic}
                      </button>
                      <button
                        type="button"
                        onClick={() => chooseAnswer(item.key, "no")}
                        className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                          selected === "no"
                            ? "bg-pastel-blue text-slate-800"
                            : "bg-white text-slate-600 hover:bg-pastel-blue/40"
                        }`}
                      >
                        {text.noAntibiotic}
                      </button>
                    </div>
                    {selected ? (
                      <p
                        className={`mt-2 text-sm font-semibold ${
                          isCorrect ? "text-emerald-600" : "text-rose-500"
                        }`}
                      >
                        {isCorrect ? text.correct : text.incorrect}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
            {allAnswered ? (
              <div className="mt-4 rounded-2xl bg-pastel-pink/40 p-4 text-center">
                <p className="text-sm font-semibold text-slate-700">
                  {text.score}: {score} / {gameScenarios.length}
                </p>
              </div>
            ) : null}
          </article>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-800">{text.antibioticsGuide}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {antibioticsCards.map((card) => (
              <article
                key={card.name}
                className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-card"
              >
                <h3 className="text-lg font-bold text-slate-800">{card.name}</h3>
                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-semibold">{text.treats}: </span>
                  {language === "ku" ? card.treatsKu : card.treatsEn}
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  <span className="font-semibold">{text.whenToUse}: </span>
                  {language === "ku" ? card.useKu : card.useEn}
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  <span className="font-semibold">{text.whenNotToUse}: </span>
                  {language === "ku" ? card.avoidKu : card.avoidEn}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-800">{text.nonMedicalCare}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nonMedicalCards.map((card) => (
              <article
                key={card.titleEn}
                className="rounded-3xl border border-white/70 bg-gradient-to-br from-white to-pastel-green/25 p-5 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="text-2xl">{card.icon}</div>
                <h3 className="mt-3 text-lg font-semibold text-slate-800">
                  {language === "ku" ? card.titleKu : card.titleEn}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {language === "ku" ? card.descriptionKu : card.descriptionEn}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-rose-100 bg-rose-50/90 p-6 shadow-card">
          <p className="text-center text-xl font-bold text-rose-600">{text.warning}</p>
        </section>

        <section className="mt-6 rounded-3xl border border-white/70 bg-white/90 p-6 text-center shadow-card">
          <p className="text-lg italic leading-relaxed text-slate-700">"{text.noorQuote}"</p>
          <p className="mt-3 text-sm font-semibold tracking-widest text-slate-500">
            - {text.quoteBy}
          </p>
          <p className="mt-3 text-xs text-slate-500">{text.comingSoon}</p>
        </section>
      </div>
    </main>
  );
}
