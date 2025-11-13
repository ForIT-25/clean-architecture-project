import { BookingService } from "@hotel-project/domain";

export const deleteBooking = async (
  service: BookingService,
  bookingId: string
): Promise<void> => {
  if (!bookingId || bookingId.trim() === "") {
    throw new Error("Booking ID is required for deletion.");
  }

  await service.deleteBooking(bookingId);
};
