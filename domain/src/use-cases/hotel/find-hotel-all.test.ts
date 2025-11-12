import { describe, test, expect, beforeEach } from "vitest";
import { 
  FindHotelAllDependencies, 
  findHotelAll 
} from "./find-hotel-all";
import { MockedHotelService, createMockHotelService, MockHotel } from "./mocks/hotel-service-mock";
import { Hotel } from "@hotel-project/domain";

let mockedService: MockedHotelService;
let dependencies: FindHotelAllDependencies;

describe("Use Case: findHotelAll", () => {
  beforeEach(() => {
    mockedService = createMockHotelService();
    dependencies = {
      hotelService: mockedService,
    };
  });

  test("should return an array of all hotels", async () => {
    const mockHotels: Hotel[] = [MockHotel, { 
      ...MockHotel, id: 'MOCK-H2', name: 'Hotel 2'
    }];
    mockedService.findHotelAll.mockResolvedValue(mockHotels);

    const hotels = await findHotelAll(dependencies);

    expect(hotels).toEqual(mockHotels);
    expect(mockedService.findHotelAll).toHaveBeenCalledOnce();
  });
  
  test("should return an empty array if no hotels are found", async () => {
    mockedService.findHotelAll.mockResolvedValue([]);

    const hotels = await findHotelAll(dependencies);

    expect(hotels).toEqual([]);
    expect(mockedService.findHotelAll).toHaveBeenCalledOnce();
  });

  test("should throw an error if the service call fails", async () => {
    const error = new Error("Database error");
    mockedService.findHotelAll.mockRejectedValue(error);

    await expect(findHotelAll(dependencies)).rejects.toThrow("Database error");
    expect(mockedService.findHotelAll).toHaveBeenCalledOnce();
  });
});
