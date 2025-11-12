import { describe, test, expect, beforeEach, vi } from "vitest";
import { RoomService, Room, findRoomsByHotelId } from "@hotel-project/domain";
import { createMockRoomService, MockedRoomService, MockRoom } from "./mocks/room-service.mock";

let mockedService: MockedRoomService;

describe("findRoomsByHotelId", () => {
  const mockRoom: Room = MockRoom;
  const mockHotelId = mockRoom.hotelId;
  const mockRooms: Room[] = [mockRoom];

  beforeEach(() => {
    mockedService = createMockRoomService();
    vi.clearAllMocks();
  });

  test("Returns rooms for the Hotel ID", async () => {
    mockedService.findRoomByHotelId.mockResolvedValue(mockRooms);

    const rooms = await findRoomsByHotelId(mockedService as unknown as RoomService, mockHotelId);

    expect(rooms).toEqual(mockRooms);
    expect(mockedService.findRoomByHotelId).toHaveBeenCalledOnce();
    expect(mockedService.findRoomByHotelId).toHaveBeenCalledWith(mockHotelId);
  });
  
  test("Returns an empty array if rooms not found", async () => {
    const nonExistentId = 'non-existent-hotel-id';
    mockedService.findRoomByHotelId.mockResolvedValue([]);

    const rooms = await findRoomsByHotelId(mockedService as unknown as RoomService, nonExistentId);

    expect(rooms).toEqual([]);
    expect(mockedService.findRoomByHotelId).toHaveBeenCalledOnce();
  });

  test("Throw an error if ID is empty or null", async () => {
    await expect(findRoomsByHotelId(mockedService as unknown as RoomService, "")).rejects.toThrow(
      "Hotel ID is required to find rooms."
    );
    await expect(findRoomsByHotelId(
      mockedService as unknown as RoomService,
      null as unknown as string)).rejects.toThrow(
        "Hotel ID is required to find rooms."
      );
    
    expect(mockedService.findRoomByHotelId).not.toHaveBeenCalled();
  });
});
