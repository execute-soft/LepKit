import { useField } from "formik";

import { Switch } from "../react/primitives";
import { cn } from "../utils";

export type FormSwitchInputProps = {
  name: string;
  label: string;
  description?: string;
  wrapperClassName?: string;
};

export function FormSwitchInput({
  name,
  label,
  description,
  wrapperClassName,
}: Readonly<FormSwitchInputProps>) {
  const [field, , helpers] = useField<boolean>(name);

  return (
    <div className={cn("flex items-center gap-3", wrapperClassName)}>
      <Switch
        checked={Boolean(field.value)}
        onCheckedChange={(value) => helpers.setValue(Boolean(value))}
      />
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
