import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Signup() {
  const { t } = useTranslation();
  const { signup, user, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signup(email.trim(), password, name.trim());
    } catch {
      setError(t("authError"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <Card>
        <h1 className="text-2xl font-bold text-slate-900">{t("signup")}</h1>
        <p className="mt-2 text-sm text-slate-600">{t("heroSubtitle")}</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              {t("name")}
            </label>
            <input
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-slate-200 transition focus:ring-2"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              {t("email")}
            </label>
            <input
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-slate-200 transition focus:ring-2"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              {t("password")}
            </label>
            <input
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-slate-200 transition focus:ring-2"
              type="password"
              autoComplete="new-password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="rounded-xl bg-pastel-pink/60 px-3 py-2 text-sm text-slate-800">
              {error}
            </p>
          )}
          <Button
            className="w-full"
            type="submit"
            variant="pastel"
            disabled={busy}
          >
            {t("submitSignup")}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {t("haveAccount")}{" "}
          <Link className="font-semibold text-slate-900 underline" to="/login">
            {t("login")}
          </Link>
        </p>
      </Card>
    </div>
  );
}
