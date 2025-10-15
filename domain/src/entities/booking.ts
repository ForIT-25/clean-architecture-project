export interface Booking {
  id: string;
  buyDate: Date;
  reserveDate: Date;
  days: number;
  idUser: string;
  idRoom: string;
  price: number;
}
