import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import { ArrowLeft, Sparkles } from "lucide-react";



export default function FitnessOnboarding({ t, onStartQuiz }) {

  return (

    <div className="ft-onboard">

      <header className="ft-onboard__header">

        <Link to="/dashboard" className="ft-onboard__back">

          <ArrowLeft size={16} />

          {t("backDashboard")}

        </Link>

      </header>



      <motion.main

        className="ft-onboard__main glass"

        initial={{ opacity: 0, y: 24 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}

      >

        <span className="ft-onboard__icon" aria-hidden="true">

          <Sparkles size={32} strokeWidth={1.5} />

        </span>

        <p className="ft-onboard__badge">{t("brandBadge")}</p>

        <h1 className="ft-onboard__title">{t("onboardTitle")}</h1>

        <p className="ft-onboard__desc">{t("onboardDesc")}</p>



        <ul className="ft-onboard__steps">

          <li>{t("onboardStep1")}</li>

          <li>{t("onboardStep2")}</li>

          <li>{t("onboardStep3")}</li>

        </ul>



        <motion.button

          type="button"

          className="ft-btn ft-btn--hero ft-onboard__cta"

          onClick={onStartQuiz}

          whileHover={{ scale: 1.02, y: -1 }}

          whileTap={{ scale: 0.98 }}

        >

          {t("startFitnessQuiz")}

        </motion.button>



        <p className="ft-onboard__hint">{t("onboardHint")}</p>

      </motion.main>

    </div>

  );

}


