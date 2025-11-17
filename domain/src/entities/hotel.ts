import { Entity } from "./entity";

export interface Hotel extends Entity{
  name: string;
  address: string;
  description: string;
}

export type CreateHotelData = Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateHotelParams = Partial<Hotel>;
