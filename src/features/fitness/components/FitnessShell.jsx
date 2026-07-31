import { Link } from "react-router-dom";

import {

  LayoutDashboard,

  CalendarCheck,

  Dumbbell,

  BarChart3,

  Library,

  Volume2,

  VolumeX,

  ArrowLeft,

} from "lucide-react";



const NAV = [

  { id: "fitness-hero", icon: LayoutDashboard, labelKey: "navHero" },

  { id: "fitness-plan", icon: CalendarCheck, labelKey: "navPlan" },

  { id: "fitness-workout", icon: Dumbbell, labelKey: "navWorkout" },

  { id: "fitness-progress", icon: BarChart3, labelKey: "navProgress" },

  { id: "fitness-library", icon: Library, labelKey: "navLibrary" },

];



export default function FitnessShell({

  t,

  soundOn,

  onToggleSound,

  activeSection,

  onNavigate,

  onStartWorkout,

  children,

}) {

  const scrollTo = (id) => {

    if (id === "fitness-workout") {

      onStartWorkout?.();

      return;

    }

    onNavigate?.(id);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  };



  return (

    <div className="ft-shell">

      <aside className="ft-sidebar glass">

        <div className="ft-sidebar__brand">

          <p className="ft-sidebar__badge">{t("brandBadge")}</p>

          <h1 className="ft-sidebar__title">{t("title")}</h1>

        </div>

        <nav className="ft-sidebar__nav">

          {NAV.map(({ id, icon: Icon, labelKey }) => (

            <button

              key={id}

              type="button"

              className={`ft-sidebar__link ${activeSection === id ? "is-active" : ""}`}

              onClick={() => scrollTo(id)}

            >

              <Icon size={18} strokeWidth={1.75} />

              {t(labelKey)}

            </button>

          ))}

        </nav>

        <div className="ft-sidebar__foot">

          <Link to="/dashboard" className="ft-sidebar__back">

            <ArrowLeft size={16} />

            {t("backDashboard")}

          </Link>

        </div>

      </aside>



      <div className="ft-main">

        <header className="ft-topbar">

          <div className="ft-topbar__actions">

            <button

              type="button"

              className="ft-icon-btn"

              onClick={onToggleSound}

              aria-pressed={soundOn}

              aria-label={soundOn ? t("soundOn") : t("soundOff")}

              title={soundOn ? t("soundOn") : t("soundOff")}

            >

              {soundOn ? <Volume2 size={18} strokeWidth={1.75} /> : <VolumeX size={18} strokeWidth={1.75} />}

            </button>

          </div>

        </header>

        <div className="ft-main__content">{children}</div>

      </div>



      <nav className="ft-bottom-nav glass" aria-label="Mobile navigation">

        {NAV.map(({ id, icon: Icon, labelKey }) => (

          <button

            key={id}

            type="button"

            className={`ft-bottom-nav__btn ${activeSection === id ? "is-active" : ""}`}

            onClick={() => scrollTo(id)}

          >

            <Icon size={20} strokeWidth={1.75} />

            <span>{t(labelKey)}</span>

          </button>

        ))}

      </nav>

    </div>

  );

}


