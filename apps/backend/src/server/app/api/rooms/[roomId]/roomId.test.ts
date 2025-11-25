import { describe, test, expect, vi, beforeEach } from "vitest";
import { GET, PUT, DELETE } from "./route"; 
import { Room } from "@hotel-project/domain";
import { MOCK_ROOM_DATA } from "../../../../mocks/room-service-api-mock";

const MOCK_ROOM_ID = MOCK_ROOM_DATA.id;

const localMocks = vi.hoisted(() => {
    const mockFindRoomById = vi.fn();
    const mockUpdateRoomService = vi.fn(); 
    const mockDeleteRoom = vi.fn();
    
    return { mockFindRoomById, mockUpdateRoomService, mockDeleteRoom };
});

vi.mock("@hotel-project/backend", () => {
  return {
    RoomServiceImplementation: vi.fn(() => ({
      findRoomById: localMocks.mockFindRoomById,
      updateRoom: localMocks.mockUpdateRoomService, 
      deleteRoom: localMocks.mockDeleteRoom,
    })),
  };
});

describe("API /api/rooms/[roomId] (Refactorizado con Casos de Uso)", () => {
  const { mockFindRoomById, mockUpdateRoomService, mockDeleteRoom } = localMocks;
  const roomData: Room = MOCK_ROOM_DATA;
  const mockParams = { params: { roomId: MOCK_ROOM_ID } };

  beforeEach(() => {
      vi.clearAllMocks();
  });

  test("GET should return 200 and the requested room", async () => {
    mockFindRoomById.mockResolvedValue(roomData);
    
    const response = await GET(new Request("http://localhost"), mockParams);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.id).toBe(MOCK_ROOM_ID);
    expect(mockFindRoomById).toHaveBeenCalledWith(MOCK_ROOM_ID);
  });

  test("GET should return 404 if the room does not exist", async () => {
    mockFindRoomById.mockResolvedValue(undefined);
    
    const response = await GET(new Request("http://localhost"), mockParams);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toContain(`Room ID ${MOCK_ROOM_ID} Not found`);
  });
  
  test("PUT should return 200 after updating the room", async () => {
    const updateData = { price: 200.00, description: "Executive Suite" };
    const UPDATED_ROOM: Room = { ...roomData, ...updateData, updatedAt: new Date() };

    mockUpdateRoomService.mockResolvedValue(UPDATED_ROOM); 

    const request = new Request("http://localhost", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    const response = await PUT(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.price).toBe(200.00);
    expect(mockUpdateRoomService).toHaveBeenCalledWith(
        MOCK_ROOM_ID,
        expect.objectContaining(updateData)
    );
  });

  test("PUT should return 400 if data is missing in the body", async () => {
    const request = new Request("http://localhost", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}), 
    });

    const response = await PUT(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Missing Update data. Body is empty.");
    expect(mockUpdateRoomService).not.toHaveBeenCalled();
  });
  
  test("PUT should return 400 if updates violate business rules (e.g., price <= 0)", async () => {
    const updateData = { price: 0 };
    
    const request = new Request("http://localhost", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
    });

    const response = await PUT(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("Room price must be positive on update.");
    expect(mockUpdateRoomService).not.toHaveBeenCalled();
  });

  test("PUT should return 404 if the room to update is not found", async () => {
    const updateData = { price: 100 };
    
    mockUpdateRoomService.mockResolvedValue(undefined); 

    const request = new Request("http://localhost", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    const response = await PUT(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toContain(`Room with ID ${MOCK_ROOM_ID} not found`);
    expect(mockUpdateRoomService).toHaveBeenCalledOnce();
  });


  test("DELETE should return 204 after deleting the room", async () => {
    mockDeleteRoom.mockResolvedValue(undefined); 

    const response = await DELETE(
      new Request("http://localhost",
      { method: 'DELETE' }), mockParams
    );

    expect(response.status).toBe(204);
    expect(mockDeleteRoom).toHaveBeenCalledWith(MOCK_ROOM_ID);
  });
  
  test("DELETE should return 500 if there is an error in the service", async () => {
    const error = new Error("Connection error");
    mockDeleteRoom.mockRejectedValue(error); 

    const response = await DELETE(new Request("http://localhost", { method: 'DELETE' }), mockParams);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain("Connection error");
  });
});
