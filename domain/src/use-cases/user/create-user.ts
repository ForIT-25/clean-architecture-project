import { User, UserRole, UserService } from "@hotel-project/domain";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export async function createUser(
  data: CreateUserData,
  service: UserService): Promise<User> {

  const existingUser = await service.findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const user = await service.saveUser(data);

  return user;
}
