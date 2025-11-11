import { describe, test, expect, beforeEach } from 'vitest';
import { deleteRoom } from './delete-room';
import { createMockRoomService, MockedRoomService } from './mocks/room-service.mock';

describe('deleteRoom', () => {
  let mockService: MockedRoomService;
  const roomId = 'ROOM-TO-DELETE-ID';

  beforeEach(() => {
    mockService = createMockRoomService();
  });

  test('Remove room by ID', async () => {
    mockService.deleteRoom.mockResolvedValue(undefined);

    await deleteRoom(mockService, roomId);

    expect(mockService.deleteRoom).toHaveBeenCalledWith(roomId);
    expect(mockService.deleteRoom).toHaveBeenCalledTimes(1);
  });
});
