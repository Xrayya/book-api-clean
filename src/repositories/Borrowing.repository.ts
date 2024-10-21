import type { IBorrowingDBRepository } from "../database/IBorrowingDBRepository.interface";
import type Borrowing from "../entities/Borrowing.entity";
import type User from "../entities/User.entity";
import type { IRepository } from "./IRepository.interface";

class BorrowingRepository implements IRepository<Borrowing> {
  constructor(private borrowingDBRepository: IBorrowingDBRepository) { }

  async get(
    borrowingId: number,
  ): Promise<Borrowing | Omit<Borrowing, keyof Borrowing>> {
    return this.borrowingDBRepository.get(borrowingId);
  }

  async getByUser(
    user: User,
  ): Promise<Borrowing[] | Omit<Borrowing, keyof Borrowing>[]> {
    return this.borrowingDBRepository.getByUser(user);
  }

  async add(borrowing: Omit<Borrowing, "id">): Promise<Borrowing> {
    return this.borrowingDBRepository.add(borrowing);
  }

  async update(
    borrowingId: number,
    borrowingData: Omit<Borrowing, "id">,
  ): Promise<Borrowing> {
    return this.borrowingDBRepository.update(borrowingId, borrowingData);
  }

  async delete(borrowingId: number): Promise<Borrowing> {
    return this.borrowingDBRepository.delete(borrowingId);
  }

  async getAll(): Promise<Borrowing[] | Omit<Borrowing, keyof Borrowing>[]> {
    return this.borrowingDBRepository.getAll();
  }
}

export default BorrowingRepository;
