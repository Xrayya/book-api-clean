import type Borrowing from "../entities/Borrowing.entity";
import type { IDBRepository } from "./IDBRepository.interface";

export interface IBorrowingDBRepository extends IDBRepository<Borrowing> {
  getByUser(user: Borrowing["user"]): Promise<Borrowing[]>;
}
