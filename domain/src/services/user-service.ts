import { CreateUserData, User, UpdateUserData } from "@hotel-project/domain";

export interface UserService {
  findUserAll(): Promise<User[]>;
  findUserById(userId: string): Promise<User | undefined>;
  findUserByEmail(email:string): Promise<User | undefined>;
  createUser(data: CreateUserData): Promise<User>;
  updateUser(userId: string, updates: UpdateUserData): Promise<User | undefined>;
  deleteUser(userId: string): Promise<void>;
}
