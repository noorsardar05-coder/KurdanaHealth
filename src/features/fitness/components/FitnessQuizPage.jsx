import { Link } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import FitnessQuiz from "./FitnessQuiz.jsx";



export default function FitnessQuizPage({

  t,

  onBack,

  step,

  answers,

  onSelect,

  onNext,

  onBackStep,

  onFinish,

  onClickSound,

}) {

  return (

    <div className="ft-quiz-page">

      <header className="ft-quiz-page__header">

        <button type="button" className="ft-onboard__back" onClick={onBack}>

          <ArrowLeft size={16} />

          {t("quizBack")}

        </button>

        <div className="ft-quiz-page__actions">

          <Link to="/dashboard" className="ft-btn ft-btn--ghost">

            {t("backDashboard")}

          </Link>

        </div>

      </header>



      <FitnessQuiz

        t={t}

        step={step}

        answers={answers}

        completed={false}

        flowMode

        onSelect={onSelect}

        onNext={onNext}

        onBack={onBackStep}

        onFinish={onFinish}

        onClickSound={onClickSound}

      />

    </div>

  );

}


