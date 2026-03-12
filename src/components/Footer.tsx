import { Link } from 'react-router-dom';
import { Watch, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`border-t ${
        theme === 'dark'
          ? 'bg-dark-secondary border-dark-border'
          : 'bg-light-secondary border-light-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Watch className="w-8 h-8 text-gold" />
              <span className="font-playfair text-xl font-bold">
                Watch<span className="text-gold">Vault</span>
              </span>
            </Link>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Your trusted guide to the world of premium timepieces. Expert reviews, honest comparisons, and the best deals.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'dark'
                      ? 'bg-dark-card hover:bg-gold/20 text-gray-400 hover:text-gold'
                      : 'bg-white hover:bg-gold/10 text-gray-500 hover:text-gold'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Latest Reviews', path: '/review/seiko-presage-srpd37' },
                { name: 'Best Watches Under $200', path: '/best/watches-under-200' },
                { name: 'Watch Comparisons', path: '/compare/seiko-presage-vs-orient-bambino' },
                { name: 'About Us', path: '/about' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors hover:text-gold ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {['Luxury Watches', 'Dive Watches', 'Dress Watches', 'Smartwatches', 'Chronographs'].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      to="/"
                      className={`text-sm transition-colors hover:text-gold ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {[
                { name: 'Privacy Policy', path: '/affiliate-disclosure' },
                { name: 'Affiliate Disclosure', path: '/affiliate-disclosure' },
                { name: 'Terms of Service', path: '/affiliate-disclosure' },
                { name: 'Contact Us', path: '/about' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors hover:text-gold ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`mt-12 pt-8 border-t text-center ${
            theme === 'dark' ? 'border-dark-border' : 'border-light-border'
          }`}
        >
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            As an Amazon Associate, we earn from qualifying purchases. Prices and availability are subject to change.
          </p>
          <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            &copy; {new Date().getFullYear()} WatchVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
