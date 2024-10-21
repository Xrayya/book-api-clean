import type Book from "../entities/Book.entity";
import type { IDBRepository } from "./IDBRepository.interface";

export interface IBookDBRepository extends IDBRepository<Book> {
  getByTitle(title: Book["title"]): Promise<Book[]>;
  getFromCategory(category: Book["category"]): Promise<Book[]>;
  getByISBN(ISBN: Book["ISBN"]): Promise<Book>;
  getFromPublisher(publisher: Book["publisher"]): Promise<Book[]>;
  getAvailable(): Promise<Book[]>;
}
