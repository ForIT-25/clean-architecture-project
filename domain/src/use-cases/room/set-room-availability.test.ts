import { describe, test, expect, beforeEach } from 'vitest';
import { setRoomAvailability } from './set-room-availability';
import { createMockRoomService, MockedRoomService, MockRoom } from './mocks/room-service.mock';

describe('setRoomAvailability', () => {
  let mockService: MockedRoomService;
  const roomId = MockRoom.id;

  beforeEach(() => {
    mockService = createMockRoomService();
    mockService.updateRoom.mockClear(); 
  });

  test('Set isAvailable to true', async () => {
    const expectedRoom = { ...MockRoom, isAvailable: true };
    mockService.updateRoom.mockResolvedValue(expectedRoom);

    const result = await setRoomAvailability(mockService, true, roomId);

    expect(mockService.updateRoom).toHaveBeenCalledWith(roomId, {
      isAvailable: true,
    });
    expect(result?.isAvailable).toBe(true);
    expect(result).toEqual(expectedRoom);
  });

  test('Set isAvailable to false', async () => {
    const expectedRoom = { ...MockRoom, isAvailable: false };
    mockService.updateRoom.mockResolvedValue(expectedRoom);

    const result = await setRoomAvailability(mockService, false, roomId);

    expect(mockService.updateRoom).toHaveBeenCalledWith(roomId, {
      isAvailable: false,
    });
    expect(result?.isAvailable).toBe(false);
    expect(result).toEqual(expectedRoom);
  });
});
