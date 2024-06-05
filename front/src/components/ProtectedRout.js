import React from "react";
import { Navigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { jwtDecode } from "jwt-decode"; 

const ProtectedRoute = ({ element, roles }) => {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  if (!token || !user) {
    return <Navigate to={LOGIN_ROUTE} />;
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default ProtectedRoute;
