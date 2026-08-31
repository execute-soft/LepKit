import React from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../react/primitives";
import { MoreHorizontal } from "lucide-react";

export interface RowAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?:
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
}

interface RowActionsProps {
  actions: RowAction[];
}

export const RowActions: React.FC<RowActionsProps> = ({ actions }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Open row actions"
          className="text-muted-foreground hover:text-foreground"
          data-row-click="ignore"
        >
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-44 rounded border border-border/60 bg-popover/95 p-1 shadow shadow-black/10 backdrop-blur-sm"
        sideOffset={8}
        data-row-click="ignore"
      >
        {actions.map((action, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={action.onClick}
            variant={action.variant === "destructive" ? "destructive" : "default"}
            className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-xs transition-colors focus:bg-accent"
          >
            {action.icon && <span className="h-4 w-4">{action.icon}</span>}
            <span className="text-[13px] font-medium">{action.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
