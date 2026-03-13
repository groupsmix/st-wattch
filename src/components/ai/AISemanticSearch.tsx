import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { callGroq } from '../../services/ai/groq';
import { isGroqConfigured } from '../../services/ai/config';
import { watches } from '../../data/watches';

interface Props {
  onClose: () => void;
}

export default function AISemanticSearch({ onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const navigate = useNavigate();

  if (!isGroqConfigured()) return null;

  const handleSearch = async () => {
    if (!query.trim() || isLoading) return;
    setIsLoading(true);

    const watchList = watches.map(w =>
      `ID:${w.slug} | ${w.brand} ${w.name} | $${w.price} | ${w.category} | ${w.rating}/5 | Water: ${w.specs['Water Resistance'] || 'N/A'} | ${w.shortDescription}`
    ).join('\n');

    const systemPrompt = language === 'ar'
      ? 'أنت محرك بحث ذكي للساعات. أجب عن استفسار المستخدم باقتراح أفضل 1-3 ساعات من القائمة. أعد النتائج بصيغة: SLUG:xxx لكل ساعة مع سبب قصير. لا تستخدم markdown.'
      : 'You are a smart watch search engine. Answer the user query by suggesting the best 1-3 watches from the list. Return results as: SLUG:xxx for each watch with a brief reason. No markdown.';

    const prompt = language === 'ar'
      ? `الساعات المتوفرة:\n${watchList}\n\nبحث المستخدم: "${query}"\n\nاقترح أفضل الساعات المطابقة مع شرح قصير.`
      : `Available watches:\n${watchList}\n\nUser search: "${query}"\n\nSuggest the best matching watches with a brief explanation.`;

    try {
      const result = await callGroq(prompt, systemPrompt);
      setResults(result);
    } catch {
      setResults(language === 'ar' ? 'عذراً، حدث خطأ في البحث.' : 'Sorry, search failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWatchClick = (slug: string) => {
    onClose();
    navigate(`/review/${slug}`);
  };

  // Extract slugs from AI response for clickable links
  const extractSlugs = (text: string): string[] => {
    const slugPattern = /SLUG:(\S+)/g;
    const slugs: string[] = [];
    let match;
    while ((match = slugPattern.exec(text)) !== null) {
      slugs.push(match[1]);
    }
    // Also try to find watch slugs mentioned in text
    watches.forEach(w => {
      if (text.toLowerCase().includes(w.slug) || text.toLowerCase().includes(w.name.toLowerCase())) {
        if (!slugs.includes(w.slug)) slugs.push(w.slug);
      }
    });
    return slugs;
  };

  return (
    <div className={`p-4 rounded-xl border ${
      theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-gold" />
        <span className="text-sm font-semibold text-gold">
          {language === 'ar' ? 'بحث ذكي بالـ AI' : 'AI Smart Search'}
        </span>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={language === 'ar'
            ? 'مثل: ساعة مقاومة للماء تحت 200 دولار'
            : 'e.g., waterproof watch under $200 for swimming'
          }
          className={`flex-1 px-3 py-2 rounded-lg text-sm border focus:outline-none focus:border-gold transition-colors ${
            theme === 'dark'
              ? 'bg-dark-secondary border-dark-border text-white placeholder-gray-500'
              : 'bg-light-secondary border-light-border text-dark placeholder-gray-400'
          }`}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !query.trim()}
          className="bg-gold hover:bg-gold-light text-dark text-xs font-bold px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1"
        >
          {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {language === 'ar' ? 'ابحث' : 'Search'}
        </button>
      </div>

      {results && (
        <div className={`text-sm leading-relaxed whitespace-pre-line mb-3 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {results}
        </div>
      )}

      {results && extractSlugs(results).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {extractSlugs(results).map(slug => {
            const w = watches.find(w => w.slug === slug);
            if (!w) return null;
            return (
              <button
                key={slug}
                onClick={() => handleWatchClick(slug)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border transition-colors hover:border-gold/30 ${
                  theme === 'dark'
                    ? 'bg-dark-secondary border-dark-border hover:text-gold'
                    : 'bg-light-secondary border-light-border hover:text-gold'
                }`}
              >
                <img src={w.image} alt={w.name} className="w-8 h-8 rounded object-cover" />
                <div className="text-left">
                  <p className="font-semibold">{w.brand} {w.name}</p>
                  <p className="text-gold">${w.price}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
