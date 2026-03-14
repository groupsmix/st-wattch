import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Watch as WatchIcon, Shield, Cpu, Star } from "lucide-react";
import { useApp } from "../context/AppContext";
import { apiFetch } from "../hooks/useApi";
import { Watch } from "../data/types";
import WatchCard from "../components/WatchCard";
import Recommendations from "../components/Recommendations";

export default function Home() {
  const { theme, language, t } = useApp();
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ watches: Watch[] }>("/api/watches")
      .then((data) => setWatches(data.watches))
      .catch(() => setWatches([]))
      .finally(() => setLoading(false));
  }, []);

  const featuredWatches = watches.slice(0, 4);
  const latestWatches = watches.slice(4, 8);

  const features = [
    {
      icon: Sparkles,
      title: language === "ar" ? "مدعوم بالذكاء الاصطناعي" : "AI-Powered Reviews",
      desc: language === "ar" ? "مراجعات وتوصيات مدعومة بأحدث تقنيات الذكاء الاصطناعي" : "Reviews and recommendations powered by cutting-edge AI technology",
    },
    {
      icon: Shield,
      title: language === "ar" ? "مراجعات صادقة" : "Honest Reviews",
      desc: language === "ar" ? "مراجعات غير منحازة تركز على القيمة الحقيقية" : "Unbiased reviews focused on real value for your money",
    },
    {
      icon: Cpu,
      title: language === "ar" ? "مقارنات ذكية" : "Smart Comparisons",
      desc: language === "ar" ? "قارن أي ساعتين مع تحليل ذكي فوري" : "Compare any two watches with instant AI analysis",
    },
  ];

  const categories = [
    { id: "dive", label: t("cat_dive"), emoji: "🤿", count: watches.filter(w => w.category === "dive").length },
    { id: "dress", label: t("cat_dress"), emoji: "👔", count: watches.filter(w => w.category === "dress").length },
    { id: "sports", label: t("cat_sport"), emoji: "🏃", count: watches.filter(w => w.category === "sports").length },
    { id: "field", label: t("cat_field"), emoji: "🏕️", count: watches.filter(w => w.category === "field").length },
    { id: "luxury", label: t("cat_luxury"), emoji: "💎", count: watches.filter(w => w.category === "luxury").length },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920"
            alt="Luxury watches"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-950/95 via-gray-950/80 to-gray-950/60"
              : "bg-gradient-to-r from-white/95 via-white/80 to-white/50"
          }`} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
              theme === "dark" ? "bg-amber-400/10 text-amber-400" : "bg-amber-100 text-amber-700"
            }`}>
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t("hero_ai_badge")}</span>
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              {t("hero_title")}
            </h1>
            <p className={`text-lg sm:text-xl mb-8 max-w-xl leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              {t("hero_subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-xl font-semibold text-lg hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
              >
                {t("hero_cta")}
                <ArrowRight className={`w-5 h-5 ${language === "ar" ? "rotate-180" : ""}`} />
              </Link>
              <Link
                to="/compare"
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all ${
                  theme === "dark"
                    ? "border-gray-700 text-white hover:border-amber-500/50 hover:bg-gray-800/50"
                    : "border-gray-300 text-gray-700 hover:border-amber-500 hover:bg-amber-50"
                }`}
              >
                {t("compare_title")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`py-16 ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className={`text-center p-6 rounded-2xl transition-colors ${
                theme === "dark" ? "bg-gray-800/50 hover:bg-gray-800" : "bg-white hover:bg-gray-50 shadow-sm"
              }`}>
                <div className={`inline-flex p-4 rounded-xl mb-4 ${
                  theme === "dark" ? "bg-amber-400/10" : "bg-amber-100"
                }`}>
                  <feature.icon className={`w-6 h-6 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className={`text-2xl font-bold mb-8 text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {t("cat_title")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/categories?cat=${cat.id}`}
                className={`group p-5 rounded-2xl border text-center transition-all hover:-translate-y-1 hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-800 hover:border-amber-500/30"
                    : "bg-white border-gray-200 hover:border-amber-400/50"
                }`}
              >
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <h3 className={`text-sm font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {cat.label}
                </h3>
                <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                  {cat.count} {language === "ar" ? "ساعة" : "watches"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Watches */}
      <section className={`py-16 ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Star className={`w-5 h-5 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
              <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {language === "ar" ? "ساعات مميزة" : "Featured Watches"}
              </h2>
            </div>
            <Link to="/categories" className="text-sm text-amber-500 hover:text-amber-600 font-medium flex items-center gap-1">
              {t("cat_all")}
              <ArrowRight className={`w-4 h-4 ${language === "ar" ? "rotate-180" : ""}`} />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`rounded-2xl overflow-hidden animate-pulse ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-200"
                }`}>
                  <div className="aspect-square" />
                  <div className="p-4 space-y-2">
                    <div className={`h-3 rounded w-16 ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`} />
                    <div className={`h-4 rounded w-32 ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredWatches.map((watch) => (
                <WatchCard key={watch.id} watch={watch} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Reviews */}
      {latestWatches.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <WatchIcon className={`w-5 h-5 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
                <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {language === "ar" ? "أحدث المراجعات" : "Latest Reviews"}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestWatches.map((watch) => (
                <WatchCard key={watch.id} watch={watch} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AI Recommendations */}
      <Recommendations />

      {/* CTA */}
      <section className={`py-20 ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Sparkles className={`w-8 h-8 mx-auto mb-4 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
          <h2 className={`text-3xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {language === "ar" ? "اسأل مستشار الساعات الذكي" : "Ask Our AI Watch Advisor"}
          </h2>
          <p className={`text-lg mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            {language === "ar"
              ? "انقر على أيقونة الدردشة في الزاوية للحصول على توصيات مخصصة"
              : "Click the chat icon in the corner for personalized watch recommendations"}
          </p>
        </div>
      </section>
    </div>
  );
}
