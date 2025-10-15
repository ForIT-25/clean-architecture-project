import { User } from '../../entities/user';

export function createUser(
  id: string,
  name: string,
  email: string,
  password: string,
): User {
  return {
    id,
    name,
    email,
    password
  };
};
