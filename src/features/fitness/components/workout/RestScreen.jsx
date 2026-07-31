import { useMemo } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { Pause, Play, SkipForward } from "lucide-react";

import { REST_RECOVERY_QUOTES } from "../../i18n/fitnessStrings.js";

import { exName, exDetail } from "../../utils/exerciseHelpers.js";

import { CountdownRing } from "./WorkoutTimer.jsx";

import ExerciseMediaPlayer from "./ExerciseMediaPlayer.jsx";



const REST_TOTAL = 15;



function pickQuote(lang) {

  const quotes = REST_RECOVERY_QUOTES[lang] || REST_RECOVERY_QUOTES.en;

  return quotes[Math.floor(Math.random() * quotes.length)];

}



export default function RestScreen({

  t,

  lang,

  restLeft,

  restSessionId,

  nextExercise,

  paused,

  onSkip,

  onTogglePause,

}) {

  const quote = useMemo(() => pickQuote(lang), [lang, restSessionId]);



  return (

    <motion.div

      className="wp-rest"

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      exit={{ opacity: 0 }}

      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}

    >

      <div className="wp-rest__ambient" aria-hidden="true">

        <span className="wp-rest__orb wp-rest__orb--1" />

        <span className="wp-rest__orb wp-rest__orb--2" />

        <span className="wp-rest__orb wp-rest__orb--3" />

      </div>



      <div className="wp-rest__content">

        <motion.h2

          className="wp-rest__heading"

          initial={{ opacity: 0, y: 12 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: 0.08, duration: 0.4 }}

        >

          <span className="wp-rest__heading-icon" aria-hidden="true">🧘</span>

          {t("restRecoveryTitle")}

        </motion.h2>



        <motion.div

          className="wp-rest__timer-wrap"

          initial={{ opacity: 0, scale: 0.92 }}

          animate={{ opacity: 1, scale: 1 }}

          transition={{ delay: 0.14, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}

        >

          <CountdownRing seconds={restLeft} total={REST_TOTAL} size="xl" paused={paused}>

            <span className="wp-ring__num">{restLeft}</span>

            <span className="wp-ring__unit">{t("secUnit")}</span>

          </CountdownRing>

        </motion.div>



        <div className="wp-rest__quote-card">

          <AnimatePresence mode="wait">

            <motion.blockquote

              key={`${restSessionId}-${quote}`}

              className="wp-rest__quote"

              initial={{ opacity: 0, y: 8 }}

              animate={{ opacity: 1, y: 0 }}

              exit={{ opacity: 0, y: -8 }}

              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}

            >

              {quote}

            </motion.blockquote>

          </AnimatePresence>

        </div>



        <div className="wp-rest__brand">

          <span className="wp-rest__brand-line" aria-hidden="true" />

          <p className="wp-rest__brand-name">{t("restBrandName")}</p>

          <p className="wp-rest__brand-credit">{t("restCreatedBy")}</p>

          <span className="wp-rest__brand-line" aria-hidden="true" />

        </div>



        {nextExercise && (

          <motion.div

            className="wp-rest__upnext"

            initial={{ opacity: 0, y: 16 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: 0.28, duration: 0.45 }}

          >

            <span className="wp-rest__upnext-label">{t("upNext")}</span>

            <div className="wp-rest__upnext-card">

              <div className="wp-rest__thumb">

                <ExerciseMediaPlayer

                  exercise={nextExercise}

                  variant="thumbnail"

                />

              </div>

              <div className="wp-rest__upnext-info">

                <strong>{exName(nextExercise, lang)}</strong>

                <span>{exDetail(nextExercise, lang)}</span>

              </div>

            </div>

          </motion.div>

        )}



        <motion.div

          className="wp-rest__actions"

          initial={{ opacity: 0, y: 12 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: 0.34, duration: 0.4 }}

        >

          <button type="button" className="wp-btn wp-btn--primary wp-rest__skip" onClick={onSkip}>

            <SkipForward size={18} />

            {t("skipRest")}

          </button>

          <button type="button" className="wp-btn wp-btn--ghost wp-rest__pause" onClick={onTogglePause}>

            {paused ? <Play size={18} /> : <Pause size={18} />}

            {paused ? t("resume") : t("pauseWorkout")}

          </button>

        </motion.div>

      </div>

    </motion.div>

  );

}


