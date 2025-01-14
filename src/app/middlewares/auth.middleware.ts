import { tokenizer } from "@app/bootstrap";
import type User from "@domain/entities/User.entity";
import { AuthenticationException } from "@exceptions/Authentication.exception";
import { createMiddleware } from "hono/factory";
import type { JwtPayload } from "jsonwebtoken";

export const verifyAuth = createMiddleware<{
  Variables: {
    authUser: JwtPayload & {
      id: User["id"];
      name: User["name"];
      email: User["email"];
      role: User["role"];
    };
  };
}>(async (c, next) => {
  const token = c.req.header().authorization?.split(" ")[1];

  if (!token) {
    throw new AuthenticationException("Unauthorized");
  }

  const user = tokenizer.decode(token) as JwtPayload & {
    id: User["id"];
    name: User["name"];
    email: User["email"];
    role: User["role"];
  };

  c.set("authUser", user);
  await next();
});
