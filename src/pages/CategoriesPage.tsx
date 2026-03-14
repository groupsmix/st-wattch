import { useParams, Link } from 'react-router-dom';
import WatchCard from '../components/WatchCard';
import { useTheme } from '../context/ThemeContext';
import { getWatchesByCategory, watches } from '../data/watches';
import { Anchor, Watch as WatchIcon, Crown, Plane, Compass, Timer, Zap, Coffee, ChevronRight } from 'lucide-react';


const categoryIcons: Record<string, typeof Anchor> = {
  dive: Anchor,
  dress: WatchIcon,
  luxury: Crown,
  pilot: Plane,
  field: Compass,
  chronograph: Timer,
  sports: Zap,
  casual: Coffee,
};

export function CategoriesPage() {
  const { category } = useParams<{ category?: string }>();
  const { t } = useTheme();

  const allCategories: { key: string; label: string }[] = [
    { key: 'all', label: t.categories.all },
    { key: 'dive', label: t.categories.dive },
    { key: 'dress', label: t.categories.dress },
    { key: 'luxury', label: t.categories.luxury },
    { key: 'sports', label: t.categories.sports },
    { key: 'pilot', label: t.categories.pilot },
    { key: 'field', label: t.categories.field },
    { key: 'chronograph', label: t.categories.chronograph },
    { key: 'casual', label: t.categories.casual },
  ];

  const currentCategory = category || 'all';
  const filteredWatches = currentCategory === 'all' ? watches : getWatchesByCategory(currentCategory);
  const currentLabel = allCategories.find(c => c.key === currentCategory)?.label || t.categories.all;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-amber-500 transition-colors">{t.nav.home}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/categories" className="hover:text-amber-500 transition-colors">{t.nav.categories}</Link>
          {category && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900 dark:text-white">{currentLabel}</span>
            </>
          )}
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {currentLabel}
        </h1>
        <div className="h-1 w-16 bg-amber-500 rounded mb-8" />

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allCategories.map(cat => {
            const Icon = categoryIcons[cat.key] || WatchIcon;
            const isActive = currentCategory === cat.key;
            return (
              <Link
                key={cat.key}
                to={cat.key === 'all' ? '/categories' : `/categories/${cat.key}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* Results Count */}
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
          {filteredWatches.length} {t.search.results}
        </p>

        {/* Watch Grid */}
        {filteredWatches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWatches.map(watch => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t.search.noResults}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
