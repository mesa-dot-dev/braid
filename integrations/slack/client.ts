import { db } from "@/database/db";
import { SlackInstallationTable } from "@/database/schema.sql";
import { eq } from "drizzle-orm";
import { InstallProvider, Installation } from "@slack/oauth";
import { Resource } from "sst";
import { WebClient } from "@slack/web-api";

export const client = new WebClient();

export const installer = new InstallProvider({
  clientId: Resource.SlackClientId.value,
  clientSecret: Resource.SlackClientSecret.value,
  stateSecret: Resource.SlackSigningSecret.value,
  installationStore: {
    storeInstallation: async (installation) => {
      if (installation.isEnterpriseInstall) {
        throw new Error("Enterprise installations are not supported");
      }
      await db
        .insert(SlackInstallationTable)
        .values({
          teamId: installation.team!.id,
          teamName: installation.team!.name!,
          bot: {
            id: installation.bot!.id,
            token: installation.bot!.token,
            scopes: installation.bot!.scopes,
            userId: installation.bot!.userId,
          },
          incomingWebhook: {
            channel: installation.incomingWebhook!.channel!,
            channelId: installation.incomingWebhook!.channelId!,
            configurationUrl: installation.incomingWebhook!.configurationUrl!,
            url: installation.incomingWebhook!.url!,
          },
        })
        .onConflictDoNothing();
    },
    fetchInstallation: async (installQuery) => {
      if (!installQuery.teamId) {
        throw new Error("Team ID is required");
      }

      const [installation] = await db
        .select()
        .from(SlackInstallationTable)
        .where(eq(SlackInstallationTable.teamId, installQuery.teamId!));

      if (!installation) {
        throw new Error("Installation not found");
      }

      return {
        team: {
          id: installation.teamId,
          name: installation.teamName,
        },
        bot: {
          id: installation.bot.id,
          token: installation.bot.token,
          scopes: installation.bot.scopes,
          userId: installation.bot.userId,
        },
        incomingWebhook: installation.incomingWebhook,
        authVersion: "v2",
        isEnterpriseInstall: false,
      } as Installation<"v2", false>;
    },
    deleteInstallation: async (installQuery) => {
      if (!installQuery.teamId) {
        throw new Error("Team ID is required");
      }
      await db.delete(SlackInstallationTable).where(eq(SlackInstallationTable.teamId, installQuery.teamId!));
    },
  },
});
