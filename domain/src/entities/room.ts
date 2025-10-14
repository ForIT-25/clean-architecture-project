export const ROOMTYPES = {
  SINGLE: 'single',
  DOUBLE: 'double',
  SUITE: 'suite',
  DELUXE: 'deluxe',
} as const;

export type RoomType = (typeof ROOMTYPES)[keyof typeof ROOMTYPES];

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  description: string;
  price: number;
  isAvailable: boolean;
}
