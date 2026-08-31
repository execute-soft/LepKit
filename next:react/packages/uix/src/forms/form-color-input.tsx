import { useField } from "formik";

import { Input } from "../react/primitives";
import { cn } from "../utils";

export type FormColorInputProps = {
  name: string;
  label: string;
  wrapperClassName?: string;
  labelClassName?: string;
  showError?: boolean;
};

export function FormColorInput({
  name,
  label,
  wrapperClassName,
  labelClassName,
  showError = true,
}: Readonly<FormColorInputProps>) {
  const [field, meta, helpers] = useField<string>(name);
  const error = meta.touched ? meta.error : undefined;

  return (
    <div className={cn("grid gap-2", wrapperClassName)}>
      <label
        className={cn(
          "text-xs font-medium text-muted-foreground",
          labelClassName,
        )}
      >
        {label}
      </label>
      <div className="flex items-center gap-2">
        <Input
          type="color"
          value={field.value || "#111827"}
          onChange={(event) => helpers.setValue(event.target.value)}
          className="h-9 w-12 px-1"
        />
        <Input
          value={field.value || ""}
          onChange={(event) => helpers.setValue(event.target.value)}
          placeholder="#111827"
        />
      </div>
      {showError && error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : null}
    </div>
  );
}
