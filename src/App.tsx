import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import NewsletterPopup from './components/NewsletterPopup';
import ErrorBoundary from './components/ErrorBoundary';
import WatchAdvisor from './components/ai/WatchAdvisor';
import HomePage from './pages/HomePage';
import ReviewPage from './pages/ReviewPage';
import ComparisonPage from './pages/ComparisonPage';
import BestOfPage from './pages/BestOfPage';
import AboutPage from './pages/AboutPage';
import AffiliateDisclosurePage from './pages/AffiliateDisclosurePage';
import TryOnPage from './pages/TryOnPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import NotFoundPage from './pages/NotFoundPage';
import AIComparisonPage from './pages/AIComparisonPage';
import BlogPage from './pages/BlogPage';
import AISettingsPage from './pages/AISettingsPage';
import SalesAnalyzerPage from './pages/SalesAnalyzerPage';
import NotificationWriterPage from './pages/NotificationWriterPage';

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/review/:slug" element={<ReviewPage />} />
            <Route path="/compare/seiko-presage-vs-orient-bambino" element={<ComparisonPage />} />
            <Route path="/best/watches-under-200" element={<BestOfPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/try-on" element={<TryOnPage />} />
            <Route path="/ai/compare" element={<AIComparisonPage />} />
            <Route path="/ai/blog" element={<BlogPage />} />
            <Route path="/ai/settings" element={<AISettingsPage />} />
            <Route path="/ai/sales" element={<SalesAnalyzerPage />} />
            <Route path="/ai/notifications" element={<NotificationWriterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
        <NewsletterPopup />
        <WatchAdvisor />
      </div>
    </ErrorBoundary>
  );
}
