import type BookCategory from "../enums/BookCategory.enum";
import type { IEntity } from "../interfaces/IEntity.interface";

class Book implements IEntity {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public ISBN: string,
    public publisher: string,
    public publishedDate: Date,
    public category: BookCategory,
    public edition: number,
    public available: boolean,
  ) { }
}

export default Book;
