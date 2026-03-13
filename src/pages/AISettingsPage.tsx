import { useState, useEffect } from 'react';
import { Settings, Key, CheckCircle, XCircle, Sparkles, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { isGeminiConfigured, isGroqConfigured } from '../services/ai/config';

export default function AISettingsPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === 'ar'
      ? 'إعدادات الذكاء الاصطناعي - WristNerd'
      : 'AI Settings - WristNerd';
    window.scrollTo(0, 0);
  }, [language]);

  const geminiOk = isGeminiConfigured();
  const groqOk = isGroqConfigured();

  const [showInstructions, setShowInstructions] = useState(!geminiOk && !groqOk);

  const features = [
    {
      name: language === 'ar' ? 'مستشار الساعات (Chatbot)' : 'Watch Advisor (Chatbot)',
      provider: 'Gemini Flash',
      status: geminiOk,
      desc: language === 'ar' ? 'شات بوت ذكي يساعد في اختيار الساعة المناسبة' : 'AI chatbot that helps find the perfect watch',
    },
    {
      name: language === 'ar' ? 'مقارنة ذكية' : 'AI Comparison',
      provider: 'Gemini Flash',
      status: geminiOk,
      desc: language === 'ar' ? 'مقارنة مفصلة بين أي ساعتين' : 'Detailed comparison between any two watches',
    },
    {
      name: language === 'ar' ? 'كاتب المقالات' : 'Blog Writer',
      provider: 'Gemini Flash',
      status: geminiOk,
      desc: language === 'ar' ? 'كتابة مقالات SEO بأسلوب إنساني' : 'Write humanized SEO articles',
    },
    {
      name: language === 'ar' ? 'ملخص المراجعات' : 'Review Summary',
      provider: 'Groq (Llama 3.3)',
      status: groqOk,
      desc: language === 'ar' ? 'تلخيص المراجعات في نقاط رئيسية' : 'Summarize reviews into key points',
    },
    {
      name: language === 'ar' ? 'البحث الذكي' : 'Smart Search',
      provider: 'Groq (Llama 3.3)',
      status: groqOk,
      desc: language === 'ar' ? 'بحث دلالي يفهم ما تريده' : 'Semantic search that understands intent',
    },
    {
      name: language === 'ar' ? 'محسّن SEO' : 'SEO Optimizer',
      provider: 'Groq (Llama 3.3)',
      status: groqOk,
      desc: language === 'ar' ? 'توليد عناوين وأوصاف محسنة' : 'Generate optimized titles and descriptions',
    },
    {
      name: language === 'ar' ? 'توصيات شخصية' : 'Personalized Recommendations',
      provider: language === 'ar' ? 'محلي (بدون API)' : 'Local (No API)',
      status: true,
      desc: language === 'ar' ? 'اقتراحات بناءً على تاريخ التصفح' : 'Suggestions based on browsing history',
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Settings className="w-6 h-6 text-gold" />
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {language === 'ar' ? 'إعدادات' : 'AI'}{' '}
            <span className="text-gold">{language === 'ar' ? 'الذكاء الاصطناعي' : 'Settings'}</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'ar'
              ? 'إدارة مفاتيح API ومتابعة حالة ميزات الذكاء الاصطناعي'
              : 'Manage API keys and monitor AI feature status'}
          </p>
        </div>

        {/* API Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Gemini */}
          <div className={`rounded-xl border p-6 ${
            theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-playfair font-bold">Gemini Flash</h3>
              {geminiOk
                ? <CheckCircle className="w-5 h-5 text-green-500" />
                : <XCircle className="w-5 h-5 text-red-400" />
              }
            </div>
            <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              {language === 'ar' ? 'المهام: شات بوت، مقارنات، كتابة مقالات' : 'Tasks: Chatbot, comparisons, article writing'}
            </p>
            <p className={`text-xs ${geminiOk ? 'text-green-400' : 'text-red-400'}`}>
              {geminiOk
                ? (language === 'ar' ? 'متصل' : 'Connected')
                : (language === 'ar' ? 'غير متصل - أضف VITE_GEMINI_API_KEY' : 'Not connected - Add VITE_GEMINI_API_KEY')
              }
            </p>
            <div className={`mt-3 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              {language === 'ar' ? 'الحد المجاني: 1500 طلب/يوم' : 'Free tier: 1500 req/day'}
            </div>
          </div>

          {/* Groq */}
          <div className={`rounded-xl border p-6 ${
            theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-playfair font-bold">Groq (Llama 3.3)</h3>
              {groqOk
                ? <CheckCircle className="w-5 h-5 text-green-500" />
                : <XCircle className="w-5 h-5 text-red-400" />
              }
            </div>
            <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              {language === 'ar' ? 'المهام: ملخصات، بحث ذكي، SEO' : 'Tasks: Summaries, smart search, SEO'}
            </p>
            <p className={`text-xs ${groqOk ? 'text-green-400' : 'text-red-400'}`}>
              {groqOk
                ? (language === 'ar' ? 'متصل' : 'Connected')
                : (language === 'ar' ? 'غير متصل - أضف VITE_GROQ_API_KEY' : 'Not connected - Add VITE_GROQ_API_KEY')
              }
            </p>
            <div className={`mt-3 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              {language === 'ar' ? 'الحد المجاني: 14400 طلب/يوم' : 'Free tier: 14400 req/day'}
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className={`rounded-xl border overflow-hidden mb-8 ${
          theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
        }`}>
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gold/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-gold" />
              <span className="font-playfair font-bold">
                {language === 'ar' ? 'كيفية الإعداد' : 'Setup Instructions'}
              </span>
            </div>
            <span className="text-gold text-xl">{showInstructions ? '−' : '+'}</span>
          </button>
          {showInstructions && (
            <div className="px-6 pb-6">
              <div className={`text-sm space-y-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <div>
                  <p className="font-semibold text-gold mb-2">1. Gemini API Key ({language === 'ar' ? 'مجاني' : 'Free'})</p>
                  <p className="mb-1">{language === 'ar' ? 'اذهب إلى:' : 'Go to:'}</p>
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                    className="text-gold hover:underline inline-flex items-center gap-1">
                    Google AI Studio <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="mt-1">{language === 'ar' ? 'أنشئ مفتاح API وأضفه في ملف .env:' : 'Create an API key and add it to .env:'}</p>
                  <code className={`block mt-1 px-3 py-2 rounded text-xs ${
                    theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
                  }`}>VITE_GEMINI_API_KEY=your_key_here</code>
                </div>
                <div>
                  <p className="font-semibold text-gold mb-2">2. Groq API Key ({language === 'ar' ? 'مجاني' : 'Free'})</p>
                  <p className="mb-1">{language === 'ar' ? 'اذهب إلى:' : 'Go to:'}</p>
                  <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer"
                    className="text-gold hover:underline inline-flex items-center gap-1">
                    Groq Console <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="mt-1">{language === 'ar' ? 'أنشئ مفتاح API وأضفه في ملف .env:' : 'Create an API key and add it to .env:'}</p>
                  <code className={`block mt-1 px-3 py-2 rounded text-xs ${
                    theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
                  }`}>VITE_GROQ_API_KEY=your_key_here</code>
                </div>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gold/10' : 'bg-gold/5'}`}>
                  <p className="text-gold font-semibold text-xs">
                    {language === 'ar'
                      ? 'ملاحظة: أنشئ ملف .env في جذر المشروع ثم أعد تشغيل npm run dev'
                      : 'Note: Create a .env file in the project root, then restart npm run dev'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feature Status */}
        <div className={`rounded-xl border overflow-hidden ${
          theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
        }`}>
          <div className="bg-gold/10 px-6 py-3">
            <h3 className="font-playfair font-bold text-gold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {language === 'ar' ? 'حالة الميزات' : 'Feature Status'}
            </h3>
          </div>
          <div className="divide-y divide-dark-border">
            {features.map((feature, i) => (
              <div key={i} className={`px-6 py-4 flex items-center justify-between ${
                i % 2 === 0
                  ? theme === 'dark' ? 'bg-dark-card' : 'bg-white'
                  : theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
              }`}>
                <div>
                  <p className="font-semibold text-sm">{feature.name}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {feature.desc}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-medium ${feature.status ? 'text-green-400' : 'text-red-400'}`}>
                    {feature.status
                      ? (language === 'ar' ? 'مفعّل' : 'Active')
                      : (language === 'ar' ? 'غير مفعّل' : 'Inactive')
                    }
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {feature.provider}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Usage Estimate */}
        <div className={`mt-8 rounded-xl border p-6 ${
          theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
        }`}>
          <h3 className="font-playfair font-bold mb-4 text-gold">
            {language === 'ar' ? 'تقدير الاستخدام اليومي' : 'Daily Usage Estimate'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  <th className="text-left py-2">{language === 'ar' ? 'الميزة' : 'Feature'}</th>
                  <th className="text-center py-2">{language === 'ar' ? 'طلبات/يوم' : 'Req/Day'}</th>
                  <th className="text-center py-2">{language === 'ar' ? 'المزود' : 'Provider'}</th>
                </tr>
              </thead>
              <tbody className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {[
                  [language === 'ar' ? 'مستشار الساعات' : 'Watch Advisor', '~100', 'Gemini (1500)'],
                  [language === 'ar' ? 'كاتب المقالات' : 'Blog Writer', '~3', 'Gemini'],
                  [language === 'ar' ? 'المقارنات' : 'Comparisons', '~20', 'Gemini'],
                  [language === 'ar' ? 'ملخصات المراجعات' : 'Review Summaries', '~50', 'Groq (14400)'],
                  [language === 'ar' ? 'البحث الذكي' : 'Smart Search', '~30', 'Groq'],
                  [language === 'ar' ? 'SEO' : 'SEO Optimizer', '~20', 'Groq'],
                ].map(([feature, reqs, provider], i) => (
                  <tr key={i} className={i % 2 === 0
                    ? theme === 'dark' ? 'bg-dark-secondary/50' : 'bg-light-secondary/50'
                    : ''
                  }>
                    <td className="py-2">{feature}</td>
                    <td className="py-2 text-center text-gold font-medium">{reqs}</td>
                    <td className="py-2 text-center text-xs">{provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 text-xs text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            {language === 'ar'
              ? '~ 223 طلب/يوم - ضمن الحدود المجانية 100%'
              : '~223 req/day total - 100% within free tier limits'}
          </p>
        </div>
      </div>
    </div>
  );
}
