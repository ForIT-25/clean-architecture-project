import { PrismaClient } from "@prisma/client";
import { Hotel, HotelService, CreateHotelData } from "@hotel-project/domain";

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
    const hotel: Hotel | null = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });
    return hotel ?? undefined;
  }

  async registerHotel(params: CreateHotelData): Promise<Hotel> {
    const newHotel:Hotel = await prisma.hotel.create({
      data: params,
    });

    return newHotel;
  }

  async updateHotel(
    hotelId: string,
    updates: Partial<Hotel>
  ): Promise<Hotel | undefined> {
    const updatedHotel = await prisma.hotel.update({
      where: { id: hotelId },
      data: updates,
    });

    return updatedHotel;
  }

  async deleteHotel(hotelId: string): Promise<void> {
    await prisma.hotel.delete({
      where: { id: hotelId },
    });
  }
}
