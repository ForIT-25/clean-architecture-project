import { Entity } from "./entity";

export interface Booking extends Entity {
  buyDate: Date;
  reserveDate: Date;
  days: number;
  idUser: string;
  idRoom: string;
  price: number;
}
