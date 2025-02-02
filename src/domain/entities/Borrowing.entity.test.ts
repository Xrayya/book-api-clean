import { BookCategory, UserRole } from "@domain/enums";
import { describe, expect, test } from "bun:test";
import { Book } from "./Book.entity";
import { Borrowing } from "./Borrowing.entity";
import { User } from "./User.entity";

describe("Borrowing Entity", () => {
  test("Initiate borrowing entity return proper borrowing object", () => {
    const dateTest = new Date();
    const book = new Book(
      1,
      "Book Title",
      "Author Name",
      "1234567890",
      "Publisher Name",
      2021,
      BookCategory.GENERAL_WORK,
      1,
      true,
      dateTest,
      dateTest,
    );
    const user = new User(
      1,
      "User Name",
      "test@example.com",
      "password",
      UserRole.CLIENT,
      "token",
      false,
      dateTest,
      dateTest,
    );
    const borrowing = new Borrowing(
      1,
      user,
      book,
      dateTest,
      dateTest,
      dateTest,
      dateTest,
    );

    expect(borrowing).toBeObject();
    expect(borrowing.id).toBe(1);
    expect(borrowing.user).toEqual(user);
    expect(borrowing.book).toEqual(book);
    expect(borrowing.borrowDate).toBe(dateTest);
    expect(borrowing.returnDate).toBe(dateTest);
    expect(borrowing.createdAt).toBe(dateTest);
    expect(borrowing.updatedAt).toBe(dateTest);
  });

  test("ReturnDate should be nullable", () => {
    const dateTest = new Date();
    const book = new Book(
      1,
      "Book Title",
      "Author Name",
      "1234567890",
      "Publisher Name",
      2021,
      BookCategory.GENERAL_WORK,
      1,
      true,
      dateTest,
      dateTest,
    );
    const user = new User(
      1,
      "User Name",
      "test@example.com",
      "password",
      UserRole.CLIENT,
      "token",
      false,
      dateTest,
      dateTest,
    );
    const borrowing = new Borrowing(
      1,
      user,
      book,
      dateTest,
      null,
      dateTest,
      dateTest,
    );

    expect(borrowing).toBeObject();
    expect(borrowing.id).toBe(1);
    expect(borrowing.user).toEqual(user);
    expect(borrowing.book).toEqual(book);
    expect(borrowing.borrowDate).toBe(dateTest);
    expect(borrowing.returnDate).toBe(null);
    expect(borrowing.createdAt).toBe(dateTest);
    expect(borrowing.updatedAt).toBe(dateTest);
  });
});
