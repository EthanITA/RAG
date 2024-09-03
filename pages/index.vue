<script lang="ts" setup>
const text = ref<string>("");
const answer = ref<string>("");
const computing = ref(false);

const ai = useAI();
const api = useApi();

const chat = async () => {
  computing.value = true;
  answer.value = "";
  const embedding = await ai.embed(text.value);
  const kb = await api.getKb(embedding);
  const response = await ai.chat(
    text.value,
    kb.map((item) => item.content),
  );
  computing.value = false;
  for await (const part of response) answer.value += part.message.content;
};
</script>

<template>
  <div class="grid grid-rows-2 flex-1 overflow-hidden">
    <div class="section">
      <h2>Knowledge base</h2>
      <textarea v-model="text" class="h-full textarea textarea-primary" />
      <button class="btn btn-primary btn-sm" @click="chat">Chat</button>
    </div>
    <div class="section border overflow-hidden">
      <div v-if="computing" class="skeleton h-full w-full" />
      <div v-else-if="!answer" class="overflow-auto">{{ answer }}</div>
      <MDC v-else :value="answer" class="w-full max-w-full overflow-y-auto" />
    </div>
  </div>
</template>

<style scoped></style>
