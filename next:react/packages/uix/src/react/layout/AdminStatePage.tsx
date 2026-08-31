import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "../../utils";

type AdminStatePageProps = Readonly<{
  eyebrow?: string;
  title: string;
  description: ReactNode;
  icon: LucideIcon;
  code?: string;
  path?: string;
  pathLabel?: string;
  actions?: ReactNode;
  secondaryActions?: ReactNode;
  items?: readonly string[];
  note?: ReactNode;
  compact?: boolean;
  className?: string;
}>;

export function AdminStatePage({
  eyebrow,
  title,
  description,
  icon: Icon,
  code,
  path,
  pathLabel = "Requested path",
  actions,
  secondaryActions,
  items,
  note,
  compact = false,
  className,
}: AdminStatePageProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center px-4",
        compact ? "min-h-[58vh] py-8" : "min-h-screen bg-background py-10",
        className,
      )}
    >
      <section className="w-full max-w-[560px] rounded-[1.25rem] border border-border bg-card px-5 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:px-7">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 text-muted-foreground">
            <Icon className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {eyebrow ? (
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {eyebrow}
                </p>
              ) : null}
              {code ? (
                <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  {code}
                </span>
              ) : null}
            </div>
            <h1 className="mt-2 text-xl font-semibold leading-tight text-foreground sm:text-2xl">
              {title}
            </h1>
            <div className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </div>
            {path ? (
              <div className="mt-4 rounded-lg border border-border bg-muted/25 px-3 py-2 text-left">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {pathLabel}
                </p>
                <code className="mt-1 block truncate text-xs text-foreground">
                  {path}
                </code>
              </div>
            ) : null}
          </div>
        </div>

        {items && items.length > 0 ? (
          <div className="mt-5 grid gap-2 rounded-lg border border-border bg-background/60 p-3 text-sm text-muted-foreground sm:grid-cols-3">
            {items.map((item) => (
              <div key={item} className="flex min-w-0 items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-primary/70" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        ) : null}

        {actions || secondaryActions ? (
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">{secondaryActions}</div>
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          </div>
        ) : null}
        {note ? (
          <div className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
            {note}
          </div>
        ) : null}
      </section>
    </div>
  );
}

