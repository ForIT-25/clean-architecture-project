import { Room, RoomService } from "@hotel-project/domain";

export async function setRoomAvailability(
  service: RoomService,
  status: boolean,
  roomId: string): Promise<Room | undefined> {
    const updatedRoom = await service.updateRoom(roomId, {isAvailable: status});
    return updatedRoom;
}
