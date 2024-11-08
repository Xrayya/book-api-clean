import type { IBookDBRepository } from "../database/IBookDBRepository.interface";
import type Book from "../entities/Book.entity";
import type { IRepository } from "./IRepository.interface";

class BookRepository implements IRepository<Book> {
  constructor(private bookDBRepository: IBookDBRepository) { }

  async get(bookId: number): Promise<Book> {
    return this.bookDBRepository.get(bookId);
  }

  async getAll(): Promise<Book[]> {
    return this.bookDBRepository.getAll();
  }

  getByTitle(bookTitle: Book["title"]): Promise<Book[]> {
    return this.bookDBRepository.getByTitle(bookTitle);
  }

  getFromCategory(category: Book["category"]): Promise<Book[]> {
    return this.bookDBRepository.getFromCategory(category);
  }

  getByISBN(ISBN: Book["ISBN"]): Promise<Book> {
    return this.bookDBRepository.getByISBN(ISBN);
  }

  getFromPublisher(publisher: Book["publisher"]): Promise<Book[]> {
    return this.bookDBRepository.getFromPublisher(publisher);
  }

  getAvailable(): Promise<Book[]> {
    return this.bookDBRepository.getAvailable();
  }

  add(book: Omit<Book, "id" | "createdAt" | "updatedAt">): Promise<Book> {
    return this.bookDBRepository.add(book);
  }

  update(
    bookId: number,
    bookData: Omit<Book, "id" | "createdAt" | "updatedAt">,
  ): Promise<Book> {
    return this.bookDBRepository.update(bookId, bookData);
  }

  async delete(bookId: number): Promise<Book> {
    return this.bookDBRepository.delete(bookId, true);
  }
}

export default BookRepository;
