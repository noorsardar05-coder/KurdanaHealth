import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { NUTRITION_I18N, ONBOARDING_STEPS } from "./i18n/nutritionStrings.js";
import { getFeaturedRecipes, getTrendingRecipes, getRecipeBySlug } from "./data/nutritionRecipes.js";
import {
  loadNutritionProfile,
  saveNutritionProfile,
  loadMealPlan,
  saveMealPlan,
  loadTracker,
  saveTracker,
  loadFavoriteRecipes,
  saveFavoriteRecipes,
  loadGroceryList,
  saveGroceryList,
  loadOnboardingDraft,
  saveOnboardingDraft,
} from "./utils/storage.js";
import { estimateNutritionTargets, dateKey } from "./utils/planEngine.js";
import { getUser } from "../../utils/storage.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

import NutritionShell from "./components/NutritionShell.jsx";
import NutritionOnboarding from "./components/NutritionOnboarding.jsx";
import NutritionHome from "./components/NutritionHome.jsx";
import NutritionMyPlan from "./components/NutritionMyPlan.jsx";
import NutritionMeals from "./components/NutritionMeals.jsx";
import NutritionRecipes from "./components/NutritionRecipes.jsx";
import NutritionTracker from "./components/NutritionTracker.jsx";
import NutritionLearn, { NutritionDiscover } from "./components/NutritionLearn.jsx";
import NutritionRecipeModal, { NutritionFoodModal } from "./components/NutritionRecipeModal.jsx";

import "./nutrition.css";

function nutritionT(lang, key) {
  const dict = NUTRITION_I18N[lang === "ku" ? "ku" : "en"];
  return dict[key] ?? NUTRITION_I18N.en[key] ?? key;
}

