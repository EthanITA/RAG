import { KbInsert } from "~/server/utils/drizzle";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";

export default eventHandler(async (event) => {
  const embedding = await readBody<KbInsert["embedding"]>(event);
  const similarity = sql<number>`1 - (${cosineDistance(tables.kb.embedding, embedding)})`;
  return db
    .select({
      content: tables.kb.content,
      similarity,
    })
    .from(tables.kb)
    .where(gt(similarity, 0.4))
    .orderBy((kb) => desc(kb.similarity));
});
