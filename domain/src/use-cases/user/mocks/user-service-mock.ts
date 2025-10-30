import { CreateUserData, User, updateUserData } from "@hotel-project/domain";
import { vi, Mock } from "vitest";

export const MockUser: User = {
  id: 'MOCK-U1',
  name: 'Mock User',
  email: 'mock@hotel.com',
  password: 'hashed-mock-password',
  role: 'GUEST',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export type MockedUserService = {
  findUserAll: Mock<() => Promise<User[]>>;
  findUserById: Mock<(userId: string) => Promise<User | undefined>>;
  findUserByEmail: Mock<(email: string) => Promise<User | undefined>>;
  saveUser: Mock<(data: CreateUserData) => Promise<User>>;
  updateUser: Mock<(userId: string, updates: updateUserData) => Promise<User | undefined>>;
  deleteUser: Mock<(userId: string) => Promise<void>>;
};

export const createMockUserService = (): MockedUserService => {
  
  const findUserByIdMock = vi.fn(async (id: string) => {
    return id === MockUser.id ? MockUser : undefined;
  });

  const saveUserMock = vi.fn(async (data: CreateUserData) => {
     return {
      ...MockUser,
      ...data,
    };
  });

  const updateUserMock = vi.fn(async (userId: string, updates: Partial<User>) => {
    return {
      ...MockUser,
      ...updates,
    };
  });

  const deleteUserMock = vi.fn(async (userId: string) => {
    return Promise.resolve();
  });

  return {
    findUserAll: vi.fn(async () => [MockUser]),
    findUserById: findUserByIdMock,
    findUserByEmail: vi.fn(async () => undefined),
    saveUser: saveUserMock,
    updateUser: updateUserMock,
    deleteUser: deleteUserMock,
  };
};
