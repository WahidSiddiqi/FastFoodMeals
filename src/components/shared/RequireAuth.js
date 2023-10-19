import { Navigate } from "react-router-dom";

export default function RequireAuth({ user, userLoading, children }) {
  if (userLoading) return <div className="loading-page">Loading...</div>;
  return user !== null ? children : <Navigate to="/sign-in" replace />;
}
