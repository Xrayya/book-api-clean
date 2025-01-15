import { borrowingService } from "@app/bootstrap";
import { verifyAdmin } from "@app/middlewares/admin.middleware";
import { verifyAuth } from "@app/middlewares/auth.middleware";
import { verifyClient } from "@app/middlewares/client.middleware";
import { validateJsonRequest } from "@app/middlewares/validation.middleware";
import { borrowSchema } from "@app/schemas/request/borrowing/borrow.schema";
import { returnSchema } from "@app/schemas/request/borrowing/return.schema";
import { Hono } from "hono";

export const borrowingRoute = new Hono()
  .use(verifyAuth)
  .post("/", verifyClient, ...validateJsonRequest(borrowSchema), async (c) => {
    const { bookIds } = c.req.valid("json");
    const { id } = c.get("authUser");
    const borrowing = await borrowingService.borrowMany(id, bookIds);

    return c.json({ borrowedBooks: borrowing }, 201);
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
