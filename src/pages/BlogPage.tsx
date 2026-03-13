import { useState, useEffect } from 'react';
import { Sparkles, Loader2, BookOpen, Clock, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { generateBlogArticle, BLOG_TOPICS_EN, BLOG_TOPICS_AR } from '../services/ai/blogWriter';
import { isGeminiConfigured } from '../services/ai/config';

export default function BlogPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  useScrollReveal();

  const [selectedTopic, setSelectedTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [article, setArticle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamText, setStreamText] = useState('');
  const configured = isGeminiConfigured();

  const topics = language === 'ar' ? BLOG_TOPICS_AR : BLOG_TOPICS_EN;

  useEffect(() => {
    document.title = language === 'ar'
      ? 'مدونة الساعات - WristNerd'
      : 'Watch Blog - WristNerd';
    window.scrollTo(0, 0);
  }, [language]);

  const handleGenerate = async () => {
    const topic = customTopic.trim() || selectedTopic;
    if (!topic || isLoading) return;

    setIsLoading(true);
    setArticle('');
    setStreamText('');

    try {
      const result = await generateBlogArticle(topic, language, (chunk) => {
        setStreamText(chunk);
      });
      setArticle(result);
      setStreamText('');
    } catch (err) {
      console.error('Blog generation error:', err);
      setArticle(language === 'ar'
        ? 'عذراً، حدث خطأ. حاول مرة أخرى.'
        : 'Sorry, something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const displayText = streamText || article;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 scroll-reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-gold" />
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              theme === 'dark' ? 'bg-gold/10 text-gold' : 'bg-gold/10 text-gold-dark'
            }`}>
              {language === 'ar' ? 'محتوى مُنشأ بالذكاء الاصطناعي' : 'AI-Generated Content'}
            </span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {language === 'ar' ? 'مدونة' : 'Watch'}{' '}
            <span className="text-gold">{language === 'ar' ? 'الساعات' : 'Blog'}</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'ar'
              ? 'مقالات محتوى Humanized بالذكاء الاصطناعي - مكتوبة بأسلوب إنساني 100%'
              : 'AI-written humanized articles - 100% natural writing style'}
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
                ? 'أضف VITE_GEMINI_API_KEY في ملف .env لتفعيل كاتب المقالات'
                : 'Add VITE_GEMINI_API_KEY to your .env file to enable the blog writer'}
            </p>
          </div>
        )}

        {/* Topic Selection */}
        {configured && !displayText && (
          <div className="space-y-6 mb-8 scroll-reveal">
            {/* Predefined Topics */}
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'ar' ? 'اختر موضوعاً جاهزاً:' : 'Choose a topic:'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topics.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedTopic(topic); setCustomTopic(''); }}
                    className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${
                      selectedTopic === topic
                        ? 'border-gold bg-gold/10 text-gold'
                        : theme === 'dark'
                          ? 'border-dark-border hover:border-gold/30 text-gray-300'
                          : 'border-light-border hover:border-gold/30 text-gray-700'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Topic */}
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'ar' ? 'أو اكتب موضوعك:' : 'Or write your own:'}
              </h3>
              <input
                type="text"
                value={customTopic}
                onChange={(e) => { setCustomTopic(e.target.value); setSelectedTopic(''); }}
                placeholder={language === 'ar' ? 'مثل: أفضل 5 ساعات للغطس...' : 'e.g., Top 5 dive watches for beginners...'}
                className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:border-gold transition-colors ${
                  theme === 'dark'
                    ? 'bg-dark-secondary border-dark-border text-white placeholder-gray-500'
                    : 'bg-white border-light-border text-dark placeholder-gray-400'
                }`}
              />
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={handleGenerate}
                disabled={(!selectedTopic && !customTopic.trim()) || isLoading}
                className="flex items-center gap-2 mx-auto bg-gold hover:bg-gold-light text-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {language === 'ar' ? 'جاري الكتابة...' : 'Writing...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {language === 'ar' ? 'اكتب المقال' : 'Generate Article'}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Article Display */}
        {displayText && (
          <div className="scroll-reveal">
            {/* Article Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full">
                  {language === 'ar' ? 'مقال AI Humanized' : 'AI Humanized Article'}
                </span>
                <span className={`flex items-center gap-1 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  <Clock className="w-3 h-3" />
                  {language === 'ar' ? '5 دقائق قراءة' : '5 min read'}
                </span>
              </div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold mb-2">
                {customTopic || selectedTopic}
              </h2>
            </div>

            {/* Article Body */}
            <div className={`rounded-xl border p-6 sm:p-8 mb-8 ${
              theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
            }`}>
              <div className={`prose max-w-none leading-relaxed text-base ${
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

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => { setArticle(''); setStreamText(''); setSelectedTopic(''); setCustomTopic(''); }}
                className="flex items-center gap-2 bg-gold/10 hover:bg-gold/20 text-gold font-bold px-6 py-3 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                {language === 'ar' ? 'مقال جديد' : 'New Article'}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(displayText);
                }}
                className={`flex items-center gap-2 font-bold px-6 py-3 rounded-lg border transition-colors ${
                  theme === 'dark'
                    ? 'border-dark-border hover:border-gold/30 text-gray-300 hover:text-gold'
                    : 'border-light-border hover:border-gold/30 text-gray-600 hover:text-gold'
                }`}
              >
                {language === 'ar' ? 'نسخ المقال' : 'Copy Article'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
