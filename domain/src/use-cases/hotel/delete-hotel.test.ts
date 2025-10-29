import { describe, test, expect, vi, beforeAll, beforeEach } from "vitest";
import { deleteHotel, DeleteHotelDependencies } from "./delete-hotel"; 
import { createMockHotelService, MockedHotelService } from "./mocks/hotel-service-mock";

const HOTEL_ID_TO_DELETE = "H99";

let mockHotelService: MockedHotelService; 

describe("Delete Hotel Use Case", () => {
  
  beforeAll(() => {
    mockHotelService = createMockHotelService();
  });

  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  test("Delete the hotel and return void", async () => {
    
    mockHotelService.deleteHotel.mockResolvedValue(undefined); 
    
    const dependencies: DeleteHotelDependencies = { hotelService: mockHotelService};
    
    const result = await deleteHotel(HOTEL_ID_TO_DELETE, dependencies);

    expect(mockHotelService.deleteHotel).toHaveBeenCalledTimes(1);
    expect(mockHotelService.deleteHotel).toHaveBeenCalledWith(HOTEL_ID_TO_DELETE);
    expect(result).toBeUndefined();
  });
  
  test("Throw an error if the hotel ID is missing or empty", async () => {
    const dependencies: DeleteHotelDependencies = { hotelService: mockHotelService };
    
    await expect(
      deleteHotel("", dependencies)
    ).rejects.toThrow("Hotel ID is required for deletion");
    expect(mockHotelService.deleteHotel).not.toHaveBeenCalled();
  });
  
  test("Thrown error if the hotel is not found)", async () => {
    const REPO_ERROR = new Error("Database error: Hotel not found or deletion failed");
    
    mockHotelService.deleteHotel.mockRejectedValue(REPO_ERROR);
    
    const dependencies: DeleteHotelDependencies = { hotelService: mockHotelService };
    
    await expect(
      deleteHotel(HOTEL_ID_TO_DELETE, dependencies)
    ).rejects.toThrow(REPO_ERROR.message);
    expect(mockHotelService.deleteHotel).toHaveBeenCalledTimes(1);
  });
});
