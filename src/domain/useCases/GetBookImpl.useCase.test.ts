import type Book from "@domain/entities/Book.entity";
import BookCategory from "@domain/enums/BookCategory.enum";
import type { IBookRepository } from "@domain/interfaces/repositories/IBook.repository";
import { describe, expect,  mock, test } from "bun:test";
import GetBookUseCaseImpl from "./GetBookImpl.useCase";

describe("GetBookUseCaseImpl", () => {
  test("should return a book when the repository successfully fetches it", async () => {
    const mockBook: Book = {
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
    };

    const mockBookRepository: IBookRepository = {
      get: mock().mockResolvedValue(mockBook),
      add: mock(),
      update: mock(),
      delete: mock(),
      getAll: mock(),
    };

    const useCase = new GetBookUseCaseImpl(mockBookRepository);

    const result = await useCase.execute(mockBook.id);

    expect(mockBookRepository.get).toHaveBeenCalledWith(mockBook.id);
    expect(result).toEqual(mockBook);
  });

  test("should throw an error when the repository fails", async () => {
    const mockError = new Error("Repository Error");

    const mockBookRepository: IBookRepository = {
      get: mock().mockRejectedValue(mockError),
      add: mock(),
      update: mock(),
      delete: mock(),
      getAll: mock(),
    };

    const useCase = new GetBookUseCaseImpl(mockBookRepository);

    expect(useCase.execute(1)).rejects.toThrow("Repository Error");
    expect(mockBookRepository.get).toHaveBeenCalledWith(1);
  });
});
