import { describe, test, expect } from "vitest";
import { createHotel } from "./create-hotel";
import { Hotel } from "../../entities/hotel";
import { updateHotel } from "./update-hotel";

describe("Update Hotel", () => {
  test("Update name and description", () => {
    const hotel: Hotel = createHotel({
      id: "H1",
      name: "Gran Hotel",
      address: "calle falsa 123",
      description: "Hotel muy cómodo",
    });

    const updatedHotel: Hotel = updateHotel(hotel, {
      name: "Otro Nombre",
      description: "Hotel con pileta",
    });

    expect(updatedHotel.name).toBe("Otro Nombre");
    expect(updatedHotel.description).toBe("Hotel con pileta");
    expect(updatedHotel.address).toBe("calle falsa 123");
    expect(updatedHotel.id).toBe("H1");
  });
});
