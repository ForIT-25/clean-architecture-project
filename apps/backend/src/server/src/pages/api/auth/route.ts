import { NextResponse } from "next/server";
import { UserServiceImplementation, JWTGenerator, BcryptHasher } from "@hotel-project/backend";
import { 
  UserService, 
  PasswordHasher, 
  TokenGenerator, 
  authenticateUser, 
  AuthenticateUserData 
} from "@hotel-project/domain";

export interface AuthDependencies {
  userService: UserService;
  hasher: PasswordHasher;
  tokenGenerator: TokenGenerator;
}

const getAuthDependencies = (): AuthDependencies => ({
  userService: new UserServiceImplementation(),
  hasher: new BcryptHasher(),
  tokenGenerator: new JWTGenerator(),
});

export async function POST(
  request: Request,
  dependencies: AuthDependencies = getAuthDependencies()
) {
  try {
    const data: AuthenticateUserData = await request.json();
    const requiredFields = ["email", "password"] as (keyof AuthenticateUserData)[];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` }, 
          { status: 400 } 
        );
      }
    }
    
    const result = await authenticateUser(
      data,
      dependencies.userService,
      dependencies.hasher,
      dependencies.tokenGenerator
    );
    const { password, ...userWithoutPassword } = result.user;

    return NextResponse.json(
      { 
        message: "Authentication successful", 
        token: result.token,
        user: userWithoutPassword
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = (error as Error).message;
    
    if (errorMessage.includes("Invalid email or password")) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
