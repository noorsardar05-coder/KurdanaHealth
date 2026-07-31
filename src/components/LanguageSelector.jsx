export default function LanguageSelector({
  title,
  englishLabel,
  soraniLabel,
  onSelect,
  kurdishLayout = false,
}) {
  return (
    <section
      className={`welcome-lang relative mt-10 rounded-[2.75rem] border border-white/80 bg-white/85 p-7 shadow-card backdrop-blur-md sm:mt-12 sm:p-10 ${kurdishLayout ? "font-ku" : ""}`}
      dir={kurdishLayout ? "rtl" : "ltr"}
      lang={kurdishLayout ? "ku" : "en"}
    >
      <h2
        className={`text-center text-lg font-semibold text-slate-700 sm:text-xl ${kurdishLayout ? "leading-[1.75]" : ""}`}
      >
        {title}
      </h2>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onSelect("en")}
          className="welcome-lang-btn rounded-[1.35rem] bg-gradient-to-br from-sky-200/90 to-pastel-blue/80 px-8 py-5 text-lg font-semibold text-slate-800 shadow-card transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:brightness-[1.02] active:translate-y-0 active:scale-[0.99] sm:text-xl"
        >
          {englishLabel}
        </button>
        <button
          type="button"
          onClick={() => onSelect("ku")}
          className="welcome-lang-btn rounded-[1.35rem] bg-gradient-to-br from-rose-200/90 to-pastel-pink/80 px-8 py-5 text-lg font-semibold text-slate-800 shadow-card transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:brightness-[1.02] active:translate-y-0 active:scale-[0.99] sm:text-xl"
        >
          {soraniLabel}
        </button>
      </div>
    </section>
  );
}
