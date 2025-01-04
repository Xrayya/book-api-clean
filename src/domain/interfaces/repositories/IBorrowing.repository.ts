import type Borrowing from "@domain/entities/Borrowing.entity";
import type { IRepository } from "./IRepository.type";

export interface IBorrowingRepository extends IRepository<Borrowing> { }
