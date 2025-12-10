import { PrismaClient } from "@prisma/client";
import { Booking, BookingCreateData, BookingService, BookingUpdateData } from '@hotel-project/domain';

const prisma = new PrismaClient();

export class BookingServiceImplementation implements BookingService {
  async findBookingAll(): Promise<Booking[]> {
    const bookings: Booking[] = await prisma.booking.findMany({
      include: {
        user: true,
        room: true,
      },
    });
    return bookings;
  }

  async findBookingById(bookingId: string): Promise<Booking | undefined> {
    const booking: Booking | null = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    return booking ?? undefined;
  }

  async findBookingByUserId(userId: string): Promise<Booking[]> {
    const bookings: Booking[] = await prisma.booking.findMany({
      where: { userId: userId },
      include: {
        room: true,
      },
    });
    return bookings;
  }

  async findBookingByRoomId(roomId: string): Promise<Booking[]> {
    const bookings: Booking[] = await prisma.booking.findMany({
      where: { roomId: roomId },
      include: {
        user: true,
      },
    });
    return bookings;
  }

  async createBooking(data: BookingCreateData): Promise<Booking> {
    const booking: Booking = await prisma.booking.create({
      data: data,
    });

    return booking;
  }

  async updateBooking(
    bookingId: string,
    updates: BookingUpdateData): Promise<Booking | undefined> {
    const booking: Booking = await prisma.booking.update({
      where: { id: bookingId},
      data: updates,
    });

    return booking;
  }

  async deleteBooking(bookingId: string): Promise<void> {
    await prisma.booking.delete({
      where: { id: bookingId },
    });
  }
}
