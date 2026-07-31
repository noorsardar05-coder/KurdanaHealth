import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { getUser, logoutUser } from "../../utils/storage";
import DashboardShell from "./components/DashboardShell.jsx";
import DashboardNav from "./components/DashboardNav.jsx";
import HeroWelcome from "./components/HeroWelcome.jsx";
import StreakWidget from "./components/StreakWidget.jsx";
import HealthSpaceCard from "./components/HealthSpaceCard.jsx";
import ContinueLearning from "./components/ContinueLearning.jsx";
import { useLearningStreak } from "./hooks/useLearningStreak.js";
import { useRecentSpaces } from "./hooks/useRecentSpaces.js";
import {
  DASHBOARD_I18N,
  SPACE_MODULES,
  displayUserName,
  formatDashboardDate,
} from "./i18n/dashboardStrings.js";
import "./dashboard.css";

const EASE = [0.22, 1, 0.36, 1];

export default function DashboardExperience() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const lang = language === "ku" ? "ku" : "en";
  const td = useCallback(
    (key) => {
      const val = DASHBOARD_I18N[lang]?.[key] ?? DASHBOARD_I18N.en[key];
      return typeof val === "function" ? val : val ?? key;
    },
    [lang]
  );
  const user = getUser();
  const streak = useLearningStreak();
  const { recent } = useRecentSpaces();
  const days = streak.current || 0;
  const best = Math.max(streak.longest || 0, days);
  const name = displayUserName(user?.name, lang);
  const todayStr = formatDashboardDate(lang);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div
      className={`kh-dash ${lang === "ku" ? "lang-ku" : ""}`}
      dir={lang === "ku" ? "rtl" : "ltr"}
      lang={lang === "ku" ? "ckb" : "en"}
    >
      <DashboardShell />

      <div className="kh-dash__wrap">
        <DashboardNav
          brand={td("brand")}
          author={td("byNoor")}
          logoutLabel={td("logout")}
          settingsLabel={td("settings")}
          onLogout={handleLogout}
          todayLabel={`${td("today")} · ${todayStr}`}
        />

        <HeroWelcome
          welcomeBack={td("welcomeBack")}
          name={name}
          quote={td("quote")}
          attribution={td("quoteAttribution")}
          sep={lang === "ku" ? "،" : ","}
        />

        <StreakWidget
          current={days}
          longest={best}
          title={td("streakTitle")}
          unitLabel={td("streakUnit")}
          unitSingular={td("streakUnitSingular")}
          usedText={DASHBOARD_I18N[lang].streakUsed(days)}
          encourage={td("streakEncourage")}
          longestText={DASHBOARD_I18N[lang].streakLongest(best)}
          lang={lang}
        />

        <motion.section
          className="kh-section"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
        >
          <div className="kh-section__head">
            <h2 className="kh-section__title">{td("spacesTitle")}</h2>
            <p className="kh-section__sub">{td("spacesSub")}</p>
          </div>

          <div className="kh-spaces">
            {SPACE_MODULES.map((mod, i) => (
              <HealthSpaceCard
                key={mod.slug}
                mod={mod}
                lang={lang}
                td={td}
                index={i}
                started={recent.includes(mod.slug)}
              />
            ))}
          </div>
        </motion.section>

        <ContinueLearning slugs={recent} lang={lang} td={td} />
      </div>
    </div>
  );
}
