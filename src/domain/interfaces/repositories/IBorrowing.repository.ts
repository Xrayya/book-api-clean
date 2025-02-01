import type { Borrowing } from "@domain/entities";
import type { IRepository } from "./IRepository.type";

export interface IBorrowingRepository extends IRepository<Borrowing> {
  get(id: Borrowing["id"]): Promise<Borrowing>;
  get(query: {
    userId: Borrowing["user"]["id"];
    bookId: Borrowing["book"]["id"];
    isReturned?: boolean;
  }): Promise<Borrowing[]>;
  add(
    item: Omit<Borrowing, "id" | "createdAt" | "updatedAt">,
  ): Promise<Borrowing>;
  add(
    userId: Borrowing["user"]["id"],
    bookIds: Borrowing["book"]["id"][],
  ): Promise<Borrowing[]>;
}
