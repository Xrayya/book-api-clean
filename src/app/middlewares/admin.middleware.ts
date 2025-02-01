import type { User } from "@domain/entities";
import { UserRole } from "@domain/enums";
import {
  AuthenticationException,
  AuthorizationException,
} from "@exceptions/Auth.exception";
import { createMiddleware } from "hono/factory";
import type { JwtPayload } from "jsonwebtoken";

export const verifyAdmin = createMiddleware(async (c, next) => {
  const authUser = c.get("authUser") as JwtPayload & {
    id: User["id"];
    name: User["name"];
    email: User["email"];
    role: User["role"];
  };

  if (!authUser) {
    throw new AuthenticationException("Please login first");
  }

  if (authUser.role !== UserRole.ADMIN) {
    throw new AuthorizationException("Only admin can access this route");
  }

  await next();
});
