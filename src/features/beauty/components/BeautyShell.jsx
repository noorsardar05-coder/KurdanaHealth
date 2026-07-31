import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Sparkles,
  CalendarHeart,
  Library,
  FlaskConical,
  BookOpen,
  Compass,
  ArrowLeft,
  Globe2,
  PanelLeft,
} from "lucide-react";

const NAV = [
  { id: "beauty-home", icon: Home, labelKey: "navHome" },
  { id: "beauty-skin", icon: Sparkles, labelKey: "navSkin" },
  { id: "beauty-routine", icon: CalendarHeart, labelKey: "navRoutine" },
  { id: "beauty-shop", icon: Library, labelKey: "navShop" },
  { id: "beauty-ingredients", icon: FlaskConical, labelKey: "navIngredients" },
  { id: "beauty-journal", icon: BookOpen, labelKey: "navJournal" },
  { id: "beauty-discover", icon: Compass, labelKey: "navDiscover" },
];

export default function BeautyShell({
  t,
  lang,
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
    if (!el) return;
    if (root) {
      const top = el.offsetTop - 12;
      root.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
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
        let current = sections[0]?.id || "beauty-home";
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
    <div className={`bt-shell ${sidebarOpen ? "is-sidebar-open" : ""}`}>
      <aside className="bt-sidebar glass" aria-label={t("title")}>
        <button
          type="button"
          className="bt-sidebar-toggle"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-expanded={sidebarOpen}
          aria-label={t("sidebarToggle")}
        >
          <PanelLeft size={18} strokeWidth={1.75} />
        </button>
        <div className="bt-sidebar__brand">
          <p className="bt-sidebar__badge">{t("brandBadge")}</p>
          <h1 className="bt-sidebar__title">{t("title")}</h1>
        </div>
        <nav className="bt-sidebar__nav">
          {NAV.map(({ id, icon: Icon, labelKey }) => (
            <button
              key={id}
              type="button"
              className={`bt-sidebar__link ${activeSection === id ? "is-active" : ""}`}
              onClick={() => scrollTo(id)}
              aria-current={activeSection === id ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>{t(labelKey)}</span>
            </button>
          ))}
        </nav>
        <Link to="/dashboard" className="bt-sidebar__back">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>{t("backDashboard")}</span>
        </Link>
      </aside>

      <div className="bt-main" ref={mainRef} id="bt-main-scroll">
        <div className="bt-main__inner">
          <header className="bt-topbar">
            <button
              type="button"
              className="bt-icon-btn"
              onClick={onToggleLang}
              aria-label={t("settingsLang")}
              title={t("settingsLang")}
            >
              <Globe2 size={18} strokeWidth={1.75} />
            </button>
          </header>
          <div className="bt-main__content">{children}</div>
        </div>
      </div>

      <nav className="bt-bottom-nav glass" aria-label="Beauty navigation">
        {NAV.map(({ id, icon: Icon, labelKey }) => (
          <button
            key={id}
            type="button"
            className={`bt-bottom-nav__btn ${activeSection === id ? "is-active" : ""}`}
            onClick={() => scrollTo(id)}
            aria-current={activeSection === id ? "page" : undefined}
          >
            <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
            <span>{t(labelKey)}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
