import { NextResponse } from "next/server";
import { BcryptHasher, UserServiceImplementation } from "@hotel-project/backend";
import { 
  User, 
  UserService, 
  CreateUserData, 
  findUserAll, 
  createUser, 
  PasswordHasher
} from "@hotel-project/domain";

const getUserService = (): UserService => {
  return new UserServiceImplementation(); 
};

interface UserDependencies { 
  userService: UserService; 
  hasher: PasswordHasher;
}

const getDefaultUserDependencies = (): UserDependencies => {
  return {
    userService: new UserServiceImplementation(),
    hasher: new BcryptHasher(),
  };
};

export async function GET(
  request: Request,
  service: UserService = getUserService()
) {
  try {
    const users: User[] = await findUserAll(service);
    
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  dependencies: UserDependencies = getDefaultUserDependencies()
) {
  try {
    const data = await request.json();
    const requiredFields = ["name", "email", "password"];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` }, 
          { status: 400 }
        );
      }
    }
    
    const createUserData: CreateUserData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const { userService, hasher } = dependencies;
    const newUser = await createUser(createUserData, userService, hasher);

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

