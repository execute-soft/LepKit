import * as React from "react";

import { cn } from "../../utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
  containerClassName?: string;
  floatingLabel?: boolean;
  label?: React.ReactNode;
  labelClassName?: string;
};

function Textarea({
  className,
  containerClassName,
  floatingLabel = true,
  id,
  label,
  labelClassName,
  placeholder,
  ...props
}: TextareaProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;
  const shouldFloat = floatingLabel && Boolean(label);
  const textareaClassName = cn(
    "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/45 aria-invalid:border-destructive aria-invalid:bg-destructive/5 aria-invalid:ring-destructive/15 dark:aria-invalid:ring-destructive/30 dark:bg-input/30 flex field-sizing-content min-h-24 w-full resize-y rounded-md border bg-transparent px-3.5 py-2.5 text-sm shadow-none transition-[background-color,border-color,color,box-shadow] outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50",
    shouldFloat && "pt-4",
    className,
  );

  if (shouldFloat) {
    return (
      <div className={cn("relative w-full", containerClassName)}>
        <textarea
          id={controlId}
          data-slot="textarea"
          placeholder={placeholder}
          aria-label={
            props["aria-label"] ?? (typeof label === "string" ? label : undefined)
          }
          className={cn("peer", textareaClassName)}
          {...props}
        />
        <label
          htmlFor={controlId}
          className={cn(
            "pointer-events-none absolute -top-2 left-3 z-10 max-w-[calc(100%-1.5rem)] truncate rounded-sm bg-background px-1.5 text-xs font-medium leading-none text-muted-foreground transition-colors peer-focus:text-foreground peer-aria-invalid:text-destructive dark:bg-input",
            labelClassName,
          )}
        >
          {label}
        </label>
      </div>
    );
  }

  return (
    <textarea
      id={id}
      data-slot="textarea"
      placeholder={placeholder}
      className={textareaClassName}
      {...props}
    />
  );
}

export { Textarea };

