import { bookCategoryCodeMapper } from "@/utils";
import backendApp from "@app/app";
import { Book } from "@domain/entities";
import { BookCategory } from "@domain/enums";
import { JWTTokenizer } from "@infrastructure/tokenizer/jwt.tokenizer";
import { PrismaClient } from "@prisma/client";
import { afterAll, beforeAll, describe, expect, test } from "bun:test";

const prisma = new PrismaClient();

let validToken: string;

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

let bookData: Book[];

describe("Auth routes", () => {
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

      console.log(books);

      bookData = books.map(({ categoryCode, ...rest }) => ({
        ...rest,
        category: bookCategoryCodeMapper(categoryCode),
      }));
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    try {
      await prisma.book.deleteMany({});
    } catch (error) { }
  });

  test("should return books correctly", async () => {
    const res = await backendApp.request("/api/books");

    const books = await res.json();

    expect(res.status).toBe(200);
    expect(books).toHaveProperty("books");
    expect(books.books).toBeArray();

    books.books.forEach((book: any) => {
      const expectedBook = bookData.find((b) => b.id === book.id);

      expect(book.id).toBe(expectedBook!.id);
      expect(book.title).toBe(expectedBook!.title);
      expect(book.author).toBe(expectedBook!.author);
      expect(book.ISBN).toBe(expectedBook!.ISBN);
      expect(book.publisher).toBe(expectedBook!.publisher);
      expect(book.publishedYear).toBe(expectedBook!.publishedYear);
      expect(book.category).toBe(expectedBook!.category);
      expect(book.edition).toBe(expectedBook!.edition);
      expect(book.available).toBe(expectedBook!.available);
      expect(new Date(book.createdAt).toISOString()).toBe(
        expectedBook!.createdAt.toISOString(),
      );
      expect(new Date(book.updatedAt).toISOString()).toBe(
        expectedBook!.updatedAt.toISOString(),
      );
    });
  });
});
