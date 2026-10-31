"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import DestinationCard from "@/components/destination/DestinationCard";
import { cn } from "cn";
import type { Destination } from "@/lib/types/destination";

/**
 * "Featured Destinations" section: a shadcn Carousel (embla) of destination
 * cards with a slide counter, progress bar and round prev/next controls.
 * Receives its data from the server component that fetches the API.
 */
export default function FeaturedDestinationsCarousel({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(destinations.length);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = (emblaApi: CarouselApi) => {
      if (!emblaApi) return;
      setCurrent(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    // Embla's API is an external system; sync our state to it on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(api.scrollSnapList().length);
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // Width of one progress segment and how far it has moved (in %)
  const segmentWidth = count > 0 ? 100 / count : 100;

  return (
    <section className="w-full my-20 bg-white px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-normal tracking-tight text-[#0C0B0B] sm:text-4xl md:text-5xl">
              Featured Destinations
            </h2>
            <p className="mt-3 text-base text-[#6C696D]">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>
          <Link
            href="/destinations"
            className="group flex w-fit items-center gap-2 rounded-full border border-[#15A1BF] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#15A1BF] transition-colors hover:bg-[#15A1BF] hover:text-white"
          >
            All Destinations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Slides */}
        <Carousel setApi={setApi} opts={{ align: "start", loop: false }}>
          <CarouselContent>
            {destinations.map((destination, i) => (
              <CarouselItem
                key={destination._id ?? i}
                className="basis-[85%] sm:basis-1/2 xl:basis-[45%]"
              >
                <DestinationCard
                  destination={destination}
                  id={destination._id}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Footer: counter + progress bar + round arrows */}
        <div className="mt-8 flex items-center gap-4 sm:gap-6">
          <p className="shrink-0 text-sm font-medium text-[#0C0B0B] tabular-nums">
            {current + 1}
            <span className="text-[#D3D3D3]">/{count}</span>
          </p>

          <div
            className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-[#D3D3D3]"
            role="progressbar"
            aria-label="Carousel progress"
            aria-valuemin={1}
            aria-valuemax={count}
            aria-valuenow={current + 1}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[#15A1BF] transition-all duration-300"
              style={{
                width: `${segmentWidth}%`,
                transform: `translateX(${current * 100}%)`,
              }}
            />
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              aria-label="Previous slide"
              disabled={!canScrollPrev}
              onClick={() => api?.scrollPrev()}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border border-[#D3D3D3] text-[#0C0B0B] transition-colors",
                canScrollPrev
                  ? "hover:border-[#15A1BF] hover:bg-[#15A1BF] hover:text-white"
                  : "cursor-default opacity-50"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              disabled={!canScrollNext}
              onClick={() => api?.scrollNext()}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border border-[#D3D3D3] text-[#0C0B0B] transition-colors",
                canScrollNext
                  ? "hover:border-[#15A1BF] hover:bg-[#15A1BF] hover:text-white"
                  : "cursor-default opacity-50"
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
