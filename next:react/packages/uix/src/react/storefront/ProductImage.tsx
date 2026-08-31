import * as React from "react";

import { OptimizedImage } from "../primitives";
import { cn } from "../../utils";

export type ProductImageProps = React.ComponentProps<"img"> & {
  ratioClassName?: string;
};

export function ProductImage({ className, ratioClassName = "aspect-square", alt, ...props }: ProductImageProps) {
  return (
    <div className={cn("overflow-hidden rounded-md bg-muted", ratioClassName)}>
      <OptimizedImage className={cn("size-full object-cover", className)} alt={alt} {...props} />
    </div>
  );
}
