import { CreateUserData, User, UserService, PasswordHasher } from "@hotel-project/domain";

export async function createUser(
  data: CreateUserData,
  service: UserService,
  hasher: PasswordHasher
): Promise<User> {

  const existingUser = await service.findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await hasher.hashPassword(data.password);
  const dataWithHashedPassword: CreateUserData = { 
    ...data, 
    password: hashedPassword,
  };
  const user = await service.createUser(data);

  return user;
}
