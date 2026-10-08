import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function sendChatMessage(question) {
  const response = await axios.post(`${API_BASE_URL}/api/chat`, { question });
  return response.data;
}

export async function streamChatMessage(question, { onChunk, signal }) {
  const response = await fetch(`${API_BASE_URL}/api/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
    signal,
  });

  if (!response.ok) {
    const error = new Error("Request failed");
    error.status = response.status; // lets the widget recognize a 429
    throw error;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finished = false;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop(); // the last piece may be an incomplete line, so keep it

    for (const line of lines) {
      if (!line.trim()) continue;
      const event = JSON.parse(line);
      if (event.type === "chunk") onChunk(event.text);
      else if (event.type === "error") throw new Error(event.message);
      else if (event.type === "done") finished = true;
    }
  }

  // The connection ended without "done": something cut the answer short
  if (!finished) throw new Error("Connection lost");
}
