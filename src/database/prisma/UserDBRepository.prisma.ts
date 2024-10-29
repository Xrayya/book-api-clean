import { PrismaClient } from "@prisma/client";
import type User from "../../entities/User.entity";
import type { IUserDBRepository } from "../IUserDBRepository.interface";
import UserRole from "../../enums/UserRole.enum";

class UserPrismaRepository implements IUserDBRepository {
  private prisma = new PrismaClient();

  async getByEmail(email: User["email"]): Promise<User> {
    const result = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!result) {
      throw new Error("User not found");
    }

    return {
      id: result.id,
      email: result.email,
      password: result.password,
      name: result.name,
      role: result.role === "ADMIN" ? UserRole.ADMIN : UserRole.USER,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async getPasswordByEmail(email: User["email"]): Promise<User["password"]> {
    const result = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
      select: {
        password: true,
      },
    });

    if (!result) {
      throw new Error("User not found");
    }
    return result.password;
  }
  async get(id: number): Promise<User> {
    const result = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!result) {
      throw new Error("User not found");
    }

    return {
      id: result.id,
      email: result.email,
      password: result.password,
      name: result.name,
      role: result.role === "ADMIN" ? UserRole.ADMIN : UserRole.USER,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }
  async add(item: Omit<User, "id">): Promise<User> {
    const result = await this.prisma.user.create({
      data: {
        email: item.email,
        password: item.password,
        name: item.name,
        role: item.role === UserRole.ADMIN ? "ADMIN" : "USER",
      },
    });

    return {
      id: result.id,
      email: result.email,
      password: result.password,
      name: result.name,
      role: result.role === "ADMIN" ? UserRole.ADMIN : UserRole.USER,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async update(id: number, item: Omit<User, "id">): Promise<User> {
    const result = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: item.email,
        password: item.password,
        name: item.name,
        role: item.role === UserRole.ADMIN ? "ADMIN" : "USER",
      },
    });

    return {
      id: result.id,
      email: result.email,
      password: result.password,
      name: result.name,
      role: result.role === "ADMIN" ? UserRole.ADMIN : UserRole.USER,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }
  async delete(id: number, _cascade?: boolean): Promise<User> {
    const result = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return {
      id: result.id,
      email: result.email,
      password: result.password,
      name: result.name,
      role: result.role === "ADMIN" ? UserRole.ADMIN : UserRole.USER,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }
  async getAll(): Promise<User[]> {
    const result = await this.prisma.user.findMany();

    return result.map((item) => ({
      id: item.id,
      email: item.email,
      password: item.password,
      name: item.name,
      role: item.role === "ADMIN" ? UserRole.ADMIN : UserRole.USER,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  }
}

export default UserPrismaRepository;
