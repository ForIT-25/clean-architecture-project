import { PrismaClient } from "@prisma/client";
import { BookingService } from '../../../../domain/src/services/booking-service';
import { Booking } from "../../../../domain/src/entities/booking";

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
    const booking: Booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        room: true,
      },
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

  async saveBooking(booking: Booking): Promise<void> {
    await prisma.booking.create({
      data: {
        id: booking.id,
        userId: booking.idUser,
        roomId: booking.idRoom,
        startDate: booking.startDate,
        endDate: booking.endDate,
        totalPrice: booking.totalPrice,
      },
    });
  }

  async updateBooking(booking: Booking): Promise<void> {
    await prisma.booking.update({
      where: { id: booking.id},
      data: {
        userId: booking.idUser,
        roomId: booking.idRoom,
        startDate: booking.startDate,
        endDate: booking.endDate,
        totalPrice: booking.totalPrice,
      },
    });
  }

  async deleteBooking(bookingId: string): Promise<void> {
    await prisma.booking.delete({
      where: { id: bookingId },
    });
  }
}
