import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, X as XIcon, ExternalLink } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import StarRating from '../components/StarRating';
import AffiliateButton from '../components/AffiliateButton';
import ReadingProgress from '../components/ReadingProgress';
import TableOfContents from '../components/TableOfContents';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { bestUnder200 } from '../data/watches';

export default function BestOfPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = '7 Best Watches Under $200 in 2026 - WristNerd';
  }, []);

  const tocItems = [
    { id: 'quick-comparison', title: 'Quick Comparison' },
    ...bestUnder200.map((w) => ({
      id: `watch-${w.rank}`,
      title: `${w.rank}. ${w.name}`,
    })),
    { id: 'buying-guide', title: 'Buying Guide' },
    { id: 'faq', title: 'FAQ' },
  ];

  const faqItems = [
    {
      question: 'What is the best watch under $200 overall?',
      answer: 'The Orient Bambino Version 2 is our top pick for its exceptional combination of in-house automatic movement, classic design, and unbeatable value. If you prefer a sportier option, the Casio G-Shock GA-2100 is the way to go.',
    },
    {
      question: 'Are automatic watches better than quartz?',
      answer: 'Not necessarily - they serve different purposes. Automatic watches are prized for their craftsmanship and the fact that they never need a battery. Quartz watches are more accurate, lower maintenance, and often more affordable. It comes down to personal preference.',
    },
    {
      question: 'Can I swim with watches under $200?',
      answer: 'Some, yes! The Casio G-Shock GA-2100 (200m), Casio Duro (200m), and Orient Ray II (200m) are all excellent for swimming. However, dress watches like the Bambino (30m) should be kept away from water.',
    },
    {
      question: 'How often do automatic watches need servicing?',
      answer: 'Most manufacturers recommend servicing every 3-5 years, but many affordable automatics run well for much longer. A basic service typically costs $50-150 for watches in this price range.',
    },
    {
      question: 'Where is the best place to buy watches online?',
      answer: 'Amazon offers the best combination of price, selection, and buyer protection. Jomashop and Long Island Watch are also excellent options, often with competitive pricing on specific brands.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { name: 'Best Of', path: '/' },
              { name: '7 Best Watches Under $200' },
            ]}
          />

          {/* Title */}
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-up">
            7 Best Watches Under $200 in <span className="text-gold">2026</span>
          </h1>

          <p className={`text-xs italic mb-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            This post contains affiliate links. We may earn a commission at no extra cost to you.{' '}
            <Link to="/affiliate-disclosure" className="text-gold hover:underline">Learn more</Link>
          </p>

          <p className={`text-lg mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Looking for an amazing watch without breaking the bank? You don't need to spend thousands to get a quality 
            timepiece. We've tested and reviewed dozens of watches to bring you the absolute best options under $200. 
            Whether you're after a classic dress watch, a tough sports watch, or a capable dive watch, this list has 
            something for everyone.
          </p>

          {/* Table of Contents */}
          <TableOfContents items={tocItems} />

          {/* Quick Comparison Table */}
          <section id="quick-comparison" className="mb-12 scroll-reveal">
            <h2 className="font-playfair text-2xl font-bold mb-6">
              {t.bestOf.quickComparison} <span className="text-gold">{t.bestOf.quickComparisonHighlight}</span>
            </h2>
            <div className={`rounded-xl border overflow-x-auto ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className={theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">{t.bestOf.watch}</th>
                    <th className="px-4 py-3 text-left">{t.bestOf.bestFor}</th>
                    <th className="px-4 py-3 text-center">{t.bestOf.rating}</th>
                    <th className="px-4 py-3 text-right">{t.bestOf.price}</th>
                    <th className="px-4 py-3 text-center">{t.bestOf.buy}</th>
                  </tr>
                </thead>
                <tbody>
                  {bestUnder200.map((watch, i) => (
                    <tr
                      key={watch.rank}
                      className={
                        i % 2 === 0
                          ? theme === 'dark' ? 'bg-dark-card' : 'bg-white'
                          : theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
                      }
                    >
                      <td className="px-4 py-3 font-bold text-gold">{watch.rank}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={watch.image} alt={watch.name} className="w-10 h-10 rounded object-cover" loading="lazy" />
                          <div>
                            <p className="font-semibold whitespace-nowrap">{watch.name}</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{watch.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-gold/10 text-gold text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                          {watch.bestFeature}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <StarRating rating={watch.rating} size={12} />
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-gold">{watch.price}</td>
                      <td className="px-4 py-3 text-center">
                        <a
                          href={watch.affiliateUrl}
                          target="_blank"
                          rel="nofollow sponsored"
                          className="inline-flex items-center gap-1 bg-gold hover:bg-gold-light text-dark text-xs font-bold px-3 py-1.5 rounded transition-colors"
                        >
                          {t.bestOf.buy} <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Individual Watch Reviews */}
          {bestUnder200.map((watch) => (
            <section
              key={watch.rank}
              id={`watch-${watch.rank}`}
              className="mb-12 scroll-reveal"
            >
              <div
                className={`rounded-xl border overflow-hidden ${
                  theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
                }`}
              >
                <div className="bg-gold/10 px-6 py-3 border-b border-gold/20 flex items-center justify-between">
                  <h2 className="font-playfair text-xl font-bold">
                    <span className="text-gold">#{watch.rank}</span> {watch.name}
                  </h2>
                  <span className="bg-gold text-dark text-xs font-bold px-3 py-1 rounded-full">
                    {watch.bestFeature}
                  </span>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={watch.image}
                        alt={watch.name}
                        className="w-full rounded-lg"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={watch.rating} size={18} showNumber />
                      </div>
                      <p className="text-2xl font-bold text-gold mb-4">{watch.price}</p>
                      <p className={`mb-4 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {watch.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-green-400 mb-2">{t.review.pros}</h4>
                        <ul className="space-y-1">
                          {watch.pros.map((pro, i) => (
                            <li key={i} className={`text-sm flex items-start gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                              <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-red-400 mb-2">{t.review.cons}</h4>
                        <ul className="space-y-1">
                          {watch.cons.map((con, i) => (
                            <li key={i} className={`text-sm flex items-start gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                              <XIcon className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-3">
                        <AffiliateButton url={watch.affiliateUrl} text={t.bestOf.checkPriceAmazon} size="sm" />
                        {watch.slug && (
                          <Link
                            to={`/review/${watch.slug}`}
                            className={`inline-flex items-center gap-1 font-semibold px-4 py-2 rounded-lg border-2 border-gold text-gold hover:bg-gold hover:text-dark transition-colors text-sm`}
                          >
                            {t.bestOf.fullReview}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* Buying Guide */}
          <section id="buying-guide" className="mb-12 scroll-reveal">
            <h2 className="font-playfair text-2xl font-bold mb-6">
              {t.bestOf.buyingGuide} <span className="text-gold">{t.bestOf.buyingGuideHighlight}</span>
            </h2>
            <div className={`rounded-xl border p-6 space-y-6 ${theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
              {[
                {
                  title: 'Movement Type',
                  content: 'The biggest decision is between automatic (mechanical) and quartz movements. Automatic watches are powered by wrist movement and are prized by enthusiasts for their craftsmanship. Quartz watches use a battery, are more accurate, and require less maintenance. Both have their place - it depends on what you value more.',
                },
                {
                  title: 'Water Resistance',
                  content: 'If you plan to swim or shower with your watch, look for at least 100m water resistance. Watches rated at 30m or 50m can handle splashes but shouldn\'t be submerged. For diving, you\'ll want 200m or more.',
                },
                {
                  title: 'Case Size',
                  content: 'A 38-42mm case works for most wrists. If you have smaller wrists (under 6.5"), consider 38-40mm. Larger wrists can pull off 42-44mm. Always check the lug-to-lug distance too - it affects how the watch sits.',
                },
                {
                  title: 'Crystal Type',
                  content: 'Sapphire crystal is the most scratch-resistant but adds cost. Mineral crystal (including Seiko\'s Hardlex) offers good protection at a lower price. Acrylic/plastic crystals scratch easily but can be polished out.',
                },
                {
                  title: 'Brand Reputation',
                  content: 'Stick with established brands like Seiko, Orient, Casio, Citizen, and Timex for watches under $200. These brands have decades of proven reliability and good after-sales support.',
                },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="font-playfair text-lg font-semibold mb-2 text-gold">{item.title}</h3>
                  <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-12 scroll-reveal">
            <h2 className="font-playfair text-2xl font-bold mb-6">
              {t.review.faq} <span className="text-gold">{t.review.faqHighlight}</span>
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq, i) => (
                <details
                  key={i}
                  className={`rounded-xl border overflow-hidden group ${
                    theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
                  }`}
                >
                  <summary className="cursor-pointer px-6 py-4 font-semibold hover:text-gold transition-colors list-none flex items-center justify-between">
                    {faq.question}
                    <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className={`px-6 pb-4 text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
