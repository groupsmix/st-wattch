import { Link } from 'react-router-dom';
import { Watch, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Footer() {
  const { t } = useTheme();

  const categoryLinks = [
    { to: '/categories/dive', label: t.categories.dive },
    { to: '/categories/dress', label: t.categories.dress },
    { to: '/categories/luxury', label: t.categories.luxury },
    { to: '/categories/sports', label: t.categories.sports },
    { to: '/categories/pilot', label: t.categories.pilot },
    { to: '/categories/field', label: t.categories.field },
  ];

  const quickLinks = [
    { to: '/', label: t.nav.home },
    { to: '/reviews', label: t.nav.reviews },
    { to: '/compare', label: t.nav.compare },
    { to: '/categories', label: t.nav.categories },
  ];

  const legalLinks = [
    { to: '/privacy', label: t.footer.privacy },
    { to: '/terms', label: t.footer.terms },
    { to: '/affiliate-disclosure', label: t.footer.affiliate },
  ];

  const socialLinks = [
    { href: 'https://facebook.com/wristnerd', icon: Facebook, label: 'Facebook' },
    { href: 'https://twitter.com/wristnerd', icon: Twitter, label: 'Twitter' },
    { href: 'https://instagram.com/wristnerd', icon: Instagram, label: 'Instagram' },
    { href: 'https://youtube.com/@wristnerd', icon: Youtube, label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Watch className="w-6 h-6 text-amber-500" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Wrist<span className="text-amber-500">Nerd</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {t.footer.aboutDesc}
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors bg-gray-200 dark:bg-gray-800 rounded-lg"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t.footer.categories}
            </h3>
            <ul className="space-y-2">
              {categoryLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t.footer.legal}
            </h3>
            <ul className="space-y-2">
              {legalLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
