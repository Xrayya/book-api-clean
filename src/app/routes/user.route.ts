import { userService } from "@app/bootstrap";
import { validateJsonRequest, verifyAdmin, verifyAuth } from "@app/middlewares";
import { suspensionSchema } from "@app/schemas/request/user";
import { Hono } from "hono";

export const userRoute = new Hono()
  .use(verifyAuth)
  .post(
    "/suspend",
    verifyAdmin,
    ...validateJsonRequest(suspensionSchema),
    async (c) => {
      const { userId } = c.req.valid("json");
      const user = await userService.suspendUser(userId);

      return c.json({ suspendedUser: user }, 200);
    },
  )
  .post(
    "/unsuspend",
    verifyAdmin,
    ...validateJsonRequest(suspensionSchema),
    async (c) => {
      const { userId } = c.req.valid("json");
      const user = await userService.unsuspendUser(userId);

      return c.json({ unsuspendedUser: user }, 200);
    },
  );
