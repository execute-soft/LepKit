import { Link } from "react-router-dom";
import { Home, RefreshCcw, TriangleAlert } from "lucide-react";

import { AdminStatePage } from "@repo/uix/react/layout";
import { Button } from "@repo/uix/react/primitives";
import { useLanguage } from "@/lib/hooks";

export default function ErrorPage() {
  const { t } = useLanguage();

  return (
    <AdminStatePage
      eyebrow="Runtime"
      code="500"
      icon={TriangleAlert}
      title={t("static.error.title")}
      description={t("static.error.description")}
      items={["Retry page", "Check status", "Contact support"]}
      secondaryActions={
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCcw className="size-4" />
          {t("static.error.retry")}
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
