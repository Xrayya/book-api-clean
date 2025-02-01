import type { Borrowing } from "@domain/entities";
import type { IBorrowingRepository } from "@domain/interfaces/repositories";
import type { IBorrowBooksUseCase } from "@domain/interfaces/useCases";

export class BorrowBooksUseCaseImpl implements IBorrowBooksUseCase {
  constructor(private borrowingRepository: IBorrowingRepository) { }
  async execute(
    userId: Borrowing["user"]["id"],
    bookIds: Borrowing["book"]["id"][],
  ): Promise<Borrowing[]> {
    return this.borrowingRepository.add(userId, bookIds);
  }
}
