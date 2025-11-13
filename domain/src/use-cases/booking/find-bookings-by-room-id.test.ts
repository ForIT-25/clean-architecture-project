import { describe, test, expect, beforeEach, vi } from "vitest";
import { BookingService, Booking, findBookingsByRoomId } from "@hotel-project/domain";
import { createMockBookingService, MockedBookingService, MockBooking } from "./mocks/booking-service-mock";

let mockedService: MockedBookingService;

describe("Use Case: findBookingsByRoomId", () => {
  const mockBooking: Booking = MockBooking; 
  const mockRoomId = mockBooking.roomId;

  beforeEach(() => {
    mockedService = createMockBookingService(); 
    vi.clearAllMocks();
  });

  test("should return a list of bookings for a valid Room ID", async () => {
    const mockBookings: Booking[] = [mockBooking];
    mockedService.findBookingByRoomId.mockResolvedValue(mockBookings);

    const bookings = await findBookingsByRoomId(mockedService as unknown as BookingService, mockRoomId);

    expect(bookings).toEqual(mockBookings);
    expect(bookings.length).toBe(1);
    expect(mockedService.findBookingByRoomId).toHaveBeenCalledOnce();
    expect(mockedService.findBookingByRoomId).toHaveBeenCalledWith(mockRoomId);
  });
  
  test("should return an empty array if no bookings are found for the Room ID", async () => {
    const nonExistentRoomId = 'non-existent-room';
    mockedService.findBookingByRoomId.mockResolvedValue([]);

    const bookings = await findBookingsByRoomId(mockedService as unknown as BookingService, nonExistentRoomId);

    expect(bookings).toEqual([]);
    expect(bookings.length).toBe(0);
    expect(mockedService.findBookingByRoomId).toHaveBeenCalledOnce();
    expect(mockedService.findBookingByRoomId).toHaveBeenCalledWith(nonExistentRoomId);
  });

  test("should throw an error if the Room ID is empty or null", async () => {
    await expect(findBookingsByRoomId(mockedService as unknown as BookingService, "")).rejects.toThrow(
      "Room ID is required for searching bookings"
    );
    await expect(findBookingsByRoomId(mockedService as unknown as BookingService, null as unknown as string)).rejects.toThrow(
      "Room ID is required for searching bookings"
    );
    expect(mockedService.findBookingByRoomId).not.toHaveBeenCalled();
  });
});
