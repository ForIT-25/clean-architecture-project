import { describe, test, expect, vi, beforeEach } from "vitest";
import { GET, POST } from "./route";
import { Hotel } from "@hotel-project/domain";
import { MOCK_HOTEL_DATA, createMockHotelServiceAPI } from "../../../mocks/hotel-service-api-mock";

vi.mock("@prisma/client", () => {
  return {
    PrismaClient: vi.fn(() => ({})),
  };
});

let mockedService: ReturnType<typeof createMockHotelServiceAPI>;

vi.mock("../../../service/index", () => {
  return {
    HotelServiceImplementation: vi.fn(() => mockedService),
  };
});

const mockHotel: Hotel = MOCK_HOTEL_DATA;

describe("API /api/hotels (Next.js Route Handler)", () => {
  beforeEach(() => {
    mockedService = createMockHotelServiceAPI();
    vi.clearAllMocks();
  });

  test("GET must return all hotels with status 200", async () => {
    const mockHotels: Hotel[] = [mockHotel];
    mockedService.findHotelAll.mockResolvedValue(mockHotels);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(JSON.parse(JSON.stringify(mockHotels)));
    expect(mockedService.findHotelAll).toHaveBeenCalledOnce();
  });

  test("POST must create a new hotel and return status 201", async () => {
    const requestBody = {
      name: mockHotel.name,
      address: mockHotel.address,
      description: mockHotel.description,
    };

    const request = new Request("http://localhost/api/hotels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    mockedService.registerHotel.mockResolvedValue(mockHotel);

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe("Created hotel successfully");
    expect(data.hotel.name).toBe(mockHotel.name);

    expect(mockedService.registerHotel).toHaveBeenCalledWith(
      expect.objectContaining(requestBody)
    );
  });

  test("GET should return status 500 in case of service error", async () => {
    const error = new Error("Database connection failed");
    mockedService.findHotelAll.mockRejectedValue(error);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain("Database connection failed");
  });
});
