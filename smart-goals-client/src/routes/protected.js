import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />
}