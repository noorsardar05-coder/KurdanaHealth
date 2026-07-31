/** Soft decorative shapes — calm, never cartoon clutter. */
export default function SoftArt({ variant = "orb", className = "" }) {
  return (
    <div className={`ftm-art ftm-art--${variant} ${className}`} aria-hidden="true">
      <span className="ftm-art__blob ftm-art__blob--a" />
      <span className="ftm-art__blob ftm-art__blob--b" />
      <span className="ftm-art__blob ftm-art__blob--c" />
    </div>
  );
}
