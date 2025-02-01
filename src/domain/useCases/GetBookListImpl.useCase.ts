import type { Book } from "@domain/entities";
import type { IBookRepository } from "@domain/interfaces/repositories";
import type { IGetBookListUseCase } from "@domain/interfaces/useCases";

export class GetBookListUseCaseImpl implements IGetBookListUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(): Promise<Book[]> {
    return this.bookRepository.getAll();
  }
}
