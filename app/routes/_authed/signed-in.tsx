import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getAuth, clerkClient } from "@clerk/tanstack-start/server";
import { getWebRequest } from "vinxi/http";
import { Resource } from "sst";
import { client } from "integrations/slack/client";
import { SlackInstallationTable, UserTable } from "@/database/schema.sql";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";

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

  const [existingInstallation] = await db
    .select({
      id: SlackInstallationTable.id,
    })
    .from(SlackInstallationTable)
    .where(eq(SlackInstallationTable.teamId, userInfo["https://slack.com/team_id"]!));

  if (!existingInstallation) {
    throw redirect({ to: "/slack/install" });
  }

  console.log(savedUser);
  throw redirect({ to: "/feed" });
});

export const Route = createFileRoute("/_authed/signed-in")({
  loader: () => userInfo(),
});
