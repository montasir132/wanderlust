import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, MapPin, Star } from "lucide-react";
import BookingCard from "@/components/booking/BookingCard";
import { EditDestinationDialog } from "@/components/destination/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";
import type { Destination } from "@/lib/types/destination";
import { getTokenFromServer } from "@/lib/getTokenFromServer";


export const dynamic = "force-dynamic";

interface DestinationParams {
  id: string;
}

const FALLBACK_DESCRIPTION =
  "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.";

const highlights = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
];

async function getDestination(id: string): Promise<Destination | null> {
  // jwt token
  const token = await getTokenFromServer();
  // console.log(token);

  const detailsApi = process.env.NEXT_PUBLIC_DESTINATION_DETAILS_API;
  if (!detailsApi) {
    console.error("Destination details api is not configured");
    return null;
  }

  try {
    const res = await fetch(`${detailsApi}/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.error(`Destination details api failed: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data && typeof data === "object" ? (data as Destination) : null;
  } catch (error) {
    console.error("Destination details api error:", error);
    return null;
  }
}

function formatDuration(duration: string) {
  const days = Number(duration);
  if (Number.isFinite(days) && days > 0) {
    return `${days} Days / ${days - 1} Nights`;
  }
  return duration;
}

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<DestinationParams>;
}) {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) {
    return (
      <main className="min-h-screen w-full bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl border border-[#EEEEEE] bg-white px-6 py-16 text-center">
          <p className="text-lg text-[#0C0B0B]">
            Destination not found or unavailable.
          </p>
          <Link
            href="/destinations"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#15A1BF] underline underline-offset-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Destinations
          </Link>
        </div>
      </main>
    );
  }

  const description =
    (typeof destination.description === "string" &&
      destination.description.trim()) ||
    FALLBACK_DESCRIPTION;

  return (
    <main className="min-h-screen w-full bg-white mb-20 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        {/* Top bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/destinations"
            className="flex w-fit items-center gap-2 text-sm text-[#6C696D] transition-colors hover:text-[#15A1BF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-3">
            <EditDestinationDialog data={destination} />
            <DeleteDestinationDialog id={id} />
          </div>
        </div>

        {/* Hero image */}
        <div className="relative mt-6 aspect-16/7 w-full overflow-hidden border border-[#EEEEEE] bg-[#EDFCFF]">
          {destination.imageUrl ? (
            // API may serve arbitrary hosts; next/image would reject unconfigured ones.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={destination.imageUrl}
              alt={destination.destinationName ?? "Destination"}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
        </div>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
          {/* Main column */}
          <div>
            <p className="flex items-center gap-1.5 text-sm text-[#6C696D]">
              <MapPin className="h-4 w-4" />
              {destination.country}
            </p>

            <h1 className="mt-2 text-3xl font-normal tracking-tight text-[#0C0B0B] sm:text-4xl">
              {destination.destinationName}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#0C0B0B]">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-[#1E9E35] text-[#1E9E35]" />
                <span className="font-semibold">4.9</span>
                <span className="text-[#6C696D]">(234 reviews)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {formatDuration(destination.duration ?? "")}
              </span>
            </div>

            {/* Overview */}
            <section className="mt-8">
              <h2 className="text-xl font-medium text-[#0C0B0B] sm:text-2xl">
                Overview
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6C696D] sm:text-base">
                {description}
              </p>
            </section>

            {/* Highlights */}
            <section className="mt-8">
              <h2 className="text-xl font-medium text-[#0C0B0B] sm:text-2xl">
                Highlights
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6C696D] sm:text-base">
                {description}
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 text-sm text-[#6C696D]"
                  >
                    <Check className="h-4 w-4 shrink-0 text-[#1E9E35]" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="h-fit lg:sticky lg:top-6">
            <BookingCard destination={destination} />
          </aside>
        </div>
      </div>
    </main>
  );
}
