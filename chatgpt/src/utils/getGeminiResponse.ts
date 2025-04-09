/**import { GoogleGenAI } from "@google/genai";
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

export async function* getGeminiResponse(prompt) {
  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: prompt
  });

  for await (const chunk of response) {
    yield chunk.text;
  }
*/
// src/utils/geminiStreamChat.js
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
export async function* getGeminiResponse(message) {
  if (!chat) initChat();

  const stream = await chat.sendMessageStream({ message });

  for await (const chunk of stream) {
    yield chunk.text;
  }
}
