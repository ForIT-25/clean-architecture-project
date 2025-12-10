import { PrismaClient } from "@prisma/client";
import { CreateRoomData, Room, RoomService, RoomType, UpdateRoomData } from '@hotel-project/domain';

const prisma = new PrismaClient();

function mapRoom(dbRoom: any): Room {
  return {
    ...dbRoom,
    type: dbRoom.type as RoomType,
  };
}

export class RoomServiceImplementation implements RoomService {
  async findRoomAll(): Promise<Room[]> {
    const rooms = await prisma.room.findMany();
    return rooms.map(mapRoom);
  }

  async findRoomById(roomId: string): Promise<Room | undefined> {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });
    return mapRoom(room) ?? undefined;
  }

  async findRoomByHotelId(hotelId: string): Promise<Room[]> {
    const rooms = await prisma.room.findMany({
      where: { hotelId },
    });
    return rooms.map(mapRoom);
  }

  async createRoom(data: CreateRoomData): Promise<Room> {
    const room = await prisma.room.create({
      data: data,
    });

    return mapRoom(room);
  }

  async updateRoom(roomId: string, updates: UpdateRoomData): Promise<Room | undefined> {
    const room = await prisma.room.update({
      where: { id: roomId },
      data: updates,
    });

    return mapRoom(room);
  }

  async deleteRoom(roomId: string): Promise<void> {
    await prisma.room.delete({
      where: {id: roomId },
    });
  }
}
