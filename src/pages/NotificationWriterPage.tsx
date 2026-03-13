import { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, Loader2, Copy, Check, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { callGroq } from '../services/ai/groq';
import { isGroqConfigured } from '../services/ai/config';

type NotificationType = 'order_confirmation' | 'shipping' | 'follow_up' | 'offer' | 'review_request' | 'welcome';

const notificationTypes: { type: NotificationType; labelEn: string; labelAr: string; icon: string }[] = [
  { type: 'order_confirmation', labelEn: 'Order Confirmation', labelAr: 'تأكيد الطلب', icon: '📦' },
  { type: 'shipping', labelEn: 'Shipping Update', labelAr: 'تحديث الشحن', icon: '🚚' },
  { type: 'follow_up', labelEn: 'Follow Up', labelAr: 'متابعة', icon: '💬' },
  { type: 'offer', labelEn: 'Special Offer', labelAr: 'عرض خاص', icon: '🎁' },
  { type: 'review_request', labelEn: 'Review Request', labelAr: 'طلب تقييم', icon: '⭐' },
  { type: 'welcome', labelEn: 'Welcome Message', labelAr: 'رسالة ترحيب', icon: '👋' },
];

type Channel = 'whatsapp' | 'email' | 'sms';

export default function NotificationWriterPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  useScrollReveal();

  const [selectedType, setSelectedType] = useState<NotificationType>('order_confirmation');
  const [channel, setChannel] = useState<Channel>('whatsapp');
  const [customerName, setCustomerName] = useState('Ahmed');
  const [productName, setProductName] = useState('Seiko Presage SRPD37');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const configured = isGroqConfigured();

  useEffect(() => {
    document.title = language === 'ar'
      ? 'مولّد الإشعارات - WristNerd'
      : 'Notification Writer - WristNerd';
    window.scrollTo(0, 0);
  }, [language]);

  const handleGenerate = async () => {
    if (isLoading || !configured) return;
    setIsLoading(true);
    setResult('');

    const typeLabel = notificationTypes.find(n => n.type === selectedType);
    const channelName = channel === 'whatsapp' ? 'WhatsApp' : channel === 'email' ? 'Email' : 'SMS';

    const systemPrompt = language === 'ar'
      ? `أنت كاتب رسائل محترف لمتجر ساعات WristNerd. اكتب رسالة ${channelName} قصيرة وودية وذكية. اكتب بالعربية بأسلوب طبيعي ودافئ. لا تستخدم markdown.`
      : `You are a professional notification writer for WristNerd watch store. Write a short, friendly, and smart ${channelName} message. Write naturally and warmly. No markdown.`;

    const prompt = language === 'ar'
      ? `اكتب رسالة ${channelName} من نوع "${typeLabel?.labelAr}" لعميل اسمه "${customerName}" بخصوص منتج "${productName}". الرسالة يجب أن تكون قصيرة ومهنية ودافئة. أضف لمسة شخصية.`
      : `Write a ${channelName} ${typeLabel?.labelEn} message for customer "${customerName}" regarding product "${productName}". Keep it short, professional, and warm. Add a personal touch.`;

    try {
      const response = await callGroq(prompt, systemPrompt);
      setResult(response);
    } catch (err) {
      console.error('Notification error:', err);
      setResult(language === 'ar' ? 'عذراً، حدث خطأ. حاول مرة أخرى.' : 'Sorry, generation failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 scroll-reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-gold" />
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              theme === 'dark' ? 'bg-gold/10 text-gold' : 'bg-gold/10 text-gold-dark'
            }`}>
              {language === 'ar' ? 'كتابة ذكية' : 'AI Writer'}
            </span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {language === 'ar' ? 'مولّد' : 'Notification'}{' '}
            <span className="text-gold">{language === 'ar' ? 'الإشعارات' : 'Writer'}</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'ar'
              ? 'اكتب رسائل ذكية للعملاء عبر واتساب وإيميل ورسائل نصية'
              : 'Write smart customer messages for WhatsApp, email, and SMS'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 scroll-reveal">
          {/* Configuration Panel */}
          <div className={`rounded-xl border p-6 ${
            theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
          }`}>
            {/* Notification Type */}
            <h3 className="font-playfair font-bold mb-3 text-gold text-sm">
              {language === 'ar' ? 'نوع الإشعار' : 'Notification Type'}
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {notificationTypes.map((nt) => (
                <button
                  key={nt.type}
                  onClick={() => setSelectedType(nt.type)}
                  className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                    selectedType === nt.type
                      ? 'border-gold bg-gold/10 text-gold'
                      : theme === 'dark'
                        ? 'border-dark-border hover:border-gold/30 text-gray-400'
                        : 'border-light-border hover:border-gold/30 text-gray-600'
                  }`}
                >
                  <span className="mr-1">{nt.icon}</span>
                  {language === 'ar' ? nt.labelAr : nt.labelEn}
                </button>
              ))}
            </div>

            {/* Channel */}
            <h3 className="font-playfair font-bold mb-3 text-gold text-sm">
              {language === 'ar' ? 'القناة' : 'Channel'}
            </h3>
            <div className="flex gap-2 mb-4">
              {(['whatsapp', 'email', 'sms'] as Channel[]).map((ch) => (
                <button
                  key={ch}
                  onClick={() => setChannel(ch)}
                  className={`px-4 py-2 rounded-lg border text-xs font-medium transition-all ${
                    channel === ch
                      ? 'border-gold bg-gold/10 text-gold'
                      : theme === 'dark'
                        ? 'border-dark-border text-gray-400'
                        : 'border-light-border text-gray-600'
                  }`}
                >
                  {ch === 'whatsapp' ? 'WhatsApp' : ch === 'email' ? 'Email' : 'SMS'}
                </button>
              ))}
            </div>

            {/* Customer Name */}
            <h3 className="font-playfair font-bold mb-2 text-gold text-sm">
              {language === 'ar' ? 'اسم العميل' : 'Customer Name'}
            </h3>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border text-sm mb-4 focus:outline-none focus:border-gold transition-colors ${
                theme === 'dark'
                  ? 'bg-dark-secondary border-dark-border text-white'
                  : 'bg-light-secondary border-light-border text-dark'
              }`}
            />

            {/* Product Name */}
            <h3 className="font-playfair font-bold mb-2 text-gold text-sm">
              {language === 'ar' ? 'المنتج' : 'Product'}
            </h3>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border text-sm mb-6 focus:outline-none focus:border-gold transition-colors ${
                theme === 'dark'
                  ? 'bg-dark-secondary border-dark-border text-white'
                  : 'bg-light-secondary border-light-border text-dark'
              }`}
            />

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !configured}
              className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-dark font-bold px-6 py-3 rounded-lg transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {language === 'ar' ? 'جاري الكتابة...' : 'Writing...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {language === 'ar' ? 'اكتب الرسالة' : 'Generate Message'}
                </>
              )}
            </button>
          </div>

          {/* Result Panel */}
          <div className={`rounded-xl border p-6 ${
            theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair font-bold text-gold text-sm">
                {language === 'ar' ? 'الرسالة' : 'Generated Message'}
              </h3>
              {result && (
                <div className="flex gap-2">
                  <button onClick={handleCopy} className="text-gold hover:text-gold-light transition-colors">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button onClick={handleGenerate} className="text-gold hover:text-gold-light transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {result ? (
              <div className={`whitespace-pre-line text-sm leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {result}
              </div>
            ) : (
              <div className={`flex flex-col items-center justify-center h-48 text-center ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm">
                  {language === 'ar' ? 'اختر نوع الإشعار واضغط "اكتب الرسالة"' : 'Select a type and click "Generate Message"'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
