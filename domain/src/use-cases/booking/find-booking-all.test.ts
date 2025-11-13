import { beforeEach, describe, expect, test, vi } from "vitest";
import { BookingService, Booking, findBookingAll } from "@hotel-project/domain";
import { createMockBookingService, MockBooking, MockedBookingService } from "./mocks/booking-service-mock";

let mockedService: MockedBookingService;

describe("Use Case: findBookingAll", () => {
  beforeEach(() => {
    mockedService = createMockBookingService(); 
    vi.clearAllMocks();
  });

  test("should return a list of all bookings", async () => {
    const mockBookings: Booking[] = [MockBooking, { ...MockBooking, id: 'B2', totalPrice: 300 }];
    mockedService.findBookingAll.mockResolvedValue(mockBookings);

    const bookings = await findBookingAll(mockedService as unknown as BookingService);

    expect(bookings).toEqual(mockBookings);
    expect(bookings.length).toBe(2);
    expect(mockedService.findBookingAll).toHaveBeenCalledOnce();
  });
  
  test("should return an empty array if no bookings exist", async () => {
    mockedService.findBookingAll.mockResolvedValue([]);

    const bookings = await findBookingAll(mockedService as unknown as BookingService);

    expect(bookings).toEqual([]);
    expect(bookings.length).toBe(0);
    expect(mockedService.findBookingAll).toHaveBeenCalledOnce();
  });
});
