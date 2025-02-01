import type { Book } from "@domain/entities";
import type { IBookRepository } from "@domain/interfaces/repositories";
import type { IAddBookUseCase } from "@domain/interfaces/useCases";

export class AddBookUseCaseImpl implements IAddBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  execute(
    title: Book["title"],
    author: Book["author"],
    ISBN: Book["ISBN"],
    publisher: Book["publisher"],
    publishedYear: Book["publishedYear"],
    category: Book["category"],
    edition: Book["edition"],
  ): Promise<Book> {
    return this.bookRepository.add({
      title,
      author,
      ISBN,
      publisher,
      publishedYear,
      category,
      available: true,
      edition,
    });
  }
}
