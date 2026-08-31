"use client";

import React from "react";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  SortingState,
  OnChangeFn,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../react/primitives";



interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: any;
  className?: string;
  loading?: boolean;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  onRowClick?: (row: T) => void;
  isBorderless?: boolean;
  isBorderBottomOnly?: boolean;
  isBorderTopOnly?: boolean;
  isBorderRightOnly?: boolean;
  isBorderLeftOnly?: boolean;
  isBorderTopRightOnly?: boolean;
  isBorderTopLeftOnly?: boolean;
  isBorderBottomRightOnly?: boolean;
  isBorderBottomLeftOnly?: boolean;
  isBorderTopRightBottomOnly?: boolean;
  isBorderTopLeftBottomOnly?: boolean;
  isBorderBottomRightLeftOnly?: boolean;
  isBorderBottomLeftRightOnly?: boolean;
  checkDisabled?: boolean;
  checkedHidden?: boolean;

  limits?: number;
  onSelectionChange?: (selectedIds: string[]) => void;
  selectedIds?: string[];
  idField?: string;
  serialStart?: number;
  showSerial?: boolean;
}

// Define a type for just the border props
export type BorderProps = {
  isBorderless?: boolean;
  isBorderBottomOnly?: boolean;
  isBorderTopOnly?: boolean;
  isBorderRightOnly?: boolean;
  isBorderLeftOnly?: boolean;
  isBorderTopRightOnly?: boolean;
  isBorderTopLeftOnly?: boolean;
  isBorderBottomRightOnly?: boolean;
  isBorderBottomLeftOnly?: boolean;
  isBorderTopRightBottomOnly?: boolean;
  isBorderTopLeftBottomOnly?: boolean;
  isBorderBottomRightLeftOnly?: boolean;
  isBorderBottomLeftRightOnly?: boolean;
};

function getBorderClass(props: BorderProps) {
  if (props.isBorderless) return "border-none";
  if (props.isBorderBottomOnly) return "border-b border-border/60";
  if (props.isBorderTopOnly) return "border-t border-border/60";
  if (props.isBorderRightOnly) return "border-r border-border/60";
  if (props.isBorderLeftOnly) return "border-l border-border/60";
  if (props.isBorderTopRightOnly) return "border-t border-r border-border/60";
  if (props.isBorderTopLeftOnly) return "border-t border-l border-border/60";
  if (props.isBorderBottomRightOnly) return "border-b border-r border-border/60";
  if (props.isBorderBottomLeftOnly) return "border-b border-l border-border/60";
  if (props.isBorderTopRightBottomOnly)
    return "border-t border-r border-b border-border/60";
  if (props.isBorderTopLeftBottomOnly)
    return "border-t border-l border-b border-border/60";
  if (props.isBorderBottomRightLeftOnly)
    return "border-b border-r border-l border-border/60";
  if (props.isBorderBottomLeftRightOnly)
    return "border-b border-l border-r border-border/60";
  return "border-b border-border/60";
}

