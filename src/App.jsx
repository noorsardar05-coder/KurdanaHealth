import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { getUser } from "./utils/storage";

const Settings = lazy(() => import("./pages/Settings"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const MentalHealth = lazy(() => import("./pages/MentalHealth"));
const FirstTimeMothers = lazy(() => import("./pages/FirstTimeMothers"));
const BodyWise = lazy(() => import("./pages/BodyWise"));
const Beauty = lazy(() => import("./pages/Beauty"));
const Nutrition = lazy(() => import("./pages/Nutrition"));
const NoorCommunity = lazy(() => import("./pages/NoorCommunity"));

function Protected({ children }) {
  const user = getUser();
  return user ? children : <Navigate to="/login" replace />;
}

function LoginOnly({ children }) {
  const user = getUser();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

function RouteFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-transparent" aria-busy="true">
      <div
        className="h-9 w-9 animate-pulse rounded-full border-2 border-slate-300 border-t-slate-600"
        aria-hidden="true"
      />
    </main>
  );
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <LoginOnly>
              <Login />
            </LoginOnly>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/settings"
          element={
            <Protected>
              <Settings />
            </Protected>
          }
        />
        <Route
          path="/category/mental-health"
          element={
            <Protected>
              <MentalHealth />
            </Protected>
          }
        />
        <Route
          path="/first-time-mothers"
          element={
            <Protected>
              <FirstTimeMothers />
            </Protected>
          }
        />
        <Route
          path="/category/first-time-mothers/*"
          element={
            <Protected>
              <FirstTimeMothers />
            </Protected>
          }
        />
        <Route
          path="/category/bodywise"
          element={
            <Protected>
              <BodyWise />
            </Protected>
          }
        />
        <Route
          path="/category/beauty/*"
          element={
            <Protected>
              <Beauty />
            </Protected>
          }
        />
        <Route
          path="/category/nutrition-diets/*"
          element={
            <Protected>
              <Nutrition />
            </Protected>
          }
        />
        <Route
          path="/category/noor-community/*"
          element={
            <Protected>
              <NoorCommunity />
            </Protected>
          }
        />
        <Route
          path="/category/:slug"
          element={
            <Protected>
              <CategoryPage />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