function scrollMainTo(id) {
  const root = document.getElementById("nu-main-scroll");
  const el = document.getElementById(id);
  if (!el) return;
  if (root) root.scrollTo({ top: Math.max(0, el.offsetTop - 12), behavior: "smooth" });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildGroceryFromPlan(mealPlan) {
  const map = new Map();
  Object.values(mealPlan || {}).forEach((day) => {
    Object.values(day || {}).forEach((slot) => {
      const recipe = slot?.recipeId ? getRecipeBySlug(slot.recipeId) : null;
      (recipe?.ingredients || []).forEach((ing) => {
        const nameEn = typeof ing.name === "object" ? ing.name.en : ing.nameEn || ing.name;
        const key = String(nameEn || "").toLowerCase();
        if (!key) return;
        if (!map.has(key)) {
          map.set(key, {
            id: key,
            name: nameEn,
            category: recipe?.cuisine || recipe?.mealType || "general",
            checked: false,
            servings: 1,
          });
        } else {
          const prev = map.get(key);
          map.set(key, { ...prev, servings: (prev.servings || 1) + 1 });
        }
      });
    });
  });
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export default function NutritionExperience() {
  const { language, setLanguage } = useLanguage();
  const lang = language === "ku" ? "ku" : "en";
  const t = useCallback((key) => nutritionT(lang, key), [lang]);
  const userName = getUser()?.name || "";

  const [ready, setReady] = useState(false);
  const [view, setView] = useState("onboarding");
  const [onboardStep, setOnboardStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [completedFlash, setCompletedFlash] = useState(false);
  const [activeSection, setActiveSection] = useState("nutrition-home");

  const [profile, setProfile] = useState(null);
  const [mealPlan, setMealPlan] = useState({});
  const [tracker, setTracker] = useState({ waterMl: 0, proteinG: 0, fiberG: 0, energy: null });
  const [favorites, setFavorites] = useState([]);
  const [grocery, setGrocery] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);

  const today = dateKey();
  const targets = useMemo(() => estimateNutritionTargets(profile || {}), [profile]);
  const featuredRecipes = useMemo(() => getFeaturedRecipes(), []);
  const trendingRecipes = useMemo(() => getTrendingRecipes(), []);
  const navigate = useCallback((id) => setActiveSection(id), []);

  useEffect(() => {
    const saved = loadNutritionProfile();
    const draft = loadOnboardingDraft();
    if (saved?.goal) {
      setProfile(saved);
      setView("dashboard");
    } else if (draft) {
      setAnswers(draft.answers || {});
      setOnboardStep(typeof draft.step === "number" ? draft.step : -1);
      setView("onboarding");
    } else {
      setView("onboarding");
    }
    setMealPlan(loadMealPlan());
    const tr = loadTracker();
    if (tr.date !== today) {
      const reset = { waterMl: 0, proteinG: 0, fiberG: 0, energy: null, date: today, weekDays: tr.weekDays || 0 };
      setTracker(reset);
      saveTracker(reset);
    } else {
      setTracker(tr);
    }
    setFavorites(loadFavoriteRecipes());
    setGrocery(loadGroceryList());
    const timer = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(timer);
  }, [today]);

  const toggleLang = () => setLanguage(lang === "ku" ? "en" : "ku");

  const handleSelect = (id, value) => setAnswers((prev) => ({ ...prev, [id]: value }));
  const handleBodyChange = (field, value) => setAnswers((prev) => ({ ...prev, [field]: value }));
  const handleMultiToggle = (id, value) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[id]) ? prev[id] : [];
      if (value === "none") return { ...prev, [id]: ["none"] };
      const withoutNone = current.filter((v) => v !== "none");
      const next = withoutNone.includes(value)
        ? withoutNone.filter((v) => v !== value)
        : [...withoutNone, value];
      return { ...prev, [id]: next };
    });
  };

  const handleOnboardNext = () => {
    if (onboardStep < 0) {
      setOnboardStep(0);
      return;
    }
    if (onboardStep >= ONBOARDING_STEPS.length - 1) {
      setCompletedFlash(true);
      return;
    }
    setOnboardStep((s) => s + 1);
  };

  const handleOnboardSkip = () => {
    if (onboardStep >= ONBOARDING_STEPS.length - 1) {
      setCompletedFlash(true);
      return;
    }
    setOnboardStep((s) => s + 1);
  };

  const handleSaveLater = () => {
    saveOnboardingDraft({ step: onboardStep, answers });
  };

  const handleFinishOnboard = () => {
    const full = { ...answers, completedAt: new Date().toISOString() };
    if (full.preferredLanguage === "ku" || full.preferredLanguage === "en") {
      setLanguage(full.preferredLanguage);
    }
    setProfile(full);
    saveNutritionProfile(full);
    saveOnboardingDraft(null);
    setCompletedFlash(false);
    setView("dashboard");
  };

  const handleRetake = () => {
    setOnboardStep(-1);
    setAnswers({});
    setCompletedFlash(false);
    setView("onboarding");
  };

  const updatePlan = (next) => {
    setMealPlan(next);
    saveMealPlan(next);
  };

  const updateTracker = (next) => {
    const withDate = { ...next, date: today };
    setTracker(withDate);
    saveTracker(withDate);
  };

  const toggleFavorite = (id) => {
    const next = favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id];
    setFavorites(next);
    saveFavoriteRecipes(next);
  };

  const rebuildGrocery = () => {
    const list = buildGroceryFromPlan(mealPlan);
    setGrocery(list);
    saveGroceryList(list);
  };

  const toggleGrocery = (id) => {
    const next = grocery.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
    setGrocery(next);
    saveGroceryList(next);
  };

  const removeGrocery = (id) => {
    const next = grocery.filter((item) => item.id !== id);
    setGrocery(next);
    saveGroceryList(next);
  };

  const adjustGroceryServings = (id, servings) => {
    const next = grocery.map((item) => (item.id === id ? { ...item, servings } : item));
    setGrocery(next);
    saveGroceryList(next);
  };

  if (!ready) {
    return (
      <div className={`nu-root ${lang === "ku" ? "lang-ku" : ""}`} dir={lang === "ku" ? "rtl" : "ltr"}>
        <div className="nu-bg" aria-hidden="true" />
        <div className="nu-onboard">
          <div className="nu-onboard__card" style={{ height: 200 }} />
        </div>
      </div>
    );
  }

  if (view === "onboarding") {
    return (
      <div className={`nu-root ${lang === "ku" ? "lang-ku" : ""}`} dir={lang === "ku" ? "rtl" : "ltr"}>
        <div className="nu-bg" aria-hidden="true" />
        <header style={{ position: "absolute", top: "1rem", insetInlineEnd: "1rem", zIndex: 2 }}>
          <button type="button" className="nu-icon-btn" onClick={toggleLang} aria-label={t("settingsLang")}>
            {lang === "en" ? "KU" : "EN"}
          </button>
        </header>
        <NutritionOnboarding
          t={t}
          step={onboardStep}
          answers={answers}
          onSelect={handleSelect}
          onMultiToggle={handleMultiToggle}
          onBodyChange={handleBodyChange}
          onNext={handleOnboardNext}
          onBack={() => setOnboardStep((s) => Math.max(-1, s - 1))}
          onSkip={handleOnboardSkip}
          onSaveLater={handleSaveLater}
          onFinish={handleFinishOnboard}
          completed={completedFlash}
        />
        <div style={{ position: "absolute", bottom: "1rem", insetInlineStart: "1rem", zIndex: 2 }}>
          <Link to="/dashboard" className="nu-btn nu-btn--ghost">
            {t("backDashboard")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`nu-root ${lang === "ku" ? "lang-ku" : ""}`} dir={lang === "ku" ? "rtl" : "ltr"}>
      <div className="nu-bg" aria-hidden="true" />
      <NutritionShell t={t} onToggleLang={toggleLang} activeSection={activeSection} onNavigate={navigate}>
        <NutritionHome
          t={t}
          lang={lang}
          userName={userName}
          targets={targets}
          tracker={tracker}
          mealPlan={mealPlan}
          todayKey={today}
          onOpenMeals={() => {
            setActiveSection("nutrition-meals");
            scrollMainTo("nutrition-meals");
          }}
          onOpenTracker={() => {
            setActiveSection("nutrition-tracker");
            scrollMainTo("nutrition-tracker");
          }}
          onOpenRecipe={setSelectedRecipe}
        />
        <NutritionMyPlan t={t} profile={profile} targets={targets} onEditProfile={handleRetake} />
        <NutritionMeals
          t={t}
          lang={lang}
          mealPlan={mealPlan}
          todayKey={today}
          profile={profile}
          onUpdatePlan={updatePlan}
          onOpenRecipe={setSelectedRecipe}
          grocery={grocery}
          onToggleGrocery={toggleGrocery}
          onRebuildGrocery={rebuildGrocery}
          onRemoveGrocery={removeGrocery}
          onAdjustGroceryServings={adjustGroceryServings}
        />
        <NutritionRecipes
          t={t}
          lang={lang}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onOpenRecipe={setSelectedRecipe}
          onOpenFood={setSelectedFood}
        />
        <NutritionTracker t={t} tracker={tracker} targets={targets} onUpdateTracker={updateTracker} />
        <NutritionLearn t={t} lang={lang} />
        <NutritionDiscover
          t={t}
          lang={lang}
          onOpenRecipe={setSelectedRecipe}
          featuredRecipes={featuredRecipes}
          trendingRecipes={trendingRecipes}
        />

        <div className="nu-retake">
          <button type="button" className="nu-btn nu-btn--ghost" onClick={handleRetake}>
            {t("retakeOnboard")}
          </button>
        </div>
        <p className="nu-disclaimer">{t("estimateDisclaimer")}</p>
      </NutritionShell>

      {selectedRecipe && (
        <NutritionRecipeModal
          recipe={selectedRecipe}
          lang={lang}
          t={t}
          isFavorite={favorites.includes(selectedRecipe.id)}
          onClose={() => setSelectedRecipe(null)}
          onToggleFavorite={toggleFavorite}
        />
      )}
      {selectedFood && (
        <NutritionFoodModal food={selectedFood} lang={lang} t={t} onClose={() => setSelectedFood(null)} />
      )}
    </div>
  );
}
