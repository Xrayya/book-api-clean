import type { Borrowing } from "@domain/entities";
import type { IBorrowingRepository } from "@domain/interfaces/repositories";
import type { IConfirmReturnUseCase } from "@domain/interfaces/useCases";

export class ConfirmReturnUseCaseImpl implements IConfirmReturnUseCase {
  constructor(private borrowingRepository: IBorrowingRepository) { }

  async execute(
    userId: Borrowing["user"]["id"],
    bookId: Borrowing["book"]["id"],
  ): Promise<Borrowing> {
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
