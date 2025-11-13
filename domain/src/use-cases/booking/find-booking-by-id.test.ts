import { describe, test, expect, beforeEach, vi } from "vitest";
import { BookingService, Booking, findBookingById } from "@hotel-project/domain";
import { createMockBookingService, MockedBookingService, MockBooking } from "./mocks/booking-service-mock";

let mockedService: MockedBookingService;

describe("Use Case: findBookingById", () => {
  const mockBooking: Booking = MockBooking; 
  const mockBookingId = mockBooking.id;

  beforeEach(() => {
    mockedService = createMockBookingService(); 
    vi.clearAllMocks();
  });

  test("should return the booking when a valid ID is provided", async () => {
    mockedService.findBookingById.mockResolvedValue(mockBooking);

    const booking = await findBookingById(mockedService as unknown as BookingService, mockBookingId);

    expect(booking).toEqual(mockBooking);
    expect(mockedService.findBookingById).toHaveBeenCalledOnce();
    expect(mockedService.findBookingById).toHaveBeenCalledWith(mockBookingId);
  });
  
  test("should return undefined if the booking is not found", async () => {
    const nonExistentId = 'non-existent-id';
    mockedService.findBookingById.mockResolvedValue(undefined);

    const booking = await findBookingById(mockedService as unknown as BookingService, nonExistentId);

    expect(booking).toBeUndefined();
    expect(mockedService.findBookingById).toHaveBeenCalledOnce();
    expect(mockedService.findBookingById).toHaveBeenCalledWith(nonExistentId);
  });

  test("Throw an error if ID is empty or null", async () => {
    await expect(findBookingById(mockedService as unknown as BookingService, "")).rejects.toThrow(
      "Booking ID is required for searching"
    );
    await expect(findBookingById(mockedService as unknown as BookingService, null as unknown as string)).rejects.toThrow(
      "Booking ID is required for searching"
    );
    expect(mockedService.findBookingById).not.toHaveBeenCalled();
  });
});
