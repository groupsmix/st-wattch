import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { streamAdvisorResponse } from '../../services/ai/watchAdvisor';
import { isGeminiConfigured } from '../../services/ai/config';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function WatchAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const { language } = useLanguage();

  const configured = isGeminiConfigured();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Add welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome = language === 'ar'
        ? 'مرحباً! أنا مستشار الساعات الذكي. أخبرني عن ميزانيتك والمناسبة وسأساعدك في اختيار الساعة المثالية!'
        : "Hey there! I'm your AI watch advisor. Tell me your budget, what occasion it's for, and I'll help you find the perfect watch!";
      setMessages([{ role: 'assistant', content: welcome }]);
    }
  }, [isOpen, messages.length, language]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !configured) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setStreamingText('');

    try {
      const fullResponse = await streamAdvisorResponse(
        userMessage,
        messages,
        language,
        (chunk) => setStreamingText(chunk)
      );

      setMessages(prev => [...prev, { role: 'assistant', content: fullResponse }]);
      setStreamingText('');
    } catch (err) {
      const errorMsg = language === 'ar'
        ? 'عذراً، حدث خطأ. حاول مرة أخرى.'
        : 'Sorry, something went wrong. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
      setStreamingText('');
      console.error('Advisor error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!configured) return null;

  const quickQuestions = language === 'ar'
    ? ['ساعة رسمية تحت 200$', 'أفضل ساعة رياضية', 'ساعة هدية لصديق']
    : ['Dress watch under $200', 'Best sport watch', 'Gift for a friend'];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gold hover:bg-gold-light text-dark p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label={language === 'ar' ? 'مستشار الساعات' : 'Watch Advisor'}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className={`absolute bottom-full mb-2 whitespace-nowrap text-sm font-medium px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
            theme === 'dark' ? 'bg-dark-card text-white' : 'bg-white text-dark shadow-lg'
          }`}>
            {language === 'ar' ? 'مستشار الساعات الذكي' : 'AI Watch Advisor'}
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100vw-32px)] h-[520px] max-h-[calc(100vh-100px)] rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-fade-in ${
          theme === 'dark'
            ? 'bg-dark-secondary border-dark-border'
            : 'bg-white border-light-border'
        }`}>
          {/* Header */}
          <div className="bg-gold px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-dark/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-dark" />
              </div>
              <div>
                <h3 className="font-bold text-dark text-sm">
                  {language === 'ar' ? 'مستشار الساعات' : 'Watch Advisor'}
                </h3>
                <p className="text-dark/70 text-xs">
                  {language === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by AI'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-dark/10 transition-colors"
            >
              <X className="w-5 h-5 text-dark" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-gold/20'
                    : 'bg-gold'
                }`}>
                  {msg.role === 'user'
                    ? <User className="w-3.5 h-3.5 text-gold" />
                    : <Bot className="w-3.5 h-3.5 text-dark" />
                  }
                </div>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gold text-dark rounded-br-sm'
                    : theme === 'dark'
                      ? 'bg-dark-card text-gray-200 rounded-bl-sm'
                      : 'bg-light-secondary text-gray-800 rounded-bl-sm'
                }`}>
                  {msg.content.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Streaming response */}
            {streamingText && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-gold">
                  <Bot className="w-3.5 h-3.5 text-dark" />
                </div>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl rounded-bl-sm text-sm leading-relaxed ${
                  theme === 'dark' ? 'bg-dark-card text-gray-200' : 'bg-light-secondary text-gray-800'
                }`}>
                  {streamingText}
                </div>
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && !streamingText && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-gold">
                  <Bot className="w-3.5 h-3.5 text-dark" />
                </div>
                <div className={`px-4 py-2 rounded-xl rounded-bl-sm ${
                  theme === 'dark' ? 'bg-dark-card' : 'bg-light-secondary'
                }`}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {messages.length <= 1 && !isLoading && (
              <div className="space-y-2 pt-2">
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {language === 'ar' ? 'أسئلة سريعة:' : 'Quick questions:'}
                </p>
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => {
                        setInput('');
                        setMessages(prev => [...prev, { role: 'user', content: q }]);
                        setIsLoading(true);
                        streamAdvisorResponse(q, messages, language, (chunk) => setStreamingText(chunk))
                          .then(response => {
                            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                            setStreamingText('');
                          })
                          .catch(() => {
                            setMessages(prev => [...prev, { role: 'assistant', content: language === 'ar' ? 'عذراً، حاول مرة أخرى.' : 'Sorry, try again.' }]);
                            setStreamingText('');
                          })
                          .finally(() => setIsLoading(false));
                      }, 50);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs border transition-colors ${
                      theme === 'dark'
                        ? 'border-dark-border hover:border-gold/30 text-gray-300 hover:text-gold'
                        : 'border-light-border hover:border-gold/30 text-gray-600 hover:text-gold'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-3 border-t ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                disabled={isLoading}
                className={`flex-1 px-3 py-2 rounded-lg text-sm border focus:outline-none focus:border-gold transition-colors ${
                  theme === 'dark'
                    ? 'bg-dark-card border-dark-border text-white placeholder-gray-500'
                    : 'bg-light-secondary border-light-border text-dark placeholder-gray-400'
                }`}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gold hover:bg-gold-light text-dark p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
