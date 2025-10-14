import { Hotel } from "../../entities/hotel";

export function addRoomToHotel(hotel: Hotel, roomId: string): Hotel {
  return {
    ...hotel,
    rooms: [...hotel.rooms, roomId],
  };
}
