import { User, UserService } from "@hotel-project/domain";

export async function findUserAll(service: UserService): Promise<User[]> {
  const users = await service.findUserAll();
  return users;
}
