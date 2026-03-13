import { useApp } from "../context/AppContext";

export default function Privacy() {
  const { theme, language } = useApp();

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
        </h1>
        <div className={`prose prose-sm max-w-none ${
          theme === "dark" ? "text-gray-300 prose-invert prose-headings:text-white" : "text-gray-600"
        }`}>
          {language === "ar" ? (
            <>
              <p>آخر تحديث: مارس 2026</p>
              <h2>المعلومات التي نجمعها</h2>
              <p>نحن نجمع المعلومات التي تقدمها لنا مباشرة عند الاشتراك في النشرة البريدية أو استخدام مستشار الساعات الذكي.</p>
              <h2>كيف نستخدم معلوماتك</h2>
              <p>نستخدم المعلومات لتحسين خدماتنا وتقديم توصيات مخصصة وإرسال النشرة البريدية.</p>
              <h2>ملفات تعريف الارتباط</h2>
              <p>نستخدم ملفات تعريف الارتباط لتخزين تفضيلاتك مثل اللغة والمظهر.</p>
              <h2>الذكاء الاصطناعي</h2>
              <p>تتم معالجة محادثاتك مع مستشار الساعات الذكي لتقديم توصيات. لا نخزن المحادثات بشكل دائم.</p>
              <h2>روابط الشراكة</h2>
              <p>قد نكسب عمولة من المشتريات عبر روابط الشراكة. هذا لا يؤثر على أسعارك.</p>
              <h2>اتصل بنا</h2>
              <p>لأي استفسارات حول الخصوصية، تواصل معنا عبر البريد الإلكتروني.</p>
            </>
          ) : (
            <>
              <p>Last updated: March 2026</p>
              <h2>Information We Collect</h2>
              <p>We collect information you provide directly when subscribing to our newsletter or using our AI Watch Advisor chatbot.</p>
              <h2>How We Use Your Information</h2>
              <p>We use information to improve our services, provide personalized recommendations, and send newsletters.</p>
              <h2>Cookies</h2>
              <p>We use cookies to store your preferences such as language and theme settings.</p>
              <h2>Artificial Intelligence</h2>
              <p>Your conversations with the AI Watch Advisor are processed to provide recommendations. We do not permanently store conversations.</p>
              <h2>Affiliate Links</h2>
              <p>We may earn a commission from purchases made through affiliate links. This does not affect your prices.</p>
              <h2>Contact Us</h2>
              <p>For any privacy inquiries, please contact us via email.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
