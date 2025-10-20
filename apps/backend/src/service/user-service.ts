import { PrismaClient } from "@prisma/client";
import { UserService } from '../../../../domain/src/services/user-service';
import { User } from "../../../../domain/src/entities/user";

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

  async saveUser(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  }

  async updateUser(user: User): Promise<void> {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  }

  async deleteUser(userId: string): Promise<void> {
    await prisma.user.delete({
      where: { id: userId},
    });
  }
}
