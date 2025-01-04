import type Book from "@domain/entities/Book.entity";
import type { IRepository } from "./IRepository.type";

export interface IBookRepository extends IRepository<Book> {
  getByTitle(bookTitle: Book["title"]): Promise<Book[]>;

  getFromCategory(category: Book["category"]): Promise<Book[]>;

  getByISBN(ISBN: Book["ISBN"]): Promise<Book>;

  getFromPublisher(publisher: Book["publisher"]): Promise<Book[]>;

  getAvailable(): Promise<Book[]>;

  // getByBookWithAttributeValue(value: string): Promise<Book[]>;
}
