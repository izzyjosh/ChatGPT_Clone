
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

let chat = null;

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
export default async function* getGeminiResponse(message) {
  if (!chat) initChat();

  const stream = await chat.sendMessageStream({ message });

  for await (const chunk of stream) {
    yield chunk.text;
  }
}

export async function genTopic(text) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: text
  });
  return response.text
}
