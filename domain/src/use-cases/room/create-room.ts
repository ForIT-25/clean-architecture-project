import { Room, RoomService, CreateRoomData } from "@hotel-project/domain";

export async function createRoom(
  service: RoomService,
  data: CreateRoomData): Promise<Room> {
  if (data.price <= 0) {
    throw new Error("Price must be positive");
  }
  const newRoom = await service.createRoom(data);
  
  return newRoom;
}
