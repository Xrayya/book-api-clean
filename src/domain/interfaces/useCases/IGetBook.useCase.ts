import type { Book } from "@domain/entities";

export interface IGetBookUseCase {
  execute(id: Book["id"]): Promise<Book>;
}
