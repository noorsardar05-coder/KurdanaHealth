import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary:
    "bg-slate-900 text-white shadow-soft hover:bg-slate-800 focus-visible:outline-slate-900",
  pastel:
    "bg-pastel-green text-slate-900 shadow-card hover:brightness-95 focus-visible:outline-emerald-600",
  ghost:
    "bg-white/70 text-slate-800 ring-1 ring-slate-200/80 hover:bg-white focus-visible:outline-slate-400",
  link: "bg-transparent px-2 py-1 text-slate-700 underline-offset-4 hover:underline focus-visible:outline-slate-500",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  to,
  type = "button",
  ...rest
}) {
  const cls = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
