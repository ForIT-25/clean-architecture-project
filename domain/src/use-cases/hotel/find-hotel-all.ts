import { Hotel, HotelService } from "@hotel-project/domain";

export interface FindHotelAllDependencies {
  hotelService: HotelService;
}

export async function findHotelAll({ 
  hotelService 
}: FindHotelAllDependencies): Promise<Hotel[]> {
  const hotels = await hotelService.findHotelAll();

  return hotels;
}
