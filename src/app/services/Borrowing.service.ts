import type Borrowing from "@domain/entities/Borrowing.entity";
import type { IBorrowingRepository } from "@domain/interfaces/repositories/IBorrowing.repository";
import BorrowBooksUseCaseImpl from "@domain/useCases/BorrowBooksImpl.useCase";
import ConfirmReturnUseCaseImpl from "@domain/useCases/ConfirmReturnImpl.useCase";

class BorrowingService {
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

export default BorrowingService;
