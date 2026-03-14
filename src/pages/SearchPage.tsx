import { useSearchParams } from 'react-router-dom';
import WatchCard from '../components/WatchCard';
import { useTheme } from '../context/ThemeContext';
import { searchWatches } from '../data/watches';
import { Search } from 'lucide-react';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { t } = useTheme();

  const results = searchWatches(query);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {t.search.title}
          </h1>
          <div className="h-1 w-16 bg-amber-500 rounded mt-2" />
          {query && (
            <p className="text-gray-600 dark:text-gray-400 mt-3">
              {results.length} {t.search.results} &ldquo;{query}&rdquo;
            </p>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map(watch => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t.search.noResults}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              Try searching for brand names, categories (dive, dress, luxury), or watch features.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
