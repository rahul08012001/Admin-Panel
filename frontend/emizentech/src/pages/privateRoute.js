import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = ({ element, ...props }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated ? (
    <div>
      <Outlet {...props} element={element} />
    </div>
  ) : (
    <Navigate to="/Login" replace />
  );
};
export default ProtectedRoute;
