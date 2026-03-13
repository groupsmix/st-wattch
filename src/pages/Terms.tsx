import { useApp } from "../context/AppContext";

export default function Terms() {
  const { theme, language } = useApp();

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          {language === "ar" ? "شروط الاستخدام" : "Terms of Service"}
        </h1>
        <div className={`prose prose-sm max-w-none ${
          theme === "dark" ? "text-gray-300 prose-invert prose-headings:text-white" : "text-gray-600"
        }`}>
          {language === "ar" ? (
            <>
              <p>آخر تحديث: مارس 2026</p>
              <h2>قبول الشروط</h2>
              <p>باستخدامك لموقع WristNerd، فإنك توافق على هذه الشروط.</p>
              <h2>المحتوى</h2>
              <p>جميع المراجعات والتوصيات هي آراء ولا تشكل نصيحة مالية. المحتوى المولد بالذكاء الاصطناعي مقدم كمساعدة وقد لا يكون دقيقاً دائماً.</p>
              <h2>روابط الشراكة</h2>
              <p>قد نكسب عمولة من المشتريات عبر روابطنا. الأسعار والتوفر قد تتغير.</p>
              <h2>الملكية الفكرية</h2>
              <p>جميع المحتويات محمية بحقوق النشر ولا يجوز إعادة استخدامها بدون إذن.</p>
            </>
          ) : (
            <>
              <p>Last updated: March 2026</p>
              <h2>Acceptance of Terms</h2>
              <p>By using WristNerd, you agree to these terms of service.</p>
              <h2>Content</h2>
              <p>All reviews and recommendations are opinions and do not constitute financial advice. AI-generated content is provided as assistance and may not always be accurate.</p>
              <h2>Affiliate Links</h2>
              <p>We may earn commissions from purchases through our links. Prices and availability are subject to change.</p>
              <h2>Intellectual Property</h2>
              <p>All content is protected by copyright and may not be reused without permission.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
