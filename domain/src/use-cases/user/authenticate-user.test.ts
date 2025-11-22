import { describe, test, expect, vi, beforeEach } from "vitest";
import { 
  authenticateUser, 
  AuthenticateUserData, 
  AuthenticationResult 
} from "./authenticate-user";
import { 
  UserService,
  PasswordHasher,
  TokenGenerator,
} from "@hotel-project/domain";
import { 
  createMockUserService,        
  MockedUserService,
  MockUser,
  createMockPasswordHasher,
  createMockTokenGenerator,
  MockedPasswordHasher,
  MockedTokenGenerator,
} from "./mocks/user-service-mock";

interface AuthenticateUserDependencies {
  service: MockedUserService;
  hasher: MockedPasswordHasher;
  tokenGenerator: MockedTokenGenerator;
}

const userCredentials: AuthenticateUserData = {
  email: MockUser.email, 
  password: "plain_text_password", 
};

const MOCK_JWT_TOKEN = "MOCK_JWT_TOKEN_GENERATED";

let mockDependencies: AuthenticateUserDependencies;

describe("Use case: authenticateUser", () => {
  beforeEach(() => {
    const mockService = createMockUserService();
    const mockHasher = createMockPasswordHasher();
    const mockTokenGenerator = createMockTokenGenerator();

    mockDependencies = {
      service: mockService,
      hasher: mockHasher,
      tokenGenerator: mockTokenGenerator,
    };
    
    vi.clearAllMocks();
  });

  test("Authenticate successfully and return the user and a JWT token", async () => {
    mockDependencies.hasher.comparePassword.mockResolvedValue(true);
    mockDependencies.tokenGenerator.generate.mockResolvedValue(MOCK_JWT_TOKEN); 

    const result: AuthenticationResult = await authenticateUser(
      userCredentials,
      mockDependencies.service as unknown as UserService,
      mockDependencies.hasher as unknown as PasswordHasher,
      mockDependencies.tokenGenerator as unknown as TokenGenerator
    );

    expect(result.token).toBe(MOCK_JWT_TOKEN);
    expect(result.user.email).toBe(MockUser.email);
    
    expect(mockDependencies.hasher.comparePassword).toHaveBeenCalledWith(
      userCredentials.password, 
      MockUser.password 
    );
    expect(mockDependencies.tokenGenerator.generate).toHaveBeenCalledOnce();
  });

  test("It throws an 'Invalid email or password' error if the user does not exist.", async () => {
    const nonExistentCredentials = { ...userCredentials, email: "nonexistent@test.com" };

    await expect(
      authenticateUser(
        nonExistentCredentials,
        mockDependencies.service as unknown as UserService,
        mockDependencies.hasher as unknown as PasswordHasher,
        mockDependencies.tokenGenerator as unknown as TokenGenerator
      )
    ).rejects.toThrow("Invalid email or password");

    expect(mockDependencies.service.findUserByEmail).toHaveBeenCalledOnce();
    expect(mockDependencies.hasher.comparePassword).not.toHaveBeenCalled();
  });

  test("It throws an 'Invalid email or password' error if the password is incorrect.", async () => {
    mockDependencies.hasher.comparePassword.mockResolvedValue(false); 

    await expect(
      authenticateUser(
        userCredentials,
        mockDependencies.service as unknown as UserService,
        mockDependencies.hasher as unknown as PasswordHasher,
        mockDependencies.tokenGenerator as unknown as TokenGenerator
      )
    ).rejects.toThrow("Invalid email or password");

    expect(mockDependencies.hasher.comparePassword).toHaveBeenCalledOnce();
    expect(mockDependencies.tokenGenerator.generate).not.toHaveBeenCalled();
  });
});
