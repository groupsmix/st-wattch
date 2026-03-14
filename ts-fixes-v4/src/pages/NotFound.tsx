import { Link } from "react-router-dom";
import { Watch } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function NotFound() {
  const { theme, t } = useApp();

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center px-4">
        <Watch className={`w-20 h-20 mx-auto mb-6 ${theme === "dark" ? "text-gray-700" : "text-gray-300"}`} />
        <h1 className={`text-6xl font-bold mb-4 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`}>
          404
        </h1>
        <h2 className={`text-2xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          {t("not_found_title")}
        </h2>
        <p className={`text-sm mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
          {t("not_found_desc")}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors"
        >
          {t("not_found_btn")}
        </Link>
      </div>
    </div>
  );
}
