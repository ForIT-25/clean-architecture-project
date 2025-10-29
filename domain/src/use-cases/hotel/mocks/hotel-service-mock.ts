import { CreateHotelData, Hotel } from "@hotel-project/domain";
import { vi, Mock } from "vitest";

export const MockHotel:Hotel = {
  id: 'MOCK-H1',
  name: 'Mock name',
  address: 'Mock address 123',
  description: 'Mock description',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export type MockedHotelService = {
  registerHotel: Mock<(params: CreateHotelData) => Promise<Hotel>>;
  findHotelAll: Mock<() => Promise<Hotel[]>>;
  findHotelById: Mock<(id: string) => Promise<Hotel | undefined>>;
  updateHotel: Mock<(id: string, updates: any) => Promise<Hotel | undefined>>;
  deleteHotel: Mock<(id: string) => Promise<void>>;
};

export const createMockHotelService = () => {
  const registerHotelMock = vi.fn(async (params: CreateHotelData) => ({
    ...MockHotel,
    ...params,
  }));
  
  const deleteHotelMock = vi.fn(async (id: string) => {
    return Promise.resolve(); 
  });

  return {
    registerHotel: registerHotelMock,
    findHotelAll: vi.fn(),
    findHotelById: vi.fn(),
    updateHotel: vi.fn(),
    deleteHotel: deleteHotelMock,
  };
};
