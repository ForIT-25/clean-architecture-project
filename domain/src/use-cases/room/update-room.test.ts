import { describe, test, expect } from "vitest";
import { ROOMTYPES, Room } from '../../entities/room';
import { createRoom } from './create-room';
import { updateRoom } from "./update-room";

describe('updateRoom', () => {
  test('update room properties', () => {
    const originalRoom:Room = createRoom({
      id: 'r1',
      name: 'room 1',
      type: 'double',
      description: 'todas las comodidades',
      price: 120,
    });

    const updatedRoom:Room = updateRoom(originalRoom, {
      name: 'room 101',
      type: ROOMTYPES.SUITE,
      description: 'Baño en suite',
      price: 150,
    });

    expect(updatedRoom.id).toBe(originalRoom.id);
    expect(updatedRoom.name).toBe('room 101');
    expect(updatedRoom.type).toBe(ROOMTYPES.SUITE);
    expect(updatedRoom.description).toBe('Baño en suite');
    expect(updatedRoom.price).toBe(150);
    expect(updatedRoom.isAvailable).toBe(originalRoom.isAvailable);
  });
});
