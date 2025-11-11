import { PrismaClient } from "@prisma/client";
import { CreateRoomData, Room, RoomService, UpdateRoomData } from '@hotel-project/domain';

const prisma = new PrismaClient();

export class RoomServiceImplementation implements RoomService {
  async findRoomAll(): Promise<Room[]> {
    const rooms: Room[] = await prisma.room.findMany({
      include: {
        hotel: true,
      },
    });
    return rooms;
  }

  async findRoomById(roomId: string): Promise<Room | undefined> {
    const room: Room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        hotel: true,
      },
    });
    return room ?? undefined;
  }

  async findRoomByHotelId(hotelId: string): Promise<Room[]> {
    const rooms: Room[] = await prisma.room.findMany({
      where: { hotelId },
    });
    return rooms;
  }

  async createRoom(data: CreateRoomData): Promise<Room> {
    const room: Room = await prisma.room.create({
      data: data,
    });

    return room;
  }

  async updateRoom(roomId: string, updates: UpdateRoomData): Promise<Room | undefined> {
    const room: Room = await prisma.room.update({
      where: { id: roomId },
      data: updates,
    });

    return room;
  }

  async deleteRoom(roomId: string): Promise<void> {
    await prisma.room.delete({
      where: {id: roomId },
    });
  }
}
