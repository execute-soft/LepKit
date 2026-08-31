import * as React from "react";

import { cn } from "../utils";

const statusToneClasses = {
  blue:
    "bg-blue-500/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300",
  sky:
    "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300",
  amber:
    "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
  rose:
    "bg-rose-500/10 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300",
  fuchsia:
    "bg-fuchsia-500/10 text-fuchsia-700 dark:bg-fuchsia-400/10 dark:text-fuchsia-300",
  neutral:
    "bg-slate-500/10 text-slate-700 dark:bg-slate-400/10 dark:text-slate-300",
  muted:
    "bg-slate-500/10 text-slate-500 dark:bg-slate-400/10 dark:text-slate-300",
  info:
    "bg-blue-500/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300",
  success:
    "bg-blue-500/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300",
  warning:
    "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
  danger:
    "bg-rose-500/10 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300",
  pending:
    "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
  paid:
    "bg-blue-500/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300",
  unpaid:
    "bg-slate-500/10 text-slate-700 dark:bg-slate-400/10 dark:text-slate-300",
  delivered:
    "bg-blue-500/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300",
  shipped:
    "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300",
  cancelled:
    "bg-rose-500/10 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300",
} as const;

export type StatusTone = keyof typeof statusToneClasses;

export type StatusPillProps = React.ComponentProps<"span"> & {
  tone?: StatusTone;
};

export function StatusPill({ className, tone = "neutral", ...props }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 w-fit shrink-0 items-center justify-center rounded-full px-3 py-1 text-xs font-semibold shadow-none",
        statusToneClasses[tone],
        className
      )}
      {...props}
    />
  );
}

export type MetricGridProps = React.ComponentProps<"div">;

export function MetricGrid({ className, ...props }: MetricGridProps) {
  return <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-4", className)} {...props} />;
}

export type DescriptionListProps = React.ComponentProps<"dl">;

export function DescriptionList({ className, ...props }: DescriptionListProps) {
  return <dl className={cn("grid gap-3 text-sm sm:grid-cols-2", className)} {...props} />;
}

const statusToneMap: Record<string, StatusTone> = {
  active: "blue",
  approved: "blue",
  completed: "blue",
  confirmed: "blue",
  delivered: "blue",
  fulfilled: "blue",
  packed: "blue",
  paid: "blue",
  partial: "blue",
  picking: "blue",
  placed: "neutral",
  processing: "blue",
  shipped: "sky",
  pending: "amber",
  pending_payment: "blue",
  "pending payment": "blue",
  refunded: "fuchsia",
  returned: "fuchsia",
  failed: "rose",
  rejected: "rose",
  cancelled: "rose",
  canceled: "rose",
  inactive: "rose",
  draft: "neutral",
  archived: "neutral",
  unfulfilled: "neutral",
  unpaid: "neutral",
  "out of stock": "amber",
  suspended: "amber",
  paused: "amber",
  disabled: "neutral",
  in_progress: "blue",
  received: "blue",
  verified: "blue",
  discrepancy: "rose",
  healthy: "blue",
  degraded: "amber",
  down: "rose",
  unknown: "neutral",
  "-": "muted",
};

export type StatusBadgeProps = {
  status: string;
  className?: string;
};

export function StatusBadge({ status, className }: Readonly<StatusBadgeProps>) {
  const key = status.trim().toLowerCase();
  const tone = statusToneMap[key] ?? "neutral";
  const label =
    key === "-"
      ? "-"
      : status
        .trim()
        .split(/[_\s-]+/)
        .filter(Boolean)
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase())
        .join(" ");

  return (
    <span
      data-status-tone={tone}
      className={cn(
        "inline-flex min-h-7 w-fit shrink-0 items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-tight shadow-none",
        statusToneClasses[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}

const statusClasses = Object.fromEntries(
  Object.entries(statusToneMap).map(([status, tone]) => [status, statusToneClasses[tone]]),
) as Record<string, string>;

export { statusClasses, statusToneClasses, statusToneMap };
