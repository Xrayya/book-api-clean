import type Book from "./Book.entity";
import type { IEntity } from "./IEntity.interface";
import type User from "./User.entity";

class Borrowing implements IEntity {
  constructor(
    public id: number,
    public user: User,
    public book: Book,
    public borrowDate: Date,
    public returnDate: Date,
    public isReturned: boolean = false,
    public createdAt: Date,
    public updatedAt: Date,
  ) { }
}

export default Borrowing;
