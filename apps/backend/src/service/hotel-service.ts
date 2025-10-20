import { PrismaClient } from "@prisma/client";
import { HotelService } from '../../../../domain/src/services/hotel-service';
import { Hotel } from "../../../../domain/src/entities/hotel";

const prisma = new PrismaClient();

export class HotelServiceImplementation implements HotelService {
  async findHotelAll(): Promise<Hotel[]> {
    const hotels: Hotel[] = await prisma.hotel.findMany({
      include: {
        rooms: true,
      },
  });
    return hotels;
  }

  async findHotelById(hotelId: string): Promise<Hotel | undefined> {
    const hotel: Hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: { rooms: true},
    });
    return hotel ?? undefined;
  }

  async saveHotel(hotel: Hotel): Promise<void> {
    await prisma.hotel.create({
      data: {
        id: hotel.id,
        name: hotel.name,
        address: hotel.address,
        description: hotel.description,
      },
    });
  }

  async updateHotel(hotel: Hotel): Promise<void> {
    await prisma.hotel.update({
      where: { id: hotel.id },
      data: {
        name: hotel.name,
        address: hotel.address,
        description: hotel.description,
      },
    });
  }

  async deleteHotel(hotelId: string): Promise<void> {
    await prisma.hotel.delete({
      where: { id: hotelId },
    });
  }
}
