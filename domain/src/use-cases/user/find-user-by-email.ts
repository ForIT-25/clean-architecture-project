import { User, UserService } from "@hotel-project/domain";

export async function findUserByEmail(
  service: UserService,
  email: string
): Promise<User | undefined> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email format.");
  }
  
  const user = await service.findUserByEmail(email);
  return user;
}
