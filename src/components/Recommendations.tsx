import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import { apiPost } from "../hooks/useApi";
import { Watch } from "../types/watch";
import WatchCard from "./WatchCard";

export default function Recommendations() {
  const { theme, language, t, viewedWatches } = useApp();
  const [recommendations, setRecommendations] = useState<Watch[]>([]);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const data = await apiPost<{ recommendations: Watch[]; reason: string }>(
          "/api/ai/recommendations",
          { viewed_watch_ids: viewedWatches, language }
        );
        setRecommendations(data.recommendations);
        setReason(data.reason);
      } catch {
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, [viewedWatches, language]);

  if (loading || recommendations.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className={`w-5 h-5 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
            <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {t("rec_title")}
            </h2>
            <Sparkles className={`w-5 h-5 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
          </div>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            {reason}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      </div>
    </section>
  );
}
