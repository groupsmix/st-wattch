import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, Language } from '../data/types';
import { translations } from '../data/translations';

type Translations = typeof translations.en;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('wristnerd-theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('wristnerd-lang');
    return saved === 'en' || saved === 'ar' ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('wristnerd-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('wristnerd-lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const setLanguage = (lang: Language) => setLanguageState(lang);
  const t = translations[language] as Translations;
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, language, setLanguage, t, dir }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
