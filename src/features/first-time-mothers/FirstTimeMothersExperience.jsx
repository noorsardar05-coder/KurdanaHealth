import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { t } from "./i18n/strings.js";
import {
  loadProfile,
  saveProfile,
  loadState,
  saveState,
} from "./utils/storage.js";

import Quiz from "./components/Quiz.jsx";
import Frame from "./components/Frame.jsx";
import Home from "./components/Home.jsx";
import Recovery from "./components/Recovery.jsx";
import Feeding from "./components/Feeding.jsx";
import Baby from "./components/Baby.jsx";
import Discover from "./components/Discover.jsx";
import Essentials from "./components/Essentials.jsx";

import "./companion.css";

const CONFETTI_COLORS = ["#8fa99a", "#c98b8b", "#6b9a82", "#dce8e1", "#f5e8e8"];

function Confetti() {
  return (
    <div className="ftm-confetti" aria-hidden="true">
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="ftm-confetti__piece"
          style={{
            left: `${Math.random() * 100}%`,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            animationDelay: `${Math.random() * 0.8}s`,
            animationDuration: `${2 + Math.random() * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function FirstTimeMothersExperience() {
  const { language, setLanguage } = useLanguage();
  const lang = language === "ku" ? "ku" : "en";
  const setLang = useCallback(
    (next) => setLanguage(next === "ku" ? "ku" : "en"),
    [setLanguage]
  );
  const [tab, setTab] = useState("home");
  const [profile, setProfile] = useState(() => loadProfile());
  const [state, setState] = useState(() => loadState());

  const tx = useCallback((k) => t(k, lang), [lang]);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    if (profile) saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    if (!state.celebrate) return;
    const id = setTimeout(() => {
      setState((s) => ({ ...s, celebrate: null }));
    }, 2800);
    return () => clearTimeout(id);
  }, [state.celebrate]);

  function updateState(partial) {
    setState((s) => ({ ...s, ...partial }));
  }

  function handleQuizComplete(p) {
    setProfile(p);
    saveProfile(p);
  }

  function celebrate(msg) {
    updateState({ celebrate: msg || tx("celebrate") });
  }

  if (!profile) {
    return (
      <Quiz lang={lang} setLang={setLang} onComplete={handleQuizComplete} />
    );
  }

  function renderTab() {
    const common = { lang, tx, profile, state, onUpdateState: updateState };
    switch (tab) {
      case "home":
        return (
          <Home
            {...common}
            name={profile.name}
            onNavigate={setTab}
          />
        );
      case "recovery":
        return (
          <Recovery
            {...common}
            onCelebrate={celebrate}
          />
        );
      case "feeding":
        return <Feeding {...common} />;
      case "baby":
        return <Baby {...common} onCelebrate={celebrate} />;
      case "discover":
        return <Discover {...common} />;
      case "essentials":
        return <Essentials {...common} />;
      default:
        return (
          <Home
            {...common}
            name={profile.name}
            onNavigate={setTab}
          />
        );
    }
  }

  return (
    <>
      <Frame
        lang={lang}
        setLang={setLang}
        tab={tab}
        setTab={setTab}
      >
        {renderTab()}
      </Frame>

      {state.celebrate && (
        <div className="ftm-celebrate">
          <Confetti />
          <div className="ftm-celebrate__msg">{state.celebrate}</div>
        </div>
      )}
    </>
  );
}
