/** @jsxImportSource solid-js */
import { onCleanup, onMount } from "solid-js";
import { useCarousel, type CarouselProps } from "./CarouselContext";

export function CarouselContent(props: CarouselProps) {
  const carousel = useCarousel();
  let viewport: HTMLDivElement | undefined;

  onMount(() => {
    carousel.setViewport(viewport);
  });

  onCleanup(() => {
    carousel.setViewport(undefined);
  });

  return (
    <div ref={viewport} class="overflow-hidden touch-pan-y">
      <div class={`flex ${props.class ?? ""}`}>{props.children}</div>
    </div>
  );
}
