import { Booking, BookingService } from "@hotel-project/domain";

export async function findBookingById(
  service: BookingService,
  bookingId: string,
): Promise<Booking | undefined> {
  if (!bookingId || bookingId.trim() === "") {
    throw new Error("Booking ID is required for searching");
  }

  const booking = await service.findBookingById(bookingId);
  
  return booking;
}
