import { Entity } from "./entity";

export const ROOMTYPES = {
  SINGLE: "single",
  DOUBLE: "double",
  SUITE: "suite",
  DELUXE: "deluxe",
} as const;

export type RoomType = (typeof ROOMTYPES)[keyof typeof ROOMTYPES];

export interface Room extends Entity {
  name: string;
  type: RoomType;
  description: string;
  price: number;
  isAvailable: boolean;
  hotelId: string;
}

export type CreateRoomData = Omit<Room, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateRoomData = Partial<
  Omit<Room, 'id' | 'hotelId' | 'createdAt' | 'updatedAt'>
>;
