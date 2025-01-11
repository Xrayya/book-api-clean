import type Book from "@domain/entities/Book.entity";

export interface IGetBookUseCase {
  execute(id: Book["id"]): Promise<Book>;
}
