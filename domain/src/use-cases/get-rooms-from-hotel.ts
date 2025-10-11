import { Hotel } from "../entities/hotel";

export function getRoomsFromHotel(hotel: Hotel): string[] {
  return hotel.rooms ?? [];
}
