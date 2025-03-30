import type { Borrowing } from "@domain/entities";
import type { IBorrowingRepository } from "@domain/interfaces/repositories";
import {
  BorrowBooksUseCaseImpl,
  ConfirmReturnUseCaseImpl,
} from "@domain/useCases";

type BorrowedBook = {
  id: Borrowing["id"];
  borrower: {
    userId: Borrowing["user"]["id"];
    userEmail: Borrowing["user"]["email"];
    userName: Borrowing["user"]["name"];
  };
  bookId: Borrowing["book"]["id"];
  category: Borrowing["book"]["category"];
  title: Borrowing["book"]["title"];
  author: Borrowing["book"]["author"];
  ISBN: Borrowing["book"]["ISBN"];
  publisher: Borrowing["book"]["publisher"];
  publishedYear: Borrowing["book"]["publishedYear"];
  edition: Borrowing["book"]["edition"];
  createdAt: Borrowing["createdAt"];
  updatedAt: Borrowing["updatedAt"];
  borrowDate: Borrowing["borrowDate"];
  returnDate: Borrowing["returnDate"];
};

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
    clientId: Borrowing["user"]["id"],
    bookIds: Borrowing["book"]["id"][],
  ): Promise<BorrowedBook[]> {
    const borrowingData = await this.borrowBooksUseCase.execute(
      clientId,
      bookIds,
    );

    return borrowingData.map(
      ({
        id,
        book: {
          id: bookId,
          category,
          title,
          author,
          ISBN,
          publisher,
          publishedYear,
          edition,
        },
        user: { id: userId, email: userEmail, name: userName },
        createdAt,
        updatedAt,
        borrowDate,
        returnDate,
      }) => ({
        id,
        borrower: {
          userId,
          userEmail,
          userName,
        },
        bookId,
        category,
        title,
        author,
        ISBN,
        publisher,
        publishedYear,
        edition,
        createdAt,
        updatedAt,
        borrowDate,
        returnDate,
      }),
    );
  }

  async confirmReturn(
    clientId: Borrowing["user"]["id"],
    bookId: Borrowing["book"]["id"],
  ): Promise<Borrowing> {
    return this.confirmReturnUseCase.execute(clientId, bookId);
  }
}
