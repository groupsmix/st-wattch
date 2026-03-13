import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { generateReviewSummary } from '../../services/ai/reviewSummary';
import { isGroqConfigured } from '../../services/ai/config';
import type { Watch } from '../../data/watches';

interface Props {
  watch: Watch;
}

export default function AIReviewSummary({ watch }: Props) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();

  if (!isGroqConfigured()) return null;

  const handleGenerate = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await generateReviewSummary(watch, language);
      setSummary(result);
    } catch (err) {
      console.error('Summary error:', err);
      setSummary(language === 'ar' ? 'عذراً، لم نتمكن من إنشاء الملخص.' : 'Sorry, could not generate summary.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`rounded-xl border overflow-hidden mb-8 ${
      theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
    }`}>
      <div className="bg-gradient-to-r from-gold/20 to-gold/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold" />
          <h3 className="font-playfair font-bold text-gold">
            {language === 'ar' ? 'ملخص ذكي بالـ AI' : 'AI Quick Summary'}
          </h3>
        </div>
        {!summary && (
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center gap-1.5 bg-gold hover:bg-gold-light text-dark text-xs font-bold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {language === 'ar' ? 'جاري التلخيص...' : 'Summarizing...'}
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'ar' ? 'لخّص لي' : 'Summarize'}
              </>
            )}
          </button>
        )}
      </div>
      {summary && (
        <div className="px-6 py-4">
          <div className={`text-sm leading-relaxed whitespace-pre-line ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {summary}
          </div>
        </div>
      )}
    </div>
  );
}
