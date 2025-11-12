import { describe, test, expect, beforeEach } from "vitest";
import { 
  FindHotelByIdDependencies, 
  findHotelById 
} from "./find-hotel-by-id";
import { MockedHotelService, createMockHotelService, MockHotel } from "./mocks/hotel-service-mock";

let mockedService: MockedHotelService;
let dependencies: FindHotelByIdDependencies;

describe("findHotelById", () => {
  beforeEach(() => {
    mockedService = createMockHotelService();
    dependencies = {
      hotelService: mockedService,
    };
  });

  test("Returns the hotel if ID is valid", async () => {
    const hotelId = MockHotel.id;
    mockedService.findHotelById.mockResolvedValue(MockHotel);

    const hotel = await findHotelById(hotelId, dependencies);

    expect(hotel).toEqual(MockHotel);
    expect(mockedService.findHotelById).toHaveBeenCalledOnce();
    expect(mockedService.findHotelById).toHaveBeenCalledWith(hotelId);
  });
  
  test("Returns undefined if the hotel is not found", async () => {
    const hotelId = 'not-found-id';
    mockedService.findHotelById.mockResolvedValue(undefined);

    const hotel = await findHotelById(hotelId, dependencies);

    expect(hotel).toBeUndefined();
    expect(mockedService.findHotelById).toHaveBeenCalledOnce();
  });

  test("Throw an error if ID is empty or null", async () => {
    await expect(findHotelById("", dependencies)).rejects.toThrow(
      "Hotel ID is required for searching"
    );
    await expect(findHotelById(null as unknown as string, dependencies)).rejects.toThrow(
      "Hotel ID is required for searching"
    );
    expect(mockedService.findHotelById).not.toHaveBeenCalled();
  });
});
