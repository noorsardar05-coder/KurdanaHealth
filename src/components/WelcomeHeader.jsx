export default function WelcomeHeader({ text, name, language = "en" }) {
  const isKu = language === "ku";

  return (
    <section
      className={`relative isolate ${isKu ? "font-ku" : ""}`}
      dir={isKu ? "rtl" : "ltr"}
      lang={isKu ? "ku" : "en"}
    >
      <div className="relative isolate">
        <div
          className="welcome-glow-zone pointer-events-none absolute -inset-3 -z-10 rounded-[22px] sm:-inset-4"
          aria-hidden
        />
        <div
          className={`relative rounded-[20px] bg-white px-6 py-10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:px-10 ${isKu ? "text-center" : ""}`}
        >
          <h1
            className={`text-3xl font-bold text-slate-800 sm:text-4xl ${isKu ? "leading-[1.45] tracking-normal" : ""}`}
          >
            {text.welcome}, {name}
          </h1>
          <p
            className={`mt-3 text-base text-slate-700 ${isKu ? "text-lg leading-[1.85] text-slate-800" : ""}`}
          >
            {text.thankYou}
          </p>
        </div>
      </div>
      <p
        className={`mx-auto mt-10 mb-2 max-w-2xl text-center text-[#666666] sm:mt-14 sm:mb-6 ${isKu ? "font-ku text-xl italic leading-[1.9] sm:text-2xl sm:leading-[1.95]" : "text-lg italic leading-relaxed sm:text-xl sm:leading-[1.85]"}`}
      >
        {text.quote}
      </p>
    </section>
  );
}
