import { Link, useParams } from "react-router-dom";
import { categories, categoryDescKey, categoryTitleKey, t, translations } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext.jsx";
import AntibioticsEnhanced from "./AntibioticsEnhanced";
import Fitness from "./Fitness";
import MentalHealth from "./MentalHealth";
import FirstTimeMothers from "./FirstTimeMothers";
import BodyWise from "./BodyWise";
import Nutrition from "./Nutrition";
import Beauty from "./Beauty";
import NoorCommunity from "./NoorCommunity";

export default function CategoryPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const text = translations[language] || translations.en;
  const category = categories.find((item) => item.slug === slug);

  if (slug === "mental-health") {
    return <MentalHealth />;
  }

  if (slug === "first-time-mothers") {
    return <FirstTimeMothers />;
  }

  if (slug === "bodywise") {
    return <BodyWise />;
  }

  if (slug === "antibiotics-flu") {
    return <AntibioticsEnhanced />;
  }

  if (slug === "fitness") {
    return <Fitness />;
  }

  if (slug === "nutrition-diets") {
    return <Nutrition />;
  }

  if (slug === "beauty") {
    return <Beauty />;
  }

  if (slug === "noor-community") {
    return <NoorCommunity />;
  }

  if (!category) {
    return (
      <main
        className={`flex min-h-screen items-center justify-center bg-transparent ${language === "ku" ? "font-ku" : ""}`}
        dir={language === "ku" ? "rtl" : "ltr"}
      >
        <div className="app-container flex justify-center">
          <div className="rounded-3xl bg-white p-8 text-center shadow-card">
            <p className="text-slate-700">{text.categoryNotFound}</p>
            <Link
              to="/dashboard"
              className="mt-4 inline-block rounded-2xl bg-pastel-blue px-4 py-2 text-sm font-semibold text-slate-800"
            >
              {text.backDashboard}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const description = t(language, categoryDescKey(category.slug));
  const title = t(language, categoryTitleKey(category.slug));

  return (
    <main
      className={`flex min-h-screen items-center justify-center bg-transparent py-10 ${language === "ku" ? "font-ku" : ""}`}
      dir={language === "ku" ? "rtl" : "ltr"}
      lang={language === "ku" ? "ku" : "en"}
    >
      <div className="app-container flex w-full justify-center">
        <section className="w-full max-w-4xl rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-soft sm:p-10">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pastel-blue text-2xl">
            {category.icon}
          </div>
          <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
          <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
          <div className="mt-8 rounded-2xl bg-pastel-green/40 px-4 py-3 text-sm font-medium text-slate-700">
            {text.comingSoon}
          </div>
          <Link
            to="/dashboard"
            className="mt-6 inline-block rounded-2xl bg-pastel-pink px-5 py-2.5 text-sm font-semibold text-slate-800 transition duration-200 hover:brightness-95"
          >
            {text.backDashboard}
          </Link>
        </section>
      </div>
    </main>
  );
}
