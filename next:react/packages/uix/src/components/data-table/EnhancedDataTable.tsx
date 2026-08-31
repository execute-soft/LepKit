"use client";

import React from "react";
import { DataTable } from "./DataTable";
import { BulkActions, type BulkAction } from "./BulkActions";
import { Input, Button } from "../../react/primitives";
import { Search, RefreshCw } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface EnhancedDataTableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  isLoading?: boolean;
  pagination?: Pagination | null;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  searchValue?: string;
  onSearchChange?: (search: string) => void;
  selectedRows?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onActionComplete?: () => void;
  bulkActions?: BulkAction[];
  searchPlaceholder?: string;
  className?: string;
  onRefresh?: () => void;
  serialStart?: number;
  showSerial?: boolean;
  onRowClick?: (row: T) => void;
}

export function EnhancedDataTable<T>({
  columns,
  data,
  isLoading = false,
  pagination,
  currentPage = 1,
  onPageChange,
  searchValue = "",
  onSearchChange,
  selectedRows = [],
  onSelectionChange,
  onActionComplete,
  bulkActions,
  searchPlaceholder = "Search...",
  className = "",
  onRefresh,
  serialStart,
  showSerial = true,
  onRowClick,
}: Readonly<EnhancedDataTableProps<T>>) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  const handlePageChange = (page: number) => {
    onPageChange?.(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (pagination && currentPage < pagination.totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    if (!pagination) return [];

    const { totalPages } = pagination;
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Search and Actions Bar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center lg:max-w-md">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
              className="pl-10"
              aria-label={searchPlaceholder}
              label="Search"
            />
          </div>
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="w-full sm:w-auto text-xs"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          )}
        </div>

        {/* Bulk Actions */}
        {bulkActions && (
          <div className="flex w-full justify-start lg:w-auto lg:justify-end">
            <BulkActions
              selectedIds={selectedRows}
              actions={bulkActions}
              onActionComplete={onActionComplete}
            />
          </div>
        )}
      </div>

      {/* Data Table */}
      <DataTable
        data={data}
        columns={columns}
        loading={isLoading}
        onSelectionChange={onSelectionChange}
        idField="id"
        serialStart={serialStart ?? ((currentPage - 1) * (pagination?.limit ?? data.length) + 1)}
        showSerial={showSerial}
        onRowClick={onRowClick}
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col gap-3 border-t border-border/60 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="text-xs font-medium text-muted-foreground">
            Showing {((currentPage - 1) * pagination.limit) + 1} to{" "}
            {Math.min(currentPage * pagination.limit, pagination.total)} of{" "}
            {pagination.total} results
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {/* Page Numbers */}
            <div className="flex flex-wrap items-center gap-1">
              {getPageNumbers().map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon-sm"
                  onClick={() => handlePageChange(page)}
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={!pagination || currentPage === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 
