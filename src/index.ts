import backendApp from "./hono/app";

Bun.serve({
  fetch: backendApp.fetch
})
