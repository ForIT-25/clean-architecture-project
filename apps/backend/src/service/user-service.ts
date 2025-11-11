import { PrismaClient } from "@prisma/client";
import { CreateUserData, ROLES, UpdateUserData, User, UserService } from '@hotel-project/domain';

const prisma = new PrismaClient();

export class UserServiceImplementation implements UserService{
  async findUserAll(): Promise<User[]> {
    const users: User[] = await prisma.user.findMany({
      include: {
        bookings: true,
      },
    });
    return users;
  }

  async findUserById(userId: string): Promise<User | undefined> {
    const user: User = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        bookings: true,
      },
    });
    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user: User = await prisma.user.findUnique({
      where: { email },
      include: {
        bookings: true,
      },
    });
    return user ?? undefined;
  }

  async createUser(data: CreateUserData): Promise<User> {
    const user: User = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: ROLES.GUEST,
      },
    });

    return user;
  }

  async updateUser(userId: string, updates: UpdateUserData): Promise<User | undefined> {
    const user: User = await prisma.user.update({
      where: { id: userId },
      data: updates,
    });

    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    await prisma.user.delete({
      where: { id: userId},
    });
  }
}
