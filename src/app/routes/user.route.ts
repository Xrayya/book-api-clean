import { userService } from "@app/bootstrap";
import { verifyAdmin } from "@app/middlewares/admin.middleware";
import { verifyAuth } from "@app/middlewares/auth.middleware";
import { validateJsonRequest } from "@app/middlewares/validation.middleware";
import { suspensionSchema } from "@app/schemas/request/admin/suspension.schema";
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
