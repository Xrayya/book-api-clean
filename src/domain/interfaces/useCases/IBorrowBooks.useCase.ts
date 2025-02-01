import type { Borrowing } from "@domain/entities";

export interface IBorrowBooksUseCase {
  execute(
    userId: Borrowing["user"]["id"],
    bookIds: Borrowing["book"]["id"][],
  ): Promise<Borrowing[]>;
}
