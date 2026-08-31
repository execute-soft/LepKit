import { Link } from "react-router-dom";
import { ArrowLeft, Home, ShieldAlert } from "lucide-react";

import { AdminStatePage } from "@repo/uix/react/layout";
import { Button } from "@repo/uix/react/primitives";
import { useLanguage } from "@/lib/hooks";

export default function UnauthorizedPage() {
  const { t } = useLanguage();

  return (
    <AdminStatePage
      eyebrow="Access control"
      code="403"
      icon={ShieldAlert}
      title={t("static.unauthorized.title")}
      description={t("static.unauthorized.description")}
      items={["Role check failed", "Session unchanged", "Ask an admin"]}
      secondaryActions={
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="size-4" />
          {t("notFound.goBack")}
        </Button>
      }
      actions={
        <Button asChild>
          <Link to="/dashboard">
            <Home className="size-4" />
            {t("notFound.dashboard")}
          </Link>
        </Button>
      }
      className="bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.04),transparent_34rem)]"
    />
  );
}
