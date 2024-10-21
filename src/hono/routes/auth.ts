import { Hono } from "hono";

const authRoute = new Hono()
  .post("/login", (c) => {
    return c.json({ message: "Not yet implemented" });
  })
  .post("/register", (c) => {
    return c.json({ message: "Not yet implemented" });
  });

export default authRoute;
