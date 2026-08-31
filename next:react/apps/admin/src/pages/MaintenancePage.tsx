import { Link } from "react-router-dom";
import { Home, RefreshCcw, Wrench } from "lucide-react";

import { AdminStatePage } from "@repo/uix/react/layout";
import { Button } from "@repo/uix/react/primitives";
import { useLanguage } from "@/lib/hooks";

export default function MaintenancePage() {
  const { t } = useLanguage();

  return (
    <AdminStatePage
      eyebrow="Service status"
      code="503"
      icon={Wrench}
      title={t("static.maintenance.title")}
      description={t("static.maintenance.description")}
      items={["Changes paused", "Data protected", "Retry shortly"]}
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
      note={t("static.maintenance.note")}
      className="bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.04),transparent_34rem)]"
    />
  );
}
