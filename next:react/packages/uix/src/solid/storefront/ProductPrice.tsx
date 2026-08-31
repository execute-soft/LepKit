/** @jsxImportSource solid-js */
import { formatCurrencyIntl } from "../../commerce";

type ProductPriceProps = {
  price: number;
  compareAtPrice?: number | null;
  currency?: string | null;
  locale?: string;
  class?: string;
  compareClass?: string;
};

export function ProductPrice(props: ProductPriceProps) {
  const currency = () => props.currency ?? "BDT";
  const locale = () => props.locale ?? "en-BD";

  return (
    <span class={props.class}>
      <span>{formatCurrencyIntl(props.price, currency(), { locale: locale() })}</span>
      {props.compareAtPrice && props.compareAtPrice > props.price ? (
        <span class={props.compareClass ?? "ml-2 text-sm line-through opacity-60"}>
          {formatCurrencyIntl(props.compareAtPrice, currency(), {
            locale: locale(),
          })}
        </span>
      ) : null}
    </span>
  );
}
