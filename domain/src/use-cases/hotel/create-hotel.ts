import { CreateHotelData, Hotel, HotelService } from "@hotel-project/domain";

export interface CreateHotelDependencies {
  hotelService: HotelService;
}

export async function createHotel(params: CreateHotelData,
  { hotelService }: CreateHotelDependencies): Promise<Hotel> {
  if (!params.name || params.name.trim() === "") {
    throw new Error("Hotel name cannot be empty");
  }
  const newHotel:Hotel = await hotelService.registerHotel(params);
  
  return newHotel;
}
