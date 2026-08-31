/** @jsxImportSource solid-js */
import type { Accessor, JSX, Setter } from "solid-js";
import { createContext, useContext } from "solid-js";
import type { EmblaCarouselType } from "embla-carousel";

export type CarouselApi = EmblaCarouselType;

export type CarouselContextValue = {
  api: Accessor<EmblaCarouselType | undefined>;
  canScrollNext: Accessor<boolean>;
  canScrollPrev: Accessor<boolean>;
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollSnapCount: Accessor<number>;
  scrollTo: (index: number) => void;
  selectedIndex: Accessor<number>;
  setViewport: Setter<HTMLElement | undefined>;
};

export type CarouselProps = {
  children: JSX.Element;
  class?: string;
};

export const CarouselContext = createContext<CarouselContextValue>();

export function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("Carousel components must be used inside <Carousel>.");
  }

  return context;
}
