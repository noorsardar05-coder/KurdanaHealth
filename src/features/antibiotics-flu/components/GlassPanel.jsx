export default function GlassPanel({ children, className = "", glow = false }) {
  return (
    <div className={`kh-glass rounded-2xl ${glow ? "kh-glass--glow" : ""} ${className}`}>
      {children}
    </div>
  );
}
