import { useParams, Link } from 'react-router-dom';
import { Star, ExternalLink, ChevronRight, Check, X as XIcon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getWatchById, watches } from '../data/watches';
import WatchCard from '../components/WatchCard';
import { useState } from 'react';

export function ReviewPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'buy'>('overview');
  const [selectedImage, setSelectedImage] = useState(0);

  const watch = id ? getWatchById(id) : undefined;

  if (!watch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Watch not found</h1>
          <Link to="/" className="text-amber-500 hover:text-amber-600">
            {t.common.backToHome}
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [watch.image, ...watch.gallery];
  const relatedWatches = watches
    .filter(w => w.id !== watch.id && (w.category === watch.category || w.brand === watch.brand))
    .slice(0, 3);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? 'text-amber-400 fill-amber-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-amber-500 transition-colors">{t.nav.home}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/reviews" className="hover:text-amber-500 transition-colors">{t.nav.reviews}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 dark:text-white truncate">{watch.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
              <img
                src={allImages[selectedImage]}
                alt={watch.name}
                className="w-full h-full object-cover"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      i === selectedImage
                        ? 'border-amber-500'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Watch Info */}
          <div>
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-wider">
              {watch.brand}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              {watch.name}
            </h1>

            <div className="flex items-center gap-3 mt-4">
              <div className="flex">{renderStars(watch.rating)}</div>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                {watch.rating}/5
              </span>
            </div>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                ${watch.price}
              </span>
              {watch.originalPrice && (
                <span className="text-lg text-gray-400 line-through">${watch.originalPrice}</span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
              {watch.shortDescription}
            </p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">Movement</p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{watch.movement}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">Case</p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{watch.caseDiameter}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">Water Resist.</p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{watch.waterResistance}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">Crystal</p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{watch.crystal}</p>
              </div>
            </div>

            {/* AI Summary */}
            {watch.aiSummary && (
              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-amber-700 dark:text-amber-400 text-sm">
                    {t.review.aiSummary}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {watch.aiSummary}
                </p>
              </div>
            )}

            {/* Buy Links */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                {t.review.whereToBy}
              </h3>
              <div className="space-y-2">
                {watch.affiliateLinks.map(link => (
                  <a
                    key={link.store}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 border border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-500" />
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {t.review.buyFrom} {link.store}
                      </span>
                    </div>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      ${link.price}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-6">
            {(['overview', 'specs', 'buy'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-medium text-sm transition-colors relative ${
                  activeTab === tab
                    ? 'text-amber-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab === 'overview' ? t.review.overview : tab === 'specs' ? t.review.specifications : t.review.whereToBy}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="prose dark:prose-invert max-w-none">
                  {watch.fullReview.split('\n\n').map((p, i) => (
                    <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <div className="sticky top-24">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                    {t.review.prosAndCons}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <h4 className="text-green-600 dark:text-green-400 font-semibold text-sm flex items-center gap-1">
                      <Check className="w-4 h-4" /> {t.review.pros}
                    </h4>
                    {watch.pros.map((pro, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-red-600 dark:text-red-400 font-semibold text-sm flex items-center gap-1">
                      <XIcon className="w-4 h-4" /> {t.review.cons}
                    </h4>
                    {watch.cons.map((con, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <XIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {Object.entries(watch.specifications).map(([key, value], i) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between px-4 py-3 ${
                      i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900'
                    }`}
                  >
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{key}</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'buy' && (
            <div className="max-w-xl space-y-3">
              {watch.affiliateLinks.map(link => (
                <a
                  key={link.store}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 border border-gray-200 dark:border-gray-700 hover:border-amber-300 transition-all group"
                >
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{link.store}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Free shipping on most orders</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-amber-600 dark:text-amber-400">${link.price}</p>
                    <span className="text-xs text-amber-500 flex items-center gap-1">
                      Visit <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              ))}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                * Prices may vary. We may earn a commission from qualifying purchases. See our affiliate disclosure for details.
              </p>
            </div>
          )}
        </div>

        {/* Related Watches */}
        {relatedWatches.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t.review.relatedWatches}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedWatches.map(w => (
                <WatchCard key={w.id} watch={w} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
