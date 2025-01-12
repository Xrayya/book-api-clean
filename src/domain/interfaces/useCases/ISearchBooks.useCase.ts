import type Book from "@domain/entities/Book.entity";

export interface ISearchBooksUseCase {
  execute(
    query: string,
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
