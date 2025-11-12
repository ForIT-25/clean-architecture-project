import { Room, RoomService } from "@hotel-project/domain";

export async function findRoomsByHotelId(
  service: RoomService,
  hotelId: string
): Promise<Room[]> {
  if (!hotelId || hotelId.trim() === "") {
    throw new Error("Hotel ID is required to find rooms.");
  }

  const rooms: Room[] = await service.findRoomByHotelId(hotelId);

  return rooms;
}
