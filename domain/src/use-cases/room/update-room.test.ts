import { describe, test, expect, beforeEach } from 'vitest';
import { UpdateRoomData, updateRoom } from '@hotel-project/domain';
import { createMockRoomService, MockedRoomService, MockRoom } from './mocks/room-service.mock';

describe('updateRoom', () => {
  let mockService: MockedRoomService;
  const roomId = MockRoom.id;

  beforeEach(() => {
    mockService = createMockRoomService();
  });

  test('Update the data and return the new room', async () => {
    const updates: UpdateRoomData = { name: 'New Room Name', description: 'Updated desc' };
    const expectedRoom = { ...MockRoom, ...updates, updatedAt: new Date() };

    mockService.updateRoom.mockResolvedValue(expectedRoom);

    const result = await updateRoom(mockService, roomId, updates);

    expect(mockService.updateRoom).toHaveBeenCalledWith(roomId, updates);
    expect(result?.name).toBe('New Room Name');
    expect(result).toEqual(expectedRoom);
  });

  test('Throw an error if the price is zero or negative', async () => {
    const updates: UpdateRoomData = { price: -5 };

    await expect(updateRoom(mockService, roomId, updates)).rejects.toThrow(
      'Room price must be positive on update.'
    );

    expect(mockService.updateRoom).not.toHaveBeenCalled();
  });

  test('Allows update if price is not defined', async () => {
    const updates: UpdateRoomData = { name: 'Update only name' };
    const expectedRoom = { ...MockRoom, ...updates };

    mockService.updateRoom.mockResolvedValue(expectedRoom);

    await updateRoom(mockService, roomId, updates);

    expect(mockService.updateRoom).toHaveBeenCalledWith(roomId, updates);
  });
});
