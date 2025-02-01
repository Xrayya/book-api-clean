import type { Book } from "@domain/entities";
import type { IBookRepository } from "@domain/interfaces/repositories";
import type { ISearchBooksUseCase } from "@domain/interfaces/useCases";

export class SearchBooksUseCaseImpl implements ISearchBooksUseCase {
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
    return this.bookRepository.get(
      {
        title: query,
        ISBN: query,
        author: query,
        publisher: query,
      },
      filter,
    );
  }
}
