import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Star, ShoppingCart, ExternalLink, Check, X as XIcon,
  Sparkles, Loader2, Watch as WatchIcon
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { apiFetch, apiPost } from "../hooks/useApi";
import { Watch } from "../types/watch";
import Recommendations from "../components/Recommendations";

export default function WatchDetail() {
  const { id } = useParams<{ id: string }>();
  const { theme, language, t, addViewedWatch } = useApp();
  const [watch, setWatch] = useState<Watch | null>(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiFetch<{ watch: Watch }>(`/api/watches/${id}`)
      .then((data) => {
        setWatch(data.watch);
        addViewedWatch(data.watch.id);
      })
      .catch(() => setWatch(null))
      .finally(() => setLoading(false));
  }, [id, addViewedWatch]);

  const generateSummary = async () => {
    if (!watch || summaryLoading) return;
    setSummaryLoading(true);
    try {
      const data = await apiPost<{ summary: string }>("/api/ai/summary", {
        watch_id: watch.id,
        language,
      });
      setSummary(data.summary);
    } catch {
      setSummary(language === "ar" ? "عذراً، لم نتمكن من توليد الملخص." : "Sorry, could not generate summary.");
    } finally {
      setSummaryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <WatchIcon className="w-16 h-16 mx-auto mb-4 text-gray-500" />
          <h1 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {language === "ar" ? "الساعة غير موجودة" : "Watch Not Found"}
          </h1>
          <Link to="/categories" className="text-amber-500 hover:text-amber-600">
            {t("detail_back")}
          </Link>
        </div>
      </div>
    );
  }

  const name = language === "ar" ? watch.nameAr : watch.name;
  const brand = language === "ar" ? watch.brandAr : watch.brand;
  const desc = language === "ar" ? watch.descriptionAr : watch.description;

  const specs = [
    { label: t("detail_movement"), value: watch.movement },
    { label: t("detail_case"), value: watch.caseDiameter },
    { label: t("detail_water"), value: watch.waterResistance },
    { label: t("detail_crystal"), value: watch.crystal },
    { label: t("detail_material"), value: watch.caseMaterial },
    { label: t("detail_bracelet"), value: watch.bracelet },
    { label: t("detail_power"), value: watch.powerReserve },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <Link to="/categories" className={`inline-flex items-center gap-2 text-sm transition-colors hover:text-amber-500 ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}>
          <ArrowLeft className={`w-4 h-4 ${language === "ar" ? "rotate-180" : ""}`} />
          {t("detail_back")}
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className={`rounded-2xl overflow-hidden border ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}>
            <img src={watch.heroImage} alt={name} className="w-full aspect-square object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className={`text-sm font-medium mb-2 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`}>
              {brand}
            </p>
            <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {name}
            </h1>

            {/* Rating & Price */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(watch.rating)
                      ? "text-amber-400 fill-amber-400"
                      : theme === "dark" ? "text-gray-700" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className={`text-sm font-medium ms-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {watch.rating}
                </span>
              </div>
              <span className={`text-3xl font-bold ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`}>
                ${watch.price}
              </span>
            </div>

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              {desc}
            </p>

            {/* Buy Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={watch.affiliateLinks.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                {t("detail_amazon")}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={watch.affiliateLinks.jomashop}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium border-2 transition-colors ${
                  theme === "dark"
                    ? "border-gray-700 text-gray-300 hover:border-amber-500/50"
                    : "border-gray-300 text-gray-700 hover:border-amber-500"
                }`}
              >
                {t("detail_jomashop")}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* AI Summary Button */}
            <div className={`rounded-xl border p-4 ${
              theme === "dark" ? "border-amber-500/20 bg-amber-500/5" : "border-amber-200 bg-amber-50"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className={`w-4 h-4 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
                <h3 className={`text-sm font-semibold ${theme === "dark" ? "text-amber-400" : "text-amber-700"}`}>
                  {t("detail_ai_summary")}
                </h3>
              </div>
              {summary ? (
                <div className={`text-sm leading-relaxed prose prose-sm max-w-none ${
                  theme === "dark" ? "text-gray-300 prose-invert" : "text-gray-600"
                }`}>
                  <div dangerouslySetInnerHTML={{
                    __html: summary
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/### (.*?)(\n|$)/g, '<h4 class="text-sm font-semibold mt-3 mb-1">$1</h4>')
                      .replace(/- (.*?)(\n|$)/g, '<li class="ml-4">$1</li>')
                      .replace(/\n/g, '<br/>')
                  }} />
                </div>
              ) : (
                <button
                  onClick={generateSummary}
                  disabled={summaryLoading}
                  className={`text-sm font-medium flex items-center gap-2 transition-colors ${
                    summaryLoading ? "text-gray-400" : "text-amber-500 hover:text-amber-600"
                  }`}
                >
                  {summaryLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("detail_loading_summary")}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      {t("detail_ai_summary_btn")}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Specs, Pros, Cons */}
      <section className={`py-12 ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Specifications */}
            <div className={`rounded-2xl border p-6 ${
              theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            }`}>
              <h2 className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {t("detail_specs")}
              </h2>
              <div className="space-y-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center py-2 border-b border-gray-800/20 last:border-0">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                      {spec.label}
                    </span>
                    <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros */}
            <div className={`rounded-2xl border p-6 ${
              theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            }`}>
              <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                theme === "dark" ? "text-green-400" : "text-green-600"
              }`}>
                <Check className="w-5 h-5" /> {t("detail_pros")}
              </h2>
              <ul className="space-y-3">
                {watch.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className={`rounded-2xl border p-6 ${
              theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            }`}>
              <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                theme === "dark" ? "text-red-400" : "text-red-600"
              }`}>
                <XIcon className="w-5 h-5" /> {t("detail_cons")}
              </h2>
              <ul className="space-y-3">
                {watch.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XIcon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <Recommendations />
    </div>
  );
}
