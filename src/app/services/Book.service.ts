import type Book from "@domain/entities/Book.entity";
import type { IBookRepository } from "@domain/interfaces/repositories/IBook.repository";
import GetBookListUseCaseImpl from "@domain/useCases/GetBookListImpl.useCase";
import SearchBooksUseCaseImpl from "@domain/useCases/SearchBooksImpl.useCase";

class BookService {
  constructor(private bookRepository: IBookRepository) {
    this.getBookListUseCase = new GetBookListUseCaseImpl(this.bookRepository);
    this.searchBooksUseCase = new SearchBooksUseCaseImpl(this.bookRepository);
  }

  private getBookListUseCase: GetBookListUseCaseImpl;
  private searchBooksUseCase: SearchBooksUseCaseImpl;

  async getList(): Promise<Book[]> {
    return this.getBookListUseCase.execute();
  }

  async search(keyword: string): Promise<Book[]> {
    return this.searchBooksUseCase.execute(keyword);
  }
}

export default BookService;
