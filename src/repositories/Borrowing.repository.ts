import type Borrowing from "../entities/Borrowing.entity";
import type User from "../entities/User.entity";
import type { IDBRepository } from "../interfaces/IDBRepository.interface";
import type { IRepository } from "../interfaces/IRepository.interface";

class BorrowingRepository implements IRepository<Borrowing> {
  constructor(private borrowingDBRepository: IDBRepository<Borrowing>) {}

  async get(
    borrowingId: number,
    omit?: (keyof Borrowing)[] | undefined,
  ): Promise<Borrowing | Omit<Borrowing, keyof Borrowing>> {
    return this.borrowingDBRepository.get(borrowingId, omit);
  }

  async getByUser(
    user: User,
    omit?: (keyof Borrowing)[] | undefined,
  ): Promise<Borrowing[] | Omit<Borrowing, keyof Borrowing>[]> {
    return this.borrowingDBRepository.getByField("user", user, omit);
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

  async getAll(
    omit?: (keyof Borrowing)[] | undefined,
  ): Promise<Borrowing[] | Omit<Borrowing, keyof Borrowing>[]> {
    return this.borrowingDBRepository.getAll(omit);
  }
}

export default BorrowingRepository;
