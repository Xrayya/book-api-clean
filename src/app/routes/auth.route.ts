import { Hono } from "hono";
import { authService } from "../../adapter";
import { validateJsonRequest } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../schemas/request";

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
  });
