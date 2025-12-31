import { drizzle } from 'drizzle-orm/postgres-js';
import { Pool } from 'pg';
import { env } from '../config/env.js';
import * as schema from './schema.js';

if (!env.DB_URL) {
    throw new Error('Database URL is not defined in environment variables');
}

const pool = new Pool({
    connectionString: env.DB_URL,
});


pool.connect().then(() => {
    console.log('Connected to the database successfully');
}).catch((err) => {
    console.error('Error connecting to the database', err);
});

export const db = drizzle({ client: pool, schema });