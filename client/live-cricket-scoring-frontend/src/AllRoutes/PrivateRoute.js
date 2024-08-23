import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem("adminauth");
      const userAuth = localStorage.getItem("auth");

      // Check for adminAuth first
      if (adminAuth === "true") {
        setIsAuthenticated(true);
        // User is authenticated but not an admin
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth(); // Check auth status
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    toast.error("Admin authentication is required!")
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
