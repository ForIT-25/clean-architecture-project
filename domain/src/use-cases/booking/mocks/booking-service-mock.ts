import { vi, Mock } from "vitest";
import { Booking, BookingCreateData, BookingService, BookingUpdateData } from "@hotel-project/domain";

const MOCK_START_DATE = new Date(Date.now() + 86400000);
const MOCK_END_DATE = new Date(Date.now() + 2 * 86400000);

export const MockBooking: Booking = {
  id: 'MOCK-B1',
  startDate: MOCK_START_DATE,
  endDate: MOCK_END_DATE,
  userId: 'MOCK-U1',
  roomId: 'MOCK-R1',
  totalPrice: 200.00,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export type MockedBookingService = {
  findBookingAll: Mock<() => Promise<Booking[]>>;
  findBookingById: Mock<(bookingId: string) => Promise<Booking | undefined>>;
  findBookingByUserId: Mock<(userId: string) => Promise<Booking[]>>;
  findBookingByRoomId: Mock<(roomId: string) => Promise<Booking[]>>;
  createBooking: Mock<(data: BookingCreateData) => Promise<Booking>>;
  updateBooking: Mock<(bookingId: string, updates: BookingUpdateData) => Promise<Booking | undefined>>;
  deleteBooking: Mock<(bookingId: string) => Promise<void>>;
};

export const createMockBookingService = (): MockedBookingService => {
  const findBookingAllMock = vi.fn(async () => [MockBooking]);
  const findBookingByIdMock = vi.fn(async (bookingId: string) => (
    bookingId === MockBooking.id ? MockBooking : undefined
  ));
  const findBookingByUserIdMock = vi.fn(async (userId: string) => (
    userId === MockBooking.userId ? [MockBooking] : []
  ));
  const findBookingByRoomIdMock = vi.fn(async (roomId: string) => (
    roomId === MockBooking.roomId ? [MockBooking] : []
  ));
  const createBookingMock = vi.fn(async (data: BookingCreateData) => ({
    ...MockBooking,
    ...data,
    id: `MOCK-B-${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  const updateBookingMock = vi.fn(async (bookingId: string, updates: BookingUpdateData) => (
    bookingId === MockBooking.id ? { ...MockBooking, ...updates, updatedAt: new Date() } : undefined
  ));
  const deleteBookingMock = vi.fn(async () => {
    return Promise.resolve();
  });

  return {
    findBookingAll: findBookingAllMock,
    findBookingById: findBookingByIdMock,
    findBookingByUserId: findBookingByUserIdMock,
    findBookingByRoomId: findBookingByRoomIdMock,
    createBooking: createBookingMock,
    updateBooking: updateBookingMock,
    deleteBooking: deleteBookingMock,
  };
};
