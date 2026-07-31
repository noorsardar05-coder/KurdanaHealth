export default function IntroHero({ title, subtitle, byline, kurdishLayout = false }) {
  return (
    <section
      className={`welcome-hero relative overflow-hidden rounded-[2.75rem] border border-white/80 bg-gradient-to-br from-sky-100/90 via-white to-rose-100/80 px-6 py-14 shadow-soft backdrop-blur-sm sm:px-12 sm:py-20 ${kurdishLayout ? "font-ku" : ""}`}
      dir={kurdishLayout ? "rtl" : "ltr"}
      lang={kurdishLayout ? "ku" : "en"}
    >
      <div className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-sky-300/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-52 w-52 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="welcome-hero-inner relative text-center">
        <h1
          className={`welcome-title text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl md:text-6xl ${kurdishLayout ? "leading-[1.35]" : ""}`}
        >
          {title}
        </h1>
        <p
          className={`welcome-subtitle mt-6 text-xl font-semibold text-slate-700 sm:text-2xl ${kurdishLayout ? "leading-[1.75]" : ""}`}
        >
          {subtitle}
        </p>
        <p
          className={`welcome-byline mt-7 text-base text-slate-500 sm:text-lg ${kurdishLayout ? "leading-[1.8]" : ""}`}
        >
          {byline}
        </p>
      </div>
    </section>
  );
}
