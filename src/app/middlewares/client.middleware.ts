import type User from "@domain/entities/User.entity";
import UserRole from "@domain/enums/UserRole.enum";
import { AuthenticationException } from "@exceptions/Authentication.exception";
import { createMiddleware } from "hono/factory";
import type { JwtPayload } from "jsonwebtoken";

export const verifyClient = createMiddleware(async (c, next) => {
  const authUser = c.get("authUser") as JwtPayload & {
    id: User["id"];
    name: User["name"];
    email: User["email"];
    role: User["role"];
  };

  if (!authUser) {
    throw new AuthenticationException("Unauthorized");
  }

  if (authUser.role !== UserRole.CLIENT) {
    throw new AuthenticationException("Unauthorized, only client can access this route");
  }

  await next();
})
