import { describe, test, expect, vi, beforeEach } from 'vitest';
import { GET } from './route'; 
import { Booking, BookingService } from '@hotel-project/domain';
import { MOCK_BOOKING_DATA } from '../../../../../mocks/booking-service-api-mock'; 

const MOCK_USER_ID = MOCK_BOOKING_DATA.userId;
const MOCK_BOOKINGS: Booking[] = [MOCK_BOOKING_DATA];


const localMocks = vi.hoisted(() => {
    const mockFindBookingsByUserId = vi.fn();
    
    return { mockFindBookingsByUserId };
});

vi.mock('@hotel-project/backend', () => {
  return {
    BookingServiceImplementation: vi.fn(() => ({
      findBookingByUserId: localMocks.mockFindBookingsByUserId,
    })),
  };
});

vi.mock('@hotel-project/domain', () => ({
  findBookingsByUserId: vi.fn((service: BookingService, userId: string) => 
    service.findBookingByUserId(userId)
  ),
}));


describe('API Route: /api/bookings/user/[userId] (GET)', () => {
  const { mockFindBookingsByUserId } = localMocks;
  const MOCK_PARAMS = { params: { userId: MOCK_USER_ID } };
  const MOCK_INVALID_PARAMS = { params: { userId: '' } };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should return 200 and a list of bookings for the user', async () => {
    mockFindBookingsByUserId.mockResolvedValue(MOCK_BOOKINGS);

    const response = await GET({} as Request, MOCK_PARAMS);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(JSON.parse(JSON.stringify(MOCK_BOOKINGS)));
    expect(mockFindBookingsByUserId).toHaveBeenCalledWith(MOCK_USER_ID);
  });

  test('should return 200 and an empty array if no bookings are found', async () => {
    mockFindBookingsByUserId.mockResolvedValue([]);

    const response = await GET({} as Request, MOCK_PARAMS);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
    expect(mockFindBookingsByUserId).toHaveBeenCalledOnce();
  });
  
  test('should return 400 if the userId is empty or invalid', async () => {
    const error = new Error('User ID is required for searching bookings');
    mockFindBookingsByUserId.mockRejectedValue(error); 
    
    const response = await GET({} as Request, MOCK_INVALID_PARAMS);
    const data = await response.json();
    
    expect(response.status).toBe(400);
    expect(data.message).toContain('User ID is required');
  });
});
