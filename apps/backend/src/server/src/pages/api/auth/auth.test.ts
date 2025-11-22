import { describe, test, expect, vi, beforeEach, Mock } from "vitest";
import { POST, AuthDependencies } from "./route";
import { UserService, PasswordHasher, TokenGenerator } from "@hotel-project/domain";
import { 
    MOCK_USER_DATA,
    createMockUserServiceAPI,
    createMockPasswordHasher,
    createMockTokenGenerator,
    MockedUserServiceAPI,
    MockedPasswordHasher,
    MockedTokenGenerator,
} from "../../../mocks/user-service-api-mock";

vi.mock('@prisma/client', () => ({ PrismaClient: vi.fn(() => ({})) }));

vi.mock("../../../domain/use-cases/authenticate-user", () => ({
  authenticateUser: vi.fn(),
}));
import { authenticateUser } from "@hotel-project/domain"; 
const mockAuthenticateUser = authenticateUser as Mock;


let mockDependencies: AuthDependencies;
let mockUserService: MockedUserServiceAPI;
let mockHasher: MockedPasswordHasher;
let mockTokenGenerator: MockedTokenGenerator;

const requestBody = {
  email: MOCK_USER_DATA.email,
  password: "plain_text_password",
};

const MOCK_TOKEN = "MOCK_JWT_TOKEN_FOR_API_TEST";
const userWithoutPassword = (({ password, ...rest }) => rest)(MOCK_USER_DATA);


describe("API /api/auth (Next.js Route Handler)", () => {
  beforeEach(() => {
    mockUserService = createMockUserServiceAPI();
    mockHasher = createMockPasswordHasher();
    mockTokenGenerator = createMockTokenGenerator();

    mockDependencies = {
      userService: mockUserService as unknown as UserService,
      hasher: mockHasher as unknown as PasswordHasher,
      tokenGenerator: mockTokenGenerator as unknown as TokenGenerator,
    };
    
    vi.clearAllMocks();
    mockAuthenticateUser.mockClear(); 
  });

  test("authenticates and returns status 200 with token and user", async () => {
    mockAuthenticateUser.mockResolvedValue({
      user: MOCK_USER_DATA,
      token: MOCK_TOKEN,
    });
    
    const request = new Request("http://localhost/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const response = await POST(request, mockDependencies);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.token).toBe(MOCK_TOKEN);
    expect(data.user).toEqual(userWithoutPassword);
    
    expect(mockAuthenticateUser).toHaveBeenCalledWith(
      expect.objectContaining(requestBody),
      mockUserService,
      mockHasher,
      mockTokenGenerator
    );
  });

  test("Return status 400 if a required field is missing", async () => {
    const incompleteBody = { email: MOCK_USER_DATA.email };
    
    const request = new Request("http://localhost/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(incompleteBody),
    });
    
    const response = await POST(request, mockDependencies);
    const data = await response.json();
    
    expect(response.status).toBe(400);
    expect(data.error).toBe("Missing required field: password"); 
    expect(mockAuthenticateUser).not.toHaveBeenCalled(); 
  });
  
  test("Return status 401 if the Use Case throws 'Invalid email or password'", async () => {
    mockAuthenticateUser.mockRejectedValue(new Error("Invalid email or password"));

    const request = new Request("http://localhost/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request, mockDependencies);
    const data = await response.json();

    expect(response.status).toBe(401); 
    expect(data.error).toBe("Invalid credentials"); 
    expect(mockAuthenticateUser).toHaveBeenCalledOnce();
  });
  
  test("Return status 500 in case of an internal error", async () => {
    mockAuthenticateUser.mockRejectedValue(new Error("Database connection error"));

    const request = new Request("http://localhost/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request, mockDependencies);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Database connection error"); 
    expect(mockAuthenticateUser).toHaveBeenCalledOnce();
  });
});
