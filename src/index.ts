import backendApp from "@app/app";

Bun.serve({
  fetch: backendApp.fetch
})
