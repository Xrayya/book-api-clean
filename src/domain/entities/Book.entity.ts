import type BookCategory from "../enums/BookCategory.enum";
import type { IEntity } from "../interfaces/IEntity.type";

class Book implements IEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly author: string,
    public readonly ISBN: string,
    public readonly publisher: string,
    public readonly publishedYear: number,
    public readonly category: BookCategory,
    public readonly edition: number,
    public readonly available: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

export default Book;
