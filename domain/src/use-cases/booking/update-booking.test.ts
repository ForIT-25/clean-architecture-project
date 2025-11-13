import { describe, test, expect, beforeEach } from 'vitest';
import { updateBooking, BookingUpdateData } from '@hotel-project/domain';
import { createMockBookingService, MockedBookingService, MockBooking } from './mocks/booking-service-mock';

describe('updateBooking', () => {
  let mockService: MockedBookingService;
  const bookingId = MockBooking.id;

  beforeEach(() => {
    mockService = createMockBookingService();
    mockService.updateBooking.mockClear();
  });

  test('Update and return the new reservation', async () => {
    const updates: BookingUpdateData = { totalPrice: 450.00 };
    const expectedBooking = { ...MockBooking, ...updates };

    mockService.updateBooking.mockResolvedValue(expectedBooking);

    const result = await updateBooking(mockService, bookingId, updates);

    expect(mockService.updateBooking).toHaveBeenCalledWith(bookingId, updates);
    expect(result?.totalPrice).toBe(450.00);
  });

  test('Throws an error if try to update totalPrice to zero or negative.', async () => {
    const updates: BookingUpdateData = { totalPrice: -10 };

    await expect(updateBooking(mockService, bookingId, updates)).rejects.toThrow(
      'Total price must be positive on update.'
    );
    expect(mockService.updateBooking).not.toHaveBeenCalled();
  });

  test('Throws an error if startDate is later than endDate', async () => {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() - 86400000);
    const updates: BookingUpdateData = { startDate, endDate };

    await expect(updateBooking(mockService, bookingId, updates)).rejects.toThrow(
      'Start date must be before end date on update.'
    );
    expect(mockService.updateBooking).not.toHaveBeenCalled();
  });

  test('Update only one date', async () => {
    const updates: BookingUpdateData = { startDate: new Date(Date.now() + 86400000 * 3) };
    const expectedBooking = { ...MockBooking, ...updates };
    
    mockService.updateBooking.mockResolvedValue(expectedBooking);

    const result = await updateBooking(mockService, bookingId, updates);

    expect(mockService.updateBooking).toHaveBeenCalledWith(bookingId, updates);
    expect(result).toBeDefined();
  });

  test('Throws an error if the booking ID is empty or null', async () => {
    const updates: BookingUpdateData = { totalPrice: 500.00 };

    await expect(updateBooking(mockService, "", updates)).rejects.toThrow(
      'Booking ID is required for updating.'
    );
    await expect(updateBooking(mockService, null as unknown as string, updates)).rejects.toThrow(
      'Booking ID is required for updating.'
    );
    expect(mockService.updateBooking).not.toHaveBeenCalled();
  });
});
