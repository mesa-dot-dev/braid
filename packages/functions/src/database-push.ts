import { pushSchema } from 'drizzle-kit/api';
import { PgDatabase } from 'drizzle-orm/pg-core';
import { db, schema } from './drizzle';

export async function handler() {
  try {
    console.log('Starting DB Push');
    const result = await pushSchema(schema, db as unknown as PgDatabase<never>);

    if (result) await result?.apply();
    console.log('DB Push Successful');
  } catch (error) {
    console.error(error);
  }
}
