import type Book from "@domain/entities/Book.entity";
import type { IRepository } from "./IRepository.type";

export interface IBookRepository extends IRepository<Book> {
  get: {
    (id: Book["id"]): Promise<Book>;
    (query: {
      title?: Book["title"];
      ISBN?: Book["ISBN"];
      author?: Book["author"];
      publisher?: Book["publisher"];
    }): Promise<Book[]>;
  };
}
