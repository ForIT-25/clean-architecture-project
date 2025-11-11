import { describe, test, expect, beforeEach } from 'vitest';
import { deleteBooking } from './delete-booking';
import { createMockBookingService, MockedBookingService } from './mocks/booking-service-mock';

describe('deleteBooking', () => {
  let mockService: MockedBookingService;
  const bookingId = 'BOOKING-TO-DELETE-ID';

  beforeEach(() => {
    mockService = createMockBookingService();
    mockService.deleteBooking.mockClear();
  });

  test('Delete reservation by ID', async () => {
    mockService.deleteBooking.mockResolvedValue(undefined);

    await deleteBooking(mockService, bookingId);

    expect(mockService.deleteBooking).toHaveBeenCalledWith(bookingId);
    expect(mockService.deleteBooking).toHaveBeenCalledTimes(1);
  });
});
