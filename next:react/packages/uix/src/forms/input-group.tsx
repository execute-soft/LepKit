import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";
import { Button, Input, Textarea } from "../react/primitives";

type InputGroupProps = React.ComponentProps<"div"> & {
  label?: React.ReactNode;
  labelClassName?: string;
};

function InputGroup({
  className,
  label,
  labelClassName,
  ...props
}: InputGroupProps) {
  const shouldFloat = Boolean(label);
  const group = (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "peer/input-group group/input-group border-input dark:bg-input/30 relative flex w-full items-center rounded-md border bg-transparent shadow-none transition-[background-color,border-color,color,box-shadow] outline-none",
        "h-10 min-w-0 has-[>textarea]:h-auto",
        shouldFloat && "h-12",
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/45 has-[[data-slot=input-group-control]:focus-visible]:ring-2",
        "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:bg-destructive/5 has-[[data-slot][aria-invalid=true]]:ring-destructive/15 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/30",
        className,
      )}
      {...props}
    />
  );

  if (!shouldFloat) return group;

  return (
    <div className="relative w-full">
      {group}
      <span
        data-slot="input-group-label"
        className={cn(
          "pointer-events-none absolute -top-2 left-3 z-10 max-w-[calc(100%-1.5rem)] truncate rounded-sm bg-background px-1.5 text-xs font-medium leading-none text-muted-foreground transition-colors peer-has-[[data-slot=input-group-control]:focus-visible]/input-group:text-foreground peer-has-[[data-slot][aria-invalid=true]]/input-group:text-destructive dark:bg-input",
          labelClassName,
        )}
      >
        {label}
      </span>
    </div>
  );
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-3.5 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end":
          "order-last pr-3.5 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
        "block-end":
          "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm leading-none shadow-none",
  {
    variants: {
      size: {
        xs: "h-7 gap-1 rounded-md px-2.5 text-xs has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "h-9 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        "icon-xs":
          "size-7 rounded-md p-0 has-[>svg]:p-0 [&>svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-9 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  },
);

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "h-full flex-1 rounded-none border-0 bg-transparent px-3.5 py-2 shadow-none focus-visible:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
