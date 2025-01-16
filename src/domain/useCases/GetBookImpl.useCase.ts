import type Book from "@domain/entities/Book.entity";
import type { IBookRepository } from "@domain/interfaces/repositories/IBook.repository";
import type { IGetBookUseCase } from "@domain/interfaces/useCases/IGetBook.useCase";

class GetBookUseCaseImpl implements IGetBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(id: Book["id"]): Promise<Book> {
    return this.bookRepository.get(id);
  }
}

export default GetBookUseCaseImpl;
