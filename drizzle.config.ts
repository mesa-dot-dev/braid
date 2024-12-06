import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: ["./app/**/*.sql.ts"],
  out: "./app/database/migrations/",
  dbCredentials: {
    host: Resource.braidDatabase.host,
    port: Resource.braidDatabase.port,
    user: Resource.braidDatabase.username,
    password: Resource.braidDatabase.password,
    database: Resource.braidDatabase.database,
  },
});
