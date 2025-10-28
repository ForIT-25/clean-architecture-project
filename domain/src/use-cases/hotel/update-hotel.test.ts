import { describe, test, expect, beforeAll, beforeEach, vi } from "vitest";
import { Hotel, updateHotel, UpdateHotelDependencies } from "@hotel-project/domain";
import { createMockHotelService, MockedHotelService, MockHotel } from "./mocks/hotel-service-mock";

const EXISTING_HOTEL: Hotel = MockHotel;
let mockHotelService: MockedHotelService;

describe("Update Hotel", () => {
  beforeAll(() => {
    mockHotelService = createMockHotelService();
  });

  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  test("Update name and description", async () => {
    const updates = { name: "Otro Nombre", description: "Hotel con pileta" };
    const UPDATED_HOTEL: Hotel = {
      ...EXISTING_HOTEL,
      ...updates,
    };

    mockHotelService.updateHotel.mockResolvedValue(UPDATED_HOTEL);
    const dependencies: UpdateHotelDependencies = { hotelService: mockHotelService};
    const result = await updateHotel(EXISTING_HOTEL.id, updates, dependencies);
    
    expect(mockHotelService.updateHotel).toHaveBeenCalledWith(
      EXISTING_HOTEL.id,
      updates
    );
    if (result) {
      expect(result.name).toBe(UPDATED_HOTEL.name);
      expect(result.description).toBe(UPDATED_HOTEL.description);
      expect(result.id).toBe(EXISTING_HOTEL.id);
      expect(result.address).toBe(EXISTING_HOTEL.address);
    }
  });

  test("Throw an error if the hotel is not found", async () => {
    const updates = { name: "Otro Nombre" };
    
    mockHotelService.updateHotel.mockResolvedValue(undefined);
    
    const FALSE_ID = "False-id";
    const dependencies: UpdateHotelDependencies = { hotelService: mockHotelService };
    
    await expect(
      updateHotel(FALSE_ID, updates, dependencies)
    ).rejects.toThrow(`Hotel with ID ${FALSE_ID} not found`);
  });

  test("should throw an error if no updates are provided", async () => {
    const emptyUpdates = {};
    const dependencies: UpdateHotelDependencies = { hotelService: mockHotelService };
    
    await expect(
      updateHotel(EXISTING_HOTEL.id, emptyUpdates, dependencies)
    ).rejects.toThrow("Invalid update request: ID or data missing");
    expect(mockHotelService.updateHotel).not.toHaveBeenCalled();
  });
});
