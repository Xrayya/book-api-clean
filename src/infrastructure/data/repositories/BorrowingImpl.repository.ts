import { bookCategoryCodeMapper } from "@/utils";
import type Borrowing from "@domain/entities/Borrowing.entity";
import UserRole from "@domain/enums/UserRole.enum";
import type { IBorrowingRepository } from "@domain/interfaces/repositories/IBorrowing.repository";
import { Prisma, PrismaClient } from "@prisma/client";

class BorrowingRepositoryImpl implements IBorrowingRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  private prisma: PrismaClient;

  private dbToEntityRemap({
    book: { categoryCode, ...bookRest },
    user: { role: roleString, ...userRest },
    ...rest
  }: Prisma.BorrowingGetPayload<{
    include: { book: any; user: any };
  }>): Borrowing {
    return {
      user: {
        ...userRest,
        role: roleString === "ADMIN" ? UserRole.ADMIN : UserRole.CLIENT,
      },
      book: {
        category: bookCategoryCodeMapper(categoryCode),
        ...bookRest,
      },
      ...rest,
    };
  }

  get(id: Borrowing["id"]): Promise<Borrowing>;
  get(query: {
    userId: Borrowing["user"]["id"];
    bookId: Borrowing["book"]["id"];
    isReturned?: boolean;
  }): Promise<Borrowing[]>;
  async get(
    arg:
      | Borrowing["id"]
      | {
          userId: Borrowing["user"]["id"];
          bookId: Borrowing["book"]["id"];
          isReturned?: boolean;
        },
  ): Promise<Borrowing | Borrowing[]> {
    if (typeof arg === "number") {
      const result = await this.prisma.borrowing.findUnique({
        where: { id: arg },
        include: { user: true, book: true },
      });

      if (!result) {
        throw new Error("Borrowing not found");
      }

      return this.dbToEntityRemap(result);
    } else if (typeof arg === "object") {
      const result = await this.prisma.borrowing.findMany({
        where: { AND: [{ userId: arg.userId }, { bookId: arg.bookId }] },
        include: { user: true, book: true },
      });

      if (!result) {
        throw new Error("Borrowing not found");
      }

      return result.map(this.dbToEntityRemap);
    }

    throw new Error("Undefined error");
  }
  add(
    item: Omit<Borrowing, "id" | "createdAt" | "updatedAt">,
  ): Promise<Borrowing>;
  add(
    userId: Borrowing["user"]["id"],
    bookIds: Borrowing["book"]["id"][],
  ): Promise<Borrowing[]>;
  async add(
    arg1:
      | Omit<Borrowing, "id" | "createdAt" | "updatedAt">
      | Borrowing["user"]["id"],
    arg2?: Borrowing["book"]["id"][],
  ): Promise<Borrowing | Borrowing[]> {
    if (typeof arg1 === "object" && !arg2) {
      const result = await this.prisma.borrowing.create({
        data: {
          ...arg1,
          book: { connect: { id: arg1.book.id } },
          user: { connect: { id: arg1.user.id } },
        },
        include: { user: true, book: true },
      });

      return this.dbToEntityRemap(result);
    } else if (typeof arg1 === "number" && arg2) {
      const borrowDate = new Date();
      const result = await this.prisma.borrowing.createManyAndReturn({
        data: arg2.map((bookId) => ({
          userId: arg1,
          bookId,
          borrowDate,
        })),
        include: { user: true, book: true },
      });

      return result.map(this.dbToEntityRemap);
    }

    throw new Error("Undefined error");
  }

  async update(
    id: number,
    {
      book,
      user,
      ...rest
    }: Partial<Omit<Borrowing, "id" | "createdAt" | "updatedAt">>,
  ): Promise<Borrowing> {
    const result = await this.prisma.borrowing.update({
      where: { id },
      data: {
        ...rest,
        book: { connect: { id: book?.id } },
        user: { connect: { id: user?.id } },
      },
      include: { user: true, book: true },
    });

    return this.dbToEntityRemap(result);
  }

  async delete(id: number): Promise<Borrowing> {
    const result = await this.prisma.borrowing.delete({
      where: { id },
      include: { user: true, book: true },
    });

    return this.dbToEntityRemap(result);
  }

  async getAll(): Promise<Borrowing[]> {
    const result = await this.prisma.borrowing.findMany({
      include: { user: true, book: true },
    });

    return result.map(this.dbToEntityRemap);
  }
}

export default BorrowingRepositoryImpl;
