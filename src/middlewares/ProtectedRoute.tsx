import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./IsAuthenticated";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isProtected?: boolean;
  isHomeLogin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const isLogged = isAuthenticated();

  // If logged in and trying to access a protected route that's not KYC, redirect to KYC

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }




  // Allow authenticated users to access protected routes
  return <>{children}</>;
};

export default ProtectedRoute;
