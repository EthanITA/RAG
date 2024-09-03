import type { KbInsert, KbSelect } from "~/server/utils/drizzle";

export const useApi = defineStore("api", () => {
  return {
    createKb: (data: KbInsert) =>
      $fetch("/api/kb", {
        method: "POST",
        body: data,
      }),
    getKb: (embedding: KbSelect["embedding"]) =>
      $fetch("/api/kb/get", {
        method: "POST",
        body: embedding,
      }),
  };
});
