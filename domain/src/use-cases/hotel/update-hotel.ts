import { Hotel } from "../../entities/hotel";

export type UpdateHotelParams = Partial<
  Pick<Hotel, "name" | "address" | "description">
>;

export function updateHotel(hotel: Hotel, updates: UpdateHotelParams): Hotel {
  return {
    ...hotel,
    ...updates,
  };
}
