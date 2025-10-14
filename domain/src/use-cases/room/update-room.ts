import { RoomType, Room } from "../../entities/room";

interface UpdateRoomInput {
  name?: string;
  type?: RoomType;
  description: string;
  price?: number;
}

export function updateRoom(room: Room, updates: UpdateRoomInput): Room {
  return {
    ...room,
    ...updates,
  };
}
