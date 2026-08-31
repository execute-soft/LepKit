import * as React from "react";

import { cn } from "../../utils";
import { ProductImage } from "./ProductImage";
import { ProductPrice } from "./ProductPrice";

export type ProductCardProps = React.ComponentProps<"article"> & {
  name: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  price: number;
  compareAtPrice?: number | null;
  currency?: string | null;
  actions?: React.ReactNode;
};

export function ProductCard({
  className,
  name,
  imageSrc,
  imageAlt = "",
  price,
  compareAtPrice,
  currency,
  actions,
  ...props
}: ProductCardProps) {
  return (
    <article className={cn("grid gap-3 rounded-md border bg-background p-3", className)} {...props}>
      {imageSrc ? <ProductImage src={imageSrc} alt={imageAlt} /> : <div className="aspect-square rounded-md bg-muted" />}
      <div className="grid gap-2">
        <h3 className="line-clamp-2 text-sm font-medium text-foreground">{name}</h3>
        <ProductPrice price={price} compareAtPrice={compareAtPrice} currency={currency} className="font-semibold" />
        {actions ? <div className="pt-1">{actions}</div> : null}
      </div>
    </article>
  );
}

