import { Entity } from "./entity";

export interface Booking extends Entity {
  startDate: Date;
  endDate: Date;
  userId: string;
  roomId: string;
  totalPrice: number;
}
