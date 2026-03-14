import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { getPersonalizedRecommendations, getUserPreferenceSummary } from '../../services/ai/recommendations';
import StarRating from '../StarRating';

interface Props {
  currentWatchId?: string;
}

export default function PersonalizedRecommendations({ currentWatchId }: Props) {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const recommendations = getPersonalizedRecommendations(currentWatchId);
  const preferenceSummary = getUserPreferenceSummary(language);

  if (recommendations.length === 0) return null;

  return (
    <section className="mb-12 scroll-reveal">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-gold" />
        <h2 className="font-playfair text-2xl font-bold">
          {language === 'ar' ? 'مقترحات' : 'Recommended'}{' '}
          <span className="text-gold">{language === 'ar' ? 'لك' : 'For You'}</span>
        </h2>
      </div>
      {preferenceSummary && (
        <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {preferenceSummary}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {recommendations.map((watch) => (
          <Link
            key={watch.id}
            to={`/review/${watch.id}`}
            className={`group rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              theme === 'dark'
                ? 'bg-dark-card border-dark-border'
                : 'bg-white border-light-border'
            }`}
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={watch.image}
                alt={`${watch.brand} ${watch.name}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              {watch.bestSeller && (
                <span className="absolute top-2 left-2 bg-gold/90 text-dark text-xs font-bold px-2 py-1 rounded-full">
                  Best Seller
                </span>
              )}
            </div>
            <div className="p-4">
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{watch.brand}</p>
              <h3 className="font-semibold text-sm group-hover:text-gold transition-colors">{watch.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <StarRating rating={watch.rating} size={12} />
                <span className="text-gold font-bold text-sm">${watch.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
