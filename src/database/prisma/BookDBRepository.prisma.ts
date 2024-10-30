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
  get(id: number): Promise<Book> {
    throw new Error("Method not implemented.");
  }
  add(item: Omit<Book, "id">): Promise<Book> {
    throw new Error("Method not implemented.");
  }
  update(id: number, item: Omit<Book, "id">): Promise<Book> {
    throw new Error("Method not implemented.");
  }
  delete(id: number, cascade?: boolean): Promise<Book> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Book[]> {
    throw new Error("Method not implemented.");
  }
}

export default BookPrismaRepository;
