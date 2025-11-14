import { describe, test, expect, vi, beforeEach } from 'vitest';
import { GET, PUT, DELETE } from './route'; 
import { Booking, BookingService, BookingUpdateData } from '@hotel-project/domain';
import { MOCK_BOOKING_DATA } from '../../../../mocks/booking-service-api-mock'; 

const localMocks = vi.hoisted(() => {
  const mockFindBookingById = vi.fn();
  const mockUpdateBooking = vi.fn();
  const mockDeleteBooking = vi.fn();
  
  return { mockFindBookingById, mockUpdateBooking, mockDeleteBooking };
});

vi.mock('@hotel-project/backend', () => {
  return {
    BookingServiceImplementation: vi.fn(() => ({
      findBookingById: localMocks.mockFindBookingById,
      updateBooking: localMocks.mockUpdateBooking,
      deleteBooking: localMocks.mockDeleteBooking,
    })),
  };
});

vi.mock('@hotel-project/domain', () => ({
  findBookingById: vi.fn((service: BookingService, id: string) => service.findBookingById(id)),
  updateBooking: vi.fn((
    service: BookingService,
    id: string,
    updates: BookingUpdateData) => service.updateBooking(id, updates)),
  deleteBooking: vi.fn((service: BookingService, id: string) => service.deleteBooking(id)),
}));

const MOCK_ID = MOCK_BOOKING_DATA.id;
const MOCK_PARAMS = { params: { bookingId: MOCK_ID } };
const MOCK_NON_EXISTENT_PARAMS = { params: { bookingId: 'B-NON-EXISTENT' } };
const MOCK_INVALID_PARAMS = { params: { bookingId: '' } };

interface PutBody {
  totalPrice?: number;
  startDate?: string; 
  endDate?: string;
}

const mockPutRequest = (body: PutBody) => ({
  json: vi.fn().mockResolvedValue(body),
} as unknown as Request); 

describe('API Route: /api/bookings/[bookingId]', () => {
  const { mockFindBookingById, mockUpdateBooking, mockDeleteBooking } = localMocks;

  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  describe('GET', () => {
    test('Return 200 and the reservation if it exists', async () => {
      mockFindBookingById.mockResolvedValue(MOCK_BOOKING_DATA);

      const response = await GET({} as Request, MOCK_PARAMS); 
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.id).toBe(MOCK_ID);
    });

    test('Returns 404 if the reservation does not exist', async () => {
      mockFindBookingById.mockResolvedValue(undefined);

      const response = await GET({} as Request, MOCK_NON_EXISTENT_PARAMS);
      expect(response.status).toBe(404);
    });
    
    test('Returns 400 if the bookingId is null', async () => {
      mockFindBookingById.mockRejectedValue(new Error('Booking ID is required for searching')); 

      const response = await GET({} as Request, MOCK_INVALID_PARAMS); 
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.message).toContain('required for searching');
    });

    test('Returns 500 if the domain service fails', async () => {
      mockFindBookingById.mockRejectedValue(new Error('DB connection failed'));

      const response = await GET({} as Request, MOCK_PARAMS);
      expect(response.status).toBe(500);
    });
  });

  describe('PUT', () => {
    const updates: PutBody = { totalPrice: 999.99 };

    test('Return 200 and the updated reservation', async () => {
      const updatedBooking: Booking = { ...MOCK_BOOKING_DATA, totalPrice: updates.totalPrice! };
      mockUpdateBooking.mockResolvedValue(updatedBooking);

      const request = mockPutRequest(updates);
      const response = await PUT(request, MOCK_PARAMS);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.totalPrice).toBe(999.99);
      expect(mockUpdateBooking).toHaveBeenCalledWith(MOCK_ID, updates);
    });

    test('Returns 404 if the reservation does not exist', async () => {
      mockUpdateBooking.mockResolvedValue(undefined);

      const request = mockPutRequest(updates);
      const response = await PUT(request, MOCK_NON_EXISTENT_PARAMS);
      
      expect(response.status).toBe(404);
    });

    test('Return 400 due to validation error', async () => {
      const validationError = new Error('Total price must be positive on update.'); 
      mockUpdateBooking.mockRejectedValue(validationError);

      const invalidUpdates: PutBody = { totalPrice: -10 }; 
      const request = mockPutRequest(invalidUpdates);
      const response = await PUT(request, MOCK_PARAMS);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toContain('positive on update');
    });
  });

  describe('DELETE', () => {
    test('Return to 204 and call deleteBooking', async () => {
      mockDeleteBooking.mockResolvedValue(undefined);

      const response = await DELETE({} as Request, MOCK_PARAMS);

      expect(response.status).toBe(204);
      expect(mockDeleteBooking).toHaveBeenCalledWith(MOCK_ID);
    });
    
    test('Return 400 if bookingId is null', async () => {
      mockDeleteBooking.mockRejectedValue(new Error('Booking ID is required for deletion.'));

      const response = await DELETE({} as Request, MOCK_INVALID_PARAMS); 
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.message).toContain('required for deletion');
    });
  });
});
