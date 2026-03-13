import { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function PrivacyPolicyPage() {
  const { theme } = useTheme();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy - WristNerd';
  }, []);

  const sectionClass = `rounded-xl border p-6 mb-6 ${
    theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
  }`;
  const textClass = `leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />

        <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-4 animate-fade-in-up">
          Privacy <span className="text-gold">Policy</span>
        </h1>
        <p className={`text-sm mb-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
          Last updated: March 2026
        </p>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Information We Collect</h2>
          <p className={textClass}>
            When you visit WristNerd, we may collect certain information automatically, including your IP address,
            browser type, operating system, referring URLs, and information about how you interact with our site.
            If you subscribe to our newsletter, we collect your email address.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">How We Use Your Information</h2>
          <ul className={`list-disc list-inside space-y-2 ${textClass}`}>
            <li>To provide and improve our website content</li>
            <li>To send you newsletter updates if you've subscribed</li>
            <li>To analyze site traffic and usage patterns</li>
            <li>To personalize your experience on our site</li>
          </ul>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Cookies</h2>
          <p className={textClass}>
            We use cookies and similar technologies to enhance your browsing experience, serve personalized content,
            and analyze our traffic. You can control cookies through your browser settings. We use localStorage to
            save your theme preference and language selection.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Affiliate Links</h2>
          <p className={textClass}>
            Our site contains affiliate links to products on Amazon and other retailers. When you click these links
            and make a purchase, we may earn a commission at no additional cost to you. These affiliate programs may
            use cookies to track referrals. Please refer to our{' '}
            <a href="/affiliate-disclosure" className="text-gold hover:underline">Affiliate Disclosure</a> for more details.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Third-Party Services</h2>
          <p className={textClass}>
            We may use third-party services such as Google Analytics and Google Fonts, which have their own privacy
            policies. The Virtual Try-On feature uses MediaPipe for hand detection, which processes camera data
            entirely in your browser - no images are sent to our servers.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Your Rights</h2>
          <p className={textClass}>
            You have the right to access, correct, or delete your personal information. You can unsubscribe from
            our newsletter at any time by clicking the unsubscribe link in any email. To exercise any of these
            rights, please contact us at privacy@wristnerd.com.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Changes to This Policy</h2>
          <p className={textClass}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting
            the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </div>
      </div>
    </div>
  );
}
