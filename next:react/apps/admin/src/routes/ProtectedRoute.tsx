import { Navigate, useLocation } from "react-router-dom";
import { type ReactNode } from "react";
import {
  ACCESS_TOKEN_KEY,
  isAllowedAdminPrincipal,
  useAuth,
  type Role
} from "@/features/auth/store/auth";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: Role[];
  redirectTo?: string;
};

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/",
}: Readonly<ProtectedRouteProps>) {
  const location = useLocation();
  const { isAuthenticated, role, principalType, logout } = useAuth();
  const hasAccessToken =
    typeof window !== "undefined" &&
    Boolean(
      window.localStorage.getItem(ACCESS_TOKEN_KEY) ||
        window.sessionStorage.getItem(ACCESS_TOKEN_KEY)
    );

  if (!isAuthenticated || !hasAccessToken) {
    if (!hasAccessToken && isAuthenticated) {
      logout();
    }
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (!isAllowedAdminPrincipal(principalType)) {
    logout();
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    logout();
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
