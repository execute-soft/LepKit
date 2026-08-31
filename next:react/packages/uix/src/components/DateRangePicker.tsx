"use client";

import React from "react";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "../react/primitives";
import { cn } from "../utils";
import { formatDate } from "../utils/formatDate";

interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DateRangePicker({ value, onChange, placeholder = "Pick a date range", className }: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("justify-start text-left font-normal text-xs", !value && "text-muted-foreground", className)}
        >
          <CalendarIcon className="mr-2 size-3.5" />
          {value?.from ? (
            value.to ? (
              <>
                {formatDate(value.from, { dateStyle: "medium" })} – {formatDate(value.to, { dateStyle: "medium" })}
              </>
            ) : (
              formatDate(value.from, { dateStyle: "medium" })
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="range" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
}
