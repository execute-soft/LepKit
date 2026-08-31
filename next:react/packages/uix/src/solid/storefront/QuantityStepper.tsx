/** @jsxImportSource solid-js */
import { clampQuantity } from "../../commerce";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  class?: string;
  buttonClass?: string;
};

export function QuantityStepper(props: QuantityStepperProps) {
  const min = () => props.min ?? 1;
  const max = () => props.max ?? 999;
  const current = () => clampQuantity(props.value, min(), max());
  const buttonClass = () =>
    props.buttonClass ??
    "grid size-9 place-items-center text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-40";

  return (
    <div
      class={
        props.class ??
        "inline-flex h-9 items-center overflow-hidden rounded-md border border-slate-200 bg-white"
      }
    >
      <button
        type="button"
        class={buttonClass()}
        disabled={current() <= min()}
        onClick={() => props.onChange(clampQuantity(current() - 1, min(), max()))}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span class="min-w-10 px-3 text-center text-sm font-semibold">
        {current()}
      </span>
      <button
        type="button"
        class={buttonClass()}
        disabled={current() >= max()}
        onClick={() => props.onChange(clampQuantity(current() + 1, min(), max()))}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
