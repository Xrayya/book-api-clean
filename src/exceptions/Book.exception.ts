export class BookNotFoundException extends Error {
  constructor() {
    super("Book not found");
    this.name = "Book Not Found Error"
  }
}

export class BookNotAvailableException extends Error {
  constructor() {
    super("Book not available");
    this.name = "Book Not Available Error"
  }
}
