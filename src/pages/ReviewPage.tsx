import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, X as XIcon, ExternalLink, Clock, Calendar } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import StarRating from '../components/StarRating';
import RatingBar from '../components/RatingBar';
import AffiliateButton from '../components/AffiliateButton';
import TableOfContents from '../components/TableOfContents';
import ReadingProgress from '../components/ReadingProgress';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { watches, reviewArticles } from '../data/watches';

export default function ReviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const { t } = useLanguage();
  useScrollReveal();

  const watch = watches.find((w) => w.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (watch) {
      document.title = `${watch.brand} ${watch.name} Review - WristNerd`;
    }
  }, [watch, slug]);

  if (!watch) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-playfair text-4xl font-bold mb-4">{t.review.notFound}</h1>
          <Link to="/" className="text-gold hover:underline">{t.review.goBackHome}</Link>
        </div>
      </div>
    );
  }

  const tocItems = [
    { id: 'quick-summary', title: t.review.quickSummary },
    { id: 'specifications', title: t.review.specifications },
    { id: 'design-build', title: t.review.designBuild },
    { id: 'movement-accuracy', title: t.review.movementAccuracy },
    { id: 'comfort', title: t.review.comfort },
    { id: 'value', title: t.review.valueForMoney },
    { id: 'who-is-it-for', title: t.review.whoIsItFor },
    { id: 'detailed-ratings', title: `${t.review.detailedRatings} ${t.review.detailedRatingsHighlight}` },
    { id: 'where-to-buy', title: `${t.review.whereToBuy} ${t.review.whereToBuyHighlight}` },
    { id: 'faq', title: `${t.review.faq} ${t.review.faqHighlight}` },
  ];

  const relatedArticles = reviewArticles.filter((a) => a.slug !== watch.slug);

  // Schema markup
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `${watch.brand} ${watch.name} Review`,
    reviewBody: watch.shortDescription,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: watch.rating,
      bestRating: 5,
    },
    itemReviewed: {
      '@type': 'Product',
      name: `${watch.brand} ${watch.name}`,
      brand: { '@type': 'Brand', name: watch.brand },
      offers: {
        '@type': 'Offer',
        price: watch.price,
        priceCurrency: 'USD',
      },
    },
    author: { '@type': 'Organization', name: 'WristNerd' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: watch.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { name: watch.category, path: '/' },
              { name: `${watch.brand} ${watch.name} Review` },
            ]}
          />

          {/* Title */}
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-up">
            {watch.brand} {watch.name} <span className="text-gold">{t.review.review}</span>
          </h1>

          {/* Affiliate Disclosure */}
          <p className={`text-xs italic mb-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            {t.review.affiliateDisclaimer}{' '}
            <Link to="/affiliate-disclosure" className="text-gold hover:underline">{t.review.learnMore}</Link>
          </p>

          {/* Meta */}
          <div className={`flex items-center gap-4 text-sm mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 5, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 {t.review.minRead}</span>
          </div>

          {/* Table of Contents */}
          <TableOfContents items={tocItems} />

          {/* Quick Summary Box */}
          <div
            id="quick-summary"
            className={`rounded-xl border overflow-hidden mb-12 scroll-reveal ${
              theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
            }`}
          >
            <div className="bg-gold/10 px-6 py-3 border-b border-gold/20">
              <h2 className="font-playfair text-xl font-bold text-gold">{t.review.quickSummary}</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={watch.image}
                    alt={`${watch.brand} ${watch.name}`}
                    className="w-full rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <StarRating rating={watch.rating} size={20} showNumber />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      ({watch.ratingCount} {t.review.reviews})
                    </span>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-1">
                      <Check className="w-4 h-4" /> {t.review.pros}
                    </h3>
                    <ul className="space-y-1">
                      {watch.pros.map((pro, i) => (
                        <li key={i} className={`text-sm flex items-start gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-1">
                      <XIcon className="w-4 h-4" /> {t.review.cons}
                    </h3>
                    <ul className="space-y-1">
                      {watch.cons.map((con, i) => (
                        <li key={i} className={`text-sm flex items-start gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <XIcon className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-2xl font-bold text-gold mb-4">${watch.price}</p>

                  <AffiliateButton url={watch.affiliateUrl} fullWidth />
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <section id="specifications" className="mb-12 scroll-reveal">
            <h2 className="font-playfair text-2xl font-bold mb-6">
              <span className="text-gold">{t.review.specifications}</span>
            </h2>
            <div className={`rounded-xl border overflow-hidden ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
              {Object.entries(watch.specs).map(([key, value], i) => (
                <div
                  key={key}
                  className={`flex justify-between px-6 py-3 ${
                    i % 2 === 0
                      ? theme === 'dark' ? 'bg-dark-card' : 'bg-light-secondary'
                      : theme === 'dark' ? 'bg-dark-secondary' : 'bg-white'
                  }`}
                >
                  <span className={`font-medium text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{key}</span>
                  <span className="font-semibold text-sm">{value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Review Content Sections */}
          {[
            { id: 'design-build', title: t.review.designBuild, content: watch.reviewContent.designBuild },
            { id: 'movement-accuracy', title: t.review.movementAccuracy, content: watch.reviewContent.movementAccuracy },
            { id: 'comfort', title: t.review.comfort, content: watch.reviewContent.comfortWearability },
            { id: 'value', title: t.review.valueForMoney, content: watch.reviewContent.valueForMoney },
            { id: 'who-is-it-for', title: t.review.whoIsItFor, content: watch.reviewContent.whoIsItFor },
          ].map((section) => (
            <section key={section.id} id={section.id} className="mb-12 scroll-reveal">
              <h2 className="font-playfair text-2xl font-bold mb-4">
                {section.title}
              </h2>
              <div className={`prose max-w-none ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {section.content.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4 leading-relaxed">{para}</p>
                ))}
              </div>
              {section.id === 'value' && (
                <div className="mt-6">
                  <AffiliateButton url={watch.affiliateUrl} text={t.review.checkCurrentPrice} />
                </div>
              )}
            </section>
          ))}

          {/* Detailed Ratings */}
          <section id="detailed-ratings" className="mb-12 scroll-reveal">
            <h2 className="font-playfair text-2xl font-bold mb-6">
              {t.review.detailedRatings} <span className="text-gold">{t.review.detailedRatingsHighlight}</span>
            </h2>
            <div
              className={`rounded-xl border p-6 space-y-4 ${
                theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
              }`}
            >
              {watch.detailedRatings.map((rating) => (
                <RatingBar key={rating.label} label={rating.label} score={rating.score} />
              ))}
            </div>
          </section>

          {/* Where to Buy */}
          <section id="where-to-buy" className="mb-12 scroll-reveal">
            <h2 className="font-playfair text-2xl font-bold mb-6">
              {t.review.whereToBuy} <span className="text-gold">{t.review.whereToBuyHighlight}</span>
            </h2>
            <div className="space-y-3">
              {watch.whereToBuy.map((store) => (
                <div
                  key={store.store}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
                  }`}
                >
                  <div>
                    <h4 className="font-semibold">{store.store}</h4>
                    <p className="text-gold font-bold text-lg">{store.price}</p>
                  </div>
                  <a
                    href={store.url}
                    target="_blank"
                    rel="nofollow sponsored"
                    className="flex items-center gap-2 bg-gold hover:bg-gold-light text-dark font-bold px-6 py-3 rounded-lg transition-colors"
                  >
                    {t.review.viewDeal} <ExternalLink className="w-4 h-4" />
                  </a>
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
              {watch.faq.map((faq, i) => (
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

          {/* Final CTA */}
          <div className={`rounded-xl border p-8 text-center mb-12 scroll-reveal ${
            theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
          }`}>
            <h3 className="font-playfair text-2xl font-bold mb-4">
              {t.review.readyToBuy} {watch.brand} {watch.name}?
            </h3>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.review.bestPriceDesc}
            </p>
            <AffiliateButton url={watch.affiliateUrl} size="lg" text={t.review.checkBestPrice} />
          </div>

          {/* You Might Also Like */}
          <section className="scroll-reveal">
            <h2 className="font-playfair text-2xl font-bold mb-6">
              {t.review.youMightAlsoLike} <span className="text-gold">{t.review.youMightAlsoLikeHighlight}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/review/${article.slug}`}
                  className={`flex gap-4 p-4 rounded-xl border transition-all duration-300 hover:border-gold/30 ${
                    theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
                  }`}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-20 h-20 rounded-lg object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold text-sm hover:text-gold transition-colors">{article.title}</h4>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {article.date}
                    </p>
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
