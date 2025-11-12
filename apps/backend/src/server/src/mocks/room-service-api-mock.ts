import { vi, Mock } from "vitest";
import { Room, RoomType } from "@hotel-project/domain";

export type CreateRoomData = {
    name: string;
    type: RoomType;
    description: string;
    price: number;
    isAvailable: boolean;
};

export type MockedRoomServiceAPI = {
  findRoomAll: Mock<() => Promise<Room[]>>; 
  findRoomById: Mock<(roomId: string) => Promise<Room | undefined>>;
  findRoomByHotelId: Mock<(hotelId: string) => Promise<Room[]>>;
  createRoom: Mock<(hotelId: string, data: CreateRoomData) => Promise<Room>>;
  updateRoom: Mock<(roomId: string, updates: Partial<Room>) => Promise<Room | undefined>>; 
  deleteRoom: Mock<(roomId: string) => Promise<void>>;
};

export const MOCK_ROOM_DATA: Room = {
  id: "R1-MOCK",
  hotelId: "H1-MOCK",
  name: "Habitación Individual Ejecutiva",
  type: "single",
  description: "Habitación ideal para viajes de negocios.",
  price: 150.00,
  isAvailable: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createMockRoomServiceAPI = (): MockedRoomServiceAPI => {
    return {
        findRoomAll: vi.fn(),
        findRoomById: vi.fn(),
        findRoomByHotelId: vi.fn(),
        createRoom: vi.fn(),
        updateRoom: vi.fn(),
        deleteRoom: vi.fn(),
    } as MockedRoomServiceAPI;
};

export const mockedRoomServiceImplementations = createMockRoomServiceAPI();
