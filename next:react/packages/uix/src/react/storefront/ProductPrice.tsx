import { formatCurrencyIntl } from "../../commerce";
import { cn } from "../../utils";

type ProductPriceProps = Readonly<{
  price: number;
  compareAtPrice?: number | null;
  currency?: string | null;
  locale?: string;
  className?: string;
  compareClassName?: string;
}>;

export function ProductPrice({
  price,
  compareAtPrice,
  currency = "BDT",
  locale = "en-BD",
  className,
  compareClassName,
}: ProductPriceProps) {
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span>{formatCurrencyIntl(price, currency, { locale })}</span>
      {compareAtPrice && compareAtPrice > price ? (
        <span
          className={cn(
            "text-sm text-muted-foreground line-through",
            compareClassName,
          )}
        >
          {formatCurrencyIntl(compareAtPrice, currency, { locale })}
        </span>
      ) : null}
    </span>
  );
}

