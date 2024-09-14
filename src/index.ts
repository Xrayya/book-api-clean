import backendApp from "./app";

Bun.serve({
  fetch: backendApp.fetch
})
