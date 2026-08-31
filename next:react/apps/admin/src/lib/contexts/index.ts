import { createContext } from "react";
import type { Language } from "@/lib/i18n";
import type { ThemeColor, ThemeMode } from "@/lib/theme";

export interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  customThemeColor: `#${string}`;
  setCustomThemeColor: (color: `#${string}`) => void;
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export { ThemeContext, LanguageContext };
