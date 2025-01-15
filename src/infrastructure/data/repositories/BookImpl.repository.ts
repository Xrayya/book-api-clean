import { bookCategoryCodeMapper } from "@/utils";
import type Book from "@domain/entities/Book.entity";
import type { IBookRepository } from "@domain/interfaces/repositories/IBook.repository";
import { BookNotFoundException } from "@exceptions/Book.exception";
import { Prisma, PrismaClient } from "@prisma/client";

class BookRepositoryImpl implements IBookRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  private prisma: PrismaClient;

  private dbToEntityRemap({
    categoryCode,
    ...rest
  }: Prisma.BookGetPayload<{}>): Book {
    return {
      category: bookCategoryCodeMapper(categoryCode),
      ...rest,
    };
  }

  get(id: Book["id"]): Promise<Book>;
  get(
    query: {
      title?: Book["title"];
      ISBN?: Book["ISBN"];
      author?: Book["author"];
      publisher?: Book["publisher"];
    },
    filter?: {
      availability?: Book["available"];
      cateogory?: Book["category"];
      publishedYearRange?: {
        start?: Book["publishedYear"];
        end?: Book["publishedYear"];
      };
    },
  ): Promise<Book[]>;
  async get(
    arg1:
      | Book["id"]
      | {
          title?: Book["title"];
          ISBN?: Book["ISBN"];
          author?: Book["author"];
          publisher?: Book["publisher"];
        },
    arg2?: {
      availability?: Book["available"];
      cateogory?: Book["category"];
      publishedYearRange?: {
        start?: Book["publishedYear"];
        end?: Book["publishedYear"];
      };
    },
  ): Promise<Book | Book[]> {
    if (typeof arg1 === "number") {
      const result = await this.prisma.book.findUnique({ where: { id: arg1 } });

      if (!result) {
        throw new BookNotFoundException(`id: ${arg1}`);
      }

      return this.dbToEntityRemap(result);
    } else if (typeof arg1 === "object") {
      const result = await this.prisma.book.findMany({
        where: {
          ...arg1,
          available: arg2?.availability,
          categoryCode: arg2?.cateogory,
          publishedYear: {
            gte: arg2?.publishedYearRange?.start,
            lte: arg2?.publishedYearRange?.end,
          },
        },
      });

      return result.map(this.dbToEntityRemap);
    }

    throw new Error("Undefined error");
  }

  async add({
    category: categoryCode,
    ...rest
  }: Omit<Book, "id" | "createdAt" | "updatedAt">): Promise<Book> {
    const result = await this.prisma.book.create({
      data: { categoryCode, ...rest },
    });

    return this.dbToEntityRemap(result);
  }

  async update(
    id: Book["id"],
    {
      category: categoryCode,
      ...rest
    }: Partial<Omit<Book, "id" | "createdAt" | "updatedAt">>,
  ): Promise<Book> {
    const result = await this.prisma.book.update({
      where: { id },
      data: { categoryCode, ...rest },
    });

    return this.dbToEntityRemap(result);
  }

  async delete(id: Book["id"]): Promise<Book> {
    const result = await this.prisma.book.delete({ where: { id } });

    return this.dbToEntityRemap(result);
  }

  async getAll(): Promise<Book[]> {
    const result = await this.prisma.book.findMany();

    return result.map(this.dbToEntityRemap);
  }
}

export default BookRepositoryImpl;
