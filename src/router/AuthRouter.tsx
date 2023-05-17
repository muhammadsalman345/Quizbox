import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AuthPage,
  ChangePasswordPage,
  LoginPage,
  ResetPasswordPage,
} from "../pages/auth/view";
import NavigationRoutes from "../routes/NavigationRoutes";

export default function AuthRouter() {
  return (
    <Routes>
      <Route path={NavigationRoutes.auth.root} element={<AuthPage />}>
        <Route path={NavigationRoutes.auth.login} element={<LoginPage />} />
        <Route
          path={NavigationRoutes.auth.resetPassword}
          element={<ResetPasswordPage />}
        />
        <Route
          path={NavigationRoutes.auth.changePassword}
          element={<ChangePasswordPage />}
        />
      </Route>
    </Routes>
  );
}
