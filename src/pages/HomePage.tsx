import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Watch, Star, DollarSign, Search, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';
import PersonalizedRecommendations from '../components/ai/PersonalizedRecommendations';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { featuredWatches, categories, topSellers, reviewArticles, brands } from '../data/watches';

export default function HomePage() {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  useScrollReveal();

  useEffect(() => {
    document.title = language === 'ar'
      ? 'WristNerd - مراجعات ساعات بأسعار معقولة ودليل المشتري (50-500 دولار)'
      : 'WristNerd - Affordable Watch Reviews & Buyer\'s Guides ($50-$500)';
  }, [language]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&q=80"
            alt="Luxury watch"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-dark" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t.home.heroTitle} <span className="text-gold">{t.home.heroHighlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {t.home.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/best/watches-under-200"
              className="bg-gold hover:bg-gold-light text-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:scale-105 text-lg"
            >
              {t.home.exploreTopWatches}
            </Link>
            <Link
              to="/review/seiko-presage-srpd37"
              className="border-2 border-white/30 hover:border-gold text-white hover:text-gold font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-lg"
            >
              {t.home.readLatestReviews}
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Watches */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-dark' : 'bg-light-bg'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">
              {t.home.featuredWatches} <span className="text-gold">{t.home.featuredWatchesHighlight}</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.home.featuredWatchesDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 scroll-reveal">
            {featuredWatches.map((watch) => (
              <ProductCard
                key={watch.id}
                name={watch.name}
                brand={watch.brand}
                image={watch.image}
                rating={watch.rating}
                price={watch.price}
                badge={watch.badge}
                slug={watch.slug}
                affiliateUrl={watch.affiliateUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">
              {t.home.browseByCategory} <span className="text-gold">{t.home.browseByCategoryHighlight}</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.home.browseByCategoryDesc}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 scroll-reveal">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/best/watches-under-200`}
                className={`group relative overflow-hidden rounded-xl aspect-[4/3] ${
                  theme === 'dark' ? 'bg-dark-card' : 'bg-white'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-playfair text-white font-semibold text-sm sm:text-base">{cat.name}</h3>
                  <p className="text-gold text-xs">{cat.count} {t.home.watches}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Reviews */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-dark' : 'bg-light-bg'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">
              {t.home.latestReviews} <span className="text-gold">{t.home.latestReviewsHighlight}</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.home.latestReviewsDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 scroll-reveal">
            {reviewArticles.map((article) => (
              <Link
                key={article.id}
                to={`/review/${article.slug}`}
                className={`group rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  theme === 'dark'
                    ? 'bg-dark-card border-dark-border'
                    : 'bg-white border-light-border'
                }`}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-gold/90 text-dark text-xs font-bold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className={`flex items-center gap-3 text-xs mb-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    <span>{article.date}</span>
                    <span>&bull;</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-playfair text-lg font-semibold mb-2 group-hover:text-gold transition-colors">
                    {article.title}
                  </h3>
                  <p className={`text-sm line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-gold text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                    {t.home.readMore} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top 10 Best Sellers */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">
              {t.home.top10} <span className="text-gold">{t.home.top10Highlight}</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.home.top10Desc}
            </p>
          </div>
          <div className="space-y-3 scroll-reveal">
            {topSellers.map((watch) => (
              <div
                key={watch.rank}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:border-gold/30 ${
                  theme === 'dark'
                    ? 'bg-dark-card border-dark-border'
                    : 'bg-white border-light-border'
                }`}
              >
                <span className="font-playfair text-2xl font-bold text-gold w-8 text-center">
                  {watch.rank}
                </span>
                <img
                  src={watch.image}
                  alt={watch.name}
                  className="w-14 h-14 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{watch.brand}</p>
                  <h4 className="font-semibold text-sm sm:text-base truncate">{watch.name}</h4>
                  <StarRating rating={watch.rating} size={12} />
                </div>
                <span className="text-lg font-bold text-gold hidden sm:block">{watch.price}</span>
                <a
                  href={watch.url}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="flex items-center gap-1 bg-gold hover:bg-gold-light text-dark text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                  {t.home.checkPrice}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-dark' : 'bg-light-bg'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">
              {t.home.whyTrustUs} <span className="text-gold">{t.home.whyTrustUsHighlight}</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 scroll-reveal">
            {[
              { icon: Watch, title: t.home.watchesReviewed, desc: t.home.watchesReviewedDesc },
              { icon: Star, title: t.home.unbiasedReviews, desc: t.home.unbiasedReviewsDesc },
              { icon: DollarSign, title: t.home.bestPriceGuarantee, desc: t.home.bestPriceGuaranteeDesc },
              { icon: Search, title: t.home.inDepthComparisons, desc: t.home.inDepthComparisonsDesc },
            ].map((item, i) => (
              <div
                key={i}
                className={`text-center p-6 rounded-xl border transition-all duration-300 hover:border-gold/30 ${
                  theme === 'dark'
                    ? 'bg-dark-card border-dark-border'
                    : 'bg-white border-light-border'
                }`}
              >
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-playfair font-semibold text-lg mb-2">{item.title}</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Spotlight */}
      <section className={`py-16 overflow-hidden ${theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 scroll-reveal">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">
              {t.home.brandSpotlight} <span className="text-gold">{t.home.brandSpotlightHighlight}</span>
            </h2>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className={`flex-shrink-0 mx-8 px-8 py-4 rounded-xl border ${
                  theme === 'dark'
                    ? 'bg-dark-card border-dark-border'
                    : 'bg-white border-light-border'
                }`}
              >
                <span className="font-playfair text-xl font-semibold text-gold">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Personalized Recommendations */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-dark' : 'bg-light-bg'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PersonalizedRecommendations />
        </div>
      </section>

      {/* Newsletter */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-reveal">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">
            {t.home.newsletterTitle} <span className="text-gold">{t.home.newsletterHighlight}</span>
          </h2>
          <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.home.newsletterDesc}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder={t.home.emailPlaceholder}
              required
              className={`flex-1 px-5 py-4 rounded-lg border focus:outline-none focus:border-gold transition-colors ${
                theme === 'dark'
                  ? 'bg-dark-secondary border-dark-border text-white placeholder-gray-500'
                  : 'bg-white border-light-border text-dark placeholder-gray-400'
              }`}
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-light text-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 whitespace-nowrap"
            >
              {t.home.subscribeNow}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
