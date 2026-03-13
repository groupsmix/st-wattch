import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon, ChevronDown, Watch, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    {
      name: t.nav.reviews,
      path: '#',
      dropdown: [
        { name: t.nav.latestReviews, path: '/review/seiko-presage-srpd37' },
        { name: 'Seiko Presage SRPD37', path: '/review/seiko-presage-srpd37' },
        { name: 'Casio G-Shock GA-2100', path: '/review/casio-gshock-ga2100' },
        { name: 'Orient Bambino V2', path: '/review/orient-bambino-v2' },
      ],
    },
    {
      name: t.nav.bestOf,
      path: '#',
      dropdown: [
        { name: t.nav.bestWatchesUnder200, path: '/best/watches-under-200' },
        { name: t.nav.bestDiveWatches, path: '/best/watches-under-200' },
        { name: t.nav.bestDressWatches, path: '/best/watches-under-200' },
      ],
    },
    { name: t.nav.comparisons, path: '/compare/seiko-presage-vs-orient-bambino' },
    { name: t.nav.tryOn, path: '/try-on' },
    { name: t.nav.about, path: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Watch className="w-8 h-8 text-gold group-hover:rotate-12 transition-transform" />
            <span className="font-playfair text-xl lg:text-2xl font-bold">
              Wrist<span className="text-gold">Nerd</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium hover:text-gold transition-colors">
                    {link.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="px-4 py-2 text-sm font-medium hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown */}
                {link.dropdown && activeDropdown === link.name && (
                  <div
                    className={`absolute top-full left-0 mt-1 w-56 rounded-lg shadow-xl border py-2 animate-fade-in ${
                      theme === 'dark'
                        ? 'bg-dark-secondary border-dark-border'
                        : 'bg-white border-light-border'
                    }`}
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          theme === 'dark'
                            ? 'hover:bg-dark-card hover:text-gold'
                            : 'hover:bg-light-secondary hover:text-gold'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-gold/10 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1 p-2 rounded-full hover:bg-gold/10 transition-colors text-sm font-medium"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gold/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gold/10 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t.nav.searchPlaceholder}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:border-gold transition-colors ${
                  theme === 'dark'
                    ? 'bg-dark-secondary border-dark-border text-white placeholder-gray-500'
                    : 'bg-white border-light-border text-dark placeholder-gray-400'
                }`}
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden border-t animate-fade-in ${
            theme === 'dark'
              ? 'bg-dark-secondary border-dark-border'
              : 'bg-white border-light-border'
          }`}
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === link.name ? null : link.name)
                      }
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg hover:bg-gold/10 transition-colors"
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === link.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === link.name && (
                      <div className="pl-4 space-y-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-400 hover:text-gold transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-gold/10 transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
