import type { IEntity } from "../interfaces/IEntity.interface";
import Book from "./Book.entity";
import User from "./User.entity";

class Borrowing implements IEntity {
  constructor(
    public id: number,
    public user: User,
    public book: Book,
    public borrowDate: Date,
    public returnDate: Date,
    public isReturned: boolean = false,
  ) { }
}

export default Borrowing;
