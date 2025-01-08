import { bookCategoryCodeMapper } from "@/utils";
import type Book from "@domain/entities/Book.entity";
import type { IBookRepository } from "@domain/interfaces/repositories/IBook.repository";
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
  get(query: {
    title?: Book["title"];
    ISBN?: Book["ISBN"];
    author?: Book["author"];
    publisher?: Book["publisher"];
  }): Promise<Book[]>;
  async get(
    arg:
      | Book["id"]
      | {
        title?: Book["title"];
        ISBN?: Book["ISBN"];
        author?: Book["author"];
        publisher?: Book["publisher"];
      },
  ): Promise<Book | Book[]> {
    if (typeof arg === "number") {
      const result = await this.prisma.book.findUnique({ where: { id: arg } });

      if (!result) {
        throw new Error("Book not found");
      }

      return this.dbToEntityRemap(result);
    } else if (typeof arg === "object") {
      const result = await this.prisma.book.findMany({ where: arg });

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
    }: Omit<Book, "id" | "createdAt" | "updatedAt">,
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
