import { vi, Mock } from "vitest";
import { Booking, BookingCreateData, BookingUpdateData } from "@hotel-project/domain";

export const MOCK_BOOKING_DATA: Booking = {
  id: "B1-MOCK",
  startDate: new Date("2025-12-01T12:00:00Z"),
  endDate: new Date("2025-12-05T12:00:00Z"),
  userId: "U1-MOCK",
  roomId: "R1-MOCK",
  totalPrice: 450.00,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export type MockedBookingServiceAPI = {
  findBookingAll: Mock<() => Promise<Booking[]>>; 
  findBookingById: Mock<(bookingId: string) => Promise<Booking | undefined>>;
  findBookingByUserId: Mock<(userId: string) => Promise<Booking[]>>;
  findBookingByRoomId: Mock<(roomId: string) => Promise<Booking[]>>;
  createBooking: Mock<(data: BookingCreateData) => Promise<Booking>>;
  updateBooking: Mock<(bookingId: string, updates: BookingUpdateData) => Promise<Booking | undefined>>; 
  deleteBooking: Mock<(bookingId: string) => Promise<void>>;
};

export const createMockBookingServiceAPI = (): MockedBookingServiceAPI => {
    return {
        findBookingAll: vi.fn(),
        findBookingById: vi.fn(),
        findBookingByUserId: vi.fn(),
        findBookingByRoomId: vi.fn(),
        createBooking: vi.fn(),
        updateBooking: vi.fn(),
        deleteBooking: vi.fn(),
    } as MockedBookingServiceAPI;
};

export const mockedBookingServiceImplementations = createMockBookingServiceAPI();
