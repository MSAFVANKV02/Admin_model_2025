// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { isAuthenticated } from "./IsAuthenticated";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const isLogged = isAuthenticated();
//   const { pathname } = useLocation();

//   if (!isLogged) {
//     // Redirect to login if user is not authenticated
//     return <Navigate to="/login" replace />;
//   }

//   // Redirect to dashboard if logged in and accessing "/" or "/login"
//   if (pathname === "/login" || pathname === "/") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   // Allow authenticated users to access protected routes
//   return <>{children}</>;
// };

// export default ProtectedRoute;
// =================================================================
// =================================================================================================
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./IsAuthenticated";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLogged = isAuthenticated();
  const { pathname } = useLocation();

  const loginUser = {
    "_id": "2",
    "name": "Jane Doe",
    "email": "jane@gmail.com",
    "password": "12345",
    "role": "admin",
    "pages": ["/products/add-new", "/products/all"], // Example pages user has access to
  };

  if (!isLogged) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (loginUser.role === "admin") {
    // Admin has access to everything
    return <>{children}</>;
  }

  

  // Helper function to check if the user has access to the current route or its exact path
  const hasAccess = (path: string) => {
    // Only allow exact matches of path
    if (path === "/settings/user-strict") {
      return true; // Allow users to access this specific page (no need to add it to "pages" array)
    }
    return loginUser.pages.includes(path);
  };

  // If the user doesn't have access to the current path, redirect to the dashboard
  if (!hasAccess(pathname)) {
    // Log to see the redirect behavior
    // console.log("Redirecting to /settings/user-management because of access restrictions");
    return <Navigate to="/settings/user-strict" replace />;
  }

  // Redirect to dashboard if logged in and accessing "/" or "/login"
  if (pathname === "/login" || pathname === "/") {
    return <Navigate to="/dashboard" replace />;
  }

  // Allow authenticated users to access protected routes
  return <>{children}</>;
};

export default ProtectedRoute;
