import type { IEntity } from "../interfaces/IEntity.type";
import type Book from "./Book.entity";
import type User from "./User.entity";

class Borrowing implements IEntity {
  constructor(
    public id: number,
    public user: User,
    public books: Book[],
    public borrowDate: Date,
    public returnDate: Date,
    public isReturned: boolean = false,
    public createdAt: Date,
    public updatedAt: Date,
  ) { }
}

export default Borrowing;
