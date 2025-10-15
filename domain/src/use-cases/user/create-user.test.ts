import { describe, test, expect } from "vitest";
import { createUser } from "./create-user";
import { User } from "../../entities/user";

describe('create user', () => {
  
  test('Create user with its properties', () => {
    const user:User = createUser('1', 'Andres', 'andy@gmail.com', '12345678');

    expect(user).toEqual({
      id: '1',
      name: 'Andres',
      email: 'andy@gmail.com',
      password: '12345678'
    });
  });
});
