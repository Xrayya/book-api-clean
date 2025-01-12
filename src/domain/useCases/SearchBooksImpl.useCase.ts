import type Book from "@domain/entities/Book.entity";
import type { IBookRepository } from "@domain/interfaces/repositories/IBook.repository";
import type { ISearchBooksUseCase } from "@domain/interfaces/useCases/ISearchBooks.useCase";

class SearchBooksUseCaseImpl implements ISearchBooksUseCase {
  constructor(private bookRepository: IBookRepository) {}

  execute(
    query?: string,
    filter?: {
      availability?: Book["available"];
      cateogory?: Book["category"];
      publishedYearRange?: {
        start?: Book["publishedYear"];
        end?: Book["publishedYear"];
      };
    },
  ): Promise<Book[]> {
    return this.bookRepository.get({
      title: query,
      ISBN: query,
      author: query,
      publisher: query,
    }, filter);
  }
}

export default SearchBooksUseCaseImpl;
