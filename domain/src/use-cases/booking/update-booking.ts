import { Booking, BookingService, BookingUpdateData } from "@hotel-project/domain";

export async function updateBooking(
  service: BookingService,
  bookingId: string,
  updates: BookingUpdateData
): Promise<Booking | undefined> {
  if (updates.totalPrice !== undefined && updates.totalPrice <= 0) {
    throw new Error("Total price must be positive on update.");
  }

  if (updates.startDate && updates.endDate && updates.startDate >= updates.endDate) {
    throw new Error("Start date must be before end date on update.");
  }

  const updatedBooking = await service.updateBooking(bookingId, updates);

  return updatedBooking;
}
