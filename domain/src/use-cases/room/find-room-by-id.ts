import { Room, RoomService } from "@hotel-project/domain";

export async function findRoomById(
  service: RoomService,
  roomId: string,
): Promise<Room | undefined> {
  if (!roomId || roomId.trim() === "") {
    throw new Error("Room ID is required for searching");
  }

  const room = await service.findRoomById(roomId);
  
  return room;
}
