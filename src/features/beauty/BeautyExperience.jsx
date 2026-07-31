import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BEAUTY_I18N, QUIZ_STEPS } from "./i18n/beautyStrings.js";
import { getLocalizedBeautyProducts, localizeProduct } from "./data/beautyProducts.js";
import { getPersonalizedRecommendations } from "./data/beautyRecommendations.js";
import { DAILY_INSPIRATIONS } from "./data/beautyDiscover.js";
import { getArticleBySlug } from "./data/beautyArticles.js";
import {
  loadBeautyQuiz,
  saveBeautyQuiz,
  loadBeautyAnalysis,
  saveBeautyAnalysis,
  loadBeautyCameraAnalysis,
  saveBeautyCameraAnalysis,
  loadRoutineProgress,
  saveRoutineProgress,
  loadJournalEntries,
  saveJournalEntries,
  loadFavorites,
  saveFavorites,
  loadSavedArticles,
  saveSavedArticles,
  loadRecentArticles,
  saveRecentArticles,
} from "./utils/storage.js";
import { getUser } from "../../utils/storage.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

import BeautyShell from "./components/BeautyShell.jsx";
import BeautyOnboarding from "./components/BeautyOnboarding.jsx";
import BeautyQuiz from "./components/BeautyQuiz.jsx";
import BeautyHome from "./components/BeautyHome.jsx";
import BeautyMySkin from "./components/BeautyMySkin.jsx";
import BeautyRoutine from "./components/BeautyRoutine.jsx";
import BeautyShop from "./components/BeautyShop.jsx";
import BeautyIngredients from "./components/BeautyIngredients.jsx";
import BeautyJournal from "./components/BeautyJournal.jsx";
import BeautyDiscover from "./components/BeautyDiscover.jsx";
import BeautyFooter from "./components/BeautyFooter.jsx";
import BeautyProductModal from "./components/BeautyProductModal.jsx";
import BeautyIngredientModal from "./components/BeautyIngredientModal.jsx";
import BeautyGameModal from "./components/BeautyGameModal.jsx";

import "./beauty.css";

function beautyT(lang, key) {
  const dict = BEAUTY_I18N[lang === "ku" ? "ku" : "en"];
  return dict[key] ?? BEAUTY_I18N.en[key] ?? key;
}

function computeRoutinePct(progress) {
  const morning = progress?.morning || {};
  const keys = ["cleanser", "toner", "serum", "moisturizer", "sunscreen"];
  const done = keys.filter((k) => morning[k]).length;
  return Math.round((done / keys.length) * 100);
}

function dailyInspo(lang) {
  const list = DAILY_INSPIRATIONS[lang === "ku" ? "ku" : "en"];
  const day = new Date().getDate();
  return list[day % list.length];
}

