import { describe, test, expect, vi, beforeEach } from "vitest";
import { GET, POST } from "./route";
import { 
  User,
  CreateUserData,
  UserService,
  PasswordHasher 
} from "@hotel-project/domain";
import { 
  MOCK_USER_DATA, 
  MOCK_USER_DATA_GUEST,
  createMockUserServiceAPI, 
  MockedUserServiceAPI, 
  MockedPasswordHasher,
  createMockPasswordHasher
} from "../../../mocks/user-service-api-mock";

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn(() => ({
    })),
  };
});

interface UserDependencies {
    userService: UserService;
    hasher: PasswordHasher;
}

let mockedService: MockedUserServiceAPI;
let mockedHasher: MockedPasswordHasher;
let mockDependencies: UserDependencies;

const mockAdminUser: User = MOCK_USER_DATA;
const mockGuestUser: User = MOCK_USER_DATA_GUEST;

describe("API /api/users (Next.js Route Handler)", () => {
  beforeEach(() => {
    mockedService = createMockUserServiceAPI();
    mockedHasher = createMockPasswordHasher();
    mockedHasher.hashPassword.mockResolvedValue('hashed_test_password_for_post'); 
    mockDependencies = {
      userService: mockedService,
      hasher: mockedHasher,
    };
    vi.clearAllMocks(); 
  });

  test("GET debe retornar todos los usuarios con status 200", async () => {
    const mockUsers: User[] = [mockAdminUser, mockGuestUser];

    mockedService.findUserAll.mockResolvedValue(mockUsers);

    const response = await GET(new Request('http://localhost/api/users'), mockedService);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(JSON.parse(JSON.stringify(mockUsers)));
    expect(mockedService.findUserAll).toHaveBeenCalledOnce();
  });
  
  test("GET debe retornar status 500 en caso de error del servicio (Database)", async () => {
    const error = new Error("Database connection failed");
    
    mockedService.findUserAll.mockRejectedValue(error);

    const response = await GET(new Request('http://localhost/api/users'), mockedService);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain("Database connection failed"); 
    expect(mockedService.findUserAll).toHaveBeenCalledOnce();
  });
  
  test("POST debe crear un nuevo usuario y retornar status 201", async () => {
    const requestBody: CreateUserData = {
      name: "New Test User",
      email: "test@newuser.com",
      password: "securepassword"
    };
    
    const createdUser: User = { 
      ...mockGuestUser,
      ...requestBody,
      id: "U-NEW-123", 
      role: 'GUEST'
    };
    
    const request = new Request("http://localhost/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    mockedService.findUserByEmail.mockResolvedValue(undefined);
    mockedService.createUser.mockResolvedValue(createdUser);

    const response = await POST(request, mockDependencies);
    const data = await response.json();
    
    expect(response.status).toBe(201);
    expect(data.message).toBe("User created successfully");
    expect(data.user.email).toBe(requestBody.email);
    
    expect(mockedService.createUser).toHaveBeenCalledWith(
      expect.objectContaining(requestBody)
    );
  });
  
  test("POST debe retornar status 400 si falta un campo requerido (ej. email)", async () => {
    const requestBody = { 
      name: "New Test User",
      password: "securepassword" 
    };
    const request = new Request("http://localhost/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    
    const response = await POST(request, mockDependencies);
    const data = await response.json();
    
    expect(response.status).toBe(400);
    expect(data.error).toBe("Missing required field: email");
    expect(mockedService.createUser).not.toHaveBeenCalled();
  });

  test("POST debe retornar status 400 si el email ya está en uso (Error de Negocio)", async () => {
    const requestBody: CreateUserData = {
      name: "Duplicate User",
      email: mockAdminUser.email,
      password: "password"
    };
    
    const request = new Request("http://localhost/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    
    mockedService.findUserByEmail.mockResolvedValue(mockAdminUser);

    const errorMessage = "Email already in use";
    mockedService.findUserByEmail.mockResolvedValue(mockAdminUser);
    mockedService.createUser.mockRejectedValue(new Error(errorMessage));

    const response = await POST(request, mockDependencies);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe(errorMessage); 
    expect(mockedService.createUser).not.toHaveBeenCalledOnce();
  });
});
