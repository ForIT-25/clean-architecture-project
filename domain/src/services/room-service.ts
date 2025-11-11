import { CreateRoomData, Room, UpdateRoomData } from "../entities/room";

export interface RoomService {
  findRoomAll(): Promise<Room[]>;
  findRoomById(roomId: string): Promise<Room | undefined>;
  findRoomByHotelId(hotelId:string): Promise<Room[]>;
  createRoom(data: CreateRoomData): Promise<Room>;
  updateRoom(roomId: string, updates: UpdateRoomData): Promise<Room | undefined>;
  deleteRoom(roomId: string): Promise<void>;
}
