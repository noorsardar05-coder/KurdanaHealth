import { useCallback, useEffect, useMemo, useState, lazy, Suspense } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { FITNESS_I18N } from "./i18n/fitnessStrings.js";

import { useExercises } from "./hooks/useExercises.js";

import { useFitnessSounds } from "./hooks/useFitnessSounds.js";

import {

  loadProgress,

  saveProgress,

  loadQuiz,

  saveQuiz,

  loadDailyPlan,

  saveDailyPlan,

  saveSavedPlan,

  loadReminder,

  saveReminder,

  clearReminder,

  appendWorkoutLog,

  loadWorkoutLogs,

} from "./utils/storage.js";

import { buildWorkoutPlan, hydrateSavedPlan } from "./utils/planGenerator.js";

import { caloriesForExercise } from "./utils/exerciseHelpers.js";

import { hasVerifiedExerciseMedia } from "../../data/exerciseMedia.js";

import { evaluateBadges } from "./data/badges.js";
import { burstConfetti } from "./utils/confetti.js";
import { getUser } from "../../utils/storage.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

import FitnessShell from "./components/FitnessShell.jsx";

import FitnessOnboarding from "./components/FitnessOnboarding.jsx";

import FitnessQuizPage from "./components/FitnessQuizPage.jsx";

import HeroDashboard from "./components/HeroDashboard.jsx";

import SmartPlanPanel from "./components/SmartPlanPanel.jsx";

import ExerciseLibrary from "./components/ExerciseLibrary.jsx";

const WorkoutPlayer = lazy(() => import("./components/workout/WorkoutPlayer.jsx"));

import ProgressPanel from "./components/ProgressPanel.jsx";

import QuickActions from "./components/QuickActions.jsx";

import FitnessRetakeQuiz from "./components/FitnessRetakeQuiz.jsx";

import "./fitness.css";

import "./fitness-premium.css";



const SECTION_IDS = [

  "fitness-hero",

  "fitness-plan",

  "fitness-progress",

  "fitness-library",

];



