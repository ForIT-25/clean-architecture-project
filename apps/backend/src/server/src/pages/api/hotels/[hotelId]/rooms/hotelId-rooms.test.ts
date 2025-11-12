import { describe, test, expect, vi, beforeEach } from "vitest";
import { GET, POST } from "./route"; 
import { Room, CreateRoomData, RoomType } from "@hotel-project/domain";
import { MOCK_ROOM_DATA, createMockRoomServiceAPI, MockedRoomServiceAPI } from "../../../../../mocks/room-service-api-mock";

const MOCK_HOTEL_ID = MOCK_ROOM_DATA.hotelId;

const mockedService: MockedRoomServiceAPI = createMockRoomServiceAPI();

vi.mock("@hotel-project/backend", () => {
  return {
    RoomServiceImplementation: vi.fn(() => (mockedService)), 
  };
});

describe("API /api/hotels/[hotelId]/rooms (Test de Integración Limpio)", () => {
  const roomData: Room = MOCK_ROOM_DATA; //
  const mockParams = { params: { hotelId: MOCK_HOTEL_ID } };
  const mockRooms: Room[] = [roomData];

  beforeEach(() => {
      vi.clearAllMocks();
  });

  test("GET debe retornar 200 y una lista de rooms para el hotel", async () => {
    mockedService.findRoomByHotelId.mockResolvedValue(mockRooms);
    
    const response = await GET(new Request("http://localhost"), mockParams);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockRooms);
    expect(mockedService.findRoomByHotelId).toHaveBeenCalledWith(MOCK_HOTEL_ID);
  });

  test("GET debe retornar 400 si el hotel ID está vacío (Validación UC)", async () => {
    const errorParams = { params: { hotelId: "" } };
    
    const response = await GET(new Request("http://localhost"), errorParams);
    const data = await response.json();

    expect(response.status).toBe(400); 
    expect(data.error).toContain("Hotel ID is required to find rooms.");
    expect(mockedService.findRoomByHotelId).not.toHaveBeenCalled();
  });
  
  const roomRequestBody: Omit<CreateRoomData, 'hotelId'> = {
      name: "New Room",
      type: "double" as RoomType,
      description: "A large double room.",
      price: 250.00,
      isAvailable: true,
  }; 
  
  const expectedDataSentToService: CreateRoomData = {
      ...roomRequestBody,
      hotelId: MOCK_HOTEL_ID,
  }
  
  const createdRoom: Room = { 
    ...roomData, 
    ...expectedDataSentToService,
    id: 'NEW-R2',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  test("POST debe retornar 201 después de crear un nuevo room", async () => {
    mockedService.createRoom.mockResolvedValue(createdRoom); 

    const request = new Request("http://localhost", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roomRequestBody),
    });

    const response = await POST(request, mockParams);
    const data = await response.json();
    expect(data.message).toBe("Created room successfully");
    expect(response.status).toBe(201);
    expect(mockedService.createRoom).toHaveBeenCalledWith(
        expect.objectContaining(expectedDataSentToService)
    );
  });

  test("POST debe retornar 400 si falta un campo requerido (Handler validation)", async () => {
    const invalidBody = { ...roomRequestBody, price: undefined };
    
    const request = new Request("http://localhost", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidBody),
    });

    const response = await POST(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("Missing required field: price");
    expect(mockedService.createRoom).not.toHaveBeenCalled();
  });
  
  test("POST debe retornar 400 si el precio es <= 0 (Validación UC)", async () => {
    const invalidBody = { ...roomRequestBody, price: 0 };
 
    const request = new Request("http://localhost", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidBody),
    });

    const response = await POST(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("Price must be positive");
    expect(mockedService.createRoom).not.toHaveBeenCalled(); 
  });
});
