import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const dismissed = sessionStorage.getItem('newsletter-dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => setShow(true), 30000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('newsletter-dismissed')) {
        setShow(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('newsletter-dismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`relative max-w-md w-full rounded-2xl p-8 shadow-2xl animate-fade-in-up ${
          theme === 'dark'
            ? 'bg-dark-secondary border border-dark-border'
            : 'bg-white border border-light-border'
        }`}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gold/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-gold" />
          </div>
          <h3 className="font-playfair text-2xl font-bold mb-2">
            Get the Best Watch Deals
          </h3>
          <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Join 10,000+ watch enthusiasts. Get exclusive deals, new reviews, and expert tips delivered weekly.
          </p>

          <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
            if (emailInput && emailInput.value) {
              localStorage.setItem('wristnerd-newsletter-subscribed', emailInput.value);
              setSubmitted(true);
              setTimeout(dismiss, 2000);
            }
          }} className="space-y-3">
            {!submitted ? (
              <>
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-gold transition-colors ${
                    theme === 'dark'
                      ? 'bg-dark-card border-dark-border text-white placeholder-gray-500'
                      : 'bg-light-secondary border-light-border text-dark placeholder-gray-400'
                  }`}
                />
                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-light text-dark font-bold py-3 rounded-lg transition-colors"
                >
                  Subscribe - It's Free
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-gold font-semibold text-lg">Thanks for subscribing!</p>
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  You'll receive our weekly watch deals soon.
                </p>
              </div>
            )}
          </form>

          {!submitted && (
            <p className={`text-xs mt-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
