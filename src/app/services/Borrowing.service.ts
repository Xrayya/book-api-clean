import type Book from "@domain/entities/Book.entity";
import type Borrowing from "@domain/entities/Borrowing.entity";
import type User from "@domain/entities/User.entity";
import type { IBorrowingRepository } from "@domain/interfaces/repositories/IBorrowing.repository";
import BorrowBooksUseCaseImpl from "@domain/useCases/BorrowBooksImpl.useCase";
import ConfirmReturnUseCaseImpl from "@domain/useCases/ConfirmReturnImpl.useCase";
import type { ITokenizer } from "@infrastructure/tokenizer/ITokenizer.type";

class BorrowingService {
  constructor(
    private borrowingRepository: IBorrowingRepository,
    private tokenizer: ITokenizer,
  ) {
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
    userToken: string,
    bookIds: Book["id"][],
  ): Promise<Borrowing[]> {
    const { id } = this.tokenizer.decode(userToken) as {
      id: User["id"];
      name: User["name"];
      email: User["email"];
      role: User["role"];
    };

    return this.borrowBooksUseCase.execute(id, bookIds);
  }

  async confirmReturn(
    userId: User["id"],
    bookId: Book["id"],
  ): Promise<Borrowing> {
    return this.confirmReturnUseCase.execute(userId, bookId);
  }
}

export default BorrowingService;
