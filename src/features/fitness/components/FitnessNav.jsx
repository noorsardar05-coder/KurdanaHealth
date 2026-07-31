export default function FitnessNav({ t }) {
  const links = [
    { id: "fitness-hero", label: t("navHero") },
    { id: "fitness-quiz", label: t("navQuiz") },
    { id: "fitness-plan", label: t("navPlan") },
    { id: "fitness-progress", label: t("navProgress") },
    { id: "fitness-library", label: t("navLibrary") },
  ];

  return (
    <nav className="ft-nav glass" aria-label="Fitness sections">
      {links.map((link) => (
        <button
          key={link.id}
          type="button"
          className="ft-nav__link"
          onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
}
