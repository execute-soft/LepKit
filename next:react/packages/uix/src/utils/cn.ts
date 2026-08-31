type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

function collectClassNames(value: ClassValue, classes: string[]) {
  if (!value) return;

  if (typeof value === "string" || typeof value === "number") {
    classes.push(String(value));
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectClassNames(item, classes));
    return;
  }

  Object.entries(value).forEach(([className, enabled]) => {
    if (enabled) classes.push(className);
  });
}

export function cn(...inputs: ClassValue[]) {
  const classes: string[] = [];
  inputs.forEach((input) => collectClassNames(input, classes));
  return classes.join(" ");
}

