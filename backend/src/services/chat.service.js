// src/services/chat.service.js

import { GoogleGenAI } from "@google/genai";
import { retrieveRelevantChunks } from "./retrieval.service.js";
import { env } from "../config/env.js";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are a helpful assistant embedded on Khalid Abdulkerim's portfolio website.
You answer visitor questions about Khalid — his background, skills, projects, and experience —
using ONLY the context provided below. Speak about Khalid in the third person.
If the answer isn't in the provided context, say you don't have that information rather than guessing.
Keep answers concise and conversational — a few sentences, not an essay.`;

export async function generateChatResponse(question) {
  const relevantChunks = await retrieveRelevantChunks(question);

  const context = relevantChunks
    .map((chunk) => `- ${chunk.content}`)
    .join("\n");

  const prompt = `${SYSTEM_INSTRUCTION}

Context about Khalid:
${context}

Visitor question: ${question}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
