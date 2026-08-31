import * as React from "react";

import { cn } from "../../utils";

export type OptimizedImageProps = React.ComponentProps<"img">;

function OptimizedImage({
  className,
  loading = "lazy",
  decoding = "async",
  ...props
}: OptimizedImageProps) {
  return (
    <img
      data-slot="optimized-image"
      className={cn(className)}
      loading={loading}
      decoding={decoding}
      {...props}
    />
  );
}

export { OptimizedImage };
