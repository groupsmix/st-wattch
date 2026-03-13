import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { watches } from '../data/watches';
import { generateAIComparison } from '../services/ai/comparison';
import { isGeminiConfigured } from '../services/ai/config';
import type { Watch } from '../data/watches';

export default function AIComparisonPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  useScrollReveal();

  const [watch1, setWatch1] = useState<Watch | null>(null);
  const [watch2, setWatch2] = useState<Watch | null>(null);
  const [comparison, setComparison] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamText, setStreamText] = useState('');
  const configured = isGeminiConfigured();

  useEffect(() => {
    document.title = language === 'ar'
      ? 'مقارنة ذكية بالـ AI - WristNerd'
      : 'AI Smart Comparison - WristNerd';
    window.scrollTo(0, 0);
  }, [language]);

  const handleCompare = async () => {
    if (!watch1 || !watch2 || isLoading) return;
    setIsLoading(true);
    setComparison('');
    setStreamText('');

    try {
      const result = await generateAIComparison(watch1, watch2, language, (chunk) => {
        setStreamText(chunk);
      });
      setComparison(result);
      setStreamText('');
    } catch (err) {
      console.error('Comparison error:', err);
      setComparison(language === 'ar'
        ? 'عذراً، حدث خطأ أثناء إنشاء المقارنة. حاول مرة أخرى.'
        : 'Sorry, something went wrong generating the comparison. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setWatch1(null);
    setWatch2(null);
    setComparison('');
    setStreamText('');
  };

  const displayText = streamText || comparison;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 scroll-reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-gold" />
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              theme === 'dark' ? 'bg-gold/10 text-gold' : 'bg-gold/10 text-gold-dark'
            }`}>
              {language === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by AI'}
            </span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {language === 'ar' ? 'مقارنة' : 'Smart'}{' '}
            <span className="text-gold">{language === 'ar' ? 'ذكية' : 'Comparison'}</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'ar'
              ? 'اختر أي ساعتين والذكاء الاصطناعي سيكتب لك مقارنة شخصية ومفصلة'
              : 'Pick any two watches and our AI will write a detailed, personal comparison for you'}
          </p>
        </div>

        {!configured && (
          <div className={`text-center p-8 rounded-xl border mb-8 ${
            theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
          }`}>
            <Sparkles className="w-12 h-12 text-gold mx-auto mb-4 opacity-50" />
            <p className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'ar' ? 'أضف مفتاح Gemini API' : 'Add Gemini API Key'}
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              {language === 'ar'
                ? 'أضف VITE_GEMINI_API_KEY في ملف .env لتفعيل المقارنة الذكية'
                : 'Add VITE_GEMINI_API_KEY to your .env file to enable AI comparison'}
            </p>
          </div>
        )}

        {/* Watch Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 scroll-reveal">
          {/* Watch 1 Selector */}
          <div className={`rounded-xl border p-4 ${
            theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
          }`}>
            <h3 className="font-playfair font-bold mb-3 text-gold">
              {language === 'ar' ? 'الساعة الأولى' : 'Watch 1'}
            </h3>
            <select
              value={watch1?.id || ''}
              onChange={(e) => setWatch1(watches.find(w => w.id === e.target.value) || null)}
              className={`w-full px-3 py-3 rounded-lg border text-sm focus:outline-none focus:border-gold transition-colors ${
                theme === 'dark'
                  ? 'bg-dark-secondary border-dark-border text-white'
                  : 'bg-light-secondary border-light-border text-dark'
              }`}
            >
              <option value="">{language === 'ar' ? 'اختر ساعة...' : 'Select a watch...'}</option>
              {watches.filter(w => w.id !== watch2?.id).map(w => (
                <option key={w.id} value={w.id}>{w.brand} {w.name} - ${w.price}</option>
              ))}
            </select>
            {watch1 && (
              <div className="mt-4 flex items-center gap-3">
                <img src={watch1.image} alt={watch1.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{watch1.brand}</p>
                  <p className="font-semibold text-sm">{watch1.name}</p>
                  <p className="text-gold font-bold">${watch1.price}</p>
                </div>
              </div>
            )}
          </div>

          {/* Watch 2 Selector */}
          <div className={`rounded-xl border p-4 ${
            theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
          }`}>
            <h3 className="font-playfair font-bold mb-3 text-gold">
              {language === 'ar' ? 'الساعة الثانية' : 'Watch 2'}
            </h3>
            <select
              value={watch2?.id || ''}
              onChange={(e) => setWatch2(watches.find(w => w.id === e.target.value) || null)}
              className={`w-full px-3 py-3 rounded-lg border text-sm focus:outline-none focus:border-gold transition-colors ${
                theme === 'dark'
                  ? 'bg-dark-secondary border-dark-border text-white'
                  : 'bg-light-secondary border-light-border text-dark'
              }`}
            >
              <option value="">{language === 'ar' ? 'اختر ساعة...' : 'Select a watch...'}</option>
              {watches.filter(w => w.id !== watch1?.id).map(w => (
                <option key={w.id} value={w.id}>{w.brand} {w.name} - ${w.price}</option>
              ))}
            </select>
            {watch2 && (
              <div className="mt-4 flex items-center gap-3">
                <img src={watch2.image} alt={watch2.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{watch2.brand}</p>
                  <p className="font-semibold text-sm">{watch2.name}</p>
                  <p className="text-gold font-bold">${watch2.price}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compare Button */}
        <div className="text-center mb-8 scroll-reveal">
          {comparison || streamText ? (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 mx-auto bg-gold/10 hover:bg-gold/20 text-gold font-bold px-6 py-3 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              {language === 'ar' ? 'مقارنة جديدة' : 'New Comparison'}
            </button>
          ) : (
            <button
              onClick={handleCompare}
              disabled={!watch1 || !watch2 || isLoading || !configured}
              className="flex items-center gap-2 mx-auto bg-gold hover:bg-gold-light text-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {language === 'ar' ? 'جاري المقارنة...' : 'Comparing...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {language === 'ar' ? 'قارن بالذكاء الاصطناعي' : 'Compare with AI'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Specs Quick Compare Table */}
        {watch1 && watch2 && (
          <div className={`rounded-xl border overflow-hidden mb-8 scroll-reveal ${
            theme === 'dark' ? 'border-dark-border' : 'border-light-border'
          }`}>
            <div className="bg-gold/10 px-6 py-3">
              <h3 className="font-playfair font-bold text-gold">
                {language === 'ar' ? 'مقارنة المواصفات' : 'Specs Comparison'}
              </h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className={theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}>
                  <th className="px-4 py-2 text-left text-xs font-semibold">{language === 'ar' ? 'المواصفة' : 'Spec'}</th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gold">{watch1.brand} {watch1.name}</th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gold">{watch2.brand} {watch2.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr className={theme === 'dark' ? 'bg-dark-card' : 'bg-white'}>
                  <td className={`px-4 py-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'ar' ? 'السعر' : 'Price'}</td>
                  <td className="px-4 py-2 text-center text-sm font-bold text-gold">${watch1.price}</td>
                  <td className="px-4 py-2 text-center text-sm font-bold text-gold">${watch2.price}</td>
                </tr>
                <tr className={theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}>
                  <td className={`px-4 py-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'ar' ? 'التقييم' : 'Rating'}</td>
                  <td className="px-4 py-2 text-center text-sm">{watch1.rating}/5</td>
                  <td className="px-4 py-2 text-center text-sm">{watch2.rating}/5</td>
                </tr>
                {Object.keys(watch1.specs).map((key, i) => (
                  <tr key={key} className={i % 2 === 0
                    ? theme === 'dark' ? 'bg-dark-card' : 'bg-white'
                    : theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
                  }>
                    <td className={`px-4 py-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{key}</td>
                    <td className="px-4 py-2 text-center text-xs">{watch1.specs[key] || '-'}</td>
                    <td className="px-4 py-2 text-center text-xs">{watch2.specs[key] || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* AI Comparison Result */}
        {displayText && (
          <div className={`rounded-xl border p-8 mb-8 scroll-reveal ${
            theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
          }`}>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-gold" />
              <h3 className="font-playfair text-xl font-bold text-gold">
                {language === 'ar' ? 'تحليل الذكاء الاصطناعي' : 'AI Analysis'}
              </h3>
            </div>
            <div className={`prose max-w-none leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {displayText.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
            {isLoading && (
              <div className="flex items-center gap-2 mt-4 text-gold">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">{language === 'ar' ? 'جاري الكتابة...' : 'Writing...'}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
