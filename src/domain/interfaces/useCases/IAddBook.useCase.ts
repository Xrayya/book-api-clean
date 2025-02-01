import type { Book } from "@domain/entities";

export interface IAddBookUseCase {
  execute(
    title: Book["title"],
    author: Book["author"],
    ISBN: Book["ISBN"],
    publisher: Book["publisher"],
    publishedYear: Book["publishedYear"],
    category: Book["category"],
    edition: Book["edition"],
  ): Promise<Book>;
}
