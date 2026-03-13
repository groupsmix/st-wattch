import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function TermsPage() {
  const { t } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-amber-500 transition-colors">{t.nav.home}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 dark:text-white">{t.footer.terms}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {t.footer.terms}
        </h1>
        <div className="h-1 w-16 bg-amber-500 rounded mb-8" />

        <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
          <p className="text-sm text-gray-500">Last updated: January 2024</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>By accessing and using WristNerd, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree, please do not use this website.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Content</h2>
          <p>All content on WristNerd, including reviews, comparisons, and recommendations, represents the opinions of our editorial team. We strive for accuracy but cannot guarantee that all information is complete or up-to-date. Prices and availability may change without notice.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. Affiliate Links</h2>
          <p>WristNerd participates in affiliate programs with various watch retailers. This means we may earn a commission when you click on affiliate links and make a purchase. This does not affect our editorial independence or the price you pay.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. AI-Generated Content</h2>
          <p>Some features on our site, including the Watch Advisor chatbot and AI summaries, use artificial intelligence to generate recommendations. While we strive for accuracy, AI-generated content should be used as a starting point for your research, not as definitive advice.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. Intellectual Property</h2>
          <p>All content, design, and graphics on this website are the property of WristNerd and are protected by copyright laws. You may not reproduce, distribute, or transmit any content without prior written consent.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">6. Limitation of Liability</h2>
          <p>WristNerd shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of this website.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">7. Contact</h2>
          <p>For questions regarding these terms, please contact us at legal@wristnerd.com.</p>
        </div>
      </div>
    </div>
  );
}
