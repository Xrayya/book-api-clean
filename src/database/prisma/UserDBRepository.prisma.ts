import { Prisma, PrismaClient } from "@prisma/client";
import type User from "../../entities/User.entity";
import type { IUserDBRepository } from "../IUserDBRepository.interface";
import UserRole from "../../enums/UserRole.enum";

class UserPrismaRepository implements IUserDBRepository {
  private prisma = new PrismaClient();

  private dbToEntityRemap({
    role: roleString,
    createdAt,
    updatedAt,
    ...rest
  }: Prisma.UserGetPayload<{}>): User {
    return {
      ...rest,
      role: roleString === "ADMIN" ? UserRole.ADMIN : UserRole.USER,
      createdAt,
      updatedAt,
    };
  }

  async getByEmail(email: User["email"]): Promise<User> {
    const result = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!result) {
      throw new Error("User not found");
    }

    return this.dbToEntityRemap(result);
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

    return this.dbToEntityRemap(result);
  }

  async add({role, ...rest}: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const result = await this.prisma.user.create({
      data: {
        role: role === UserRole.ADMIN ? "ADMIN" : "USER",
        ...rest,
      },
    });

    return this.dbToEntityRemap(result);
  }

  async update(id: number, {role, ...rest}: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const result = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        role: role === UserRole.ADMIN ? "ADMIN" : "USER",
        ...rest
      },
    });

    return this.dbToEntityRemap(result);
  }

  async delete(id: number, _cascade?: boolean): Promise<User> {
    const result = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return this.dbToEntityRemap(result);
  }

  async getAll(): Promise<User[]> {
    const result = await this.prisma.user.findMany();

    return result.map((item) => this.dbToEntityRemap(item));
  }
}

export default UserPrismaRepository;
