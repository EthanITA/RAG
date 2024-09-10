import { XLMRobertaTokenizer } from "@xenova/transformers";
import xlm_roberta_tokenizer from "@/assets/xlm-roberta-tokenizer.json";
import ollama from "ollama/browser";

const model = "bge-m3";
const max_tokens = 8192;

export const useAI = defineStore("ai", () => {
  const tokenizer = new XLMRobertaTokenizer(xlm_roberta_tokenizer, {
    bos_token: "<s>",
    eos_token: "</s>",
    sep_token: "</s>",
    cls_token: "<s>",
    unk_token: "<unk>",
    pad_token: "<pad>",
    mask_token: "<mask>",
  });

  const tokenize = (prompt: string) => {
    const tokenIds = tokenizer.encode(prompt);
    return tokenizer.model.convert_ids_to_tokens(tokenIds);
  };

  const embed = (input: string) =>
    ollama
      .embed({
        model,
        input,
        truncate: false,
        options: {
          num_ctx: max_tokens, // equals to bge-m3 context size
        },
      })
      .then((res) => res.embeddings[0]);

  const chat = (prompt: string, kbs: string[]) => {
    console.log(kbs);
    return ollama.chat({
      model: "llama3.1",
      options: {
        num_ctx: max_tokens,
      },
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are a knowledgeable and flexible assistant. Your primary task is to assist the user by accurately answering their questions using the provided content. The content given to you is retrieved from a knowledge base and is relevant to the user's query. Always ensure that your responses are based on this content. If the content does not fully answer the user's question or if no content is provided, try your best to help the user",
        },
        ...kbs.map((kb) => ({
          role: "system",
          content: `The following content about the topic has been retrieved: """${kb}"""`,
        })),
        {
          role: "user",
          content: prompt,
        },
      ],
    });
  };

  return {
    tokenize,
    embed,
    max_tokens,
    chat,
  };
});
