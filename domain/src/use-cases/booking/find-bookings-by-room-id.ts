import { Booking, BookingService } from "@hotel-project/domain";

export async function findBookingsByRoomId(
  service: BookingService,
  roomId: string,
): Promise<Booking[]> {
  if (!roomId || roomId.trim() === "") {
    throw new Error("Room ID is required for searching bookings");
  }

  const bookings = await service.findBookingByRoomId(roomId);
  
  return bookings;
}
