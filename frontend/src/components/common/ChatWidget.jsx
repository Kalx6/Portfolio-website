import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { sendChatMessage } from "../../services/chatService.js";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm an AI assistant that can answer questions about Khalid — his skills, projects, and experience. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message whenever the conversation updates.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage(question);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: response.data.answer },
      ]);
    } catch (error) {
      const message =
        error.response?.status === 429
          ? "You've sent quite a few messages — please wait a bit before continuing."
          : "Sorry, something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", text: message }]);
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amber-700 hover:bg-amber-600 text-slate-50 flex items-center justify-center shadow-lg transition-colors duration-200"
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
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[500px] max-h-[70vh] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-700">
              <p className="text-slate-50 font-semibold text-sm">
                Ask about Khalid
              </p>
              <p className="text-slate-400 text-xs">
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
                    className={`max-w-[85%] text-sm rounded-lg px-3.5 py-2.5 ${
                      message.role === "user"
                        ? "bg-amber-700 text-slate-50"
                        : "bg-slate-900 text-slate-300 border border-slate-700"
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5">
                    <Loader2
                      size={14}
                      className="animate-spin text-slate-400"
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 p-4 border-t border-slate-700"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-50 text-sm focus:border-amber-700 focus:outline-none transition-colors duration-200 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="w-10 h-10 rounded-lg bg-amber-700 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-50 flex items-center justify-center transition-colors duration-200 shrink-0"
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
