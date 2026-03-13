import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { watches } from '../data/watches';
import { ChatMessage } from '../data/types';

function generateAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  const allWatches = watches;

  // Budget-based recommendations
  if (msg.includes('budget') || msg.includes('cheap') || msg.includes('affordable') || msg.includes('under') || msg.includes('ميزانية') || msg.includes('رخيص')) {
    const priceMatch = msg.match(/\$?(\d+)/);
    const budget = priceMatch ? parseInt(priceMatch[1]) : 300;
    const affordable = allWatches.filter(w => w.price <= budget);
    if (affordable.length > 0) {
      const recs = affordable.slice(0, 3).map(w => `- **${w.name}** ($${w.price}) - ${w.shortDescription}`).join('\n');
      return `Great news! Here are watches within your budget of $${budget}:\n\n${recs}\n\nWould you like more details about any of these?`;
    }
    return `With a budget of $${budget}, I'd recommend looking at the Casio G-Shock GA-2100 ($99) - it's the best value watch available. Want me to suggest watches in a higher price range?`;
  }

  // Dive watch recommendations
  if (msg.includes('dive') || msg.includes('diving') || msg.includes('water') || msg.includes('swim') || msg.includes('غوص') || msg.includes('ماء')) {
    const diveWatches = allWatches.filter(w => w.category === 'dive');
    const recs = diveWatches.slice(0, 3).map(w => `- **${w.name}** ($${w.price}) - ${w.waterResistance} WR`).join('\n');
    return `Here are my top dive watch picks:\n\n${recs}\n\nAll of these have at least 200m water resistance and are suitable for actual diving. The Orient Kamasu offers the best value with a sapphire crystal at under $300!`;
  }

  // Dress watch recommendations
  if (msg.includes('dress') || msg.includes('formal') || msg.includes('office') || msg.includes('elegant') || msg.includes('رسمي') || msg.includes('أنيق')) {
    const dressWatches = allWatches.filter(w => w.category === 'dress');
    const recs = dressWatches.slice(0, 3).map(w => `- **${w.name}** ($${w.price}) - ${w.shortDescription}`).join('\n');
    return `For formal/dress occasions, here are my recommendations:\n\n${recs}\n\nThe Seiko Presage Cocktail Time is unbeatable for value - it looks like a $2000 watch!`;
  }

  // Sports watch
  if (msg.includes('sport') || msg.includes('active') || msg.includes('gym') || msg.includes('tough') || msg.includes('رياض')) {
    return `For sports and active use, I recommend:\n\n- **Casio G-Shock GA-2100** ($99) - Virtually indestructible, 200m WR\n- **Tissot PRX Powermatic 80** ($650) - Sporty elegance with 100m WR\n- **Citizen Promaster** ($197) - Solar powered, never needs batteries\n\nThe G-Shock is the toughest watch money can buy. The PRX is perfect if you want something that looks good at the gym AND the office.`;
  }

  // Brand questions
  if (msg.includes('seiko') || msg.includes('سيكو')) {
    const seikoWatches = allWatches.filter(w => w.brand === 'Seiko');
    const recs = seikoWatches.map(w => `- **${w.name}** ($${w.price}) - Rating: ${w.rating}/5`).join('\n');
    return `Seiko is one of the best value brands in watchmaking! Here are our reviewed Seiko watches:\n\n${recs}\n\nSeiko makes everything from $50 to $50,000 watches, and their quality at every price point is exceptional.`;
  }

  if (msg.includes('omega') || msg.includes('أوميغا')) {
    return `Omega is a prestigious Swiss brand known for:\n\n- **Seamaster** - Dive watches (James Bond's choice)\n- **Speedmaster** - The Moonwatch\n- **Constellation** - Dress watches\n\nWe've reviewed the **Omega Seamaster 300M** ($5,200) - a Master Chronometer certified luxury dive watch that's worth every penny. Would you like to know more?`;
  }

  // Comparison requests
  if (msg.includes('compar') || msg.includes('vs') || msg.includes('versus') || msg.includes('or') || msg.includes('مقارن') || msg.includes('ضد')) {
    return `I can help you compare watches! Here are some popular comparisons:\n\n- **Seiko Presage vs Junghans Max Bill** - Dress watch showdown\n- **Orient Kamasu vs Citizen Promaster** - Best budget diver\n- **Tissot PRX vs Hamilton Khaki** - Mid-range face-off\n\nVisit our **Compare** page to do a detailed side-by-side comparison of any two watches, or tell me which specific watches you'd like to compare!`;
  }

  // Best overall / recommendation
  if (msg.includes('best') || msg.includes('recommend') || msg.includes('suggest') || msg.includes('أفضل') || msg.includes('اقترح')) {
    return `Here are my top picks by category:\n\n🏊 **Best Dive**: Orient Kamasu ($260) - Sapphire + 200m WR\n👔 **Best Dress**: Seiko Presage ($295) - Stunning dial\n💪 **Best Tough**: G-Shock GA-2100 ($99) - Indestructible\n🏆 **Best Overall**: Tissot PRX ($650) - Does everything well\n💎 **Best Luxury**: Omega Seamaster ($5,200) - Master Chronometer\n\nWhat's your use case? I can narrow it down further!`;
  }

  // First watch / beginner
  if (msg.includes('first') || msg.includes('beginner') || msg.includes('start') || msg.includes('new to') || msg.includes('مبتدئ') || msg.includes('أول')) {
    return `Welcome to the world of watches! For your first automatic watch, I recommend:\n\n1. **Seiko 5 Sports SRPD55** ($275) - The classic starter watch\n2. **Orient Kamasu** ($260) - Best value with sapphire crystal\n3. **Casio G-Shock GA-2100** ($99) - If you want something tough first\n\nStart with the Seiko 5 if you want a versatile everyday watch, or the G-Shock if you need something bulletproof. You can always upgrade later!`;
  }

  // Gift
  if (msg.includes('gift') || msg.includes('present') || msg.includes('هدية')) {
    return `Great gift ideas:\n\n🎁 **Under $100**: Casio G-Shock GA-2100 - Everyone loves it\n🎁 **Under $300**: Seiko Presage Cocktail Time - Looks expensive\n🎁 **Under $500**: Hamilton Khaki Field - Classic and timeless\n🎁 **Under $700**: Tissot PRX - Modern and trendy\n🎁 **Luxury**: Omega Seamaster - The ultimate gift\n\nWho is the gift for? I can personalize the recommendation!`;
  }

  // Default response
  return `I can help you find the perfect watch! Try asking me about:\n\n- **Budget**: "Best watch under $300"\n- **Style**: "Best dress watch" or "Best dive watch"\n- **Brand**: "Tell me about Seiko"\n- **Use case**: "Best watch for the office"\n- **Comparisons**: "Seiko vs Orient"\n- **Getting started**: "Best first automatic watch"\n\nWhat are you looking for?`;
}

export function ChatBot() {
  const { t } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: t.chatbot.greeting,
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = generateAIResponse(userMessage.content);
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple markdown-ish rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      let processedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<em>$1</em>');
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: processedLine }} />
          {i < content.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        id="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all hover:scale-105 ${
          isOpen
            ? 'bg-gray-700 hover:bg-gray-600'
            : 'bg-amber-500 hover:bg-amber-600 animate-bounce'
        }`}
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">{t.chatbot.title}</h3>
              <p className="text-amber-100 text-xs">{t.chatbot.subtitle}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                    msg.role === 'user'
                      ? 'bg-amber-100 dark:bg-amber-900'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-white rounded-br-sm'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                  }`}
                >
                  {renderContent(msg.content)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chatbot.placeholder}
                className="flex-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 text-sm border-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:hover:bg-amber-500 text-white rounded-xl transition-colors"
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
