import { describe, test, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from './route';
import { Booking, BookingCreateData, BookingService } from '@hotel-project/domain';
import { MOCK_BOOKING_DATA } from '../../../mocks/booking-service-api-mock'; 

const localMocks = vi.hoisted(() => {
    const mockFindBookingAll = vi.fn();
    const mockCreateBooking = vi.fn(); 
    
    return { mockFindBookingAll, mockCreateBooking };
});

vi.mock('@hotel-project/backend', () => {
    return {
        BookingServiceImplementation: vi.fn(() => ({
            findBookingAll: localMocks.mockFindBookingAll,
            createBooking: localMocks.mockCreateBooking,
        })),
    };
});

vi.mock('@hotel-project/domain', () => ({
    findBookingAll: vi.fn((service: BookingService) => service.findBookingAll()),
    createBooking: vi.fn((service: BookingService, data: BookingCreateData) => service.createBooking(data)),
}));


interface PostBody {
    userId: string;
    roomId: string;
    totalPrice: number;
    startDate: string; 
    endDate: string;
}

const mockRequest = (body: PostBody) => ({
  json: vi.fn().mockResolvedValue(body),
} as unknown as Request); 


describe('/api/bookings', () => {
  const { mockFindBookingAll, mockCreateBooking } = localMocks;
  
  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  describe('GET', () => {
    test('Return 200 and a reservation list', async () => {
      mockFindBookingAll.mockResolvedValue([MOCK_BOOKING_DATA]);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data[0].id).toBe(MOCK_BOOKING_DATA.id);
      expect(mockFindBookingAll).toHaveBeenCalledTimes(1);
    });

    test('Returns 500 if the domain service fails', async () => {
      mockFindBookingAll.mockRejectedValue(new Error('DB connection failed'));

      const response = await GET();
      expect(response.status).toBe(500);
    });
  });

  describe('POST', () => {
    const validBody: PostBody = {
      userId: 'U-NEW',
      roomId: 'R-NEW',
      totalPrice: 250.0,
      startDate: '2026-02-01T00:00:00.000Z',
      endDate: '2026-02-05T00:00:00.000Z',
    };

    test('Return to 201 and the created reservation', async () => {
      const createdBooking: Booking = { 
        ...MOCK_BOOKING_DATA, 
        id: 'B-NEW', 
        userId: validBody.userId,
        startDate: new Date(validBody.startDate), 
        endDate: new Date(validBody.endDate),
      };
      
      mockCreateBooking.mockResolvedValue(createdBooking);

      const request = mockRequest(validBody);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.id).toBe('B-NEW');
      
      const serviceCallArgs: BookingCreateData = mockCreateBooking.mock.calls[0][0];
      expect(serviceCallArgs.startDate).toBeInstanceOf(Date);
    });

    test('Returns 400 due to validation error', async () => {
      const validationError = new Error('Total price must be positive.');
      mockCreateBooking.mockRejectedValue(validationError);

      const invalidBody: PostBody = { ...validBody, totalPrice: -5 }; 
      const request = mockRequest(invalidBody);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Total price must be positive.');
    });
  });
});
