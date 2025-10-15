import { User } from "../../entities/user";

interface updateUserInput {
  name?: string;
  email?: string;
}

export function updateUser(user: User, updates: updateUserInput): User {
  return {
    ...user,
    ...updates,
  };
}