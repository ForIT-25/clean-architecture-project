import { Room } from "../entities/room";

export interface RoomService {
  findRoomAll(): Promise<Room[]>;
  findRoomById(roomId: string): Promise<Room | undefined>;
  findRoomByHotelId(hotelId:string): Promise<Room[]>;
  saveRoom(room: Room): Promise<void>;
  updateRoom(room: Room): Promise<void>;
  deleteRoom(roomId: string): Promise<void>;
}
