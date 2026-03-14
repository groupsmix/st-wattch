import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, flatTranslations, TranslationKey } from "../data/translations";

interface AppContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  isRtl: boolean;
  viewedWatches: string[];
  addViewedWatch: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("wristnerd-theme");
    return (saved === "light" || saved === "dark") ? saved : "dark";
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("wristnerd-lang");
    return (saved === "ar" || saved === "en") ? saved : "en";
  });

  const [viewedWatches, setViewedWatches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("wristnerd-viewed");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wristnerd-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("wristnerd-lang", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem("wristnerd-viewed", JSON.stringify(viewedWatches));
  }, [viewedWatches]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const toggleLanguage = () => setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  const t = (key: TranslationKey) => flatTranslations[language][key] || key;
  const isRtl = language === "ar";

  const addViewedWatch = (id: string) => {
    setViewedWatches((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev.slice(-9), id];
    });
  };

  return (
    <AppContext.Provider
      value={{ theme, toggleTheme, language, toggleLanguage, t, isRtl, viewedWatches, addViewedWatch }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
