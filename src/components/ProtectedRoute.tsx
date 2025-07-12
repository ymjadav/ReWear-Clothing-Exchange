import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
