import type Book from "@domain/entities/Book.entity";
import type { IBookRepository } from "@domain/interfaces/repositories/IBook.repository";
import AddBookUseCaseImpl from "@domain/useCases/AddBookImpl.useCase";
import GetBookUseCaseImpl from "@domain/useCases/GetBookImpl.useCase";
import GetBookListUseCaseImpl from "@domain/useCases/GetBookListImpl.useCase";
import SearchBooksUseCaseImpl from "@domain/useCases/SearchBooksImpl.useCase";

class BookService {
  constructor(private bookRepository: IBookRepository) {
    this.getBookListUseCase = new GetBookListUseCaseImpl(this.bookRepository);
    this.searchBooksUseCase = new SearchBooksUseCaseImpl(this.bookRepository);
    this.getBookuseCase = new GetBookUseCaseImpl(this.bookRepository);
    this.addBookUseCase = new AddBookUseCaseImpl(this.bookRepository);
  }

  private getBookListUseCase: GetBookListUseCaseImpl;
  private getBookuseCase: GetBookUseCaseImpl;
  private searchBooksUseCase: SearchBooksUseCaseImpl;
  private addBookUseCase: AddBookUseCaseImpl;

  async getList(): Promise<Book[]> {
    return this.getBookListUseCase.execute();
  }

  async search(
    keyword?: string,
    filter?: {
      availability?: Book["available"];
      cateogory?: Book["category"];
      publishedYearRange?: {
        start?: Book["publishedYear"];
        end?: Book["publishedYear"];
      };
    },
  ): Promise<Book[]> {
    return this.searchBooksUseCase.execute(keyword, filter);
  }

  async get(id: Book["id"]): Promise<Book> {
    return this.getBookuseCase.execute(id);
  }

  async add(
    title: Book["title"],
    author: Book["author"],
    ISBN: Book["ISBN"],
    publisher: Book["publisher"],
    publishedYear: Book["publishedYear"],
    category: Book["category"],
    edition: Book["edition"],
  ) {
    return this.addBookUseCase.execute(
      title,
      author,
      ISBN,
      publisher,
      publishedYear,
      category,
      edition,
    );
  }
}

export default BookService;
