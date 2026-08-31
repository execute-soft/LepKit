/** @jsxImportSource solid-js */
import type { CarouselProps } from "./CarouselContext";

export function CarouselItem(props: CarouselProps) {
  return (
    <div class={`min-w-0 shrink-0 grow-0 basis-full ${props.class ?? ""}`}>
      {props.children}
    </div>
  );
}
