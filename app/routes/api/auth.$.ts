import { createAPIFileRoute } from "@tanstack/start/api";
import { auth } from "@/features/auth/lib/auth";

export const Route = createAPIFileRoute("/api/auth/$")({
  GET: ({ request }) => {
    return auth.handler(request);
  },
  POST: ({ request }) => {
    return auth.handler(request);
  },
});
