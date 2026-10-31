import FeaturedDestinationsCarousel from "@/components/home/FeaturedDestinationsCarousel";
import type { Destination } from "@/lib/types/destination";

/**
 * Server component: fetches the 5 featured destinations from the API and
 * hands them to the client carousel section. Guards every failure mode so a
 * down API never crashes the home page.
 */
const FeaturedMyBookings = async () => {
  const destinationsApi = process.env.NEXT_PUBLIC_DESTINATIONS_DATA_5_API;
  if (!destinationsApi) {
    console.error("Destinations api is not configured");
    return null;
  }

  let destinations5: Destination[] = [];
  try {
    const res = await fetch(destinationsApi, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Destinations api failed: ${res.status}`);
      return null;
    }
    const data = await res.json();
    destinations5 = Array.isArray(data) ? (data as Destination[]) : [];
  } catch (error) {
    console.error("Destinations api error:", error);
    return null;
  }

  if (destinations5.length === 0) {
    return (
      <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl border border-[#EEEEEE] bg-white px-6 py-16 text-center shadow-[0px_1px_2px_0px_#0000001A]">
          <p className="text-lg text-[#0C0B0B]">
            Featured destinations are unavailable right now.
          </p>
          <p className="mt-2 text-sm text-[#6C696D]">
            Please check back later for handpicked travel experiences.
          </p>
        </div>
      </section>
    );
  }

  return <FeaturedDestinationsCarousel destinations={destinations5} />;
};

export default FeaturedMyBookings;
