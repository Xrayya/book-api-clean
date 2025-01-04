import type Book from "@domain/entities/Book.entity";

export interface ISearchBooksUseCase {
  execute(query: string): Promise<Book[]>;
}
