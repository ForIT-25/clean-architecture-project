import { PrismaClient } from "@prisma/client";
import { RoomService } from '../../../../domain/src/services/room-service';
import { Room } from "../../../../domain/src/entities/room";

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

  async saveRoom(room: Room): Promise<void> {
    await prisma.room.create({
      data: {
        id: room.id,
        name: room.name,
        type: room.type,
        price: room.price,
        description: room.description,
        isAvailable: room.isAvailable,
        hotelId: room.hotelId,
      },
    });
  }

  async updateRoom(room: Room): Promise<void> {
    await prisma.room.update({
      where: { id: room.id },
      data: {
        name: room.name,
        type: room.type,
        price: room.price,
        description: room.description,
        isAvailable: room.isAvailable,
        hotelId: room.hotelId,
      },
    });
  }

  async deleteRoom(roomId: string): Promise<void> {
    await prisma.room.delete({
      where: {id: roomId },
    });
  }
}
