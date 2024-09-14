import { User } from "@/models/user";
import prisma from "../../../prisma/client";

export class UserRepository implements UserRepository {
  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<User> {
    return prisma.user.create({
      data: user,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async delete(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
