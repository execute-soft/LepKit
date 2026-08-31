import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { Button } from "./button";

export type IconButtonProps = Omit<React.ComponentProps<typeof Button>, "children"> & {
  icon: LucideIcon;
  label: string;
};

export function IconButton({ icon: Icon, label, size = "icon", ...props }: IconButtonProps) {
  return (
    <Button aria-label={label} title={label} size={size} {...props}>
      <Icon aria-hidden="true" />
    </Button>
  );
}
