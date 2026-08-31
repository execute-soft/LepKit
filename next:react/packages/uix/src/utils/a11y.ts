export const visuallyHiddenClassName =
  "sr-only absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0";

export function getAriaDescribedBy(...ids: Array<string | undefined | false | null>) {
  const describedBy = ids.filter(Boolean).join(" ");
  return describedBy || undefined;
}

