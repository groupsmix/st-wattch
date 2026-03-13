import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Bot, User } from "lucide-react";
import { useApp } from "../context/AppContext";
import { apiPost } from "../hooks/useApi";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatbot() {
  const { theme, language, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: "assistant", content: t("chat_welcome") }]);
    }
  }, [isOpen, messages.length, t]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const data = await apiPost<{ response: string }>("/api/ai/chat", {
        message: userMsg,
        language,
      });
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: language === "ar" ? "عذراً، حدث خطأ. حاول مرة أخرى." : "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 ${language === "ar" ? "left-6" : "right-6"} z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
          isOpen
            ? theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-600"
            : "bg-amber-500 text-white hover:bg-amber-600"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : (
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-200" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 ${language === "ar" ? "left-6" : "right-6"} z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl border overflow-hidden flex flex-col ${
          theme === "dark"
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }`} style={{ height: "500px" }}>
          {/* Header */}
          <div className="bg-amber-500 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{t("chat_title")}</h3>
              <p className="text-white/80 text-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {t("chat_subtitle")}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-50"
          }`}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.role === "user"
                    ? "bg-amber-500 text-white"
                    : theme === "dark" ? "bg-gray-700 text-amber-400" : "bg-amber-100 text-amber-600"
                }`}>
                  {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-amber-500 text-white rounded-tr-sm"
                    : theme === "dark"
                      ? "bg-gray-800 text-gray-200 rounded-tl-sm"
                      : "bg-white text-gray-800 rounded-tl-sm shadow-sm"
                }`}>
                  <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>')
                  }} />
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                  theme === "dark" ? "bg-gray-700 text-amber-400" : "bg-amber-100 text-amber-600"
                }`}>
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className={`rounded-2xl px-4 py-3 rounded-tl-sm ${
                  theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
                }`}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-3 border-t ${
            theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
          }`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("chat_placeholder")}
                disabled={loading}
                className={`flex-1 px-3.5 py-2.5 text-sm rounded-xl border transition-colors ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                } focus:outline-none focus:border-amber-500`}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
