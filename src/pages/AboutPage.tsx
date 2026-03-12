import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Watch, Target, Shield, Users, Search, Award, BarChart3 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function AboutPage() {
  const { theme } = useTheme();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us - WatchVault';
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'About Us' }]} />

        {/* Hero */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Watch className="w-16 h-16 text-gold mx-auto mb-6" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-6">
            About <span className="text-gold">WatchVault</span>
          </h1>
          <p className="font-playfair text-xl text-gold italic mb-4">
            "Your Guide to the World of Premium Timepieces"
          </p>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            WatchVault was born from a simple frustration: finding honest, comprehensive watch reviews 
            shouldn't require a PhD in horology. We created this site to be the resource we wished existed 
            when we first fell in love with watches.
          </p>
        </div>

        {/* Our Mission */}
        <section className="mb-16 scroll-reveal">
          <div className={`rounded-xl border p-8 ${theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-gold" />
              <h2 className="font-playfair text-2xl font-bold">Our Mission</h2>
            </div>
            <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              We believe everyone deserves to find their perfect watch without the confusion, hype, or 
              pressure. Our mission is to provide clear, honest, and thoroughly researched watch reviews 
              and comparisons that help you make confident buying decisions - whether you're spending $50 
              or $5,000.
            </p>
          </div>
        </section>

        {/* Why We're Different */}
        <section className="mb-16 scroll-reveal">
          <h2 className="font-playfair text-2xl font-bold mb-8 text-center">
            Why We're <span className="text-gold">Different</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Unbiased Reviews', desc: 'We buy watches with our own money or borrow them from retailers - never from brands. This ensures our reviews are completely independent.' },
              { icon: Search, title: 'Deep Research', desc: 'Every review includes hands-on testing, spec verification, and comparison with competitors. We don\'t just skim the surface.' },
              { icon: Users, title: 'Community First', desc: 'Our recommendations are based on what\'s best for you, not what earns us the highest commission. Your trust is worth more than any affiliate fee.' },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-xl border p-6 text-center ${
                  theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
                }`}
              >
                <item.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                <h3 className="font-playfair text-lg font-semibold mb-2">{item.title}</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Review Methodology */}
        <section className="mb-16 scroll-reveal">
          <h2 className="font-playfair text-2xl font-bold mb-8 text-center">
            Our Review <span className="text-gold">Methodology</span>
          </h2>
          <div className={`rounded-xl border p-8 ${theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
            <div className="space-y-6">
              {[
                { icon: Watch, step: '01', title: 'Hands-On Testing', desc: 'We wear every watch for at least 2 weeks in real-world conditions before publishing a review.' },
                { icon: BarChart3, step: '02', title: 'Accuracy Testing', desc: 'We measure timekeeping accuracy over multiple days in different positions to give you real-world numbers.' },
                { icon: Search, step: '03', title: 'Detailed Analysis', desc: 'We examine every aspect: design, build quality, movement, comfort, water resistance, and value.' },
                { icon: Award, step: '04', title: 'Fair Scoring', desc: 'Our rating system considers the watch\'s price category. A $100 watch is judged against $100 competitors, not $1,000 watches.' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gold font-bold text-sm">Step {item.step}</span>
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Team */}
        <section className="mb-16 scroll-reveal">
          <h2 className="font-playfair text-2xl font-bold mb-8 text-center">
            Meet the <span className="text-gold">Team</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'James Mitchell', role: 'Founder & Lead Reviewer', desc: '15+ years in the watch industry. Former watchmaker with a passion for making horology accessible.', avatar: 'JM' },
              { name: 'Sarah Chen', role: 'Technical Editor', desc: 'Mechanical engineering background. Specializes in movement analysis and accuracy testing.', avatar: 'SC' },
              { name: 'Alex Rivera', role: 'Contributing Writer', desc: 'Watch collector and photographer. Focuses on design analysis and lifestyle integration.', avatar: 'AR' },
            ].map((person) => (
              <div
                key={person.name}
                className={`rounded-xl border p-6 text-center ${
                  theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
                }`}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-dark font-playfair text-xl font-bold">{person.avatar}</span>
                </div>
                <h3 className="font-playfair text-lg font-semibold">{person.name}</h3>
                <p className="text-gold text-sm mb-2">{person.role}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{person.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center scroll-reveal">
          <div className={`rounded-xl border p-8 ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-gold/10 to-dark-card border-gold/20'
              : 'bg-gradient-to-b from-gold/10 to-white border-gold/20'
          }`}>
            <h2 className="font-playfair text-2xl font-bold mb-4">
              Start Exploring
            </h2>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Ready to find your next watch? Check out our latest reviews and buying guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/best/watches-under-200"
                className="bg-gold hover:bg-gold-light text-dark font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Best Watches Under $200
              </Link>
              <Link
                to="/review/seiko-presage-srpd37"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-dark font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Read Our Reviews
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
