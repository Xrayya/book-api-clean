import { expect, test } from "bun:test";
import Book from "./Book.entity";
import BookCategory from "@domain/enums/BookCategory.enum";

test("Initiate book entity return proper book object", () => {
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

  expect(book).toBeObject();
  expect(book.id).toBe(1);
  expect(book.title).toBe("Book Title");
  expect(book.author).toBe("Author Name");
  expect(book.ISBN).toBe("1234567890");
  expect(book.publisher).toBe("Publisher Name");
  expect(book.publishedYear).toBe(2021);
  expect(book.category).toBe(BookCategory.GENERAL_WORK);
  expect(book.edition).toBe(1);
  expect(book.available).toBeTrue();
  expect(book.createdAt).toBe(dateTest);
  expect(book.updatedAt).toBe(dateTest);
});
