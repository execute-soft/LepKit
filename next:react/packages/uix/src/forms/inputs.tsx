import * as React from "react";

import { cn } from "../utils";
import { Input } from "../react/primitives";
import { useDebouncedValue } from "../hooks";

export type MoneyInputProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
  currencyPrefix?: React.ReactNode;
};

export function MoneyInput({ className, currencyPrefix, ...props }: MoneyInputProps) {
  if (!currencyPrefix) {
    return <Input type="number" inputMode="decimal" className={className} {...props} />;
  }

  return (
    <div className={cn("flex h-10 items-center rounded-md border border-input bg-transparent", className)}>
      <span className="px-3 text-sm text-muted-foreground">{currencyPrefix}</span>
      <Input
        type="number"
        inputMode="decimal"
        className="h-full min-w-0 flex-1 border-0 shadow-none focus-visible:ring-0"
        {...props}
      />
    </div>
  );
}

export type DateInputProps = Omit<React.ComponentProps<typeof Input>, "type">;

export function DateInput(props: DateInputProps) {
  return <Input type="date" {...props} />;
}

export type DateRangeInputProps = React.ComponentProps<"div"> & {
  startProps?: DateInputProps;
  endProps?: DateInputProps;
};

export function DateRangeInput({ className, startProps, endProps, ...props }: DateRangeInputProps) {
  return (
    <div className={cn("grid gap-2 sm:grid-cols-2", className)} {...props}>
      <DateInput aria-label="Start date" {...startProps} />
      <DateInput aria-label="End date" {...endProps} />
    </div>
  );
}

export type SearchInputProps = Omit<React.ComponentProps<typeof Input>, "type" | "onChange"> & {
  debounceMs?: number;
  onSearch?: (value: string) => void;
};

export function SearchInput({ debounceMs = 250, onSearch, value, defaultValue, ...props }: SearchInputProps) {
  const [currentValue, setCurrentValue] = React.useState(String(value ?? defaultValue ?? ""));
  const debouncedValue = useDebouncedValue(currentValue, debounceMs);

  React.useEffect(() => {
    onSearch?.(debouncedValue);
  }, [debouncedValue, onSearch]);

  React.useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(String(value));
    }
  }, [value]);

  return (
    <Input
      type="search"
      value={currentValue}
      onChange={(event) => setCurrentValue(event.currentTarget.value)}
      {...props}
    />
  );
}

export type MediaUploadFieldProps = Omit<React.ComponentProps<typeof Input>, "type">;

export function MediaUploadField(props: MediaUploadFieldProps) {
  return <Input type="file" {...props} />;
}

