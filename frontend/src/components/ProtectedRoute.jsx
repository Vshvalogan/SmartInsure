// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { getAuth } from "../services/api.js";

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const auth = getAuth();
  const user = auth?.user;

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
