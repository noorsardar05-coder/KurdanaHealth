import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ClipboardList,
  UtensilsCrossed,
  BookOpen,
  Droplets,
  GraduationCap,
  Compass,
  ArrowLeft,
  Globe2,
  PanelLeft,
} from "lucide-react";

const NAV = [
  { id: "nutrition-home", icon: Home, labelKey: "navHome" },
  { id: "nutrition-plan", icon: ClipboardList, labelKey: "navPlan" },
  { id: "nutrition-meals", icon: UtensilsCrossed, labelKey: "navMeals" },
  { id: "nutrition-recipes", icon: BookOpen, labelKey: "navRecipes" },
  { id: "nutrition-tracker", icon: Droplets, labelKey: "navTracker" },
  { id: "nutrition-learn", icon: GraduationCap, labelKey: "navLearn" },
  { id: "nutrition-discover", icon: Compass, labelKey: "navDiscover" },
];

export default function NutritionShell({
  t,
  onToggleLang,
  activeSection,
  onNavigate,
  children,
}) {
  const mainRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollTo = (id) => {
    onNavigate?.(id);
    const root = mainRef.current;
    const el = document.getElementById(id);
    if (el && root) {
      root.scrollTo({ top: Math.max(0, el.offsetTop - 12), behavior: "smooth" });
    } else {
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return undefined;
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const anchor = root.scrollTop + 96;
        let current = sections[0]?.id || "nutrition-home";
        for (const section of sections) {
          if (section.offsetTop <= anchor) current = section.id;
        }
        onNavigate?.(current);
      });
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("scroll", onScroll);
    };
  }, [onNavigate]);

  return (
    <div className={`nu-shell ${sidebarOpen ? "is-sidebar-open" : ""}`}>
      <aside className="nu-sidebar" aria-label={t("title")}>
        <button
          type="button"
          className="nu-sidebar-toggle"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-expanded={sidebarOpen}
          aria-label={t("sidebarToggle")}
        >
          <PanelLeft size={18} strokeWidth={1.75} />
        </button>
        <div className="nu-sidebar__brand">
          <p className="nu-sidebar__badge">{t("brandBadge")}</p>
          <h1 className="nu-sidebar__title">{t("title")}</h1>
        </div>
        <nav className="nu-sidebar__nav">
          {NAV.map(({ id, icon: Icon, labelKey }) => (
            <button
              key={id}
              type="button"
              className={`nu-sidebar__link ${activeSection === id ? "is-active" : ""}`}
              onClick={() => scrollTo(id)}
              aria-current={activeSection === id ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>{t(labelKey)}</span>
            </button>
          ))}
        </nav>
        <Link to="/dashboard" className="nu-sidebar__back">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>{t("backDashboard")}</span>
        </Link>
      </aside>

      <div className="nu-main" ref={mainRef} id="nu-main-scroll">
        <div className="nu-main__inner">
          <header className="nu-topbar">
            <button
              type="button"
              className="nu-icon-btn"
              onClick={onToggleLang}
              aria-label={t("settingsLang")}
              title={t("settingsLang")}
            >
              <Globe2 size={18} strokeWidth={1.75} />
            </button>
          </header>
          <div className="nu-main__content">{children}</div>
        </div>
      </div>

      <nav className="nu-bottom-nav" aria-label="Nutrition navigation">
        {NAV.map(({ id, icon: Icon, labelKey }) => (
          <button
            key={id}
            type="button"
            className={`nu-bottom-nav__btn ${activeSection === id ? "is-active" : ""}`}
            onClick={() => scrollTo(id)}
            aria-current={activeSection === id ? "page" : undefined}
          >
            <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>{t(labelKey)}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
