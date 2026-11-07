import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translate } from "@/content/site";

export type Language = "en" | "ar";
const LanguageContext = createContext({ language: "en" as Language, setLanguage: (_language: Language) => {}, t: (text: string) => text });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-language");
      if (saved === "ar" || saved === "en") setLanguage(saved);
    } catch { /* Storage is optional. */ }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);
  function choose(next: Language) {
    setLanguage(next);
    try { localStorage.setItem("portfolio-language", next); } catch { /* Storage is optional. */ }
  }
  return <LanguageContext.Provider value={{ language, setLanguage: choose, t: (text) => translate(text, language) }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);