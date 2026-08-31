interface LogoProps {
  collapsed?: boolean;
}

export default function Logo({ collapsed = false }: LogoProps) {
  return (
    <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} h-16 ${collapsed ? 'px-2' : 'px-5'} pt-2`}>
      <svg
        width={collapsed ? 32 : 36}
        height={collapsed ? 32 : 36}
        viewBox="0 0 36 36"
        fill="none"
        className="shrink-0"
      >
        <rect width="36" height="36" rx="10" className="fill-primary" />
        <path
          d="M10 26V12h3.5l5 8.5L24 12h3.5v14h-3.5V17l-5.5 9h-1l-5.5-9v9H10z"
          className="fill-primary-foreground"
        />
      </svg>
      {!collapsed && (
        <span className="text-[20px] font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Execute
        </span>
      )}
    </div>
  );
}
