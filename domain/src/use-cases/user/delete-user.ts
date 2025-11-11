import { UserService } from "@hotel-project/domain";

export async function deleteUser(
  service: UserService,
  userId: string
): Promise<void> {
  //  
  await service.deleteUser(userId);
}
