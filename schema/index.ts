import { pgTable, serial, text, vector } from "drizzle-orm/pg-core";

export const kb = pgTable("kb", {
    id: serial('id'),
    content:text('content'),
    embedding: vector('embedding', {
        dimensions: 1024
    })
});

