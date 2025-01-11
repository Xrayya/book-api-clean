import { bookService } from "@app/bootstrap";
import {
  validateRequest
} from "@app/middlewares/validation.middleware";
import { bookDetailsSchema } from "@app/schemas/request/books/bookDetails.schema";
import { Hono } from "hono";

export const booksRoute = new Hono()
  .basePath("/books")
  .get("/", async (c) => {
    const books = await bookService.getList();

    return c.json({ books }, 200);
  })
  .get("/:id", ...validateRequest(bookDetailsSchema), async (c) => {
    const id = parseInt(c.req.valid("param").id);
    const book = await bookService.get(id);

    return c.json({ book }, 200);
  });
