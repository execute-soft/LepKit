import { useLanguage } from "@/lib/hooks";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n";
import { LanguageSwitcher as UixLanguageSwitcher } from "@repo/uix/react/layout";

type LanguageSwitcherProps = Readonly<{
  compact?: boolean;
  className?: string;
}>;

export default function LanguageSwitcher({
  compact = false,
  className = "",
}: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <UixLanguageSwitcher
      languages={SUPPORTED_LANGUAGES}
      activeLanguage={language}
      onLanguageChange={setLanguage}
      label={t("common.language")}
      compact={compact}
      className={className}
    />
  );
}
