import { useState } from "react";
import { Link } from "react-router-dom";
import { Watch, Sparkles, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { theme, t } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const categories = [
    { label: t("cat_dive"), to: "/categories?cat=dive" },
    { label: t("cat_dress"), to: "/categories?cat=dress" },
    { label: t("cat_sport"), to: "/categories?cat=sport" },
    { label: t("cat_field"), to: "/categories?cat=field" },
    { label: t("cat_luxury"), to: "/categories?cat=luxury" },
  ];

  const quickLinks = [
    { label: t("nav_home"), to: "/" },
    { label: t("nav_reviews"), to: "/categories" },
    { label: t("nav_compare"), to: "/compare" },
  ];

  const legalLinks = [
    { label: t("footer_privacy"), to: "/privacy" },
    { label: t("footer_terms"), to: "/terms" },
    { label: t("footer_affiliate"), to: "/affiliate-disclosure" },
  ];

  return (
    <footer className={`border-t transition-colors ${
      theme === "dark" ? "bg-gray-950 border-gray-800" : "bg-gray-50 border-gray-200"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Watch className={theme === "dark" ? "text-amber-400 w-6 h-6" : "text-amber-600 w-6 h-6"} />
              <span className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Wrist<span className={theme === "dark" ? "text-amber-400" : "text-amber-600"}>Nerd</span>
              </span>
            </Link>
            <p className={`text-sm mb-4 max-w-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {t("footer_about")}
            </p>
            <div className="flex items-center gap-1 mb-4">
              <Sparkles className={`w-4 h-4 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
              <span className={`text-xs ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`}>
                {t("footer_powered_by")}
              </span>
            </div>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "dark" ? "bg-gray-800 text-gray-400 hover:text-amber-400" : "bg-gray-200 text-gray-500 hover:text-amber-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {t("footer_quick_links")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={`text-sm transition-colors hover:text-amber-500 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={`text-sm transition-colors hover:text-amber-500 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {t("footer_categories")}
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.to}>
                  <Link to={cat.to} className={`text-sm transition-colors hover:text-amber-500 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {t("footer_newsletter")}
            </h3>
            <p className={`text-sm mb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {t("footer_newsletter_desc")}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer_email_placeholder")}
                  required
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border transition-colors ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  } focus:outline-none focus:border-amber-500`}
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 text-sm font-medium rounded-lg transition-colors ${
                  subscribed
                    ? "bg-green-600 text-white"
                    : "bg-amber-500 hover:bg-amber-600 text-white"
                }`}
              >
                {subscribed ? t("footer_subscribed") : t("footer_subscribe")}
              </button>
            </form>
          </div>
        </div>

        <div className={`mt-10 pt-6 border-t text-center text-xs ${
          theme === "dark" ? "border-gray-800 text-gray-500" : "border-gray-200 text-gray-400"
        }`}>
          &copy; {new Date().getFullYear()} WristNerd. {t("footer_rights")}
        </div>
      </div>
    </footer>
  );
}
