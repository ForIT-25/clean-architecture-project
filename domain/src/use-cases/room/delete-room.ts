import { RoomService } from "@hotel-project/domain";

export const deleteRoom = async (
  service: RoomService,
  roomId: string
): Promise<void> => {
  await service.deleteRoom(roomId);
};
