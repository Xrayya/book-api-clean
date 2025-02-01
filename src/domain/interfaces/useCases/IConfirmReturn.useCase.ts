import type { Borrowing } from "@domain/entities";

export interface IConfirmReturnUseCase {
  execute(
    userId: Borrowing["user"]["id"],
    bookId: Borrowing["book"]["id"],
  ): Promise<Borrowing>;
}
