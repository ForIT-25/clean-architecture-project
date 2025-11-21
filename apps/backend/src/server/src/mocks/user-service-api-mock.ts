import { vi, Mock } from "vitest";
import { Entity, CreateUserData, User, UpdateUserData, ROLES } from "@hotel-project/domain";

export type MockedUserServiceAPI = {
  findUserAll: Mock<() => Promise<User[]>>; 
  findUserById: Mock<(userId: string) => Promise<User | undefined>>;
  findUserByEmail: Mock<(email: string) => Promise<User | undefined>>;
  createUser: Mock<(data: CreateUserData) => Promise<User>>;
  updateUser: Mock<(userId: string, updates: UpdateUserData) => Promise<User | undefined>>;
  deleteUser: Mock<(userId: string) => Promise<void>>;
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

export const mockedUserServiceImplementations: MockedUserServiceAPI = createMockUserServiceAPI();
