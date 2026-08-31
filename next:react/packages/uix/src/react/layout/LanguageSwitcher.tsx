import { cn } from "../../utils";

export type LanguageSwitcherLanguage = {
  code: string;
  nativeLabel: string;
};

type LanguageSwitcherProps = Readonly<{
  languages: readonly LanguageSwitcherLanguage[];
  activeLanguage: string;
  onLanguageChange: (language: string) => void;
  label?: string;
  compact?: boolean;
  className?: string;
}>;

export function LanguageSwitcher({
  languages,
  activeLanguage,
  onLanguageChange,
  label = "Language",
  compact = false,
  className,
}: LanguageSwitcherProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {!compact ? (
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      ) : null}
      <div className="flex items-center rounded-full border border-gray-200 bg-white p-1 dark:border-border dark:bg-muted">
        {languages.map((item) => {
          const active = activeLanguage === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => onLanguageChange(item.code)}
              className={cn(
                "cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
                active
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200",
              )}
              aria-pressed={active}
            >
              {compact ? item.code.toUpperCase() : item.nativeLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

