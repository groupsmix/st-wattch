import { Link } from 'react-router-dom';
import { ChevronRight, MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Hero() {
  const { t } = useTheme();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&h=900&fit=crop"
          alt="Luxury watch collection"
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-400 bg-amber-400/10 rounded-full border border-amber-400/20 mb-6">
            AI-Powered Watch Reviews
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            {t.hero.title}
            <span className="block text-amber-400 mt-2">{t.hero.subtitle}</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-xl">
            {t.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/25"
            >
              {t.hero.cta}
              <ChevronRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                const chatBtn = document.getElementById('chatbot-toggle');
                if (chatBtn) chatBtn.click();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20"
            >
              <MessageCircle className="w-4 h-4" />
              {t.hero.ctaSecondary}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8 flex-wrap">
            <div>
              <div className="text-2xl font-bold text-amber-400">50+</div>
              <div className="text-sm text-gray-400">Reviews</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">15+</div>
              <div className="text-sm text-gray-400">Brands</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">AI</div>
              <div className="text-sm text-gray-400">Powered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent" />
    </section>
  );
}
