import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, X as XIcon, ExternalLink, Trophy } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import StarRating from '../components/StarRating';
import RatingBar from '../components/RatingBar';
import AffiliateButton from '../components/AffiliateButton';
import ReadingProgress from '../components/ReadingProgress';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { watches } from '../data/watches';

export default function ComparisonPage() {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  useScrollReveal();

  const watch1 = watches.find((w) => w.id === 'seiko-presage-srpd37')!;
  const watch2 = watches.find((w) => w.id === 'orient-bambino-v2')!;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = language === 'ar'
      ? 'Seiko Presage ضد Orient Bambino: المقارنة النهائية - WristNerd'
      : 'Seiko Presage vs Orient Bambino: The Ultimate Dress Watch Showdown - WristNerd';
  }, [language]);

  const comparisonPoints = [
    {
      category: 'Design & Aesthetics',
      watch1Score: 9,
      watch2Score: 8,
      analysis: 'Both watches excel in the design department, but for different reasons. The Seiko Presage features a show-stopping cocktail-inspired dial with a mesmerizing blue gradient that catches light in spectacular fashion. It\'s a modern take on dress watch design that feels fresh and exciting. The Orient Bambino, on the other hand, takes a more traditional approach with its clean, classic dial and domed crystal that evokes vintage timepieces from the 1950s. If you want something eye-catching and contemporary, the Presage wins. If you prefer timeless, understated elegance, the Bambino is your watch.',
    },
    {
      category: 'Movement & Accuracy',
      watch1Score: 8,
      watch2Score: 7,
      analysis: 'The Seiko Presage uses the 4R35 movement, which offers hand-winding and hacking - two features that the Orient Bambino\'s F6724 caliber lacks. In terms of raw accuracy, the Seiko tends to perform slightly better, typically running within +8 seconds per day compared to the Orient\'s +10-15 seconds per day. Both movements are reliable workhorses with similar power reserves (41 hours vs 40+ hours), but the Seiko\'s additional features give it the edge.',
    },
    {
      category: 'Build Quality & Durability',
      watch1Score: 7,
      watch2Score: 6,
      analysis: 'The Presage offers better water resistance at 50m compared to the Bambino\'s 30m, making it slightly more practical for daily wear. Both use mineral crystals (Hardlex vs standard mineral), though the Bambino\'s domed crystal is more prone to catching light reflections. Case finishing is comparable, with both watches offering polished stainless steel cases that look and feel premium for the price.',
    },
    {
      category: 'Comfort & Wearability',
      watch1Score: 8,
      watch2Score: 8,
      analysis: 'This is essentially a tie. Both watches share a similar 40.5mm case diameter and sit comfortably on the wrist. At 70g (Seiko) vs 66g (Orient), the difference in weight is negligible. Both come with leather straps that are adequate but benefit from upgrading. The Seiko uses 20mm lugs while the Orient uses 22mm lugs, giving the Bambino slightly more presence on the wrist.',
    },
    {
      category: 'Value for Money',
      watch1Score: 9,
      watch2Score: 10,
      analysis: 'The Orient Bambino takes the crown here. At nearly half the price of the Presage ($168 vs $350), it delivers an in-house automatic movement, beautiful design, and excellent build quality. While the Presage arguably offers a more refined overall package, the Bambino\'s price-to-quality ratio is simply unmatched in the watch industry. For budget-conscious buyers, the Bambino is the clear winner.',
    },
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Seiko Presage vs Orient Bambino: The Ultimate Dress Watch Showdown',
    author: { '@type': 'Organization', name: 'WristNerd' },
    datePublished: '2026-03-01',
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { name: 'Comparisons', path: '/' },
              { name: 'Seiko Presage vs Orient Bambino' },
            ]}
          />

          {/* Title */}
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-up">
            Seiko Presage vs Orient Bambino:{' '}
            <span className="text-gold">The Ultimate Dress Watch Showdown</span>
          </h1>

          <p className={`text-xs italic mb-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            {t.review.affiliateDisclaimer}{' '}
            <Link to="/affiliate-disclosure" className="text-gold hover:underline">{t.review.learnMore}</Link>
          </p>

          {/* Head to Head */}
          <div
            className={`rounded-xl border overflow-hidden mb-12 scroll-reveal ${
              theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
            }`}
          >
            <div className="bg-gold/10 px-6 py-3 border-b border-gold/20">
              <h2 className="font-playfair text-xl font-bold text-gold text-center">{t.comparison.headToHead}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dark-border">
              {/* Watch 1 */}
              <div className="p-6 text-center">
                <img src={watch1.image} alt={`${watch1.brand} ${watch1.name}`} className="w-48 h-48 object-cover rounded-lg mx-auto mb-4" />
                <p className={`text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{watch1.brand}</p>
                <h3 className="font-playfair text-xl font-bold mb-2">{watch1.name}</h3>
                <div className="flex justify-center mb-2">
                  <StarRating rating={watch1.rating} size={16} showNumber />
                </div>
                <p className="text-2xl font-bold text-gold mb-4">${watch1.price}</p>
                <AffiliateButton url="#" text="Check Price" size="sm" fullWidth />
              </div>

              {/* Watch 2 */}
              <div className="p-6 text-center">
                <img src={watch2.image} alt={`${watch2.brand} ${watch2.name}`} className="w-48 h-48 object-cover rounded-lg mx-auto mb-4" />
                <p className={`text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{watch2.brand}</p>
                <h3 className="font-playfair text-xl font-bold mb-2">{watch2.name}</h3>
                <div className="flex justify-center mb-2">
                  <StarRating rating={watch2.rating} size={16} showNumber />
                </div>
                <p className="text-2xl font-bold text-gold mb-4">${watch2.price}</p>
                <AffiliateButton url="#" text="Check Price" size="sm" fullWidth />
              </div>
            </div>
          </div>

          {/* Specs Comparison Table */}
          <section className="mb-12 scroll-reveal">
            <h2 className="font-playfair text-2xl font-bold mb-6">
              {t.comparison.specsComparison} <span className="text-gold">{t.comparison.specsComparisonHighlight}</span>
            </h2>
            <div className={`rounded-xl border overflow-hidden ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
              {/* Header */}
              <div className={`grid grid-cols-3 px-4 py-3 font-semibold text-sm ${theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}`}>
                <span>{t.comparison.specification}</span>
                <span className="text-center text-gold">Seiko Presage</span>
                <span className="text-center text-gold">Orient Bambino</span>
              </div>
              {Object.keys(watch1.specifications).map((key, i) => (
                <div
                  key={key}
                  className={`grid grid-cols-3 px-4 py-3 text-sm ${
                    i % 2 === 0
                      ? theme === 'dark' ? 'bg-dark-card' : 'bg-white'
                      : theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'
                  }`}
                >
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{key}</span>
                  <span className="text-center font-medium">{watch1.specifications[key]}</span>
                  <span className="text-center font-medium">{watch2.specifications[key] || '-'}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Comparison Points */}
          {comparisonPoints.map((point, i) => (
            <section key={i} className="mb-12 scroll-reveal">
              <h2 className="font-playfair text-2xl font-bold mb-4">{point.category}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className={`p-4 rounded-xl border text-center ${theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
                  <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Seiko Presage</p>
                  <span className="text-2xl font-bold text-gold">{point.watch1Score}/10</span>
                </div>
                <div className={`p-4 rounded-xl border text-center ${theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
                  <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Orient Bambino</p>
                  <span className="text-2xl font-bold text-gold">{point.watch2Score}/10</span>
                </div>
              </div>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{point.analysis}</p>
            </section>
          ))}

          {/* Rating Summary */}
          <section className="mb-12 scroll-reveal">
            <h2 className="font-playfair text-2xl font-bold mb-6">
              {t.comparison.overallRatings} <span className="text-gold">{t.comparison.overallRatingsHighlight}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
                <h3 className="font-playfair text-lg font-bold mb-4 text-center">Seiko Presage SRPD37</h3>
                <div className="space-y-3">
                  {comparisonPoints.map((p) => (
                    <RatingBar key={p.category} label={p.category} score={p.watch1Score} />
                  ))}
                </div>
              </div>
              <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
                <h3 className="font-playfair text-lg font-bold mb-4 text-center">Orient Bambino V2</h3>
                <div className="space-y-3">
                  {comparisonPoints.map((p) => (
                    <RatingBar key={p.category} label={p.category} score={p.watch2Score} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Our Pick */}
          <section className="mb-12 scroll-reveal">
            <div
              className={`rounded-xl border p-8 text-center ${
                theme === 'dark'
                  ? 'bg-gradient-to-b from-gold/10 to-dark-card border-gold/30'
                  : 'bg-gradient-to-b from-gold/10 to-white border-gold/30'
              }`}
            >
              <Trophy className="w-12 h-12 text-gold mx-auto mb-4" />
              <h2 className="font-playfair text-3xl font-bold mb-2">{t.comparison.ourPick}</h2>
              <h3 className="font-playfair text-2xl text-gold font-bold mb-4">Seiko Presage Cocktail Time SRPD37</h3>
              <p className={`max-w-2xl mx-auto mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                While both watches are exceptional at their price points, the Seiko Presage edges ahead with its stunning dial, 
                superior movement features (hand-winding and hacking), and better water resistance. However, if budget is your 
                primary concern, the Orient Bambino delivers incredible value that's hard to beat. You truly can't go wrong with either choice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AffiliateButton url="#" text="Get Seiko Presage" />
                <a
                  href="#"
                  target="_blank"
                  rel="nofollow sponsored"
                  className={`inline-flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-lg border-2 border-gold text-gold hover:bg-gold hover:text-dark transition-colors`}
                >
                  Get Orient Bambino <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* Pros/Cons Summary */}
          <section className="mb-12 scroll-reveal">
            <h2 className="font-playfair text-2xl font-bold mb-6">
              {t.comparison.prosConsSummary} <span className="text-gold">{t.comparison.prosConsSummaryHighlight}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[watch1, watch2].map((watch) => (
                <div key={watch.id} className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
                  <h3 className="font-playfair text-lg font-bold mb-4">{watch.brand} {watch.name}</h3>
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
                  <div>
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
                </div>
              ))}
            </div>
          </section>

          {/* Related Reviews */}
          <section className="scroll-reveal">
            <h2 className="font-playfair text-2xl font-bold mb-6">
              {t.comparison.readFullReviews} <span className="text-gold">{t.comparison.readFullReviewsHighlight}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[watch1, watch2].map((watch) => (
                <Link
                  key={watch.id}
                  to={`/review/${watch.id}`}
                  className={`flex gap-4 p-4 rounded-xl border transition-all duration-300 hover:border-gold/30 ${
                    theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
                  }`}
                >
                  <img src={watch.image} alt={watch.name} className="w-20 h-20 rounded-lg object-cover" loading="lazy" />
                  <div>
                    <h4 className="font-semibold hover:text-gold transition-colors">{watch.brand} {watch.name} Review</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <StarRating rating={watch.rating} size={12} />
                      <span className="text-xs text-gold">{watch.rating}/5</span>
                    </div>
                    <span className="text-gold text-sm font-medium mt-1 inline-block">{t.comparison.readFullReview} &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
