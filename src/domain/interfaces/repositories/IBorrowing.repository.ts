import type Borrowing from "@domain/entities/Borrowing.entity";
import type { IRepository } from "./IRepository.type";

export interface IBorrowingRepository extends IRepository<Borrowing> {
  get: {
    (id: Borrowing["id"]): Promise<Borrowing>;
    (
      userId: Borrowing["user"]["id"],
      bookId: Borrowing["book"]["id"],
    ): Promise<Borrowing>;
  };
}
