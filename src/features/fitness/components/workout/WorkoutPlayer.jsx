import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { secPerExercise } from "../../utils/exerciseHelpers.js";
import { confettiLarge, confettiSmall } from "../../utils/confettiManager.js";
import ProgressBar from "./ProgressBar.jsx";
import ExerciseMediaPlayer from "./ExerciseMediaPlayer.jsx";
import ExerciseInfoBar from "./ExerciseInfoBar.jsx";
import CoachPanel from "./CoachPanel.jsx";
import RestScreen from "./RestScreen.jsx";
import WorkoutComplete from "./WorkoutComplete.jsx";
import WorkoutTimer, { formatTimer } from "./WorkoutTimer.jsx";
import "../../workout-player.css";

const REST_SEC = 15;

export default function WorkoutPlayer({
  open,
  plan,
  lang,
  t,
  progress,
  onClose,
  onComplete,
  playSound,
  clickSound,
  soundOn,
  toggleSound,
}) {
  const rootRef = useRef(null);
  const startedRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("active");
  const [paused, setPaused] = useState(false);
  const [exLeft, setExLeft] = useState(0);
  const [restLeft, setRestLeft] = useState(REST_SEC);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const [restSessionId, setRestSessionId] = useState(0);

  const list = plan?.list || [];
  const ex = list[index];
  const nextEx = list[index + 1];
  const exDuration = ex ? secPerExercise(ex) : 45;

  const reset = useCallback(() => {
    if (!list.length) return;
    setIndex(0);
    setPhase("active");
    setPaused(false);
    setDone(false);
    setTotalElapsed(0);
    setRestLeft(REST_SEC);
    setRestSessionId(0);
    setExLeft(secPerExercise(list[0]));
    startedRef.current = false;
  }, [list]);

  useEffect(() => {
    if (open && list.length) reset();
  }, [open, plan, reset, list.length]);

  useEffect(() => {
    if (!open || startedRef.current) return;
    startedRef.current = true;
    playSound?.("startWorkout");
    confettiSmall(rootRef.current);
  }, [open, playSound]);

  useEffect(() => {
    if (!open || paused || done) return;
    if (phase === "active" && ex) {
      const id = setInterval(() => {
        setExLeft((v) => (v <= 1 ? 0 : v - 1));
        setTotalElapsed((v) => v + 1);
      }, 1000);
      return () => clearInterval(id);
    }
    if (phase === "rest") {
      const id = setInterval(() => {
        setRestLeft((v) => (v <= 1 ? 0 : v - 1));
        setTotalElapsed((v) => v + 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [open, paused, done, phase, ex]);

  const goRest = useCallback(() => {
    playSound?.("restStart");
    setPhase("rest");
    setRestLeft(REST_SEC);
    setRestSessionId((id) => id + 1);
    confettiSmall(rootRef.current);
  }, [playSound]);

  const finishWorkout = useCallback(() => {
    setDone(true);
    playSound?.("workoutComplete");
    confettiLarge(rootRef.current);
  }, [playSound]);

  const advance = useCallback(() => {
    playSound?.("exerciseDone");
    if (index < list.length - 1) goRest();
    else finishWorkout();
  }, [index, list.length, goRest, finishWorkout, playSound]);

  useEffect(() => {
    if (!open || done || phase !== "active" || !ex) return;
    if (exLeft === 0) advance();
  }, [exLeft, open, done, phase, ex, advance]);

  useEffect(() => {
    if (!open || done || phase !== "rest") return;
    if (restLeft === 0) {
      playSound?.("restEnd");
      const n = index + 1;
      setIndex(n);
      setExLeft(secPerExercise(list[n]));
      setPhase("active");
    }
  }, [restLeft, open, done, phase, index, list, playSound]);

  const skipRest = () => {
    clickSound?.();
    playSound?.("restEnd");
    const n = index + 1;
    if (n < list.length) {
      setIndex(n);
      setExLeft(secPerExercise(list[n]));
      setPhase("active");
    }
  };

  const nextEarly = () => {
    clickSound?.();
    advance();
  };

  const projectedPoints = Math.round(Math.max(1, Math.round(totalElapsed / 60)) * 2 + 10);
  const projectedStreak = (() => {
    const p = progress || {};
    if (!p.lastWorkoutDate) return 1;
    const last = new Date(p.lastWorkoutDate);
    const diff = Math.floor((Date.now() - last.getTime()) / 86400000);
    return diff <= 1 ? (p.streak || 0) + 1 : 1;
  })();

  const handleSave = () => {
    clickSound?.();
    onComplete({
      minutes: Math.max(1, Math.round(totalElapsed / 60)),
      calories: plan?.caloriesEstimate || 0,
    });
    onClose();
  };

  if (!open) return null;

  const overallPct = list.length
    ? ((index + (phase === "rest" ? 0.5 : 1 - exLeft / Math.max(exDuration, 1))) / list.length) * 100
    : 0;

  return (
    <div className="wp-root" ref={rootRef} role="dialog" aria-modal="true">
      <header className="wp-header">
        <button type="button" className="wp-icon-btn" onClick={() => { clickSound?.(); onClose(); }} aria-label={t("close")}>
          <X size={22} />
        </button>

        <div className="wp-header__center">
          <span className="wp-header__progress-label">
            {t("exerciseOf")}{" "}
            {phase === "rest" ? index + 2 : index + 1} / {list.length}
          </span>
          <ProgressBar value={overallPct} className="wp-header__bar" />
        </div>

        <button
          type="button"
          className="wp-icon-btn"
          onClick={() => { clickSound?.(); toggleSound?.(); }}
          aria-label={soundOn ? t("soundOff") : t("soundOn")}
        >
          {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </header>

      <main className="wp-main">
        <AnimatePresence mode="wait">
          {done ? (
            <WorkoutComplete
              key="complete"
              t={t}
              totalElapsed={totalElapsed}
              calories={plan?.caloriesEstimate || 0}
              pointsEarned={projectedPoints}
              streak={projectedStreak}
              onSave={handleSave}
            />
          ) : phase === "rest" ? (
            <RestScreen
              key={`rest-${restSessionId}`}
              t={t}
              lang={lang}
              restLeft={restLeft}
              restSessionId={restSessionId}
              nextExercise={nextEx}
              paused={paused}
              onSkip={skipRest}
              onTogglePause={() => { clickSound?.(); setPaused((p) => !p); }}
            />
          ) : (
            <div key={`ex-${index}`} className="wp-session">
              <section className="wp-media-section">
                <ExerciseMediaPlayer exercise={ex} />
                <div className="wp-media-overlay">
                  <WorkoutTimer seconds={exLeft} label={t("exerciseTimer")} size="lg" accent="light" />
                </div>
              </section>

              <section className="wp-details">
                <ExerciseInfoBar exercise={ex} lang={lang} t={t} />
                <CoachPanel exercise={ex} lang={lang} t={t} />
                {nextEx && (
                  <div className="wp-up-next">
                    <span className="wp-up-next__label">{t("upNext")}</span>
                    <span className="wp-up-next__name">
                      {lang === "ku" ? nextEx.nameKu || nextEx.nameEn : nextEx.nameEn}
                    </span>
                  </div>
                )}
              </section>
            </div>
          )}
        </AnimatePresence>
      </main>

      {!done && phase === "active" && (
        <footer className="wp-controls">
          <button
            type="button"
            className="wp-ctrl"
            disabled={index === 0}
            onClick={() => {
              clickSound?.();
              const p = index - 1;
              setIndex(p);
              setExLeft(secPerExercise(list[p]));
            }}
          >
            <ChevronLeft size={24} />
            <span>{t("previous")}</span>
          </button>

          <button
            type="button"
            className="wp-ctrl wp-ctrl--primary"
            onClick={() => { clickSound?.(); setPaused((p) => !p); }}
          >
            {paused ? <Play size={26} /> : <Pause size={26} />}
            <span>{paused ? t("resume") : t("pause")}</span>
          </button>

          <button type="button" className="wp-ctrl" onClick={nextEarly}>
            <ChevronRight size={24} />
            <span>{index < list.length - 1 ? t("next") : t("completeEx")}</span>
          </button>

          <button type="button" className="wp-finish" onClick={() => { clickSound?.(); finishWorkout(); }}>
            {t("finishWorkout")}
          </button>

          <span className="wp-total-elapsed">{t("totalTimer")}: {formatTimer(totalElapsed)}</span>
        </footer>
      )}
    </div>
  );
}
