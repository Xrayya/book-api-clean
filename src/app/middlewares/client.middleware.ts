import type User from "@domain/entities/User.entity";
import UserRole from "@domain/enums/UserRole.enum";
import {
  AuthenticationException,
  AuthorizationException,
} from "@exceptions/Auth.exception";
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
    throw new AuthenticationException("Please login first");
  }

  if (authUser.role !== UserRole.CLIENT) {
    throw new AuthorizationException("Only client can access this route");
  }

  await next();
});
