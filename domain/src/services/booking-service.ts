import { Booking } from "../entities/booking";

export interface BookingService {
    findBookingAll(): Promise<Booking[]>;
    findBookingById(bookingId: string): Promise<Booking | undefined>;
    findBookingByUserId(userId:string): Promise<Booking[]>;
    findBookingByRoomId(roomId:string): Promise<Booking[]>;
    saveBooking(booking: Booking): Promise<void>;
    updateBooking(booking: Booking): Promise<void>;
    deleteBooking(bookingId: string): Promise<void>;
}
