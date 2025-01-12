import type Book from "@domain/entities/Book.entity";
import type { IBookRepository } from "@domain/interfaces/repositories/IBook.repository";
import GetBookUseCaseImpl from "@domain/useCases/GetBookImpl.useCase";
import GetBookListUseCaseImpl from "@domain/useCases/GetBookListImpl.useCase";
import SearchBooksUseCaseImpl from "@domain/useCases/SearchBooksImpl.useCase";

class BookService {
  constructor(private bookRepository: IBookRepository) {
    this.getBookListUseCase = new GetBookListUseCaseImpl(this.bookRepository);
    this.searchBooksUseCase = new SearchBooksUseCaseImpl(this.bookRepository);
    this.getBookuseCase = new GetBookUseCaseImpl(this.bookRepository);
  }

  private getBookListUseCase: GetBookListUseCaseImpl;
  private getBookuseCase: GetBookUseCaseImpl;
  private searchBooksUseCase: SearchBooksUseCaseImpl;

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
}

export default BookService;
