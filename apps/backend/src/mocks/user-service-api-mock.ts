import { vi, Mock } from "vitest";
import { Entity,
  CreateUserData,
  User,
  UpdateUserData,
  ROLES,
  TokenPayload
 } from "@hotel-project/domain";

export type MockedUserServiceAPI = {
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

const baseEntityProps: Omit<Entity, 'id'> = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_USER_DATA: User = {
  id: "U1-MOCK",
  name: "Mock Admin User",
  email: "admin@mock.com",
  password: "hashedpassword",
  role: ROLES.ADMIN,
  ...baseEntityProps,
};

export const MOCK_USER_DATA_GUEST: User = {
  id: "U2-MOCK",
  name: "Mock Guest User",
  email: "guest@mock.com",
  password: "hashedpassword",
  role: ROLES.GUEST,
  ...baseEntityProps,
};

export const createMockUserServiceAPI = (): MockedUserServiceAPI => {
  return {
    findUserAll: vi.fn(),
    findUserById: vi.fn(),
    findUserByEmail: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
  } as MockedUserServiceAPI;
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

export const mockedUserServiceImplementations: MockedUserServiceAPI = createMockUserServiceAPI();
export const mockedPasswordHasher: MockedPasswordHasher = createMockPasswordHasher();
export const mockedTokenGenerator: MockedTokenGenerator = createMockTokenGenerator();
