import { Hono } from "hono";

const backendApp = new Hono().basePath("/api");

export default backendApp;
