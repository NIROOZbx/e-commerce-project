import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const { currentUserData } = useContext(AuthContext);

  // Not logged in
  if (!currentUserData) {
    return <Navigate to="/login" replace />;
  }

  // If route needs a specific role (e.g., admin only)
  if (requiredRole && currentUserData.role !== requiredRole) {
    // Redirect users with the wrong role
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
