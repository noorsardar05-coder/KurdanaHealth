import { useState } from "react";

export default function LoginForm({ language, text, onSubmit }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("female");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: name.trim(),
      gender,
      language,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-3xl border border-white/70 bg-white/85 p-7 shadow-soft backdrop-blur sm:p-9"
    >
      <h1 className="text-2xl font-bold text-slate-800">{text.loginTitle}</h1>
      <p className="mt-2 text-sm text-slate-600">{text.loginSubtitle}</p>

      <div className="mt-7 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            {text.name}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-800 outline-none transition duration-200 focus:border-pastel-blue focus:ring-2 focus:ring-pastel-blue/50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            {text.gender}
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-800 outline-none transition duration-200 focus:border-pastel-green focus:ring-2 focus:ring-pastel-green/60"
          >
            <option value="female">{text.female}</option>
            <option value="male">{text.male}</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 w-full rounded-2xl bg-gradient-to-r from-pastel-pink to-pastel-blue px-6 py-3 text-sm font-semibold text-slate-800 shadow-card transition duration-200 hover:brightness-95"
      >
        {text.continue}
      </button>
    </form>
  );
}
