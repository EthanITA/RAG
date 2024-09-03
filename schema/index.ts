import { index, pgTable, serial, text, vector } from "drizzle-orm/pg-core";

export const kb = pgTable(
  "kb",
  {
    id: serial("id"),
    content: text("content").notNull(),
    embedding: vector("embedding", {
      dimensions: 1024,
    }).notNull(),
  },
  (table) => ({
    embeddingIndex: index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
  }),
);
