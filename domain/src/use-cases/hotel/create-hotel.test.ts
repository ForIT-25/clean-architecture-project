import { describe, test, expect, vi, beforeEach } from "vitest";
import { createHotel, CreateHotelDependencies } from "./create-hotel";
import { createMockHotelService, MockedHotelService, MockHotel } from "./mocks/hotel-service-mock";
import { Hotel } from "@hotel-project/domain";

let mockDependencies: CreateHotelDependencies;
let hotelServiceMock: MockedHotelService;

beforeEach(() => {
  hotelServiceMock = createMockHotelService();
  mockDependencies = {
    hotelService: hotelServiceMock,
  };
});

describe("Create Hotel", () => {
  test("Return a Hotel with the correct data", async() => {
    const hotelData ={
      name: "Gran Hotel",
      address: "calle falsa 123",
      description: "Hotel muy cómodo",
    };

    const expectedHotel: Hotel = {
      ...MockHotel,
      ...hotelData,
      id: "H1",
    };

    hotelServiceMock.registerHotel.mockResolvedValueOnce(expectedHotel);
    const hotel: Hotel = await createHotel(hotelData, mockDependencies);

    expect(hotel.name).toBe("Gran Hotel");
    expect(hotel).toEqual(expectedHotel);
    expect(hotelServiceMock.registerHotel).toHaveBeenCalledTimes(1);
    expect(hotelServiceMock.registerHotel).toHaveBeenCalledWith(hotelData);
  });

  test("If name is empty then throw Error", async () => {
    const hotelData = {
      name: "",
      address: "calle falsa 321",
      description: "No tiene nombre",
    };
    
    await expect(createHotel(hotelData, mockDependencies)
    ).rejects.toThrowError("Hotel name cannot be empty");
    expect(hotelServiceMock.registerHotel).not.toHaveBeenCalled();
  });
});
