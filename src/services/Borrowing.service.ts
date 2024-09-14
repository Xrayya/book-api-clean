import Book from "../entities/Book.entity";
import Borrowing from "../entities/Borrowing.entity";
import type User from "../entities/User.entity";
import { BookNotAvailableException } from "../exceptions/Book.exception";
import BookRepository from "../repositories/Book.repository";
import BorrowingRepository from "../repositories/Borrowing.repository";

class BorrowingService {
  constructor(
    private borrowingRepository: BorrowingRepository,
    private bookRepository: BookRepository,
  ) {}

  async borrowBook(user: User, book: Book): Promise<Borrowing> {
    const { id: bookId, available, ...rest } = book;

    if (!available) {
      throw new BookNotAvailableException();
    }

    this.bookRepository.update(bookId, { ...rest, available: false });

    const borrowDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);
    return await this.borrowingRepository.add({
      user,
      book,
      borrowDate,
      returnDate,
      isReturned: false,
    });
  }

  async returnBook(borrowingId: number): Promise<Borrowing> {
    const borrowing = (await this.borrowingRepository.get(
      borrowingId,
    )) as Borrowing;
    const { id: bookId, available, ...rest } = borrowing.book;

    this.bookRepository.update(bookId, { ...rest, available: true });

    return this.borrowingRepository.update(borrowingId, {
      ...borrowing,
      isReturned: true,
    });
  }
}

export default BorrowingService;
