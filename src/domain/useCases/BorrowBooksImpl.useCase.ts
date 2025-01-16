import type Book from "@domain/entities/Book.entity";
import type Borrowing from "@domain/entities/Borrowing.entity";
import type User from "@domain/entities/User.entity";
import type { IBorrowingRepository } from "@domain/interfaces/repositories/IBorrowing.repository";
import type { IBorrowBooksUseCase } from "@domain/interfaces/useCases/IBorrowBooks.useCase";

class BorrowBooksUseCaseImpl implements IBorrowBooksUseCase {
  constructor(private borrowingRepository: IBorrowingRepository) {}
  async execute(
    userId: User["id"],
    bookIds: Book["id"][],
  ): Promise<Borrowing[]> {
    return this.borrowingRepository.add(userId, bookIds);
  }
}

export default BorrowBooksUseCaseImpl;
