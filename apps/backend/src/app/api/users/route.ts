import { NextResponse } from "next/server";
import { 
  User, 
  UserService, 
  CreateUserData, 
  findUserAll, 
  createUser, 
  PasswordHasher 
} from "@hotel-project/domain";

import { userService, passwordService } from "../../../service/index";

interface UserDependencies {
  userService: UserService;
  hasher: PasswordHasher;
}

function createGetUsersHandler(dependencies: UserDependencies) {
  return async function GET(request: Request) {
    try {
      const users: User[] = await findUserAll(dependencies.userService);

      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 500 }
      );
    }
  };
}

function createPostUserHandler(dependencies: UserDependencies) {
  return async function POST(request: Request) {
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

      const newUser = await createUser(
        createUserData,
        dependencies.userService,
        dependencies.hasher
      );

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
  };
}

const dependencies: UserDependencies = {
  userService,
  hasher: passwordService,
};

export const GET = createGetUsersHandler(dependencies);
export const POST = createPostUserHandler(dependencies);
