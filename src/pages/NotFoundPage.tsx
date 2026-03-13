import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function NotFoundPage() {
  const { t } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4 transition-colors">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-amber-500/20 dark:text-amber-500/10 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {t.common.notFound}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {t.common.notFoundDesc}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            {t.common.backToHome}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
