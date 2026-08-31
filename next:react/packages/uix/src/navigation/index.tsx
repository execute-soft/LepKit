import * as React from "react";

import { cn } from "../utils";

export * from "./navigation-menu";

export type BreadcrumbsProps = React.ComponentProps<"nav">;

export function Breadcrumbs({ className, ...props }: BreadcrumbsProps) {
  return <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)} {...props} />;
}

export type NavListProps = React.ComponentProps<"nav">;

export function NavList({ className, ...props }: NavListProps) {
  return <nav className={cn("flex flex-col gap-1", className)} {...props} />;
}

export type SideNavProps = NavListProps;

export function SideNav({ className, ...props }: SideNavProps) {
  return <NavList className={cn("w-full min-w-0", className)} {...props} />;
}

export type MobileNavProps = NavListProps;

export function MobileNav({ className, ...props }: MobileNavProps) {
  return <NavList className={cn("gap-2 p-2", className)} {...props} />;
}

export type CommandMenuProps = React.ComponentProps<"div">;

export function CommandMenu({ className, ...props }: CommandMenuProps) {
  return <div className={cn("rounded-md border bg-popover text-popover-foreground shadow-md", className)} {...props} />;
}
