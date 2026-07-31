/** Recovery / rest period illustration — calm breathing & hydration motif */
export default function RestIllustration({ className }) {
  return (
    <div className={`wp-rest-ill ${className || ""}`} aria-hidden="true">
      <svg viewBox="0 0 200 160" className="wp-rest-ill__svg" role="img" aria-label="">
        <defs>
          <linearGradient id="rest-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8faf9" />
            <stop offset="100%" stopColor="#eef3f0" />
          </linearGradient>
          <linearGradient id="rest-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(61,153,112,0.22)" />
            <stop offset="100%" stopColor="rgba(74,144,164,0.12)" />
          </linearGradient>
          <filter id="rest-soft" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(61,153,112,0.14)" />
          </filter>
        </defs>

        <rect width="200" height="160" rx="20" fill="url(#rest-bg)" />
        <ellipse cx="100" cy="148" rx="56" ry="7" fill="rgba(20,20,20,0.04)" />

        {/* Ambient glow */}
        <circle cx="100" cy="72" r="52" fill="url(#rest-glow)" opacity="0.7" />

        {/* Breathing waves */}
        <g className="wp-rest-ill__breath" opacity="0.45">
          <path
            d="M 52 58 Q 68 48 84 58 Q 100 68 116 58 Q 132 48 148 58"
            fill="none"
            stroke="var(--kh-emerald)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 44 72 Q 72 58 100 72 Q 128 86 156 72"
            fill="none"
            stroke="var(--kh-info)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* Seated figure — recovery pose */}
        <g filter="url(#rest-soft)" transform="translate(100 88)">
          {/* Ground mat */}
          <ellipse cx="0" cy="38" rx="38" ry="6" fill="rgba(61,153,112,0.1)" />

          {/* Legs (seated) */}
          <path
            d="M -18 12 L -28 34 L -14 36 L -8 14 Z"
            fill="var(--ill-muscle, #e2ebe6)"
            stroke="var(--ill-stroke, rgba(20,20,20,0.12))"
            strokeWidth="0.6"
          />
          <path
            d="M 18 12 L 28 34 L 14 36 L 8 14 Z"
            fill="var(--ill-muscle, #e2ebe6)"
            stroke="var(--ill-stroke, rgba(20,20,20,0.12))"
            strokeWidth="0.6"
          />

          {/* Torso */}
          <rect x="-14" y="-28" width="28" height="42" rx="6" fill="var(--ill-muscle, #e2ebe6)" stroke="var(--ill-stroke, rgba(20,20,20,0.12))" strokeWidth="0.6" />

          {/* Arms relaxed */}
          <path d="M -14 -20 L -30 -6 L -24 2 L -12 -10 Z" fill="var(--ill-skin, #f0e6dc)" stroke="var(--ill-stroke, rgba(20,20,20,0.12))" strokeWidth="0.5" />
          <path d="M 14 -20 L 30 -6 L 24 2 L 12 -10 Z" fill="var(--ill-skin, #f0e6dc)" stroke="var(--ill-stroke, rgba(20,20,20,0.12))" strokeWidth="0.5" />

          {/* Head */}
          <circle cx="0" cy="-40" r="12" fill="var(--ill-skin, #f0e6dc)" stroke="var(--ill-stroke, rgba(20,20,20,0.12))" strokeWidth="0.6" />

          {/* Water bottle */}
          <g transform="translate(34 -14)">
            <rect x="-5" y="-10" width="10" height="22" rx="3" fill="rgba(74,144,164,0.25)" stroke="var(--kh-info)" strokeWidth="0.8" />
            <rect x="-3" y="-14" width="6" height="5" rx="1.5" fill="var(--kh-info)" opacity="0.5" />
            <ellipse cx="0" cy="12" rx="5" ry="1.5" fill="rgba(74,144,164,0.15)" />
          </g>
        </g>

        {/* Sparkle accents */}
        <circle cx="36" cy="36" r="3" fill="var(--kh-emerald)" opacity="0.35" className="wp-rest-ill__spark" />
        <circle cx="164" cy="44" r="2.5" fill="var(--kh-info)" opacity="0.3" className="wp-rest-ill__spark wp-rest-ill__spark--2" />
        <circle cx="156" cy="108" r="2" fill="var(--kh-emerald)" opacity="0.25" className="wp-rest-ill__spark wp-rest-ill__spark--3" />
      </svg>
    </div>
  );
}
