"use client";

import * as React from "react";
import { useField, useFormikContext } from "formik";
import { CalendarIcon } from "lucide-react";

import { Button, Calendar, Input, Popover, PopoverContent, PopoverTrigger } from "../../react/primitives";
import { cn } from "../../utils";

type FormikDateInputType = "date" | "time" | "datetime-local";

type FormikDateInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: FormikDateInputType;
  required?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  className?: string;
  buttonClassName?: string;
  hint?: string;
};

const pad = (value: number) => String(value).padStart(2, "0");

const toDateString = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const toDateTimeString = (date: Date) =>
  `${toDateString(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}`;

const toTimeString = (date: Date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;

const parseFieldValue = (value: unknown): Date | null => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }
  const normalized = value.includes("T") ? value : `${value}T00:00`;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const parseTimeValue = (value: unknown): Date | null => {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  const [hours, minutes] = value.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return null;
  }

  const parsed = new Date();
  parsed.setSeconds(0, 0);
  parsed.setHours(hours || 0, minutes || 0, 0, 0);
  return parsed;
};

const formatDisplayValue = (date: Date | null, type: FormikDateInputType) => {
  if (!date) return "";

  if (type === "time") {
    return toTimeString(date);
  }

  return type === "datetime-local"
    ? date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    : date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
};

export default function FormikDateInput({
  name,
  label,
  placeholder,
  type = "date",
  required = false,
  disabled = false,
  hideLabel = false,
  className,
  buttonClassName,
  hint,
}: Readonly<FormikDateInputProps>) {
  const { setFieldValue, setFieldTouched } = useFormikContext<Record<string, unknown>>();
  const [field, meta] = useField<string>(name);
  const [open, setOpen] = React.useState(false);

  const selectedDate = React.useMemo(
    () => (type === "time" ? parseTimeValue(field.value) : parseFieldValue(field.value)),
    [field.value, type]
  );
  const error = meta.touched ? meta.error : undefined;
  const controlId = label ?? name;
  const isDateSelectionEnabled = type !== "time";
  const usesInlineTimeField = type === "time";

  const updateValue = React.useCallback(
    (date: Date | null) => {
      if (!date) {
        setFieldValue(name, "");
        return;
      }

      if (type === "time") {
        setFieldValue(name, toTimeString(date));
        return;
      }

      setFieldValue(name, type === "datetime-local" ? toDateTimeString(date) : toDateString(date));
    },
    [name, setFieldValue, type]
  );

  const handleSelect = React.useCallback(
    (date: Date | undefined) => {
      setFieldTouched(name, true, false);

      if (!date) {
        updateValue(null);
        return;
      }

      const nextDate = selectedDate ? new Date(selectedDate) : new Date();
      nextDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      updateValue(nextDate);

      if (type === "date") {
        setOpen(false);
      }
    },
    [name, selectedDate, setFieldTouched, type, updateValue]
  );

  const handleTimeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldTouched(name, true, false);

      const timeValue = event.target.value;
      if (!timeValue) {
        updateValue(selectedDate);
        return;
      }

      const [hours, minutes] = timeValue.split(":").map(Number);
      const nextDate = selectedDate ? new Date(selectedDate) : new Date();
      nextDate.setSeconds(0, 0);
      nextDate.setHours(hours || 0, minutes || 0, 0, 0);
      updateValue(nextDate);
    },
    [name, selectedDate, setFieldTouched, updateValue]
  );

  return (
    <div className={cn("grid gap-2", className)}>
      {label ? (
        <label
          htmlFor={controlId}
          className={cn("text-sm font-medium", hideLabel ? "sr-only" : "")}
        >
          {label}
          {required ? <span className="text-red-500"> *</span> : null}
        </label>
      ) : null}

      <div className="grid gap-2">
        {isDateSelectionEnabled ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id={controlId}
                type="button"
                variant="outline"
                disabled={disabled}
                className={cn(
                  "w-full justify-between text-left font-normal",
                  !selectedDate && "text-muted-foreground",
                  error && "border-red-500",
                  buttonClassName
                )}
              >
                <span>{formatDisplayValue(selectedDate, type) || placeholder || "Select date"}</span>
                <CalendarIcon className="size-4 opacity-70" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate ?? undefined}
                onSelect={handleSelect}
                initialFocus
              />
              {type === "datetime-local" ? (
                <div className="border-t p-3">
                  <div className="grid gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Time
                    </label>
                    <Input
                      type="time"
                      step="60"
                      disabled={disabled}
                      value={selectedDate ? toTimeString(selectedDate) : ""}
                      onChange={handleTimeChange}
                      className={cn("w-full", error && "border-red-500")}
                    />
                  </div>
                </div>
              ) : null}
            </PopoverContent>
          </Popover>
        ) : null}

        {usesInlineTimeField ? (
          <Input
            type="time"
            step="60"
            disabled={disabled}
            id={controlId}
            value={selectedDate ? toTimeString(selectedDate) : ""}
            onChange={handleTimeChange}
            className={cn(error && "border-red-500")}
          />
        ) : null}
      </div>

      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
