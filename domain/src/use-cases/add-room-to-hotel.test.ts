
import { describe, test, expect } from 'vitest';
import { createHotel } from './create-hotel';
import { Hotel } from '../entities/hotel';
import { addRoomToHotel } from './add-room-to-hotel';

describe('Add room to Hotel', () => {
  test('Return a string', () => {
    const hotel:Hotel = createHotel({
      id: 'H1',
      name: 'Gran Hotel',
      address: 'calle falsa 123',
      description: 'Hotel muy cómodo',
    });

    const updateHotel:Hotel = addRoomToHotel(hotel, 'Room1');

    expect(updateHotel.rooms).toContain('Room1');
    expect(updateHotel.rooms.length).toBe(1);
  });
});
