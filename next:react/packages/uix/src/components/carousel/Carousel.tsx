/** @jsxImportSource solid-js */
import EmblaCarousel from "embla-carousel";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { createEffect, createSignal, onCleanup } from "solid-js";
import { CarouselContext, type CarouselProps } from "./CarouselContext";

type RootCarouselProps = CarouselProps & {
  opts?: EmblaOptionsType;
  setApi?: (api: EmblaCarouselType | undefined) => void;
};

export function Carousel(props: RootCarouselProps) {
  const [api, setApi] = createSignal<EmblaCarouselType>();
  const [canScrollPrev, setCanScrollPrev] = createSignal(false);
  const [canScrollNext, setCanScrollNext] = createSignal(false);
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  const [scrollSnapCount, setScrollSnapCount] = createSignal(0);
  const [viewport, setViewport] = createSignal<HTMLElement>();

  const syncState = (embla: EmblaCarouselType) => {
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
    setSelectedIndex(embla.selectedScrollSnap());
    setScrollSnapCount(embla.scrollSnapList().length);
  };

  createEffect(() => {
    const node = viewport();

    if (!node) {
      return;
    }

    const embla = EmblaCarousel(node, {
      align: "start",
      dragFree: false,
      ...props.opts,
    });
    const handleStateChange = () => syncState(embla);

    setApi(embla);
    props.setApi?.(embla);
    syncState(embla);
    embla.on("select", handleStateChange);
    embla.on("reInit", handleStateChange);

    onCleanup(() => {
      embla.destroy();
      setApi(undefined);
      props.setApi?.(undefined);
    });
  });

  return (
    <CarouselContext.Provider
      value={{
        api,
        canScrollNext,
        canScrollPrev,
        scrollNext: () => api()?.scrollNext(),
        scrollPrev: () => api()?.scrollPrev(),
        scrollSnapCount,
        scrollTo: (index) => api()?.scrollTo(index),
        selectedIndex,
        setViewport,
      }}
    >
      <div class={`relative ${props.class ?? ""}`}>{props.children}</div>
    </CarouselContext.Provider>
  );
}
