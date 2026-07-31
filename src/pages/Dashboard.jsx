import { Navigate } from "react-router-dom";
import DashboardExperience from "../features/dashboard/DashboardExperience.jsx";
import { getUser, hasChosenLanguage } from "../utils/storage";

export default function Dashboard() {
  if (!hasChosenLanguage()) {
    return <Navigate to="/" replace />;
  }

  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardExperience />;
}
