/** Lightweight scientific illustrations — no heavy 3D. */

export default function BodyArt({ kind = "blood", className = "" }) {
  if (kind === "lungs") {
    return (
      <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <linearGradient id="noorLung" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7eb8b2" />
            <stop offset="100%" stopColor="#1f6f6a" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="86" fill="#e7f1ef" opacity="0.7" />
        <path
          d="M100 48c0 0-6 10-6 28v20c-18-4-34 8-40 28-6 22 2 46 22 54 12 5 24-2 28-14"
          fill="url(#noorLung)"
          opacity="0.9"
        />
        <path
          d="M100 48c0 0 6 10 6 28v20c18-4 34 8 40 28 6 22-2 46-22 54-12 5-24-2-28-14"
          fill="url(#noorLung)"
          opacity="0.75"
        />
        <rect x="96" y="40" width="8" height="42" rx="4" fill="#2f4a52" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="noorBlood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8a0a0" />
          <stop offset="100%" stopColor="#a85d5d" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="86" fill="#f6ecec" opacity="0.8" />
      <ellipse cx="100" cy="108" rx="48" ry="30" fill="url(#noorBlood)" opacity="0.85" />
      <circle cx="78" cy="78" r="16" fill="#c97878" opacity="0.9" />
      <circle cx="118" cy="70" r="12" fill="#d48a8a" opacity="0.85" />
      <circle cx="132" cy="100" r="10" fill="#b86868" opacity="0.8" />
      <path
        d="M40 140c20-18 40-10 60-18s40-4 60 10"
        fill="none"
        stroke="#1f6f6a"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
