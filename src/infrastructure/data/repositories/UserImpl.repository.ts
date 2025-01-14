import type User from "@domain/entities/User.entity";
import UserRole from "@domain/enums/UserRole.enum";
import type { IUserRepository } from "@domain/interfaces/repositories/IUser.repository";
import { Prisma, PrismaClient } from "@prisma/client";

class UserRepositoryImpl implements IUserRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  private prisma: PrismaClient;

  private dbToEntityRemap({
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
        throw new Error("User not found");
      }

      return this.dbToEntityRemap(result);
    } else if (typeof arg === "string") {
      const result = await this.prisma.user.findUnique({
        where: { email: arg },
      });

      if (!result) {
        throw new Error("User not found");
      }

      return this.dbToEntityRemap(result);
    }

    throw new Error("Undefined error");
  }

  async getPasswordByEmail(email: User["email"]): Promise<User["password"]> {
    const result = await this.prisma.user.findUnique({
      where: { email },
      select: { password: true },
    });

    if (!result) {
      throw new Error("User not found");
    }

    return result.password;
  }

  async add(item: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const result = await this.prisma.user.create({ data: item });

    return this.dbToEntityRemap(result);
  }

  async update(
    id: number,
    { role, ...rest }: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>,
  ): Promise<User> {
    const result = await this.prisma.user.update({
      where: { id },
      data: { role: role === UserRole.ADMIN ? "ADMIN" : "CLIENT", ...rest },
    });

    return this.dbToEntityRemap(result);
  }

  async delete(id: number): Promise<User> {
    const result = await this.prisma.user.delete({ where: { id } });

    return this.dbToEntityRemap(result);
  }
  async getAll(): Promise<User[]> {
    const result = await this.prisma.user.findMany();

    return result.map(this.dbToEntityRemap);
  }
}

export default UserRepositoryImpl;
