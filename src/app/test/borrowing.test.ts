import { bookCategoryCodeMapper } from "@/utils";
import backendApp from "@app/app";
import { authService } from "@app/bootstrap";
import type { BorrowedBook } from "@app/services/Borrowing.service";
import { Book } from "@domain/entities";
import { BookCategory } from "@domain/enums";
import { PrismaClient } from "@prisma/client";
import { afterAll, beforeAll, describe, expect, test } from "bun:test";

const prisma = new PrismaClient();

let bookData: Book[] = [];

let borrowingData: BorrowedBook[] = [];

const mockBooks: Book[] = [
  new Book(
    1,
    "The Great Gatsby",
    "F. Scott Fitzgerald",
    "9780743273565",
    "Scribner",
    1925,
    BookCategory.ARTS_AND_RECREATION,
    1,
    true,
    new Date("2023-01-01"),
    new Date("2023-01-01"),
  ),
  new Book(
    2,
    "To Kill a Mockingbird",
    "Harper Lee",
    "9780061120084",
    "J.B. Lippincott & Co.",
    1960,
    BookCategory.LITERATURE,
    1,
    true,
    new Date("2023-01-02"),
    new Date("2023-01-02"),
  ),
  new Book(
    3,
    "1984",
    "George Orwell",
    "9780451524935",
    "Secker & Warburg",
    1949,
    BookCategory.SOCIAL_SCIENCES,
    1,
    true,
    new Date("2023-01-03"),
    new Date("2023-01-03"),
  ),
  new Book(
    4,
    "Pride and Prejudice",
    "Jane Austen",
    "9781503290563",
    "T. Egerton",
    1813,
    BookCategory.ARTS_AND_RECREATION,
    1,
    true,
    new Date("2023-01-04"),
    new Date("2023-01-04"),
  ),
  new Book(
    5,
    "The Catcher in the Rye",
    "J.D. Salinger",
    "9780316769488",
    "Little, Brown and Company",
    1951,
    BookCategory.PHILOSOPHY_AND_PSYCHOLOGY,
    1,
    true,
    new Date("2023-01-05"),
    new Date("2023-01-05"),
  ),
  new Book(
    6,
    "The Hobbit",
    "J.R.R. Tolkien",
    "9780547928227",
    "George Allen & Unwin",
    1937,
    BookCategory.TECHNOLOGY_AND_APPLIED_SCIENCES,
    1,
    true,
    new Date("2023-01-06"),
    new Date("2023-01-06"),
  ),
  new Book(
    7,
    "Moby-Dick",
    "Herman Melville",
    "9781503280786",
    "Harper & Brothers",
    1851,
    BookCategory.GENERAL_WORK,
    1,
    true,
    new Date("2023-01-07"),
    new Date("2023-01-07"),
  ),
  new Book(
    8,
    "War and Peace",
    "Leo Tolstoy",
    "9780199232765",
    "The Russian Messenger",
    1869,
    BookCategory.SOCIAL_SCIENCES,
    1,
    true,
    new Date("2023-01-08"),
    new Date("2023-01-08"),
  ),
  new Book(
    9,
    "The Odyssey",
    "Homer",
    "9780140268867",
    "Penguin Classics",
    -800,
    BookCategory.LANGUAGE,
    1,
    true,
    new Date("2023-01-09"),
    new Date("2023-01-09"),
  ),
  new Book(
    10,
    "Crime and Punishment",
    "Fyodor Dostoevsky",
    "9780143058144",
    "The Russian Messenger",
    1866,
    BookCategory.ARTS_AND_RECREATION,
    1,
    true,
    new Date("2023-01-10"),
    new Date("2023-01-10"),
  ),
];

