import { Fragment, lazy } from "react";
import { Outlet, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";

const DummyPage = lazy(() => import("@/pages/DummyPage"));

export default function ProtectedRoutes() {
  return (
    <Fragment>
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DummyPage />} />
        <Route path="/dashboard/*" element={<DummyPage />} />
      </Route>
    </Fragment>
  );
}
