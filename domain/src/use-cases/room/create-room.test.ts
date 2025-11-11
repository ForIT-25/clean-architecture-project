import { describe, test, expect, beforeEach } from 'vitest';
import { createRoom, CreateRoomData, ROOMTYPES } from '@hotel-project/domain';
import { createMockRoomService, MockedRoomService, MockRoom } from './mocks/room-service.mock';

describe('createRoom', () => {
  let mockService: MockedRoomService;
  const validData: CreateRoomData = {
    name: 'Test Room',
    type: ROOMTYPES.DOUBLE,
    description: 'A test double room',
    price: 150.00,
    isAvailable: true,
    hotelId: 'TEST-HOTEL-ID',
  };

  beforeEach(() => {
    mockService = createMockRoomService();
  });

  test('Create and return the new room', async () => {
    const expectedRoom = { ...MockRoom, ...validData, id: 'new-id-123' };
    mockService.createRoom.mockResolvedValue(expectedRoom);

    const result = await createRoom(mockService, validData);

    expect(mockService.createRoom).toHaveBeenCalledWith(validData);
    expect(mockService.createRoom).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedRoom);
  });

  test('Throws an error if price is zero or negative.', async () => {
    const invalidData = { ...validData, price: 0 };

    await expect(createRoom(mockService, invalidData)).rejects.toThrow(
      'Price must be positive'
    );

    expect(mockService.createRoom).not.toHaveBeenCalled();
  });
});
