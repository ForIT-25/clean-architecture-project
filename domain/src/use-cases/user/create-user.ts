import { CreateUserData, User, UserRole, UserService } from "@hotel-project/domain";

export async function createUser(
  data: CreateUserData,
  service: UserService): Promise<User> {

  const existingUser = await service.findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const user = await service.createUser(data);

  return user;
}
