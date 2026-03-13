import { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function TermsOfServicePage() {
  const { theme } = useTheme();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service - WristNerd';
  }, []);

  const sectionClass = `rounded-xl border p-6 mb-6 ${
    theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
  }`;
  const textClass = `leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Terms of Service' }]} />

        <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-4 animate-fade-in-up">
          Terms of <span className="text-gold">Service</span>
        </h1>
        <p className={`text-sm mb-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
          Last updated: March 2026
        </p>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Acceptance of Terms</h2>
          <p className={textClass}>
            By accessing and using WristNerd, you accept and agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our website.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Use of Content</h2>
          <p className={textClass}>
            All content on WristNerd, including reviews, comparisons, images, and text, is protected by copyright.
            You may not reproduce, distribute, or create derivative works from our content without prior written
            permission. You may share links to our content and quote brief excerpts for non-commercial purposes
            with proper attribution.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Reviews & Opinions</h2>
          <p className={textClass}>
            Our watch reviews and comparisons represent the opinions of our editorial team based on hands-on testing.
            While we strive for accuracy, we cannot guarantee that all information is complete or up-to-date.
            Prices, availability, and specifications may change without notice. Always verify details with the
            manufacturer or retailer before making a purchase.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Affiliate Links</h2>
          <p className={textClass}>
            WristNerd participates in affiliate programs, including the Amazon Associates Program. When you click
            on affiliate links and make a purchase, we may earn a commission at no extra cost to you. This does
            not influence our editorial content or ratings.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Disclaimer of Warranties</h2>
          <p className={textClass}>
            WristNerd is provided "as is" without any warranties, express or implied. We do not warrant that the
            site will be uninterrupted, error-free, or free of viruses or other harmful components. Your use of
            the site is at your own risk.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Limitation of Liability</h2>
          <p className={textClass}>
            WristNerd shall not be liable for any direct, indirect, incidental, or consequential damages arising
            from your use of the site or any products purchased through our affiliate links. Our total liability
            shall not exceed the amount you paid to access our site (which is zero, as our content is free).
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Changes to Terms</h2>
          <p className={textClass}>
            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
            upon posting to the site. Your continued use of WristNerd after changes are posted constitutes acceptance
            of the modified terms.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className="font-playfair text-xl font-bold mb-3 text-gold">Contact</h2>
          <p className={textClass}>
            If you have any questions about these Terms of Service, please contact us at legal@wristnerd.com.
          </p>
        </div>
      </div>
    </div>
  );
}
