import type { User } from "@domain/entities";
import { UserRole } from "@domain/enums";
import type { IUserRepository } from "@domain/interfaces/repositories";
import { UserNotFoundException } from "@exceptions/User.exception";
import { Prisma, PrismaClient } from "@prisma/client";

export class UserRepositoryImpl implements IUserRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  private prisma: PrismaClient;

  private dbToEntity({
    role: roleString,
    suspended: isSuspended,
    ...rest
  }: Prisma.UserGetPayload<{}>): User {
    return {
      ...rest,
      role: roleString === "ADMIN" ? UserRole.ADMIN : UserRole.CLIENT,
      isSuspended,
    };
  }

  get(id: User["id"]): Promise<User>;
  get(email: User["email"]): Promise<User>;
  async get(arg: User["id"] | User["email"]): Promise<User> {
    if (typeof arg === "number") {
      const result = await this.prisma.user.findUnique({ where: { id: arg } });

      if (!result) {
        throw new UserNotFoundException();
      }

      return this.dbToEntity(result);
    } else if (typeof arg === "string") {
      const result = await this.prisma.user.findUnique({
        where: { email: arg },
      });

      if (!result) {
        throw new UserNotFoundException();
      }

      return this.dbToEntity(result);
    }

    throw new Error("Undefined error");
  }

  async getPasswordByEmail(email: User["email"]): Promise<User["password"]> {
    const result = await this.prisma.user.findUnique({
      where: { email },
      select: { password: true },
    });

    if (!result) {
      throw new UserNotFoundException();
    }

    return result.password;
  }

  async add({
    isSuspended: suspended,
    ...rest
  }: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const result = await this.prisma.user.create({
      data: { suspended, ...rest },
    });

    return this.dbToEntity(result);
  }

  async update(
    id: number,
    {
      isSuspended: suspended,
      ...rest
    }: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>,
  ): Promise<User> {
    const result = await this.prisma.user.update({
      where: { id },
      data: { suspended, ...rest },
    });

    return this.dbToEntity(result);
  }

  async delete(id: number): Promise<User> {
    const result = await this.prisma.user.delete({ where: { id } });

    return this.dbToEntity(result);
  }
  async getAll(): Promise<User[]> {
    const result = await this.prisma.user.findMany();

    return result.map(this.dbToEntity);
  }
}
