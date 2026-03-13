import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles, Loader2, Search as SearchIcon } from "lucide-react";
import { useApp } from "../context/AppContext";
import { apiPost } from "../hooks/useApi";
import { Watch } from "../types/watch";
import WatchCard from "../components/WatchCard";

export default function Search() {
  const { theme, language, t } = useApp();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    apiPost<{ results: Watch[] }>("/api/ai/search", { query, language })
      .then((data) => setResults(data.results))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [query, language]);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className={`w-5 h-5 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              theme === "dark" ? "bg-amber-400/10 text-amber-400" : "bg-amber-100 text-amber-700"
            }`}>
              {t("search_ai_powered")}
            </span>
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {t("search_results")}
          </h1>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            {language === "ar" ? `نتائج البحث عن: "${query}"` : `Results for: "${query}"`}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {language === "ar" ? "الذكاء الاصطناعي يبحث..." : "AI is searching..."}
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <SearchIcon className={`w-16 h-16 ${theme === "dark" ? "text-gray-700" : "text-gray-300"}`} />
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {t("search_no_results")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
