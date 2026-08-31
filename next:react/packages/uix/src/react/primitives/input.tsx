import * as React from "react";

import { cn } from "../../utils";

type InputProps = React.ComponentProps<"input"> & {
  containerClassName?: string;
  "data-slot"?: string;
  floatingLabel?: boolean;
  label?: React.ReactNode;
  labelClassName?: string;
};

const floatingLabelTypes = new Set([
  undefined,
  "",
  "date",
  "datetime-local",
  "email",
  "month",
  "number",
  "password",
  "search",
  "tel",
  "text",
  "time",
  "url",
  "week",
]);

function Input({
  className,
  containerClassName,
  floatingLabel = true,
  id,
  label,
  labelClassName,
  placeholder,
  type,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;
  const shouldFloat =
    floatingLabel &&
    Boolean(label) &&
    floatingLabelTypes.has(type) &&
    props["data-slot"] !== "input-group-control";

  const inputClassName = cn(
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-10 w-full min-w-0 rounded-md border bg-transparent px-3.5 py-2 text-sm shadow-none transition-[background-color,border-color,color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:border-ring focus-visible:ring-ring/45 focus-visible:ring-[2px]",
    "aria-invalid:border-destructive aria-invalid:bg-destructive/5 aria-invalid:ring-destructive/15 dark:aria-invalid:ring-destructive/30",
    shouldFloat && "h-12 pt-2 pb-2",
    className,
  );

  if (shouldFloat) {
    return (
      <div className={cn("group relative w-full", containerClassName)}>
        <input
          id={controlId}
          type={type}
          data-slot="input"
          placeholder={placeholder}
          aria-label={
            props["aria-label"] ?? (typeof label === "string" ? label : undefined)
          }
          className={cn("peer", inputClassName)}
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
    <input
      id={id}
      type={type}
      data-slot="input"
      placeholder={placeholder}
      className={inputClassName}
      {...props}
    />
  );
}

export { Input };

