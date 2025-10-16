import { User } from "../entities/user";

export interface UserService {
  findUserAll(): Promise<User[]>;
  findUserById(idUser: string): Promise<User | undefined>;
  findUserByEmail(email:string): Promise<User | undefined>;
  saveUser(User: User): Promise<void>;
  updateUser(User: User): Promise<void>;
  deleteUser(idUser: string): Promise<void>;
}
