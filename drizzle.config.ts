import type { Config } from 'drizzle-kit';
import 'dotenv/config';

const url = process.env.DATABASE_URL || 'file:./local.db';
const isTurso = url.startsWith('libsql://') || url.startsWith('wss://');

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'sqlite',
  ...(isTurso ? {
    driver: 'turso',
    dbCredentials: {
      url,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  } : {
    dbCredentials: { url },
  }),
} satisfies Config;
