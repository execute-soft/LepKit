import * as React from "react";

import { cn } from "../utils";

const noticeToneClasses = {
  neutral: "border-border bg-muted/40 text-foreground",
  info: "border-blue-500/25 bg-blue-500/10 text-blue-900 dark:text-blue-100",
  success: "border-emerald-500/25 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
  warning: "border-amber-500/25 bg-amber-500/10 text-amber-900 dark:text-amber-100",
  danger: "border-destructive/25 bg-destructive/10 text-destructive",
} as const;

export type NoticeTone = keyof typeof noticeToneClasses;

export type AlertProps = React.ComponentProps<"div"> & {
  tone?: NoticeTone;
};

export function Alert({ className, tone = "neutral", ...props }: AlertProps) {
  return (
    <div
      role="status"
      className={cn("rounded-md border px-4 py-3 text-sm", noticeToneClasses[tone], className)}
      {...props}
    />
  );
}

export type InlineNoticeProps = AlertProps;

export function InlineNotice(props: InlineNoticeProps) {
  return <Alert {...props} />;
}

export type BannerProps = AlertProps;

export function Banner({ className, ...props }: BannerProps) {
  return <Alert className={cn("rounded-none border-x-0", className)} {...props} />;
}

export type ProgressProps = React.ComponentProps<"div"> & {
  value?: number;
  max?: number;
};

export function Progress({ className, value = 0, max = 100, ...props }: ProgressProps) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      {...props}
    >
      <div className="h-full bg-primary transition-[width]" style={{ width: `${percent}%` }} />
    </div>
  );
}

