import { Hotel, HotelService } from "@hotel-project/domain";

export interface FindHotelByIdDependencies {
  hotelService: HotelService;
}

export async function findHotelById(
  hotelId: string,
  { hotelService }: FindHotelByIdDependencies
): Promise<Hotel | undefined> {
  if (!hotelId || hotelId.trim() === "") {
    throw new Error("Hotel ID is required for searching");
  }

  const hotel = await hotelService.findHotelById(hotelId);

  return hotel;
}
