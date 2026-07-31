import { Navigate } from "react-router-dom";
import ProfileOnboarding from "../features/profile/ProfileOnboarding.jsx";
import { getUser, hasChosenLanguage } from "../utils/storage";

export default function Login() {
  const user = getUser();

  if (!hasChosenLanguage()) {
    return <Navigate to="/" replace />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <ProfileOnboarding />;
}
