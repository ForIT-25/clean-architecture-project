import { describe, test, expect, vi, beforeEach } from "vitest";
import { GET, PUT, DELETE } from "./route"; 
import { Hotel } from "@hotel-project/domain";
import { MOCK_HOTEL_DATA } from "../../../../mocks/hotel-service-api-mock"

const MOCK_HOTEL_ID = MOCK_HOTEL_DATA.id;

const localMocks = vi.hoisted(() => {
    const mockFindHotelById = vi.fn();
    const mockUpdateHotel = vi.fn(); 
    const mockDeleteHotel = vi.fn();
    
    return { mockFindHotelById, mockUpdateHotel, mockDeleteHotel };
});

vi.mock("@hotel-project/backend", () => {
  return {
    HotelServiceImplementation: vi.fn(() => ({
      findHotelById: localMocks.mockFindHotelById,
      updateHotel: localMocks.mockUpdateHotel,
      deleteHotel: localMocks.mockDeleteHotel,
    })),
  };
});

describe("API /api/hotels/[hotelId]", () => {
  const { mockFindHotelById, mockUpdateHotel, mockDeleteHotel } = localMocks;
  const hotelData: Hotel = MOCK_HOTEL_DATA;
  const mockParams = { params: { hotelId: MOCK_HOTEL_ID } };

  beforeEach(() => {
      vi.clearAllMocks();
  });

  test("GET should return 200 and the requested hotel", async () => {
    mockFindHotelById.mockResolvedValue(hotelData);
    
    const response = await GET(new Request("http://localhost"), mockParams);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.id).toBe(MOCK_HOTEL_ID);
    expect(mockFindHotelById).toHaveBeenCalledWith(MOCK_HOTEL_ID);
  });

  test("GET should return 404 if the hotel does not exist", async () => {
    mockFindHotelById.mockResolvedValue(undefined);
    
    const response = await GET(new Request("http://localhost"), mockParams);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toContain("Hotel Not found");
  });

  test("PUT should return 200 after updating the hotel", async () => {
    const updateData = {
      name: "Updated Name",
      address: "New Address",
      description: "Updated"
    };
    const UPDATED_HOTEL: Hotel = {
      ...hotelData,
      ...updateData,
    };

    mockUpdateHotel.mockResolvedValue(UPDATED_HOTEL); 

    const request = new Request("http://localhost", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    const response = await PUT(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.name).toBe("Updated Name");
    expect(mockUpdateHotel).toHaveBeenCalledWith(
      MOCK_HOTEL_ID,
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
    expect(data.error).toContain("Missing Update data.");
    expect(mockUpdateHotel).not.toHaveBeenCalled();
  });

  test("PUT should return 404 if the hotel does not exist", async () => {
    const updateData = { name: "Test" };
    
    mockUpdateHotel.mockRejectedValue(new Error(`Hotel with ID ${MOCK_HOTEL_ID} not found`)); 

    const request = new Request("http://localhost", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    const response = await PUT(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toContain(`Hotel with ID ${MOCK_HOTEL_ID} not found`);
    expect(mockUpdateHotel).toHaveBeenCalledOnce();
  });

  test("DELETE should return 204 after deleting the hotel", async () => {
    mockDeleteHotel.mockResolvedValue(undefined); 

    const response = await DELETE(
      new Request("http://localhost",
      { method: 'DELETE' }), mockParams
    );

    expect(response.status).toBe(204);
    expect(mockDeleteHotel).toHaveBeenCalledWith(MOCK_HOTEL_ID);
  });
  
  test("DELETE should return 500 if there is an error in the service", async () => {
    const error = new Error("Connection error");
    mockDeleteHotel.mockRejectedValue(error); 

    const response = await DELETE(new Request("http://localhost", { method: 'DELETE' }), mockParams);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain("Connection error");
  });
});
