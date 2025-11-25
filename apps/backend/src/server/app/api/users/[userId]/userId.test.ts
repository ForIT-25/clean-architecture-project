import { describe, test, expect, vi, beforeEach } from "vitest";
import { GET, PUT, DELETE } from "./route"; 
import { User, UpdateUserData, ROLES } from "@hotel-project/domain";
import { 
  MOCK_USER_DATA, 
  createMockUserServiceAPI, 
  MockedUserServiceAPI 
} from "../../../../mocks/user-service-api-mock"; 

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn(() => ({
    })),
  };
});

let mockedService: MockedUserServiceAPI;
const mockUser: User = MOCK_USER_DATA;
const mockUserId = mockUser.id;

const mockParams = { params: { userId: mockUserId } };

describe("API /api/users/[userId] (Next.js Route Handler)", () => {
  beforeEach(() => {
    mockedService = createMockUserServiceAPI();
    vi.clearAllMocks(); 
  });
  
  test("GET debe retornar un usuario específico con status 200", async () => {
    mockedService.findUserById.mockResolvedValue(mockUser);

    const response = await GET(new Request('http://localhost'), mockParams, mockedService);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.id).toBe(mockUserId);
    expect(data.email).toBe(mockUser.email);
    expect(mockedService.findUserById).toHaveBeenCalledWith(mockUserId);
  });
  
  test("GET debe retornar status 404 si el usuario no existe", async () => {
    mockedService.findUserById.mockResolvedValue(undefined);

    const response = await GET(new Request('http://localhost'), mockParams, mockedService);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toContain(`${mockUserId} not found`); 
    expect(mockedService.findUserById).toHaveBeenCalledWith(mockUserId);
  });
  
  test("GET debe retornar status 500 en caso de error del servicio", async () => {
    const error = new Error("Connection Timeout");
    mockedService.findUserById.mockRejectedValue(error);

    const response = await GET(new Request('http://localhost'), mockParams, mockedService);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain("Connection Timeout"); 
  });

  test("PUT debe actualizar un usuario y retornar status 200", async () => {
    const updates: UpdateUserData = {
      name: "Updated Name",
      role: ROLES.MANAGER 
    };
    
    const updatedUser: User = { 
      ...mockUser, 
      ...updates 
    };

    const request = new Request(`http://localhost/api/users/${mockUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    mockedService.updateUser.mockResolvedValue(updatedUser);

    const response = await PUT(request, mockParams, mockedService);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.message).toBe("User updated successfully");
    expect(data.user.name).toBe(updates.name);
    expect(data.user.role).toBe(updates.role);
    
    expect(mockedService.updateUser).toHaveBeenCalledWith(mockUserId, updates);
  });

  test("PUT debe retornar status 404 si el usuario a actualizar no existe", async () => {
    const updates: UpdateUserData = { name: "Test" };
    
    const request = new Request(`http://localhost/api/users/${mockUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    mockedService.updateUser.mockRejectedValue(new Error("User not found or failed service"));

    const response = await PUT(request, mockParams, mockedService);
    const data = await response.json();
    
    expect(response.status).toBe(404);
    expect(data.error).toContain("User not found");
  });
  
  test("PUT debe retornar status 400 si no se envían datos para actualizar", async () => {
    const updates: UpdateUserData = {};

    const request = new Request(`http://localhost/api/users/${mockUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    const response = await PUT(request, mockParams, mockedService);
    const data = await response.json();
    
    expect(response.status).toBe(400);
    expect(data.error).toBe("No data provided for update.");
    expect(mockedService.updateUser).not.toHaveBeenCalled();
  });

  test("DELETE debe eliminar un usuario y retornar status 204 (No Content)", async () => {
    mockedService.deleteUser.mockResolvedValue(undefined);

    const response = await DELETE(new Request(`http://localhost/api/users/${mockUserId}`), mockParams, mockedService);
    
    expect(response.status).toBe(204);
    expect(response.text()).resolves.toBe("");
    expect(mockedService.deleteUser).toHaveBeenCalledWith(mockUserId);
  });

  test("DELETE debe retornar status 500 en caso de error del servicio", async () => {
    const error = new Error("Failed to delete user due to database lock");
    mockedService.deleteUser.mockRejectedValue(error);

    const response = await DELETE(new Request('http://localhost'), mockParams, mockedService);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain("database lock"); 
    expect(mockedService.deleteUser).toHaveBeenCalledWith(mockUserId);
  });
});
