import { describe, test, expect } from "vitest";
import { ROOMTYPES, Room } from "../../entities/room";
import { createRoom } from "./create-room";

describe("createRoom", () => {
  test("create a room with its properties", () => {
    const room: Room = createRoom({
      id: "r1",
      name: "room 1",
      type: "double",
      description: "todas las comodidades",
      price: 120,
    });

    expect(room.type).toBe(ROOMTYPES.DOUBLE);
    expect(room.isAvailable).toBe(true);
  });
});
