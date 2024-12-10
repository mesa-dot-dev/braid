import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { trimTrailingSlash } from "hono/trailing-slash";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { client } from "integrations/slack/client";
import { Resource } from "sst";
import { RedirectStatusCode, StatusCode } from "hono/utils/http-status";

const routes = new Hono()
  // .all("*", async (c) => {
  //   const url = `http://localhost:3000${c.req.path}?${new URLSearchParams(c.req.query()).toString()}`;
  //   const res = await fetch(url, {
  //     method: c.req.method,
  //     headers: c.req.raw.headers,
  //     body: c.req.raw.body,
  //   });

  //   // Handle redirects by returning redirect response
  //   if (res.status >= 300 && res.status < 400) {
  //     const location = res.headers.get("Location");
  //     if (location) {
  //       return c.redirect(location, res.status as RedirectStatusCode);
  //     }
  //   }

  //   const body = await res.arrayBuffer();
  //   return c.body(body, res.status as StatusCode, Object.fromEntries(res.headers.entries()));
  // })
  .get(
    "/auth/slack/oauth_redirect",
    zValidator("query", z.object({ code: z.string(), state: z.string().optional() })),
    async (c) => {
      const { code } = c.req.valid("query");
      console.log(code);
      const response = await client.oauth.v2.access({
        code: code,
        client_id: Resource.SlackClientId.value,
        client_secret: Resource.SlackClientSecret.value,
        redirect_uri:
          "https://b4bd5w7k5n3jqfd4cxqxvpyhum0jyojq.lambda-url.us-east-1.on.aws/api/auth/slack/oauth_redirect",
      });

      // return c.json(response);
      return c.redirect("http://localhost:3000/");
    },
  );

const api = new Hono()
  .use(trimTrailingSlash())
  .route("/api", routes)
  .get("/ping", async (c) => {
    console.log("ping");
    return c.body("pong");
  });

export type ApiRoutes = typeof routes;
export const handler = handle(api);
