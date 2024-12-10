import { createFileRoute, redirect } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { AppNavbar } from "@/components/app-navbar";
import { useAuth } from "@clerk/tanstack-start";
import { createServerFn } from "@tanstack/start";
import { getWebRequest } from "vinxi/http";
import { getAuth } from "@clerk/tanstack-start/server";
import { clerkClient } from "@clerk/tanstack-start/server";
import { Resource } from "sst";
import { client } from "integrations/slack/client";
import { eq } from "drizzle-orm";
import { db } from "@/database/db";
import { SlackInstallationTable } from "@/database/schema.sql";

const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());
  if (!userId) throw redirect({ to: "/sign-in/$" });
  const clerk = await clerkClient({
    secretKey: Resource.ClerkSecretKey.value,
  });
  const accessTokens = (await clerk.users.getUserOauthAccessToken(userId!, "oauth_slack")).data;
  const token = accessTokens[0].token || "";
  const userInfo = await client.openid.connect.userInfo({
    token,
  });
  const [installation] = await db
    .select({ id: SlackInstallationTable.id })
    .from(SlackInstallationTable)
    .where(eq(SlackInstallationTable.teamId, userInfo["https://slack.com/team_id"]!));
  return { userId, teamId: userInfo["https://slack.com/team_id"]!, installationId: installation!.id };
});

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
  beforeLoad: async () => await getUser(),
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh">
      <AppNavbar />
      <div className="flex flex-1 flex-col pt-16">
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
