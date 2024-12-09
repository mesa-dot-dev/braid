import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { Resource } from "sst";
import * as todoSchema from "./todo.sql";

export const schema = {
  ...todoSchema,
};

const pool = new pg.Pool({
  host: Resource.Database.host,
  port: Resource.Database.port,
  user: Resource.Database.username,
  password: Resource.Database.password,
  database: Resource.Database.database,
});

export const db = drizzle(pool, { schema });
