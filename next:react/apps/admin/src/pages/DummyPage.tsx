import { useLocation } from "react-router-dom";

function pathToTitle(pathname: string): string {
  const segments = pathname
    .replace("/dashboard", "")
    .split("/")
    .filter(Boolean);

  if (segments.length === 0) return "Dashboard";

  return segments
    .map((s) =>
      s
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    )
    .join(" / ");
}

export default function DummyPage() {
  const { pathname } = useLocation();
  const title = pathToTitle(pathname);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-2">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </h1>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        Page content coming soon
      </p>
    </div>
  );
}
