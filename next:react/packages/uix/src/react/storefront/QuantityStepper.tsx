import { Minus, Plus } from "lucide-react";

import { clampQuantity } from "../../commerce";
import { cn } from "../../utils";

type QuantityStepperProps = Readonly<{
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  buttonClassName?: string;
}>;

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 999,
  className,
  buttonClassName,
}: QuantityStepperProps) {
  const current = clampQuantity(value, min, max);

  return (
    <div
      className={cn(
        "inline-flex h-9 items-center overflow-hidden rounded-md border border-border bg-background",
        className,
      )}
    >
      <button
        type="button"
        className={cn(
          "grid size-9 place-items-center text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
          buttonClassName,
        )}
        disabled={current <= min}
        onClick={() => onChange(clampQuantity(current - 1, min, max))}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-10 px-3 text-center text-sm font-semibold">
        {current}
      </span>
      <button
        type="button"
        className={cn(
          "grid size-9 place-items-center text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
          buttonClassName,
        )}
        disabled={current >= max}
        onClick={() => onChange(clampQuantity(current + 1, min, max))}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

