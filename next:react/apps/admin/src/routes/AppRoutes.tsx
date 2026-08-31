import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingScreen from "@/layouts/components/LoadingScreen";
import ErrorPage from "../pages/ErrorPage";
import MaintenancePage from "../pages/MaintenancePage";
import NotFoundPage from "../pages/NotFoundPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import PublicRoutes from "./public";
import ProtectedRoutes from "./protected";

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {PublicRoutes()}
        {ProtectedRoutes()}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
