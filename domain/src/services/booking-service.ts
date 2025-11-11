import { Booking, BookingCreateData, BookingUpdateData } from "../entities/booking";

export interface BookingService {
    findBookingAll(): Promise<Booking[]>;
    findBookingById(bookingId: string): Promise<Booking | undefined>;
    findBookingByUserId(userId:string): Promise<Booking[]>;
    findBookingByRoomId(roomId:string): Promise<Booking[]>;
    createBooking(data: BookingCreateData): Promise<Booking>;
    updateBooking(bookingId: string, updates: BookingUpdateData): Promise<Booking | undefined>;
    deleteBooking(bookingId: string): Promise<void>;
}
