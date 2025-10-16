import { describe, test, expect } from "vitest";
import { createBooking } from "./create-booking";
import { Booking } from "../../entities/booking";
import { updateBooking } from "./update-booking";

describe("Update Bokkings", () => {
  test("Modify a booking whit it propierties", () => {
    const booking: Booking = createBooking({
      id: "1",
      buyDate: new Date("2025-10-15"),
      reserveDate: new Date("2025-10-20"),
      days: 3,
      idUser: "Andres",
      idRoom: "12345678",
      price: 250,
    });

    const updatedBooking: Booking = updateBooking(booking, {
      days: 5,
      reserveDate: new Date("2025-10-22"),
      price: 380,
    });

    expect(updatedBooking.days).toBe(5);
    expect(updatedBooking.reserveDate.toISOString()).toBe(
      new Date("2025-10-22").toISOString(),
    );
    expect(updatedBooking.price).toBe(380);
  });
});
