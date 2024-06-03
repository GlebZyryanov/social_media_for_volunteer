import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, authRoutes, publicRoutes } from "../Routes";
import { LOGIN_ROUTE } from "../utils/consts";

const AppRouter = () => {
  const isAuth = true;
  const isAdmin = false;
  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, Element }) => (
          <Route key={path} path={path} element={Element} />
        ))}
      {publicRoutes.map(({ path, Element }) => (
        <Route key={path} path={path} element={Element} />
      ))}
      {isAuth &&
        isAdmin &&
        adminRoutes.map(({ path, Element }) => (
          <Route key={path} path={path} element={Element} />
        ))}
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;
