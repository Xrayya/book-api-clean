import { bookCategoryCodeMapper } from "@/utils";
import type { Book } from "@domain/entities";
import type { IBookRepository } from "@domain/interfaces/repositories";
import {
  AddBookUseCaseImpl,
  GetBookListUseCaseImpl,
  GetBookUseCaseImpl,
  SearchBooksUseCaseImpl,
} from "@domain/useCases";

export class BookService {
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
    title: string,
    author: string,
    ISBN: string,
    publisher: string,
    publishedYear: number,
    category: string,
    edition: number,
  ): Promise<Book> {
    return this.addBookUseCase.execute(
      title,
      author,
      ISBN,
      publisher,
      publishedYear,
      bookCategoryCodeMapper(category),
      edition,
    );
  }
}
