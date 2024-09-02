<template>
  <div class="size-full grid grid-cols-2 grid-rows-2 overflow-hidden">
    <div class="section">
      <h2>Knowledge base</h2>
      <textarea v-model="text" class="h-full textarea textarea-primary" />
      <button
        :class="{
          'btn-disabled': tokens.length < 3 || tokens.length - 2 > 8193,
        }"
        class="btn btn-primary btn-sm"
        @click="embed"
      >
        Embed
      </button>
    </div>
    <div class="section border">
      <h2>Tokens {{ tokens.length - 2 }}</h2>
      <div class="overflow-auto flex-1">{{ tokens }}</div>
    </div>
    <div class="section col-span-full border">
      <h2>Embedding {{ embeddings.length }}</h2>
      <div class="overflow-auto">{{ embeddings }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const text = ref("");
const tokens = ref<string[]>([]);
const embeddings = ref<number[][]>([]);

const ai = useAI();

watch(text, () => {
  tokens.value = ai.tokenize(text.value);
});

const embed = () =>
  ai.embed(text.value).then((res) => {
    embeddings.value = res;
  });
</script>
<style scoped>
.section {
  @apply flex flex-col gap-2 p-2;
}
</style>
