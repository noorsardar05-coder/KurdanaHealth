import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { t } from "./i18n/strings.js";
import {
  addGalaxyStar,
  dateKey,
  loadGalaxy,
  loadState,
  saveState,
} from "./utils/storage.js";
import { moodHomePlan } from "./utils/ai.js";

import Frame from "./components/Frame.jsx";
import Home from "./components/Home.jsx";
import Tools from "./components/Tools.jsx";
import Learn from "./components/Learn.jsx";
import Discover from "./components/Discover.jsx";
import Track from "./components/Track.jsx";
import Journal from "./components/Journal.jsx";
import Community from "./components/Community.jsx";
import AskCompanion from "./components/AskCompanion.jsx";
import CompanionOrb from "./components/CompanionOrb.jsx";

import "./mh.css";

function NameGate({ lang, setLang, onDone }) {
  const [name, setName] = useState("");
  const tx = (k) => t(k, lang);

  return (
    <div className={`mh ${lang === "ku" ? "is-ku" : ""} mood-unknown`}>
      <div className="mh-aurora" aria-hidden="true" />
      <div className="mh-gate">
        <CompanionOrb size="lg" mood="okay" />
        <h1 className="mh-display">{tx("namePrompt")}</h1>
        <input
          className="mh-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={tx("namePlaceholder")}
          autoFocus
        />
        <div className="mh-gate__actions">
          <button
            type="button"
            className="mh-big-cta"
            onClick={() => onDone(name.trim())}
            disabled={!name.trim()}
          >
            {tx("continue")}
          </button>
          <button type="button" className="mh-text-link" onClick={() => onDone("")}>
            {tx("skipName")}
          </button>
        </div>
        <div className="mh-lang mh-lang--center">
          <button type="button" className={lang === "en" ? "is-on" : ""} onClick={() => setLang("en")}>
            {tx("langEn")}
          </button>
          <button type="button" className={lang === "ku" ? "is-on" : ""} onClick={() => setLang("ku")}>
            {tx("langKu")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MentalHealthExperience() {
  const { language, setLanguage } = useLanguage();
  const [lang, setLangLocal] = useState(language || "en");
  const [tab, setTab] = useState("home");
  const [topicId, setTopicId] = useState(null);
  const [state, setState] = useState(() => loadState());
  const [galaxy, setGalaxy] = useState(() => loadGalaxy());
  const [askOpen, setAskOpen] = useState(false);
  const [toolBoot, setToolBoot] = useState(null);
  const [ready, setReady] = useState(() => Boolean(loadState()._seenGate));

  useEffect(() => {
    setLangLocal(language === "ku" ? "ku" : "en");
  }, [language]);

  function setLang(next) {
    setLangLocal(next);
    setLanguage(next);
  }

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    setState((s) => ({
      ...s,
      visitCount: (s.visitCount || 0) + 1,
      lastOpen: Date.now(),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback((partial) => {
    setState((s) => ({ ...s, ...partial }));
  }, []);

  function handleNameDone(name) {
    update({ name, _seenGate: true });
    setReady(true);
  }

  function navigate(nextTab, nextTopic = null) {
    if (nextTab === "learn" && nextTopic) {
      setTopicId(nextTopic);
      setTab("learn");
      return;
    }
    if (nextTab !== "learn") setTopicId(null);
    setTab(nextTab);
  }

  function openTopic(id) {
    setTopicId(id);
    setTab("learn");
  }

  function handleMood(mood) {
    if (mood === null) {
      update({ mood: null, moodDate: null });
      return;
    }
    const day = dateKey();
    const history = [...(state.moodHistory || []), { mood, day, at: Date.now() }].slice(-60);
    const nextState = {
      ...state,
      mood,
      moodDate: day,
      moodHistory: history,
    };
    const plan = moodHomePlan(mood, lang, nextState);
    update({
      mood,
      moodDate: day,
      moodHistory: history,
      preferredTool: plan.first,
    });
    setGalaxy(addGalaxyStar(mood));
  }

  if (!ready) {
    return <NameGate lang={lang} setLang={setLang} onDone={handleNameDone} />;
  }

  function render() {
    switch (tab) {
      case "home":
        return (
          <Home
            lang={lang}
            state={state}
            onMood={handleMood}
            onNavigate={navigate}
            onAsk={() => setAskOpen(true)}
            onOpenTool={(id) => {
              setToolBoot(id);
              setTab("tools");
            }}
          />
        );
      case "tools":
        return (
          <Tools
            lang={lang}
            initialTool={toolBoot}
            onClearInitial={() => setToolBoot(null)}
          />
        );
      case "learn":
        return (
          <Learn
            lang={lang}
            topicId={topicId}
            onBack={() => navigate("discover")}
            onOpenTopic={openTopic}
          />
        );
      case "discover":
        return <Discover lang={lang} onOpenTopic={openTopic} />;
      case "track":
        return <Track lang={lang} galaxy={galaxy} />;
      case "journal":
        return <Journal lang={lang} />;
      case "community":
        return <Community lang={lang} />;
      default:
        return null;
    }
  }

  return (
    <>
      <Frame
        lang={lang}
        setLang={setLang}
        tab={tab === "learn" ? "discover" : tab}
        setTab={(id) => navigate(id)}
        mood={state.mood}
        darkMode={state.darkMode}
        onToggleDark={() => update({ darkMode: !state.darkMode })}
        onAsk={() => setAskOpen(true)}
      >
        {render()}
      </Frame>
      {askOpen && (
        <AskCompanion lang={lang} state={state} onClose={() => setAskOpen(false)} />
      )}
    </>
  );
}
