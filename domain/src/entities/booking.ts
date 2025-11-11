import { Entity } from "./entity";

export interface Booking extends Entity {
  startDate: Date;
  endDate: Date;
  userId: string;
  roomId: string;
  totalPrice: number;
}

export type BookingCreateData = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;

export type BookingUpdateData = Partial<
  Omit<Booking, 'id' | 'userId' | 'roomId' | 'createdAt' | 'updatedAt'>
>;
