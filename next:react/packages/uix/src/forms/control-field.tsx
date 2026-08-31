import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "../utils";

export type ControlFieldProps = {
  label: string;
  required?: boolean;
  error?: string | null;
  hint?: string | null;
  labelAccessory?: ReactNode;
  labelClassName?: string;
  controlLabel?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
};

const labelableControlNames = new Set([
  "DateInput",
  "Input",
  "MediaUploadField",
  "MoneyInput",
  "NativeSelect",
  "SearchInput",
  "SelectTrigger",
  "Textarea",
]);

function getElementName(element: ReactElement) {
  const type = element.type as {
    displayName?: string;
    name?: string;
  } | string;

  if (typeof type === "string") {
    return type;
  }

  return type.displayName || type.name || "";
}

export function ControlField({
  label,
  required,
  error,
  hint,
  labelAccessory,
  labelClassName,
  controlLabel = true,
  id,
  className,
  children,
}: Readonly<ControlFieldProps>) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const floatingLabel = (
    <>
      {label}
      {required ? <span className="text-destructive"> *</span> : null}
      {labelAccessory}
    </>
  );
  let didLabelControl = false;
  const controlProps = {
    id: controlId,
    label: controlLabel ? floatingLabel : undefined,
    labelClassName,
    "aria-label": label,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  };

  const applyControlProps = (node: ReactNode): ReactNode => {
    if (!isValidElement(node)) {
      return node;
    }

    const element = node as ReactElement<Record<string, unknown>>;
    const elementName = getElementName(element);

    if (!didLabelControl && labelableControlNames.has(elementName)) {
      didLabelControl = true;
      return cloneElement(element, controlProps);
    }

    const childNodes = element.props.children as ReactNode;
    if (!childNodes) {
      return element;
    }

    const nextChildren = Children.map(childNodes, applyControlProps);

    return cloneElement(element, undefined, nextChildren);
  };

  const control = applyControlProps(children);

  return (
    <div className={cn("grid gap-2.5", className)}>
      <span className="sr-only">
        {label}
        {required ? " required" : ""}
      </span>
      {control}
      {hint ? (
        <p
          id={hintId}
          className="min-h-4 text-xs leading-4 text-muted-foreground"
        >
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={errorId}
          className="min-h-4 text-xs font-medium leading-4 text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
