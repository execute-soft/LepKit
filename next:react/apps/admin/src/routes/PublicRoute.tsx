import { Navigate, useLocation, type Location } from "react-router-dom";
import { type ReactNode } from "react";
import { useAuth } from "@/features/auth/store/auth";

type PublicRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

export default function PublicRoute({
  children,
  redirectTo = "/dashboard",
}: Readonly<PublicRouteProps>) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const redirectPath =
    (location.state as { from?: Location } | null)?.from?.pathname ?? redirectTo;

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
