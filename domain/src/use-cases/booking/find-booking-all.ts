import { Booking, BookingService } from "@hotel-project/domain";

export async function findBookingAll(
  service: BookingService,
): Promise<Booking[]> {
  const bookings = await service.findBookingAll();
  
  return bookings;
}
