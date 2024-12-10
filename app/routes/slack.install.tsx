import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { userScopes } from "integrations/slack/client";
import { scopes } from "integrations/slack/client";
import { useEffect } from "react";
import { Resource } from "sst";

const installationUrl = createServerFn({ method: "GET" }).handler(async () => {
  const params = new URLSearchParams({
    client_id: Resource.SlackClientId.value,
    scope: scopes.join(","),
    user_scope: userScopes.join(","),
    redirect_uri:
      "https://pjhqiendzsqsqjb64jzome2c6u0tfdnx.lambda-url.us-east-1.on.aws/api/auth/slack/oauth_redirect",
  });

  return `https://slack.com/oauth/v2/authorize?${params.toString()}`;
});
export const Route = createFileRoute("/slack/install")({
  component: () => {
    useEffect(() => {
      installationUrl().then((url) => {
        window.location.href = url;
      });
    }, []);
  },
});
