import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Watch } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function NotFoundPage() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = '404 - Page Not Found | WristNerd';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md">
        <Watch className="w-20 h-20 text-gold mx-auto mb-6 opacity-50" />
        <h1 className="font-playfair text-6xl font-bold text-gold mb-4">404</h1>
        <h2 className="font-playfair text-2xl font-bold mb-4">
          Page Not Found
        </h2>
        <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-gold hover:bg-gold-light text-dark font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/best/watches-under-200"
            className="border-2 border-gold text-gold hover:bg-gold hover:text-dark font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Browse Watches
          </Link>
        </div>
      </div>
    </div>
  );
}
