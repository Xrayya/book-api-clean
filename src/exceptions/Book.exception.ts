import type { Book } from "@domain/entities";

export class BookNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Book with ${identifier} not found`);
    this.name = "Book Not Found Error";
  }
}

export class BookNotAvailableException extends Error {
  constructor(identifier: Pick<Book, "id" | "title" | "ISBN">) {
    const { id, title, ISBN } = identifier;
    super(`Book ${title} (id: ${id}, ISBN: ${ISBN}) not available`);
    this.name = "Book Not Available Error";
  }
}
