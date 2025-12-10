import { PrismaClient } from "@prisma/client";
import {
  CreateUserData,
  ROLES,
  UpdateUserData,
  User,
  UserRole,
  UserService,
} from "@hotel-project/domain";

const prisma = new PrismaClient();

function mapUser(dbUser: any): User {
  return {
    id: dbUser.id,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
    name: dbUser.name,
    email: dbUser.email,
    password: dbUser.password,
    role: dbUser.role as UserRole,
  };
}

export const userService: UserService = {
  async findUserAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(mapUser);
  },

  async findUserById(userId: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return mapUser(user) ?? undefined;
  },

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return mapUser(user) ?? undefined;
  },

  async createUser(data: CreateUserData): Promise<User> {
    const user = prisma.user.create({
      data: {
        ...data,
        role: ROLES.GUEST,
      },
    });
    return mapUser(user);
  },

  async updateUser(userId: string, updates: UpdateUserData): Promise<User | undefined> {
    const user = await prisma.user.update({
      where: { id: userId },
      data: updates,
    });
    return mapUser(user) ?? undefined;
  },

  async deleteUser(userId: string): Promise<void> {
    await prisma.user.delete({
      where: { id: userId },
    });
  },
};
