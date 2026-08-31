import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../utils";

const badgeVariants = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-border bg-transparent text-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  outlinePublic:
    "border border-emerald-300 bg-transparent text-emerald-700 dark:border-emerald-800 dark:text-emerald-300",
  outlinePrivate:
    "border border-amber-300 bg-transparent text-amber-700 dark:border-amber-800 dark:text-amber-300",
  ghost: "bg-transparent text-foreground",
  link: "bg-transparent text-primary underline-offset-4",
} as const;

export type BadgeVariant = keyof typeof badgeVariants;

export type BadgeProps = React.ComponentProps<"span"> & {
  variant?: BadgeVariant;
  asChild?: boolean;
};

export function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        "inline-flex min-h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border border-transparent px-2.5 text-xs font-medium transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:size-3 [&>svg]:pointer-events-none",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { badgeVariants };
