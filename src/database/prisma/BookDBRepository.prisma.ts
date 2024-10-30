import { Prisma, PrismaClient } from "@prisma/client";
import type Book from "../../entities/Book.entity";
import type { IBookDBRepository } from "../IBookDBRepository.interface";
import { bookCategoryCodeMapper } from "../../utils";

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
  getByISBN(ISBN: Book["ISBN"]): Promise<Book> {
    throw new Error("Method not implemented.");
  }
  getFromPublisher(publisher: Book["publisher"]): Promise<Book[]> {
    throw new Error("Method not implemented.");
  }
  getAvailable(): Promise<Book[]> {
    throw new Error("Method not implemented.");
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
