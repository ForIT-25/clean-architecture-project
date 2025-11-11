import { BookingService } from "@hotel-project/domain";

export const deleteBooking = async (
  service: BookingService,
  bookingId: string
): Promise<void> => {

  // Lógica de negocio (verificar permisos o estado)

  await service.deleteBooking(bookingId);
};
