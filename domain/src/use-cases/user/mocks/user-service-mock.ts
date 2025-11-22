import { CreateUserData, User, UpdateUserData, TokenPayload } from "@hotel-project/domain";
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
  createUser: Mock<(data: CreateUserData) => Promise<User>>;
  updateUser: Mock<(userId: string, updates: UpdateUserData) => Promise<User | undefined>>;
  deleteUser: Mock<(userId: string) => Promise<void>>;
};

export type MockedPasswordHasher = {
    hashPassword: Mock<(password: string) => Promise<string>>;
    comparePassword: Mock<(password: string, hash: string) => Promise<boolean>>;
};

export type MockedTokenGenerator = {
    generate: Mock<(payload: TokenPayload) => Promise<string>>;
    verify: Mock<(token: string) => Promise<TokenPayload | undefined>>;
};

export const createMockPasswordHasher = (): MockedPasswordHasher => {
    return {
        hashPassword: vi.fn(),
        comparePassword: vi.fn(),
    };
};

export const createMockTokenGenerator = (): MockedTokenGenerator => {
    return {
        generate: vi.fn(),
        verify: vi.fn(),
    };
};

export const createMockUserService = (): MockedUserService => {
  
  const findUserByIdMock = vi.fn(async (id: string) => {
    return id === MockUser.id ? MockUser : undefined;
  });

  const findUserByEmailMock = vi.fn(async (email: string) => {
    return email === MockUser.email ? MockUser : undefined;
  });

  const createUserMock = vi.fn(async (data: CreateUserData) => {
     return {
      ...MockUser,
      ...data,
      role: 'GUEST', 
      id: `MOCK-U-${Math.random().toString(36).substring(2, 9)}`,
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
    findUserByEmail: findUserByEmailMock,
    createUser: createUserMock,
    updateUser: updateUserMock,
    deleteUser: deleteUserMock,
  };
};
