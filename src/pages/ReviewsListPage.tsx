import { useState } from 'react';
import WatchCard from '../components/WatchCard';
import { useTheme } from '../context/ThemeContext';
import { watches } from '../data/watches';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

type SortOption = 'rating' | 'price-low' | 'price-high' | 'name';

export function ReviewsListPage() {
  const { t } = useTheme();
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const brands = ['all', ...new Set(watches.map(w => w.brand))];

  const filtered = watches
    .filter(w => selectedBrand === 'all' || w.brand === selectedBrand)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {t.nav.reviews}
          </h1>
          <div className="h-1 w-16 bg-amber-500 rounded mt-2" />
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            {filtered.length} {t.search.results}
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t.search.filters}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 border-none focus:ring-2 focus:ring-amber-500 text-sm cursor-pointer"
          >
            <option value="rating">{t.search.sortBy}: {t.search.rating}</option>
            <option value="price-low">{t.search.sortBy}: {t.search.price} ↑</option>
            <option value="price-high">{t.search.sortBy}: {t.search.price} ↓</option>
            <option value="name">{t.search.sortBy}: {t.search.name}</option>
          </select>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
              {t.search.brand}
            </h3>
            <div className="flex flex-wrap gap-2">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedBrand === brand
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {brand === 'all' ? t.categories.all : brand}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Watch Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(watch => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t.search.noResults}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
