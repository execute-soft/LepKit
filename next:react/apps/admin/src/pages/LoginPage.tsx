
import { useCallback, useState } from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";
import PageShell from "@repo/uix/components/common/PageShell";
import {
  ALLOWED_ADMIN_PRINCIPAL_TYPES,
  isAllowedAdminPrincipal,
  persistAdminAuthTokens,
  useAuth,
  type Role
} from "@/features/auth/store/auth";
import { fetchCurrentAdminUser, loginAdminUser } from "@/features/auth/api";
import { useLanguage } from "@/lib/hooks";
import { formatMessage } from "@/lib/i18n";

const defaultLoginRole: Role = "user";

export default function LoginPage() {
  const { login, logout } = useAuth();
  const { language, t } = useLanguage();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const adminAccessError = formatMessage(language, "auth.login.adminOnly", {
    types: ALLOWED_ADMIN_PRINCIPAL_TYPES.join("/"),
  });

  const handleSubmit = useCallback(
    async (values: { email: string; password: string; rememberMe: boolean }) => {
      setErrorMessage(null);
      try {
        const response = await loginAdminUser({
          input: {
            email: values.email,
            password: values.password
          }
        });

        if (!response) {
          setErrorMessage(t("auth.login.fallbackError"));
          return;
        }

        if (!response.accessToken) {
          setErrorMessage(t("auth.login.fallbackError"));
          return;
        }

        persistAdminAuthTokens({
          rememberMe: values.rememberMe,
          tokens: response,
        });

        const me = await fetchCurrentAdminUser().catch(() => null);

        const principalType = me?.principalType;
        if (!isAllowedAdminPrincipal(principalType)) {
          logout();
          setErrorMessage(adminAccessError);
          return;
        }

        const userRole = (me?.role as Role | undefined) ?? defaultLoginRole;
        persistAdminAuthTokens({
          rememberMe: values.rememberMe,
          tokens: {
            ...response,
            userId: me.userId,
            orgId: me.orgId,
            siteId: me.siteId ?? null,
            roleId: me.roleId,
            role: userRole,
            principalType,
            permissions: me.permissions
          },
        });

        login({
          role: userRole,
          principalType: principalType ?? undefined,
          permissions: me.permissions,
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : t("auth.login.fallbackError");
        setErrorMessage(message);
      }
    },
    [login, logout, adminAccessError, t]
  );

  return (
    <PageShell className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <main className="flex min-h-screen items-center justify-center px-4 py-8">
        <LoginForm onSubmit={handleSubmit} errorMessage={errorMessage} />
      </main>
    </PageShell>

  );
}
