import { User, UserRole, UserService } from "@hotel-project/domain";

export interface UpdateUserData {
  name?: string;
  role?: UserRole; 
}

export async function updateUser(
  service: UserService,
  userId: string,
  updates: UpdateUserData
): Promise<User> {
  
  const updatedUser = await service.updateUser(userId, updates);

  if (!updatedUser) {
    throw new Error("User not found or failed service");
  }

  return updatedUser;
}
