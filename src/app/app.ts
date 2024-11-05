import { Hono } from "hono";
import { authRoute, booksRoute } from "./routes";

const backendApp = new Hono().basePath("/api");

backendApp.route("/auth", authRoute);
backendApp.route("/books", booksRoute);

export default backendApp;
