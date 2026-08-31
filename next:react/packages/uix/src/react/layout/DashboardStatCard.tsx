import { ArrowUpRight } from "lucide-react";

import { cn } from "../../utils";

type DashboardStatCardProps = Readonly<{
  title: string;
  subtitle: string;
  count: number | string;
  bgClass: string;
  className?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}>;

export function DashboardStatCard({
  title,
  subtitle,
  count,
  bgClass,
  className,
  actionLabel = "Open details",
  onActionClick,
}: DashboardStatCardProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[130px] flex-col overflow-hidden rounded-xl p-4 sm:min-h-[150px] sm:rounded-2xl sm:p-5",
        bgClass,
        className,
      )}
    >
      <div className="relative z-10 flex-1">
        <h3 className="mb-0.5 text-[14px] font-semibold text-gray-900 dark:text-gray-100 sm:text-[16px]">
          {title}
        </h3>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 sm:text-[13px]">
          {subtitle}
        </p>
      </div>
      <div className="mt-auto flex items-end justify-between">
        <span className="text-[32px] font-bold leading-none text-gray-900 dark:text-gray-100 sm:text-[44px]">
          {count}
        </span>
        <button
          type="button"
          className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-all hover:scale-105 hover:bg-white dark:bg-card/90 dark:hover:bg-card sm:size-9"
          aria-label={actionLabel}
          onClick={onActionClick}
        >
          <ArrowUpRight
            className="size-3.5 text-gray-700 dark:text-gray-200 sm:size-4"
            strokeWidth={2}
          />
        </button>
      </div>
      <div className="absolute -right-4 -bottom-4 size-20 opacity-30 sm:-right-6 sm:-bottom-6 sm:size-28">
        <div className="size-full rounded-full border-[12px] border-current text-white sm:border-[16px]" />
      </div>
    </div>
  );
}