function scrollMainTo(id) {
  const root = document.getElementById("bt-main-scroll");
  const el = document.getElementById(id);
  if (!el) return;
  if (root) {
    root.scrollTo({ top: Math.max(0, el.offsetTop - 12), behavior: "smooth" });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function parseDiscoverSlug(pathname) {
  const match = String(pathname || "").match(/\/category\/beauty\/discover\/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function BeautyExperience() {
  const { language, setLanguage } = useLanguage();
  const lang = language === "ku" ? "ku" : "en";
  const t = useCallback((key) => beautyT(lang, key), [lang]);
  const location = useLocation();
  const routerNavigate = useNavigate();

  const [ready, setReady] = useState(false);
  const [view, setView] = useState("onboarding");
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [activeSection, setActiveSection] = useState("beauty-home");

  const [profile, setProfile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [cameraAnalysis, setCameraAnalysis] = useState(null);
  const [routineProgress, setRoutineProgress] = useState({ morning: {}, evening: {}, weekly: {}, streak: 0 });
  const [journalEntries, setJournalEntries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [discoverCategory, setDiscoverCategory] = useState("all");
  const [activeArticle, setActiveArticle] = useState(null);

  const userName = getUser()?.name || "";
  const products = useMemo(() => getLocalizedBeautyProducts(lang), [lang]);
  const recommendations = useMemo(
    () => getPersonalizedRecommendations(profile, 8).map((p) => localizeProduct(p, lang)),
    [profile, lang],
  );
  const featuredLibrary = useMemo(() => products.slice(0, 6), [products]);
  const inspo = dailyInspo(lang);

  const navigate = useCallback((id) => setActiveSection(id), []);

  useEffect(() => {
    const saved = loadBeautyQuiz();
    if (saved?.skinType) {
      setProfile(saved);
      setView("dashboard");
    } else {
      setView("onboarding");
    }
    const savedAnalysis = loadBeautyAnalysis();
    const savedCamera = loadBeautyCameraAnalysis();
    if (savedAnalysis?.source === "camera" && Array.isArray(savedAnalysis?.observations)) {
      if (!savedCamera) saveBeautyCameraAnalysis(savedAnalysis);
      saveBeautyAnalysis(null);
      setCameraAnalysis(savedCamera || savedAnalysis);
      setAnalysis(null);
    } else {
      setAnalysis(savedAnalysis);
      setCameraAnalysis(savedCamera);
    }
    setRoutineProgress(loadRoutineProgress());
    setJournalEntries(loadJournalEntries());
    setFavorites(loadFavorites());
    setSavedArticles(loadSavedArticles());
    setRecentArticles(loadRecentArticles());
    const timer = setTimeout(() => setReady(true), 280);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const slug = parseDiscoverSlug(location.pathname);
    if (!slug) return;
    const article = getArticleBySlug(slug);
    if (article) {
      setView("dashboard");
      setActiveArticle(article);
      setActiveSection("beauty-discover");
      setTimeout(() => scrollMainTo("beauty-discover"), 320);
    }
  }, [location.pathname]);

  const toggleLang = () => setLanguage(lang === "ku" ? "en" : "ku");

  const openArticle = useCallback(
    (article) => {
      if (!article) return;
      setActiveArticle(article);
      setActiveSection("beauty-discover");
      const slug = article.slug || article.id;
      routerNavigate(`/category/beauty/discover/${slug}`, { replace: false });
      const nextRecent = [article.id, ...recentArticles.filter((id) => id !== article.id)].slice(0, 12);
      setRecentArticles(nextRecent);
      saveRecentArticles(nextRecent);
      setTimeout(() => scrollMainTo("beauty-discover"), 60);
    },
    [recentArticles, routerNavigate],
  );

  const closeArticle = useCallback(() => {
    setActiveArticle(null);
    routerNavigate("/category/beauty", { replace: true });
    setTimeout(() => scrollMainTo("beauty-discover"), 60);
  }, [routerNavigate]);

  const toggleSaveArticle = useCallback(
    (article) => {
      if (!article) return;
      const id = article.id;
      const next = savedArticles.includes(id)
        ? savedArticles.filter((x) => x !== id)
        : [...savedArticles, id];
      setSavedArticles(next);
      saveSavedArticles(next);
    },
    [savedArticles],
  );

  const handleDiscoverCategory = useCallback((catId) => {
    setDiscoverCategory(catId || "all");
  }, []);

  const handleQuizSelect = (id, value) => {
    setQuizAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleQuizNext = () => {
    if (quizStep >= QUIZ_STEPS.length - 1) {
      setQuizCompleted(true);
      return;
    }
    setQuizStep((s) => s + 1);
  };

  const handleQuizFinish = () => {
    const full = { ...quizAnswers };
    setProfile(full);
    saveBeautyQuiz(full);
    setView("dashboard");
  };

  const handleRetakeQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizCompleted(false);
    setView("quiz");
  };

  const handleRoutineProgress = (next) => {
    setRoutineProgress(next);
    saveRoutineProgress(next);
  };

  const handleJournalSave = (entries) => {
    setJournalEntries(entries);
    saveJournalEntries(entries);
  };

  const toggleFavorite = (id) => {
    const next = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];
    setFavorites(next);
    saveFavorites(next);
  };

  const continueRoutine = () => {
    setActiveSection("beauty-routine");
    scrollMainTo("beauty-routine");
  };

  const openLibrary = () => {
    setActiveSection("beauty-shop");
    scrollMainTo("beauty-shop");
  };

  const routineWithPct = useMemo(
    () => ({ ...routineProgress, pct: computeRoutinePct(routineProgress) }),
    [routineProgress],
  );

  if (!ready) {
    return (
      <div className={`bt-root ${lang === "ku" ? "lang-ku" : ""}`} dir={lang === "ku" ? "rtl" : "ltr"}>
        <div className="bt-bg" aria-hidden="true" />
        <div className="bt-onboard">
          <div className="bt-skeleton bt-onboard__card glass" style={{ height: 280, width: "min(420px, 92vw)" }} />
        </div>
      </div>
    );
  }

  if (view === "onboarding") {
    return (
      <div className={`bt-root ${lang === "ku" ? "lang-ku" : ""}`} dir={lang === "ku" ? "rtl" : "ltr"}>
        <div className="bt-bg" aria-hidden="true" />
        <BeautyOnboarding t={t} onStartQuiz={() => setView("quiz")} />
      </div>
    );
  }

  if (view === "quiz") {
    return (
      <div className={`bt-root ${lang === "ku" ? "lang-ku" : ""}`} dir={lang === "ku" ? "rtl" : "ltr"}>
        <div className="bt-bg" aria-hidden="true" />
        <BeautyQuiz
          t={t}
          step={quizStep}
          answers={quizAnswers}
          onSelect={handleQuizSelect}
          onNext={handleQuizNext}
          onBack={() => setQuizStep((s) => Math.max(0, s - 1))}
          onFinish={handleQuizFinish}
          completed={quizCompleted}
        />
      </div>
    );
  }

  return (
    <div className={`bt-root ${lang === "ku" ? "lang-ku" : ""}`} dir={lang === "ku" ? "rtl" : "ltr"}>
      <div className="bt-bg" aria-hidden="true" />
      <BeautyShell
        t={t}
        lang={lang}
        onToggleLang={toggleLang}
        activeSection={activeSection}
        onNavigate={navigate}
      >
        <BeautyHome
          t={t}
          lang={lang}
          userName={userName}
          profile={profile}
          inspo={inspo}
          analysis={analysis}
          routineProgress={routineWithPct}
          recommendations={recommendations}
          featuredLibrary={featuredLibrary}
          journalEntries={journalEntries}
          onContinueRoutine={continueRoutine}
          onOpenLibrary={openLibrary}
          onProductClick={setSelectedProduct}
        />
        <BeautyMySkin
          t={t}
          lang={lang}
          profile={profile}
          analysis={analysis}
          cameraAnalysis={cameraAnalysis}
          onAnalysisUpdate={setAnalysis}
          onCameraAnalysisUpdate={setCameraAnalysis}
          recommendations={recommendations}
          onProductClick={setSelectedProduct}
          onOpenLibrary={openLibrary}
        />
        <BeautyRoutine
          t={t}
          profile={profile}
          progress={routineProgress}
          onProgressChange={handleRoutineProgress}
        />
        <BeautyShop
          t={t}
          lang={lang}
          products={products}
          favorites={favorites}
          onProductClick={setSelectedProduct}
          onToggleFavorite={toggleFavorite}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesView={() => setShowFavoritesOnly((v) => !v)}
        />
        <BeautyIngredients
          t={t}
          lang={lang}
          onIngredientClick={setSelectedIngredient}
        />
        <BeautyJournal t={t} entries={journalEntries} onSave={handleJournalSave} />
        <BeautyDiscover
          t={t}
          lang={lang}
          activeArticle={activeArticle}
          category={discoverCategory}
          onCategoryChange={handleDiscoverCategory}
          onOpenArticle={openArticle}
          onCloseArticle={closeArticle}
          savedArticleIds={savedArticles}
          recentArticleIds={recentArticles}
          onToggleSaveArticle={toggleSaveArticle}
          onOpenIngredient={setSelectedIngredient}
          onOpenProduct={(p) => setSelectedProduct(localizeProduct(p, lang) || p)}
        />

        <div className="bt-retake-wrap">
          <button type="button" className="bt-ghost-btn" onClick={handleRetakeQuiz}>
            {t("retakeQuiz")}
          </button>
        </div>

        <BeautyFooter t={t} />
      </BeautyShell>

      {selectedProduct && (
        <BeautyProductModal
          product={localizeProduct(selectedProduct, lang) || selectedProduct}
          t={t}
          lang={lang}
          isFavorite={favorites.includes(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onToggleFavorite={() => toggleFavorite(selectedProduct.id)}
          onOpenSimilar={(p) => setSelectedProduct(localizeProduct(p, lang) || p)}
        />
      )}

      {selectedIngredient && (
        <BeautyIngredientModal
          ingredient={selectedIngredient}
          t={t}
          lang={lang}
          products={products}
          onClose={() => setSelectedIngredient(null)}
          onOpenIngredient={setSelectedIngredient}
          onProductClick={(p) => {
            setSelectedIngredient(null);
            setSelectedProduct(localizeProduct(p, lang) || p);
          }}
        />
      )}

      {activeGame && (
        <BeautyGameModal gameId={activeGame} t={t} onClose={() => setActiveGame(null)} />
      )}
    </div>
  );
}
