import { describe, test, expect } from "vitest";
import { Room } from "../../entities/room";
import { createRoom } from "./create-room";
import { setRoomAvailable, setRoomUnavailable } from "./set-room-availability";

describe("room availability", () => {
  const originalRoom: Room = createRoom({
    id: "r1",
    name: "room 1",
    type: "double",
    description: "todas las comodidades",
    price: 120,
  });

  test("set room unavailable", () => {
    const updatedRoom: Room = setRoomUnavailable(originalRoom);

    expect(updatedRoom.isAvailable).toBe(false);
    expect(updatedRoom.isAvailable).not.toBe(originalRoom.isAvailable);
  });

  test("set room available again", () => {
    const unavailable: Room = { ...originalRoom, isAvailable: false };
    const updatedRoom: Room = setRoomAvailable(unavailable);

    expect(updatedRoom.isAvailable).toBe(true);
    expect(updatedRoom.isAvailable).not.toBe(unavailable.isAvailable);
  });
});
