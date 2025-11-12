import { describe, test, expect, beforeEach, vi } from "vitest";
import { RoomService, Room, findRoomById } from "@hotel-project/domain";
import { createMockRoomService, MockedRoomService, MockRoom } from "./mocks/room-service.mock";

let mockedService: MockedRoomService;

describe("Use Case: findRoomById", () => {
  const mockRoom: Room = MockRoom; 
  const mockRoomId = mockRoom.id;

  beforeEach(() => {
    mockedService = createMockRoomService(); 
    vi.clearAllMocks();
  });

  test("should return the room when a valid ID is provided", async () => {
    mockedService.findRoomById.mockResolvedValue(mockRoom);

    const room = await findRoomById(mockedService as unknown as RoomService, mockRoomId);

    expect(room).toEqual(mockRoom);
    expect(mockedService.findRoomById).toHaveBeenCalledOnce();
    expect(mockedService.findRoomById).toHaveBeenCalledWith(mockRoomId);
  });
  
  test("should return undefined if the room is not found", async () => {
    const nonExistentId = 'non-existent-id';
    mockedService.findRoomById.mockResolvedValue(undefined);

    const room = await findRoomById(mockedService as unknown as RoomService, nonExistentId);

    expect(room).toBeUndefined();
    expect(mockedService.findRoomById).toHaveBeenCalledOnce();
  });

  test("should throw an error if the room ID is empty or null", async () => {
    await expect(findRoomById(mockedService as unknown as RoomService, "")).rejects.toThrow(
      "Room ID is required for searching"
    );
    await expect(findRoomById(mockedService as unknown as RoomService, null as unknown as string)).rejects.toThrow(
      "Room ID is required for searching"
    );
    expect(mockedService.findRoomById).not.toHaveBeenCalled();
  });
});
