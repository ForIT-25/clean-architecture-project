import { Hotel } from "../entities/hotel";

export interface HotelService {
  findHotelAll(): Promise<Hotel[]>;
  findHotelById(hotelId:string): Promise<Hotel | undefined>;
  saveHotel(hotel: Hotel): Promise<void>;
  updateHotel(hotel: Hotel): Promise<void>;
  deleteHotel(hotelId: string): Promise<void>;
}
