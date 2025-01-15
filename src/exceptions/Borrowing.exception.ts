export class BorrowingNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "Borrowing Not Found Error";
  }
}
