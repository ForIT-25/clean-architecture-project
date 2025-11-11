import { User, UserService } from "@hotel-project/domain";

export async function findUserById(
  service: UserService,
  userId: string
): Promise<User | undefined> {
  const user = await service.findUserById(userId);
  return user;
}
