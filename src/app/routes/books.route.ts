import { Hono } from "hono";
import { validateRequest } from "../middlewares/validation.middleware";
import { getBooksSchema } from "../schemas/request/book/books.schema";
import { bookService } from "../../adapter";

export const booksRoute = new Hono().get(
  "/",
  ...validateRequest(getBooksSchema),
  async (c) => {
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

    const res = await bookService.getAllBooks(available == "true");

    return c.json(
      {
        books: res,
      },
      200,
    );
  },
);
