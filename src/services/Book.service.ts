import type Book from "../entities/Book.entity";
import type BookRepository from "../repositories/Book.repository";

class BookService {
  constructor(private bookRepository: BookRepository) { }

  async getBookInfoById(bookId: Book["id"]): Promise<Book> {
    return this.bookRepository.get(bookId) as Promise<Book>;
  }

  async getBooksByTitle(bookTitle: Book["title"]): Promise<Book[]> {
    return this.bookRepository.getByTitle(bookTitle) as Promise<Book[]>;
  }

  async getBooksByCategory(bookCategory: Book["category"]): Promise<Book[]> {
    return this.bookRepository.getFromCategory(bookCategory) as Promise<Book[]>;
  }

  async getBooksByISBN(bookISBN: Book["ISBN"]): Promise<Book[]> {
    return this.bookRepository.getByISBN(bookISBN) as Promise<Book[]>;
  }

  async getBooksByPublisher(bookPublisher: Book["publisher"]): Promise<Book[]> {
    return this.bookRepository.getFromPublisher(bookPublisher) as Promise<
      Book[]
    >;
  }

  async getAllBooks(availableOnly: boolean = false): Promise<Book[]> {
    return availableOnly
      ? (this.bookRepository.getAvailable() as Promise<Book[]>)
      : (this.bookRepository.getAll() as Promise<Book[]>);
  }

  async getBookByParams(params: {
    search?: string;
    title?: string;
    titleStartWith?: string;
    titleEndWith?: string;
    ISBN?: string;
    publisher?: string;
    category?: Book["category"];
    edition?: string;
    sortBy?:
    | "id"
    | "title"
    | "author"
    | "ISBN"
    | "publisher"
    | "publishedDate"
    | "category"
    | "edition";
    available?: boolean;
  }): Promise<Book[]> {
    // TODO: Implement the logic to get books by the given parameters
    return [];
  }
}

export default BookService;
