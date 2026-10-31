"use client";

import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Destination } from "@/lib/types/destination";
import { useSession } from "@/lib/auth-client";

const features = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export default function BookingCard({
  destination,
}: {
  destination: Destination;
}) {
  const { data: session } = useSession();
  const user = session?.user;
  const { price, departureDate } = destination;
  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const departureDate = formData.get("departureDate");
    // console.log(DepartureDate);
    const data = {
      bookingDate: new Date(),
      name: user?.name,
      email: user?.email,
      image: user?.image,
      ...destination,
      departureDate: departureDate,
    };
    // console.log(data);
    const bookingApi = process.env.NEXT_PUBLIC_BOOKING_API;
    if (!bookingApi) {
      console.error("Booking api is not configured");
      return;
    }
    const res = await fetch(bookingApi, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error(`Booking failed: ${res.status}`);
    }
    // const bookingRes = await res.json();
    // console.log(bookingRes);
  };
  return (
    <Card className="border border-[#EEEEEE] bg-white p-0 shadow-sm">
      <CardContent className="p-5 sm:p-6">
        <p className="text-sm text-[#6C696D]">Starting from</p>
        <p className="mt-1 text-4xl font-semibold tracking-tight text-[#15A1BF]">
          ${price || "0"}
        </p>
        <p className="mt-1 text-sm text-[#6C696D]">per person</p>
        <form onSubmit={handleBooking}>
          <Input
            type="date"
            name="departureDate"
            defaultValue={
              departureDate && ISO_DATE.test(departureDate)
                ? departureDate
                : undefined
            }
            aria-label="Departure date"
            className="mt-5 h-10 bg-[#F7F8FA] px-3"
          />

          <Button
            type="submit"
            className="mt-4 h-11 w-full gap-2 bg-[#15A1BF] text-base hover:bg-[#008fbd]"
          >
            Book Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <ul className="mt-5 space-y-2.5">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-[#6C696D]"
            >
              <Check className="h-4 w-4 shrink-0 text-[#1E9E35]" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
