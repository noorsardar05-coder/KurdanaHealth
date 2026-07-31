export function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md mx-auto" aria-hidden="true">
      <circle cx="200" cy="160" r="120" fill="#E8F6F3" />
      <circle cx="200" cy="160" r="80" fill="#D4EDE4" opacity="0.6" />
      <path
        d="M200 90c-20 0-36 16-36 36v48c0 20 16 36 36 36s36-16 36-36v-48c0-20-16-36-36-36z"
        stroke="#2F8F6B"
        strokeWidth="2"
        fill="white"
        opacity="0.95"
      />
      <path d="M200 130v60M170 160h60" stroke="#3D9970" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="130" cy="200" r="28" fill="white" stroke="#ECEAE6" strokeWidth="1.5" />
      <circle cx="270" cy="120" r="22" fill="white" stroke="#ECEAE6" strokeWidth="1.5" />
      <path d="M118 200h24M262 120h16" stroke="#D4EDE4" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PillIllustration({ className = "" }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <rect x="8" y="24" width="64" height="32" rx="16" fill="#E8F6F3" stroke="#D4EDE4" strokeWidth="1" />
      <line x1="40" y1="24" x2="40" y2="56" stroke="#3D9970" strokeWidth="1.5" opacity="0.4" />
      <circle cx="28" cy="40" r="6" fill="white" opacity="0.8" />
      <circle cx="52" cy="40" r="6" fill="white" opacity="0.8" />
    </svg>
  );
}

export function VirusIllustration({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="22" fill="#E8F6F3" stroke="#3D9970" strokeWidth="1.5" opacity="0.9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="50"
          x2={50 + 32 * Math.cos((deg * Math.PI) / 180)}
          y2={50 + 32 * Math.sin((deg * Math.PI) / 180)}
          stroke="#D4EDE4"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function BacteriaIllustration({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <ellipse cx="50" cy="52" rx="28" ry="20" fill="#FAFAF8" stroke="#ECEAE6" strokeWidth="1.5" />
      <ellipse cx="38" cy="44" rx="8" ry="6" fill="#E8F6F3" />
      <ellipse cx="58" cy="48" rx="6" ry="5" fill="#D4EDE4" opacity="0.7" />
      <path d="M30 52 Q50 62 70 52" stroke="#3D9970" strokeWidth="1" fill="none" opacity="0.35" />
    </svg>
  );
}
