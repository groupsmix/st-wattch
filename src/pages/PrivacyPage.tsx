import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function PrivacyPage() {
  const { t } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-amber-500 transition-colors">{t.nav.home}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 dark:text-white">{t.footer.privacy}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {t.footer.privacy}
        </h1>
        <div className="h-1 w-16 bg-amber-500 rounded mb-8" />

        <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
          <p className="text-sm text-gray-500">Last updated: January 2024</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you subscribe to our newsletter, leave a comment, or contact us. This may include your email address and any other information you choose to provide.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Use of Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Send you our newsletter with the latest watch reviews and deals</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Improve our website and content</li>
            <li>Monitor and analyze trends, usage, and activities on our site</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to improve your browsing experience, store your preferences (such as dark mode and language settings), and analyze site traffic. You can control cookie settings through your browser.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. Third-Party Services</h2>
          <p>Our site contains affiliate links to third-party retailers like Amazon and Jomashop. When you click these links and make a purchase, we may earn a commission. These third-party sites have their own privacy policies that we encourage you to review.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. Data Security</h2>
          <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@wristnerd.com.</p>
        </div>
      </div>
    </div>
  );
}
