import { KbInsert } from "~/server/utils/drizzle";

export default eventHandler(async (event) => {
  const { embedding, content } = await readBody<KbInsert>(event);
  return db.insert(tables.kb).values({ embedding, content });
});
