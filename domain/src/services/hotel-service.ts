import { Hotel } from "../entities/hotel";

export interface HotelService {
  findHotelAll(): Promise<Hotel[]>;
  findHotelById(hotelId:string): Promise<Hotel | undefined>;
  saveHotel(hotel: Hotel): Promise<void>;
  updateHotel(hotelId: string, updates: Partial<Hotel>): Promise<void>;
  deleteHotel(hotelId: string): Promise<void>;
}
