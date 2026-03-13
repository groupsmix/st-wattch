import { useState } from 'react';
import { Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { generateSEO } from '../../services/ai/seo';
import { isGroqConfigured } from '../../services/ai/config';
import type { Watch } from '../../data/watches';

interface Props {
  watch: Watch;
}

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}

export default function AISEOOptimizer({ watch }: Props) {
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState('');
  const { theme } = useTheme();
  const { language } = useLanguage();

  if (!isGroqConfigured()) return null;

  const handleGenerate = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await generateSEO(watch.name, watch.brand, watch.category, watch.price, language);
      setSeoData(result);
    } catch (err) {
      console.error('SEO generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className={`rounded-xl border overflow-hidden mb-8 ${
      theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
    }`}>
      <div className="bg-gradient-to-r from-gold/20 to-gold/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold" />
          <h3 className="font-playfair font-bold text-gold">
            {language === 'ar' ? 'محسّن SEO بالذكاء الاصطناعي' : 'AI SEO Optimizer'}
          </h3>
        </div>
        {!seoData && (
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center gap-1.5 bg-gold hover:bg-gold-light text-dark text-xs font-bold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {language === 'ar' ? 'جاري التوليد...' : 'Generating...'}
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'ar' ? 'ولّد SEO' : 'Generate SEO'}
              </>
            )}
          </button>
        )}
      </div>
      {seoData && (
        <div className="p-6 space-y-4">
          {([
            ['title', language === 'ar' ? 'العنوان' : 'Title', seoData.title],
            ['description', language === 'ar' ? 'الوصف' : 'Description', seoData.description],
            ['keywords', language === 'ar' ? 'الكلمات المفتاحية' : 'Keywords', Array.isArray(seoData.keywords) ? seoData.keywords.join(', ') : seoData.keywords],
            ['ogTitle', 'OG Title', seoData.ogTitle],
            ['ogDescription', 'OG Description', seoData.ogDescription],
          ] as [string, string, string][]).map(([key, label, value]) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {label}
                </span>
                <button
                  onClick={() => handleCopy(key, value)}
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  {copied === key
                    ? <Check className="w-3.5 h-3.5" />
                    : <Copy className="w-3.5 h-3.5" />
                  }
                </button>
              </div>
              <p className={`text-sm p-2 rounded border ${
                theme === 'dark' ? 'bg-dark-secondary border-dark-border text-gray-300' : 'bg-light-secondary border-light-border text-gray-700'
              }`}>
                {value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
