import { Link } from 'react-router-dom';
import { Star, ExternalLink } from 'lucide-react';
import { Watch } from '../data/types';
import { useTheme } from '../context/ThemeContext';

interface WatchCardProps {
  watch: Watch;
  compact?: boolean;
}

export function WatchCard({ watch, compact }: WatchCardProps) {
  const { t } = useTheme();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < Math.floor(rating)
            ? 'text-amber-400 fill-amber-400'
            : i < rating
            ? 'text-amber-400 fill-amber-400 opacity-50'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  if (compact) {
    return (
      <Link
        to={`/review/${watch.id}`}
        className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all hover:shadow-lg group"
      >
        <img
          src={watch.image}
          alt={watch.name}
          className="w-20 h-20 object-cover rounded-lg"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-amber-500 font-medium">{watch.brand}</p>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-amber-500 transition-colors">
            {watch.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">{renderStars(watch.rating)}</div>
          <p className="text-amber-600 dark:text-amber-400 font-bold text-sm mt-1">${watch.price}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/review/${watch.id}`}
      className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gray-100 dark:bg-gray-700">
        <img
          src={watch.image}
          alt={watch.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {watch.bestSeller && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
            Best Seller
          </span>
        )}
        {watch.originalPrice && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            -{Math.round((1 - watch.price / watch.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-amber-500 font-semibold uppercase tracking-wider">
          {watch.brand}
        </p>
        <h3 className="font-bold text-gray-900 dark:text-white mt-1 group-hover:text-amber-500 transition-colors line-clamp-2">
          {watch.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">
          {watch.shortDescription}
        </p>

        <div className="flex items-center gap-1 mt-3">
          {renderStars(watch.rating)}
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({watch.rating})</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
              ${watch.price}
            </span>
            {watch.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${watch.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs text-amber-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {t.home.readMore} <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
