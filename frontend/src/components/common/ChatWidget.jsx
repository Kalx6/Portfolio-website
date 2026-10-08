import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { streamChatMessage } from "../../services/chatService.js";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm an AI assistant that can answer questions about Kalid — his skills, projects, and experience. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const abortRef = useRef(null);

  // Cancel an in-flight answer if the widget unmounts
  useEffect(() => () => abortRef.current?.abort(), []);

  const updateLastMessage = (update) =>
    setMessages((prev) => [
      ...prev.slice(0, -1),
      update(prev[prev.length - 1]),
    ]);

  // Auto-scroll to the latest message whenever the conversation updates.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: isLoading ? "auto" : "smooth",
    });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || isLoading) return;

    // The user's message, then an empty assistant message that the stream fills in
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "assistant", text: "", streaming: true },
    ]);
    setInput("");
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      await streamChatMessage(question, {
        signal: controller.signal,
        onChunk: (text) =>
          updateLastMessage((last) => ({ ...last, text: last.text + text })),
      });
      updateLastMessage((last) => ({ ...last, streaming: false }));
    } catch (error) {
      if (error.name === "AbortError") return;

      const message =
        error.status === 429
          ? "You've sent quite a few messages — please wait a bit before continuing."
          : "Sorry, something went wrong. Please try again.";

      updateLastMessage((last) => ({
        ...last,
        streaming: false,
        // Keep what already arrived; only replace an empty bubble
        text: last.text
          ? `${last.text}\n\n(The response was interrupted. Please try again.)`
          : message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat about Khalid"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amber-700 hover:bg-amber-600 text-neutral-50 flex items-center justify-center shadow-lg transition-colors duration-200"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[500px] max-h-[70vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-neutral-800">
              <p className="text-neutral-50 font-semibold text-sm">
                Ask about Kalid
              </p>
              <p className="text-neutral-400 text-xs">
                AI assistant · powered by RAG + Gemini
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] text-sm rounded-lg px-3.5 py-2.5 whitespace-pre-wrap ${
                      message.role === "user"
                        ? "bg-amber-700 text-neutral-50"
                        : "bg-neutral-950 text-neutral-300 border border-neutral-800"
                    }`}
                  >
                    {message.streaming && !message.text ? (
                      <span
                        className="flex items-center gap-1 h-5"
                        role="status"
                        aria-label="Assistant is typing"
                      >
                        <span className="typing-dot w-1.5 h-1.5 rounded-full bg-amber-600" />
                        <span className="typing-dot w-1.5 h-1.5 rounded-full bg-amber-600" />
                        <span className="typing-dot w-1.5 h-1.5 rounded-full bg-amber-600" />
                      </span>
                    ) : (
                      <>
                        {message.text}
                        {message.streaming && (
                          <span className="stream-cursor" aria-hidden="true" />
                        )}
                      </>
                    )}
                  </p>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5">
                    <Loader2
                      size={14}
                      className="animate-spin text-neutral-400"
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 p-4 border-t border-neutral-800"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-neutral-50 text-sm focus:border-amber-700 focus:outline-none transition-colors duration-200 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="w-10 h-10 rounded-lg bg-amber-700 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-50 flex items-center justify-center transition-colors duration-200 shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatWidget;
