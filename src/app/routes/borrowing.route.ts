import { borrowingService } from "@app/bootstrap";
import {
  validateJsonRequest,
  verifyAdmin,
  verifyAuth,
  verifyClient,
} from "@app/middlewares";
import { borrowSchema, returnSchema } from "@app/schemas/request/borrowing";
import { Hono } from "hono";

export const borrowingRoute = new Hono()
  .use(verifyAuth)
  .post("/", verifyClient, ...validateJsonRequest(borrowSchema), async (c) => {
    const { bookIds } = c.req.valid("json");
    const { id } = c.get("authUser");

    const borrowings = await borrowingService.borrowMany(id, bookIds);

    return c.json({ borrowedBooks: borrowings }, 201);
  })
  .post(
    "/return",
    verifyAdmin,
    ...validateJsonRequest(returnSchema),
    async (c) => {
      const { bookId } = c.req.valid("json");
      const { id } = c.get("authUser");
      const borrowing = await borrowingService.confirmReturn(id, bookId);

      return c.json({ returnedBook: borrowing }, 200);
    },
  );
