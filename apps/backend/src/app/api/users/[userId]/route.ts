import { NextResponse } from "next/server";
import { userService } from "../../../../service/index";
import {
  User,
  UserService,
  UpdateUserData,
  findUserById,
  updateUser,
  deleteUser
} from "@hotel-project/domain";

const getUserService = (): UserService => {
  return userService;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> },
  service: UserService = getUserService()
) {
  const { userId } = await params;

  try {
    const user: User | undefined = await findUserById(service, userId);

    if (!user) {
      return NextResponse.json(
        { error: `User with ID ${userId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> },
  service: UserService = getUserService()
) {
  const { userId } = await params;

  try {
    const updates: UpdateUserData = await request.json();

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No data provided for update." },
        { status: 400 }
      );
    }

    const updatedUser = await updateUser(service, userId, updates);

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = (error as Error).message;

    if (errorMessage.includes("User not found")) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string }> },
  service: UserService = getUserService()
) {
  const { userId } = await params;

  try {
    await deleteUser(service, userId);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const errorMessage = (error as Error).message;

    if (errorMessage.includes("not found")) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
