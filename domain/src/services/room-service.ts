import { Room } from "../entities/room";

export interface RoomService {
  findRoomAll(): Promise<Room[]>;
  findRoomById(idRoom: string): Promise<Room | undefined>;
  findRoomByHotelId(idHotel:string): Promise<Room[]>;
  saveRoom(room: Room): Promise<void>;
  updateRoom(room: Room): Promise<void>;
  deleteRoom(idRoom: string): Promise<void>;
}
