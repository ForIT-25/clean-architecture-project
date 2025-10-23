import { describe, test, expect, vi, beforeEach } from "vitest";
import { GET, PUT, DELETE } from "./route"; 
import { Hotel } from "../../../../../../../../../domain/src/entities/hotel";

const MOCK_HOTEL_ID = "hotel-123";

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn(() => ({
    })),
  };
});

const mocks = vi.hoisted(() => {
    const mockFindHotelById = vi.fn<(hotelId: string) => Promise<Hotel | undefined>>();
    const mockUpdateHotel = vi.fn<(hotelId: string, updates: Partial<Hotel>) => Promise<void>>();
    const mockDeleteHotel = vi.fn<(hotelId: string) => Promise<void>>();
    
    return { mockFindHotelById, mockUpdateHotel, mockDeleteHotel };
});

vi.mock("../../../../../../service/hotel-service", () => {
  return {
    HotelServiceImplementation: vi.fn(() => ({
      findHotelById: mocks.mockFindHotelById,
      updateHotel: mocks.mockUpdateHotel,
      deleteHotel: mocks.mockDeleteHotel,
    })),
  };
});

describe("API /api/hotels/[hotelId]", () => {
    const { mockFindHotelById, mockUpdateHotel, mockDeleteHotel } = mocks;
    const hotelData: Hotel = { id: MOCK_HOTEL_ID, name: "Test Hotel", address: "123 Main St", description: "Nice place", rooms: [] };
    
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
        const updateData = { name: "Updated Name", address: "New Address", description: "Updated" };

        mockUpdateHotel.mockResolvedValue(undefined); 

        const request = new Request("http://localhost", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData),
        });

        const response = await PUT(request, mockParams);

        expect(response.status).toBe(200);
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

    test("DELETE should return 204 after deleting the hotel", async () => {
        mockDeleteHotel.mockResolvedValue(undefined); 

        const response = await DELETE(new Request("http://localhost", { method: 'DELETE' }), mockParams);

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
