import AnimatedAura from "../../onboarding/components/AnimatedAura.jsx";
import KurdishPatternBackground from "../../onboarding/components/KurdishPatternBackground.jsx";
import ProfileParticles from "./ProfileParticles.jsx";
import "../../onboarding/onboarding.css";

export default function ProfileShell({ children }) {
  return (
    <div className="kh-profile__shell" aria-hidden="true">
      <AnimatedAura />
      <KurdishPatternBackground />
      <ProfileParticles />
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
