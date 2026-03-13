import { useState } from 'react';
import { Image, Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { generateAltText } from '../../services/ai/seo';
import { isGroqConfigured } from '../../services/ai/config';

interface Props {
  imageSrc: string;
  watchName: string;
  brand: string;
  context?: string;
}

export default function AIImageAltText({ imageSrc, watchName, brand, context }: Props) {
  const [altText, setAltText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();

  if (!isGroqConfigured()) return null;

  const handleGenerate = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await generateAltText(imageSrc, watchName, brand, context);
      setAltText(result);
    } catch (err) {
      console.error('Alt text generation error:', err);
      setAltText(language === 'ar' ? 'خطأ في التوليد' : 'Generation error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (altText) {
      navigator.clipboard.writeText(altText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`rounded-lg border p-3 ${
      theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <Image className="w-4 h-4 text-gold" />
        <span className="text-xs font-semibold text-gold">
          {language === 'ar' ? 'نص بديل AI' : 'AI Alt Text'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <img src={imageSrc} alt={watchName} className="w-12 h-12 rounded object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          {altText ? (
            <div className="flex items-start gap-1">
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {altText}
              </p>
              <button onClick={handleCopy} className="text-gold flex-shrink-0 mt-0.5">
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  {language === 'ar' ? 'جاري التوليد...' : 'Generating...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3" />
                  {language === 'ar' ? 'ولّد نص بديل' : 'Generate Alt Text'}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
