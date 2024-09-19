import Book from "../entities/Book.entity";
import type { IDBRepository } from "../interfaces/IDBRepository.interface";
import type { IRepository } from "../interfaces/IRepository.interface";

class BookRepository implements IRepository<Book> {
  constructor(private bookDBRepository: IDBRepository<Book>) { }

  async get(
    bookId: number,
    omit?: (keyof Book)[] | undefined,
  ): Promise<Book | Omit<Book, keyof Book>> {
    return this.bookDBRepository.get(bookId, omit);
  }

  async getAll(
    omit?: (keyof Book)[] | undefined,
  ): Promise<Book[] | Omit<Book, keyof Book>[]> {
    return this.bookDBRepository.getAll(omit);
  }

  async add(book: Omit<Book, "id">): Promise<Book> {
    return this.bookDBRepository.add(book);
  }

  async update(bookId: number, bookData: Omit<Book, "id">): Promise<Book> {
    return this.bookDBRepository.update(bookId, bookData);
  }

  async delete(bookId: number): Promise<Book> {
    return this.bookDBRepository.delete(bookId, true);
  }
}

export default BookRepository;
