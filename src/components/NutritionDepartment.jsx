import { useEffect, useMemo, useState } from "react";
import "./NutritionDepartment.css";
import { useLanguage } from "../context/LanguageContext.jsx";

const TAB_KEYS = ["explore", "learn", "play", "track", "discover"];

const I18N = {
  en: {
    switchLang: "Sorani",
    title: "Nutrition & Diets",
    subtitle: "Clean and premium wellness flow.",
    tabs: { explore: "Explore", learn: "Learn", play: "Play", track: "Track", discover: "Discover" },
    back: "Back",
    next: "Next",
    restart: "Restart",
    reset: "Reset",
    calculate: "Calculate",
    loadMore: "Load More",
    quizTitle: "Advanced Quiz",
    resultTitle: "Your Result",
    learnTitle: "Supplements",
    playTitle: "Games + Plate",
    trackTitle: "Tracking Tools",
    discoverTitle: "Recipes",
    search: "Search meals...",
    moods: ["Calm", "Stressed", "Tired", "Focused"],
    meals: ["Breakfast done", "Lunch done", "Dinner done"],
    q: [
      ["Main goal?", ["Fat loss", "Muscle gain", "Maintenance", "Better energy"]],
      ["Activity level?", ["Low", "Light", "Moderate", "High"]],
      ["Diet preference?", ["Balanced", "High protein", "Low carb", "Vegetarian", "Mediterranean"]],
      ["Water intake?", ["<1L", "1-2L", "2-3L", "3L+"]]
    ],
    supplementFallback: "Supplement education content.",
    kcalLabel: "kcal",
    macroP: "P",
    macroC: "C",
    macroF: "F",
  },
  ku: {
    switchLang: "English",
    title: "خۆراک و ڕێژیمی خۆراک",
    subtitle: "ڕێگایەکی پاک و جوانی تەندروستی.",
    tabs: { explore: "گەشت", learn: "فێربوون", play: "یاری", track: "شوێنکەوتن", discover: "دۆزینەوە" },
    back: "گەڕانەوە",
    next: "دواتر",
    restart: "دووبارە",
    reset: "پاککردنەوە",
    calculate: "حیسابکردن",
    loadMore: "زیاتر",
    quizTitle: "تاقیکردنەوەی پێشکەوتوو",
    resultTitle: "ئەنجام",
    learnTitle: "پێوەکراوەکان",
    playTitle: "یاری + پلاتە",
    trackTitle: "ئامرازەکانی شوێنکەوتن",
    discoverTitle: "ڕەسەپی",
    search: "گەڕان بە ڕەسەپی...",
    moods: ["ئاسودە", "ستریس", "ماندوو", "سەرنجدار"],
    meals: ["بەیانی تەواو", "نیوەڕۆ تەواو", "شەو تەواو"],
    q: [
      ["ئامانجی سەرەکی؟", ["کەمکردنەوە", "زیادکردن", "پاراستن", "وزەی باشتر"]],
      ["ئاستی چالاکی؟", ["کەم", "هەڵکەوتوو", "ناوەند", "بەرز"]],
      ["حەزی ڕێژیم؟", ["هاوسەنگ", "پرۆتینی بەرز", "کەم کارب", "ڕووەکی", "میدیترانی"]],
      ["ئاو لە ڕۆژێکدا؟", ["<1L", "1-2L", "2-3L", "3L+"]]
    ],
    supplementFallback: "ناوەڕۆکی فێرکاری پێوەکراو.",
    kcalLabel: "کەلۆری",
    macroP: "پ",
    macroC: "ک",
    macroF: "چ",
  },
};

const SUPPS = [
  "Protein Powder", "Creatine Monohydrate", "Omega-3", "Vitamin D", "Magnesium", "Multivitamins", "Probiotics", "Electrolytes",
  "Ashwagandha", "Zinc", "Iron", "Calcium", "Vitamin B12", "Vitamin C", "Collagen", "Glutamine", "Beta-Alanine", "Caffeine",
  "Green Tea Extract", "Turmeric (Curcumin)", "Melatonin", "Fiber Supplements", "Electrolyte Powders", "Pre-workout Blends",
  "Adaptogens", "Spirulina", "Chlorella"
];

