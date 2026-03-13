import { useApp } from "../context/AppContext";

export default function AffiliateDisclosure() {
  const { theme, language } = useApp();

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          {language === "ar" ? "إفصاح الشراكة" : "Affiliate Disclosure"}
        </h1>
        <div className={`prose prose-sm max-w-none ${
          theme === "dark" ? "text-gray-300 prose-invert prose-headings:text-white" : "text-gray-600"
        }`}>
          {language === "ar" ? (
            <>
              <p>WristNerd هو مشارك في برامج شراكة متعددة بما في ذلك Amazon Associates و Jomashop.</p>
              <p>هذا يعني أنه عندما تنقر على روابط الشراء في مراجعاتنا وتقوم بعملية شراء، قد نحصل على عمولة صغيرة دون أي تكلفة إضافية عليك.</p>
              <h2>التزامنا</h2>
              <p>علاقات الشراكة لا تؤثر أبداً على مراجعاتنا أو تقييماتنا. نحن ملتزمون بتقديم مراجعات صادقة وغير منحازة.</p>
              <p>توصيات الذكاء الاصطناعي لدينا مبنية على المواصفات والقيمة، وليس على العمولات.</p>
            </>
          ) : (
            <>
              <p>WristNerd is a participant in multiple affiliate programs including Amazon Associates and Jomashop.</p>
              <p>This means when you click on purchase links in our reviews and make a purchase, we may earn a small commission at no additional cost to you.</p>
              <h2>Our Commitment</h2>
              <p>Affiliate relationships never influence our reviews or ratings. We are committed to providing honest, unbiased reviews.</p>
              <p>Our AI recommendations are based on specifications and value, not on commissions.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
