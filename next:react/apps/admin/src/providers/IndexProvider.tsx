import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import { LanguageProvider } from "./LanguageProvider";

type HSWindow = Window & {
  HSStaticMethods?: {
    autoInit: () => void;
  };
};

const runAutoInit = () => {
  const { HSStaticMethods } = window as HSWindow;
  HSStaticMethods?.autoInit();
};

export default function IndexProvider({ children }: Readonly<{ children: ReactNode }>) {
  const location = useLocation();

  useEffect(() => {
    runAutoInit();
  }, [location]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      runAutoInit();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
