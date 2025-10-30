import { Entity } from "./entity";

export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  GUEST: 'GUEST',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export interface User extends Entity{
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
