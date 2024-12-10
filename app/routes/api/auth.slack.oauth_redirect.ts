import { redirect } from "@tanstack/react-router";
import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { sendRedirect } from "vinxi/http";

export const Route = createAPIFileRoute("/api/auth/slack/oauth_redirect")({
  GET: ({ request, params }) => {
    console.log("GET /api/auth/slack/oauth_redirect");
    console.log(request);
    console.log(params);
    console.log(new URL(request.url).searchParams);
    // sendRedirect("http://localhost:3000/", 301);
    // return new Response(null);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "http://localhost:3000/",
      },
    });
    // return json({ message: 'Hello "/api/auth/slack"!' });
  },
});
