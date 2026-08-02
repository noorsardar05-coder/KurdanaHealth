import { Navigate } from "react-router-dom";
import ProfileOnboarding from "../features/profile/ProfileOnboarding.jsx";
import { getUser } from "../utils/storage";

export default function Login() {
  const user = getUser();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <ProfileOnboarding />;
}
