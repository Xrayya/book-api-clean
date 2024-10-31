import { Prisma, PrismaClient } from "@prisma/client";
import type Book from "../../entities/Book.entity";
import type { IBookDBRepository } from "../IBookDBRepository.interface";
import { bookCategoryCodeMapper } from "../../utils";
import { BookNotFoundException } from "../../exceptions/Book.exception";

class BookPrismaRepository implements IBookDBRepository {
  private prisma = new PrismaClient();

  private dbToEntityRemap({
    id,
    title,
    author,
    isbn: ISBN,
    publisher,
    published_date: publishedDate,
    category_code,
    edition,
    available,
    created_at: createdAt,
    updated_at: updatedAt,
  }: Prisma.bookGetPayload<{}>) {
    return {
      id,
      title,
      author,
      ISBN,
      publisher,
      publishedDate,
      category: bookCategoryCodeMapper(category_code),
      edition,
      available,
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
        category_code: category,
      },
    });

    return result.map((book) => this.dbToEntityRemap(book));
  }

  async getByISBN(ISBN: Book["ISBN"]): Promise<Book> {
    const result = await this.prisma.book.findUnique({
      where: {
        isbn: ISBN,
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
    ISBN: isbn,
    publishedDate: published_date,
    category: category_code,
    createdAt: created_at,
    updatedAt: updated_at,
    ...rest
  }: Omit<Book, "id">): Promise<Book> {
    const result = await this.prisma.book.create({
      data: {
        ...rest,
        isbn,
        published_date,
        category_code,
        created_at,
        updated_at,
      },
    });

    return this.dbToEntityRemap(result);
  }

  async update(
    id: number,
    {
      ISBN: isbn,
      publishedDate: published_date,
      category: category_code,
      createdAt: created_at,
      updatedAt: updated_at,
      ...rest
    }: Omit<Book, "id">,
  ): Promise<Book> {
    const result = await this.prisma.book.update({
      where: {
        id,
      },
      data: {
        id,
        ...rest,
        isbn,
        published_date,
        category_code,
        created_at,
        updated_at,
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
}

export default BookPrismaRepository;
