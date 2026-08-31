import { useLanguage } from "@/lib/hooks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-border bg-white dark:bg-card px-4 py-3">
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="font-medium text-gray-700 dark:text-gray-200">
          Execute Admin
        </span>
        <span>&copy; {year} Execute</span>
      </div>
    </footer>
  );
}
