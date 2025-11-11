import { Room, UpdateRoomData, RoomService } from "@hotel-project/domain";

export async function updateRoom(
  service: RoomService,
  roomId: string, 
  updates: UpdateRoomData): Promise<Room | undefined> {
    if (updates.price !== undefined && updates.price <= 0) {
      throw new Error("Room price must be positive on update.");
    }
    const updatedRoom = await service.updateRoom(roomId, updates);
    
    return updatedRoom;
}
