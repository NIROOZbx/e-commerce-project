import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const {user, role } = useContext(AuthContext);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
