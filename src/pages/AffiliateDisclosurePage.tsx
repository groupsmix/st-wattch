import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function AffiliateDisclosurePage() {
  const { t } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-amber-500 transition-colors">{t.nav.home}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 dark:text-white">{t.footer.affiliate}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {t.footer.affiliate}
        </h1>
        <div className="h-1 w-16 bg-amber-500 rounded mb-8" />

        <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
          <p className="text-sm text-gray-500">Last updated: January 2024</p>

          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <p className="font-medium text-amber-800 dark:text-amber-300">
              WristNerd is a participant in affiliate advertising programs designed to provide a means for us to earn fees by linking to retailer websites.
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">How It Works</h2>
          <p>When you click on a link to a retailer on our site and make a purchase, we may receive a small commission at no additional cost to you. This helps us maintain and improve our content, keeping our reviews free and accessible to everyone.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Our Partners</h2>
          <p>We participate in affiliate programs with the following retailers:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Amazon Associates Program</li>
            <li>Jomashop Affiliate Program</li>
            <li>Long Island Watch</li>
            <li>Chrono24</li>
            <li>Various brand official stores</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Editorial Independence</h2>
          <p>Our editorial content, including reviews, ratings, and recommendations, is not influenced by our affiliate partnerships. We review watches based on their merits, and our opinions are our own. We never give positive reviews in exchange for affiliate commissions.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Price Accuracy</h2>
          <p>While we make every effort to display accurate pricing information, prices may change between the time of writing and your visit. Always verify the current price on the retailer's website before making a purchase.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Questions?</h2>
          <p>If you have any questions about our affiliate relationships, please contact us at affiliate@wristnerd.com.</p>
        </div>
      </div>
    </div>
  );
}
