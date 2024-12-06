import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: ["./app/**/*.sql.ts"],
  out: "./app/database/migrations/",
  dbCredentials: {
    host: Resource.sstartDatabase.host,
    port: Resource.sstartDatabase.port,
    user: Resource.sstartDatabase.username,
    password: Resource.sstartDatabase.password,
    database: Resource.sstartDatabase.database,
  },
});
