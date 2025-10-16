import { Booking } from "../entities/booking";

export interface BookingService {
    findBookingAll(): Promise<Booking[]>;
    findBookingById(idBooking: string): Promise<Booking | undefined>;
    findBookingByUserId(idUser:string): Promise<Booking[]>;
    findBookingByRoomId(idRoom:string): Promise<Booking[]>;
    saveBooking(Booking: Booking): Promise<void>;
    updateBooking(Booking: Booking): Promise<void>;
    deleteBooking(idBooking: string): Promise<void>;
}
