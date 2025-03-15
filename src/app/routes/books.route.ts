import { bookCategoryCodeMapper } from "@/utils";
import { bookService } from "@app/bootstrap";
import {
  validateJsonRequest,
  validateRequest,
  verifyAdmin,
} from "@app/middlewares";
import {
  addBookSchema,
  bookDetailsSchema,
  getBooksSchema,
} from "@app/schemas/request/books";
import { Hono } from "hono";

export const booksRoute = new Hono()
  .get("/", ...validateRequest(getBooksSchema), async (c) => {
    const {
      search,
      available,
      category,
      publishedYearStart,
      publishedYearEnd,
    } = c.req.valid("query");

    if (
      search ||
      available ||
      category ||
      publishedYearStart ||
      publishedYearEnd
    ) {
      const books = await bookService.search(search, {
        availability:
          available === "true"
            ? true
            : available === "false"
              ? false
              : undefined,
        cateogory: category ? bookCategoryCodeMapper(category) : undefined,
        publishedYearRange: {
          start: publishedYearStart ? parseInt(publishedYearStart) : undefined,
          end: publishedYearEnd ? parseInt(publishedYearEnd) : undefined,
        },
      });

      return c.json({ books }, 200);
    }

    const books = await bookService.getList();

    return c.json({ books }, 200);
  })
  .get("/:id", ...validateRequest(bookDetailsSchema), async (c) => {
    const id = parseInt(c.req.valid("param").id);
    const book = await bookService.get(id);

    return c.json({ book }, 200);
  })
  .post("/", verifyAdmin, ...validateJsonRequest(addBookSchema), async (c) => {
    const { title, author, category, publishedYear, ISBN, edition, publisher } =
      c.req.valid("json");
    const book = await bookService.add(
      title,
      author,
      ISBN,
      publisher,
      publishedYear,
      category,
      edition,
    );

    return c.json({ book }, 201);
  });
