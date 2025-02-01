import type { Borrowing } from "@domain/entities";
import type { IBorrowingRepository } from "@domain/interfaces/repositories";
import {
  BorrowBooksUseCaseImpl,
  ConfirmReturnUseCaseImpl,
} from "@domain/useCases";

export class BorrowingService {
  constructor(private borrowingRepository: IBorrowingRepository) {
    this.borrowBooksUseCase = new BorrowBooksUseCaseImpl(
      this.borrowingRepository,
    );
    this.confirmReturnUseCase = new ConfirmReturnUseCaseImpl(
      this.borrowingRepository,
    );
  }

  private borrowBooksUseCase: BorrowBooksUseCaseImpl;
  private confirmReturnUseCase: ConfirmReturnUseCaseImpl;

  async borrowMany(
    userId: Borrowing["user"]["id"],
    bookIds: Borrowing["book"]["id"][],
  ): Promise<Borrowing[]> {
    return this.borrowBooksUseCase.execute(userId, bookIds);
  }

  async confirmReturn(
    userId: Borrowing["user"]["id"],
    bookId: Borrowing["book"]["id"],
  ): Promise<Borrowing> {
    return this.confirmReturnUseCase.execute(userId, bookId);
  }
}
