import {drizzle} from 'drizzle-orm/postgres-js'

import * as schema from '~/schema'
import postgres from "postgres";

export const tables = schema

export const db = drizzle(postgres({
    database: "postgres",
    user: "root",
    password: "password",
    host: "localhost"
}), {schema})

export type Kb = typeof schema.kb.$inferSelect
