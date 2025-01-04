import type Book from "@domain/entities/Book.entity";
import type Borrowing from "@domain/entities/Borrowing.entity";
import type User from "@domain/entities/User.entity";

export interface IBorrowBooksUseCase {
  execute(userId: User["id"], bookIds: Book["id"][]): Promise<Borrowing>;
}
