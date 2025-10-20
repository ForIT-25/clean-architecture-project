import { User } from "../entities/user";

export interface UserService {
  findUserAll(): Promise<User[]>;
  findUserById(userId: string): Promise<User | undefined>;
  findUserByEmail(email:string): Promise<User | undefined>;
  saveUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;
  deleteUser(userId: string): Promise<void>;
}
