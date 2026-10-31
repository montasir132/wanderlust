import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import BookingItemCard from "@/components/booking/BookingItemCard";
import type { Booking } from "@/lib/types/booking";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

// Always render on request: bookings are per-user and come live from the API.
export const dynamic = "force-dynamic";

async function getBookings(email: string): Promise<Booking[]> {
  const token = await getTokenFromServer();
  const bookingsApi = process.env.NEXT_PUBLIC_BOOKINGS_API;
  if (!bookingsApi) {
    console.error("Bookings api is not configured");
    return [];
  }

  try {
    const res = await fetch(`${bookingsApi}/${encodeURIComponent(email)}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.error(`Bookings api failed: ${res.status}`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? (data as Booking[]) : [];
  } catch (error) {
    console.error("Bookings api error:", error);
    return [];
  }
}

export default async function BookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;

  const bookings = user?.email ? await getBookings(user.email) : [];

  return (
    <main className="min-h-screen w-full bg-white mb-20 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4 sm:mb-10 sm:gap-6">
          <div>
            <h2 className="text-3xl font-normal tracking-tight text-[#0C0B0B] sm:text-4xl md:text-5xl">
              My Bookings
            </h2>
            <p className="mt-2 text-base text-[#6C696D]">
              Manage and view your upcoming travel plans
            </p>
          </div>
        </div>

        {/* List / states */}
        {!user ? (
          <div className="border border-[#EEEEEE] bg-white px-6 py-16 text-center shadow-[0px_1px_2px_0px_#0000001A]">
            <p className="text-lg text-[#0C0B0B]">
              Please sign in to view your bookings.
            </p>
            <Link
              href="/logIn"
              className="mt-4 inline-flex text-sm font-semibold text-[#15A1BF] underline underline-offset-4"
            >
              Sign In
            </Link>
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <BookingItemCard key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="border border-[#EEEEEE] bg-white px-6 py-16 text-center shadow-[0px_1px_2px_0px_#0000001A]">
            <p className="text-lg text-[#0C0B0B]">You have no bookings yet.</p>
            <p className="mt-2 text-sm text-[#6C696D]">
              Explore destinations and book your first adventure.
            </p>
            <Link
              href="/destinations"
              className="mt-4 inline-flex text-sm font-semibold text-[#15A1BF] underline underline-offset-4"
            >
              Browse Destinations
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
