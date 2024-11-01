import { Hono } from "hono";
import { authService } from "../../adapter";
import { validateJsonRequest } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../schema/request";

const authRoute = new Hono()
  .post("/login", ...validateJsonRequest(loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const { user, token } = await authService.login(email, password);

    // WARNING: This is a security issue, do not return the password in the response
    // INFO: One of the possibility is refactor the repository, so the password is not returned
    return c.json({ user, token }, 200);
  })
  .post("/register", ...validateJsonRequest(registerSchema), (c) => {
    const { username, email, password } = c.req.valid("json");
    const user = authService.register(username, email, password);

    // WARNING: This is a security issue, do not return the password in the response
    // INFO: One of the possibility is refactor the repository, so the password is not returned
    return c.json({ user }, 201);
  });

export default authRoute;
