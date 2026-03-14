import { useState, useEffect } from "react";
import { Sparkles, Loader2, ArrowLeftRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { apiFetch, apiPost } from "../hooks/useApi";
import { Watch } from "../types/watch";

export default function Compare() {
  const { theme, language, t } = useApp();
  const [watches, setWatches] = useState<Watch[]>([]);
  const [watch1Id, setWatch1Id] = useState("");
  const [watch2Id, setWatch2Id] = useState("");
  const [comparison, setComparison] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingWatches, setFetchingWatches] = useState(true);

  useEffect(() => {
    apiFetch<{ watches: Watch[] }>("/api/watches")
      .then((data) => setWatches(data.watches))
      .catch(() => setWatches([]))
      .finally(() => setFetchingWatches(false));
  }, []);

  const handleCompare = async () => {
    if (!watch1Id || !watch2Id || watch1Id === watch2Id || loading) return;
    setLoading(true);
    setComparison("");
    try {
      const data = await apiPost<{ comparison: string }>("/api/ai/compare", {
        watch1_id: watch1Id,
        watch2_id: watch2Id,
        language,
      });
      setComparison(data.comparison);
    } catch {
      setComparison(language === "ar" ? "عذراً، حدث خطأ أثناء المقارنة." : "Sorry, an error occurred during comparison.");
    } finally {
      setLoading(false);
    }
  };

  const getWatchName = (id: string) => {
    const w = watches.find((w) => w.id === id);
    if (!w) return "";
    return language === "ar" ? w.nameAr : w.name;
  };

  const watch1 = watches.find((w) => w.id === watch1Id);
  const watch2 = watches.find((w) => w.id === watch2Id);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className={`w-6 h-6 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
            <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {t("compare_title")}
            </h1>
          </div>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            {t("compare_subtitle")}
          </p>
        </div>

        {fetchingWatches ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          </div>
        ) : (
          <>
            {/* Selection */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-8">
              {/* Watch 1 */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  {t("compare_select1")}
                </label>
                <select
                  value={watch1Id}
                  onChange={(e) => setWatch1Id(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  } focus:outline-none focus:border-amber-500`}
                >
                  <option value="">{t("compare_select1")}</option>
                  {watches.map((w) => (
                    <option key={w.id} value={w.id} disabled={w.id === watch2Id}>
                      {language === "ar" ? w.nameAr : w.name} — ${w.price}
                    </option>
                  ))}
                </select>
                {watch1 && (
                  <div className={`mt-3 rounded-xl overflow-hidden border ${
                    theme === "dark" ? "border-gray-800" : "border-gray-200"
                  }`}>
                    <img src={watch1.image} alt={getWatchName(watch1Id)} className="w-full aspect-video object-cover" />
                    <div className="p-3">
                      <p className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {getWatchName(watch1Id)}
                      </p>
                      <p className={`text-xs ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`}>
                        ${watch1.price} — {watch1.movement}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* VS */}
              <div className="flex flex-col items-center py-4">
                <ArrowLeftRight className={`w-6 h-6 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
                <span className={`text-sm font-bold mt-1 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                  {t("compare_vs")}
                </span>
              </div>

              {/* Watch 2 */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  {t("compare_select2")}
                </label>
                <select
                  value={watch2Id}
                  onChange={(e) => setWatch2Id(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  } focus:outline-none focus:border-amber-500`}
                >
                  <option value="">{t("compare_select2")}</option>
                  {watches.map((w) => (
                    <option key={w.id} value={w.id} disabled={w.id === watch1Id}>
                      {language === "ar" ? w.nameAr : w.name} — ${w.price}
                    </option>
                  ))}
                </select>
                {watch2 && (
                  <div className={`mt-3 rounded-xl overflow-hidden border ${
                    theme === "dark" ? "border-gray-800" : "border-gray-200"
                  }`}>
                    <img src={watch2.image} alt={getWatchName(watch2Id)} className="w-full aspect-video object-cover" />
                    <div className="p-3">
                      <p className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {getWatchName(watch2Id)}
                      </p>
                      <p className={`text-xs ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`}>
                        ${watch2.price} — {watch2.movement}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Compare Button */}
            <div className="text-center mb-10">
              <button
                onClick={handleCompare}
                disabled={!watch1Id || !watch2Id || watch1Id === watch2Id || loading}
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-xl font-semibold text-lg hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("compare_loading")}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {t("compare_btn")}
                  </>
                )}
              </button>
            </div>

            {/* Comparison Result */}
            {comparison && (
              <div className={`rounded-2xl border p-6 sm:p-8 ${
                theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className={`w-5 h-5 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
                  <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {language === "ar" ? "نتيجة المقارنة بالذكاء الاصطناعي" : "AI Comparison Result"}
                  </h2>
                </div>
                <div className={`prose prose-sm max-w-none leading-relaxed ${
                  theme === "dark" ? "text-gray-300 prose-invert prose-headings:text-amber-400" : "text-gray-600 prose-headings:text-amber-700"
                }`}>
                  <div dangerouslySetInnerHTML={{
                    __html: comparison
                      .replace(/## (.*?)(\n|$)/g, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
                      .replace(/### (.*?)(\n|$)/g, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/- (.*?)(\n|$)/g, '<li class="ml-4 mb-1">$1</li>')
                      .replace(/\n\n/g, '<br/><br/>')
                      .replace(/\n/g, '<br/>')
                  }} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
