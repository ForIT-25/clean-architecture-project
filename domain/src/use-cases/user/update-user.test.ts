import { describe, test, expect, vi, beforeEach } from "vitest";
import { User, ROLES, updateUser, UpdateUserData } from "@hotel-project/domain";
import { MockedUserService, createMockUserService, MockUser } from "./mocks/user-service-mock"; 

let mockService: MockedUserService;
let userId: string;

describe("Update User Use Case", () => {
  beforeEach(() => {
    mockService = createMockUserService();
    vi.clearAllMocks();
    userId = "1";
  });

  test("Should return the updated user", async () => {
    const updates: UpdateUserData = { name: "Ivan Refactor", role: ROLES.MANAGER };
    
    const mockUpdatedUser: User = { 
        ...MockUser, 
        id: userId, 
        name: updates.name!, 
        role: updates.role!,
        updatedAt: new Date()
    };
    
    mockService.updateUser.mockResolvedValue(mockUpdatedUser); 
    
    const result = await updateUser(mockService, userId, updates);

    expect(result.id).toBe(userId);
    expect(result.name).toBe("Ivan Refactor");
    expect(result.role).toBe(ROLES.MANAGER);
    expect(mockService.updateUser).toHaveBeenCalledWith(userId, updates);
  });

  test("Throw error if service returns undefined", async () => {
    const updates: UpdateUserData = { name: "Test" };
    const fakeId = "id-falso";
    
    mockService.updateUser.mockResolvedValue(undefined); 

    await expect(updateUser(mockService, fakeId, updates)).rejects.toThrow(
      "User not found or failed service"
    );

    expect(mockService.updateUser).toHaveBeenCalledWith(fakeId, updates);
  }); 
});
