import { CreateUserData, User, updateUserData } from "@hotel-project/domain";

export interface UserService {
  findUserAll(): Promise<User[]>;
  findUserById(userId: string): Promise<User | undefined>;
  findUserByEmail(email:string): Promise<User | undefined>;
  saveUser(data: CreateUserData): Promise<User>;
  updateUser(userId: string, updates: updateUserData): Promise<User | undefined>;
  deleteUser(userId: string): Promise<void>;
}
