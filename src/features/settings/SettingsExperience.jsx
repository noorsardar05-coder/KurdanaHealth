import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import LanguageCard from "../onboarding/components/LanguageCard.jsx";
import { SETTINGS_I18N } from "./i18n/settingsStrings.js";
import "../onboarding/onboarding.css";
import "./settings.css";

export default function SettingsExperience() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const lang = language === "ku" ? "ku" : "en";

  const tr = useCallback(
    (key) => SETTINGS_I18N[lang]?.[key] ?? SETTINGS_I18N.en[key] ?? key,
    [lang]
  );

  const handleSelect = (next) => {
    setLanguage(next);
  };

  return (
    <div
      className={`kh-settings ${lang === "ku" ? "lang-ku" : ""}`}
      dir={lang === "ku" ? "rtl" : "ltr"}
      lang={lang === "ku" ? "ku" : "en"}
    >
      <div className="kh-settings__wrap">
        <header className="kh-settings__header">
          <button
            type="button"
            className="kh-settings__back"
            onClick={() => navigate(-1)}
            aria-label={tr("back")}
          >
            <ArrowLeft size={18} strokeWidth={1.75} className="rtl:rotate-180" />
          </button>
          <div>
            <h1 className="kh-settings__title">{tr("title")}</h1>
            <p className="kh-settings__sub">{tr("subtitle")}</p>
          </div>
        </header>

        <section className="kh-settings__card" aria-labelledby="settings-language">
          <h2 id="settings-language" className="kh-settings__section-title">
            {tr("languageTitle")}
          </h2>
          <p className="kh-settings__section-sub">{tr("languageSub")}</p>

          <div className="kh-settings__lang-cards">
            <LanguageCard
              label="English"
              selected={lang === "en"}
              onClick={() => handleSelect("en")}
            />
            <LanguageCard
              label="کوردی"
              selected={lang === "ku"}
              onClick={() => handleSelect("ku")}
              kurdish
            />
          </div>
        </section>

        <p className="kh-settings__hint">{tr("languageHint")}</p>

        <Link to="/dashboard" className="kh-settings__dash-link">
          {tr("backToDashboard")}
        </Link>
      </div>
    </div>
  );
}
