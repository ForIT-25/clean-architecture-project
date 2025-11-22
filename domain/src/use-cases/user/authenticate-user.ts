import { 
  User, 
  UserService, 
  PasswordHasher, 
  TokenGenerator, 
  TokenPayload, 
  ROLES
} from "@hotel-project/domain";

export interface AuthenticateUserData {
  email: string;
  password: string;
}

export interface AuthenticationResult {
  user: User;
  token: string;
}

export async function authenticateUser(
  data: AuthenticateUserData,
  service: UserService,
  hasher: PasswordHasher,
  tokenGenerator: TokenGenerator
): Promise<AuthenticationResult> {
  const { email, password } = data;
  const user = await service.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await hasher.comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const payload: TokenPayload = { 
    userId: user.id,
    email: email,
    role: user.role
  };
  const token = await tokenGenerator.generate(payload);

  return { user, token };
}
