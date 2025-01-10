import type Book from "@domain/entities/Book.entity";
import type Borrowing from "@domain/entities/Borrowing.entity";
import type User from "@domain/entities/User.entity";
import type { IBorrowingRepository } from "@domain/interfaces/repositories/IBorrowing.repository";
import type { IConfirmReturnUseCase } from "@domain/interfaces/useCases/IConfirmReturn.useCase";

class ConfirmReturnUseCaseImpl implements IConfirmReturnUseCase {
  constructor(private borrowingRepository: IBorrowingRepository) { }

  async execute(userId: User["id"], bookId: Book["id"]): Promise<Borrowing> {
    const borrowing = (
      await this.borrowingRepository.get({ userId, bookId, isReturned: false })
    )[0];

    return this.borrowingRepository.update(borrowing.id, {
      user: borrowing.user,
      book: borrowing.book,
      borrowDate: borrowing.borrowDate,
      returnDate: new Date(),
    });
  }
}

export default ConfirmReturnUseCaseImpl;
