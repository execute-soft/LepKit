import { type ChangeEvent, type ComponentProps } from "react";
import { useField, type FieldHelperProps } from "formik";

import { Input, Textarea } from "../react/primitives";
import { cn } from "../utils";
import { ControlField } from "./control-field";

export type FormInputFieldProps = {
  name: string;
  label: string;
  as?: "input" | "textarea";
  rows?: number;
  hint?: string;
  required?: boolean;
  hideLabel?: boolean;
  showError?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  onValueChange?: (
    value: string,
    helpers: FieldHelperProps<string>,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
} & Omit<ComponentProps<typeof Input>, "name" | "onChange" | "value" | "as"> &
  Omit<ComponentProps<typeof Textarea>, "name" | "onChange" | "value">;

export function FormInputField({
  name,
  label,
  as = "input",
  rows,
  hint,
  required,
  hideLabel,
  showError = true,
  wrapperClassName,
  labelClassName,
  inputClassName,
  onValueChange,
  id,
  className,
  ...rest
}: Readonly<FormInputFieldProps>) {
  const [field, meta, helpers] = useField<string>(name);
  const error = meta.touched ? meta.error : undefined;
  const Component = as === "textarea" ? Textarea : Input;
  const controlId = id ?? name;
  const useFloatingControlLabel = !hideLabel;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (onValueChange) {
      onValueChange(event.target.value, helpers, event);
      return;
    }

    field.onChange(event);
  };

  return (
    <ControlField
      label={label}
      required={required}
      hint={hint}
      error={showError ? error : undefined}
      id={controlId}
      labelClassName={labelClassName}
      controlLabel={useFloatingControlLabel}
      className={cn(hideLabel && "gap-1.5", wrapperClassName)}
    >
      <Component
        {...field}
        {...rest}
        rows={as === "textarea" ? rows : undefined}
        floatingLabel={useFloatingControlLabel}
        onChange={handleChange}
        className={cn(inputClassName, className)}
      />
    </ControlField>
  );
}
