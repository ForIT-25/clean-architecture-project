import { describe, test, expect } from "vitest";
import { createHotel } from "./create-hotel";

describe("Create Hotel", () => {
  test("Return a string", () => {
    const hotel = createHotel({
      id: "1",
      name: "Gran Hotel",
      address: "calle falsa 123",
      description: "Hotel muy cómodo",
    });

    expect(hotel.name).toBe("Gran Hotel");
    expect(hotel.rooms).toEqual([]);
  });

  test("If name is empty then throw Error", () => {
    expect(() =>
      createHotel({
        id: "2",
        name: "",
        address: "calle falsa 321",
        description: "No tiene nombre",
      }),
    ).toThrowError("Hotel name cannot be empty");
  });
});
