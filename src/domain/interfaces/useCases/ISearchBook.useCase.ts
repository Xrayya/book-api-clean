import type Book from "@domain/entities/Book.entity";

export interface ISearchBookUseCase {
  execute(query: string): Promise<Book[]>;
}
