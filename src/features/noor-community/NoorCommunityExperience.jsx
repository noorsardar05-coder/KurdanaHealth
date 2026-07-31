import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import Frame from "./components/Frame.jsx";
import Home from "./components/Home.jsx";
import WeeklyDiseaseExperience from "./components/WeeklyDiseaseExperience.jsx";
import QuizView from "./components/QuizView.jsx";
import Archive from "./components/Archive.jsx";
import { WEEKLY_DISEASES, getDiseaseById } from "./data/weeklyDiseases/index.js";
import { pickCurrentDisease } from "./utils/week.js";
import { loadNoorState } from "./utils/storage.js";
import "./noor.css";

export default function NoorCommunityExperience() {
  const { language, setLanguage } = useLanguage();
  const lang = language === "ku" ? "ku" : "en";

  const [tab, setTab] = useState("home");
  const [view, setView] = useState("home"); // home | lesson | quiz | archive
  const [activeId, setActiveId] = useState(null);
  const [state, setState] = useState(() => loadNoorState());

  const current = useMemo(() => pickCurrentDisease(WEEKLY_DISEASES), []);
  const active = activeId ? getDiseaseById(activeId) : current;

  useEffect(() => {
    if (current && !activeId) setActiveId(current.id);
  }, [current, activeId]);

  const setLang = useCallback(
    (next) => {
      setLanguage(next === "ku" ? "ku" : "en");
    },
    [setLanguage]
  );

  function openLesson(id) {
    setActiveId(id || current?.id);
    setView("lesson");
    setTab("discover");
  }

  function openQuiz(id) {
    setActiveId(id || active?.id || current?.id);
    setView("quiz");
    setTab("discover");
  }

  function openArchive() {
    setView("archive");
    setTab("archive");
  }

  function goHome() {
    setView("home");
    setTab("home");
    if (current) setActiveId(current.id);
  }

  function handleTab(next) {
    setTab(next);
    if (next === "home") {
      setView("home");
      if (current) setActiveId(current.id);
    } else if (next === "discover") {
      setActiveId(current?.id);
      setView("lesson");
    } else if (next === "archive") {
      setView("archive");
    }
  }

  let body = null;
  if (view === "lesson" && active) {
    body = (
      <WeeklyDiseaseExperience
        lang={lang}
        disease={active}
        state={state}
        setState={setState}
        onQuiz={() => openQuiz(active.id)}
        onBack={goHome}
      />
    );
  } else if (view === "quiz" && active) {
    body = (
      <QuizView
        lang={lang}
        disease={active}
        state={state}
        setState={setState}
        onBack={() => openLesson(active.id)}
        onHome={goHome}
      />
    );
  } else if (view === "archive") {
    body = (
      <Archive
        lang={lang}
        all={WEEKLY_DISEASES}
        currentId={current?.id}
        state={state}
        onOpen={openLesson}
      />
    );
  } else {
    body = (
      <Home
        lang={lang}
        current={current}
        all={WEEKLY_DISEASES}
        state={state}
        onStart={() => openLesson(current?.id)}
        onArchive={openArchive}
        onOpenDisease={openLesson}
      />
    );
  }

  return (
    <Frame lang={lang} setLang={setLang} tab={tab} setTab={handleTab}>
      {body}
    </Frame>
  );
}
