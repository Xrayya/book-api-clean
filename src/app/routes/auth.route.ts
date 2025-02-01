import { authService } from "@app/bootstrap";
import { validateJsonRequest, verifyAuth } from "@app/middlewares";
import { loginSchema, registerSchema } from "@app/schemas/request/auth";
import { Hono } from "hono";

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
