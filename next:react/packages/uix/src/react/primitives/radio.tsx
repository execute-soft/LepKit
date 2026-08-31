import * as React from "react";

import { cn } from "../../utils";

export type RadioProps = React.ComponentProps<"input">;

export function Radio({ className, type: _type, ...props }: RadioProps) {
  return (
    <input
      type="radio"
      className={cn(
        "size-4 rounded-full border border-input accent-primary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

