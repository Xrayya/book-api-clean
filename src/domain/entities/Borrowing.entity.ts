import type { IEntity } from "../interfaces/IEntity.type";
import type { Book } from "./Book.entity";
import type { User } from "./User.entity";

export class Borrowing implements IEntity {
  constructor(
    public id: number,
    public user: User,
    public book: Book,
    public borrowDate: Date,
    public returnDate: Date | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