export function DataTable<T>({
  data,
  columns,
  className,
  loading = false,
  sorting: externalSorting,
  onSortingChange: externalOnSortingChange,
  onRowClick,
  isBorderless = false,
  limits = 20,
  isBorderBottomOnly = false,
  isBorderTopOnly = false,
  isBorderRightOnly = false,
  isBorderLeftOnly = false,
  isBorderTopRightOnly = false,
  isBorderTopLeftOnly = false,
  isBorderBottomRightOnly = false,
  isBorderBottomLeftOnly = false,
  isBorderTopRightBottomOnly = false,
  isBorderTopLeftBottomOnly = false,
  isBorderBottomRightLeftOnly = false,
  isBorderBottomLeftRightOnly = false,
  onSelectionChange,
  selectedIds,
  idField = "id",
  serialStart = 1,
  showSerial = true,
  checkDisabled = false,
  checkedHidden = false,
  ...props
}: Readonly<DataTableProps<T>>) {
  const hasSameIds = React.useCallback((left: string[], right: string[]) => {
    return (
      left.length === right.length &&
      left.every((value, index) => value === right[index])
    );
  }, []);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const resolvedSorting = externalSorting ?? sorting;
  const handleSortingChange: OnChangeFn<SortingState> =
    externalOnSortingChange ?? setSorting;

  React.useEffect(() => {
    if (selectedIds === undefined || checkedHidden) {
      return;
    }

    const nextSelection: Record<string, boolean> = {};
    selectedIds.forEach((id) => {
      nextSelection[String(id)] = true;
    });

    setRowSelection((currentSelection: RowSelectionState) => {
      const currentMap = currentSelection as Record<string, boolean>;
      const currentKeys = Object.keys(currentMap);
      const nextKeys = Object.keys(nextSelection);
      const hasSameSelection =
        currentKeys.length === nextKeys.length &&
        currentKeys.every((key) => currentMap[key] === nextSelection[key]);

      return hasSameSelection
        ? currentSelection
        : (nextSelection as RowSelectionState);
    });
  }, [checkedHidden, selectedIds]);

  // Add checkbox column
  const checkboxColumn: ColumnDef<T, any> = {
    id: "select",
    header: ({ table }: { table: any }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-0.5"
        disabled={checkDisabled}
      />
    ),
    cell: ({ row }: { row: any }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean | "indeterminate") =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
        className="translate-y-0.5"
        disabled={checkDisabled}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const serialColumn: ColumnDef<T, any> = {
    id: "sl",
    header: "SL",
    cell: ({ row }: { row: any }) => serialStart + row.index,
    enableSorting: false,
    enableHiding: false,
  };

  const tableColumns = React.useMemo(
    () => [
      ...(checkedHidden ? [] : [checkboxColumn]),
      ...(showSerial ? [serialColumn] : []),
      ...columns,
    ],
    [checkedHidden, checkboxColumn, columns, serialColumn, showSerial],
  );

  const table = useReactTable<T>({
    data,
    columns: tableColumns,
    getRowId: (originalRow: T) =>
      String((originalRow as Record<string, unknown>)[idField]),
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: Boolean(externalSorting),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting: resolvedSorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      ...(externalSorting ? {} : { sorting: [{ id: "name", desc: true }] }),
    },
  });

  const selectedRowIds = React.useMemo(
    () =>
      table
        .getSelectedRowModel()
        .rows.map((row: any) => String((row.original as any)[idField])),
    [idField, rowSelection, table],
  );

  const lastNotifiedSelectionRef = React.useRef<string[]>([]);

  // Call onSelectionChange when selection changes
  React.useEffect(() => {
    if (!onSelectionChange || checkedHidden) {
      return;
    }

    const normalizedSelectedIds = (selectedIds ?? []).map((id) => String(id));

    if (hasSameIds(lastNotifiedSelectionRef.current, selectedRowIds)) {
      return;
    }

    if (hasSameIds(normalizedSelectedIds, selectedRowIds)) {
      lastNotifiedSelectionRef.current = selectedRowIds;
      return;
    }

    lastNotifiedSelectionRef.current = selectedRowIds;
    onSelectionChange(selectedRowIds);
  }, [
    checkedHidden,
    hasSameIds,
    onSelectionChange,
    selectedIds,
    selectedRowIds,
  ]);

  if (loading) {
    const loadingColumnCount =
      columns.length + (showSerial ? 1 : 0) + (checkedHidden ? 0 : 1);

    return (
      <Table>
        <TableBody>
          {Array.from({ length: limits }).map((_, index) => (
            <TableRow
              key={index}
              className={getBorderClass({
                isBorderless,
                isBorderBottomOnly,
                isBorderTopOnly,
                isBorderRightOnly,
                isBorderLeftOnly,
                isBorderTopRightOnly,
                isBorderTopLeftOnly,
                isBorderBottomRightOnly,
                isBorderBottomLeftOnly,
                isBorderTopRightBottomOnly,
                isBorderTopLeftBottomOnly,
                isBorderBottomRightLeftOnly,
                isBorderBottomLeftRightOnly,
              })}
            >
              {Array.from({ length: loadingColumnCount }).map(
                (_, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className={`h-7 bg-gray-200/50 dark:bg-muted animate-pulse ${getBorderClass(
                      {
                        isBorderless,
                        isBorderBottomOnly,
                        isBorderTopOnly,
                        isBorderRightOnly,
                        isBorderLeftOnly,
                        isBorderTopRightOnly,
                        isBorderTopLeftOnly,
                        isBorderBottomRightOnly,
                        isBorderBottomLeftOnly,
                        isBorderTopRightBottomOnly,
                        isBorderTopLeftBottomOnly,
                        isBorderBottomRightLeftOnly,
                        isBorderBottomLeftRightOnly,
                      }
                    )}`}
                  >
                    <div className="bg-gray-200 dark:bg-secondary h-6 w-full rounded animate-pulse"></div>
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  const divProps = { ...props } as React.HTMLAttributes<HTMLDivElement> & {
    onRowClick?: unknown;
  };
  delete divProps.onRowClick;

  return (
    <div {...divProps} className={className}>
      <Table className="min-w-full text-xs">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow
              key={headerGroup.id}
              className={`bg-transparent text-muted-foreground hover:bg-transparent ${getBorderClass(
                {
                  isBorderless,
                  isBorderBottomOnly,
                  isBorderTopOnly,
                  isBorderRightOnly,
                  isBorderLeftOnly,
                  isBorderTopRightOnly,
                  isBorderTopLeftOnly,
                  isBorderBottomRightOnly,
                  isBorderBottomLeftOnly,
                  isBorderTopRightBottomOnly,
                  isBorderTopLeftBottomOnly,
                  isBorderBottomRightLeftOnly,
                  isBorderBottomLeftRightOnly,
                }
              )}`}
            >
              {headerGroup.headers.map((header: any) => (
                <TableHead
                  key={header.id}
                  className={`${header.column?.id === "sl" ? "w-14 text-center" : ""} ${header.column?.id === "actions" ? "sticky right-0 z-20 bg-muted/35 text-right shadow-[-8px_0_12px_-12px_rgba(0,0,0,0.18)]" : ""} ${getBorderClass({
                    isBorderless,
                    isBorderBottomOnly,
                    isBorderTopOnly,
                    isBorderRightOnly,
                    isBorderLeftOnly,
                    isBorderTopRightOnly,
                    isBorderTopLeftOnly,
                    isBorderBottomRightOnly,
                    isBorderBottomLeftOnly,
                    isBorderTopRightBottomOnly,
                    isBorderTopLeftBottomOnly,
                    isBorderBottomRightLeftOnly,
                    isBorderBottomLeftRightOnly,
                  })}`}
                  aria-sort={
                    header.column.getIsSorted() === "asc"
                      ? "ascending"
                      : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : "none"
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : header.column.getCanSort()
                      ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-1.5 text-left transition-colors hover:text-foreground"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getIsSorted() === "asc" ? (
                            <ChevronUp className="size-3.5 text-muted-foreground" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ChevronDown className="size-3.5 text-muted-foreground" />
                          ) : (
                            <ArrowUpDown className="size-3.5 text-muted-foreground/70" />
                          )}
                        </button>
                      )
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row: any, _idx: any) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`group text-xs ${onRowClick ? "cursor-pointer" : ""} ${getBorderClass({
                  isBorderless,
                  isBorderBottomOnly,
                  isBorderTopOnly,
                  isBorderRightOnly,
                  isBorderLeftOnly,
                  isBorderTopRightOnly,
                  isBorderTopLeftOnly,
                  isBorderBottomRightOnly,
                  isBorderBottomLeftOnly,
                  isBorderTopRightBottomOnly,
                  isBorderTopLeftBottomOnly,
                  isBorderBottomRightLeftOnly,
                  isBorderBottomLeftRightOnly,
                })}`}
                onClick={(event) => {
                  if (!onRowClick) return;
                  const target = event.target as HTMLElement | null;
                  if (!target) return;
                  if (target.closest("[data-row-click='ignore']")) return;
                  if (target.closest("button, a, input, select, textarea, [role='button'], [role='menuitem']")) return;
                  onRowClick(row.original as T);
                }}
              >
                {row.getAllCells().map((cell: any) => (
                  <TableCell
                    key={cell.id}
                    className={`text-foreground ${cell.column?.id === "sl" ? "w-14 text-center font-mono text-xs text-muted-foreground" : ""} ${cell.column?.id === "actions" ? "sticky right-0 z-10 bg-background text-right shadow-[-8px_0_12px_-12px_rgba(0,0,0,0.16)]" : ""} ${getBorderClass({
                      isBorderless,
                      isBorderBottomOnly,
                      isBorderTopOnly,
                      isBorderRightOnly,
                      isBorderLeftOnly,
                      isBorderTopRightOnly,
                      isBorderTopLeftOnly,
                      isBorderBottomRightOnly,
                      isBorderBottomLeftOnly,
                      isBorderTopRightBottomOnly,
                      isBorderTopLeftBottomOnly,
                      isBorderBottomRightLeftOnly,
                      isBorderBottomLeftRightOnly,
                    })}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow
              className={getBorderClass({
                isBorderless,
                isBorderBottomOnly,
                isBorderTopOnly,
                isBorderRightOnly,
                isBorderLeftOnly,
                isBorderTopRightOnly,
                isBorderTopLeftOnly,
                isBorderBottomRightOnly,
                isBorderBottomLeftOnly,
                isBorderTopRightBottomOnly,
                isBorderTopLeftBottomOnly,
                isBorderBottomRightLeftOnly,
                isBorderBottomLeftRightOnly,
              })}
            >
              <TableCell
                colSpan={columns.length + (showSerial ? 1 : 0) + (checkedHidden ? 0 : 1)}
                className={`h-24 text-center text-muted-foreground text-xs ${getBorderClass(
                  {
                    isBorderless,
                    isBorderBottomOnly,
                    isBorderTopOnly,
                    isBorderRightOnly,
                    isBorderLeftOnly,
                    isBorderTopRightOnly,
                    isBorderTopLeftOnly,
                    isBorderBottomRightOnly,
                    isBorderBottomLeftOnly,
                    isBorderTopRightBottomOnly,
                    isBorderTopLeftBottomOnly,
                    isBorderBottomRightLeftOnly,
                    isBorderBottomLeftRightOnly,
                  }
                )}`}
              >
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
