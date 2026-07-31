import { Navigate } from "react-router-dom";
import SettingsExperience from "../features/settings/SettingsExperience.jsx";
import { getUser } from "../utils/storage";

export default function Settings() {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <SettingsExperience />;
}
