export const useChat = defineStore("chat", () => {
  const history = ref<string[]>(["Ask me anything!"]);
  return {
    history,
    addMessage: (message: string) => {
      history.value = [...history.value, message];
    },
    clearHistory: () => {
      history.value = [];
    },
  };
});
