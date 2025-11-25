import { vi, Mock } from "vitest";
import { CreateHotelData, Hotel } from "@hotel-project/domain";

export type MockedHotelServiceAPI = {
  findHotelAll: Mock<() => Promise<Hotel[]>>; 
  registerHotel: Mock<(data: CreateHotelData) => Promise<Hotel>>;
  findHotelById: Mock<(id: string) => Promise<Hotel | undefined>>; 
  updateHotel: Mock<(id: string, updates: Partial<Hotel>) => Promise<Hotel | undefined>>; 
  deleteHotel: Mock<(id: string) => Promise<void>>;
};

export const MOCK_HOTEL_DATA: Hotel = {
  id: "H1-MOCK",
  name: "Mocked Hotel Name",
  address: "123 Mock Street",
  description: "A description from the mock",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createMockHotelServiceAPI = (): MockedHotelServiceAPI => {
    return {
        findHotelAll: vi.fn(),
        registerHotel: vi.fn(),
        findHotelById: vi.fn(),
        updateHotel: vi.fn(),
        deleteHotel: vi.fn(),
    } as MockedHotelServiceAPI;
};

export const mockedHotelServiceImplementations = createMockHotelServiceAPI();
