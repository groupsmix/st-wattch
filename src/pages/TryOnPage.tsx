import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import Breadcrumbs from '../components/Breadcrumbs';
import VirtualTryOn from '../components/VirtualTryOn';
import { watches } from '../data/watches';
import { Link } from 'react-router-dom';

export default function TryOnPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  useEffect(() => {
    document.title = 'Virtual Try-On | WristNerd';
    window.scrollTo(0, 0);
  }, []);

  const watchOptions = watches.map((w) => ({
    id: w.id,
    name: w.name,
    brand: w.brand,
    image: w.image,
    price: w.price,
  }));

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[{ name: 'Virtual Try-On' }]}
        />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            {t.tryOn.title}{' '}
            <span className="text-gold">{t.tryOn.titleHighlight}</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.tryOn.description}
          </p>
        </div>

        {/* AI Badge */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isDark ? 'bg-gold/10 text-gold border border-gold/30' : 'bg-gold/10 text-gold-dark border border-gold/30'
          }`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            {t.tryOn.poweredByAI}
          </div>
        </div>

        {/* Virtual Try-On Component */}
        <VirtualTryOn watches={watchOptions} />

        {/* How It Works */}
        <div className="mt-16 mb-12">
          <h2 className="font-playfair text-3xl font-bold text-center mb-8">
            {t.tryOn.howItWorks} <span className="text-gold">{t.tryOn.howItWorksHighlight}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: t.tryOn.selectWatch,
                description: t.tryOn.selectWatchDesc,
                icon: '⌚',
              },
              {
                step: '2',
                title: t.tryOn.showWrist,
                description: t.tryOn.showWristDesc,
                icon: '📸',
              },
              {
                step: '3',
                title: t.tryOn.seeResult,
                description: t.tryOn.seeResultDesc,
                icon: '✨',
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`text-center p-6 rounded-2xl ${
                  isDark ? 'bg-dark-secondary' : 'bg-gray-50'
                }`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="w-10 h-10 rounded-full bg-gold text-dark font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center p-8 rounded-2xl ${isDark ? 'bg-dark-secondary' : 'bg-gray-50'}`}>
          <h3 className="font-playfair text-2xl font-bold mb-3">
            {t.tryOn.likeWhatYouSee}
          </h3>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.tryOn.likeWhatYouSeeDesc}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/best/watches-under-200"
              className="px-6 py-3 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-colors"
            >
              {t.about.bestWatchesUnder200}
            </Link>
            <Link
              to="/"
              className={`px-6 py-3 rounded-lg font-semibold border-2 border-gold text-gold hover:bg-gold hover:text-dark transition-colors`}
            >
              {t.tryOn.browseAllReviews}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
