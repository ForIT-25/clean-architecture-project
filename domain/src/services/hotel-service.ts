import { CreateHotelData, Hotel } from "@hotel-project/domain";

export interface HotelService {
  findHotelAll(): Promise<Hotel[]>;
  findHotelById(hotelId:string): Promise<Hotel | undefined>;
  registerHotel(params: CreateHotelData): Promise<Hotel>;
  updateHotel(hotelId: string, updates: Partial<Hotel>): Promise<void>;
  deleteHotel(hotelId: string): Promise<void>;
}
