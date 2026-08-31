import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "@/lib/contexts";
import {
  DEFAULT_CUSTOM_THEME_COLOR,
  DEFAULT_THEME_COLOR,
  THEME_STORAGE_KEYS,
  applyThemeColor,
  resolveThemeMode,
  type ThemeColor,
  type ThemeMode,
} from "@/lib/theme";

export type { ThemeColor } from "@/lib/theme";

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEYS.mode);
    return resolveThemeMode(savedTheme);
  });

  const [themeColor, setThemeColorState] = useState<ThemeColor>(DEFAULT_THEME_COLOR);
  const [customThemeColor, setCustomThemeColorState] = useState<`#${string}`>(DEFAULT_CUSTOM_THEME_COLOR);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
  };

  const setCustomThemeColor = (color: `#${string}`) => {
    setCustomThemeColorState(color);
    setThemeColorState("custom");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    applyThemeColor(themeColor, theme, customThemeColor);
  }, [themeColor, theme, customThemeColor]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEYS.mode, newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        themeColor,
        setThemeColor,
        customThemeColor,
        setCustomThemeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
