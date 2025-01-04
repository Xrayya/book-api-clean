import type Book from "@domain/entities/Book.entity";
import type Borrowing from "@domain/entities/Borrowing.entity";

export interface IConfirmReturnUseCase {
  execute(borrowId: Borrowing["id"], bookIds: Book["id"][]): Promise<Borrowing>;
}
