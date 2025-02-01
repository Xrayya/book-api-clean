import {
  AuthenticationException,
  AuthorizationException,
} from "@exceptions/Auth.exception";
import {
  BookNotAvailableException,
  BookNotFoundException,
} from "@exceptions/Book.exception";
import { BorrowingNotFoundException } from "@exceptions/Borrowing.exception";
import { UserNotFoundException } from "@exceptions/User.exception";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { authRoute, booksRoute, borrowingRoute, userRoute } from "./routes";

const backendApp = new Hono().basePath("/api");

backendApp.use(logger());

backendApp.route("/auth", authRoute);
backendApp.route("/books", booksRoute);
backendApp.route("/books/borrowing", borrowingRoute);
backendApp.route("/user", userRoute);

backendApp.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      { error: { name: err.name, message: err.message } },
      err.status,
    );
  }

  if (err instanceof AuthenticationException) {
    return c.json({ error: { name: err.name, message: err.message } }, 401);
  }

  if (err instanceof AuthorizationException) {
    return c.json({ error: { name: err.name, message: err.message } }, 403);
  }

  if (err instanceof BookNotFoundException) {
    return c.json({ error: { name: err.name, message: err.message } }, 404);
  }

  if (err instanceof BookNotAvailableException) {
    return c.json({ error: { name: err.name, message: err.message } }, 400);
  }

  if (err instanceof BorrowingNotFoundException) {
    return c.json({ error: { name: err.name, message: err.message } }, 404);
  }

  if (err instanceof UserNotFoundException) {
    return c.json({ error: { name: err.name, message: err.message } }, 404);
  }

  return c.json({ message: "Internal Server Error" }, 500);
});

export default backendApp;
