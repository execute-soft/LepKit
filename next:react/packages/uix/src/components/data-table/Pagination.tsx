"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface PaginationProps {
  numberOfData: number;
  limits: number;
  activePage: number;
  className?: string;
  getCurrentPage?: (page: number) => void;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
  pageSizeOptions?: number[];
  rowsPerPageOptions?: number[];
  [key: string]: unknown;
}

interface RowsPerPageSelectProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
}

const RowsPerPageSelect: React.FC<RowsPerPageSelectProps> = ({
  value,
  options,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-9 min-w-16 items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground shadow-none transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring/40 dark:bg-input/30 dark:hover:bg-input/50"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{value}</span>
        <ChevronDown aria-hidden="true" className="size-3.5 text-muted-foreground" />
      </button>

      {open ? (
        <div className="absolute bottom-full left-0 z-50 mb-1 w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md">
          <div role="listbox" aria-label="Rows per page" className="py-1">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={option === value}
                className={`block w-full px-3 py-1.5 text-left text-xs font-medium transition-colors ${
                  option === value
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const Pagination: React.FC<PaginationProps> = ({
  numberOfData,
  limits,
  className,
  getCurrentPage,
  onPageChange,
  activePage = 1,
  onRowsPerPageChange,
  pageSizeOptions,
  rowsPerPageOptions = [10, 20, 25, 50, 100],
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState<number>(activePage);
  const [rowsPerPage, setRowsPerPage] = useState<number>(limits);
  const resolvedRowsPerPageOptions = Array.from(
    new Set([...(pageSizeOptions ?? rowsPerPageOptions), limits])
  ).sort((a, b) => a - b);
  const numberOfPage = useMemo(() => {
    if (numberOfData <= 0) {
      return 1;
    }
    return Math.max(1, Math.ceil(numberOfData / rowsPerPage));
  }, [numberOfData, rowsPerPage]);

  useEffect(() => {
    setRowsPerPage(limits);
  }, [limits]);

  useEffect(() => {
    const nextPage = Math.min(Math.max(activePage, 1), numberOfPage);
    setCurrentPage(nextPage);
  }, [activePage, numberOfPage]);

  useEffect(() => {
    if (activePage > numberOfPage && numberOfPage > 0) {
      if (getCurrentPage) {
        getCurrentPage(numberOfPage);
      }
      if (onPageChange) {
        onPageChange(numberOfPage);
      }
    }
  }, [activePage, getCurrentPage, numberOfPage, onPageChange]);

  const setLimitHandler = (index: number) => {
    const nextPage = Math.min(Math.max(index + 1, 1), numberOfPage);
    setCurrentPage(nextPage);
    if (getCurrentPage) {
      getCurrentPage(nextPage);
    }
    if (onPageChange) {
      onPageChange(nextPage);
    }
  };

  const handleRowsPerPageChange = (newRows: number) => {
    setRowsPerPage(newRows);
    setCurrentPage(1);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(newRows);
    } else {
      if (getCurrentPage) {
        getCurrentPage(1);
      }
      if (onPageChange) {
        onPageChange(1);
      }
    }
  };

  const getDisplayedPages = () => {
    const maxButtonsToShow = 5;
    let pages: number[] = [];

    if (numberOfPage <= maxButtonsToShow) {
      for (let i = 1; i <= numberOfPage; i++) {
        pages.push(i);
      }
    } else {
      if (safeCurrentPage <= 5) {
        pages = [1, 2, 3, 4, 5];
      } else if (safeCurrentPage > numberOfPage - 4) {
        pages = [
          numberOfPage - 4,
          numberOfPage - 3,
          numberOfPage - 2,
          numberOfPage - 1,
          numberOfPage,
        ];
      } else {
        pages = [
          safeCurrentPage - 2,
          safeCurrentPage - 1,
          safeCurrentPage,
          safeCurrentPage + 1,
          safeCurrentPage + 2,
        ];
      }
    }

    return pages;
  };

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), numberOfPage);
  const startIdx = numberOfData === 0 ? 0 : (safeCurrentPage - 1) * rowsPerPage + 1;
  const endIdx = Math.min(safeCurrentPage * rowsPerPage, numberOfData);

  return (
    <div
      {...props}
      className={`flex w-full flex-col gap-3 border-t border-border/60 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between ${className ?? ""}`}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="shrink-0 font-medium">Rows per page</span>
        <RowsPerPageSelect
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          options={resolvedRowsPerPageOptions}
        />
        <span className="shrink-0 font-medium">
          {startIdx}-{endIdx} of {numberOfData}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="min-w-24 text-xs font-medium text-muted-foreground">
          Page {safeCurrentPage} of {numberOfPage}
        </span>
        <button
          type="button"
          disabled={safeCurrentPage === 1}
          onClick={() => setLimitHandler(safeCurrentPage - 2)}
          className={`flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground shadow-none transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 dark:bg-input/30 ${safeCurrentPage === 1 && "opacity-50"
            } `}
        >
          Prev
        </button>

        {safeCurrentPage > 5 && numberOfPage > 5 && (
          <button
            type="button"
            onClick={() => setLimitHandler(0)}
            className={`flex size-9 items-center justify-center rounded-md border text-xs font-medium shadow-none transition-colors ${safeCurrentPage === 1 ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background text-foreground hover:bg-accent dark:bg-input/30"
              }`}
          >
            1
          </button>
        )}
        {safeCurrentPage > 5 && numberOfPage > 5 && (
          <span className="flex size-9 items-center justify-center rounded-md border border-input bg-background text-xs font-medium text-muted-foreground dark:bg-input/30">
            ...
          </span>
        )}

        {getDisplayedPages().map((each) => (
          <button
            key={each}
            type="button"
            onClick={() => setLimitHandler(each - 1)}
            className={`flex size-9 items-center justify-center rounded-md border text-xs font-medium shadow-none transition-colors ${safeCurrentPage === each
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-background text-foreground hover:bg-accent dark:bg-input/30"
              }`}
          >
            {each}
          </button>
        ))}

        {safeCurrentPage <= numberOfPage - 5 && numberOfPage > 5 && (
          <span className="flex size-9 items-center justify-center rounded-md border border-input bg-background text-xs font-medium text-muted-foreground dark:bg-input/30">
            ...
          </span>
        )}
        {safeCurrentPage <= numberOfPage - 5 && numberOfPage > 5 && (
          <button
            type="button"
            onClick={() => setLimitHandler(numberOfPage - 1)}
            className={`flex size-9 items-center justify-center rounded-md border text-xs font-medium shadow-none transition-colors ${safeCurrentPage === numberOfPage
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-background text-foreground hover:bg-accent dark:bg-input/30"
              }`}
          >
            {numberOfPage}
          </button>
        )}

        <button
          type="button"
          disabled={numberOfPage <= 1 || numberOfPage === safeCurrentPage}
          onClick={() => setLimitHandler(safeCurrentPage)}
          className={`flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground shadow-none transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 dark:bg-input/30 ${(numberOfPage <= 1 || numberOfPage === safeCurrentPage) && "opacity-50"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
