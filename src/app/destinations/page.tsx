import React from "react";
import DestinationCard from "@/components/destination/DestinationCard";
import type { Destination } from "@/lib/types/destination";

// Always render on request: destinations come live from the API.
export const dynamic = "force-dynamic";

async function getDestinations(): Promise<Destination[]> {
  const destinationsApi = process.env.NEXT_PUBLIC_DESTINATIONS_API;
  if (!destinationsApi) {
    console.error("Destinations api is not configured");
    return [];
  }
  try {
    const res = await fetch(destinationsApi, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Destinations api failed: ${res.status}`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? (data as Destination[]) : [];
  } catch (error) {
    console.error("Destinations api error:", error);
    return [];
  }
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <main className="min-h-screen w-full bg-white mb-20 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4 sm:mb-10 sm:gap-6">
          <div>
            <h2 className="text-3xl font-normal tracking-tight text-[#0C0B0B] sm:text-4xl md:text-5xl">
              Explore All Destinations
            </h2>
            <p className="mt-2 text-base text-[#6C696D]">
              Find your perfect travel experience from our curated collection of
              destinations
            </p>
          </div>
        </div>

        {/* Count */}
        <p className="mb-6 text-base text-[#6C696D]">
          Showing {destinations.length} destination
          {destinations.length === 1 ? "" : "s"}
        </p>

        {/* Grid */}
        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, i) => (
              <DestinationCard
                key={destination._id ?? i}
                destination={destination}
                id={destination._id}
              />
            ))}
          </div>
        ) : (
          <div className="border border-[#EEEEEE] bg-white px-6 py-16 text-center">
            <p className="text-lg text-[#0C0B0B]">
              No destinations available right now.
            </p>
            <p className="mt-2 text-sm text-[#6C696D]">
              Please try again later.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
