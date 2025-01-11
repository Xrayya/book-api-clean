import { borrowingService } from "@app/bootstrap";
import { validateJsonRequest } from "@app/middlewares/validation.middleware";
import { borrowSchema } from "@app/schemas/request/borrowing/borrow.schema";
import { returnSchema } from "@app/schemas/request/borrowing/return.schema";
import { Hono } from "hono";

export const borrowingRoute = new Hono()
  .basePath("/borrowing")
  .post("/", ...validateJsonRequest(borrowSchema), async (c) => {
    const { bookIds } = c.req.valid("json");
    const token = c.req.header("authorization");
    const borrowing = await borrowingService.borrowMany(token!, bookIds);

    return c.json({ borrowing }, 201);
  })
  .post("/return", ...validateJsonRequest(returnSchema), async (c) => {
    const { bookId } = c.req.valid("json");
    const token = c.req.header("authorization");
    const borrowing = await borrowingService.confirmReturn(token!, bookId);

    return c.json({ borrowing }, 201);
  });
