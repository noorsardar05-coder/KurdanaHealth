import { Link } from "react-router-dom";
import { categoryDescKey, categoryTitleKey, t } from "../utils/translations";

export default function CategoryCard({ language, category, openLabel }) {
  const title = t(language, categoryTitleKey(category.slug));
  const description = t(language, categoryDescKey(category.slug));

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group rounded-3xl border border-emerald-100/45 bg-[#f7faf8]/88 backdrop-blur-[2px] p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200/90 to-sky-200/90 text-xl">
        {category.icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      <span className="mt-4 inline-block text-xs font-semibold text-slate-500 transition group-hover:text-slate-700">
        {openLabel}
      </span>
    </Link>
  );
}
