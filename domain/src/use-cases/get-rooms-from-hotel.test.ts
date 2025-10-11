import { describe, test, expect } from 'vitest';
import { createHotel } from './create-hotel';
import { Hotel } from '../entities/hotel';
import { getRoomsFromHotel } from './get-rooms-from-hotel';


describe('Get rooms from Hotel', () => {
  test('Return string[] with idrooms', () => {
    const hotel:Hotel = createHotel({
      id: 'H1',
      name: 'Gran Hotel',
      address: 'calle falsa 123',
      description: 'Hotel muy cómodo',
    });

    const hotelrooms:string[] = getRoomsFromHotel(hotel);

    expect(hotelrooms).toStrictEqual([]);
  });
});