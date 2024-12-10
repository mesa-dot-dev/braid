import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getAuth, clerkClient } from "@clerk/tanstack-start/server";
import { getWebRequest } from "vinxi/http";
import { Resource } from "sst";
import { client } from "integrations/slack/client";
import { UserTable } from "@/database/schema.sql";
import { db } from "@/database/db";

const userInfo = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  if (!userId) throw redirect({ to: "/sign-in/$" });

  const clerk = await clerkClient({
    secretKey: Resource.ClerkSecretKey.value,
  });

  const accessTokens = (await clerk.users.getUserOauthAccessToken(userId!, "oauth_slack")).data;
  console.log(accessTokens);
  const token = accessTokens[0].token || "";
  const userInfo = await client.openid.connect.userInfo({
    token,
  });
  console.log(userInfo);
  const [savedUser] = await db
    .insert(UserTable)
    .values({
      id: userId,
      externalId: userInfo["https://slack.com/user_id"]!,
      email: userInfo.email!,
      name: userInfo.name!,
      avatarUrl: userInfo.picture,
    })
    .onConflictDoNothing()
    .returning();

  console.log(savedUser);
  throw redirect({ to: "/" });
});

export const Route = createFileRoute("/(authed)/signed-in")({
  loader: () => userInfo(),
});
