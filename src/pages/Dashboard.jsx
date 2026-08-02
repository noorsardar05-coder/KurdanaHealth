import { Navigate } from "react-router-dom";
import DashboardExperience from "../features/dashboard/DashboardExperience.jsx";
import { getUser } from "../utils/storage";

export default function Dashboard() {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardExperience />;
}