const SUPP_BRIEF = {
  "Protein Powder": "Helps close daily protein gaps.",
  "Creatine Monohydrate": "Supports high-intensity performance.",
  "Omega-3": "Supports cardiometabolic health.",
  "Vitamin D": "Important for bone and immune pathways.",
  Magnesium: "Supports neuromuscular function.",
  Multivitamins: "Micronutrient backup for dietary gaps.",
  Probiotics: "Strain-specific gut support.",
  Electrolytes: "Fluid and performance support.",
  Ashwagandha: "Stress-response support.",
  Zinc: "Immune and repair support.",
  Iron: "Oxygen transport support.",
  Calcium: "Bone and muscle support.",
  "Vitamin B12": "Nerve and blood support.",
  "Vitamin C": "Antioxidant and collagen support.",
  Collagen: "Connective tissue support.",
  Glutamine: "Conditionally helpful amino acid.",
  "Beta-Alanine": "Supports interval performance.",
  Caffeine: "Focus and performance stimulant.",
  "Green Tea Extract": "Mild metabolic support.",
  "Turmeric (Curcumin)": "Anti-inflammatory support.",
  Melatonin: "Sleep timing support.",
  "Fiber Supplements": "Satiety and digestion support.",
  "Electrolyte Powders": "Portable hydration support.",
  "Pre-workout Blends": "Multi-ingredient workout support.",
  Adaptogens: "General stress adaptation category.",
  Spirulina: "Nutrient-dense algae option.",
  Chlorella: "Micronutrient algae option."
};

const SUPP_BRIEF_KU = {
  "Protein Powder": "کەمکردنەوەی کەمبوونی پرۆتینی ڕۆژانە.",
  "Creatine Monohydrate": "پشتگیری ئەدای وەرزشی بەرز.",
  "Omega-3": "پشتگیری تەندروستی دڵ و مێتابۆلیزم.",
  "Vitamin D": "گرنگە بۆ ئێسک و بەرگری.",
  Magnesium: "پشتگیری کارکردنی دەماغ و ماسولکە.",
  Multivitamins: "پشتگیری ڤیتامین و کانیزایەم بۆ کەمبوونەکان.",
  Probiotics: "پشتگیری ڕێڕەوی هەرس بەپێی جۆر.",
  Electrolytes: "ئاو و ئەدای وەرزشی.",
  Ashwagandha: "پشتگیری بەرگری لەبەردەم ستریس.",
  Zinc: "پشتگیری بەرگری و چاکبوونەوە.",
  Iron: "پشتگیری گواستنەوەی ئۆکسجین.",
  Calcium: "پشتگیری ئێسک و ماسولکە.",
  "Vitamin B12": "پشتگیری دەماغ و خوێن.",
  "Vitamin C": "دژە ئۆکسیدان و کۆلاژن.",
  Collagen: "پشتگیری ئێسک و دەماغ و پێست.",
  Glutamine: "ئەمینۆئاسید کە لە هەندێک باردا سودبەخشە.",
  "Beta-Alanine": "پشتگیری ئەدای ماوەی کورت.",
  Caffeine: "ئاگاداری و ئەدای وەرزشی.",
  "Green Tea Extract": "پشتگیری مێتابۆلیزمی سووک.",
  "Turmeric (Curcumin)": "پشتگیری دژە هەوکردن.",
  Melatonin: "ڕێکخستنی خەو.",
  "Fiber Supplements": "تێربوونی و هەرس.",
  "Electrolyte Powders": "ئاوگرتن لەگەڵ گواستنەوە.",
  "Pre-workout Blends": "چەند پێکهاتە بۆ وەرزش.",
  Adaptogens: "پۆلی گشتی پشتگیری ستریس.",
  Spirulina: "ئەلژی بە تەنەوەر زۆر.",
  Chlorella: "ئەلژی بە میکرۆ تەنەوەرەکان."
};

const RECIPE_CATS = ["breakfast", "lunch", "dinner", "snacks", "smoothies", "desserts", "highProtein", "lowCalorie", "vegetarian", "quick"];

