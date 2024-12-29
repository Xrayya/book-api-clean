import { Prisma, PrismaClient } from "@prisma/client";
import type Book from "../../entities/Book.entity";
import type { IBookDBRepository } from "../IBookDBRepository.interface";
import { bookCategoryCodeMapper } from "../../utils";
import { BookNotFoundException } from "../../exceptions/Book.exception";

class BookPrismaRepository implements IBookDBRepository {
  private prisma = new PrismaClient();

  private dbToEntityRemap({
    ISBN,
    publishedDate,
    categoryCode,
    createdAt,
    updatedAt,
    ...rest
  }: Prisma.BookGetPayload<{}>): Book {
    return {
      ...rest,
      ISBN,
      publishedDate,
      category: bookCategoryCodeMapper(categoryCode),
      createdAt,
      updatedAt,
    };
  }

  async getByTitle(title: Book["title"]): Promise<Book[]> {
    const result = await this.prisma.book.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });

    return result.map((book) => this.dbToEntityRemap(book));
  }

  async getFromCategory(category: Book["category"]): Promise<Book[]> {
    const result = await this.prisma.book.findMany({
      where: {
        categoryCode: category,
      },
    });

    return result.map((book) => this.dbToEntityRemap(book));
  }

  async getByISBN(ISBN: Book["ISBN"]): Promise<Book> {
    const result = await this.prisma.book.findUnique({
      where: {
        ISBN: ISBN,
      },
    });

    if (!result) {
      throw new BookNotFoundException();
    }

    return this.dbToEntityRemap(result);
  }

  async getFromPublisher(publisher: Book["publisher"]): Promise<Book[]> {
    const result = await this.prisma.book.findMany({
      where: {
        publisher: {
          contains: publisher,
        },
      },
    });

    return result.map((book) => this.dbToEntityRemap(book));
  }

  async getAvailable(): Promise<Book[]> {
    const result = await this.prisma.book.findMany({
      where: {
        available: true,
      },
    });

    return result.map((book) => this.dbToEntityRemap(book));
  }

  async get(id: number): Promise<Book> {
    const result = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      throw new BookNotFoundException();
    }

    return this.dbToEntityRemap(result);
  }

  async add({
    category: categoryCode,
    ...rest
  }: Omit<Book, "id" | "createdAt" | "updatedAt">): Promise<Book> {
    const result = await this.prisma.book.create({
      data: {
        ...rest,
        categoryCode,
      },
    });

    return this.dbToEntityRemap(result);
  }

  async update(
    id: number,
    {
      category: categoryCode,
      ...rest
    }: Omit<Book, "id" | "createdAt" | "updatedAt">,
  ): Promise<Book> {
    const result = await this.prisma.book.update({
      where: {
        id,
      },
      data: {
        id,
        ...rest,
        categoryCode,
      },
    });

    return this.dbToEntityRemap(result);
  }

  async delete(id: number, _cascade?: boolean): Promise<Book> {
    const result = await this.prisma.book.delete({
      where: {
        id,
      },
    });

    return this.dbToEntityRemap(result);
  }

  async getAll(): Promise<Book[]> {
    const result = await this.prisma.book.findMany();

    return result.map((book) => this.dbToEntityRemap(book));
  }

  // async getBooksWithAttributeValue(
  //   value: string,
  //   sortedBy:
  //     | "id"
  //     | "title"
  //     | "author"
  //     | "ISBN"
  //     | "publisher"
  //     | "publishedDate"
  //     | "category"
  //     | "edition",
  //   sortOrder: "asc" | "desc" = "asc",
  // ): Promise<Book[]> {
  //   const result = await this.prisma.book.findMany({
  //     where: {
  //       OR: [
  //         {
  //           title: {
  //             contains: value,
  //           },
  //         },
  //         {
  //           author: {
  //             contains: value,
  //           },
  //         },
  //         {
  //           ISBN: {
  //             contains: value,
  //           },
  //         },
  //         {
  //           publisher: {
  //             contains: value,
  //           },
  //         },
  //         {
  //           categoryCode: {
  //             contains: value,
  //           },
  //         },
  //       ],
  //     },
  //     orderBy: {
  //       [sortedBy]: sortOrder,
  //     }
  //   });

  //   return result.map((book) => this.dbToEntityRemap(book));
  // }
}

export default BookPrismaRepository;
