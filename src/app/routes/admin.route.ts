import { adminService } from "@app/bootstrap";
import { verifyAdmin } from "@app/middlewares/admin.middleware";
import { verifyAuth } from "@app/middlewares/auth.middleware";
import { validateJsonRequest } from "@app/middlewares/validation.middleware";
import { suspensionSchema } from "@app/schemas/request/admin/suspension.schema";
import { Hono } from "hono";

export const adminRoute = new Hono()
  .use(verifyAuth)
  .use(verifyAdmin)
  .post("/suspend", ...validateJsonRequest(suspensionSchema), async (c) => {
    const { userId } = c.req.valid("json");
    const user = await adminService.suspendUser(userId);

    return c.json({ suspendedUser: user }, 200);
  })
  .post("/unsuspend", ...validateJsonRequest(suspensionSchema), async (c) => {
    const { userId } = c.req.valid("json");
    const user = await adminService.unsuspendUser(userId);

    return c.json({ unsuspendedUser: user }, 200);
  });
