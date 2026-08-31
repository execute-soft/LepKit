import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { AdminStatePage } from "@repo/uix/react/layout";
import { Button } from "@repo/uix/react/primitives";
import { useLanguage } from "@/lib/hooks";
import { translateLooseText } from "@/lib/i18n";

type BasicPageLayoutProps = Readonly<{
  title: string;
  description?: string;
  children?: ReactNode;
  path?: string;
  actions?: ReactNode;
}>;

export default function BasicPageLayout({
  title,
  description,
  children,
  path,
  actions,
}: BasicPageLayoutProps) {
  const { language, t } = useLanguage();
  const localizedTitle = translateLooseText(language, title);
  const localizedDescription = description
    ? translateLooseText(language, description)
    : undefined;

  const titleCrumbs = localizedTitle.split(" / ").filter(Boolean);
  const fullSegments = path ? path.split("/").filter(Boolean) : [];
  const labelSegments = fullSegments[0] === "dashboard" ? fullSegments.slice(1) : fullSegments;
  const crumbs =
    titleCrumbs.length === labelSegments.length
      ? titleCrumbs
      : labelSegments.map((segment) =>
          translateLooseText(
            language,
            segment
              .split("-")
              .map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1)}` : ""))
              .join(" "),
          )
      );
  const showDashboardRoot = fullSegments[0] === "dashboard";
  return (
    <div className="w-full space-y-6">
      <header className="space-y-2">
        <nav className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
          {showDashboardRoot && (
            <>
              <Link to="/dashboard" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                {t("notFound.dashboard")}
              </Link>
              {crumbs.length > 0 && <span className="text-gray-300 dark:text-gray-600">/</span>}
            </>
          )}
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            const hrefIndex = showDashboardRoot ? index + 1 : index;
            const href =
              fullSegments.length > 0
                ? `/${fullSegments.slice(0, hrefIndex + 1).join("/")}`
                : undefined;

            return (
              <span key={`${crumb}-${index}`} className="flex items-center gap-2">
                {isLast || !href ? (
                  <span className="text-gray-700 dark:text-gray-200">{crumb}</span>
                ) : (
                  <Link to={href} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    {crumb}
                  </Link>
                )}
                {!isLast && <span className="text-gray-300 dark:text-gray-600">/</span>}
              </span>
            );
          })}
        </nav>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-[18px] sm:text-[20px] font-bold text-gray-900 dark:text-gray-100">{localizedTitle}</h1>
            {localizedDescription && (
              <p className="text-[10px] sm:text-[12px] text-gray-500 dark:text-gray-400">{localizedDescription}</p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      </header>
      <section>
        {children ?? (
          <AdminStatePage
            compact
            eyebrow="Workspace"
            code="Not wired"
            icon={ClipboardList}
            title={localizedTitle}
            description={localizedDescription ?? t("dashboard.placeholderPage")}
            items={["Route is ready", "Data contract pending", "No changes made"]}
            secondaryActions={
              <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="size-4" />
                {t("notFound.goBack")}
              </Button>
            }
            className="min-h-[44vh] px-0 py-4"
          />
        )}
      </section>
    </div>
  );
}
