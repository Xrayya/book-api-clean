import type User from "@domain/entities/User.entity";
import UserRole from "@domain/enums/UserRole.enum";
import { AuthenticationException } from "@exceptions/Authentication.exception";
import { createMiddleware } from "hono/factory";
import type { JwtPayload } from "jsonwebtoken";

export const verifyAdmin = createMiddleware(async (c, next) => {
  if (!c.get("authUser")) {
    throw new AuthenticationException("Unauthorized");
  }

  const { role } = c.get("authUser") as JwtPayload & {
    id: User["id"];
    name: User["name"];
    email: User["email"];
    role: User["role"];
  };

  if (role !== UserRole.ADMIN) {
    throw new AuthenticationException("Unauthorized");
  }

  await next();
});
