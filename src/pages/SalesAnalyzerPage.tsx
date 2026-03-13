import { useState, useEffect } from 'react';
import { BarChart3, Sparkles, Loader2, TrendingUp, DollarSign, Clock, Package } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { callGemini } from '../services/ai/gemini';
import { isGeminiConfigured } from '../services/ai/config';
import { watches } from '../data/watches';

// Mock sales data for demonstration
const mockSalesData = {
  totalOrders: 847,
  totalRevenue: 142350,
  avgOrderValue: 168,
  topProducts: [
    { name: 'Casio G-Shock GA-2100', units: 312, revenue: 27768 },
    { name: 'Orient Bambino V2', units: 198, revenue: 33264 },
    { name: 'Seiko Presage SRPD37', units: 156, revenue: 54600 },
  ],
  peakHours: ['10:00-12:00', '19:00-21:00'],
  monthlyTrend: '+23%',
  returnRate: '2.1%',
};

export default function SalesAnalyzerPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  useScrollReveal();

  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const configured = isGeminiConfigured();

  useEffect(() => {
    document.title = language === 'ar'
      ? 'محلل المبيعات - WristNerd'
      : 'Sales Analyzer - WristNerd';
    window.scrollTo(0, 0);
  }, [language]);

  const handleAnalyze = async () => {
    if (isLoading || !configured) return;
    setIsLoading(true);

    const dataContext = `
Sales Data Summary:
- Total Orders: ${mockSalesData.totalOrders}
- Total Revenue: $${mockSalesData.totalRevenue}
- Average Order Value: $${mockSalesData.avgOrderValue}
- Top Products: ${mockSalesData.topProducts.map(p => `${p.name} (${p.units} units, $${p.revenue})`).join(', ')}
- Peak Hours: ${mockSalesData.peakHours.join(', ')}
- Monthly Trend: ${mockSalesData.monthlyTrend}
- Return Rate: ${mockSalesData.returnRate}
- Available watches: ${watches.map(w => `${w.brand} ${w.name} ($${w.price})`).join(', ')}
    `;

    const systemPrompt = language === 'ar'
      ? 'أنت محلل مبيعات خبير لمتجر ساعات. حلل البيانات وقدم توصيات عملية لزيادة المبيعات. اكتب بأسلوب مهني وواضح. لا تستخدم markdown.'
      : 'You are an expert sales analyst for a watch store. Analyze the data and provide actionable recommendations to increase sales. Write in a professional, clear style. No markdown.';

    const prompt = language === 'ar'
      ? `حلل بيانات المبيعات التالية وقدم:\n1. ملخص الأداء العام\n2. تحليل المنتجات الأفضل أداءً\n3. أوقات الذروة واستراتيجيات الاستفادة منها\n4. 5 توصيات عملية لزيادة المبيعات\n5. منتجات يجب الترويج لها أكثر\n\nالبيانات:\n${dataContext}`
      : `Analyze the following sales data and provide:\n1. Overall performance summary\n2. Top product analysis\n3. Peak hours strategy\n4. 5 actionable recommendations to increase sales\n5. Products to promote more\n\nData:\n${dataContext}`;

    try {
      const result = await callGemini(prompt, systemPrompt);
      setAnalysis(result);
    } catch (err) {
      console.error('Analysis error:', err);
      setAnalysis(language === 'ar' ? 'عذراً، حدث خطأ. حاول مرة أخرى.' : 'Sorry, analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 scroll-reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="w-6 h-6 text-gold" />
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              theme === 'dark' ? 'bg-gold/10 text-gold' : 'bg-gold/10 text-gold-dark'
            }`}>
              {language === 'ar' ? 'تحليل ذكي' : 'AI Analytics'}
            </span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {language === 'ar' ? 'محلل' : 'Sales'}{' '}
            <span className="text-gold">{language === 'ar' ? 'المبيعات' : 'Analyzer'}</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'ar'
              ? 'تحليل ذكي للمبيعات مع توصيات عملية لزيادة الأرباح'
              : 'Smart sales analysis with actionable recommendations'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 scroll-reveal">
          {[
            { icon: Package, label: language === 'ar' ? 'إجمالي الطلبات' : 'Total Orders', value: mockSalesData.totalOrders.toLocaleString(), color: 'text-blue-400' },
            { icon: DollarSign, label: language === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue', value: `$${mockSalesData.totalRevenue.toLocaleString()}`, color: 'text-green-400' },
            { icon: TrendingUp, label: language === 'ar' ? 'النمو الشهري' : 'Monthly Growth', value: mockSalesData.monthlyTrend, color: 'text-gold' },
            { icon: Clock, label: language === 'ar' ? 'أوقات الذروة' : 'Peak Hours', value: mockSalesData.peakHours[0], color: 'text-purple-400' },
          ].map((stat, i) => (
            <div key={i} className={`rounded-xl border p-4 text-center ${
              theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
            }`}>
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</p>
              <p className="font-bold text-lg">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Top Products Table */}
        <div className={`rounded-xl border overflow-hidden mb-8 scroll-reveal ${
          theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
        }`}>
          <div className="bg-gold/10 px-6 py-3">
            <h3 className="font-playfair font-bold text-gold">
              {language === 'ar' ? 'أفضل المنتجات' : 'Top Products'}
            </h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className={theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}>
                <th className="text-left px-6 py-3 text-xs font-semibold">{language === 'ar' ? 'المنتج' : 'Product'}</th>
                <th className="text-center px-4 py-3 text-xs font-semibold">{language === 'ar' ? 'الوحدات' : 'Units'}</th>
                <th className="text-center px-4 py-3 text-xs font-semibold">{language === 'ar' ? 'الإيرادات' : 'Revenue'}</th>
              </tr>
            </thead>
            <tbody>
              {mockSalesData.topProducts.map((product, i) => (
                <tr key={i} className={i % 2 === 0
                  ? theme === 'dark' ? 'bg-dark-card' : 'bg-white'
                  : theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
                }>
                  <td className="px-6 py-3 text-sm font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-center text-sm text-gold font-bold">{product.units}</td>
                  <td className="px-4 py-3 text-center text-sm text-green-400 font-bold">${product.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Analysis Button */}
        {!analysis && (
          <div className="text-center mb-8 scroll-reveal">
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !configured}
              className="flex items-center gap-2 mx-auto bg-gold hover:bg-gold-light text-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {language === 'ar' ? 'جاري التحليل...' : 'Analyzing...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {language === 'ar' ? 'حلل المبيعات بالذكاء الاصطناعي' : 'Analyze with AI'}
                </>
              )}
            </button>
            {!configured && (
              <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'ar' ? 'أضف VITE_GEMINI_API_KEY لتفعيل التحليل' : 'Add VITE_GEMINI_API_KEY to enable analysis'}
              </p>
            )}
          </div>
        )}

        {/* AI Analysis Result */}
        {analysis && (
          <div className={`rounded-xl border p-6 sm:p-8 scroll-reveal ${
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
              {analysis.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
