import type Book from "@domain/entities/Book.entity";
import type { IBookRepository } from "@domain/interfaces/repositories/IBook.repository";
import type { IGetBookListUseCase } from "@domain/interfaces/useCases/IGetBookList.useCase";

class GetBookListUseCaseImpl implements IGetBookListUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(): Promise<Book[]> {
    return this.bookRepository.getAll();
  }
}

export default GetBookListUseCaseImpl;
