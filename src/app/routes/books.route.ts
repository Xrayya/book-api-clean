import { Hono } from "hono";
import { bookService } from "../../adapter";
import { validateRequest } from "../middlewares/validation.middleware";
import { bookDetailsSchema } from "../schemas/request/books/bookDetails.schema";
import { getBooksSchema } from "../schemas/request/books/books.schema";

export const booksRoute = new Hono()
  .get("/", ...validateRequest(getBooksSchema), async (c) => {
    const {
      search,
      title,
      titleStartWith,
      titleEndWith,
      ISBN,
      publisher,
      category,
      edition,
      sortBy,
      available,
    } = c.req.valid("query");

    // TODO: Implement the logic to get books by the given parameters using bookService.getBookByParams

    const books = await bookService.getAllBooks(available == "true");

    return c.json(
      {
        books,
      },
      200,
    );
  })
  .get("/:id/details", ...validateRequest(bookDetailsSchema), async (c) => {
    const { id } = c.req.valid("param");

    const { id: bookId, ...bookData } = await bookService.getBookInfoById(
      parseInt(id),
    );

    return c.json(
      {
        bookId,
        bookData,
      },
      200,
    );
  });
