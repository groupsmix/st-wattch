import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Watch } from "../types/watch";

interface WatchCardProps {
  watch: Watch;
}

export default function WatchCard({ watch }: WatchCardProps) {
  const { theme, language, t } = useApp();
  const name = language === "ar" ? watch.nameAr : watch.name;
  const brand = language === "ar" ? watch.brandAr : watch.brand;
  const category = language === "ar" ? watch.categoryAr : watch.category;

  return (
    <Link
      to={`/watch/${watch.id}`}
      className={`group block rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        theme === "dark"
          ? "bg-gray-900 border-gray-800 hover:border-amber-500/30"
          : "bg-white border-gray-200 hover:border-amber-400/50"
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={watch.image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <span className={`absolute top-3 ${language === "ar" ? "right-3" : "left-3"} px-2.5 py-1 text-xs font-medium rounded-full ${
          theme === "dark" ? "bg-amber-400/20 text-amber-300" : "bg-amber-100 text-amber-800"
        }`}>
          {category}
        </span>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-medium text-white">{watch.rating}</span>
        </div>

        {/* Price */}
        <div className={`absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-sm font-bold ${
          theme === "dark" ? "bg-gray-900/80 text-amber-400" : "bg-white/90 text-amber-700"
        }`}>
          ${watch.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className={`text-xs font-medium mb-1 ${
          theme === "dark" ? "text-amber-400" : "text-amber-600"
        }`}>
          {brand}
        </p>
        <h3 className={`font-semibold text-sm mb-3 line-clamp-1 group-hover:text-amber-500 transition-colors ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          {name}
        </h3>
        <div className={`flex items-center justify-between text-xs ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}>
          <span>{watch.movement}</span>
          <span className="flex items-center gap-1 text-amber-500 font-medium">
            {t("card_view_review")}
            <ArrowRight className={`w-3 h-3 transition-transform group-hover:translate-x-1 ${
              language === "ar" ? "rotate-180" : ""
            }`} />
          </span>
        </div>
      </div>
    </Link>
  );
}
