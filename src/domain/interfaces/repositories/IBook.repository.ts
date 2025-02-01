import type { Book } from "@domain/entities";
import type { IRepository } from "./IRepository.type";

export interface IBookRepository extends IRepository<Book> {
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
}
