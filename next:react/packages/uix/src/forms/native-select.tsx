import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "../utils";

function NativeSelect({
  className,
  containerClassName,
  label,
  labelClassName,
  size = "default",
  id,
  ...props
}: Omit<React.ComponentProps<"select">, "size"> & {
  containerClassName?: string;
  label?: React.ReactNode;
  labelClassName?: string;
  size?: "sm" | "default";
}) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;
  const shouldFloat = Boolean(label);

  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        containerClassName,
      )}
      data-slot="native-select-wrapper"
    >
      <select
        id={controlId}
        data-slot="native-select"
        data-size={size}
        aria-label={
          props["aria-label"] ?? (typeof label === "string" ? label : undefined)
        }
        className={cn(
          "peer border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 h-10 w-full min-w-0 appearance-none rounded-md border bg-transparent px-3.5 py-2 pr-10 text-sm shadow-none transition-[background-color,border-color,color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-9 data-[size=sm]:py-1.5",
          "focus-visible:border-ring focus-visible:ring-ring/45 focus-visible:ring-[2px]",
          "aria-invalid:border-destructive aria-invalid:bg-destructive/5 aria-invalid:ring-destructive/15 dark:aria-invalid:ring-destructive/30",
          shouldFloat &&
            "h-12 pt-2 pb-2 data-[size=sm]:h-11 data-[size=sm]:pt-3 data-[size=sm]:pb-2",
          className,
        )}
        {...props}
      />
      <ChevronDownIcon
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
      {shouldFloat ? (
        <label
          htmlFor={controlId}
          className={cn(
            "pointer-events-none absolute -top-2 left-3 z-10 max-w-[calc(100%-1.5rem)] truncate rounded-sm bg-background px-1.5 text-xs font-medium leading-none text-muted-foreground transition-colors peer-focus:text-foreground peer-aria-invalid:text-destructive dark:bg-input",
            labelClassName,
          )}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
