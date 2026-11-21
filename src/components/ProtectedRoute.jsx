import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../api/helper/auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const user = getCurrentUser();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: "You need to log in to use this functionality.",
          from: location.pathname,
        }}
      />
    );
  }

  return children;
}
