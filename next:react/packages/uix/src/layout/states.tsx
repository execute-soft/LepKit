import * as React from "react";

import { cn } from "../utils";
import { Button } from "../react/primitives";

export type PageShellProps = React.ComponentProps<"main">;

export function PageShell({ className, ...props }: PageShellProps) {
  return <main className={cn("mx-auto w-full max-w-7xl px-4 py-6 sm:px-6", className)} {...props} />;
}

export type SectionHeaderProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
};

export function SectionHeader({
  className,
  title,
  description,
  actions,
  children,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", className)} {...props}>
      <div className="min-w-0 space-y-1">
        {title ? <h2 className="text-lg font-semibold text-foreground">{title}</h2> : null}
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        {children}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export type ToolbarProps = React.ComponentProps<"div">;

export function Toolbar({ className, ...props }: ToolbarProps) {
  return <div className={cn("flex flex-wrap items-center gap-2", className)} {...props} />;
}

export type EmptyStateProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

export function EmptyState({ className, title, description, action, children, ...props }: EmptyStateProps) {
  return (
    <div className={cn("flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center", className)} {...props}>
      {title ? <h3 className="text-base font-semibold text-foreground">{title}</h3> : null}
      {description ? <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p> : null}
      {children}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export type ErrorStateProps = EmptyStateProps & {
  retryLabel?: React.ReactNode;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Something went wrong",
  description,
  action,
  retryLabel = "Try again",
  onRetry,
  ...props
}: ErrorStateProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      action={action ?? (onRetry ? <Button onClick={onRetry}>{retryLabel}</Button> : null)}
      {...props}
    />
  );
}

export type LoadingStateProps = React.ComponentProps<"div"> & {
  label?: React.ReactNode;
};

export function LoadingState({ className, label = "Loading", ...props }: LoadingStateProps) {
  return (
    <div className={cn("flex min-h-32 items-center justify-center gap-3 text-sm text-muted-foreground", className)} {...props}>
      <span className="size-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

