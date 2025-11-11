import { Room, RoomService, CreateRoomData, UpdateRoomData, RoomType, ROOMTYPES } from "@hotel-project/domain";
import { vi, Mock } from "vitest";

export const MockRoom: Room = {
  id: 'MOCK-R1',
  name: 'Mock Room 101',
  type: ROOMTYPES.SINGLE as RoomType,
  description: 'A cozy single room.',
  price: 50,
  isAvailable: true,
  hotelId: 'MOCK-H1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export type MockedRoomService = {
  findRoomAll: Mock<() => Promise<Room[]>>;
  findRoomById: Mock<(roomId: string) => Promise<Room | undefined>>;
  findRoomByHotelId: Mock<(hotelId: string) => Promise<Room[]>>;
  createRoom: Mock<(data: CreateRoomData) => Promise<Room>>;
  updateRoom: Mock<(roomId: string, updates: UpdateRoomData) => Promise<Room | undefined>>;
  deleteRoom: Mock<(roomId: string) => Promise<void>>;
};

export const createMockRoomService = (): MockedRoomService => {
  const findRoomAllMock = vi.fn(async () => [MockRoom]);
  const findRoomByIdMock = vi.fn(async (roomId: string) => (
    roomId === MockRoom.id ? MockRoom : undefined
  ));
  const findRoomByHotelIdMock = vi.fn(async (hotelId: string) => (
    hotelId === MockRoom.hotelId ? [MockRoom] : []
  ));
  const createRoomMock = vi.fn(async (data: CreateRoomData) => ({
    ...MockRoom,
    ...data,
    id: `MOCK-R-${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  const updateRoomMock = vi.fn(async (roomId: string, updates: UpdateRoomData) => (
    roomId === MockRoom.id ? {
      ...MockRoom,
      ...updates, 
      updatedAt: new Date() 
    } : undefined
  ));
  const deleteRoomMock = vi.fn(async () => {
    return Promise.resolve();
  });

  return {
    findRoomAll: findRoomAllMock,
    findRoomById: findRoomByIdMock,
    findRoomByHotelId: findRoomByHotelIdMock,
    createRoom: createRoomMock,
    updateRoom: updateRoomMock,
    deleteRoom: deleteRoomMock,
  };
};
