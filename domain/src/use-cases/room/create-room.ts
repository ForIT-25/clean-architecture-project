import type { RoomType, Room } from '../../entities/room';

interface CreateRoomInput {
  id: string;
  name: string;
  type: RoomType;
  description: string;
  price: number;
}

export function createRoom(input: CreateRoomInput): Room {
  if (input.price <= 0) {
    throw new Error('Price must be positive');
  }

  return {
    id: input.id,
    name: input.name,
    type: input.type,
    description: input.description,
    price: input.price,
    isAvailable: true,
  };
};
