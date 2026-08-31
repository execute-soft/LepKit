import { lazy } from "react";
import { Route } from "react-router-dom";
import PublicRoute from "../PublicRoute";

const LoginPage = lazy(() => import("../../pages/LoginPage"));

export default function PublicRoutes() {
  return (
    <Route
      path="/"
      element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      }
    />
  );
}
