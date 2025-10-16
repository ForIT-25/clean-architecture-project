import { Room } from "../../entities/room";

export function setRoomAvailable(room: Room): Room {
  return {
    ...room,
    isAvailable: true,
  };
}

export function setRoomUnavailable(room: Room): Room {
  return {
    ...room,
    isAvailable: false,
  };
}
