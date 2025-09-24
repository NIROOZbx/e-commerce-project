import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { currentUserData } = useContext(AuthContext);

  if (currentUserData) {
    if (currentUserData.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default PublicRoute;
