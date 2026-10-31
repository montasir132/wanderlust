import { CalendarDays, MapPin, Star, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Destination } from "@/lib/types/destination";

function formatDuration(duration: string) {
  const days = Number(duration);
  if (Number.isFinite(days) && days > 0) {
    return `${days} Days/${days - 1} Nights`;
  }
  return duration;
}

export default function DestinationCard({
  destination,
  id,
}: {
  destination: Destination;
  id?: string;
}) {
  const { destinationName, country, price, duration, imageUrl } = destination;

  return (
    <Card className="group overflow-hidden border border-[#EEEEEE] bg-white p-0 shadow-sm transition-shadow hover:shadow-md">
      {/* Image + rating */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EDFCFF]">
        {imageUrl ? (
          // API may serve arbitrary hosts; next/image would reject unconfigured ones.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={destinationName}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
        <span className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#FFFFFF99] px-2.5 py-1.5 text-sm font-semibold text-[#121212] backdrop-blur-sm">
          <Star className="h-4 w-4 fill-[#121212] text-[#121212]" />
          4.5
        </span>
      </div>

      <CardContent className="p-4 sm:p-5">
        {/* Country */}
        <p className="flex items-center gap-1.5 text-sm text-[#6C696D]">
          <MapPin className="h-4 w-4" />
          {country}
        </p>

        {/* Title + price */}
        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <h3 className="truncate text-xl font-medium text-[#0C0B0B]">
            {destinationName}
          </h3>
          <p className="shrink-0 text-lg font-semibold text-[#0C0B0B]">
            ${price}
            <span className="text-sm font-normal text-[#6C696D]">/Person</span>
          </p>
        </div>

        {/* Duration */}
        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#6C696D]">
          <CalendarDays className="h-4 w-4" />
          {formatDuration(duration)}
        </p>

        {/* Book now */}
        <a
          href={id ? `/destinations/${id}` : "#"}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-[#15A1BF] uppercase underline underline-offset-4 transition-colors hover:text-[#008fbd]"
        >
          Book Now
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
}
