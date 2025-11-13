import { Booking, BookingService } from "@hotel-project/domain";
import { BookingCreateData } from "@hotel-project/domain";

export async function createBooking(
  service: BookingService,
  data: BookingCreateData
): Promise<Booking> {
  if (!data.userId || data.userId.trim() === "") {
    throw new Error("User ID is required for creating a booking.");
  }
  if (!data.roomId || data.roomId.trim() === "") {
    throw new Error("Room ID is required for creating a booking.");
  }
  
  if (data.totalPrice <= 0) {
    throw new Error("Total price must be positive.");
  }
  
  if (data.startDate >= data.endDate) {
    throw new Error("Start date must be before end date.");
  }

  const newBooking = await service.createBooking(data);

  return newBooking;
}
