import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

export const useDb = defineStore("db", () => {
  const client = postgres({
    database: "postgres",
    user: "root",
    password: "password",
    host: "localhost",
  });
  const db = drizzle(client);
  return {
    db,
  };
});
