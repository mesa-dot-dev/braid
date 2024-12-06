import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Resource } from "sst";
import { db } from "@/database/db";

export const auth = betterAuth({
  secret: Resource.BetterAuthSecret.value,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["https://*.cloudfront.net"],
  session: {
    cookieCache: {
      enabled: true,
    },
  },
});
