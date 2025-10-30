import { User, UserRole } from "@hotel-project/domain";

export interface updateUserData {
  name?: string;
  email?: string;
  role?: UserRole;
}

export function updateUser(user: User, updates: updateUserData): User {
  return {
    ...user,
    ...updates,
  };
}
