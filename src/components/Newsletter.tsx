import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Newsletter() {
  const { t } = useTheme();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Mail className="w-10 h-10 text-white/80 mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          {t.home.newsletter}
        </h2>
        <p className="text-amber-100 mb-8 max-w-xl mx-auto">
          {t.home.newsletterDesc}
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-white bg-white/20 rounded-xl px-6 py-4 max-w-md mx-auto">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{t.home.subscribeSuccess}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.home.emailPlaceholder}
              className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-amber-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors"
            >
              {t.home.subscribe}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
