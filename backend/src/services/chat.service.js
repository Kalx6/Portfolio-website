// src/services/chat.service.js

import { GoogleGenAI } from "@google/genai";
import { retrieveRelevantChunks } from "./retrieval.service.js";
import { env } from "../config/env.js";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are a helpful assistant embedded on Kalid Abdulkerim's portfolio website.
You answer visitor questions about Kalid — his background, skills, projects, and experience —
using ONLY the context provided below. Speak about Kalid in the third person.
If the answer isn't in the provided context, say you don't have that information rather than guessing.
Keep answers concise and conversational — a few sentences, not an essay.`;

async function buildPrompt(question) {
  const relevantChunks = await retrieveRelevantChunks(question);

  const context = relevantChunks
    .map((chunk) => `- ${chunk.content}`)
    .join("\n");

  return `${SYSTEM_INSTRUCTION}

Context about Khalid:
${context}

Visitor question: ${question}`;
}

export async function generateChatResponse(question) {
  const prompt = await buildPrompt(question);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

// Yields the answer in small pieces as Gemini generates them
export async function* streamChatResponse(question) {
  const prompt = await buildPrompt(question);

  const stream = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  for await (const chunk of stream) {
    if (chunk.text) yield chunk.text;
  }
}
