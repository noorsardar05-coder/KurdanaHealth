export default function Card({ children, className = "", as: Tag = "div", ...rest }) {
  return (
    <Tag
      className={`rounded-3xl border border-slate-100/80 bg-white/90 p-6 shadow-card backdrop-blur-sm ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
