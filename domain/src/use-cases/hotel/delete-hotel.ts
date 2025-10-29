import { HotelService } from "@hotel-project/domain";

export interface DeleteHotelDependencies {
  hotelService: HotelService;
}

export async function deleteHotel(
  hotelId: string, 
  { hotelService }: DeleteHotelDependencies
): Promise<void> {
  if (!hotelId) {
    throw new Error("Hotel ID is required for deletion");
  }
  
  await hotelService.deleteHotel(hotelId);
}
