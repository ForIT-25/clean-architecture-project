import { describe, test, expect, vi, beforeEach } from "vitest";
import { createUser, CreateUserData, ROLES } from "@hotel-project/domain";
import { MockedUserService, createMockUserService, MockUser } from "./mocks/user-service-mock";

let mockService: MockedUserService; 
let userData: CreateUserData;

describe("Create User Use Case", () => {
  beforeEach(() => {
    mockService = createMockUserService();
    vi.clearAllMocks();

    userData = {
      name: "Andres",
      email: "andy@gmail.com",
      password: "12345678",
      role: ROLES.GUEST,
    };
  });

  test("should return user with ID", async () => {
    mockService.findUserByEmail.mockResolvedValue(undefined); 
    const generatedId = 'ID-GENERATED';
    
    mockService.saveUser.mockResolvedValue({
        ...MockUser, 
        id: generatedId, 
        ...userData,
        role: userData.role! 
    });

    const user = await createUser(userData, mockService); 

    expect(user.id).toBe(generatedId);
    expect(user.email).toBe("andy@gmail.com");
    expect(mockService.saveUser).toHaveBeenCalledWith(
      expect.objectContaining({ 
        name: "Andres",
        email: "andy@gmail.com",
        password: "12345678",
      })
    );
  });

  test("Throw error if email exists", async () => {
    mockService.findUserByEmail.mockResolvedValue(MockUser); 

    await expect(createUser(userData, mockService)).rejects.toThrow(
      "Email already in use"
    );

    expect(mockService.saveUser).not.toHaveBeenCalled();
  });
});
