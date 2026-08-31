import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { LanguageContext } from '@/lib/contexts';
import {
  LANGUAGE_STORAGE_KEY,
  type Language,
  resolveInitialLanguage,
  translate,
} from "@/lib/i18n";

export function LanguageProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [language, setLanguage] = useState<Language>(resolveInitialLanguage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
    document.documentElement.lang = language;
  }, [language]);

  const t = useMemo(() => {
    return (key: string): string => translate(language, key);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
