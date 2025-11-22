import { describe, test, expect, vi, beforeEach } from "vitest";
import { createUser,
  CreateUserData,
  UserService,
  PasswordHasher
} from "@hotel-project/domain";
import {
  MockedUserService,
  createMockUserService,
  MockUser,
  MockedPasswordHasher,
  createMockPasswordHasher
} from "./mocks/user-service-mock";

interface CreateUserDependencies {
  userService: UserService;
  hasher: PasswordHasher;
}

let mockDependencies: CreateUserDependencies;
let hasherMock: MockedPasswordHasher;
let mockService: MockedUserService; 
let userData: CreateUserData;

describe("Create User Use Case", () => {
  beforeEach(() => {
    mockService = createMockUserService();
    hasherMock = createMockPasswordHasher();
    hasherMock.hashPassword.mockResolvedValue('hashed_test_password');
    mockDependencies = {
      userService: mockService,
      hasher: hasherMock,
    };
    vi.clearAllMocks();

    userData = {
      name: "Andres",
      email: "andy@gmail.com",
      password: "12345678",
    };
  });

  test("should return user with ID", async () => {
    mockService.findUserByEmail.mockResolvedValue(undefined); 
    const generatedId = 'ID-GENERATED';
    
    mockService.createUser.mockResolvedValue({
        ...MockUser, 
        id: generatedId, 
        ...userData,
    });

    const user = await createUser(userData, mockDependencies.userService, mockDependencies.hasher); 

    expect(user.id).toBe(generatedId);
    expect(user.email).toBe("andy@gmail.com");
    expect(mockService.createUser).toHaveBeenCalledWith(
      expect.objectContaining({ 
        name: "Andres",
        email: "andy@gmail.com",
        password: "12345678",
      })
    );
  });

  test("Throw error if email exists", async () => {
    mockService.findUserByEmail.mockResolvedValue(MockUser); 

    await expect(createUser(userData,
      mockDependencies.userService,
      mockDependencies.hasher
    )).rejects.toThrow(
      "Email already in use"
    );

    expect(mockService.createUser).not.toHaveBeenCalled();
  });
});
