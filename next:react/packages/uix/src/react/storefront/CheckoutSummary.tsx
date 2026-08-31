import * as React from "react";

import { formatCurrencyIntl } from "../../commerce";
import { cn } from "../../utils";

export type CheckoutSummaryLine = {
  label: React.ReactNode;
  value: number;
};

export type CheckoutSummaryProps = React.ComponentProps<"section"> & {
  lines: CheckoutSummaryLine[];
  total: number;
  currency?: string | null;
  locale?: string;
};

export function CheckoutSummary({
  className,
  lines,
  total,
  currency = "BDT",
  locale = "en-BD",
  ...props
}: CheckoutSummaryProps) {
  return (
    <section className={cn("grid gap-3 rounded-md border bg-background p-4", className)} {...props}>
      <div className="grid gap-2">
        {lines.map((line, index) => (
          <div className="flex items-center justify-between gap-3 text-sm" key={index}>
            <span className="text-muted-foreground">{line.label}</span>
            <span className="font-medium">{formatCurrencyIntl(line.value, currency, { locale })}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t pt-3 text-base font-semibold">
        <span>Total</span>
        <span>{formatCurrencyIntl(total, currency, { locale })}</span>
      </div>
    </section>
  );
}

