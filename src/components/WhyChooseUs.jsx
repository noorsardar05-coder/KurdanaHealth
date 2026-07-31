export default function WhyChooseUs({ text, language = "en" }) {
  const isKu = language === "ku";

  return (
    <section className="mt-14">
      <h2 className={`text-2xl font-bold text-slate-800 ${isKu ? "leading-[1.55]" : ""}`}>
        {text.whyChooseUs}
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <article className="rounded-3xl border border-white/70 bg-pastel-green/35 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-slate-800">{text.reason1}</h3>
          <p
            className={`mt-2 text-sm text-slate-700 ${isKu ? "leading-[1.85]" : "leading-relaxed"}`}
          >
            {text.reason1Desc}
          </p>
        </article>
        <article className="rounded-3xl border border-white/70 bg-pastel-blue/35 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-slate-800">{text.reason2}</h3>
          <p
            className={`mt-2 text-sm text-slate-700 ${isKu ? "leading-[1.85]" : "leading-relaxed"}`}
          >
            {text.reason2Desc}
          </p>
        </article>
        <article className="rounded-3xl border border-white/70 bg-pastel-pink/40 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-slate-800">{text.reason3}</h3>
          <p
            className={`mt-2 text-sm text-slate-700 ${isKu ? "leading-[1.85]" : "leading-relaxed"}`}
          >
            {text.reason3Desc}
          </p>
        </article>
      </div>
    </section>
  );
}
