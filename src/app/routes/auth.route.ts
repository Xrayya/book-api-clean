import { authService } from "@app/bootstrap";
import { Hono } from "hono";
import { validateJsonRequest } from "../middlewares/validation.middleware";
import { loginSchema } from "@app/schemas/request/auth/login.schema";
import { registerSchema } from "@app/schemas/request/auth/register.schema";
import { verifyAuth } from "@app/middlewares/auth.middleware";

export const authRoute = new Hono()
  .post("/login", ...validateJsonRequest(loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const { user, token } = await authService.login(email, password);

    return c.json({ user, token }, 200);
  })
  .post("/register", ...validateJsonRequest(registerSchema), async (c) => {
    const { username, email, password } = c.req.valid("json");
    const user = await authService.register(username, email, password);

    return c.json({ user }, 201);
  })
  .get("/logout", verifyAuth, async (c) => {
    const token = c.req.header().authorization?.split(" ")[1];
    const isLoggedOut = await authService.logout(token);

    return c.json({ isLoggedOut }, 200);
  });
