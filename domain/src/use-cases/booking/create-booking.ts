interface CreateBookingInput {
  id: string;
  buyDate: Date;
  reserveDate: Date;
  days: number;
  idUser: string;
  idRoom: string;
  price: number;
}

export function createBooking(input: CreateBookingInput) {
  return {
    id: input.id,
    buyDate: input.buyDate,
    reserveDate: input.reserveDate,
    days: input.days,
    idUser: input.idUser,
    idRoom: input.idRoom,
    price: input.price,
  };
}
