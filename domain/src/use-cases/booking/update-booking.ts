import { Booking } from "../../entities/booking";

interface UpdateBookingInput {
  reserveDate?: Date;
  days?: number;
  price?: number;
}

export function updateBooking(
  booking: Booking,
  updates: UpdateBookingInput,
): Booking {
  return {
    ...booking,
    ...updates,
  };
}
