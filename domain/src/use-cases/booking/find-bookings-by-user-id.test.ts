import { describe, test, expect, beforeEach, vi } from "vitest";
import { BookingService, Booking, findBookingsByUserId } from "@hotel-project/domain";
import { createMockBookingService, MockedBookingService, MockBooking } from "./mocks/booking-service-mock";

let mockedService: MockedBookingService;

describe("Use Case: findBookingsByUserId", () => {
  const mockBooking: Booking = MockBooking; 
  const mockUserId = mockBooking.userId;

  beforeEach(() => {
    mockedService = createMockBookingService(); 
    vi.clearAllMocks();
  });

  test("should return a list of bookings for a valid User ID", async () => {
    const mockBookings: Booking[] = [mockBooking];
    mockedService.findBookingByUserId.mockResolvedValue(mockBookings);

    const bookings = await findBookingsByUserId(mockedService as unknown as BookingService, mockUserId);

    expect(bookings).toEqual(mockBookings);
    expect(bookings.length).toBe(1);
    expect(mockedService.findBookingByUserId).toHaveBeenCalledOnce();
    expect(mockedService.findBookingByUserId).toHaveBeenCalledWith(mockUserId);
  });
  
  test("should return an empty array if no bookings are found for the User ID", async () => {
    const nonExistentUserId = 'non-existent-user';
    mockedService.findBookingByUserId.mockResolvedValue([]);

    const bookings = await findBookingsByUserId(mockedService as unknown as BookingService, nonExistentUserId);

    expect(bookings).toEqual([]);
    expect(bookings.length).toBe(0);
    expect(mockedService.findBookingByUserId).toHaveBeenCalledOnce();
    expect(mockedService.findBookingByUserId).toHaveBeenCalledWith(nonExistentUserId);
  });

  test("should throw an error if the User ID is empty or null", async () => {
    await expect(findBookingsByUserId(mockedService as unknown as BookingService, "")).rejects.toThrow(
      "User ID is required for searching bookings"
    );
    await expect(findBookingsByUserId(
      mockedService as unknown as BookingService,
      null as unknown as string)).rejects.toThrow(
        "User ID is required for searching bookings"
      );
    expect(mockedService.findBookingByUserId).not.toHaveBeenCalled();
  });
});
