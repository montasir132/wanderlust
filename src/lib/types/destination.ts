/**
 * Shared shape of a travel package as returned by the destinations API
 * (GET /myBookings, GET /myBooking/:id). All fields come back as strings.
 */
export interface Destination {
  _id?: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

/** Shape of the create/update form body (everything except the id). */
export type DestinationPayload = Omit<Destination, "_id">;
