import { authorizer, createSubjects } from "@openauthjs/openauth";
import { handle } from "hono/aws-lambda";
import { Resource } from "sst";
import { object, string } from "valibot";
import { Oauth2Adapter, Oauth2WrappedConfig } from "@openauthjs/openauth/adapter/oauth2";
import { client } from "integrations/slack/client";

export function SlackAdapter(config: Oauth2WrappedConfig) {
  return Oauth2Adapter({
    ...config,
    type: "slack",
    endpoint: {
      authorization: "https://slack.com/openid/connect/authorize",
      token: "https://slack.com/api/openid.connect.token",
    },
  });
}

const app = authorizer({
  subjects: createSubjects({
    user: object({
      email: string(),
      teamId: string(),
    }),
  }),
  providers: {
    slack: SlackAdapter({
      clientID: Resource.SlackClientId.value,
      clientSecret: Resource.SlackClientSecret.value,
      scopes: ["email", "profile", "openid"],
    }),
  },
  success: async (ctx, value) => {
    if (value.provider === "slack") {
      const token = value.tokenset.access;
      const user = await client.openid.connect.userInfo({
        token,
      });
      console.log(user);
      return ctx.subject("user", {
        email: user.email!,
        teamId: user["https://slack.com/team_id"]!,
      });
    }
    throw new Error("Invalid provider");
  },
});

// @ts-ignore
export const handler = handle(app);
