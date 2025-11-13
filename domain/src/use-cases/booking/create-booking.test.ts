import { describe, test, expect, beforeEach } from 'vitest';
import { createBooking, BookingCreateData } from '@hotel-project/domain';
import { createMockBookingService, MockedBookingService, MockBooking } from './mocks/booking-service-mock';

describe('createBooking', () => {
  let mockService: MockedBookingService;
  const validData: BookingCreateData = {
    startDate: new Date(Date.now() + 86400000 * 2),
    endDate: new Date(Date.now() + 86400000 * 5),
    userId: 'TEST-U1',
    roomId: 'TEST-R1',
    totalPrice: 300.50,
  };

  beforeEach(() => {
    mockService = createMockBookingService();
    mockService.createBooking.mockClear();
  });

  test('Return the new reservation if the details are valid', async () => {
    const expectedBooking = { ...MockBooking, ...validData, id: 'NEW-B-ID' };
    mockService.createBooking.mockResolvedValue(expectedBooking);

    const result = await createBooking(mockService, validData);

    expect(mockService.createBooking).toHaveBeenCalledWith(validData);
    expect(result).toEqual(expectedBooking);
  });

  test('Throws an error if totalPrice is zero or negative', async () => {
    const invalidData = { ...validData, totalPrice: 0 };

    await expect(createBooking(mockService, invalidData)).rejects.toThrow(
      'Total price must be positive.'
    );
    expect(mockService.createBooking).not.toHaveBeenCalled();
  });

  test('Throws an error if startDate is equal to or later than endDate', async () => {
    const invalidData = { 
        ...validData, 
        startDate: new Date(validData.endDate.getTime()),
    };

    await expect(createBooking(mockService, invalidData)).rejects.toThrow(
      'Start date must be before end date.'
    );
    expect(mockService.createBooking).not.toHaveBeenCalled();
  });

  test('Throws an error if userId is empty or null', async () => {
    const invalidDataEmpty = { ...validData, userId: '' };
    const invalidDataNull = { ...validData, userId: null as unknown as string };

    await expect(createBooking(mockService, invalidDataEmpty)).rejects.toThrow(
      'User ID is required for creating a booking.'
    );
    await expect(createBooking(mockService, invalidDataNull)).rejects.toThrow(
      'User ID is required for creating a booking.'
    );
    expect(mockService.createBooking).not.toHaveBeenCalled();
  });

  test('Throws an error if roomId is empty or null', async () => {
    const invalidDataEmpty = { ...validData, roomId: '' };
    const invalidDataNull = { ...validData, roomId: null as unknown as string };

    await expect(createBooking(mockService, invalidDataEmpty)).rejects.toThrow(
      'Room ID is required for creating a booking.'
    );
    await expect(createBooking(mockService, invalidDataNull)).rejects.toThrow(
      'Room ID is required for creating a booking.'
    );
    expect(mockService.createBooking).not.toHaveBeenCalled();
  });
});
