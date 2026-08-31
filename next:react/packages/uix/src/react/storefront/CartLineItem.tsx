import * as React from "react";

import { cn } from "../../utils";
import { ProductImage } from "./ProductImage";
import { ProductPrice } from "./ProductPrice";

export type CartLineItemProps = React.ComponentProps<"div"> & {
  name: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  quantity?: React.ReactNode;
  price: number;
  currency?: string | null;
  actions?: React.ReactNode;
};

export function CartLineItem({
  className,
  name,
  imageSrc,
  imageAlt = "",
  quantity,
  price,
  currency,
  actions,
  ...props
}: CartLineItemProps) {
  return (
    <div className={cn("grid grid-cols-[4rem_1fr] gap-3", className)} {...props}>
      {imageSrc ? (
        <ProductImage src={imageSrc} alt={imageAlt} ratioClassName="aspect-square" />
      ) : (
        <div className="aspect-square rounded-md bg-muted" />
      )}
      <div className="min-w-0 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{name}</p>
            {quantity ? <div className="mt-1">{quantity}</div> : null}
          </div>
          <ProductPrice price={price} currency={currency} className="shrink-0 text-sm font-semibold" />
        </div>
        {actions ? <div>{actions}</div> : null}
      </div>
    </div>
  );
}