const RECIPE_CAT_LABELS = {
  en: {
    all: "All",
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snacks: "Snacks",
    smoothies: "Smoothies",
    desserts: "Desserts",
    highProtein: "High protein",
    lowCalorie: "Low calorie",
    vegetarian: "Vegetarian",
    quick: "Quick",
  },
  ku: {
    all: "هەموو",
    breakfast: "بەیانی",
    lunch: "نیوەڕۆ",
    dinner: "شەو",
    snacks: "خواردنی بچووک",
    smoothies: "سمووسی",
    desserts: "شیرینی",
    highProtein: "پرۆتینی بەرز",
    lowCalorie: "کەم کەلۆری",
    vegetarian: "ڕووەکی",
    quick: "خێرا",
  },
};

function getSuppBrief(name, lang) {
  if (lang === "ku") return SUPP_BRIEF_KU[name] || SUPP_BRIEF[name] || "";
  return SUPP_BRIEF[name] || "";
}

function safeArray(raw, fallback) {
  try {
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function createMeals(lang) {
  const isKu = lang === "ku";
  const proteinsEn = ["chicken", "fish", "eggs", "tofu", "beans", "lentils"];
  const proteinsKu = ["مریشک", "ماسی", "هێلکە", "تۆفو", "لوبیا", "نۆک"];
  const carbsEn = ["rice", "oats", "potato", "quinoa", "bread"];
  const carbsKu = ["برنج", "سوێر", "کەلەرەم", "کینوا", "نان"];
  const vegsEn = ["broccoli", "spinach", "tomato", "cucumber", "pepper"];
  const vegsKu = ["برۆکلی", "سپیناخ", "تەماتە", "خیار", "فلفل"];
  const proteins = isKu ? proteinsKu : proteinsEn;
  const carbs = isKu ? carbsKu : carbsEn;
  const vegs = isKu ? vegsKu : vegsEn;
  const oil = isKu ? "ڕۆنی زەیتوون" : "olive oil";
  const stepsEn = ["Prep ingredients", "Cook protein and base", "Combine and season", "Serve"];
  const stepsKu = ["پێکهاتەکان ئامادە بکە", "پرۆتین و بنەڕەت بپزێ", "تێکەڵ بکە و بەھار بکە", "خەمڵێنە"];
  return Array.from({ length: 200 }, (_, i) => {
    const cat = RECIPE_CATS[i % RECIPE_CATS.length];
    const catName = isKu ? RECIPE_CAT_LABELS.ku[cat] : cat;
    const name = isKu
      ? `${catName} · ${proteins[i % proteins.length]} · بۆڵ ${i + 1}`
      : `${cat} ${proteinsEn[i % proteinsEn.length]} bowl ${i + 1}`;
    return {
      id: `meal-${i + 1}`,
      category: cat,
      name,
      calories: 250 + (i % 12) * 30,
      protein: 18 + (i % 8) * 3,
      carbs: 20 + (i % 8) * 4,
      fats: 8 + (i % 7) * 2,
      ingredients: [proteins[i % proteins.length], carbs[i % carbs.length], vegs[i % vegs.length], oil],
      steps: isKu ? stepsKu : stepsEn,
    };
  });
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function NutritionDepartment() {
  const { language: lang, setLanguage } = useLanguage();
  const t = I18N[lang];
  const [tab, setTab] = useState("explore");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [supp, setSupp] = useState(0);
  const [water, setWater] = useState(0);
  const [activity, setActivity] = useState(0);
  const [mealsDone, setMealsDone] = useState([false, false, false]);
  const [mood, setMood] = useState("");
  const [age, setAge] = useState(26);
  const [height, setHeight] = useState(165);
  const [weight, setWeight] = useState(62);
  const [gender, setGender] = useState("f");
  const [calorieOut, setCalorieOut] = useState("");
  const meals = useMemo(() => createMeals(lang), [lang]);
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [favs, setFavs] = useState(() => safeArray(localStorage.getItem("nsm_favs"), []));
  const [plate, setPlate] = useState([]);
  const [foodRound, setFoodRound] = useState(0);
  const [foodScore, setFoodScore] = useState(0);
  const [sugarIdx, setSugarIdx] = useState(0);
  const [sugarScore, setSugarScore] = useState(0);
  const [memoryCards, setMemoryCards] = useState([]);
  const [memoryMoves, setMemoryMoves] = useState(0);

  useEffect(() => {
    localStorage.setItem("nsm_favs", JSON.stringify(favs));
  }, [favs]);

  useEffect(() => {
    resetMemory();
  }, [lang]);

  const quizDone = step >= t.q.length;
  const quizProgress = Math.round((Math.min(step, t.q.length) / t.q.length) * 100);
  const score = Math.round((((water / 8) > 1 ? 1 : water / 8) + (activity > 0 ? 1 : 0) + (mealsDone.filter(Boolean).length / 3) + (mood ? 1 : 0)) / 4 * 100);
  const filtered = meals.filter((m) => (cat === "all" || m.category === cat) && m.name.toLowerCase().includes(query.toLowerCase()));
  const recipePage = filtered.slice(0, page * 12);

  const quizAdvice = useMemo(() => {
    if (!quizDone) return null;
    const pref = answers[2] ?? 0;
    return {
      style: t.q[2][1][pref],
      lines: lang === "en"
        ? ["Anchor meals with protein.", "Use high-fiber carbs.", "Hydrate early in the day."]
        : ["ژەمەکان بە پرۆتین بنیات بنێ.", "کاربی فایبەر-بەرز بەکاربهێنە.", "لە سەرەتای ڕۆژ ئاو بخۆ."]
    };
  }, [quizDone, answers, t.q, lang]);

  function calcCalories() {
    const bmr = gender === "m"
      ? (10 * weight + 6.25 * height - 5 * age + 5)
      : (10 * weight + 6.25 * height - 5 * age - 161);
    const maintain = Math.round(bmr * [1.2, 1.35, 1.5, 1.7][Math.min(activity, 3)]);
    setCalorieOut(
      lang === "en"
        ? `Maintenance ${maintain} | Fat-loss ${Math.round(maintain * 0.82)}-${Math.round(maintain * 0.9)} | Muscle-gain ${Math.round(maintain * 1.08)}-${Math.round(maintain * 1.15)}`
        : `پاراستن ${maintain} | کەمکردن ${Math.round(maintain * 0.82)}-${Math.round(maintain * 0.9)} | زیادکردن ${Math.round(maintain * 1.08)}-${Math.round(maintain * 1.15)}`
    );
  }

  function addPlate(type) {
    const map = lang === "en"
      ? { protein: ["chicken", "eggs"], carbs: ["rice", "bread"], fats: ["avocado", "nuts"], veg: ["broccoli", "tomato"] }
      : { protein: ["مریشک", "هێلکە"], carbs: ["برنج", "نان"], fats: ["ئەڤۆکادۆ", "دانە"], veg: ["برۆکلی", "تەماتە"] };
    const item = map[type][Math.floor(Math.random() * map[type].length)];
    setPlate((p) => [...p, { item, type, x: 16 + Math.random() * 66, y: 16 + Math.random() * 66 }]);
  }

  function resetMemory() {
    const pairs = lang === "en"
      ? [["🍊", "Vitamin C"], ["🥚", "Protein"], ["🥜", "Healthy fats"], ["🥦", "Fiber"]]
      : [["🍊", "ڤیتامینی C"], ["🥚", "پرۆتین"], ["🥜", "چەوری باش"], ["🥦", "فایبەر"]];
    const deck = shuffle(
      pairs.flatMap((x, i) => ([
        { id: `${i}-a`, pair: i, label: x[0], open: false, matched: false },
        { id: `${i}-b`, pair: i, label: x[1], open: false, matched: false }
      ]))
    );
    setMemoryCards(deck);
    setMemoryMoves(0);
  }

  function clickMemory(id) {
    const openCount = memoryCards.filter((c) => c.open && !c.matched).length;
    const clicked = memoryCards.find((c) => c.id === id);
    if (!clicked || clicked.open || clicked.matched || openCount >= 2) return;
    const opened = memoryCards.map((c) => (c.id === id ? { ...c, open: true } : c));
    setMemoryCards(opened);
    const nowOpen = opened.filter((c) => c.open && !c.matched);
    if (nowOpen.length === 2) {
      setMemoryMoves((m) => m + 1);
      if (nowOpen[0].pair === nowOpen[1].pair) {
        setTimeout(() => {
          setMemoryCards((prev) => prev.map((c) => (c.pair === nowOpen[0].pair ? { ...c, matched: true } : c)));
        }, 250);
      } else {
        setTimeout(() => {
          setMemoryCards((prev) => prev.map((c) => (c.matched ? c : { ...c, open: false })));
        }, 500);
      }
    }
  }

  const foodItems = lang === "en"
    ? [{ n: "Apple", healthy: true }, { n: "Broccoli", healthy: true }, { n: "Donut", healthy: false }, { n: "Soda", healthy: false }, { n: "Beans", healthy: true }, { n: "Chips", healthy: false }]
    : [{ n: "سێو", healthy: true }, { n: "برۆکلی", healthy: true }, { n: "دۆنات", healthy: false }, { n: "سۆدا", healthy: false }, { n: "لوبیا", healthy: true }, { n: "چیپس", healthy: false }];
  const foodNow = foodItems[foodRound % foodItems.length];

  const sugarQs = lang === "en"
    ? [
      { a: "Cola", b: "Orange", win: 0 },
      { a: "Chocolate Bar", b: "Yogurt", win: 0 },
      { a: "Donut", b: "Banana", win: 0 },
      { a: "Energy Drink", b: "Apple", win: 0 }
    ]
    : [
      { a: "کۆلا", b: "پڕتەقاڵ", win: 0 },
      { a: "چاکلێت", b: "ماست", win: 0 },
      { a: "دۆنات", b: "مۆز", win: 0 },
      { a: "خواردنەوەی وزە", b: "سێو", win: 0 }
    ];
  const sugarNow = sugarQs[sugarIdx % sugarQs.length];

  return (
    <section className={`nsm-shell ${lang === "ku" ? "rtl" : ""}`}>
      <header className="nsm-hero nsm-glass">
        <div className="nsm-actions">
          <p className="nsm-brand">NSM</p>
          <button type="button" onClick={() => setLanguage(lang === "en" ? "ku" : "en")}>{t.switchLang}</button>
        </div>
        <h1>{t.title}</h1>
        <p className="nsm-tag">{t.subtitle}</p>
        <div className="nsm-zone-tabs">
          {TAB_KEYS.map((k) => <button key={k} className={tab === k ? "active" : ""} onClick={() => setTab(k)}>{t.tabs[k]}</button>)}
        </div>
      </header>

      {tab === "explore" && (
        <div className="nsm-grid nsm-grid-2">
          <article className="nsm-panel nsm-glass">
            <h3>{t.quizTitle}</h3>
            <div className="nsm-progress"><span style={{ width: `${quizProgress}%` }} /></div>
            {!quizDone ? (
              <>
                <p>{t.q[step][0]}</p>
                <div className="chip-row">{t.q[step][1].map((o, i) => <button key={o} className={`chip ${answers[step] === i ? "active" : ""}`} onClick={() => setAnswers((p) => ({ ...p, [step]: i }))}>{o}</button>)}</div>
                <div className="nsm-actions">
                  <button onClick={() => setStep((s) => Math.max(0, s - 1))}>{t.back}</button>
                  <button onClick={() => answers[step] !== undefined && setStep((s) => s + 1)}>{t.next}</button>
                </div>
              </>
            ) : (
              <button onClick={() => { setStep(0); setAnswers({}); }}>{t.restart}</button>
            )}
          </article>
          <article className="nsm-panel nsm-glass">
            <h3>{t.resultTitle}</h3>
            {!quizAdvice ? <p>{lang === "en" ? "Complete quiz to unlock." : "تاقیکردنەوە تەواوبکە."}</p> : (
              <div className="nsm-result glow">
                <p><b>{lang === "en" ? "Suggested style" : "شێوازی پێشنیارکراو"}:</b> {quizAdvice.style}</p>
                <ul>{quizAdvice.lines.map((l) => <li key={l}>{l}</li>)}</ul>
              </div>
            )}
          </article>
        </div>
      )}

      {tab === "learn" && (
        <div className="nsm-grid nsm-grid-2">
          <article className="nsm-panel nsm-glass">
            <h3>{t.learnTitle}</h3>
            <div className="chip-row">{SUPPS.map((s, i) => <button key={s} className={`chip ${supp === i ? "active" : ""}`} onClick={() => setSupp(i)}>{s}</button>)}</div>
          </article>
          <article className="nsm-panel nsm-glass">
            <h3>{SUPPS[supp]}</h3>
            <div className="mini-card">{getSuppBrief(SUPPS[supp], lang) || t.supplementFallback}</div>
          </article>
        </div>
      )}

      {tab === "play" && (
        <div className="nsm-grid nsm-grid-2">
          <article className="nsm-panel nsm-glass">
            <h3>{t.playTitle}</h3>
            <div className="game-grid">
              <div className="mini-card">
                <h4>{lang === "en" ? "Game 1: Healthy or Junk?" : "یاری 1: تەندروست یان خراپ؟"}</h4>
                <p><b>{foodNow.n}</b></p>
                <div className="chip-row">
                  <button onClick={() => { setFoodScore((s) => s + (foodNow.healthy ? 1 : -1)); setFoodRound((r) => r + 1); }}>{lang === "en" ? "Healthy" : "تەندروست"}</button>
                  <button onClick={() => { setFoodScore((s) => s + (!foodNow.healthy ? 1 : -1)); setFoodRound((r) => r + 1); }}>{lang === "en" ? "Junk" : "خراپ"}</button>
                  <button onClick={() => { setFoodScore(0); setFoodRound(0); }}>{t.reset}</button>
                </div>
                <p>{lang === "en" ? "Score" : "سکۆر"}: {foodScore}</p>
              </div>

              <div className="mini-card">
                <h4>{lang === "en" ? "Game 2: Memory Match" : "یاری 2: هاوتاکردنی بیرخستنەوە"}</h4>
                <div className="memory-grid">
                  {memoryCards.map((c) => (
                    <button key={c.id} className={`chip ${c.open || c.matched ? "active" : ""}`} onClick={() => clickMemory(c.id)}>
                      {c.open || c.matched ? c.label : "?"}
                    </button>
                  ))}
                </div>
                <div className="nsm-actions">
                  <span>{lang === "en" ? "Moves" : "جوڵە"}: {memoryMoves}</span>
                  <button onClick={resetMemory}>{t.restart}</button>
                </div>
              </div>

              <div className="mini-card">
                <h4>{lang === "en" ? "Game 3: Sugar Guess" : "یاری 3: پێشبینی شەکر"}</h4>
                <p>{lang === "en" ? "Which has more sugar?" : "کامە شەکری زیاتر هەیە؟"}</p>
                <div className="chip-row">
                  <button onClick={() => { if (sugarNow.win === 0) setSugarScore((s) => s + 1); setSugarIdx((i) => i + 1); }}>{sugarNow.a}</button>
                  <button onClick={() => { if (sugarNow.win === 1) setSugarScore((s) => s + 1); setSugarIdx((i) => i + 1); }}>{sugarNow.b}</button>
                  <button onClick={() => { setSugarScore(0); setSugarIdx(0); }}>{t.reset}</button>
                </div>
                <p>{lang === "en" ? "Score" : "سکۆر"}: {sugarScore}</p>
              </div>
            </div>
          </article>
          <article className="nsm-panel nsm-glass">
            <h3>{lang === "en" ? "Build Your Plate" : "پلاتەی خۆت دروست بکە"}</h3>
            <div className="plate">{plate.map((p, i) => <span className="food" key={`${p.item}-${i}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}>{p.item}</span>)}</div>
            <div className="chip-row">
              <button onClick={() => addPlate("protein")}>{lang === "en" ? "Protein" : "پرۆتین"}</button>
              <button onClick={() => addPlate("carbs")}>{lang === "en" ? "Carbs" : "کارب"}</button>
              <button onClick={() => addPlate("fats")}>{lang === "en" ? "Fats" : "چەوری"}</button>
              <button onClick={() => addPlate("veg")}>{lang === "en" ? "Vegetables" : "سەوزە"}</button>
              <button onClick={() => setPlate([])}>{t.reset}</button>
            </div>
          </article>
        </div>
      )}

      {tab === "track" && (
        <div className="nsm-grid nsm-grid-2">
          <article className="nsm-panel nsm-glass">
            <h3>{t.trackTitle}</h3>
            <div className="nsm-actions"><button onClick={() => setWater((w) => Math.min(12, w + 1))}>+💧</button><button onClick={() => setActivity((a) => a + 1)}>+🏃</button><button onClick={() => { setWater(0); setActivity(0); setMealsDone([false, false, false]); setMood(""); }}>{t.reset}</button></div>
            {t.meals.map((m, i) => <label key={m}><input type="checkbox" checked={mealsDone[i]} onChange={(e) => setMealsDone((x) => x.map((v, idx) => idx === i ? e.target.checked : v))} /> {m}</label>)}
            <div className="chip-row">{t.moods.map((m) => <button key={m} className={`chip ${mood === m ? "active" : ""}`} onClick={() => setMood(m)}>{m}</button>)}</div>
            <div className="nsm-progress"><span style={{ width: `${score}%` }} /></div>
            <p>{lang === "en" ? "Daily score" : "سکۆری ڕۆژانە"}: {score}%</p>
          </article>
          <article className="nsm-panel nsm-glass">
            <h3>{lang === "en" ? "Calorie Calculator" : "ژمێری کەلۆری"}</h3>
            <div className="nsm-cal-form">
              <label>{lang === "en" ? "Age" : "تەمەن"} <input type="range" min="14" max="80" value={age} onChange={(e) => setAge(Number(e.target.value))} /></label>
              <label>{lang === "en" ? "Height (cm)" : "باڵا"} <input type="range" min="140" max="210" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></label>
              <label>{lang === "en" ? "Weight (kg)" : "کێش"} <input type="range" min="40" max="150" value={weight} onChange={(e) => setWeight(Number(e.target.value))} /></label>
              <label>{lang === "en" ? "Gender" : "ڕەگەز"} <select value={gender} onChange={(e) => setGender(e.target.value)}><option value="f">{lang === "en" ? "Female" : "مێ"}</option><option value="m">{lang === "en" ? "Male" : "نێر"}</option></select></label>
            </div>
            <button onClick={calcCalories}>{t.calculate}</button>
            <p>{calorieOut}</p>
          </article>
        </div>
      )}

      {tab === "discover" && (
        <div className="nsm-grid">
          <article className="nsm-panel nsm-glass">
            <h3>{t.discoverTitle}</h3>
            <div className="nsm-actions wrap"><input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder={t.search} /><button onClick={() => setModal(filtered[Math.floor(Math.random() * Math.max(filtered.length, 1))] || meals[0])}>🎲</button></div>
            <div className="chip-row">{["all", ...RECIPE_CATS].map((k) => <button key={k} type="button" className={`chip ${cat === k ? "active" : ""}`} onClick={() => { setCat(k); setPage(1); }}>{RECIPE_CAT_LABELS[lang][k] || k}</button>)}</div>
            <div className="nsm-grid nsm-grid-3">
              {recipePage.map((r) => (
                <article key={r.id} className={`recipe-card rc-${r.category}`}>
                  <h4>{r.name}</h4>
                  <p>
                    {r.calories} {t.kcalLabel} | {t.macroP} {r.protein} / {t.macroC} {r.carbs} / {t.macroF} {r.fats}
                  </p>
                  <div className="nsm-actions">
                    <button onClick={() => setModal(r)}>{lang === "en" ? "Open" : "کردنەوە"}</button>
                    <button onClick={() => setFavs((p) => (p.includes(r.id) ? p.filter((x) => x !== r.id) : [...p, r.id]))}>{favs.includes(r.id) ? (lang === "en" ? "Saved" : "پاشەکەوت") : (lang === "en" ? "Save" : "هەڵگرتن")}</button>
                  </div>
                </article>
              ))}
            </div>
            <button onClick={() => setPage((p) => p + 1)}>{t.loadMore}</button>
          </article>
        </div>
      )}

      {modal && (
        <div className="nsm-modal" onClick={() => setModal(null)}>
          <div className="nsm-modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>{modal.name}</h3>
            <p>
              {modal.calories} {t.kcalLabel} | {t.macroP} {modal.protein} / {t.macroC} {modal.carbs} / {t.macroF} {modal.fats}
            </p>
            <p><b>{lang === "en" ? "Ingredients" : "پێکهاتەکان"}:</b></p>
            <ul>{modal.ingredients.map((i) => <li key={i}>{i}</li>)}</ul>
            <p><b>{lang === "en" ? "Steps" : "هەنگاوەکان"}:</b></p>
            <ol>{modal.steps.map((s) => <li key={s}>{s}</li>)}</ol>
            <button onClick={() => setModal(null)}>{lang === "en" ? "Close" : "داخستن"}</button>
          </div>
        </div>
      )}
    </section>
  );
}
