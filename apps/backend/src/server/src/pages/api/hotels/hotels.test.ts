import { describe, test, expect, vi, beforeEach } from "vitest";
import { GET, POST } from "./route";
import { Hotel } from "../../../../../../../../domain/src/entities/hotel";

const mocks = vi.hoisted(() => {
    const mockFindHotelAll = vi.fn<() => Promise<Hotel[]>>();
    const mockSaveHotel = vi.fn<(hotel: Hotel) => Promise<void>>();
    return {
        mockFindHotelAll,
        mockSaveHotel,
    };
});

vi.mock("../../../../../service/hotel-service", () => {
  return {
    HotelServiceImplementation: vi.fn(() => ({
      findHotelAll: mocks.mockFindHotelAll,
      saveHotel: mocks.mockSaveHotel,
    })),
  };
});

const mockHotel:Hotel = {
  id: "H1",
  name: "New Hotel",
  address: "New Street",
  description: "New Description",
  rooms: [],
};

describe("API /api/hotels (Next.js Route Handler)", () => {
  beforeEach(() => {
    mocks.mockFindHotelAll.mockClear();
    mocks.mockSaveHotel.mockClear();
    vi.clearAllMocks(); 
  });

  test("GET must return all hotels with status 200", async () => {
    const mockHotels: Hotel[] = [mockHotel];

    mocks.mockFindHotelAll.mockResolvedValue(mockHotels);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockHotels);
    expect(mocks.mockFindHotelAll).toHaveBeenCalledOnce();
  });


  test("POST must create a new hotel and return status 201", async () => {
    const request = new Request("http://localhost/api/hotels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockHotel),
    });

    mocks.mockSaveHotel.mockResolvedValue(undefined);

    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(201);
    expect(data.message).toBe("Created hotel successfully");
    expect(data.hotel.name).toBe(mockHotel.name); 
  });
  
  
  test("GET should return status 500 in case of service error", async () => {
    const error = new Error("Database connection failed");
    
    mocks.mockFindHotelAll.mockRejectedValue(error);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain("Database connection failed"); 
  });
});
