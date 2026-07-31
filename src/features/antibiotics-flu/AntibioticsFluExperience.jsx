import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import KHHeader from "./components/KHHeader.jsx";
import HeroLanding from "./sections/HeroLanding.jsx";
import SymptomGuide from "./sections/SymptomGuide.jsx";
import RecoveryJourney from "./sections/RecoveryJourney.jsx";
import AntibioticLibrary from "./sections/AntibioticLibrary.jsx";
import VirusCompare from "./sections/VirusCompare.jsx";
import PlayLearn from "./sections/PlayLearn.jsx";
import DiscoverMagazine from "./sections/DiscoverMagazine.jsx";
import { useAfsTranslate } from "./hooks/useAfsTranslate.js";
import "./kh-design.css";

const SECTION_IDS = ["symptom", "recovery", "library", "compare", "play", "discover"];

export default function AntibioticsFluExperience() {
  const { lang, isRtl, t, tc, toggleLang } = useAfsTranslate();
  const [activeSection, setActiveSection] = useState("");

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  }, []);

  const handleToggleLang = useCallback(() => {
    toggleLang();
  }, [toggleLang]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.25;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.offsetTop <= y) {
          setActiveSection(SECTION_IDS[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`kh-root ${isRtl ? "lang-ku" : "lang-en"}`} dir={isRtl ? "rtl" : "ltr"} lang={lang}>
      <KHHeader tc={tc} toggleLang={handleToggleLang} lang={lang} active={activeSection} onNav={scrollTo} />

      <motion.main
        key={lang}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
          <HeroLanding tc={tc} onBegin={() => scrollTo("symptom")} onRecovery={() => scrollTo("recovery")} />
          <SymptomGuide t={t} tc={tc} />
          <RecoveryJourney t={t} tc={tc} />
          <AntibioticLibrary t={t} tc={tc} lang={lang} />
          <VirusCompare t={t} tc={tc} lang={lang} />
          <PlayLearn t={t} tc={tc} lang={lang} />
          <DiscoverMagazine tc={tc} lang={lang} />
      </motion.main>

      <p className="kh-footer-note">{t("footerDisclaimer")}</p>
    </div>
  );
}
