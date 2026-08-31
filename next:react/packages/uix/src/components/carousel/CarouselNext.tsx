/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import { Show } from "solid-js";
import { useCarousel } from "./CarouselContext";

type CarouselButtonProps = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  iconClass?: string;
};

export function CarouselNext(props: CarouselButtonProps) {
  const carousel = useCarousel();

  return (
    <button
      {...props}
      class={props.class}
      type={props.type ?? "button"}
      disabled={props.disabled || !carousel.canScrollNext()}
      onClick={() => carousel.scrollNext()}
    >
      <Show when={props.children} fallback={<ChevronRight class={props.iconClass} />}>
        {props.children}
      </Show>
    </button>
  );
}

function ChevronRight(props: { class?: string }) {
  return (
    <svg class={props.class ?? "h-5 w-5"} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
