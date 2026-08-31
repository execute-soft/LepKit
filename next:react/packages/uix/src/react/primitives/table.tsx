"use client";

import * as React from "react";

import { cn } from "../../utils";

type TableProps = React.ComponentProps<"table"> & {
  containerClassName?: string;
};

function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative mt-4 w-full max-w-full overflow-x-auto rounded-lg border border-border/80 bg-background shadow-none",
        containerClassName,
      )}
    >
      <table
        data-slot="table"
        className={cn("w-full min-w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-muted/35 [&_tr]:border-b [&_tr]:border-border/70", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-border/70 bg-muted/45 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border/60 transition-colors hover:bg-muted/40 data-[state=selected]:bg-primary/8",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 !px-3 !py-2 text-left align-middle text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground whitespace-nowrap [&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:!px-3 [&>[role=checkbox]]:translate-y-[1px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "!px-3 !py-2.5 align-middle text-sm whitespace-nowrap [&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:!px-3 [&>[role=checkbox]]:translate-y-[1px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
