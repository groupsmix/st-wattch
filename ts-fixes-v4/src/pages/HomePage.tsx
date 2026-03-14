import { Link } from 'react-router-dom';
import { ChevronRight, Anchor, Watch as WatchIcon, Crown, Plane, Compass, Timer, Zap, Coffee } from 'lucide-react';
import { Hero } from '../components/Hero';
import WatchCard from '../components/WatchCard';
import { Newsletter } from '../components/Newsletter';
import { BrandMarquee } from '../components/BrandMarquee';
import { useTheme } from '../context/ThemeContext';
import { getFeaturedWatches, getBestSellers } from '../data/watches';
import { WatchCategory } from '../data/types';

const categoryIcons: Record<WatchCategory | string, typeof Anchor> = {
  dive: Anchor,
  dress: WatchIcon,
  luxury: Crown,
  pilot: Plane,
  field: Compass,
  chronograph: Timer,
  sports: Zap,
  casual: Coffee,
};

const categoryImages: Record<string, string> = {
  dive: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=400&h=300&fit=crop',
  dress: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=300&fit=crop',
  luxury: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop',
  pilot: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=400&h=300&fit=crop',
  field: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
  chronograph: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400&h=300&fit=crop',
  sports: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=400&h=300&fit=crop',
  casual: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=300&fit=crop',
};

export function HomePage() {
  const { t } = useTheme();
  const featured = getFeaturedWatches();
  const bestSellers = getBestSellers();

  const categories: { key: string; label: string }[] = [
    { key: 'dive', label: t.categories.dive },
    { key: 'dress', label: t.categories.dress },
    { key: 'luxury', label: t.categories.luxury },
    { key: 'sports', label: t.categories.sports },
    { key: 'pilot', label: t.categories.pilot },
    { key: 'field', label: t.categories.field },
    { key: 'chronograph', label: t.categories.chronograph },
    { key: 'casual', label: t.categories.casual },
  ];

  return (
    <div>
      <Hero />
      <BrandMarquee />

      {/* Featured Reviews */}
      <section className="py-16 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {t.home.featured}
              </h2>
              <div className="h-1 w-16 bg-amber-500 rounded mt-2" />
            </div>
            <Link
              to="/reviews"
              className="text-amber-500 hover:text-amber-600 font-medium text-sm flex items-center gap-1"
            >
              {t.home.viewAll} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(watch => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t.home.categories}
            </h2>
            <div className="h-1 w-16 bg-amber-500 rounded mt-2 mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(cat => {
              const Icon = categoryIcons[cat.key] || WatchIcon;
              return (
                <Link
                  key={cat.key}
                  to={`/categories/${cat.key}`}
                  className="group relative rounded-2xl overflow-hidden aspect-video bg-gray-200 dark:bg-gray-800"
                >
                  <img
                    src={categoryImages[cat.key]}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <Icon className="w-5 h-5 text-amber-400 mb-1" />
                    <h3 className="font-bold text-sm sm:text-base">{cat.label}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {t.home.bestSellers}
              </h2>
              <div className="h-1 w-16 bg-amber-500 rounded mt-2" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(watch => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
