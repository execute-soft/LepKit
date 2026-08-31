import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";

import { AdminStatePage } from "@repo/uix/react/layout";
import { Button } from "@repo/uix/react/primitives";
import { useLanguage } from "@/lib/hooks";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  return (
    <AdminStatePage
      eyebrow="Navigation"
      code="404"
      icon={SearchX}
      title={t("notFound.title")}
      description={
        <>
          {t("notFound.descriptionPrefix")} {t("notFound.descriptionSuffix")}
        </>
      }
      path={pathname}
      items={["Check the URL", "Use dashboard", "Open last page"]}
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
