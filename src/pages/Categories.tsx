import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SortAsc, Loader2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { apiFetch } from "../hooks/useApi";
import { Watch } from "../types/watch";
import WatchCard from "../components/WatchCard";

export default function Categories() {
  const { theme, language, t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);

  const activeCategory = searchParams.get("cat") || "all";
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    apiFetch<{ watches: Watch[] }>("/api/watches")
      .then((data) => setWatches(data.watches))
      .catch(() => setWatches([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { id: "all", label: t("categories_all") },
    { id: "dive", label: t("cat_dive") },
    { id: "dress", label: t("cat_dress") },
    { id: "sport", label: t("cat_sport") },
    { id: "field", label: t("cat_field") },
    { id: "luxury", label: t("cat_luxury") },
  ];

  const filteredWatches = watches
    .filter((w) => activeCategory === "all" || w.category === activeCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price_low": return a.price - b.price;
        case "price_high": return b.price - a.price;
        case "name": return a.name.localeCompare(b.name);
        default: return b.rating - a.rating;
      }
    });

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {t("nav_categories")}
          </h1>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            {filteredWatches.length} {language === "ar" ? "ساعة" : "watches"}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Category Pills */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Filter className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
              <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {t("categories_filter")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (cat.id === "all") {
                      searchParams.delete("cat");
                    } else {
                      searchParams.set("cat", cat.id);
                    }
                    setSearchParams(searchParams);
                  }}
                  className={`px-4 py-2 text-sm rounded-xl font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                      : theme === "dark"
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SortAsc className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
              <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {t("categories_sort")}
              </span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 text-sm rounded-xl border transition-colors ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-200 text-gray-900"
              } focus:outline-none focus:border-amber-500`}
            >
              <option value="rating">{t("sort_rating")}</option>
              <option value="price_low">{t("sort_price_low")}</option>
              <option value="price_high">{t("sort_price_high")}</option>
              <option value="name">{t("sort_name")}</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          </div>
        ) : filteredWatches.length === 0 ? (
          <div className={`text-center py-20 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            {t("search_no_results")}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWatches.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
