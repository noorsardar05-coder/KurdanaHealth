import { useState } from "react";
import { motion } from "framer-motion";
import { useGamification } from "../hooks/useGamification.js";
import { AFS_MYTH_GAME, AFS_VIRUS_GAME, AFS_RESIST_GAME } from "../data/content.js";

const BADGES = [
  { id: "wise", key: "badgeWise" },
  { id: "guardian", key: "badgeGuardian" },
  { id: "fighter", key: "badgeFighter" },
  { id: "fluHero", key: "badgeFluHero" },
  { id: "hero", key: "badgeHero" },
];

export default function PlayLearn({ t, tc, lang }) {
  const { xp, level, progress, badges, streak, addXp, unlockBadge } = useGamification();
  const [mythI, setMythI] = useState(0);
  const [virusI, setVirusI] = useState(0);
  const [resistI, setResistI] = useState(0);
  const [mythFb, setMythFb] = useState("");

  return (
    <section className="kh-section" id="play">
      <div className="kh-wrap max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="kh-eyebrow">{tc("navPlay")}</p>
          <h2 className="kh-display text-[clamp(2rem,5vw,3rem)] mb-4">{tc("sectionPlay")}</h2>
          <p className="kh-lead mx-auto">{tc("sectionPlaySub")}</p>
        </div>

        <div className="kh-card mb-12 text-center">
          <p className="text-sm text-[#6b6560] mb-1">{tc("level")} {level}</p>
          <p className="text-3xl font-medium mb-4">{xp} <span className="text-base font-normal text-[#6b6560]">{tc("xp")}</span></p>
          <div className="kh-xp-track max-w-xs mx-auto">
            <motion.div className="kh-xp-fill" animate={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {BADGES.map((b) => (
            <span
              key={b.id}
              className={`text-xs px-3 py-1.5 rounded-full border ${badges[b.id] ? "border-[#d4ede4] bg-[#e8f6f3] text-[#3d9970]" : "border-[#eceae6] text-[#6b6560]"}`}
            >
              {tc(b.key)}
            </span>
          ))}
        </div>

        <div className="space-y-8">
          <div className="kh-card">
            <h3 className="font-medium mb-4">{tc("mythFact")}</h3>
            {AFS_MYTH_GAME[mythI] ? (
              <>
                <p className="text-[#6b6560] mb-6 leading-relaxed">{AFS_MYTH_GAME[mythI].st[lang]}</p>
                <div className="flex gap-3">
                  <button type="button" className="kh-btn kh-btn--soft" onClick={() => {
                    const mg = AFS_MYTH_GAME[mythI];
                    const ok = true === mg.ok;
                    setMythFb(mg.exp[lang]);
                    if (ok) { addXp(15); if (mythI + 1 >= AFS_MYTH_GAME.length) unlockBadge("wise"); setMythI((i) => i + 1); }
                  }}>{t("btnTrue")}</button>
                  <button type="button" className="kh-btn kh-btn--ghost" onClick={() => {
                    const mg = AFS_MYTH_GAME[mythI];
                    const ok = false === mg.ok;
                    setMythFb(mg.exp[lang]);
                    if (ok) { addXp(15); if (mythI + 1 >= AFS_MYTH_GAME.length) unlockBadge("wise"); setMythI((i) => i + 1); }
                  }}>{t("btnFalse")}</button>
                </div>
                {mythFb && <p className="mt-4 text-sm text-[#6b6560]">{mythFb}</p>}
              </>
            ) : (
              <p className="text-[#3d9970]">{t("gameComplete")}</p>
            )}
          </div>

          <div className="kh-card">
            <h3 className="font-medium mb-4">{t("gameVirusTitle")}</h3>
            {AFS_VIRUS_GAME[virusI] ? (
              <>
                <p className="text-[#6b6560] mb-6">{AFS_VIRUS_GAME[virusI].q[lang]}</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="kh-btn kh-btn--ghost" onClick={() => {
                    if (AFS_VIRUS_GAME[virusI].a === "virus") { addXp(10); if (virusI + 1 >= AFS_VIRUS_GAME.length) unlockBadge("guardian"); setVirusI((i) => i + 1); }
                  }}>{t("btnVirus")}</button>
                  <button type="button" className="kh-btn kh-btn--ghost" onClick={() => {
                    if (AFS_VIRUS_GAME[virusI].a === "bacteria") { addXp(10); if (virusI + 1 >= AFS_VIRUS_GAME.length) unlockBadge("guardian"); setVirusI((i) => i + 1); }
                  }}>{t("btnBacteria")}</button>
                </div>
              </>
            ) : (
              <p className="text-[#3d9970]">{t("gameComplete")}</p>
            )}
          </div>

          <div className="kh-card">
            <h3 className="font-medium mb-2">{t("gameResistTitle")}</h3>
            {AFS_RESIST_GAME[resistI] ? (
              <>
                <p className="text-[#6b6560] mb-6">{AFS_RESIST_GAME[resistI].q[lang]}</p>
                <div className="space-y-2">
                  {AFS_RESIST_GAME[resistI].opts.map((o, i) => (
                    <button key={i} type="button" className="kh-btn kh-btn--ghost w-full !justify-start text-start" onClick={() => {
                      if (i === AFS_RESIST_GAME[resistI].correct) {
                        addXp(12);
                        if (resistI + 1 >= AFS_RESIST_GAME.length) unlockBadge("fighter");
                        setResistI((x) => x + 1);
                      }
                    }}>{o[lang]}</button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-[#3d9970]">{t("gameComplete")}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
