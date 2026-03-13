import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Search, Watch, Globe, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { theme, toggleTheme, toggleLanguage, t, isRtl } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  const navLinks = [
    { to: "/", label: t("nav_home") },
    { to: "/categories", label: t("nav_categories") },
    { to: "/compare", label: t("nav_compare") },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
      theme === "dark"
        ? "bg-gray-950/90 border-gray-800"
        : "bg-white/90 border-gray-200"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Watch className={`w-7 h-7 transition-colors ${
              theme === "dark" ? "text-amber-400" : "text-amber-600"
            } group-hover:text-amber-500`} />
            <span className={`text-xl font-bold tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Wrist<span className={theme === "dark" ? "text-amber-400" : "text-amber-600"}>Nerd</span>
            </span>
            <span className={`hidden sm:flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${
              theme === "dark" ? "bg-amber-400/10 text-amber-400" : "bg-amber-100 text-amber-700"
            }`}>
              <Sparkles className="w-3 h-3" /> AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search + Controls */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("nav_ai_search_placeholder")}
                className={`w-64 ${isRtl ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 text-sm rounded-xl border transition-colors ${
                  theme === "dark"
                    ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-amber-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-amber-500"
                } focus:outline-none focus:ring-1 focus:ring-amber-500/30`}
              />
            </form>

            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-lg transition-colors ${
                theme === "dark" ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"
              }`}
              title={t("lang_switch")}
            >
              <Globe className="w-4 h-4" />
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === "dark" ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"
              }`}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden border-t ${
          theme === "dark" ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"
        }`}>
          <div className="px-4 py-3 space-y-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("nav_ai_search_placeholder")}
                className={`w-full ${isRtl ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 text-sm rounded-xl border transition-colors ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                } focus:outline-none focus:border-amber-500`}
              />
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-2 pt-2 border-t border-gray-700/30">
              <button onClick={toggleLanguage} className={`flex-1 py-2 text-sm rounded-lg ${
                theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}>
                {t("lang_switch")}
              </button>
              <button onClick={toggleTheme} className={`flex-1 py-2 text-sm rounded-lg ${
                theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}>
                {theme === "dark" ? t("theme_light") : t("theme_dark")}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
