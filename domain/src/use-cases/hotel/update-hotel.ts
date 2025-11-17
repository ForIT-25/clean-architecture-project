import { Hotel, HotelService, UpdateHotelParams } from "@hotel-project/domain";

export interface UpdateHotelDependencies {
  hotelService: HotelService;
}

export async function updateHotel(
  hotelId: string, 
  updates: UpdateHotelParams,
  { hotelService }: UpdateHotelDependencies
): Promise<Hotel | undefined> {
  
  if (!hotelId || Object.keys(updates).length === 0) {
    throw new Error("Invalid update request: ID or data missing");
  }

  const updatedHotel = await hotelService.updateHotel(hotelId, updates);

  if (!updatedHotel) {
    throw new Error(`Hotel with ID ${hotelId} not found`);
  }

  return updatedHotel;
}
