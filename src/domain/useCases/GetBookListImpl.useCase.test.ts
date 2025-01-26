import type Book from "@domain/entities/Book.entity";
import BookCategory from "@domain/enums/BookCategory.enum";
import type { IBookRepository } from "@domain/interfaces/repositories/IBook.repository";
import { describe, expect, mock, test } from "bun:test";
import GetBookListUseCaseImpl from "./GetBookListImpl.useCase";

describe("GetBookListUseCaseImpl", () => {
  test("should return a list of books when the repository successfully fetches them", async () => {
    const mockBook: Book[] = [
      {
        id: 1,
        title: "Test Book",
        author: "John Doe",
        ISBN: "123-456-789",
        publisher: "Test Publisher",
        publishedYear: 2021,
        category: BookCategory.GENERAL_WORK,
        edition: 1,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "Test Book2",
        author: "Doe John",
        ISBN: "987-654-321",
        publisher: "Test Publisher2",
        publishedYear: 2020,
        category: BookCategory.LANGUAGE,
        edition: 2,
        available: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const mockBookRepository: IBookRepository = {
      get: mock(),
      add: mock(),
      update: mock(),
      delete: mock(),
      getAll: mock().mockResolvedValue(mockBook),
    };

    const useCase = new GetBookListUseCaseImpl(mockBookRepository);

    const result = await useCase.execute();

    expect(mockBookRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual(mockBook);
  });

  test("should throw an error when the repository fails", async () => {
    const mockError = new Error("Repository Error");

    const mockBookRepository: IBookRepository = {
      get: mock(),
      add: mock(),
      update: mock(),
      delete: mock(),
      getAll: mock().mockRejectedValue(mockError),
    };

    const useCase = new GetBookListUseCaseImpl(mockBookRepository);

    expect(useCase.execute()).rejects.toThrow("Repository Error");
    expect(mockBookRepository.getAll).toHaveBeenCalled();
  });
});
