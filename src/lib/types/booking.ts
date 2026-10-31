import type { Destination } from "./destination";

/**
 * A booking as returned by GET /my-Bookings/:email.
 * Bookings are created by spreading the booked Destination plus the
 * signed-in user, so they carry the destination fields alongside the
 * booking-specific ones. Fields are partial because the backend does
 * not guarantee every one of them.
 */
export interface Booking extends Partial<Destination> {
  _id: string;
  bookingDate?: string;
  name?: string;
  email?: string;
  image?: string;
  status?: string;
  /** Id of the booked destination, when the backend keeps it separately. */
  destinationId?: string;
}