describe("Borrowing routes", () => {
  beforeAll(async () => {
    try {
      await prisma.bookCategory.createMany({
        data: [
          { code: BookCategory.GENERAL_WORK, name: "General Works" },
          {
            code: BookCategory.PHILOSOPHY_AND_PSYCHOLOGY,
            name: "Philosophy and Psychology",
          },
          { code: BookCategory.RELIGION, name: "Religion" },
          { code: BookCategory.SOCIAL_SCIENCES, name: "Social Sciences" },
          { code: BookCategory.LANGUAGE, name: "Language" },
          {
            code: BookCategory.NATUAL_SCIENCES_AND_MATHEMATICS,
            name: "Natural Sciences and Mathematics",
          },
          {
            code: BookCategory.TECHNOLOGY_AND_APPLIED_SCIENCES,
            name: "Technology and Applied Sciences",
          },
          {
            code: BookCategory.ARTS_AND_RECREATION,
            name: "Arts and Recreation",
          },
          { code: BookCategory.LITERATURE, name: "Literature" },
          {
            code: BookCategory.HISTORY_AND_GEOGRAPHY,
            name: "History and Geography",
          },
        ],
      });
    } catch (error) { }

    try {
      const books = await prisma.book.createManyAndReturn({
        data: mockBooks.map(
          ({
            title,
            author,
            ISBN,
            publisher,
            publishedYear,
            category,
            edition,
            available,
          }) => ({
            title,
            author,
            ISBN,
            publisher,
            publishedYear,
            categoryCode: category,
            edition,
            available,
          }),
        ),
      });

      bookData = books.map(({ categoryCode, ...rest }) => ({
        ...rest,
        category: bookCategoryCodeMapper(categoryCode),
      }));
    } catch (error) { }

    try {
      await prisma.user.delete({
        where: { email: "uniquetestemailuser209384091903810923@example.com" },
      });
    } catch (error) { }

    try {
      await authService.register(
        "uniquetest",
        "uniquetestemailuser209384091903810923@example.com",
        "Password01",
      );
    } catch (error) { }

    try {
      await prisma.user.create({
        data: {
          email: "uniquetestemailadmin1743337516512@example2.com",
          name: "uniquetestadmin",
          password: "Password01",
          role: "ADMIN",
        },
      });
    } catch (error) { }
  });

  afterAll(async () => {
    try {
      await prisma.borrowing.deleteMany({});
    } catch (error) { }

    try {
      await prisma.book.deleteMany({});
    } catch (error) { }

    try {
      await prisma.bookCategory.deleteMany({});
    } catch (error) { }

    try {
      await prisma.user.delete({
        where: { email: "uniquetestemailadmin1743337516512@example2.com" },
      });
    } catch (error) { }

    try {
      await prisma.user.delete({
        where: { email: "uniquetestemailuser209384091903810923@example.com" },
      });
    } catch (error) { }
  });

  test("should return borrowed books correctly", async () => {
    const {
      token,
      user: { id: userId, name: userName, email: userEmail },
    } = await authService.login(
      "uniquetestemailuser209384091903810923@example.com",
      "Password01",
    );

    let randomIdx1 = Math.floor(Math.random() * (bookData.length - 1));
    let randomIdx2: number;
    let randomIdx3: number;

    do {
      randomIdx2 = Math.floor(Math.random() * (bookData.length - 1));
    } while (randomIdx1 === randomIdx2);

    do {
      randomIdx3 = Math.floor(Math.random() * (bookData.length - 1));
    } while (randomIdx3 === randomIdx2 && randomIdx3 === randomIdx1);

    const res = await backendApp.request("/api/books/borrowing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookIds: [
          bookData[randomIdx1].id,
          bookData[randomIdx2].id,
          bookData[randomIdx3].id,
        ],
      }),
    });

    const resJson = await res.json();

    borrowingData = resJson.borrowedBooks;

    expect(res.status).toBe(201);
    expect(resJson).toHaveProperty("borrowedBooks");
    expect(resJson.borrowedBooks).toBeArray();

    resJson.borrowedBooks.forEach((borrowedBook: any) => {
      expect(borrowedBook).toHaveProperty("bookId");

      const expectedBook = bookData.find((b) => b.id === borrowedBook.bookId);

      expect(borrowedBook).toHaveProperty("borrower");
      expect(borrowedBook).toBeObject();
      expect(borrowedBook.borrower).toHaveProperty("userId");
      expect(borrowedBook.borrower.userId).toBe(userId);
      expect(borrowedBook.borrower).toHaveProperty("userEmail");
      expect(borrowedBook.borrower.userEmail).toBe(userEmail);
      expect(borrowedBook.borrower).toHaveProperty("userName");
      expect(borrowedBook.borrower.userName).toBe(userName);

      expect(borrowedBook).toHaveProperty("category");
      expect(borrowedBook.category).toBe(expectedBook!.category);
      expect(borrowedBook).toHaveProperty("title");
      expect(borrowedBook.title).toBe(expectedBook!.title);
      expect(borrowedBook).toHaveProperty("author");
      expect(borrowedBook.author).toBe(expectedBook!.author);
      expect(borrowedBook).toHaveProperty("ISBN");
      expect(borrowedBook.ISBN).toBe(expectedBook!.ISBN);
      expect(borrowedBook).toHaveProperty("publisher");
      expect(borrowedBook.publisher).toBe(expectedBook!.publisher);
      expect(borrowedBook).toHaveProperty("publishedYear");
      expect(borrowedBook.publishedYear).toBe(expectedBook!.publishedYear);
      expect(borrowedBook).toHaveProperty("edition");
      expect(borrowedBook.edition).toBe(expectedBook!.edition);
      expect(borrowedBook).toHaveProperty("createdAt");
      expect(Date.parse(borrowedBook.createdAt)).not.toBeNaN();
      expect(borrowedBook).toHaveProperty("updatedAt");
      expect(Date.parse(borrowedBook.updatedAt)).not.toBeNaN();
      expect(borrowedBook).toHaveProperty("borrowDate");
      expect(Date.parse(borrowedBook.borrowDate)).not.toBeNaN();
      expect(borrowedBook).toHaveProperty("returnDate");
    });
  });

  test("should return returned book info correctly", async () => {
    const {
      token,
      user: { id: userId, name: userName, email: userEmail },
    } = await authService.login(
      "uniquetestemailadmin1743337516512@example2.com",
      "Password01",
    );

    for (const borrowing of borrowingData) {
      const res = await backendApp.request("/api/books/borrowing/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: borrowing.bookId,
          clientId: borrowing.borrower.userId,
        }),
      });

      const resJson = await res.json();

      expect(res.status).toBe(200);
      expect(resJson).toHaveProperty("returnedBook");
      expect(resJson.returnedBook).toBeObject();

      expect(resJson.returnedBook).toHaveProperty("bookId");

      expect(resJson.returnedBook).toHaveProperty("borrower");
      expect(resJson.returnedBook).toBeObject();

      expect(resJson.returnedBook.borrower).toHaveProperty("userId");
      expect(resJson.returnedBook.borrower.userId).toBe(
        borrowing.borrower.userId,
      );
      expect(resJson.returnedBook.borrower).toHaveProperty("userEmail");
      expect(resJson.returnedBook.borrower.userEmail).toBe(
        borrowing.borrower.userEmail,
      );
      expect(resJson.returnedBook.borrower).toHaveProperty("userName");
      expect(resJson.returnedBook.borrower.userName).toBe(
        borrowing.borrower.userName,
      );

      expect(resJson.returnedBook).toHaveProperty("category");
      expect(resJson.returnedBook.category).toBe(borrowing.category);
      expect(resJson.returnedBook).toHaveProperty("title");
      expect(resJson.returnedBook.title).toBe(borrowing.title);
      expect(resJson.returnedBook).toHaveProperty("author");
      expect(resJson.returnedBook.author).toBe(borrowing.author);
      expect(resJson.returnedBook).toHaveProperty("ISBN");
      expect(resJson.returnedBook.ISBN).toBe(borrowing.ISBN);
      expect(resJson.returnedBook).toHaveProperty("publisher");
      expect(resJson.returnedBook.publisher).toBe(borrowing.publisher);
      expect(resJson.returnedBook).toHaveProperty("publishedYear");
      expect(resJson.returnedBook.publishedYear).toBe(borrowing.publishedYear);
      expect(resJson.returnedBook).toHaveProperty("edition");
      expect(resJson.returnedBook.edition).toBe(borrowing.edition);
      expect(resJson.returnedBook).toHaveProperty("createdAt");
      expect(Date.parse(resJson.returnedBook.createdAt)).not.toBeNaN();
      expect(resJson.returnedBook).toHaveProperty("updatedAt");
      expect(Date.parse(resJson.returnedBook.updatedAt)).not.toBeNaN();
      expect(resJson.returnedBook).toHaveProperty("borrowDate");
      expect(Date.parse(resJson.returnedBook.borrowDate)).not.toBeNaN();
      expect(resJson.returnedBook).toHaveProperty("returnDate");
      expect(Date.parse(resJson.returnedBook.returnDate)).not.toBeNaN();
    }
  });
});