export default function FitnessExperience() {
  const { language, isRtl } = useLanguage();
  const lang = language === "ku" ? "ku" : "en";
  const { exercises, loading, count } = useExercises();

  const { soundOn, toggleSound, play, click } = useFitnessSounds();



  const t = useCallback((key) => FITNESS_I18N[lang]?.[key] ?? FITNESS_I18N.en[key] ?? key, [lang]);



  const initialQuiz = loadQuiz();

  const [view, setView] = useState(initialQuiz ? "dashboard" : "onboarding");

  const [progress, setProgress] = useState(() => loadProgress());

  const [quizAnswers, setQuizAnswers] = useState(() => initialQuiz);

  const [quizStep, setQuizStep] = useState(0);

  const [plan, setPlan] = useState(null);

  const [planSaved, setPlanSaved] = useState(false);

  const [workoutOpen, setWorkoutOpen] = useState(false);

  const [activeWorkoutPlan, setActiveWorkoutPlan] = useState(null);

  const [movedMsg, setMovedMsg] = useState("");

  const [reminderLabel, setReminderLabel] = useState(() => loadReminder().label);

  const [logs, setLogs] = useState(() => loadWorkoutLogs());

  const [activeSection, setActiveSection] = useState("fitness-hero");

  useEffect(() => {

    if (!exercises.length || !quizAnswers) return;

    const saved = loadDailyPlan();

    const hydrated = hydrateSavedPlan(saved, exercises, quizAnswers);

    if (hydrated) setPlan(hydrated);

    else {

      const built = buildWorkoutPlan(exercises, quizAnswers);

      setPlan(built);

      saveDailyPlan(built);

    }

  }, [exercises, quizAnswers]);



  useEffect(() => {

    if (view !== "dashboard") return;

    const onScroll = () => {

      const y = window.scrollY + window.innerHeight * 0.22;

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

  }, [view]);



  const goToDashboard = useCallback(() => {

    setView("dashboard");

    requestAnimationFrame(() => {

      window.scrollTo({ top: 0, behavior: "smooth" });

    });

  }, []);



  const regenerate = useCallback(

    (mode) => {

      if (!quizAnswers || !exercises.length) return;

      click();

      const built = buildWorkoutPlan(exercises, quizAnswers, { mode });

      setPlan(built);

      saveDailyPlan(built);

      setPlanSaved(false);

    },

    [quizAnswers, exercises, click]

  );



  const handleQuizSelect = (key, value) => {

    setQuizAnswers((prev) => ({ ...(prev || {}), [key]: value }));

  };



  const handleQuizFinish = useCallback(

    ({ restart } = {}) => {

      if (restart) {

        setQuizStep(0);

        setQuizAnswers({});

        setView("quiz");

        return;

      }

      const answers = { ...quizAnswers, limitations: quizAnswers?.limitations || ["none"] };

      saveQuiz(answers);

      setQuizAnswers(answers);

      const built = buildWorkoutPlan(exercises, answers);

      setPlan(built);

      saveDailyPlan(built);

      setQuizStep(0);

      setPlanSaved(false);

      play("badge");

      burstConfetti(document.body, "medium");

      goToDashboard();

    },

    [quizAnswers, exercises, play, goToDashboard]

  );



  const startRetakeQuiz = useCallback(() => {

    click();

    setQuizStep(0);

    setQuizAnswers(loadQuiz() || {});

    setView("quiz");

    window.scrollTo({ top: 0, behavior: "smooth" });

  }, [click]);



  const startQuizFromOnboarding = useCallback(() => {

    click();

    setQuizStep(0);

    setQuizAnswers({});

    setView("quiz");

  }, [click]);



  const handleWorkoutComplete = ({ minutes, calories }) => {

    const today = new Date().toISOString().slice(0, 10);

    const oldBadges = new Set(progress.badges || []);

    const p = { ...progress };

    p.workoutsCompleted += 1;

    p.totalMinutes += minutes;

    p.caloriesEstimate += calories;

    p.points += Math.round(minutes * 2 + 10);

    const dow = new Date().getDay();

    const idx = dow === 0 ? 6 : dow - 1;

    p.weeklyMinutes = [...p.weeklyMinutes];

    p.weeklyMinutes[idx] = (p.weeklyMinutes[idx] || 0) + minutes;

    if (p.lastWorkoutDate) {

      const last = new Date(p.lastWorkoutDate);

      const diff = Math.floor((Date.now() - last.getTime()) / 86400000);

      p.streak = diff <= 1 ? p.streak + 1 : 1;

    } else {

      p.streak = 1;

    }

    p.lastWorkoutDate = today;

    const entry = {

      date: today,

      minutes,

      exercises: (activeWorkoutPlan || plan)?.exerciseCount || 0,

      categories: (activeWorkoutPlan || plan)?.list?.map((e) => e.category) || [],

    };

    p.history = [entry, ...(p.history || [])].slice(0, 10);

    p.badges = evaluateBadges(p, entry);

    const newBadge = p.badges.some((b) => !oldBadges.has(b));

    if (newBadge) {

      play("badge");

      burstConfetti(document.body, "medium");

    }

    saveProgress(p);

    setProgress(p);

    appendWorkoutLog(entry);

    setLogs(loadWorkoutLogs());

  };



  const handleReminder = (val, label) => {

    click();

    if (val === "tomorrow") {

      const d = new Date();

      d.setDate(d.getDate() + 1);

      d.setHours(9, 0, 0, 0);

      saveReminder(label, d.getTime());

      setReminderLabel(label);

      return;

    }

    saveReminder(label, Date.now() + val * 1000);

    setReminderLabel(label);

  };



  const startWorkout = useCallback(

    (singleExercise) => {

      click();

      if (singleExercise) {

        if (!hasVerifiedExerciseMedia(singleExercise)) return;

        setActiveWorkoutPlan({

          list: [singleExercise],

          exerciseCount: 1,

          totalDuration: 1,

          caloriesEstimate: caloriesForExercise(singleExercise),

        });

      } else if (plan?.list?.length) {

        const supported = plan.list.filter((exercise) => hasVerifiedExerciseMedia(exercise));

        if (!supported.length) {

          startRetakeQuiz();

          return;

        }

        setActiveWorkoutPlan({ ...plan, list: supported, exerciseCount: supported.length });

      } else {

        if (quizAnswers?.goal) startRetakeQuiz();

        else setView("onboarding");

        return;

      }

      setWorkoutOpen(true);

    },

    [plan, click, startRetakeQuiz, quizAnswers]

  );



  const userName = useMemo(() => getUser()?.name || "", []);

  const exerciseCountLabel = useMemo(() => count || exercises.length, [count, exercises.length]);

  return (

    <div className={`ft-root ${isRtl ? "lang-ku" : "lang-en"}`} dir={isRtl ? "rtl" : "ltr"} lang={lang}>

      <div className="ft-bg" aria-hidden="true" />



      <AnimatePresence mode="wait">

        {view === "onboarding" && (

          <motion.div

            key="onboarding"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            transition={{ duration: 0.3 }}

          >

            <FitnessOnboarding
              t={t}
              onStartQuiz={startQuizFromOnboarding}
            />

          </motion.div>

        )}



        {view === "quiz" && (

          <motion.div

            key="quiz"

            initial={{ opacity: 0, x: 20 }}

            animate={{ opacity: 1, x: 0 }}

            exit={{ opacity: 0, x: -20 }}

            transition={{ duration: 0.35 }}

          >

            <FitnessQuizPage
              t={t}
              onBack={() => setView(quizAnswers?.goal || loadQuiz() ? "dashboard" : "onboarding")}

              step={quizStep}

              answers={quizAnswers}

              onSelect={handleQuizSelect}

              onNext={() => setQuizStep((s) => s + 1)}

              onBackStep={() => setQuizStep((s) => Math.max(0, s - 1))}

              onFinish={handleQuizFinish}

              onClickSound={click}

            />

          </motion.div>

        )}



        {view === "dashboard" && (

          <motion.div

            key="dashboard"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            transition={{ duration: 0.3 }}

          >

            <FitnessShell
              t={t}
              soundOn={soundOn}
              onToggleSound={toggleSound}

              activeSection={activeSection}

              onNavigate={setActiveSection}

              onStartWorkout={() => startWorkout()}

            >

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>

                <HeroDashboard

                  t={t}

                  lang={lang}

                  progress={progress}

                  plan={plan}

                  logs={logs}

                  userName={userName}

                  onStart={() => startWorkout()}

                  onRetake={startRetakeQuiz}

                />



                {plan && (

                  <QuickActions

                    t={t}

                    onAction={(mode) => regenerate(mode)}

                  />

                )}



                {loading ? (

                  <p className="ft-loading">{t("loadingExercises")}</p>

                ) : (

                  <>

                    <SmartPlanPanel

                      t={t}

                      lang={lang}

                      plan={plan}

                      saved={planSaved}

                      onStart={(ex) => startWorkout(ex)}

                      onSave={() => {

                        click();

                        saveSavedPlan(plan);

                        setPlanSaved(true);

                      }}

                    />



                    <ProgressPanel

                      t={t}

                      lang={lang}

                      progress={progress}

                      logs={logs}

                      movedMsg={movedMsg}

                      reminderLabel={reminderLabel}

                      onMovedYes={() => {

                        click();

                        const p = { ...progress, moveCheckins: progress.moveCheckins + 1, lastMovedUi: "yes" };

                        saveProgress(p);

                        setProgress(p);

                        setMovedMsg(t("movedYes"));

                        burstConfetti(document.body, "small");

                      }}

                      onMovedNo={() => {

                        click();

                        setMovedMsg(t("movedNo"));

                      }}

                      onReminder={handleReminder}

                      onCancelReminder={() => {

                        click();

                        clearReminder();

                        setReminderLabel("");

                      }}

                    />



                    <ExerciseLibrary

                      t={t}

                      lang={lang}

                      exercises={exercises}

                      loading={loading}

                      onStartExercise={(ex) => startWorkout(ex)}

                    />



                    <FitnessRetakeQuiz t={t} onRetake={startRetakeQuiz} />



                    <p className="ft-footer-note">

                      {exerciseCountLabel} {t("exercises")} · Kurdana Health

                    </p>

                  </>

                )}

              </motion.div>

            </FitnessShell>

          </motion.div>

        )}

      </AnimatePresence>



      <Suspense fallback={null}>

        <WorkoutPlayer

          open={workoutOpen}

          plan={activeWorkoutPlan || plan}

          lang={lang}

          t={t}

          progress={progress}

          playSound={play}

          clickSound={click}

          soundOn={soundOn}

          toggleSound={toggleSound}

          onClose={() => {

            setWorkoutOpen(false);

            setActiveWorkoutPlan(null);

          }}

          onComplete={handleWorkoutComplete}

        />

      </Suspense>

    </div>

  );

}


