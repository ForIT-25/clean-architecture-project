import { describe, test, expect, vi, beforeEach } from 'vitest';
import { GET } from './route'; 
import { Booking, BookingService } from '@hotel-project/domain';
import { MOCK_BOOKING_DATA } from '../../../../../mocks/booking-service-api-mock'; 

const MOCK_ROOM_ID = MOCK_BOOKING_DATA.roomId;
const MOCK_BOOKINGS: Booking[] = [MOCK_BOOKING_DATA];


const localMocks = vi.hoisted(() => {
    const mockFindBookingsByRoomId = vi.fn();
    
    return { mockFindBookingsByRoomId };
});

vi.mock('@hotel-project/backend', () => {
  return {
    BookingServiceImplementation: vi.fn(() => ({
      findBookingByRoomId: localMocks.mockFindBookingsByRoomId,
    })),
  };
});

vi.mock('@hotel-project/domain', () => ({
  findBookingsByRoomId: vi.fn((service: BookingService, roomId: string) => 
    service.findBookingByRoomId(roomId)
  ),
}));


describe('API Route: /api/bookings/room/[roomId] (GET)', () => {
  const { mockFindBookingsByRoomId } = localMocks;
  const MOCK_PARAMS = { params: { roomId: MOCK_ROOM_ID } };
  const MOCK_INVALID_PARAMS = { params: { roomId: '' } };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should return 200 and a list of bookings for the room', async () => {
    mockFindBookingsByRoomId.mockResolvedValue(MOCK_BOOKINGS);

    const response = await GET({} as Request, MOCK_PARAMS);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(JSON.parse(JSON.stringify(MOCK_BOOKINGS)));
    expect(mockFindBookingsByRoomId).toHaveBeenCalledWith(MOCK_ROOM_ID);
  });

  test('should return 200 and an empty array if no bookings are found', async () => {
    mockFindBookingsByRoomId.mockResolvedValue([]);

    const response = await GET({} as Request, MOCK_PARAMS);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
    expect(mockFindBookingsByRoomId).toHaveBeenCalledOnce();
  });
  
  test('should return 400 if the roomId is empty or invalid', async () => {
    const error = new Error('Room ID is required for searching bookings');
    mockFindBookingsByRoomId.mockRejectedValue(error); 
    
    const response = await GET({} as Request, MOCK_INVALID_PARAMS);
    const data = await response.json();
    
    expect(response.status).toBe(400);
    expect(data.message).toContain('Room ID is required');
  });
});
