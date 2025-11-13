import { Booking, BookingService } from "@hotel-project/domain";

export async function findBookingsByUserId(
  service: BookingService,
  userId: string,
): Promise<Booking[]> {
  if (!userId || userId.trim() === "") {
    throw new Error("User ID is required for searching bookings");
  }

  const bookings = await service.findBookingByUserId(userId);
  
  return bookings;
}
