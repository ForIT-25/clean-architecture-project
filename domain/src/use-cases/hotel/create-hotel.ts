import { Hotel } from '../../entities/hotel';

export interface CreateHotelParams {
  id: string;
  name: string;
  address: string;
  description: string;
}

export function createHotel(params: CreateHotelParams): Hotel {
  if (!params.name || params.name.trim() === '') {
    throw new Error('Hotel name cannot be empty');
  }

  return {
    id: params.id,
    name: params.name,
    address: params.address,
    description: params.description,
    rooms: [],
  };
}
