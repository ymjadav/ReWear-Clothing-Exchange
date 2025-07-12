import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";

interface AuthHandlerProps {
  children: React.ReactNode;
}

export const AuthHandler: React.FC<AuthHandlerProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Define public routes
  const publicRoutes = ["/login", "/public"];

  if (loading) {
    return <div>Loading...</div>;
  }

  // If current route is public, render children without auth check
  if (publicRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};