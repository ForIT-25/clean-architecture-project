import { describe, test, expect } from "vitest";
import { createUser } from "./create-user";
import { User } from "../../entities/user";
import { updateUser } from "./update-user";

describe('Update user', () => {
  
  test('Update user with its properties', () => {
    const user:User = createUser('1', 'Andres', 'andy@gmail.com', '12345678');
    const updatedUser:User = updateUser(user,{name:'Ivan', email:'ivan@gmail.com'});

    expect(updatedUser).toEqual({
      id: '1',
      name: 'Ivan',
      email: 'ivan@gmail.com',
      password: '12345678'
    });
  });
});
