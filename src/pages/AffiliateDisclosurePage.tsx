import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function AffiliateDisclosurePage() {
  const { theme } = useTheme();
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = language === 'ar' ? 'إفصاح الشراكات - WristNerd' : 'Affiliate Disclosure - WristNerd';
  }, [language]);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Affiliate Disclosure' }]} />

        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-gold mx-auto mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-4">
            {t.affiliate.title} <span className="text-gold">{t.affiliate.titleHighlight}</span>
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.affiliate.subtitle}
          </p>
        </div>

        <div className={`rounded-xl border p-8 space-y-8 ${theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
          <div
            className={`p-6 rounded-lg border-l-4 border-gold ${
              theme === 'dark' ? 'bg-gold/5' : 'bg-gold/5'
            }`}
          >
            <p className={`leading-relaxed font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                            WristNerd is reader-supported. When you buy through links on our site, we may earn an 
                            affiliate commission at no additional cost to you. This helps us continue to provide free, 
                            in-depth watch reviews and comparisons.
            </p>
          </div>

          <section>
            <h2 className="font-playfair text-xl font-bold mb-3">How It Works</h2>
            <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              WristNerd participates in affiliate programs, including the Amazon Associates Program. 
              This means that when you click on certain links on our site and make a purchase, we may 
              receive a small commission from the retailer. This commission comes at absolutely no 
              additional cost to you - the price you pay is the same whether you use our link or go 
              directly to the retailer.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-bold mb-3">Our Commitment to Honesty</h2>
            <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Affiliate commissions never influence our reviews, ratings, or recommendations. We 
              maintain strict editorial independence. Our team evaluates watches based on their merits, 
              regardless of whether we earn a commission from the sale. If a watch isn't good, we'll 
              tell you - even if it would earn us more money to recommend it.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-bold mb-3">Types of Affiliate Links</h2>
            <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>"Check Price" and "Buy" buttons on product reviews</li>
              <li>Product names that link to retailer pages</li>
              <li>Comparison table links</li>
              <li>Links within "Where to Buy" sections</li>
            </ul>
            <p className={`mt-3 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              All affiliate links are marked with <code className="text-gold">rel="nofollow sponsored"</code> in 
              accordance with search engine guidelines.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-bold mb-3">Amazon Associates Disclosure</h2>
            <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              As an Amazon Associate, WristNerd earns from qualifying purchases. Amazon and the 
              Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. Product prices and 
              availability are accurate as of the date/time indicated and are subject to change. Any 
              price and availability information displayed on Amazon at the time of purchase will apply.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-bold mb-3">Questions?</h2>
            <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              If you have any questions about our affiliate relationships or how we make money, please 
              don't hesitate to reach out. We believe in full transparency with our readers.
            </p>
          </section>

          <div className="text-center pt-4">
            <Link
              to="/about"
              className="text-gold hover:underline font-medium"
            >
              Learn more about how we review watches &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
