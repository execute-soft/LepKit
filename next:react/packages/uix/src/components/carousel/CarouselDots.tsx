/** @jsxImportSource solid-js */
import { For, Show } from "solid-js";
import { useCarousel } from "./CarouselContext";

type CarouselDotsProps = {
  activeClass?: string;
  buttonClass?: string;
  class?: string;
  inactiveClass?: string;
  label: string;
};

export function CarouselDots(props: CarouselDotsProps) {
  const carousel = useCarousel();

  return (
    <Show when={carousel.scrollSnapCount() > 1}>
      <div class={`flex items-center justify-center gap-3 ${props.class ?? ""}`}>
        <For each={Array.from({ length: carousel.scrollSnapCount() })}>
          {(_, index) => (
            <button
              type="button"
              class={`h-2.5 w-2.5 rounded-full transition ${props.buttonClass ?? ""}`}
              classList={{
                [props.activeClass ?? "bg-brand"]: carousel.selectedIndex() === index(),
                [props.inactiveClass ?? "bg-neutral-300"]: carousel.selectedIndex() !== index(),
              }}
              aria-label={`Show ${props.label} product page ${index() + 1}`}
              onClick={() => carousel.scrollTo(index())}
            />
          )}
        </For>
      </div>
    </Show>
  );
}
