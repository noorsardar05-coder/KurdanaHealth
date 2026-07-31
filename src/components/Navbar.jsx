import { Link } from "react-router-dom";

export default function Navbar({
  title,
  authorLabel,
  logoutLabel,
  onLogout,
  language = "en",
  onLanguageToggle,
  langToggleAria,
  langLabelEnglish = "English",
  langLabelKurdish = "کوردی",
}) {
  const isKu = language === "ku";

  return (
    <header
      className="sticky top-0 z-20 border-b border-black/[0.06] bg-white/80 backdrop-blur-md"
      dir={isKu ? "rtl" : "ltr"}
    >
      <div className="app-container flex items-center justify-between py-4">
        <div
          className="flex min-w-0 flex-col items-start"
          dir={isKu ? "rtl" : "ltr"}
          lang={isKu ? "ku" : "en"}
        >
          <Link
            to="/dashboard"
            className={`text-lg font-bold text-slate-800 ${isKu ? "font-ku tracking-normal" : ""}`}
          >
            {title}
          </Link>
          {authorLabel ? (
            <span className="mt-0.5 text-[0.85rem] font-normal italic text-[#6b7280]">
              {authorLabel}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {typeof onLanguageToggle === "function" && (
            <button
              type="button"
              onClick={onLanguageToggle}
              aria-label={langToggleAria || "Switch language"}
              className="flex items-center gap-1.5 rounded-2xl border border-white/90 bg-gradient-to-br from-sky-100/90 to-pastel-blue/50 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition duration-200 ease-out hover:from-sky-200/95 hover:to-pastel-blue/70 hover:shadow-card active:scale-[0.98]"
            >
              <span
                className={`rounded-lg px-1.5 py-0.5 transition-colors ${language === "en" ? "bg-white/90 text-slate-900 shadow-sm" : "text-slate-500"}`}
              >
                {langLabelEnglish}
              </span>
              <span className="text-slate-400" aria-hidden>
                |
              </span>
              <span
                className={`rounded-lg px-1.5 py-0.5 font-ku transition-colors ${language === "ku" ? "bg-white/90 text-slate-900 shadow-sm" : "text-slate-500"}`}
              >
                {langLabelKurdish}
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={onLogout}
            className={`rounded-2xl bg-pastel-pink px-4 py-2 text-sm font-semibold text-slate-800 shadow-card transition hover:brightness-95 ${isKu ? "font-ku" : ""}`}
            dir={isKu ? "rtl" : "ltr"}
          >
            {logoutLabel}
          </button>
        </div>
      </div>
    </header>
  );
}
