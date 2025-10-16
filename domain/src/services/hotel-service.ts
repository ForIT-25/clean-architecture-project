import { Hotel } from "../entities/hotel";

export interface HotelService {
  findHotelAll(): Promise<Hotel[]>;
  findHotelById(idHotel:string): Promise<Hotel | undefined>;
  saveHotel(hotel: Hotel): Promise<void>;
  updateHotel(hotel: Hotel): Promise<void>;
  deleteHotel(idHotel: string): Promise<void>;
}
