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

    const user = await createUser(userData, mockService); 

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

    await expect(createUser(userData, mockService)).rejects.toThrow(
      "Email already in use"
    );

    expect(mockService.createUser).not.toHaveBeenCalled();
  });
});
