import type { Book } from "@domain/entities";

export interface IGetBookListUseCase {
  execute(): Promise<Book[]>;
}
