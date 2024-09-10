<script lang="ts" setup>
const open = ref(false);
const computing = ref(false);
const text = ref<string>("");
const finished = ref(true);
const chat = useChat();
const answer = ref<string>("");

const ai = useAI();
const api = useApi();

const sendQuestion = async () => {
  computing.value = true;
  finished.value = false;
  chat.addMessage(text.value);
  const question = text.value;
  text.value = "";
  const embedding = await ai.embed(question);
  const kb = await api.getKb(embedding);
  const response = await ai.chat(
    question,
    kb.map((item) => item.content),
  );
  computing.value = false;
  for await (const part of response) answer.value += part.message.content;
  finished.value = true;
  chat.addMessage(answer.value);
  answer.value = "";
};
</script>

<template>
  <button
    class="fixed right-4 bottom-4 btn btn-circle btn-primary"
    @click="open = !open"
  >
    <svg
      class="size-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z"
      />
      <path
        d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z"
      />
    </svg>
  </button>
  <div
    v-show="open"
    class="fixed right-4 bottom-20 w-96 h-4/5 bg-white card p-2 flex flex-col"
  >
    <div class="section flex-1 overflow-auto">
      <div
        v-for="(message, i) in chat.history"
        :class="i % 2 === 0 ? 'chat-start chat' : 'chat-end'"
        class="chat"
      >
        <span
          :class="i % 2 === 0 ? 'chat-bubble-warning' : 'chat-bubble-success'"
          class="chat-bubble"
        >
          <span class="whitespace-pre-wrap">{{ message }}</span>
        </span>
      </div>
      <div v-if="answer || computing" class="chat chat-start">
        <div
          :class="{
            'skeleton w-full': computing,
          }"
          class="chat-bubble chat-bubble-warning"
        >
          <span class="whitespace-pre-wrap">{{ answer }}</span>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2 z-10">
      <textarea
        v-model="text"
        class="h-full textarea textarea-primary flex-1"
        @keydown.enter.prevent="sendQuestion"
      />
      <button
        :class="{
          'btn-disabled': computing || !finished || !text,
        }"
        class="btn btn-primary btn-sm btn-circle"
        @click="sendQuestion"
      >
        <svg
          class="size-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
