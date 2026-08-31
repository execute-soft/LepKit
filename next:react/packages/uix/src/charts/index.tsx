import * as React from "react";

import { cn } from "../utils";

export type ChartFrameProps = React.ComponentProps<"section">;

export function ChartFrame({ className, ...props }: ChartFrameProps) {
  return <section className={cn("rounded-lg border bg-background p-4", className)} {...props} />;
}

export type LegendProps = React.ComponentProps<"div">;

export function Legend({ className, ...props }: LegendProps) {
  return <div className={cn("flex flex-wrap items-center gap-3 text-sm", className)} {...props} />;
}

export type EmptyChartStateProps = React.ComponentProps<"div">;

export function EmptyChartState({ className, ...props }: EmptyChartStateProps) {
  return <div className={cn("flex min-h-48 items-center justify-center text-sm text-muted-foreground", className)} {...props} />;
}

