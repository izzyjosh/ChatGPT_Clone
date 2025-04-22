import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

let chat: ReturnType<typeof ai.chats.create> | null = null;

export function initChat() {
  chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }]
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }]
      }
    ]
  });
}

// Async generator to stream the response
export default async function* getGeminiResponse(
  message: string
): AsyncGenerator<string> {
  if (!chat) initChat();

  if (!chat) {
    throw new Error("failed to initialize chat");
  }
  const stream = await chat.sendMessageStream({ message });

  for await (const chunk of stream) {
    if (typeof chunk.text === "string") {
      yield chunk.text;
    }
  }
}
