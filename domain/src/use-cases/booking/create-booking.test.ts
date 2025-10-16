import { describe, test, expect } from "vitest";
import { createBooking } from "./create-booking";
import { Booking } from "../../entities/booking";

describe("Create Bokkings", () => {
  test("Create a booking whit it propierties", () => {
    const booking: Booking = createBooking({
      id: "1",
      buyDate: new Date("2025-10-15"),
      reserveDate: new Date("2025-10-20"),
      days: 3,
      idUser: "Andres",
      idRoom: "12345678",
      price: 250,
    });

    expect(booking).toEqual({
      id: "1",
      buyDate: new Date("2025-10-15"),
      reserveDate: new Date("2025-10-20"),
      days: 3,
      idUser: "Andres",
      idRoom: "12345678",
      price: 250,
    });
  });
});
