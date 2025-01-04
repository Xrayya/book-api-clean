import type Book from "@domain/entities/Book.entity";

export interface IGetBookListUseCase {
  execute(): Promise<Book[]>;
}
