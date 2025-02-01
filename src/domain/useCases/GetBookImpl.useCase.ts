import type { Book } from "@domain/entities";
import type { IBookRepository } from "@domain/interfaces/repositories";
import type { IGetBookUseCase } from "@domain/interfaces/useCases";

export class GetBookUseCaseImpl implements IGetBookUseCase {
  constructor(private bookRepository: IBookRepository) { }

  async execute(id: Book["id"]): Promise<Book> {
    return this.bookRepository.get(id);
  }
}
